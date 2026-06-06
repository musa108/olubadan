import type { Metadata } from "next";
import IbadanHeritageClient from "./IbadanHeritageClient";

export const metadata: Metadata = {
  title: "The Heritage of Ibadan — History, Culture & Traditions",
  description:
    "Explore the rich cultural heritage of Ibadanland — from its founding as a 19th-century war camp to its royal institutions, traditional festivals, and eleven local government areas.",
  keywords: [
    "Ibadan heritage",
    "Ibadan history",
    "Yoruba culture",
    "Ibadan festivals",
    "Oke'badan festival",
    "Egungun festival",
    "Ibadan LGA",
  ],
  openGraph: {
    title: "The Heritage of Ibadan | Olubadan Palace",
    description:
      "Discover Ibadan's history, royal institutions, traditional festivals, and cultural identity through the centuries.",
    type: "website",
  },
};

export default function IbadanHeritagePage() {
  return <IbadanHeritageClient />;
}
