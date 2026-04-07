"use client";

import Image from "next/image";
import { useState } from "react";

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

export default function ShowcaseSection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-20 bg-beige/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-dark mb-2">
            Takvim ve Ajanda Tanıtımı
          </h2>
          <div className="w-16 h-1 bg-earth/30 mx-auto rounded-full" />
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {showcaseTabs.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(i)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === i
                  ? "bg-earth text-ivory shadow-md"
                  : "bg-ivory text-earth border border-sand hover:bg-sand/30"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {showcaseTabs[activeTab].images.map((img, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden bg-ivory border border-sand/40 shadow-lg transition-shadow duration-300"
            >
              <Image
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
          ))}
        </div>
      </div>
    </section>
  );
}
