import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../lib/theme";
import type { ResumeData } from "../types";

const NAV_ITEMS = [
  { id: "skills", label: "技能" },
  { id: "experience", label: "经历" },
  { id: "projects", label: "项目" },
  { id: "contact", label: "联系" },
];

export function Nav({ pdf, name }: { pdf: ResumeData["pdf"]; name: string }) {
  const { dark, toggle } = useTheme();
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      const doc = document.documentElement;
      const atBottom = window.innerHeight + window.scrollY >= doc.scrollHeight - 8;
      if (atBottom) {
        setActive(NAV_ITEMS[NAV_ITEMS.length - 1].id);
        return;
      }

      const offset = 100;
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_ITEMS[i].id);
        if (el && el.getBoundingClientRect().top <= offset) {
          setActive(NAV_ITEMS[i].id);
          return;
        }
      }
      setActive("");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      className={`no-print fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${scrolled ? "py-3" : "py-5"}`}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`section-wrap flex items-center justify-between transition-all [&_a]:cursor-pointer [&_button]:cursor-pointer ${scrolled ? "glass rounded-2xl px-4 py-2.5 md:px-5" : ""}`}>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="logo-text rounded-md text-sm font-semibold"
        >
          {name}
        </button>

        <nav className="flex items-center gap-0.5 sm:gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`relative rounded-full px-2.5 py-1.5 text-xs sm:px-3.5 sm:text-sm ${
                active === item.id ? "text-heading" : "text-faint hover:text-secondary"
              }`}
            >
              {active === item.id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-500/15 to-amber-500/15 ring-1 ring-rose-400/20"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative">{item.label}</span>
            </button>
          ))}
          <button
            type="button"
            onClick={(event) => toggle(event)}
            aria-label={dark ? "切换到亮色模式" : "切换到暗色模式"}
            className="ml-1 flex h-8 w-8 items-center justify-center rounded-full text-faint transition hover:bg-hover hover:text-heading sm:ml-2"
          >
            {dark ? (
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 3v1.5M12 19.5V21M4.2 4.2l1.1 1.1M18.7 18.7l1.1 1.1M3 12h1.5M19.5 12H21M4.2 19.8l1.1-1.1M18.7 5.3l1.1-1.1" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4 7 7 0 0 0 20 14.5z" />
              </svg>
            )}
          </button>
          <a href={pdf.url} download={pdf.filename} className="btn-primary relative ml-0.5 rounded-full px-3 py-1.5 text-xs sm:ml-1 sm:px-4 sm:text-sm">
            PDF
          </a>
        </nav>
      </div>
    </motion.header>
  );
}
