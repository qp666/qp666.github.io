import { motion } from "framer-motion";
import { fadeUp } from "../lib/motion";
import type { Profile, ResumeData } from "../types";

interface Props {
  profile: Profile;
  social: ResumeData["social"];
  pdf: ResumeData["pdf"];
}

export function Hero({ profile, social, pdf }: Props) {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="section-wrap">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.09 } } }}
          >
            <motion.div variants={fadeUp} custom={0} className="mb-5 flex flex-wrap gap-2">
              {profile.intents.map((intent) => (
                <span key={intent} className="chip">
                  <span className="chip-dot" />
                  {intent}
                </span>
              ))}
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="mb-5 text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl"
            >
              <span className="gradient-text">{profile.name}</span>
            </motion.h1>

            <motion.p variants={fadeUp} custom={2} className="mb-3 text-xl text-secondary md:text-2xl">
              {profile.title}
            </motion.p>

            <motion.p variants={fadeUp} custom={3} className="text-base leading-relaxed text-muted md:text-lg">
              {profile.tagline}
            </motion.p>

            <motion.div variants={fadeUp} custom={4} className="mt-8 flex flex-wrap gap-2">
              <span className="chip">📍 {profile.location}</span>
              <span className="chip">{profile.experienceYears} 年经验</span>
              {profile.politicalStatus && <span className="chip">{profile.politicalStatus}</span>}
              <span className="chip">薪资{profile.salary}</span>
              <a href={`tel:${profile.phone}`} className="chip">
                {profile.phone}
              </a>
              <a href={`mailto:${profile.email}`} className="chip">
                {profile.email}
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="glass relative overflow-hidden rounded-3xl p-7 md:p-9"
          >
            <div className="pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full bg-rose-400/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-32 w-32 rounded-full bg-amber-400/10 blur-3xl" />

            <p className="relative text-sm leading-[1.8] text-body md:text-base">{profile.summary}</p>

            <div className="no-print relative mt-8 flex flex-wrap gap-3">
              <a href={pdf.url} download={pdf.filename} className="btn-primary rounded-xl px-6 py-3 text-sm">
                下载简历 PDF
              </a>
              {social.github && (
                <a
                  href={social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost rounded-xl px-5 py-3 text-sm"
                >
                  GitHub
                </a>
              )}
              {social.juejin && (
                <a
                  href={social.juejin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost rounded-xl px-5 py-3 text-sm"
                >
                  掘金
                </a>
              )}
              {social.csdn && (
                <a
                  href={social.csdn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost rounded-xl px-5 py-3 text-sm"
                >
                  CSDN
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="pointer-events-none absolute top-20 -left-32 h-72 w-72 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(251,113,133,0.15) 0%, transparent 70%)" }}
        animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
    </section>
  );
}
