import { lazy, Suspense } from "react";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { StatsBar } from "./components/StatsBar";
import { ExpertiseSection } from "./components/ExpertiseSection";
import { Contact } from "./components/Contact";
import { resume } from "./data/resume";

const SkillRadarChart = lazy(() =>
  import("./components/SkillRadarChart").then((m) => ({ default: m.SkillRadarChart })),
);
const Timeline = lazy(() =>
  import("./components/Timeline").then((m) => ({ default: m.Timeline })),
);
const Projects = lazy(() =>
  import("./components/Projects").then((m) => ({ default: m.Projects })),
);

function SectionFallback() {
  return <div className="section-wrap h-72 animate-pulse rounded-3xl bg-hover" />;
}

export default function App() {
  return (
    <>
      <div className="page-bg" aria-hidden />
      <div className="relative min-h-screen">
        <Nav pdf={resume.pdf} name={resume.profile.name} />
        <main>
          <Hero profile={resume.profile} social={resume.social} pdf={resume.pdf} />
          <StatsBar stats={resume.stats} />
          <ExpertiseSection items={resume.expertise} />
          <Suspense fallback={<SectionFallback />}>
            <SkillRadarChart
              skills={resume.skills.radar}
              categories={resume.skills.categories}
              tags={resume.skills.tags}
            />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Timeline experience={resume.experience} />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <Projects projects={resume.projects} />
          </Suspense>
          <Contact
            profile={resume.profile}
            education={resume.education}
            social={resume.social}
            pdf={resume.pdf}
          />
        </main>
        <footer className="border-t border-line py-12 text-center">
          <p className="font-mono text-xs tracking-wider text-faint">
            © {new Date().getFullYear()} {resume.profile.name}
            <span className="mx-2 opacity-40">·</span>
            Updated 2026.09
          </p>
        </footer>
      </div>
    </>
  );
}
