import { motion } from "framer-motion";
import { heroContent } from "../../data/content";

function HeroSection() {
  return (
    <section id="hero" className="mx-auto w-full max-w-6xl px-4 pb-10 pt-12 sm:px-8 sm:pt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="rounded-premium border border-white/70 bg-white/70 p-6 shadow-premium sm:p-10"
      >
        <p className="text-xs uppercase tracking-[0.2em] text-cocoa/65">MVP интерактив</p>
        <h1 className="mt-3 max-w-4xl text-3xl font-semibold leading-tight text-espresso sm:text-5xl">
          {heroContent.title}
        </h1>
        <p className="mt-4 max-w-3xl text-base text-cocoa/85 sm:text-lg">
          {heroContent.subtitle}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href={heroContent.primaryButton.href}
            className="rounded-xl bg-fuchsiaSoft px-6 py-3 font-semibold text-white transition hover:bg-[#a74f72]"
          >
            {heroContent.primaryButton.label}
          </a>
          <a
            href={heroContent.secondaryButton.href}
            className="rounded-xl border border-cocoa/30 px-6 py-3 font-medium text-cocoa transition hover:bg-cream"
          >
            {heroContent.secondaryButton.label}
          </a>
        </div>
      </motion.div>
    </section>
  );
}

export default HeroSection;
