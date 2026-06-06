"use client";

/**
 * Aurora — animated, blurred gradient "blobs" that drift slowly behind
 * content to create cinematic depth. Pure CSS animation (GPU friendly),
 * paused automatically under prefers-reduced-motion via globals.css.
 */
export default function Aurora({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div
        className="absolute -top-1/4 left-[8%] h-[42rem] w-[42rem] rounded-full opacity-50 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(110,91,255,0.55), transparent 65%)",
          animation: "drift 18s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-[-10%] right-[5%] h-[38rem] w-[38rem] rounded-full opacity-40 blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, rgba(61,214,245,0.4), transparent 65%)",
          animation: "drift 22s ease-in-out infinite reverse",
        }}
      />
      <div
        className="absolute left-1/2 top-1/3 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full opacity-30 blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, rgba(154,139,255,0.5), transparent 60%)",
          animation: "drift 26s ease-in-out infinite",
        }}
      />
    </div>
  );
}
