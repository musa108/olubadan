import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Representative Dashboard | Olubadan Palace Portal",
  description:
    "Manage your ancestral compound record, submit your bio data, view administrative review notes, and monitor palace announcements in the secure Olubadan representative portal.",
  robots: { index: false, follow: false },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
