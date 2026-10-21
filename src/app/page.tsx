import { existsSync } from "node:fs";
import path from "node:path";

import { ArrowDown, ArrowUpRight, Download, GraduationCap, Mail, MapPin, Sparkles } from "lucide-react";
import Image from "next/image";

import { AgentTrace } from "@/components/AgentTrace";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { Nav } from "@/components/Nav";
import { Reveal } from "@/components/Reveal";
import { education, experience, profile, projects, skills, type Project } from "@/data/profile";

// Optional files: the page adapts if they haven't been added to /public yet (checked at build time).
const hasFile = (publicPath: string) => existsSync(path.join(process.cwd(), "public", publicPath));
const hasAvatar = hasFile(profile.avatar);
const hasResume = hasFile(profile.resume);

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
      <Nav initials={initials} />
      <Reveal />
      <main id="top">
        <Hero />
        <Stats />
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
    <section className="relative overflow-hidden pt-28 sm:pt-36">
      <div className="bg-grid pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute top-40 -right-40 h-[320px] w-[420px] rounded-full bg-cyan-500/10 blur-[100px]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pb-16 sm:px-8 lg:grid-cols-[1.15fr_1fr] lg:pb-24">
        <div>
          <div className="animate-fade-up flex items-center gap-5">
            <Avatar />
            <div className="min-w-0">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                <span className="relative flex size-2">
                  <span className="animate-pulse-ring size-2 rounded-full bg-emerald-400" />
                </span>
                {profile.openTo}
              </span>
              <p className="mt-2 flex items-center gap-1.5 text-sm text-muted">
                <MapPin className="size-3.5" /> {profile.location}
              </p>
            </div>
          </div>

          <h1
            className="animate-fade-up mt-8 text-4xl font-semibold tracking-tight sm:text-6xl"
            style={{ animationDelay: "80ms" }}
          >
            Hi, I&apos;m {profile.name.split(" ")[0]}.
            {/* Keep each part of the role on one line ("AI Engineer · " / "Python Backend"). */}
            <span className="mt-2 block text-[0.8em] leading-tight text-gradient">
              {profile.role.split(" · ").map((part, i, all) => (
                <span key={part}>
                  <span className="whitespace-nowrap">
                    {part}
                    {i < all.length - 1 && " ·"}
                  </span>{" "}
                </span>
              ))}
            </span>
          </h1>

          <p
            className="animate-fade-up mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
            style={{ animationDelay: "160ms" }}
          >
            {profile.tagline}
          </p>

          <div className="animate-fade-up mt-9 flex flex-wrap gap-3" style={{ animationDelay: "240ms" }}>
            <a
              href="#projects"
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-5 text-sm font-medium text-white shadow-lg shadow-indigo-500/25 transition hover:brightness-110"
            >
              View projects <ArrowDown className="size-4" />
            </a>
            {hasResume && (
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-surface px-5 text-sm font-medium transition hover:bg-surface-strong"
              >
                <Download className="size-4" /> Resume
              </a>
            )}
            <SocialButton href={profile.links.github} label="GitHub">
              <GitHubIcon className="size-[18px]" />
            </SocialButton>
            <SocialButton href={profile.links.linkedin} label="LinkedIn">
              <LinkedInIcon className="size-[18px]" />
            </SocialButton>
          </div>
        </div>

        <div className="animate-fade-up flex justify-center lg:justify-end" style={{ animationDelay: "320ms" }}>
          <AgentTrace />
        </div>
      </div>
    </section>
  );
}

function Avatar() {
  return (
    <div className="relative shrink-0">
      <div className="rounded-full bg-gradient-to-br from-indigo-400 via-violet-500 to-cyan-400 p-[3px] shadow-xl shadow-indigo-500/20">
        {hasAvatar ? (
          <Image
            src={profile.avatar}
            alt={profile.name}
            width={112}
            height={112}
            priority
            className="size-20 rounded-full border-4 border-background object-cover sm:size-28"
          />
        ) : (
          <div className="flex size-20 items-center justify-center rounded-full border-4 border-background bg-[#11111a] font-mono text-2xl font-semibold sm:size-28 sm:text-3xl">
            <span className="text-gradient">{initials}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function SocialButton({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="inline-flex size-11 items-center justify-center rounded-xl border border-border bg-surface text-muted transition hover:bg-surface-strong hover:text-foreground"
    >
      {children}
    </a>
  );
}

/* ---------------------------------------------------------------- stats */

function Stats() {
  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8" data-reveal>
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4">
        {profile.stats.map((s) => (
          <div key={s.label} className="bg-background p-5 sm:p-6">
            <dt className="text-xs text-muted sm:text-sm">{s.label}</dt>
            <dd className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
              <span className="text-gradient">{s.value}</span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/* ---------------------------------------------------------------- shared section */

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <div data-reveal>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-indigo-300">{eyebrow}</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      </div>
      <div className="mt-10 sm:mt-12">{children}</div>
    </section>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md border border-border bg-surface px-2 py-1 font-mono text-[11px] text-zinc-300">
      {children}
    </span>
  );
}

/* ---------------------------------------------------------------- about */

function About() {
  return (
    <Section id="about" eyebrow="About" title="AI that works in production">
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5 text-base leading-relaxed text-muted sm:text-lg" data-reveal>
          {profile.about.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <ul className="space-y-3" data-reveal>
          {[
            ["LLM systems", "Structured outputs, multi-provider routing, guardrails"],
            ["Retrieval", "Hybrid search, rerankers, GraphRAG, evaluation"],
            ["Agents", "LangGraph, MCP tools, A2A, human-in-the-loop"],
            ["Backend", "FastAPI, Spring Boot, Postgres, Redis, auth, queues"],
          ].map(([title, text]) => (
            <li key={title} className="rounded-xl border border-border bg-surface p-4">
              <p className="flex items-center gap-2 text-sm font-medium">
                <Sparkles className="size-4 text-violet-300" /> {title}
              </p>
              <p className="mt-1 text-sm text-muted">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------- experience */

function ExperienceSection() {
  return (
    <Section id="experience" eyebrow="Experience" title="Where I've been building">
      <ol className="relative space-y-8 border-l border-border pl-6 sm:pl-8">
        {experience.map((job) => (
          <li key={job.title + job.period} className="relative" data-reveal>
            <span className="absolute -left-[31px] top-1.5 size-3 rounded-full border-2 border-background bg-gradient-to-br from-indigo-400 to-cyan-400 sm:-left-[39px]" />
            <div className="rounded-2xl border border-border bg-surface p-5 sm:p-7">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="text-lg font-semibold">{job.title}</h3>
                <p className="font-mono text-xs text-muted">{job.period}</p>
              </div>
              <p className="mt-1 text-sm text-muted">
                {job.org} · {job.location}
              </p>
              <ul className="mt-5 space-y-3">
                {job.points.map((p, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-indigo-400" />
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-2">
                {job.stack.map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/* ---------------------------------------------------------------- projects */

function ProjectsSection() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  return (
    <Section id="projects" eyebrow="Projects" title="Things I've built">
      <div className="space-y-6">
        {featured.map((p) => (
          <FeaturedProject key={p.name} project={p} />
        ))}
        {/* A single remaining project gets the full width instead of half a row. */}
        <div className={rest.length > 1 ? "grid gap-6 md:grid-cols-2" : ""}>
          {rest.map((p) => (
            <ProjectCard key={p.name} project={p} wide={rest.length === 1} />
          ))}
        </div>
      </div>
    </Section>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap gap-2">
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-surface px-3 text-sm transition hover:bg-surface-strong"
        >
          <GitHubIcon className="size-4" /> Code
        </a>
      )}
      {project.demo && (
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-9 items-center gap-2 rounded-lg bg-indigo-500 px-3 text-sm font-medium text-white transition hover:bg-indigo-400"
        >
          Live demo <ArrowUpRight className="size-4" />
        </a>
      )}
    </div>
  );
}

function Metrics({ project }: { project: Project }) {
  if (!project.metrics?.length) return null;
  return (
    <dl className="flex flex-wrap gap-x-8 gap-y-3">
      {project.metrics.map((m) => (
        <div key={m.label}>
          <dd className="text-xl font-semibold tracking-tight">
            <span className="text-gradient">{m.value}</span>
          </dd>
          <dt className="text-xs text-muted">{m.label}</dt>
        </div>
      ))}
    </dl>
  );
}

function Highlights({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((h, i) => (
        <li key={i} className="flex gap-3 text-sm leading-relaxed text-zinc-300">
          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-cyan-400" />
          {h}
        </li>
      ))}
    </ul>
  );
}

function FeaturedProject({ project }: { project: Project }) {
  return (
    <article
      className="group relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-indigo-500/[0.07] via-transparent to-cyan-500/[0.05]"
      data-reveal
    >
      <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div className="order-2 lg:order-1">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">Featured project</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{project.name}</h3>
          <p className="mt-1 text-sm font-medium text-indigo-200">{project.tagline}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{project.description}</p>
          <div className="mt-6">
            <Highlights items={project.highlights} />
          </div>
          <div className="mt-6">
            <Metrics project={project} />
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>
          <div className="mt-7">
            <ProjectLinks project={project} />
          </div>
        </div>
        {project.image && (
          <div className="order-1 lg:order-2">
            <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-indigo-950/50 transition duration-500 group-hover:-translate-y-1">
              <Image
                src={project.image}
                alt={`${project.name} screenshot`}
                width={2160}
                height={1350}
                sizes="(min-width: 1024px) 560px, 100vw"
                className="h-auto w-full"
              />
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

function ProjectCard({ project, wide = false }: { project: Project; wide?: boolean }) {
  const intro = (
    <>
      <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{project.name}</h3>
      <p className="mt-1 text-sm font-medium text-indigo-200">{project.tagline}</p>
      <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{project.description}</p>
      <div className="mt-6">
        <Metrics project={project} />
      </div>
    </>
  );
  const details = (
    <>
      <Highlights items={project.highlights} />
      <div className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((s) => (
          <Chip key={s}>{s}</Chip>
        ))}
      </div>
    </>
  );
  return (
    <article
      className="flex h-full flex-col rounded-3xl border border-border bg-surface p-5 transition hover:border-indigo-400/30 hover:bg-surface-strong sm:p-8"
      data-reveal
    >
      {wide ? (
        <div className="grid gap-8 lg:grid-cols-2">
          <div>{intro}</div>
          <div>{details}</div>
        </div>
      ) : (
        <>
          {intro}
          <div className="mt-6">{details}</div>
        </>
      )}
      <div className="mt-auto pt-7">
        <ProjectLinks project={project} />
      </div>
    </article>
  );
}

/* ---------------------------------------------------------------- skills */

function SkillsSection() {
  return (
    <Section id="skills" eyebrow="Skills" title="What I work with">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((g) => (
          <div key={g.group} className="rounded-2xl border border-border bg-surface p-5" data-reveal>
            <h3 className="text-sm font-semibold">{g.group}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {g.items.map((s) => (
                <Chip key={s}>{s}</Chip>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------- education */

function EducationSection() {
  return (
    <Section id="education" eyebrow="Education" title="Foundations">
      <div className="grid gap-4 md:grid-cols-2">
        {education.map((e) => (
          <div key={e.school} className="flex gap-4 rounded-2xl border border-border bg-surface p-5" data-reveal>
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-300">
              <GraduationCap className="size-5" />
            </span>
            <div>
              <h3 className="text-sm font-semibold sm:text-base">{e.degree}</h3>
              <p className="mt-1 text-sm text-muted">{e.school}</p>
              <p className="mt-1 font-mono text-xs text-muted">{e.period}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------- contact */

function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 pb-24 pt-8 sm:px-8">
      <div
        className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-indigo-500/15 via-violet-500/10 to-cyan-500/10 px-6 py-14 text-center sm:px-12 sm:py-20"
        data-reveal
      >
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
        <div className="relative">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-indigo-300">Contact</p>
          <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Let&apos;s build something intelligent.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            I&apos;m open to AI Engineer and Python Backend roles. The fastest way to reach me is e-mail or LinkedIn.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a
              href={`mailto:${profile.links.email}`}
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-white px-5 text-sm font-medium text-zinc-900 transition hover:bg-zinc-200"
            >
              <Mail className="size-4" /> {profile.links.email}
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-background/40 px-5 text-sm font-medium transition hover:bg-surface-strong"
            >
              <LinkedInIcon className="size-4" /> LinkedIn
            </a>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-background/40 px-5 text-sm font-medium transition hover:bg-surface-strong"
            >
              <GitHubIcon className="size-4" /> GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-8 text-sm text-muted sm:flex-row sm:px-8">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="font-mono text-xs">Built with Next.js · Deployed on Vercel</p>
      </div>
    </footer>
  );
}
