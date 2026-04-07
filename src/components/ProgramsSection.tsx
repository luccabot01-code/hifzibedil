"use client";

import Image from "next/image";
import { useState } from "react";

const programs = [
  {
    year: "6",
    label: "6 Yıllık Program",
    folder: "6year",
    color: "bg-earth/10",
  },
  {
    year: "4",
    label: "4 Yıllık Program",
    folder: "4year",
    color: "bg-sand/50",
  },
  {
    year: "2",
    label: "2 Yıllık Program",
    folder: "2year",
    color: "bg-earth/10",
  },
  {
    year: "1",
    label: "1 Yıllık Program",
    folder: "1year",
    color: "bg-sand/50",
  },
];

export default function ProgramsSection() {
  const [active, setActive] = useState(0);
  const program = programs[active];

  return (
    <section id="programs" className="py-20 bg-beige/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-dark mb-2">
            Program Türleri
          </h2>
          <div className="w-16 h-1 bg-earth/30 mx-auto rounded-full mb-6" />
          <p className="text-earth text-lg">
            Farklı şartlara ve ezber kabiliyetlerine sahip bireyleri göz önünde
            bulundurarak, günlük hayattan soğutmadan tasarlanmış dört farklı
            program.
          </p>
        </div>

        {/* Program Types Overview Image */}
        <div className="max-w-2xl mx-auto mb-12">
          <Image
            src="/images/program-types/program-types.png"
            alt="Hıfz-ı Bedîl Program Türleri"
            width={800}
            height={500}
            className="rounded-2xl shadow-lg w-full h-auto"
          />
        </div>

        {/* Program Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {programs.map((p, i) => (
            <button
              key={p.year}
              onClick={() => setActive(i)}
              className={`px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                active === i
                  ? "bg-earth text-ivory shadow-md"
                  : "bg-ivory text-earth border border-sand hover:bg-sand/30"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Active Program Content */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className={`rounded-2xl overflow-hidden border border-sand/40 ${program.color}`}>
            <div className="p-4">
              <h3 className="text-sm font-semibold text-dark mb-3 text-center">
                Program Hakkında
              </h3>
              <Image
                src={`/images/programs/${program.folder}/about.png`}
                alt={`${program.label} Hakkında`}
                width={400}
                height={500}
                className="rounded-xl w-full h-auto"
              />
            </div>
          </div>

          <div className={`rounded-2xl overflow-hidden border border-sand/40 ${program.color}`}>
            <div className="p-4">
              <h3 className="text-sm font-semibold text-dark mb-3 text-center">
                Program Takvimi
              </h3>
              <Image
                src={`/images/programs/${program.folder}/calendar.png`}
                alt={`${program.label} Takvimi`}
                width={400}
                height={500}
                className="rounded-xl w-full h-auto"
              />
            </div>
          </div>

          <div className={`rounded-2xl overflow-hidden border border-sand/40 ${program.color}`}>
            <div className="p-4">
              <h3 className="text-sm font-semibold text-dark mb-3 text-center">
                Ajanda & Set
              </h3>
              <Image
                src={`/images/programs/${program.folder}/set.png`}
                alt={`${program.label} Set`}
                width={400}
                height={500}
                className="rounded-xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
