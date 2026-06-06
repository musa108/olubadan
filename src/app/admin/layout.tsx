import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Palace Administration Dashboard | Olubadan",
  description:
    "Secure administrative control panel for Palace administration — manage representative profiles, chieftaincy news, gallery assets, announcements, and user accounts.",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
