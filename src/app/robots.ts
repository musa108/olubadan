import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/portal/dashboard/", "/api/"],
    },
    sitemap: "https://www.olubadanofibadan.com/sitemap.xml",
  };
}
