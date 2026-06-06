import type { Metadata } from "next";
import { Suspense } from "react";
import { PortalGatewayContent } from "./portal-content";

export const metadata: Metadata = {
  title: "Title Holder Portal | Olubadan Palace",
  description:
    "Secure sign-in portal for registered Olubadan Palace title holders and representatives. Access your profile dashboard, submit bio data, and receive administrative review notes.",
  robots: { index: false, follow: false },
};

export default function PortalGateway() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#1f1b17]" />}>
      <PortalGatewayContent />
    </Suspense>
  );
}

