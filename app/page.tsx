import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { BuildingBlocks } from "@/components/sections/BuildingBlocks";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Problem />
        <BuildingBlocks />
      </main>
      <Footer />
    </>
  );
}
