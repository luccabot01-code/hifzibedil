"use client";

import { useEffect, useLayoutEffect } from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function ScrollToTop() {
  useIsomorphicLayoutEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    // Fight any async scroll restoration
    const t1 = setTimeout(() => window.scrollTo(0, 0), 0);
    const t2 = setTimeout(() => window.scrollTo(0, 0), 50);
    const t3 = setTimeout(() => window.scrollTo(0, 0), 150);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);
  return null;
}
