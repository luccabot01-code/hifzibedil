import Image from "next/image";
import { Package, Calendar, BookMarked, Bookmark, ShoppingBag } from "lucide-react";

const kitItems = [
  { icon: Calendar, label: "Program Takip Takvimi" },
  { icon: BookMarked, label: "Öğrenci / Eğitmen Ajandası" },
  { icon: Bookmark, label: "Mıknatıslı Ayraç" },
  { icon: ShoppingBag, label: "Şık Taşıma Çantası" },
];

export default function KitSection() {
  return (
    <section id="kit" className="py-20 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-dark mb-2">
            Hıfz-ı Bedîl Kiti
          </h2>
          <div className="w-16 h-1 bg-earth/30 mx-auto rounded-full mb-6" />
          <p className="text-earth text-lg">
            Ezber yolculuğunuzda size eşlik etmek üzere özenle hazırlanmış özel
            bir set.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          {/* Kit Image */}
          <div className="rounded-2xl overflow-hidden">
            <Image
              src="/images/kit/kit.png"
              alt="Hıfz-ı Bedîl Kiti"
              width={600}
              height={500}
              className="w-full h-auto rounded-2xl shadow-lg"
            />
          </div>

          {/* Kit Contents */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <Package className="w-6 h-6 text-earth" />
              <h3 className="font-serif text-2xl font-semibold text-dark">
                Kit İçeriği
              </h3>
            </div>

            <div className="space-y-4">
              {kitItems.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-xl bg-beige/40 border border-sand/30"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-ivory flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-earth" />
                  </div>
                  <span className="font-medium text-dark">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
