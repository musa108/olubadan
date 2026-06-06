import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Representative Registration | Olubadan Palace Portal",
  description:
    "Palace account creation is managed by Palace Administration. Learn how to request access to the secure Olubadan representative portal as a legitimate title holder.",
  robots: { index: false, follow: false },
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
