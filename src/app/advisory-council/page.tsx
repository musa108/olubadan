import type { Metadata } from "next";
import LineProfilesPage from "@/components/LineProfilesPage";

export const metadata: Metadata = {
  title: "Royal Advisory Council | Palace of the Olubadan of Ibadanland",
  description:
    "Discover the Advisory Council of the Olubadan of Ibadanland — distinguished elders and dignitaries who counsel the throne on matters of governance and tradition.",
  keywords: ["Olubadan advisory council", "Ibadan royal council", "traditional council", "Yoruba elders"],
  openGraph: {
    title: "Royal Advisory Council | Olubadan Palace",
    description: "The distinguished council of elders advising the throne of the Olubadan of Ibadanland.",
    type: "website",
  },
};

export default function AdvisoryCouncilPage() {
  return <LineProfilesPage line="advisory-council" />;
}
