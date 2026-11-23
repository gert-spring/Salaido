import { en } from "@/content/en";
import { site } from "@/content/site";

/**
 * Organization JSON-LD: tells search engines and LLMs explicitly that Datalane belongs to Salaido
 * (BUILD_PLAN section 8). sameAs is added once the LinkedIn URL is set in content/site.ts.
 */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    logo: `${site.url}/brand/salaido-logo.svg`,
    description: en.meta.description,
    slogan: "Process beyond imagination",
    areaServed: "Europe",
    ...(site.linkedinUrl ? { sameAs: [site.linkedinUrl] } : {}),
    subOrganization: {
      "@type": "Organization",
      name: site.datalane.name,
      url: site.datalane.url,
      address: { "@type": "PostalAddress", addressLocality: "Vught", addressCountry: "NL" },
      parentOrganization: { "@id": `${site.url}/#organization` },
    },
  };
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here: all values come from our own config.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
