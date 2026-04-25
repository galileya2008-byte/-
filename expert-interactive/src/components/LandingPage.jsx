import TopNav from "./landing/TopNav";
import HeroSection from "./landing/HeroSection";
import GameSection from "./landing/GameSection";
import CalculatorSection from "./landing/CalculatorSection";
import CtaSection from "./landing/CtaSection";

function LandingPage() {
  return (
    <>
      <TopNav />
      <main>
        <HeroSection />
        <GameSection />
        <CalculatorSection />
        <CtaSection />
      </main>
    </>
  );
}

export default LandingPage;
