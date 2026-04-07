import { GraduationCap, BookOpen, ClipboardCheck, CalendarDays, Users, BarChart3, Bell, Clock } from "lucide-react";

const studentFeatures = [
  { icon: ClipboardCheck, text: "Öğretmeninizin size verdiği sınav notlarını anlık takip edin" },
  { icon: BarChart3, text: "Ezber ilerlemenizi grafiklerle görüntüleyin" },
  { icon: CalendarDays, text: "Günlük tekrar ve ezber planınıza kolayca erişin" },
  { icon: Bell, text: "Tekrar vakitleriniz için hatırlatmalar alın" },
];

const teacherFeatures = [
  { icon: Users, text: "Öğrencilerinizin ezber ilerlemesini tek panelden takip edin" },
  { icon: ClipboardCheck, text: "Sınav oluşturun, notları kaydedin ve değerlendirin" },
  { icon: Clock, text: "Devamsızlık ve katılım takibini kolayca yapın" },
  { icon: BarChart3, text: "Sınıf bazlı başarı raporlarını görüntüleyin" },
];

export default function PortalSection() {
  return (
    <section className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-dark mb-3">
            Öğrenci Ve Eğitmen Portalı
          </h2>
          <div className="w-16 h-1 bg-earth/30 mx-auto rounded-full mb-6" />
          <p className="text-earth text-lg leading-relaxed">
            Hıfz yolculuğunuzda yanınızda olan dijital bir rehber.
            Öğrenciler ve eğitmenler için özel olarak tasarlanmış portal
            sistemiyle ezber takibi artık çok daha kolay.
          </p>
          <p className="mt-4 text-sm text-earth/70">
            Not: Bu portal bölümü şu an tanıtım aşamasında. Giriş ekranları henüz aktif değil.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Student Portal Card */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#156068]/10 to-[#156068]/5 rounded-3xl blur-xl opacity-100" />
            <div className="relative bg-ivory rounded-3xl p-8 border border-[#156068]/20 shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#156068]/10 flex items-center justify-center">
                  <GraduationCap className="w-7 h-7 text-[#156068]" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-dark">
                    Öğrenci Girişi
                  </h3>
                  <p className="text-sm text-earth/60">Ezber yolculuğunuzu takip edin</p>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                {studentFeatures.map((f, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#156068]/5 flex items-center justify-center mt-0.5">
                      <f.icon className="w-4 h-4 text-[#156068]" />
                    </div>
                    <p className="text-sm text-earth leading-relaxed">{f.text}</p>
                  </div>
                ))}
              </div>

              <button
                disabled
                className="w-full py-3.5 rounded-xl bg-[#156068]/10 text-[#156068] font-medium text-sm cursor-not-allowed flex items-center justify-center gap-2"
              >
                <span>Yakında Hizmetinizde</span>
              </button>
            </div>
          </div>

          {/* Teacher Portal Card */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#6E6445]/10 to-[#6E6445]/5 rounded-3xl blur-xl opacity-100" />
            <div className="relative bg-ivory rounded-3xl p-8 border border-[#6E6445]/20 shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#6E6445]/10 flex items-center justify-center">
                  <BookOpen className="w-7 h-7 text-[#6E6445]" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-dark">
                    Eğitmen Girişi
                  </h3>
                  <p className="text-sm text-earth/60">Öğrencilerinizi kolayca yönetin</p>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                {teacherFeatures.map((f, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#6E6445]/5 flex items-center justify-center mt-0.5">
                      <f.icon className="w-4 h-4 text-[#6E6445]" />
                    </div>
                    <p className="text-sm text-earth leading-relaxed">{f.text}</p>
                  </div>
                ))}
              </div>

              <button
                disabled
                className="w-full py-3.5 rounded-xl bg-[#6E6445]/10 text-[#6E6445] font-medium text-sm cursor-not-allowed flex items-center justify-center gap-2"
              >
                <span>Yakında Hizmetinizde</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
