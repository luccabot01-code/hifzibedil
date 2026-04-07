"use client";

import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import ImageLightbox from "@/components/ImageLightbox";
import { PageReveal } from "@/components/PageReveal";

const showcaseTabs = [
  {
    label: "Takvim & Takip",
    images: [
      { src: "/images/showcase/calendar-intro.png", alt: "Program Takvimi" },
      { src: "/images/showcase/exam-tracking.png", alt: "Sınav Takip" },
      { src: "/images/showcase/growing-surahs.png", alt: "Filizlenen Surelerim" },
    ],
  },
  {
    label: "Öğrenci Ajandası",
    images: [
      { src: "/images/agenda/agenda-intro.png", alt: "Program Ajandası" },
      { src: "/images/agenda/student-agenda-1.png", alt: "Öğrenci Ajandası" },
      { src: "/images/agenda/student-agenda-2.png", alt: "Öğrenci Ajandası Detay" },
      { src: "/images/agenda/student-agenda-usage.png", alt: "Öğrenci Ajandası Kullanım" },
      { src: "/images/agenda/student-calendar-integration.png", alt: "Takvim Entegrasyonu" },
      { src: "/images/agenda/student-tracking-integration.png", alt: "Takip Entegrasyonu" },
    ],
  },
  {
    label: "Eğitmen Ajandası",
    images: [
      { src: "/images/agenda/teacher-agenda-1.png", alt: "Eğitmen Ajandası" },
      { src: "/images/agenda/teacher-agenda-usage.png", alt: "Eğitmen Ajandası Kullanım" },
      { src: "/images/agenda/teacher-agenda-guide.png", alt: "Kullanım Kılavuzu" },
      { src: "/images/agenda/teacher-agenda-tracking.png", alt: "Eğitmen Takip" },
      { src: "/images/agenda/teacher-exam-week.png", alt: "Sınav Haftası" },
    ],
  },
];

export default function TakvimAjandaContent() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <PageLayout>
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-ivory/70 backdrop-blur-sm rounded-2xl border border-sand/50 shadow-sm px-4 sm:px-12 py-8 sm:py-10">
            <PageReveal delay={0}>
              <div className="max-w-3xl mx-auto text-center mb-12">
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-dark mb-2">
                  Takvim ve Ajanda Tanıtımı
                </h1>
                <div className="w-16 h-1 bg-earth/30 mx-auto rounded-full" />
              </div>
            </PageReveal>

            <PageReveal delay={200}>
              <div className="flex flex-wrap justify-center gap-3 mb-10">
                {showcaseTabs.map((tab, i) => (
                  <button
                    key={tab.label}
                    type="button"
                    onClick={() => setActiveTab(i)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      activeTab === i
                        ? "bg-[#A7A096] text-ivory shadow-md"
                        : "bg-ivory text-earth border border-[#A7A096]/30 hover:bg-[#A7A096]/10"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </PageReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {showcaseTabs[activeTab].images.map((img, i) => (
                <PageReveal key={`${activeTab}-${i}`} delay={50 + i * 60} duration={350}>
                  <div
                    className="rounded-2xl overflow-hidden bg-ivory border border-sand/40 shadow-sm hover:shadow-lg transition-shadow duration-300"
                  >
                    <ImageLightbox
                      src={img.src}
                      alt={img.alt}
                      width={400}
                      height={500}
                      className="w-full h-auto"
                    />
                    <div className="p-3 text-center">
                      <p className="text-sm text-earth font-medium">{img.alt}</p>
                    </div>
                  </div>
                </PageReveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
