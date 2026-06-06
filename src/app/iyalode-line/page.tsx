import LineProfilesPage from "@/components/LineProfilesPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iyalode Chieftaincy Line | Palace of the Olubadan of Ibadanland",
  description: "The Iyalode is the paramount female title in the Ibadan traditional council, recognized as a voice of feminine leadership and commerce.",
};

export default function IyaladeLine() {
  return <LineProfilesPage line="iyalode" />;
}
