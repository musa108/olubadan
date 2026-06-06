import LineProfilesPage from "@/components/LineProfilesPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mogajis Chieftaincy Line | Palace of the Olubadan of Ibadanland",
  description: "Explore the directory of the Mogajis (compound/family heads) of Ibadanland. Discover their traditional family heritage and compound leadership roles.",
};

export default function MogajiLinePage() {
  return <LineProfilesPage line="mogaji" />;
}
