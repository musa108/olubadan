import LineProfilesPage from "@/components/LineProfilesPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Otun Chieftaincy Line | Palace of the Olubadan of Ibadanland",
  description: "Explore the directory of the Otun Chieftaincy Line (the civil/statesman line) of Ibadanland. Discover their roles, traditional titles, and royal ascension leadership.",
};

export default function OtunLinePage() {
  return <LineProfilesPage line="otun" />;
}
