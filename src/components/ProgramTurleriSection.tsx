"use client";

import { useRef, useEffect, useCallback, type CSSProperties } from "react";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

interface ProgramTurleriSectionProps {
  headingLevel?: "h1" | "h2";
  showSubtitle?: boolean;
}

const programs = [
  { year: "6", label: "6 Yıllık Program", image: "/yeniklasor/6yillik.png", hex: "#CDCBB7" },
  { year: "4", label: "4 Yıllık Program", image: "/yeniklasor/4yillik.png", hex: "#D9BCB4" },
  { year: "2", label: "2 Yıllık Program", image: "/yeniklasor/2yillik.png", hex: "#C1D2D2" },
  { year: "1", label: "1 Yıllık Has Programı", image: "/yeniklasor/1yillik.png", hex: "#E8CCB2" },
];

const STICKY_TOP = 76;
const STACK_GAP = "clamp(4.5rem, 13vw, 5.25rem)";
const STACK_MARGIN = "clamp(4.75rem, 14vw, 5.5rem)";
const STACK_EXIT_BUFFER = "calc(var(--stack-margin) * 0.5)";

const buildRepeatedGap = (count: number) => {
  if (count <= 0) return "0px";
  if (count === 1) return "var(--stack-gap)";
  return `calc(${Array.from({ length: count }, () => "var(--stack-gap)").join(" + ")})`;
};

const buildStickyTop = (index: number) => {
  if (index === 0) return `${STICKY_TOP}px`;
  return `calc(${STICKY_TOP}px + ${buildRepeatedGap(index)})`;
};

export default function ProgramTurleriSection({
  headingLevel = "h2",
  showSubtitle = true,
}: ProgramTurleriSectionProps) {
  const Heading = headingLevel;
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const handleIncele = (href: string) => {
    window.location.href = href;
  };

  /* Animate scale + brightness based on cumulative depth (how many cards sit on top) */
  const onScroll = useCallback(() => {
    const cards = cardsRef.current;
    const total = cards.length;

    /* Step 1 — calculate per-pair overlap progress (0 → 1) */
    const overlaps: number[] = [];
    for (let i = 0; i < total - 1; i++) {
      const card = cards[i];
      const nextCard = cards[i + 1];
      if (!card || !nextCard) { overlaps.push(0); continue; }

      const cardRect = card.getBoundingClientRect();
      const nextRect = nextCard.getBoundingClientRect();
      const overlap = cardRect.top + cardRect.height - nextRect.top;
      const maxOverlap = cardRect.height;
      const raw = overlap > 0 ? Math.min(overlap / maxOverlap, 1) : 0;
      overlaps.push(1 - Math.pow(1 - raw, 2)); // ease-out
    }

    /* Step 2 — apply cumulative depth-based styling */
    for (let i = 0; i < total - 1; i++) {
      const inner = cards[i]?.querySelector<HTMLElement>("[data-card-inner]");
      if (!inner) continue;

      const gradient = inner.querySelector<HTMLElement>("[data-card-gradient]");

      /* depth = sum of all overlap progresses from this card onwards */
      let depth = 0;
      for (let j = i; j < total - 1; j++) depth += overlaps[j];

      if (depth > 0) {
        const scale = 1 - depth * 0.055;
        const brightness = 1 - depth * 0.07;
        inner.style.transform = `scale(${Math.max(scale, 0.78)})`;
        inner.style.opacity = "1";
        inner.style.filter = `brightness(${Math.max(brightness, 0.65)})`;
        /* Fade gradient progressively — fully gone when depth reaches max (3) */
        if (gradient) gradient.style.opacity = `${Math.max(1 - depth * 0.35, 0)}`;
      } else {
        inner.style.transform = "scale(1)";
        inner.style.opacity = "1";
        inner.style.filter = "brightness(1)";
        if (gradient) gradient.style.opacity = "1";
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  return (
    <section id="programs" className="relative bg-transparent pb-4 sm:pb-6">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal duration={800} distance={32}>
          <div className="relative z-20 max-w-3xl mx-auto text-center mb-12">
            <Heading className="font-serif text-3xl sm:text-4xl font-bold text-dark mb-2">
              Program Türleri
            </Heading>
            <div
              className={`w-16 h-1 bg-earth/30 mx-auto rounded-full ${
                showSubtitle ? "mb-6" : "mb-0"
              }`}
            />
            {showSubtitle ? (
              <p className="text-earth text-lg">
                Farklı şartlara ve ezber kabiliyetlerine sahip bireyleri göz
                önünde bulundurarak, günlük hayattan soğutmadan tasarlanmış dört
                farklı program.
              </p>
            ) : null}
          </div>
        </ScrollReveal>

        {/* Sticky stacking cards */}
        <div
          className="max-w-5xl mx-auto"
          style={
            {
              "--stack-gap": STACK_GAP,
              "--stack-margin": STACK_MARGIN,
              "--stack-exit-buffer": STACK_EXIT_BUFFER,
              paddingBottom: "var(--stack-exit-buffer)",
            } as CSSProperties
          }
        >
          {programs.map((p, i) => (
            <div
              key={p.year}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className="sticky"
              style={{
                top: buildStickyTop(i),
                zIndex: i + 1,
                marginBottom: "var(--stack-margin)",
              }}
            >
              <div
                data-card-inner
                className="relative rounded-2xl select-none group will-change-[transform,filter]"
                onContextMenu={(e) => e.preventDefault()}
                style={{
                  transformOrigin: "center top",
                }}
              >
                <div className="relative rounded-2xl overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.label}
                    width={1600}
                    height={800}
                    sizes="(max-width: 640px) 95vw, (max-width: 1024px) 80vw, 768px"
                    draggable={false}
                    className="w-full h-auto block pointer-events-none"
                    style={{ borderRadius: "inherit" }}
                  />
                  {/* Smooth top-edge gradient overlay — contained inside overflow:hidden */}
                  <div
                    data-card-gradient
                    className="pointer-events-none absolute inset-x-0 top-0"
                    style={{
                      height: "40%",
                      background:
                        "linear-gradient(to bottom, rgba(245,240,235,0.95) 0%, rgba(245,240,235,0.7) 20%, rgba(245,240,235,0.35) 50%, rgba(245,240,235,0.1) 75%, transparent 100%)",
                    }}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleIncele(`/program/${p.year}yil`)}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-5 md:right-5 inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-wide cursor-pointer group/btn"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${p.hex} 90%, white)`,
                    color: "#2C2C2C",
                    zIndex: 10,
                    boxShadow: `0 4px 16px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.08), 0 0 0 1px ${p.hex}22`,
                    border: `1px solid ${p.hex}44`,
                    transition:
                      "background-color 0.3s ease, box-shadow 0.3s ease",
                  }}
                >
                  İncele
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-300 group-hover/btn:translate-x-0.5"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
