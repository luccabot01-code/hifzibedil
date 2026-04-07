import type { Metadata } from "next";
import { Package, Calendar, BookMarked, Bookmark, ShoppingBag } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import ImageLightbox from "@/components/ImageLightbox";
import { PageReveal } from "@/components/PageReveal";
import { siteDescription } from "@/lib/site";

const kitItems = [
  { icon: Calendar, label: "Program Takip Takvimi" },
  { icon: BookMarked, label: "Öğrenci / Eğitmen Ajandası" },
  { icon: Bookmark, label: "Mıknatıslı Ayraç" },
  { icon: ShoppingBag, label: "Şık Taşıma Çantası" },
];

export const metadata: Metadata = {
  title: "Hıfz-ı Bedîl Kiti",
  description: `${siteDescription} Hıfz-ı Bedîl Kiti; takvim, ajanda, ayraç ve taşıma çantasıyla ezber sürecini destekler.`,
};

export default function KitPage() {
  return (
    <PageLayout>
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-ivory/70 backdrop-blur-sm rounded-2xl border border-sand/50 shadow-sm px-4 sm:px-12 py-8 sm:py-10">
          <PageReveal delay={0}>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-dark mb-2">
                Hıfz-ı Bedîl Kiti
              </h1>
              <div className="w-16 h-1 bg-earth/30 mx-auto rounded-full mb-6" />
            </div>
          </PageReveal>

          <PageReveal delay={200}>
            <p className="text-earth text-lg text-center max-w-3xl mx-auto mb-12">
              Ezber yolculuğunuzda size eşlik etmek üzere özenle hazırlanmış özel
              bir set.
            </p>
          </PageReveal>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Kit Image */}
            <PageReveal delay={400}>
              <div className="rounded-2xl overflow-hidden">
                <ImageLightbox
                  src="/images/kit/kit.png"
                  alt="Hıfz-ı Bedîl Kiti"
                  width={600}
                  height={500}
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              </div>
            </PageReveal>

            {/* Kit Contents */}
            <div className="space-y-6">
              <PageReveal delay={500}>
                <div className="flex items-center gap-3 mb-4">
                  <Package className="w-6 h-6 text-earth" />
                  <h3 className="font-serif text-2xl font-semibold text-dark">
                    Kit İçeriği
                  </h3>
                </div>
              </PageReveal>

              <div className="space-y-4">
                {kitItems.map((item, i) => (
                  <PageReveal key={i} delay={600 + i * 150} direction="left" distance={24}>
                    <div
                      className="flex items-center gap-4 p-4 rounded-xl bg-beige/70 border border-sand/70 shadow-sm"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-ivory flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-earth" />
                      </div>
                      <span className="font-medium text-dark">{item.label}</span>
                    </div>
                  </PageReveal>
                ))}
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
