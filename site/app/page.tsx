import { ArtefactCatalogue } from "./sections/artefact-catalogue";
import { Deploy } from "./sections/deploy";
import { Footer } from "./sections/footer";
import { Hero } from "./sections/hero";
import { HowClaraThinks } from "./sections/how-clara-thinks";
import { TopNav } from "./sections/top-nav";
import { WhereClaraEarns } from "./sections/where-clara-earns";

export default function Home() {
  return (
    <>
      <TopNav />
      <main>
        <Hero />
        <HowClaraThinks />
        <WhereClaraEarns />
        <ArtefactCatalogue />
        <Deploy />
      </main>
      <Footer />
    </>
  );
}
