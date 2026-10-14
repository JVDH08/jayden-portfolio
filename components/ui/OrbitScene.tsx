"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * OrbitScene: the signature scroll moment, drawn live as vector graphics.
 * ------------------------------------------------------------------------
 * A globe with three orbits, projected from real 3D maths every frame and
 * written straight into SVG. Nothing is a bitmap, so it stays razor sharp
 * on every screen and every zoom level, and there is nothing to preload.
 *
 *  - The section pins for `scrollLength` viewport heights; scroll progress
 *    drives the orbit tilt, precession, the travelling comets, the globe's
 *    rotation and the light direction. Scroll back and it plays backwards.
 *  - Progress is eased per frame (on top of Lenis) so every step is soft.
 *  - Ring halves behind the globe are drawn under it, front halves over it,
 *    so the orbits really pass behind the sphere.
 *  - The render loop only runs while the section is on screen.
 *  - Reduced motion: no pin, one still frame.
 */

type Ring = {
  r: number; // radius (viewBox units)
  tilt: number; // base tilt around X (deg)
  tiltAmp: number;
  yaw: number; // base yaw around Y (deg)
  yawTravel: number; // extra yaw over the full scroll (deg)
  phase: number;
  color: string;
  comets: number[]; // start angles (rad)
  cometSpeed: number; // turns over the full scroll
};

const RINGS: Ring[] = [
  { r: 238, tilt: 72, tiltAmp: 9, yaw: -18, yawTravel: 70, phase: 0.2, color: "154,139,255", comets: [0.4, 3.6], cometSpeed: 1.6 },
  { r: 328, tilt: 64, tiltAmp: 12, yaw: 24, yawTravel: -85, phase: 1.9, color: "77,224,255", comets: [2.2], cometSpeed: -1.1 },
  { r: 425, tilt: 80, tiltAmp: 6, yaw: 6, yawTravel: 45, phase: 3.4, color: "110,91,255", comets: [1.1, 4.4], cometSpeed: 0.8 },
];

const GLOBE_R = 150;
const LATITUDES = [-50, -22, 0, 22, 50];
const VIEW_TILT = 16 * (Math.PI / 180);
const FOCAL = 1700;
const SAMPLES = 128;
const TAIL_SEGMENTS = 7;
const TAIL_LENGTH = 0.9; // rad
const MERIDIANS = 6;

const DEG = Math.PI / 180;
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (a: number, b: number, v: number) => {
  const t = clamp01((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Deterministic star field (same on server and client). */
const STARS = Array.from({ length: 70 }, (_, i) => {
  const h = (n: number) => {
    const x = Math.sin(i * 12.9898 + n * 78.233) * 43758.5453;
    return x - Math.floor(x);
  };
  // rounded, so server and client render identical attributes
  const round = (v: number, d = 1) => Math.round(v * 10 ** d) / 10 ** d;
  return {
    x: round(h(1) * 1000 - 500),
    y: round(h(2) * 1000 - 500),
    r: round(0.5 + h(3) * 1.3, 2),
    o: round(0.12 + h(4) * 0.45, 2),
  };
});

type Props = {
  scrollLength?: number;
  onProgress?: (p: number) => void;
  children?: ReactNode;
};

export default function OrbitScene({ scrollLength = 3, onProgress, children }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const onProgressRef = useRef(onProgress);
  onProgressRef.current = onProgress;

  useEffect(() => {
    const section = sectionRef.current;
    const svg = svgRef.current;
    if (!section || !svg) return;

    const q = <T extends Element>(sel: string) => Array.from(svg.querySelectorAll<T>(sel));
    const ringBack = q<SVGPathElement>("[data-ring-back]");
    const ringFront = q<SVGPathElement>("[data-ring-front]");
    const tailsBack = q<SVGPathElement>('[data-tail="back"]');
    const tailsFront = q<SVGPathElement>('[data-tail="front"]');
    const heads = [q<SVGCircleElement>('[data-head="back"]'), q<SVGCircleElement>('[data-head="front"]')];
    const halos = [q<SVGCircleElement>('[data-halo="back"]'), q<SVGCircleElement>('[data-halo="front"]')];
    const meridians = q<SVGPathElement>("[data-meridian]");
    const latitudes = q<SVGPathElement>("[data-latitude]");
    const shade = svg.querySelector<SVGRadialGradientElement>("#orb-shade");
    const orbGrad = svg.querySelector<SVGRadialGradientElement>("#orb-fill");
    const scene = svg.querySelector<SVGGElement>("[data-scene]");
    const stars = svg.querySelector<SVGGElement>("[data-stars]");

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const narrow = window.matchMedia("(max-width: 820px)").matches;

    // 3D: point on a circle of radius r in its own plane, then tilt (X) and yaw (Y).
    const point = (r: number, t: number, tilt: number, yaw: number) => {
      const x0 = r * Math.cos(t);
      const y0 = r * Math.sin(t);
      // rotate X
      const y1 = y0 * Math.cos(tilt);
      const z1 = y0 * Math.sin(tilt);
      // rotate Y
      const x2 = x0 * Math.cos(yaw) + z1 * Math.sin(yaw);
      const z2 = -x0 * Math.sin(yaw) + z1 * Math.cos(yaw);
      const s = FOCAL / (FOCAL - z2);
      return { x: x2 * s, y: y1 * s, z: z2, s };
    };

    const f = (n: number) => n.toFixed(1);

    let target = 0;
    let current = 0;
    let time = 0;

    const render = (p: number, tSec: number) => {
      const intro = smooth(0, 0.14, p);
      const align = smooth(0.72, 1, p);
      const scale = 0.6 + 0.4 * intro;

      if (scene) scene.setAttribute("opacity", f(0.6 + 0.4 * intro));
      if (stars) stars.setAttribute("transform", `translate(0 ${f(-60 * p)}) rotate(${f(p * 8)})`);

      let tailIdx = 0;
      let headIdx = 0;
      RINGS.forEach((ring, i) => {
        const r = ring.r * scale;
        const wobble = Math.sin(p * Math.PI * 1.3 + ring.phase + tSec * 0.12);
        const tilt = lerp(ring.tilt + ring.tiltAmp * wobble, 76, align) * DEG;
        const yaw = lerp(ring.yaw + ring.yawTravel * p, 10 - i * 4, align) * DEG;

        // ring: split into the half behind the globe and the half in front
        let back = "";
        let front = "";
        let prevFront: boolean | null = null;
        for (let k = 0; k <= SAMPLES; k++) {
          const pt = point(r, (k / SAMPLES) * Math.PI * 2, tilt, yaw);
          const isFront = pt.z >= 0;
          const seg = `${f(pt.x)} ${f(pt.y)}`;
          if (isFront !== prevFront) {
            if (isFront) front += `M${seg}`;
            else back += `M${seg}`;
            // close the gap at the crossover
            if (prevFront !== null) {
              if (isFront) back += `L${seg}`;
              else front += `L${seg}`;
            }
          } else if (isFront) front += `L${seg}`;
          else back += `L${seg}`;
          prevFront = isFront;
        }
        ringBack[i]?.setAttribute("d", back || "M0 0");
        ringFront[i]?.setAttribute("d", front || "M0 0");

        // comets travelling along the orbit
        ring.comets.forEach((start) => {
          const head = start + p * Math.PI * 2 * ring.cometSpeed + tSec * 0.18 * Math.sign(ring.cometSpeed);
          const dir = Math.sign(ring.cometSpeed) || 1;
          for (let s = 0; s < TAIL_SEGMENTS; s++) {
            const a0 = head - dir * TAIL_LENGTH * ((s + 1) / TAIL_SEGMENTS);
            const a1 = head - dir * TAIL_LENGTH * (s / TAIL_SEGMENTS);
            const p0 = point(r, a0, tilt, yaw);
            const pm = point(r, (a0 + a1) / 2, tilt, yaw);
            const p1 = point(r, a1, tilt, yaw);
            const d = `M${f(p0.x)} ${f(p0.y)}Q${f(2 * pm.x - (p0.x + p1.x) / 2)} ${f(2 * pm.y - (p0.y + p1.y) / 2)} ${f(p1.x)} ${f(p1.y)}`;
            const front = pm.z >= 0;
            const o = (1 - s / TAIL_SEGMENTS) * (front ? 0.95 : 0.35) * intro;
            const back = tailsBack[tailIdx];
            const fore = tailsFront[tailIdx];
            back?.setAttribute("d", d);
            fore?.setAttribute("d", d);
            back?.setAttribute("opacity", front ? "0" : f(o));
            fore?.setAttribute("opacity", front ? f(o) : "0");
            back?.setAttribute("stroke-width", f(2.4 * pm.s * (1 - s / (TAIL_SEGMENTS + 2))));
            fore?.setAttribute("stroke-width", f(2.4 * pm.s * (1 - s / (TAIL_SEGMENTS + 2))));
            tailIdx += 1;
          }
          const hp = point(r, head, tilt, yaw);
          const front = hp.z >= 0;
          for (let side = 0; side < 2; side++) {
            const visible = (side === 1) === front;
            const c = heads[side][headIdx];
            const g = halos[side][headIdx];
            c?.setAttribute("cx", f(hp.x));
            c?.setAttribute("cy", f(hp.y));
            c?.setAttribute("r", f(3 * hp.s));
            c?.setAttribute("opacity", visible ? f((front ? 1 : 0.4) * intro) : "0");
            g?.setAttribute("cx", f(hp.x));
            g?.setAttribute("cy", f(hp.y));
            g?.setAttribute("r", f(16 * hp.s));
            g?.setAttribute("opacity", visible ? f((front ? 0.9 : 0.3) * intro) : "0");
          }
          headIdx += 1;
        });
      });

      // globe: meridians turn with the scroll, latitudes stay; seen slightly
      // from above with a tilted axis. Only the visible half is drawn.
      const spin = p * Math.PI * 1.6 + tSec * 0.06;
      const axis = 18 * DEG;
      const globeLine = (pt: (t: number) => [number, number, number]) => {
        let d = "";
        let pen = false;
        for (let k = 0; k <= 72; k++) {
          const [x0, y0, z0] = pt((k / 72) * Math.PI * 2);
          // view from slightly above (rotate X)
          const y1 = y0 * Math.cos(VIEW_TILT) - z0 * Math.sin(VIEW_TILT);
          const z1 = y0 * Math.sin(VIEW_TILT) + z0 * Math.cos(VIEW_TILT);
          // tilt the axis in the picture plane
          const x = x0 * Math.cos(axis) - y1 * Math.sin(axis);
          const y = x0 * Math.sin(axis) + y1 * Math.cos(axis);
          if (z1 >= 0) {
            d += `${pen ? "L" : "M"}${f(x)} ${f(y)}`;
            pen = true;
          } else pen = false;
        }
        return d || "M0 0";
      };
      meridians.forEach((m, j) => {
        const phi = spin + (j / MERIDIANS) * Math.PI;
        m.setAttribute(
          "d",
          globeLine((t) => [
            GLOBE_R * Math.cos(t) * Math.cos(phi),
            GLOBE_R * Math.sin(t),
            GLOBE_R * Math.cos(t) * Math.sin(phi),
          ])
        );
      });
      latitudes.forEach((m, j) => {
        const lat = LATITUDES[j] * DEG;
        const rr = GLOBE_R * Math.cos(lat);
        const yy = GLOBE_R * Math.sin(lat);
        m.setAttribute("d", globeLine((t) => [rr * Math.cos(t), yy, rr * Math.sin(t)]));
      });

      // light sweeps across the globe
      const L = -2.35 + p * 1.5;
      if (orbGrad) {
        orbGrad.setAttribute("fx", (0.5 + 0.3 * Math.cos(L)).toFixed(3));
        orbGrad.setAttribute("fy", (0.5 + 0.3 * Math.sin(L)).toFixed(3));
      }
      if (shade) {
        shade.setAttribute("cx", (0.5 + 0.2 * Math.cos(L)).toFixed(3));
        shade.setAttribute("cy", (0.5 + 0.2 * Math.sin(L)).toFixed(3));
      }
    };

    if (reduce) {
      render(0.55, 0);
      onProgressRef.current?.(0.55);
      return;
    }

    let active = false;
    const tick = (_t: number, deltaMs: number) => {
      time += Math.min(deltaMs, 50) / 1000;
      current += (target - current) * 0.16;
      if (Math.abs(target - current) < 0.0004) current = target;
      render(current, time);
    };

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${(narrow ? Math.max(2, scrollLength - 1) : scrollLength) * 100}%`,
      pin: true,
      onUpdate: (self) => {
        target = self.progress;
        onProgressRef.current?.(self.progress);
      },
    });

    // run the loop only while the scene is on screen
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !active) {
          active = true;
          gsap.ticker.add(tick);
        } else if (!entry.isIntersecting && active) {
          active = false;
          gsap.ticker.remove(tick);
        }
      },
      { rootMargin: "20% 0px" }
    );
    io.observe(section);

    target = current = st.progress;
    render(current, 0);

    return () => {
      io.disconnect();
      gsap.ticker.remove(tick);
      st.kill();
    };
  }, [scrollLength]);

  const comets = RINGS.flatMap((ring, i) => ring.comets.map((_, c) => ({ ring, key: `${i}-${c}` })));

  const tailPairs = comets.flatMap(({ ring, key }) =>
    Array.from({ length: TAIL_SEGMENTS }, (_, s) => ({ ring, key: `${key}-${s}` }))
  );

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 flex h-[64%] items-center justify-center md:inset-0 md:h-full"
      >
        <svg
          ref={svgRef}
          viewBox="-500 -500 1000 1000"
          className="h-[min(122vw,76vh)] w-[min(122vw,76vh)] md:h-[min(104vh,68vw)] md:w-[min(104vh,68vw)]"
          style={{ overflow: "visible" }}
        >
          <defs>
            <radialGradient id="orb-fill" cx="0.5" cy="0.5" r="0.62" fx="0.29" fy="0.29">
              <stop offset="0" stopColor="#d9d3ff" />
              <stop offset="0.18" stopColor="#9a8bff" />
              <stop offset="0.48" stopColor="#5a45e6" />
              <stop offset="0.8" stopColor="#24186e" />
              <stop offset="1" stopColor="#0d0a24" />
            </radialGradient>
            <radialGradient id="orb-shade" cx="0.36" cy="0.36" r="0.78">
              <stop offset="0" stopColor="#06051a" stopOpacity="0" />
              <stop offset="0.5" stopColor="#06051a" stopOpacity="0.04" />
              <stop offset="0.82" stopColor="#06051a" stopOpacity="0.55" />
              <stop offset="1" stopColor="#06051a" stopOpacity="0.85" />
            </radialGradient>
            <linearGradient id="orb-rim" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="rgb(190,180,255)" stopOpacity="0.75" />
              <stop offset="0.5" stopColor="rgb(154,139,255)" stopOpacity="0.2" />
              <stop offset="1" stopColor="rgb(77,224,255)" stopOpacity="0.35" />
            </linearGradient>
            <radialGradient id="orb-glow">
              <stop offset="0" stopColor="rgb(110,91,255)" stopOpacity="0.42" />
              <stop offset="0.35" stopColor="rgb(110,91,255)" stopOpacity="0.16" />
              <stop offset="1" stopColor="rgb(110,91,255)" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="halo">
              <stop offset="0" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="0.25" stopColor="rgb(154,139,255)" stopOpacity="0.45" />
              <stop offset="1" stopColor="rgb(110,91,255)" stopOpacity="0" />
            </radialGradient>
            <clipPath id="orb-clip">
              <circle r={GLOBE_R} />
            </clipPath>
          </defs>

          <g data-stars>
            {STARS.map((s, i) => (
              <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#c9c4ff" opacity={s.o} />
            ))}
          </g>

          <g data-scene opacity="0.6">
            <circle r={GLOBE_R * 2.6} fill="url(#orb-glow)" />

            {/* behind the globe */}
            {RINGS.map((ring, i) => (
              <path key={`rb${i}`} data-ring-back fill="none" stroke={`rgba(${ring.color},0.22)`} strokeWidth="1.2" />
            ))}
            {tailPairs.map(({ ring, key }) => (
              <path key={`tb${key}`} data-tail="back" fill="none" stroke={`rgb(${ring.color})`} strokeLinecap="round" opacity="0" />
            ))}
            {comets.map(({ key }) => (
              <g key={`hb${key}`}>
                <circle data-halo="back" r="0" fill="url(#halo)" opacity="0" />
                <circle data-head="back" r="0" fill="#ffffff" opacity="0" />
              </g>
            ))}

            {/* the globe */}
            <circle r={GLOBE_R} fill="url(#orb-fill)" />
            <g clipPath="url(#orb-clip)">
              {Array.from({ length: MERIDIANS }, (_, j) => (
                <path key={`m${j}`} data-meridian fill="none" stroke="rgba(237,237,242,0.17)" strokeWidth="1" />
              ))}
              {LATITUDES.map((_, j) => (
                <path key={`l${j}`} data-latitude fill="none" stroke="rgba(237,237,242,0.12)" strokeWidth="1" />
              ))}
            </g>
            <circle r={GLOBE_R} fill="url(#orb-shade)" />
            <circle r={GLOBE_R - 0.6} fill="none" stroke="url(#orb-rim)" strokeWidth="1.4" />

            {/* in front of the globe */}
            {RINGS.map((ring, i) => (
              <path key={`rf${i}`} data-ring-front fill="none" stroke={`rgba(${ring.color},0.6)`} strokeWidth="1.4" />
            ))}
            {tailPairs.map(({ ring, key }) => (
              <path key={`tf${key}`} data-tail="front" fill="none" stroke={`rgb(${ring.color})`} strokeLinecap="round" opacity="0" />
            ))}
            {comets.map(({ key }) => (
              <g key={`hf${key}`}>
                <circle data-halo="front" r="0" fill="url(#halo)" opacity="0" />
                <circle data-head="front" r="0" fill="#ffffff" opacity="0" />
              </g>
            ))}
          </g>
        </svg>
      </div>

      {children && (
        <div className="relative z-20 flex h-full w-full items-end pb-10 md:items-center md:pb-0">
          {children}
        </div>
      )}
    </section>
  );
}
