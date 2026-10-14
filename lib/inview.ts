/**
 * One shared IntersectionObserver for every "do this once when it scrolls
 * into view" effect, instead of a ScrollTrigger or observer per element.
 */
type Callback = () => void;

const callbacks = new WeakMap<Element, Callback>();
let observer: IntersectionObserver | null = null;

function get(): IntersectionObserver {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const cb = callbacks.get(entry.target);
          observer!.unobserve(entry.target);
          callbacks.delete(entry.target);
          cb?.();
        }
      },
      // Fire a little before the element's top reaches the bottom edge.
      { rootMargin: "0px 0px -10% 0px" }
    );
  }
  return observer;
}

/** Calls `cb` once when `el` enters the viewport. Returns an unsubscribe. */
export function observeOnce(el: Element, cb: Callback): () => void {
  const io = get();
  callbacks.set(el, cb);
  io.observe(el);
  return () => {
    io.unobserve(el);
    callbacks.delete(el);
  };
}
