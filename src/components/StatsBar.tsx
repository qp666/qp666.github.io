import { motion } from "framer-motion";
import { fadeUp } from "../lib/motion";
import type { Stat } from "../types";

interface Props {
  stats: Stat[];
}

export function StatsBar({ stats }: Props) {
  return (
    <section className="pb-8">
      <div className="section-wrap">
        <motion.div
          className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              custom={i}
              className="glass glass-hover group rounded-2xl p-5 md:p-6"
            >
              <div className="flex items-baseline gap-1">
                <span className="gradient-num text-3xl font-bold md:text-4xl">{stat.value}</span>
                <span className="text-sm text-zinc-600">{stat.unit}</span>
              </div>
              <p className="mt-2 text-sm text-zinc-400">{stat.label}</p>
              {stat.hint && (
                <p className="mt-0.5 text-xs text-zinc-600 opacity-0 transition group-hover:opacity-100">
                  {stat.hint}
                </p>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
