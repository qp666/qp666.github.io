import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { fadeUp } from "../lib/motion";
import type { Project } from "../types";

interface Props {
  projects: Project[];
}

export function Projects({ projects }: Props) {
  const [expanded, setExpanded] = useState<string | null>(projects[0]?.id ?? null);

  return (
    <section id="projects" className="scroll-mt-24 py-16 md:py-20 print-break">
      <div className="section-wrap">
        <SectionHeader index="04" title="核心项目" subtitle="7 个代表性项目 · 税务 AI · UniApp 多端 · 企业中后台" />

        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project, i) => {
            const isOpen = expanded === project.id;
            const featured = i < 2;

            return (
              <motion.article
                key={project.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={fadeUp}
                custom={i}
                className={`glass glass-hover flex flex-col overflow-hidden rounded-2xl ${
                  featured ? "md:min-h-[220px]" : ""
                } ${isOpen ? "ring-1 ring-amber-400/20" : ""}`}
              >
                <button
                  className="flex flex-1 flex-col p-5 text-left md:p-6"
                  onClick={() => setExpanded(isOpen ? null : project.id)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      {featured && (
                        <span className="mb-2 inline-block rounded-full bg-rose-400/10 px-2 py-0.5 text-[10px] tracking-wider text-rose-300 uppercase">
                          Featured
                        </span>
                      )}
                      <h3 className="text-base font-semibold leading-snug text-white md:text-lg">
                        {project.name}
                      </h3>
                      <p className="mt-1.5 text-xs text-zinc-600">
                        {project.role}
                        <span className="mx-1.5">·</span>
                        {project.period}
                      </p>
                    </div>
                    {project.links.demo && (
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="no-print shrink-0 rounded-lg bg-sky-400/10 px-2.5 py-1 text-xs text-sky-300 hover:bg-sky-400/20"
                      >
                        Demo →
                      </a>
                    )}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-500">{project.description}</p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.metrics.slice(0, 3).map((m) => (
                      <span
                        key={m}
                        className="rounded-full bg-violet-400/10 px-2 py-0.5 text-[10px] text-violet-300"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </button>

                <div className={isOpen ? "block" : "hidden print:block"}>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="border-t border-white/5 px-5 pb-5 md:px-6 md:pb-6"
                      >
                        <p className="mb-2 mt-4 text-xs font-medium tracking-wider text-zinc-600 uppercase">
                          核心贡献
                        </p>
                        <ul className="mb-4 space-y-2">
                          {project.highlights.map((h) => (
                            <li key={h} className="flex gap-3 text-sm text-zinc-400">
                              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-400" />
                              {h}
                            </li>
                          ))}
                        </ul>

                        {project.achievements && project.achievements.length > 0 && (
                          <>
                            <p className="mb-2 text-xs font-medium tracking-wider text-rose-300/70 uppercase">
                              项目成果
                            </p>
                            <div className="mb-4 flex flex-wrap gap-2">
                              {project.achievements.map((a) => (
                                <span
                                  key={a}
                                  className="rounded-lg bg-rose-400/8 px-2.5 py-1 text-xs text-rose-200/70 ring-1 ring-rose-400/15"
                                >
                                  {a}
                                </span>
                              ))}
                            </div>
                          </>
                        )}

                        <div className="flex flex-wrap gap-1.5">
                          {project.stack.map((s) => (
                            <span key={s} className="tag">{s}</span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
