import { existsSync } from "node:fs";
import path from "node:path";

import { ArrowDownRight, ArrowUpRight, Download } from "lucide-react";
import Image from "next/image";

import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { Nav } from "@/components/Nav";
import { Reveal } from "@/components/Reveal";
import { SystemDiagram } from "@/components/SystemDiagram";
import { education, experience, profile, projects, skills, type Project } from "@/data/profile";

// Photo and resume can be a file in /public (checked at build time) or a full URL
// (GitHub avatar, Google Drive link…) that can be updated without redeploying.
const isUrl = (value: string) => /^https?:\/\//.test(value);
const available = (value: string) =>
  Boolean(value) && (isUrl(value) || existsSync(path.join(process.cwd(), "public", value)));
const hasAvatar = available(profile.avatar);
const hasResume = available(profile.resume);

const initials = profile.name
  .split(" ")
  .filter(Boolean)
  .map((w) => w[0])
  .join("")
  .slice(0, 2)
  .toUpperCase();

export default function Home() {
  return (
    <>
      <Nav name={profile.name} role={profile.role} />
      <Reveal />
      <main id="top">
        <Hero />
        <About />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <EducationSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

/* ---------------------------------------------------------------- hero */

function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-20 pt-28 sm:px-8 sm:pt-36 lg:pb-28">
      <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div>
          <div className="animate-fade-up flex items-center gap-4">
            <Avatar />
            <div className="font-mono text-xs leading-relaxed text-muted">
              <p className="text-foreground">{profile.role}</p>
              <p>{profile.location}</p>
            </div>
          </div>

          <h1
            className="animate-fade-up mt-10 font-serif text-[2.9rem] leading-[1.02] tracking-tight sm:text-7xl"
            style={{ animationDelay: "80ms" }}
          >
            I build AI systems that <em className="text-accent">hold up</em> in production.
          </h1>

          <p
            className="animate-fade-up mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
            style={{ animationDelay: "160ms" }}
          >
            {profile.tagline}
          </p>

          <div className="animate-fade-up mt-9 flex flex-wrap items-center gap-2 sm:gap-3" style={{ animationDelay: "240ms" }}>
            <a
              href="#projects"
              className="inline-flex h-10 items-center gap-2 rounded-full bg-foreground px-4 text-sm font-medium text-background transition hover:opacity-85 sm:h-11 sm:px-5"
            >
              <span className="sm:hidden">My work</span>
              <span className="hidden sm:inline">See my work</span>
              <ArrowDownRight className="size-4" />
            </a>
            {hasResume && (
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-full border border-line px-4 text-sm font-medium transition hover:border-foreground sm:h-11 sm:px-5"
              >
                <Download className="size-4" /> Résumé
              </a>
            )}
            <IconLink href={profile.links.github} label="GitHub">
              <GitHubIcon className="size-[18px]" />
            </IconLink>
            <IconLink href={profile.links.linkedin} label="LinkedIn">
              <LinkedInIcon className="size-[18px]" />
            </IconLink>
          </div>

          <p
            className="animate-fade-up mt-8 flex items-center gap-2 font-mono text-xs text-muted"
            style={{ animationDelay: "320ms" }}
          >
            <span className="size-1.5 rounded-full bg-accent" /> {profile.openTo}
          </p>
        </div>

        <div className="animate-fade-up" style={{ animationDelay: "380ms" }}>
          <SystemDiagram />
        </div>
      </div>
    </section>
  );
}

function Avatar() {
  return hasAvatar ? (
    <Image
      src={profile.avatar}
      alt={profile.name}
      width={128}
      height={128}
      priority
      className="size-16 rounded-full object-cover ring-1 ring-line ring-offset-4 ring-offset-background sm:size-[72px]"
    />
  ) : (
    <div className="flex size-16 items-center justify-center rounded-full border border-line bg-surface font-serif text-2xl ring-1 ring-line ring-offset-4 ring-offset-background sm:size-[72px] sm:text-3xl">
      {initials}
    </div>
  );
}

function IconLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="inline-flex size-10 items-center justify-center rounded-full border border-line text-muted transition hover:border-foreground hover:text-foreground sm:size-11"
    >
      {children}
    </a>
  );
}

/* ---------------------------------------------------------------- shared */

function Section({
  id,
  index,
  label,
  title,
  children,
}: {
  id: string;
  index: string;
  label: string;
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-5 sm:px-8">
      <div className="border-t border-line py-20 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[220px_1fr] lg:gap-16">
          <div data-reveal>
            <p className="font-mono text-xs text-muted">
              <span className="text-accent">{index}</span> / {label}
            </p>
            <h2 className="mt-3 font-serif text-4xl leading-tight tracking-tight sm:text-5xl lg:text-[2.6rem]">
              {title}
            </h2>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </section>
  );
}

function Stack({ items }: { items: string[] }) {
  return <p className="font-mono text-xs leading-relaxed text-muted">{items.join("  /  ")}</p>;
}

/* ---------------------------------------------------------------- about */

function About() {
  return (
    <Section id="about" index="01" label="About" title="Hello.">
      <div className="space-y-5 text-lg leading-relaxed sm:text-xl" data-reveal>
        {profile.about.map((p, i) => (
          <p key={i} className={i === 0 ? "" : "text-muted"}>
            {p}
          </p>
        ))}
      </div>
      <dl className="mt-12 grid gap-x-10 sm:grid-cols-2" data-reveal>
        {[
          ["LLM systems", "Structured outputs, multi-provider routing, guardrails"],
          ["Retrieval", "Hybrid search, rerankers, GraphRAG, evaluation"],
          ["Agents", "LangGraph, MCP tools, A2A, human-in-the-loop"],
          ["Backend", "FastAPI, Spring Boot, Postgres, Redis, auth, queues"],
        ].map(([term, desc]) => (
          <div key={term} className="border-t border-line py-4">
            <dt className="font-mono text-xs text-accent">{term}</dt>
            <dd className="mt-1 text-sm text-muted">{desc}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

/* ---------------------------------------------------------------- experience */

function ExperienceSection() {
  return (
    <Section id="experience" index="02" label="Experience" title="Work">
      <div className="space-y-14">
        {experience.map((job) => (
          <article key={job.title + job.period} data-reveal>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="text-xl font-medium">{job.title}</h3>
              <p className="font-mono text-xs text-muted">{job.period}</p>
            </div>
            <p className="mt-1 text-sm text-muted">
              {job.org} · {job.location}
            </p>
            <ul className="mt-6 space-y-4">
              {job.points.map((p, i) => (
                <li key={i} className="grid grid-cols-[1.75rem_1fr] text-[15px] leading-relaxed">
                  <span className="pt-[3px] font-mono text-[11px] text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7 border-t border-line pt-4">
              <Stack items={job.stack} />
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------- projects */

function ProjectsSection() {
  return (
    <Section id="projects" index="03" label="Projects" title="Selected work">
      <div className="space-y-20">
        {projects.map((p, i) => (
          <ProjectEntry key={p.name} project={p} index={i + 1} />
        ))}
      </div>
      <div className="mt-16 border-t border-line pt-6" data-reveal>
        <a
          href={`${profile.links.github}?tab=repositories`}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 text-sm"
        >
          <GitHubIcon className="size-4" />
          <span className="link-underline">More projects on GitHub</span>
          <ArrowUpRight className="size-4 text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
        </a>
      </div>
    </Section>
  );
}

function ProjectEntry({ project, index }: { project: Project; index: number }) {
  return (
    <article data-reveal>
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-xs text-accent">{String(index).padStart(2, "0")}</span>
        <h3 className="font-serif text-4xl tracking-tight sm:text-5xl">{project.name}</h3>
      </div>
      <p className="mt-2 text-base text-muted sm:pl-9">{project.tagline}</p>

      {project.image && (
        <figure className="mt-8">
          <div className="overflow-hidden rounded-xl border border-line bg-surface">
            <Image
              src={project.image}
              alt={`${project.name} screenshot`}
              width={2160}
              height={1350}
              sizes="(min-width: 1024px) 760px, 100vw"
              className="h-auto w-full"
            />
          </div>
        </figure>
      )}

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="text-[15px] leading-relaxed">{project.description}</p>
          {project.metrics?.length ? (
            <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-4">
              {project.metrics.map((m) => (
                <div key={m.label}>
                  <dd className="font-serif text-3xl leading-none">{m.value}</dd>
                  <dt className="mt-1 font-mono text-[11px] text-muted">{m.label}</dt>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
        <ul className="space-y-3">
          {project.highlights.map((h, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted">
              <span className="mt-[9px] h-px w-3 shrink-0 bg-accent" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 flex flex-col gap-4 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between">
        <Stack items={project.stack} />
        <div className="flex shrink-0 gap-5 text-sm">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5"
            >
              <span className="link-underline">Source</span>
              <ArrowUpRight className="size-4 text-muted transition group-hover:text-accent" />
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5">
              <span className="link-underline">Live demo</span>
              <ArrowUpRight className="size-4 text-muted transition group-hover:text-accent" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

/* ---------------------------------------------------------------- skills */

function SkillsSection() {
  return (
    <Section id="skills" index="04" label="Skills" title="Toolkit">
      <dl data-reveal>
        {skills.map((g) => (
          <div key={g.group} className="grid gap-2 border-b border-line py-5 first:pt-0 sm:grid-cols-[180px_1fr] sm:gap-8">
            <dt className="font-mono text-xs text-accent">{g.group}</dt>
            <dd className="text-[15px] leading-relaxed">{g.items.join(", ")}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

/* ---------------------------------------------------------------- education */

function EducationSection() {
  return (
    <Section id="education" index="05" label="Education" title="Study">
      <div data-reveal>
        {education.map((e) => (
          <div
            key={e.school}
            className="grid gap-1 border-b border-line py-5 first:pt-0 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8"
          >
            <div>
              <h3 className="text-[15px] font-medium">{e.degree}</h3>
              <p className="mt-1 text-sm text-muted">{e.school}</p>
            </div>
            <p className="font-mono text-xs text-muted">{e.period}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------- contact */

function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 sm:px-8">
      <div className="border-t border-line py-24 sm:py-32" data-reveal>
        <p className="font-mono text-xs text-muted">
          <span className="text-accent">06</span> / Contact
        </p>
        <h2 className="mt-4 max-w-3xl font-serif text-5xl leading-[1.05] tracking-tight sm:text-7xl">
          Let&apos;s build something that <em className="text-accent">works</em>.
        </h2>
        <p className="mt-6 max-w-xl text-muted">
          Open to AI Engineer and Python Backend roles. E-mail is the fastest way to reach me.
        </p>
        <a
          href={`mailto:${profile.links.email}`}
          className="group mt-10 inline-flex items-center gap-3 text-xl font-medium tracking-tight sm:text-3xl"
        >
          <span className="link-underline break-all">{profile.links.email}</span>
          <ArrowUpRight className="size-6 shrink-0 text-accent transition group-hover:-translate-y-1 group-hover:translate-x-1 sm:size-8" />
        </a>
        <div className="mt-10 flex flex-wrap gap-6 font-mono text-xs">
          <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="link-underline text-muted hover:text-foreground">
            LinkedIn ↗
          </a>
          <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="link-underline text-muted hover:text-foreground">
            GitHub ↗
          </a>
          {hasResume && (
            <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="link-underline text-muted hover:text-foreground">
              Résumé ↗
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-5 sm:px-8">
      <div className="flex flex-col gap-2 border-t border-line py-8 font-mono text-[11px] text-muted sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>Designed &amp; built by {profile.name.split(" ")[0]}</p>
      </div>
    </footer>
  );
}
