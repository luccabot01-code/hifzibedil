import type { Metadata } from "next";
import TakvimAjandaContent from "./TakvimAjandaContent";
import { siteDescription } from "@/lib/site";

export const metadata: Metadata = {
  title: "Takvim ve Ajanda Tanıtımı",
  description: `${siteDescription} Öğrenci ve eğitmen ajandalarıyla program takip materyallerini bu sayfada görebilirsiniz.`,
};

export default function TakvimAjandaPage() {
  return <TakvimAjandaContent />;
}
