import LineProfilesPage from "@/components/LineProfilesPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Balogun Chieftaincy Line | Palace of the Olubadan of Ibadanland",
  description: "Explore the directory of the Balogun Chieftaincy Line (the warrior line) of Ibadanland. Discover their histories, roles, and traditional warrior lineage leadership.",
};

export default function BalogunLinePage() {
  return <LineProfilesPage line="balogun" />;
}
