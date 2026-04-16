import ScrollReveal from "@/components/ScrollReveal";

const paragraphs = [
  "Hafız olma arzusu taşıdığı halde çeşitli kaygılarla başlamaya cesaret edemeyen\u2026",
  "Hıfza başlayıp pek çok ezber yaptıktan sonra ikmal edemeyip yarım bırakma üzüntüsünü yaşayan\u2026",
  "Yanlış seçim ve yanlış uygulamalar sebebiyle hafızlık dönemini bezginlik ve bıkkınlık ile hatırlayan\u2026",
  "Bir şekilde hafız olduğu halde kendisini hiçbir zaman hafız saymayan\u2026",
  "Hafızlığını kuvvetli haslarla tamamladığı halde tekrar ciddiyetini hayatına yerleştiremeyip, elindeki büyük hazineyi kaybeden\u2026",
  "Bütün bunları veya bir kısmını esef ve pişmanlıkla idrak eden Kur\u2019ân talebelerine ithaf olunur.",
];

export default function DedicationSection() {
  return (
    <section className="pt-10 pb-12 sm:pt-12 sm:pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal duration={800} distance={32}>
          <div className="relative bg-ivory rounded-2xl p-8 sm:p-12 border border-sand/60 shadow-sm overflow-hidden">
            <span className="absolute top-4 left-6 text-6xl text-sand font-serif select-none leading-none">
              &ldquo;
            </span>

            <blockquote className="relative z-10 space-y-6 font-serif text-base sm:text-lg leading-relaxed text-earth italic pl-6">
              {paragraphs.map((text, i) => (
                <ScrollReveal key={i} delay={100 + i * 100} distance={24} duration={800}>
                  <p>{text}</p>
                </ScrollReveal>
              ))}
              <ScrollReveal delay={100 + paragraphs.length * 100} distance={24} duration={800}>
                <p className="text-dark font-semibold not-italic pt-2">
                  Umulur ki yeniden Kur&apos;an bahçelerine davet olunurlar&hellip;
                </p>
              </ScrollReveal>
            </blockquote>

            <span className="absolute -bottom-3 right-4 text-6xl text-sand font-serif select-none leading-none sm:bottom-3 sm:right-6">
              &rdquo;
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
