import type { Metadata } from "next";
import PalaceClient from "./PalaceClient";

export const metadata: Metadata = {
  title: "The Olubadan Palace — Ile Olubadan",
  description:
    "Explore Ile Olubadan — the royal palace of the Olubadan of Ibadanland. A seat of ancient wisdom, cultural ceremonies, and Yoruba royal heritage in the heart of Ibadan.",
  keywords: ["Olubadan palace", "Ile Olubadan", "Ibadan royal palace", "Yoruba monarchy", "traditional ruler seat"],
  openGraph: {
    title: "The Olubadan Palace — Ile Olubadan | Olubadan Palace",
    description:
      "Explore the royal palace of the Olubadan of Ibadanland — the cultural and spiritual heartbeat of Ibadan.",
    type: "website",
  },
};

export default function PalacePage() {
  return <PalaceClient />;
}
