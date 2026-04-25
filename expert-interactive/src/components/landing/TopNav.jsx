import { navItems } from "../../data/content";

function TopNav() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/60 bg-[#fffaf5]/90 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-8">
        <a href="#hero" className="text-sm font-semibold tracking-wide text-espresso">
          EXPERT FLOW
        </a>
        <div className="flex items-center gap-2 sm:gap-3">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-cocoa transition hover:bg-champagne"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}

export default TopNav;
