"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

const contributors = [
  { src: "/yeniklasor/darusselam.png", alt: "Darüsselam", className: "h-10 sm:h-12" },
  { src: "/yeniklasor/fatihbelediyesi.png", alt: "Fatih Belediyesi", className: "h-12 sm:h-16" },
  { src: "/yeniklasor/onenuqta.png", alt: "One Nuqta", className: "h-12 sm:h-16" },
  { src: "/yeniklasor/istanbul-kutu-logo-siyah.png", alt: "İstanbul Kutu", className: "h-4 sm:h-6" },
  { src: "/yeniklasor/arabic.png", alt: "Arabic Logo", className: "translate-y-1 h-16 sm:translate-y-1 sm:h-24" },
];

const SPEED = 40; // pixels per second

function LogoGroup({ groupIndex }: { groupIndex: number }) {
  return (
    <div
      aria-hidden={groupIndex > 0}
      className="marquee-group flex items-center gap-10 sm:gap-14 shrink-0 pr-10 sm:pr-14"
    >
      {contributors.map((c) => (
        <div
          key={`${c.alt}-${groupIndex}`}
          className={`flex-shrink-0 ${c.className ?? "h-8 sm:h-10"} w-auto brightness-0`}
        >
          <Image
            src={c.src}
            alt={c.alt}
            width={120}
            height={40}
            sizes="120px"
            loading="eager"
            draggable={false}
            className="h-full w-auto object-contain pointer-events-none"
            style={{ height: "100%", width: "auto" }}
          />
        </div>
      ))}
    </div>
  );
}

export default function ContributorsMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let offset = 0;
    let lastTime = 0;
    let rafId: number;

    // Get the width of one logo group (first child)
    const getGroupWidth = () => {
      const firstGroup = track.children[0] as HTMLElement | undefined;
      return firstGroup ? firstGroup.offsetWidth : 0;
    };

    const animate = (now: number) => {
      if (lastTime === 0) lastTime = now;
      const delta = (now - lastTime) / 1000; // seconds
      lastTime = now;

      const groupWidth = getGroupWidth();
      if (groupWidth > 0) {
        offset -= SPEED * delta;
        if (offset <= -groupWidth) {
          offset += groupWidth;
        }
        track.style.transform = `translate3d(${offset}px, 0, 0)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <section
      className="relative overflow-hidden border-t border-earth/10 bg-stone/40 select-none"
      onContextMenu={(e) => e.preventDefault()}
    >
      <ScrollReveal direction="none" duration={1000}>
        <div className="flex h-14 items-center overflow-hidden sm:h-[4.25rem]">
          <div
            ref={trackRef}
            className="flex w-max will-change-transform"
          >
            {/* Render enough groups to always fill the viewport */}
            {Array.from({ length: 6 }, (_, i) => (
              <LogoGroup key={i} groupIndex={i} />
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
