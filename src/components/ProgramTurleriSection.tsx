"use client";

import { type CSSProperties } from "react";
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
const STACK_GAP = "clamp(5.25rem, 14vw, 6.75rem)";
const STACK_MARGIN = "0px";
const STACK_EXIT_BUFFER = "calc(var(--stack-gap) * 0.5)";

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

  const handleIncele = (href: string) => {
    window.location.href = href;
  };

  return (
    <section
      id="programs"
      className="relative scroll-mt-24 bg-transparent pb-4 sm:pb-6"
    >
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
              className="sticky"
              style={{
                top: buildStickyTop(i),
                zIndex: i + 1,
                marginBottom: "var(--stack-margin)",
              }}
            >
              <div
                data-card-inner
                className="relative rounded-2xl select-none group"
                onContextMenu={(e) => e.preventDefault()}
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
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-5 md:right-5 inline-flex touch-manipulation items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-wide cursor-pointer group/btn transition-[transform,box-shadow,background-color] duration-300 ease-out active:scale-[0.94] active:brightness-[0.97] active:shadow-[inset_0_2px_8px_rgba(58,44,30,0.12)] active:duration-150"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${p.hex} 90%, white)`,
                    color: "#2C2C2C",
                    zIndex: 10,
                    boxShadow: `0 4px 16px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.08), 0 0 0 1px ${p.hex}22`,
                    border: `1px solid ${p.hex}44`,
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
