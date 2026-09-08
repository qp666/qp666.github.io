import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { ResumeData } from "../types";

const NAV_ITEMS = [
  { id: "skills", label: "技能" },
  { id: "experience", label: "经历" },
  { id: "projects", label: "项目" },
  { id: "contact", label: "联系" },
];

export function Nav({ pdf, name }: { pdf: ResumeData["pdf"]; name: string }) {
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
      <div className={`section-wrap flex items-center justify-between transition-all ${scrolled ? "glass rounded-2xl px-4 py-2.5 md:px-5" : ""}`}>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="bg-gradient-to-r from-rose-200 to-amber-200 bg-clip-text text-sm font-semibold text-transparent"
        >
          {name}
        </button>

        <nav className="flex items-center gap-0.5 sm:gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`relative rounded-full px-2.5 py-1.5 text-xs sm:px-3.5 sm:text-sm ${
                active === item.id ? "text-white" : "text-zinc-500 hover:text-zinc-300"
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
          <a href={pdf.url} download={pdf.filename} className="btn-primary relative ml-1 rounded-full px-3 py-1.5 text-xs sm:ml-2 sm:px-4 sm:text-sm">
            PDF
          </a>
        </nav>
      </div>
    </motion.header>
  );
}
