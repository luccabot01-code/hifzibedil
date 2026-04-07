import {
  ListOrdered,
  RefreshCw,
  BookOpen,
  Users,
  CalendarDays,
  Heart,
  Repeat,
  Building2,
  User,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const features = [
  {
    icon: ListOrdered,
    title: "Sıralı Ezber",
    desc: "Cüz başlarından başlayarak düzenli devam eden bir sistemdir. Cüzler yarım kalmaz ve teselsül bozulmaz.",
  },
  {
    icon: RefreshCw,
    title: "Sistematik Tekrar",
    desc: "İlk günden son güne ezberlenen hiçbir sayfayı ihmal etmeyen, programa uyulduğu takdirde unutmaya imkan vermeyen bir sistemdir.",
  },
  {
    icon: BookOpen,
    title: "Mâna Bütünlüğü",
    desc: "Sıralı ezber sayesinde isteyen talebenin mana odaklı ilerlemesini mümkün kılan, hatta buna teşvik eden bir sistemdir.",
  },
  {
    icon: Users,
    title: "Normal Düzeyde Bir Ezber Kapasitesine Hitap",
    desc: "Sadece zeki öğrenciler için değil, disiplinli ve istekli her öğrenci için uygulanabilen bir sistemdir.",
  },
  {
    icon: CalendarDays,
    title: "Yaşam Şartlarına Uygun Esnek Yapı",
    desc: "Kişilere, hayat yoğunluklarını göz önüne alarak seçim sunan, uzun ve kısa periotlarla hafızlık yapmalarına imkan tanıyan bir sistemdir.",
  },
  {
    icon: Heart,
    title: "Hayatın İçinde Hafızlık",
    desc: "Kişilere hayattan soyutlanmadan hayatın içinde hafızlık yapma imkanı sunan ve hafızlığını hayatını ertelemeden yapmanın psikolojik rahatlığını yaşatan bir sistemdir.",
  },
  {
    icon: Repeat,
    title: "Ömür Boyu Tekrar Disiplini",
    desc: "Hayatın içinde kazandırdığı kişisel tekrar disiplini sayesinde, kişilere bir ömür devam edebilecekleri tekrar ciddiyetini yerleştiren bir sistemdir.",
  },
  {
    icon: Building2,
    title: "Kurum ve Müesseselerde Uygulanabilir",
    desc: "Her türlü müessesenin kendi stiline/programına kolayca uyarlayabileceği bir sistemdir.",
  },
  {
    icon: User,
    title: "Bireysel Kullanım",
    desc: "Bireysel kullanıma uygun tasarlanmış olmakla birlikte gereğinde destek ve yardım için hazır bir sistemdir.",
  },
];

interface FeaturesSectionProps {
  headingLevel?: "h1" | "h2";
  sectionClassName?: string;
}

export default function FeaturesSection({
  headingLevel = "h2",
  sectionClassName = "py-12 sm:py-20",
}: FeaturesSectionProps) {
  const Heading = headingLevel;

  return (
    <section id="features" className={sectionClassName}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Heading className="font-serif text-3xl sm:text-4xl font-bold text-dark mb-2">
              Sistemin Ayırt Edici Yönleri
            </Heading>
            <div className="w-16 h-1 bg-earth/30 mx-auto rounded-full" />
          </div>
        </ScrollReveal>

        <div className="features-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <ScrollReveal key={i} delay={100 + i * 100}>
              <div
                className="features-card group bg-ivory rounded-2xl p-6 border border-earth/20 shadow-lg transition-all duration-300 h-full"
              >
                <div className="features-card-inner flex items-start gap-4">
                  <div className="features-card-icon-box flex-shrink-0 w-12 h-12 rounded-xl bg-sand/40 flex items-center justify-center group-hover:bg-earth/10 transition-colors">
                    <f.icon className="features-card-icon w-6 h-6 text-earth" />
                  </div>
                  <div>
                    <h3 className="features-card-title font-semibold text-dark text-sm leading-tight mb-2">
                      {f.title}
                    </h3>
                    <p className="features-card-desc text-sm text-earth leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
