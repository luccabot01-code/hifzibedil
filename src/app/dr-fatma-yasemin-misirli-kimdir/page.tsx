import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { PageReveal } from "@/components/PageReveal";
import { siteDescription } from "@/lib/site";

export const metadata: Metadata = {
  title: "Dr. Fatma Yasemin Mısırlı Kimdir?",
  description: siteDescription,
};

export default function DrFatmaYaseminMisirliPage() {
  return (
    <PageLayout>
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-ivory/70 backdrop-blur-sm rounded-2xl border border-sand/50 shadow-sm px-4 sm:px-12 py-8 sm:py-10">
            <PageReveal delay={0}>
              <div className="text-center mb-10">
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-dark mb-3">
                  Dr. Fatma Yasemin Mısırlı Kimdir?
                </h1>
                <div className="w-16 h-1 bg-earth/30 mx-auto rounded-full" />
              </div>
            </PageReveal>

            <PageReveal delay={150}>
              <p className="text-base sm:text-lg leading-relaxed text-earth text-center">
                Bu sayfanın içeriği daha sonra eklenecek.
              </p>
            </PageReveal>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
