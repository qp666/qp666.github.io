import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp } from "../lib/motion";
import type { Profile, ResumeData } from "../types";

interface Props {
  profile: Profile;
  social: ResumeData["social"];
  pdf: ResumeData["pdf"];
}

export function Hero({ profile, social, pdf }: Props) {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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

            <motion.p variants={fadeUp} custom={2} className="mb-3 text-xl text-zinc-300 md:text-2xl">
              {profile.title}
            </motion.p>

            <motion.p variants={fadeUp} custom={3} className="text-base leading-relaxed text-zinc-500 md:text-lg">
              {profile.tagline}
            </motion.p>

            <motion.div variants={fadeUp} custom={4} className="mt-8 flex flex-wrap gap-2">
              {profile.politicalStatus && <span className="chip">{profile.politicalStatus}</span>}
              <span className="chip">📍 {profile.location}</span>
              <span className="chip">{profile.experienceYears} 年经验</span>
              <span className="chip">期望 {profile.salary}</span>
              <span className="chip">{profile.phone}</span>
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

            <p className="relative text-sm leading-[1.8] text-zinc-400 md:text-base">{profile.summary}</p>

            <div className="no-print relative mt-8 flex flex-wrap gap-3">
              <a href={pdf.url} download={pdf.filename} className="btn-primary rounded-xl px-6 py-3 text-sm">
                下载简历 PDF
              </a>
              <button onClick={copyEmail} className="btn-ghost rounded-xl px-5 py-3 text-sm">
                {copied ? "已复制 ✓" : "复制邮箱"}
              </button>
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

      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-zinc-900/95 px-5 py-3 text-sm text-white shadow-2xl ring-1 ring-rose-400/30 backdrop-blur-md"
          >
            邮箱已复制到剪贴板
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
