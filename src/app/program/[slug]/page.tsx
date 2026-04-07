import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageLayout from "@/components/PageLayout";
import { PageReveal } from "@/components/PageReveal";
import ScrollToTop from "@/components/ScrollToTop";
import ProgramDetailTabs from "./ProgramDetailTabs";
import BackButton from "./BackButton";

const programData: Record<
  string,
  {
    label: string;
    hex: string;
    folder: string;
    description: string;
  }
> = {
  "6yil": {
    label: "6 Yıllık Program",
    hex: "#CDCBB7",
    folder: "6year",
    description:
      "6 yıllık program, Kur'an-ı Kerim'i tam olarak hıfzetmeyi hedefleyen en kapsamlı programdır. Günlük hayattan kopmadan, düzenli ve sürdürülebilir bir tempoda ilerleyerek 6 yıl içinde hıfzınızı tamamlayabilirsiniz.",
  },
  "4yil": {
    label: "4 Yıllık Program",
    hex: "#D9BCB4",
    folder: "4year",
    description:
      "4 yıllık program, orta düzey bir tempo ile hıfzını tamamlamak isteyenler için tasarlanmıştır. Düzenli çalışma disipliniyle 4 yıl içinde Kur'an-ı Kerim'i ezberleyebilirsiniz.",
  },
  "2yil": {
    label: "2 Yıllık Program",
    hex: "#C1D2D2",
    folder: "2year",
    description:
      "2 yıllık program, yoğun tempoda çalışarak kısa sürede hıfzını tamamlamak isteyenler için uygundur. Güçlü bir ezber kabiliyeti ve yüksek motivasyon gerektirir.",
  },
  "1yil": {
    label: "1 Yıllık Program",
    hex: "#E8CCB2",
    folder: "1year",
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
    <PageLayout>
      <ScrollToTop />
      <section className="py-12 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <PageReveal>
            <div className="text-center mb-10">
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-dark mb-2">
                {program.label}
              </h1>
              <div
                className="w-16 h-1 mx-auto rounded-full mb-4"
                style={{ backgroundColor: program.hex }}
              />
              <p className="text-earth text-lg max-w-2xl mx-auto">
                {program.description}
              </p>
            </div>
          </PageReveal>

          <PageReveal delay={150}>
            <ProgramDetailTabs tabs={tabs} hex={program.hex} label={program.label} />
          </PageReveal>

          <PageReveal delay={300}>
            <div className="text-center mt-10">
              <BackButton />
            </div>
          </PageReveal>
        </div>
      </section>
    </PageLayout>
  );
}
