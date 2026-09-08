import { motion } from "framer-motion";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Tooltip,
} from "recharts";
import type { TooltipProps } from "recharts";
import { SectionHeader } from "./SectionHeader";
import { fadeUp } from "../lib/motion";
import type { SkillRadar, SkillCategory } from "../types";

interface Props {
  skills: SkillRadar[];
  categories: SkillCategory[];
  tags: string[];
}

interface RadarDataPoint {
  subject: string;
  score: number;
  fullMark: number;
  projects: string;
}

function RadarTooltip({ active, payload }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;
  const data = payload[0].payload as RadarDataPoint;
  return (
    <div className="glass rounded-xl px-4 py-3 shadow-2xl">
      <p className="font-medium text-white">{data.subject}</p>
      <p className="text-sm text-rose-300">{data.score} / 5</p>
      <p className="mt-1.5 text-xs text-zinc-500">{data.projects}</p>
    </div>
  );
}

const CAT_COLORS = ["#fb7185", "#fbbf24", "#38bdf8", "#a78bfa"];

export function SkillRadarChart({ skills, categories, tags }: Props) {
  const data: RadarDataPoint[] = skills.map((s) => ({
    subject: s.subject,
    score: s.score,
    fullMark: 5,
    projects: s.projects.join(" · "),
  }));

  return (
    <section id="skills" className="scroll-mt-24 py-16 md:py-20 print-break">
      <div className="section-wrap">
        <SectionHeader index="02" title="技能图谱" subtitle="技术雷达 · 分类技能栈 · 工程实践覆盖" />

        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <motion.div
            className="glass relative h-80 overflow-hidden rounded-3xl p-4 no-print"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={data}>
                <PolarGrid stroke="rgba(255,255,255,0.06)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "#a1a1aa", fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 5]} tick={{ fill: "#52525b", fontSize: 9 }} axisLine={false} />
                <Radar dataKey="score" stroke="#fb7185" fill="url(#radarGrad)" fillOpacity={0.45} strokeWidth={2} />
                <defs>
                  <linearGradient id="radarGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#fb7185" stopOpacity={0.7} />
                    <stop offset="50%" stopColor="#fbbf24" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#a78bfa" stopOpacity={0.3} />
                  </linearGradient>
                </defs>
                <Tooltip content={<RadarTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            className="space-y-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
          >
            {skills.map((s, i) => (
              <motion.div key={s.subject} variants={fadeUp} custom={i}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium text-zinc-200">{s.subject}</span>
                  <span className="font-mono text-xs text-rose-300">{s.score}/5</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-rose-400 via-amber-300 to-violet-400"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(s.score / 5) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
                <p className="mt-1.5 text-xs text-zinc-600">{s.projects.join(" · ")}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={ci}
              className="glass rounded-2xl p-5"
            >
              <h4 className="mb-3 flex items-center gap-2 text-sm font-medium text-white">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: CAT_COLORS[ci % CAT_COLORS.length] }}
                />
                {cat.name}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {cat.items.map((item) => (
                  <span key={item} className="tag">{item}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-6 flex flex-wrap gap-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.02 } } }}
        >
          {tags.map((tag) => (
            <motion.span key={tag} variants={fadeUp} className="tag text-zinc-500">
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
