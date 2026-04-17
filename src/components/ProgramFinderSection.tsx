import { ArrowRight, HelpCircle } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

export default function ProgramFinderSection() {
  return (
    <section id="program-finder" className="scroll-mt-24 pt-0 pb-10 sm:pt-0 sm:pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal duration={800} distance={32}>
          <div className="relative bg-gradient-to-br from-earth/5 to-sand/40 rounded-3xl p-10 sm:p-14 border border-sand/50 text-center overflow-hidden">
            <ScrollReveal delay={100} distance={24} duration={800}>
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-[#A7A096] flex items-center justify-center">
                  <HelpCircle className="w-8 h-8 text-ivory" />
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200} distance={24} duration={800}>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-dark mb-4">
                Benim İçin En Uygun Hıfz-ı Bedîl Programı Hangisidir?
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={300} distance={24} duration={800}>
              <p className="text-earth mb-8 max-w-xl mx-auto">
                Size en uygun programı belirlemek için kısa anketimizi
                doldurun.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={400} distance={24} duration={800}>
              <Link
                href="/program-bul"
                className="group inline-flex touch-manipulation items-center gap-2 px-8 py-4 bg-[#A7A096] text-ivory rounded-xl font-medium text-lg hover:bg-[#958d83] transition-[transform,box-shadow,background-color] duration-300 ease-out active:scale-[0.94] active:brightness-[0.97] active:shadow-[inset_0_2px_8px_rgba(58,44,30,0.12)] active:duration-150 shadow-lg hover:shadow-xl"
              >
                Programımı Bul
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </ScrollReveal>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
