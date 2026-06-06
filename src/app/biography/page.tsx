import type { Metadata } from "next";
import BiographyClient from "./BiographyClient";

export const metadata: Metadata = {
  title: "Biography of Oba Rashidi Adewolu Ladoja",
  description:
    "Read the full biography of Oba Rashidi Adewolu Ladoja — chemical engineer, senator, Governor of Oyo State, and the 44th Olubadan of Ibadanland.",
  keywords: ["Rashidi Ladoja", "Olubadan biography", "44th Olubadan", "Ibadan king", "Oyo State governor"],
  openGraph: {
    title: "Biography of Oba Rashidi Adewolu Ladoja | Olubadan Palace",
    description:
      "The life and legacy of Oba Rashidi Adewolu Ladoja — engineer, statesman, and paramount ruler of Ibadanland.",
    type: "profile",
  },
};

export default function BiographyPage() {
  return <BiographyClient />;
}
