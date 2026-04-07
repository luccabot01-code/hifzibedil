import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import FAQSection from "@/components/FAQSection";
import { siteDescription } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sıkça Sorulan Sorular",
  description: `${siteDescription} Programın işleyişi, kit içeriği ve kullanım şekliyle ilgili sık sorulan sorular bu sayfada yer alır.`,
};

export default function SSSPage() {
  return (
    <PageLayout>
      <FAQSection headingLevel="h1" />
    </PageLayout>
  );
}
