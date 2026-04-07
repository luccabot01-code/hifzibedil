import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { PageReveal } from "@/components/PageReveal";
import FeaturesSection from "@/components/FeaturesSection";
import ApplicationAreasSection from "@/components/ApplicationAreasSection";
import { siteDescription } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hıfz-ı Bedîl Nedir?",
  description: siteDescription,
};

export default function NedirPage() {
  return (
    <PageLayout>
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div className="bg-ivory/70 backdrop-blur-sm rounded-2xl border border-sand/50 shadow-sm px-4 sm:px-12 py-8 sm:py-10">
              <PageReveal delay={0}>
                <div className="text-center mb-10">
                  <h1 className="font-serif text-3xl sm:text-4xl font-bold text-dark mb-3">
                    Hıfz-ı Bedîl Nedir?
                  </h1>
                  <div className="w-16 h-1 bg-earth/30 mx-auto rounded-full" />
                </div>
              </PageReveal>

              <div className="space-y-8">
                <PageReveal delay={200}>
                  <p className="text-base sm:text-lg leading-relaxed text-earth">
                    Hıfz-ı Bedîl, Türk/Arap dünyasındaki ezber metodlarını
                    harmanlayarak onların kuvvetli yönlerini muhafaza edip, zayıf
                    yönlerini kuvvetlendiren bir hafızlık sistemidir. Mâna bütünlüğü
                    muhafaza edilecek şekilde sıralı ezber ve periyodik tekrar odaklı
                    olarak tasarlanmıştır. Sistem, modern çağın meşgul ve dağınık yapısı
                    göz önüne alınarak kurgulanmış ve öğrenciye dört farklı program türü
                    sunulmuştur. Bu seçenekler Hıfz-ı Bedîl Kiti içerisinde yer alan
                    Takvim ve Ajanda tasarımlarıyla desteklenmiş, güçlü bir öğrenci
                    takip sistemi oluşturulmuştur.
                  </p>
                </PageReveal>

                <PageReveal delay={400}>
                  <p className="text-base sm:text-lg leading-relaxed text-earth">
                    Hıfz-ı Bedîl başlangıç olarak, Kuran-ı Kerim ezberinde farklı
                    ezber kabiliyetlerine, farklı yaşlara ve farklı şartlara sahip
                    bireyler için mevcut hafızlık sisteminin tam olarak hitap
                    edemediği kanaatiyle 2014 yılında bir fikir olarak ortaya
                    atılmıştır. Sistemli bir yapı halinde on yılı aşkın süredir
                    Darusselam Vakfı çatısı altında başarıyla uygulanmaktadır. 2025
                    yılı itibarıyla Hıfz-ı Bedîl ismini alan bu alternatif yöntem,
                    bugün özel tasarımı, basit ve anlaşılır yapısıyla mütekamil bir
                    hafızlık programı olarak huzurlarınızdadır.
                  </p>
                </PageReveal>
              </div>
            </div>

            <PageReveal delay={600}>
              <div className="bg-ivory/70 backdrop-blur-sm rounded-2xl border border-sand/50 shadow-sm px-4 sm:px-6 py-4 sm:py-6">
                <FeaturesSection headingLevel="h2" sectionClassName="py-6 sm:py-8" />
              </div>
            </PageReveal>

            <PageReveal delay={800}>
              <div className="bg-ivory/70 backdrop-blur-sm rounded-2xl border border-sand/50 shadow-sm px-4 sm:px-6 py-4 sm:py-6">
                <ApplicationAreasSection
                  headingLevel="h2"
                  sectionClassName="py-6 sm:py-8"
                />
              </div>
            </PageReveal>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
