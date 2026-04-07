"use client";

import { useEffect, useState } from "react";

interface PageRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
}

export function PageReveal({
  children,
  delay = 0,
  direction = "up",
  distance = 30,
  duration = 900,
}: PageRevealProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50 + delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const translateMap = {
    up: `translateY(${distance}px)`,
    left: `translateX(${distance}px)`,
    right: `translateX(-${distance}px)`,
    none: "translateY(0)",
  };

  return (
    <div
      style={{
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0) translateX(0)" : translateMap[direction],
        filter: mounted ? "blur(0px)" : "blur(3px)",
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, filter ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: mounted ? "auto" : "opacity, transform, filter",
      }}
    >
      {children}
    </div>
  );
}

export function StaggerChildren({ children }: { children: React.ReactNode[] | React.ReactNode }) {
  const items = Array.isArray(children) ? children : [children];

  return (
    <>
      {items.map((child, i) => (
        <PageReveal key={i} delay={i * 120}>
          {child}
        </PageReveal>
      ))}
    </>
  );
}
