import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";

export const metadata: Metadata = {
  title: "Program Detay",
  description: "Hıfz-ı Bedîl program detayları.",
};

export default function ProgramDetayPage() {
  return (
    <PageLayout>
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-dark mb-4">
            Program Detay
          </h1>
          <div className="w-16 h-1 bg-earth/30 mx-auto rounded-full mb-8" />
          <p className="text-earth text-lg">
            Bu sayfa yakında içerikle güncellenecektir.
          </p>
        </div>
      </section>
    </PageLayout>
  );
}
