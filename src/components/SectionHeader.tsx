import { motion } from "framer-motion";
import { fadeUp } from "../lib/motion";

interface Props {
  index: string;
  title: string;
  subtitle?: string;
}

export function SectionHeader({ index, title, subtitle }: Props) {
  return (
    <motion.div
      className="mb-10 md:mb-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
    >
      <div className="mb-3 flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-rose-400/20 to-amber-400/20 font-mono text-xs text-rose-200 ring-1 ring-white/10">
          {index}
        </span>
        <div className="section-line flex-1" />
      </div>
      <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">{title}</h2>
      {subtitle && (
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted md:text-base">{subtitle}</p>
      )}
    </motion.div>
  );
}
