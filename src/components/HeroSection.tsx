"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const introOffset = useRef(-45); // starts at -45deg, eases to 0
  const [loaded, setLoaded] = useState(false);

  // Trigger entrance animations after mount
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const el = logoRef.current;
    if (!el) return;

    // Intro animation: ease -45 → 0 over 3s using rAF
    const startTime = performance.now();
    const duration = 3000;
    let introAnimId: number;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const animateIntro = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      introOffset.current = -45 * (1 - easeOutCubic(progress));

      const scrollDeg = window.scrollY * (180 / 1200);
      el.style.transform = `rotate(${introOffset.current + scrollDeg}deg)`;

      if (progress < 1) {
        introAnimId = requestAnimationFrame(animateIntro);
      }
    };

    introAnimId = requestAnimationFrame(animateIntro);
    return () => cancelAnimationFrame(introAnimId);
  }, []);

  useEffect(() => {
    const el = logoRef.current;
    if (!el) return;

    const handleScroll = () => {
      const scrollDeg = window.scrollY * (180 / 1200);
      el.style.transform = `rotate(${introOffset.current + scrollDeg}deg)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[110svh] flex flex-col sm:flex-row sm:items-center overflow-x-clip pt-16">
      {/* Background motif - right side only */}
      <div className="absolute inset-0 bg-ivory" />

      {/* Right-side logo watermark — 40% overflows right edge */}
      <div
        className={`absolute inset-y-0 right-0 flex items-center z-[2] pointer-events-none translate-x-[43%] -translate-y-[5%] transition-all duration-[2000ms] ease-out delay-300 ${
          loaded ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
      >
        <div
          ref={logoRef}
          className="relative w-[430px] h-[430px] sm:w-[800px] sm:h-[800px] lg:w-[1000px] lg:h-[1000px] will-change-transform"
          style={{
            transform: "rotate(-45deg)",
            opacity: 0.2,
            filter: "blur(0.5px)",
            maskImage: "radial-gradient(circle, black 50%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(circle, black 50%, transparent 80%)",
          }}
        >
          <Image
            src="/site-lgo/Untitled design (4).png"
            alt="Hıfz-ı Bedîl Logo"
            fill
            sizes="(max-width: 640px) 430px, (max-width: 1024px) 800px, 1000px"
            className="object-contain rounded-full"
            priority
          />
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-b from-transparent to-ivory z-10 pointer-events-none" />

      <div className="relative z-20 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full flex-1 flex flex-col sm:block sm:-mt-16 md:mt-0">
        <div className="max-w-2xl flex-1 flex flex-col py-10 sm:py-0 md:min-h-[72svh] md:justify-between md:gap-0 lg:min-h-0 lg:flex-none lg:justify-start lg:gap-24">

          {/* Grup 1: Besmele, başlık, slogan */}
          <div className="hero-tablet-portrait-copy-group space-y-0 mt-8 sm:mt-0 md:pt-4 lg:pt-0">
            {/* Besmele */}
            <div
              className={`w-36 h-36 sm:w-48 sm:h-48 relative -mt-[5.75rem] sm:-mt-36 mb-3 sm:-mb-8 transition-all duration-1000 ease-out select-none ${
                loaded ? "opacity-70 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              onContextMenu={(e) => e.preventDefault()}
            >
              <Image
                src="/yeniklasor/ss.png"
                alt=""
                fill
                sizes="(max-width: 640px) 144px, 192px"
                draggable={false}
                priority
                className="object-contain pointer-events-none"
              />
            </div>
            {/* Başlık */}
            <h1
              className={`font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight -mt-10 sm:mt-0 transition-all duration-1000 ease-out delay-200 ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ color: "#231F20" }}
            >
              Hıfz-ı Bedîl
            </h1>
            {/* Slogan */}
            <div
              className={`hero-tablet-portrait-subtitle space-y-0.5 sm:space-y-1 mt-2 transition-all duration-1000 ease-out delay-500 ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <p className="text-lg sm:text-2xl text-warm-gray font-serif italic">
                Ezberde Temekkün
              </p>
              <p className="text-lg sm:text-2xl text-warm-gray font-serif italic">
                Tekrarda Sebat
              </p>
            </div>
          </div>

          {/* Grup 2: Açıklama + butonlar — mobilde alta dayan */}
          <div className="mt-auto -translate-y-[15%] pb-10 space-y-5 sm:space-y-6 md:mt-0 md:max-w-xl md:translate-y-[-3%] md:pb-6 lg:max-w-none lg:-translate-y-[11%] lg:pb-0">
            {/* Açıklama */}
            <p
              className={`text-base sm:text-lg text-earth max-w-lg leading-relaxed transition-all duration-1000 ease-out delay-700 ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Kur&apos;ân-ı Kerîm ezberine alternatif bir yaklaşım sunan, sıralı
              ezber ve periyodik tekrar esasına göre tasarlanmış bir hafızlık
              programı.
            </p>
            {/* Butonlar */}
            <div
              className={`flex gap-3 sm:gap-4 transition-all duration-1000 ease-out delay-1000 ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <a
                href="#programs"
                className="inline-flex flex-1 items-center justify-center px-2.5 sm:px-5 py-2 sm:py-3 bg-[#A7A096] text-ivory rounded-xl text-[13px] sm:text-base font-medium text-center hover:bg-[#958d83] active:scale-95 transition-all duration-200"
              >
                Program Türleri
              </a>
              <a
                href="#program-finder"
                className="inline-flex flex-1 items-center justify-center px-2.5 sm:px-5 py-2 sm:py-3 border-2 border-earth/30 text-earth rounded-xl text-[13px] sm:text-base font-medium text-center leading-snug hover:bg-earth/5 active:scale-95 transition-all duration-200"
              >
                Programımı Bul
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
