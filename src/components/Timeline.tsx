import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import type { Experience } from "../types";

interface Props {
  experience: Experience[];
}

type FilterKey = "all" | Experience["tags"][number];

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "全部" },
  { key: "frontend", label: "前端" },
  { key: "ai", label: "AI" },
];

export function Timeline({ experience }: Props) {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [expanded, setExpanded] = useState<string | null>(experience[0]?.id ?? null);

  const filtered =
    filter === "all" ? experience : experience.filter((e) => e.tags.includes(filter));

  return (
    <section id="experience" className="scroll-mt-24 py-16 md:py-20 print-break">
      <div className="section-wrap">
        <SectionHeader index="03" title="工作经历" subtitle="4 段职业经历 · 从车场社区到税务 AI 多端" />

        <div className="no-print mb-8 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`rounded-full px-4 py-2 text-sm transition ${
                filter === f.key
                  ? "bg-gradient-to-r from-rose-500/20 to-amber-500/20 text-heading ring-1 ring-rose-400/30"
                  : "text-faint hover:bg-hover hover:text-secondary"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="relative space-y-3">
          <div className="absolute top-4 bottom-4 left-4 w-px -translate-x-1/2 bg-gradient-to-b from-rose-400/40 via-amber-400/20 to-transparent md:left-6" />

          <AnimatePresence mode="popLayout">
            {filtered.map((exp, i) => {
              const isOpen = expanded === exp.id;
              return (
                <motion.article
                  key={exp.id}
                  layout
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  className="relative"
                >
                  <div className="absolute left-4 top-7 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-rose-400/60 bg-[var(--page-bg)] md:left-6" />

                  <div
                    className={`glass ml-10 overflow-hidden rounded-2xl transition-all md:ml-14 ${
                      isOpen ? "ring-1 ring-rose-400/25" : ""
                    }`}
                  >
                    <button
                      className="flex w-full cursor-pointer items-start justify-between gap-4 p-5 text-left md:p-6"
                      onClick={() => setExpanded(isOpen ? null : exp.id)}
                    >
                      <div>
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <h3 className="text-base font-semibold text-heading md:text-lg">{exp.company}</h3>
                          <span className="font-mono text-xs text-faint">{exp.period}</span>
                        </div>
                        <p className="mt-1 text-sm text-accent-fg/80">{exp.role}</p>
                      </div>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        className="mt-1 shrink-0 text-faint"
                      >
                        ↓
                      </motion.span>
                    </button>

                    <div className={isOpen ? "block" : "hidden print:block"}>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden print-show"
                          >
                            <div className="space-y-5 border-t border-line px-5 pb-5 md:px-6 md:pb-6">
                              <div>
                                <p className="mb-3 text-xs font-medium tracking-wider text-faint uppercase">
                                  工作内容
                                </p>
                                <ul className="space-y-2.5">
                                  {exp.highlights.map((h) => (
                                    <li key={h} className="flex gap-3 text-sm leading-relaxed text-body">
                                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-rose-400/80" />
                                      {h}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {exp.achievements && exp.achievements.length > 0 && (
                                <div>
                                  <p className="mb-3 text-xs font-medium tracking-wider text-amber-400/80 uppercase">
                                    关键成果
                                  </p>
                                  <ul className="space-y-2">
                                    {exp.achievements.map((a) => (
                                      <li
                                        key={a}
                                        className="flex gap-3 rounded-lg bg-amber-400/10 px-3 py-2 text-sm text-secondary"
                                      >
                                        <span className="text-amber-400">★</span>
                                        {a}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              <div className="flex flex-wrap gap-1.5">
                                {exp.stack.map((s) => (
                                  <span key={s} className="tag">{s}</span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
