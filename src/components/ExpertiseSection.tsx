import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { fadeUp } from "../lib/motion";
import type { Expertise } from "../types";

const ACCENT_CLASS: Record<string, string> = {
  rose: "accent-rose",
  amber: "accent-amber",
  sky: "accent-sky",
  violet: "accent-violet",
  emerald: "accent-emerald",
};

interface Props {
  items: Expertise[];
}

export function ExpertiseSection({ items }: Props) {
  return (
    <section className="py-16 md:py-20 print-break">
      <div className="section-wrap">
        <SectionHeader
          index="01"
          title="核心能力"
          subtitle="开源贡献 · Vue 跨端 · AI 应用 · 工程化性能"
        />

        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
        >
          {items.map((item, i) => (
            <motion.article
              key={item.id}
              variants={fadeUp}
              custom={i}
              className={`expertise-card glass glass-hover relative overflow-hidden rounded-2xl p-6 ${ACCENT_CLASS[item.accent] ?? "accent-violet"}`}
            >
              <h3 className="mb-2 text-base font-semibold text-heading">{item.title}</h3>
              <p className="mb-4 text-sm leading-relaxed text-muted">{item.description}</p>
              <ul className="space-y-2">
                {item.points.map((p) => (
                  <li key={p} className="flex gap-2.5 text-xs leading-relaxed text-body md:text-sm">
                    <span
                      className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                      style={{ background: "var(--card-accent)" }}
                    />
                    {p}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
