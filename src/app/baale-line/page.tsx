import LineProfilesPage from "@/components/LineProfilesPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Baales of Ibadanland Chieftaincy Line | Palace of the Olubadan of Ibadanland",
  description: "Explore the directory of the Baales (traditional community heads) of Ibadanland. Discover their histories, roles, and traditional community leadership.",
};

export default function BaaleLinePage() {
  return <LineProfilesPage line="baale" />;
}
