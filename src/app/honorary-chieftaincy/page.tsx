import type { Metadata } from "next";
import LineProfilesPage from "@/components/LineProfilesPage";

export const metadata: Metadata = {
  title: "Honorary Chieftaincy | Palace of the Olubadan of Ibadanland",
  description:
    "Explore the directory of Honorary Chieftaincy title holders recognised by the Palace of the Olubadan of Ibadanland — individuals honoured for distinguished service.",
  keywords: ["honorary chieftaincy", "Ibadan honorary title", "Olubadan palace honours", "Yoruba traditional title"],
  openGraph: {
    title: "Honorary Chieftaincy | Olubadan Palace",
    description: "Individuals honoured with honorary chieftaincy titles by the Palace of the Olubadan.",
    type: "website",
  },
};

export default function HonoraryChieftaincyPage() {
  return <LineProfilesPage line="honorary" />;
}
