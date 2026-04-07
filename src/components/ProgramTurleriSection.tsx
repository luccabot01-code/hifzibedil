"use client";

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
  { year: "1", label: "1 Yıllık Program", image: "/yeniklasor/1yillik.png", hex: "#E8CCB2" },
];

export default function ProgramTurleriSection({
  headingLevel = "h2",
  showSubtitle = true,
}: ProgramTurleriSectionProps) {
  const Heading = headingLevel;

  const handleIncele = (href: string) => {
    window.location.href = href;
  };

  return (
    <section id="programs" className="py-12 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-12">
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

        <div className="max-w-3xl mx-auto flex flex-col gap-5">
          {programs.map((p, i) => (
            <ScrollReveal key={p.year} delay={100 + i * 120}>
              <div
                className="relative rounded-2xl overflow-hidden shadow-lg select-none group"
                onContextMenu={(e) => e.preventDefault()}
              >
                <Image
                  src={p.image}
                  alt={p.label}
                  width={1600}
                  height={800}
                  sizes="(max-width: 640px) 95vw, (max-width: 1024px) 80vw, 768px"
                  draggable={false}
                  className="w-full h-auto block pointer-events-none"
                />
                <button
                  type="button"
                  onClick={() => handleIncele(`/program/${p.year}yil`)}
                  className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 md:bottom-5 md:right-5 inline-flex items-center justify-center px-4 py-1.5 sm:px-6 sm:py-2.5 md:px-8 md:py-3 rounded-lg md:rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer"
                  style={{
                    backgroundColor: p.hex,
                    color: "#2C2C2C",
                  }}
                >
                  İncele
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1.5 sm:ml-2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </button>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
