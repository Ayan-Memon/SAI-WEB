// "use client";

// import { useEffect } from "react";
// import Lenis from "lenis";

// export default function LenisProvider() {
//   useEffect(() => {
//     const lenis = new Lenis({
//       duration: 1.2,
//       smoothWheel: true,
//       wheelMultiplier: 0.8,
//       touchMultiplier: 1.2,
//       infinite: false,
//     });

//     function raf(time) {
//       lenis.raf(time);
//       requestAnimationFrame(raf);
//     }

//     requestAnimationFrame(raf);

//     return () => {
//       lenis.destroy();
//     };
//   }, []);

//   return null;
// }

"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function LenisProvider() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.2,
      infinite: false,
    });

    // Expose instance so other components/hooks can force a resize
    // (e.g. right after data/images finish loading) if ever needed.
    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    // --- THE FIX -------------------------------------------------------
    // Lenis measures the scrollable height once on init. When data loads
    // asynchronously (react-query fetches, images finishing loading,
    // Masonry re-laying-out items, etc.) the document grows AFTER that
    // measurement, so Lenis thinks the page is shorter than it really is
    // and refuses to scroll all the way to the new bottom.
    //
    // A ResizeObserver on <body> tracks every layout change (including
    // ones caused by images loading or query data rendering) and tells
    // Lenis to recompute its measurements automatically.
    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
    });
    resizeObserver.observe(document.body);

    // Also catch route/window resizes explicitly for good measure.
    const handleWindowResize = () => lenis.resize();
    window.addEventListener("resize", handleWindowResize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleWindowResize);
      cancelAnimationFrame(rafId);
      window.lenis = null;
      lenis.destroy();
    };
  }, []);

  return null;
}
