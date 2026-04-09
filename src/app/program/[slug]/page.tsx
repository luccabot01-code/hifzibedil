import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageLayout from "@/components/PageLayout";
import { PageReveal } from "@/components/PageReveal";
import ScrollToTop from "@/components/ScrollToTop";
import ProgramDetailTabs from "./ProgramDetailTabs";
import BackButton from "./BackButton";
import SixYearProgram from "./SixYearProgram";
import FourYearProgram from "./FourYearProgram";
import TwoYearProgram from "./TwoYearProgram";
import OneYearProgram from "./OneYearProgram";

const programData: Record<
  string,
  {
    label: string;
    hex: string;
    folder: string;
    description: string;
    backgroundLogoSrc: string;
    backgroundLogoOpacity?: number;
    backgroundLogoBlurPx?: number;
  }
> = {
  "6yil": {
    label: "6 Yıllık Program",
    hex: "#CDCBB7",
    folder: "6year",
    backgroundLogoSrc: "/yeniklasor/6yilyeni.png",
    backgroundLogoOpacity: 0.09,
    backgroundLogoBlurPx: 0,
    description:
      "6 yıllık program, Kur'an-ı Kerim'i tam olarak hıfzetmeyi hedefleyen en kapsamlı programdır. Günlük hayattan kopmadan, düzenli ve sürdürülebilir bir tempoda ilerleyerek 6 yıl içinde hıfzınızı tamamlayabilirsiniz.",
  },
  "4yil": {
    label: "4 Yıllık Program",
    hex: "#D9BCB4",
    folder: "4year",
    backgroundLogoSrc: "/yeniklasor/4yil.png",
    description:
      "4 yıllık program, orta düzey bir tempo ile hıfzını tamamlamak isteyenler için tasarlanmıştır. Düzenli çalışma disipliniyle 4 yıl içinde Kur'an-ı Kerim'i ezberleyebilirsiniz.",
  },
  "2yil": {
    label: "2 Yıllık Program",
    hex: "#C1D2D2",
    folder: "2year",
    backgroundLogoSrc: "/yeniklasor/2yil.png",
    description:
      "2 yıllık program, yoğun tempoda çalışarak kısa sürede hıfzını tamamlamak isteyenler için uygundur. Güçlü bir ezber kabiliyeti ve yüksek motivasyon gerektirir.",
  },
  "1yil": {
    label: "1 Yıllık Program",
    hex: "#E8CCB2",
    folder: "1year",
    backgroundLogoSrc: "/yeniklasor/1yil.png",
    description:
      "1 yıllık program, en yoğun tempoda ilerleyen ve hıfzını en kısa sürede tamamlamak isteyenler için tasarlanmıştır. Çok güçlü bir ezber kabiliyeti ve tam zamanlı adanmışlık gerektirir.",
  },
};

export async function generateStaticParams() {
  return Object.keys(programData).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const program = programData[slug];
  if (!program) return { title: "Program Bulunamadı" };
  return {
    title: program.label,
    description: program.description,
  };
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = programData[slug];

  if (!program) {
    notFound();
  }

  const programComponents: Record<string, React.ReactNode> = {
    "6yil": <SixYearProgram />,
    "4yil": <FourYearProgram />,
    "2yil": <TwoYearProgram />,
    "1yil": <OneYearProgram />,
  };

  const hasCustomComponent = slug in programComponents;

  const tabs = [
    {
      id: "about",
      title: "Program Hakkında",
      image: `/images/programs/${program.folder}/about.png`,
    },
    {
      id: "calendar",
      title: "Program Takvimi",
      image: `/images/programs/${program.folder}/calendar.png`,
    },
    {
      id: "set",
      title: "Ajanda & Set",
      image: `/images/programs/${program.folder}/set.png`,
    },
  ];

  return (
    <PageLayout
      backgroundLogoSrc={program.backgroundLogoSrc}
      backgroundLogoVariant="program"
      backgroundLogoOpacity={program.backgroundLogoOpacity}
      backgroundLogoBlurPx={program.backgroundLogoBlurPx}
    >
      <ScrollToTop />
      <section className="py-12 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 overflow-visible">
          <PageReveal>
            <div className="text-center mb-10">
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-dark mb-2">
                {program.label}
              </h1>
              <div
                className="w-16 h-1 mx-auto rounded-full mb-4"
                style={{ backgroundColor: program.hex }}
              />
            </div>
          </PageReveal>

          {hasCustomComponent ? (
            programComponents[slug]
          ) : (
            <PageReveal delay={150}>
              <ProgramDetailTabs tabs={tabs} hex={program.hex} label={program.label} />
            </PageReveal>
          )}

          <PageReveal delay={hasCustomComponent ? 400 : 300}>
            <div className="text-center mt-3 sm:mt-4">
              <BackButton />
            </div>
          </PageReveal>
        </div>
      </section>
    </PageLayout>
  );
}
