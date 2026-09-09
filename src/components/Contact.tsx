import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { fadeUp } from "../lib/motion";
import type { Profile, ResumeData } from "../types";

interface Props {
  profile: Profile;
  education: ResumeData["education"];
  social: ResumeData["social"];
  pdf: ResumeData["pdf"];
}

const SOCIAL_LINKS = [
  { key: "github" as const, label: "GitHub" },
  { key: "juejin" as const, label: "掘金" },
  { key: "csdn" as const, label: "CSDN" },
  { key: "blog" as const, label: "公众号" },
  { key: "zhihu" as const, label: "知乎" },
];

export function Contact({ profile, education, social, pdf }: Props) {
  const activeSocial = SOCIAL_LINKS.filter((s) => social[s.key]);

  return (
    <section id="contact" className="scroll-mt-24 py-16 md:py-20 print-break">
      <div className="section-wrap">
        <SectionHeader index="05" title="教育与联系" subtitle="欢迎进一步交流 · 随时可约面试" />

        <motion.div
          className="grid gap-4 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div variants={fadeUp} className="glass glass-hover rounded-2xl p-6 md:p-7 lg:col-span-1">
            <p className="mb-4 font-mono text-xs tracking-widest text-faint uppercase">Education</p>
            <p className="text-xl font-semibold text-heading">{education.school}</p>
            {education.major && <p className="mt-2 text-sm text-body">{education.major}</p>}
            <p className={education.major ? "text-sm text-muted" : "mt-2 text-sm text-body"}>{education.degree}</p>
            {education.period && <p className="mt-2 font-mono text-xs text-faint">{education.period}</p>}
          </motion.div>

          <motion.div variants={fadeUp} className="glass glass-hover rounded-2xl p-6 md:p-7 lg:col-span-2">
            <p className="mb-4 font-mono text-xs tracking-widest text-faint uppercase">Contact</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="mb-1 text-xs text-faint">邮箱</p>
                <a href={`mailto:${profile.email}`} className="text-base font-medium text-heading hover:text-rose-400">
                  {profile.email}
                </a>
              </div>
              <div>
                <p className="mb-1 text-xs text-faint">电话</p>
                <a href={`tel:${profile.phone}`} className="text-base font-medium text-heading hover:text-rose-400">
                  {profile.phone}
                </a>
              </div>
              <div>
                <p className="mb-1 text-xs text-faint">城市</p>
                <p className="text-base text-secondary">{profile.location}</p>
              </div>
              <div>
                <p className="mb-1 text-xs text-faint">期望薪资</p>
                <p className="text-base text-secondary">{profile.salary}</p>
              </div>
            </div>

            <a
              href={pdf.url}
              download={pdf.filename}
              className="btn-primary no-print mt-6 inline-flex rounded-xl px-5 py-2.5 text-sm"
            >
              下载完整 PDF 简历
            </a>
          </motion.div>
        </motion.div>

        {activeSocial.length > 0 && (
          <motion.div
            className="mt-4 flex flex-wrap gap-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
          >
            {activeSocial.map((s) => {
              const value = social[s.key];
              const isUrl = value.startsWith("http");
              const El = isUrl ? "a" : "div";
              return (
                <motion.div key={s.key} variants={fadeUp}>
                  <El
                    {...(isUrl ? { href: value, target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="glass glass-hover no-print flex items-center gap-3 rounded-xl px-5 py-3"
                  >
                    <span className="text-xs text-faint">{s.label}</span>
                    <span className="text-sm font-medium text-secondary">
                      {isUrl ? new URL(value).hostname.replace("www.", "") : value}
                    </span>
                  </El>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}
