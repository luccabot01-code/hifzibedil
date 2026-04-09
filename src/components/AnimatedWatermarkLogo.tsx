"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type AnimatedWatermarkLogoProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  enableScrollRotate?: boolean;
  watermarkOpacity?: number;
  watermarkBlurPx?: number;
};

export default function AnimatedWatermarkLogo({
  src,
  alt,
  sizes,
  className = "",
  imageClassName = "",
  priority = false,
  enableScrollRotate = true,
  watermarkOpacity = 0.2,
  watermarkBlurPx = 0.5,
}: AnimatedWatermarkLogoProps) {
  const logoRef = useRef<HTMLDivElement>(null);
  const introOffset = useRef(-45);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const el = logoRef.current;
    if (!el) return;

    const startTime = performance.now();
    const duration = 3000;
    let introAnimId: number;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const animateIntro = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      introOffset.current = -45 * (1 - easeOutCubic(progress));

      const scrollDeg = enableScrollRotate ? window.scrollY * (180 / 1200) : 0;
      el.style.transform = `rotate(${introOffset.current + scrollDeg}deg)`;

      if (progress < 1) {
        introAnimId = requestAnimationFrame(animateIntro);
      }
    };

    introAnimId = requestAnimationFrame(animateIntro);
    return () => cancelAnimationFrame(introAnimId);
  }, [enableScrollRotate]);

  useEffect(() => {
    const el = logoRef.current;
    if (!el || !enableScrollRotate) return;

    const handleScroll = () => {
      const scrollDeg = window.scrollY * (180 / 1200);
      el.style.transform = `rotate(${introOffset.current + scrollDeg}deg)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [enableScrollRotate]);

  return (
    <div
      className={`pointer-events-none transition-all duration-[2000ms] ease-out delay-300 ${
        loaded ? "opacity-100 scale-100" : "opacity-0 scale-90"
      } ${className}`}
    >
      <div
        ref={logoRef}
        className="relative h-full w-full will-change-transform"
        style={{
          transform: "rotate(-45deg)",
          opacity: watermarkOpacity,
          filter: `blur(${watermarkBlurPx}px)`,
          maskImage: "radial-gradient(circle, black 50%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(circle, black 50%, transparent 80%)",
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-contain rounded-full ${imageClassName}`}
        />
      </div>
    </div>
  );
}
