"use client";

import { useEffect } from "react";

export default function ClientBoot() {
  useEffect(() => {
    const preventImageContextMenu = (e: MouseEvent) => {
      const target = e.target;
      if (target instanceof HTMLImageElement) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", preventImageContextMenu, true);

    if (window.location.pathname !== "/") {
      return () => {
        document.removeEventListener("contextmenu", preventImageContextMenu, true);
      };
    }

    const navigationEntry = window.performance?.getEntriesByType?.("navigation")?.[0] as
      | PerformanceNavigationTiming
      | undefined;

    const getNavigationType = () => {
      if (navigationEntry && "type" in navigationEntry) {
        return navigationEntry.type;
      }

      const legacyNavigation = window.performance?.navigation;

      if (!legacyNavigation) {
        return "navigate";
      }

      if (legacyNavigation.type === 1) {
        return "reload";
      }

      if (legacyNavigation.type === 2) {
        return "back_forward";
      }

      return "navigate";
    };

    if (getNavigationType() !== "reload") {
      return () => {
        document.removeEventListener("contextmenu", preventImageContextMenu, true);
      };
    }

    const previousScrollRestoration = window.history.scrollRestoration;

    const clearHash = () => {
      if (!window.location.hash) {
        return;
      }

      window.history.replaceState(
        window.history.state,
        "",
        window.location.pathname + window.location.search
      );
    };

    const resetScroll = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    const restoreScrollBehavior = () => {
      window.history.scrollRestoration = previousScrollRestoration || "auto";
    };

    const handlePageShow = () => {
      resetScroll();
      window.setTimeout(() => {
        resetScroll();
        restoreScrollBehavior();
      }, 150);
    };

    const handleLoad = () => {
      resetScroll();
      window.setTimeout(() => {
        resetScroll();
        restoreScrollBehavior();
      }, 150);
    };

    window.history.scrollRestoration = "manual";
    clearHash();
    resetScroll();

    const timerA = window.setTimeout(resetScroll, 0);
    const timerB = window.setTimeout(resetScroll, 150);
    const rafId = window.requestAnimationFrame(() => {
      resetScroll();
    });

    window.addEventListener("pageshow", handlePageShow, { once: true });
    window.addEventListener("load", handleLoad, { once: true });

    return () => {
      document.removeEventListener("contextmenu", preventImageContextMenu, true);
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(timerA);
      window.clearTimeout(timerB);
      window.removeEventListener("pageshow", handlePageShow);
      window.removeEventListener("load", handleLoad);
      restoreScrollBehavior();
    };
  }, []);

  return null;
}
