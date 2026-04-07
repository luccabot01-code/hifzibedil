"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { PageReveal } from "@/components/PageReveal";

interface FAQSectionProps {
  headingLevel?: "h1" | "h2";
}

const faqs = [
  {
    q: "Hıfz-ı Bedîl nedir?",
    a: "Türk ve Arap dünyasındaki ezber metodlarını harmanlayarak Kur'ân-ı Kerîm ezberine alternatif bir yaklaşım sunan, mâna bütünlüğünü korumak suretiyle sıralı ezber ve periyodik tekrar esasına göre tasarlanmış bir hafızlık programıdır.",
  },
  {
    q: "Hıfz-ı Bedîl ile hafızlığa başlamak için gerekli altyapı ne olmalıdır?",
    a: "Öğrenci Temel Kur'ân-ı Kerim Eğitimi almış olmalıdır. Akıcı ve yanlışsız olarak tecvidle okuyabilmeli, harfleri mahreç ve sıfatlarıyla doğru telaffuz etmeli, kısacası hatasız ezber yapma becerisine sahip olmalıdır.",
  },
  {
    q: "Programın işleyiş mantığı nedir?",
    a: "Her ayın birinci ve üçüncü haftasında yeni ezber, ikinci ve dördüncü haftasında ise tekrar yapılır. Ezber haftasında ezberlenen bölümler o günü takip eden günler boyunca her gün tekrarlanır. Tekrar haftası ise ezberin ekstra kuvvet bulduğu dönemdir. Her dört ayda bir sadece biriken ezbere odaklanılarak sınav gerçekleşir.",
  },
  {
    q: "Hıfz-ı Bedîl nerelerde uygulanabilir?",
    a: "Kur'an Kursları, Hafızlık eğitimi veren kurumlar, İlahiyat Fakülteleri, Öğrenci yurtları, Proje İmam Hatipler, Ev ortamı ve münferit olarak hafızlık yapmak isteyen bireyler tarafından uygulanabilir.",
  },
  {
    q: "Hıfz-ı Bedîl herhangi bir hafızlık müessesesinde uygulanabilir mi?",
    a: "Elbette. Hıfz-ı Bedîl'in bir kurs çatısı altında haftanın her günü öğretmenler kontrolünde ilerlemesi programın başarısını kat kat artıracak ve öğrencinin mesuliyetini azaltacaktır.",
  },
  {
    q: "Ferdî anlamda hafız hocalığı yapıyorum, Hıfz-ı Bedîl'i öğrencilerim için uygulayabilir miyim?",
    a: "Tabiki, Hıfz-ı Bedîl'in bir öğretmen kontrolünde ilerleyerek devam etmesi başarıyı artıran bir unsur olacaktır. Eğitmen ve öğrenci kılavuzundaki bilgiler çok detaylı olarak incelenmeli ve sıkça sorulan sorular okunmalıdır.",
  },
  {
    q: "Hıfz-ı Bedîl'i bireysel olarak uygulayabilir miyim?",
    a: "Eğer hafızlığa başlamak için gerekli alt yapıya sahipseniz Hıfz-ı Bedîl'i ferdi olarak uygulamanızda bir sorun yoktur. Bu hususu yetkili şahıslarca teyit ettirmenizi tavsiye etmekteyiz.",
  },
  {
    q: "Hıfz-ı Bedîl'de kaç farklı program türü bulunmaktadır?",
    a: "Hıfz-ı Bedîl'de dört farklı program türü bulunmaktadır. Bu programlar farklı şartlara ve ezber kabiliyetlerine sahip bireyleri göz önünde bulundurarak, onları günlük hayattan soğutmadan; 6, 4, 2, veya 1 yılda tamamlanma seçenekleriyle sunulmuştur.",
  },
  {
    q: "Hıfz-ı Bedîl Kit'i nedir?",
    a: "Hıfz-ı Bedîl Kiti, ezber yolculuğunuzda size eşlik etmek üzere özenle hazırlanmış özel bir settir. İçeriğinde; program takip takvimi ve ajandanın yanı sıra, sayfa takibini kolaylaştıran mıknatıslı ayraç ve rahat bir şekilde taşımayı sağlayan şık bir çanta yer alır.",
  },
  {
    q: "Program Takvimi nedir?",
    a: "Her öğrencinin programına (6, 4, 2 ve 1 Yıllık) uygun olarak ezber ve tekrar yapacağı günleri belirten, ay, hafta ve günlere bölünmüş, Takvim şeklinde tasarlanmış bir ders takip aracıdır.",
  },
  {
    q: "Program Ajandası nedir?",
    a: "Öğrenci ve Eğitmen için iki farklı şekilde hazırlanmış, Takvim ile entegre yazılı takip kılavuzudur.",
  },
  {
    q: "Öğrenci Ajandası nedir?",
    a: "Öğrenci için tüm program türlerine uygun hazırlanmış, ajanda şeklinde tasarlanmış bir çizelgedir. Ajanda üzerinde aylar, haftalar ve günler Takvim ile eş zamanlı olarak ilerler. Öğrenci, Ajandası üzerinde ders notlarını alabilir ve sınav takip çizelgesine notlarını işleyebilir.",
  },
  {
    q: "Eğitmen Ajandası nedir?",
    a: "Eğitmen için tüm program türlerine uygun hazırlanmış, ajanda şeklinde tasarlanmış bir çizelgedir. Eğitmen Ajandası öğrencileri takip amaçlı olarak eğitmenin haftalık ders notlarını girmesine ve her öğrenciye ait özel sınav karnesi üzerine öğrencinin sınav performansını işlemesine imkan verir.",
  },
  {
    q: "Başladığım program türü ile devam etmek zorunda mıyım?",
    a: "Hıfz-ı Bedîl'de başladığımız program türü ile bitirmek zorunda değiliz. Çünkü Hıfz-ı Bedîl, hayat yoğunluğuna giren veya tam tersine hayatının daha sakin bir devresine geçen öğrenciler için takvimler arası değişimi mümkün kılan bir sistemdir.",
  },
  {
    q: "Devam edilen program türüne istisnai dönemlerde ekleme veya çıkarma yapılabilir mi?",
    a: "Evet. Programdan çıkarılmak zorunda kalınan herhangi bir hafta programı bozmaz. Sadece totaldeki hafızlık süresini bir hafta uzatmış olur. Yine programa ilave edilen herhangi bir hafta programı bozmaz. Bilakis totaldeki hafızlık süresini bir hafta kısaltmış olur.",
  },
  {
    q: "Başka Sorum Var…",
    a: "Detaylı bilgi ve diğer sorularınız için DM, e-mail veya WhatsApp üzerinden iletişime geçebilirsiniz. @hifzibedil | info@hifzibedil.com | +90 530 020 24 83",
  },
];

export default function FAQSection({
  headingLevel = "h2",
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const Heading = headingLevel;

  return (
    <section id="faq" className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-ivory/70 backdrop-blur-sm rounded-2xl border border-sand/50 shadow-sm px-4 sm:px-10 py-8 sm:py-10">
          <PageReveal delay={0}>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <Heading className="font-serif text-3xl sm:text-4xl font-bold text-dark mb-2">
                Sıkça Sorulan Sorular
              </Heading>
              <div className="w-16 h-1 bg-earth/30 mx-auto rounded-full" />
            </div>
          </PageReveal>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <PageReveal key={i} delay={150 + i * 80} duration={600}>
              <div
                className="bg-ivory rounded-xl border border-sand/40 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-beige/30 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-sand/40 flex items-center justify-center text-xs font-bold text-earth">
                      {i + 1}
                    </span>
                    <span className="font-medium text-dark text-sm sm:text-base">
                      {faq.q}
                    </span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-earth flex-shrink-0 transition-transform duration-300 ${
                      openIndex === i ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-300 ${
                    openIndex === i
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-5 pl-12 text-sm text-earth leading-relaxed">
                      {faq.a}
                    </div>
                  </div>
                </div>
              </div>
              </PageReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
