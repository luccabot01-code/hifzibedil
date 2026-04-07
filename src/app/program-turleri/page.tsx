import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import ProgramTurleriSection from "@/components/ProgramTurleriSection";
import { siteDescription } from "@/lib/site";

export const metadata: Metadata = {
  title: "Program Türleri",
  description: `${siteDescription} 6, 4, 2 ve 1 yıllık program seçeneklerini bu sayfada inceleyebilirsiniz.`,
};

export default function ProgramTurleriPage() {
  return (
    <PageLayout>
      <ProgramTurleriSection headingLevel="h1" />
    </PageLayout>
  );
}
