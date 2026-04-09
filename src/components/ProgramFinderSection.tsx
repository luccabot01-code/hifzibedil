import { ExternalLink, HelpCircle } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export default function ProgramFinderSection() {
  return (
    <section id="program-finder" className="scroll-mt-24 py-10 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="relative bg-gradient-to-br from-earth/5 to-sand/40 rounded-3xl p-10 sm:p-14 border border-sand/50 text-center overflow-hidden">
            <ScrollReveal delay={100}>
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-[#A7A096] flex items-center justify-center">
                  <HelpCircle className="w-8 h-8 text-ivory" />
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={250}>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-dark mb-4">
                Benim İçin En Uygun Hıfz-ı Bedîl Programı Hangisidir?
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <p className="text-earth mb-8 max-w-xl mx-auto">
                Size en uygun programı belirlemek için kısa anketimizi
                doldurun.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={550}>
              <a
                href="https://form.typeform.com/to/S7zBWGFX?fbclid=PAdGRleAQ7n0dleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA8xMjQwMjQ1NzQyODc0MTQAAacWqvCmXjgcbPvjXFhiqaZ4YE7nNxgKQDSAyWXH023TiCQKj3ND4Io0kE6r0Q_aem_uM1XjnT74bkZfbPiQ7c23w&typeform-source=l.instagram.com&utm_source=ig&utm_medium=social&utm_content=link_in_bio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#A7A096] text-ivory rounded-xl font-medium text-lg hover:bg-[#958d83] transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                Programımı Bul
                <ExternalLink className="w-5 h-5" />
              </a>
            </ScrollReveal>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
