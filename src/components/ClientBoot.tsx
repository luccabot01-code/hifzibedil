"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { SCROLL_TO_PROGRAMS_STORAGE_KEY } from "@/lib/home-navigation";

function scrollDocumentTop() {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

function scrollToProgramsSection() {
  document.getElementById("programs")?.scrollIntoView({
    block: "start",
    behavior: "auto",
  });
}

export default function ClientBoot() {
  useEffect(() => {
    const preventImageContextMenu = (e: MouseEvent) => {
      const target = e.target;
      if (target instanceof HTMLImageElement) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", preventImageContextMenu, true);
    return () =>
      document.removeEventListener("contextmenu", preventImageContextMenu, true);
  }, []);

  const pathname = usePathname();

  useLayoutEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const prevRestoration = history.scrollRestoration;
    history.scrollRestoration = "manual";

    if (window.location.hash) {
      window.history.replaceState(
        window.history.state,
        "",
        window.location.pathname + window.location.search
      );
    }

    let goPrograms = false;
    try {
      if (sessionStorage.getItem(SCROLL_TO_PROGRAMS_STORAGE_KEY) === "1") {
        sessionStorage.removeItem(SCROLL_TO_PROGRAMS_STORAGE_KEY);
        goPrograms = true;
      }
    } catch {
      /* private mode */
    }

    if (goPrograms) {
      scrollToProgramsSection();
      const t0 = window.setTimeout(scrollToProgramsSection, 0);
      const t1 = window.setTimeout(scrollToProgramsSection, 50);
      const t2 = window.setTimeout(scrollToProgramsSection, 150);
      const raf = requestAnimationFrame(() => {
        scrollToProgramsSection();
        requestAnimationFrame(scrollToProgramsSection);
      });

      const onPageShow = () => scrollToProgramsSection();
      const onLoad = () => scrollToProgramsSection();
      window.addEventListener("pageshow", onPageShow);
      window.addEventListener("load", onLoad);

      return () => {
        window.removeEventListener("pageshow", onPageShow);
        window.removeEventListener("load", onLoad);
        window.clearTimeout(t0);
        window.clearTimeout(t1);
        window.clearTimeout(t2);
        cancelAnimationFrame(raf);
        history.scrollRestoration = prevRestoration;
      };
    }

    scrollDocumentTop();

    const onPageShow = (e: PageTransitionEvent) => {
      scrollDocumentTop();
      if (e.persisted) {
        requestAnimationFrame(() => scrollDocumentTop());
      }
    };

    const onLoad = () => scrollDocumentTop();

    window.addEventListener("pageshow", onPageShow);
    window.addEventListener("load", onLoad);

    const t0 = window.setTimeout(scrollDocumentTop, 0);
    const t1 = window.setTimeout(scrollDocumentTop, 100);

    return () => {
      window.removeEventListener("pageshow", onPageShow);
      window.removeEventListener("load", onLoad);
      window.clearTimeout(t0);
      window.clearTimeout(t1);
      history.scrollRestoration = prevRestoration;
    };
  }, [pathname]);

  return null;
}
