import { BookOpenCheck, GraduationCap, School, Home, UserCheck, Building, Landmark } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const areas = [
  { icon: BookOpenCheck, label: "Kur'an Kursları" },
  { icon: GraduationCap, label: "Hafızlık Eğitimi Veren Kurumlar" },
  { icon: Landmark, label: "İlahiyat Fakültelerinde Uygulanan Hafızlık Çalışmaları" },
  { icon: Building, label: "Öğrenci Yurtlarında Gerçekleşen Hafızlık Çalışmaları" },
  { icon: School, label: "Proje İmam Hatiplerde Uygulanan Hafızlık Çalışmaları" },
  { icon: Home, label: "Ev Ortamında Büyükler Eliyle Gerçekleşen Hafızlık Çalışmaları" },
  { icon: UserCheck, label: "Münferit Olarak Hafızlık Yapmak İsteyen Bireyler" },
];

interface ApplicationAreasSectionProps {
  headingLevel?: "h1" | "h2";
  sectionClassName?: string;
}

export default function ApplicationAreasSection({
  headingLevel = "h2",
  sectionClassName = "py-12 sm:py-20",
}: ApplicationAreasSectionProps) {
  const Heading = headingLevel;

  return (
    <section id="application-areas" className={sectionClassName}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <Heading className="font-serif text-3xl sm:text-4xl font-bold text-dark mb-2">
              Nerelerde Uygulanabilir?
            </Heading>
            <div className="w-16 h-1 bg-earth/30 mx-auto rounded-full" />
          </div>
        </ScrollReveal>

        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col gap-4">
            {areas.map((area, i) => (
              <ScrollReveal key={i} delay={100 + i * 100} direction="left" distance={24}>
                <div
                  className="flex items-center gap-4 p-4 rounded-xl bg-beige/70 border border-sand/30 transition-colors"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-ivory flex items-center justify-center">
                    <area.icon className="w-5 h-5 text-earth" />
                  </div>
                  <span className="text-sm font-medium text-dark">{area.label}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
