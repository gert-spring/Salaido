import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { BuildingBlocks } from "@/components/sections/BuildingBlocks";
import { Datalane } from "@/components/sections/Datalane";
import { Partners } from "@/components/sections/Partners";
import { Industries } from "@/components/sections/Industries";
import { Ambition } from "@/components/sections/Ambition";
import { Celosphere } from "@/components/sections/Celosphere";
import { Contact } from "@/components/sections/Contact";
import { JsonLd } from "@/components/JsonLd";
import { Footer } from "@/components/sections/Footer";

// Section order follows BUILD_PLAN section 4.
export default function Home() {
  return (
    <>
      <JsonLd />
      <Header />
      <main id="main">
        <Hero />
        <Problem />
        <BuildingBlocks />
        <Datalane />
        <Partners />
        <Industries />
        <Ambition />
        <Celosphere />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
