import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Users, BookOpen, Calendar, Trophy, Sparkles, Code2, Palette, ShieldCheck, Briefcase, Brain, Cpu, GraduationCap, MapPin, Bell, ChevronRight } from "lucide-react";
import logo from "/logo.png?url";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { HeroVisual } from "@/components/home/HeroVisual";
import { SectionHeader } from "@/components/SectionHeader";
import { CourseCard } from "@/components/courses/CourseCard";
import { LiveClassCard } from "@/components/dashboard/LiveClassCard";
import { courses } from "@/data/courses";
import { events } from "@/data/events";
import { notices } from "@/data/notices";
import { team } from "@/data/team";
import { gallery } from "@/data/gallery";
import { todaysLiveClass } from "@/data/liveClass";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TPI Computer Club — Think. Create. Innovate." },
      { name: "description", content: "Building future-ready IT skills through community, practice and innovation. Join the TPI Computer Club." },
    ],
  }),
  component: Home,
});

const stats = [
  { label: "Active Members", value: "320+", icon: Users },
  { label: "Skill Tracks", value: "5", icon: Brain },
  { label: "Workshops / yr", value: "24", icon: Calendar },
  { label: "Events Hosted", value: "60+", icon: Trophy },
  { label: "Learning Modules", value: "120+", icon: BookOpen },
];

const focus = [
  { icon: Code2, label: "Programming" },
  { icon: Brain, label: "Problem Solving" },
  { icon: Palette, label: "Graphics Design" },
  { icon: ShieldCheck, label: "Cyber Security" },
  { icon: Cpu, label: "Digital Skills" },
  { icon: Briefcase, label: "Team Projects" },
];

const tracks = [
  { icon: Code2, title: "Programming Fundamentals", desc: "Build a solid foundation with C, problem solving and algorithms.", related: "C Programming" },
  { icon: GraduationCap, title: "Object-Oriented Programming", desc: "Master OOP using C++ and C# with real projects.", related: "C++ · C#" },
  { icon: Palette, title: "Graphics & Creative Design", desc: "Visual design, Photoshop and Illustrator from scratch.", related: "Graphics Design" },
  { icon: ShieldCheck, title: "Cyber Security Basics", desc: "Threat models, secure networks and OWASP Top 10.", related: "Cyber Security" },
  { icon: Briefcase, title: "IT Career Readiness", desc: "Resume, interviews, communication and portfolio.", related: "All tracks" },
];

function Home() {
  return (
    <PublicLayout>
      {/* HERO */}
      <section className="relative overflow-hidden bg-hero">
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 md:px-6 lg:grid-cols-2 lg:py-28">
          <div>
            <div className="flex items-center gap-3">
              <img src={logo} alt="TPI Computer Club" className="h-12 w-12 rounded-full ring-1 ring-border" />
              <div>
                <div className="text-xs font-mono uppercase tracking-[0.25em] text-primary">TPI Computer Club</div>
                <div className="text-[11px] text-muted-foreground">Think. Create. Innovate.</div>
              </div>
            </div>
            <h1 className="mt-7 text-4xl font-semibold leading-[1.1] sm:text-5xl lg:text-6xl">
              Building <span className="text-gradient-gold">Future-Ready IT Skills</span> Through Community, Practice & Innovation.
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
              A student-driven technology club focused on programming, design, cybersecurity, workshops, live classes and real-world digital skills.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/learning" className="inline-flex items-center gap-2 rounded-md bg-gold-gradient px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5">
                Explore Learning Space <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/membership" className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary/50 px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary">
                Join the Club
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-4 text-xs text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="font-mono">5 skill tracks · weekly live classes · hands-on projects</span>
            </div>
          </div>
          <div className="relative">
            <HeroVisual />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-border bg-surface/40">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden bg-border md:grid-cols-5">
          {stats.map((s) => (
            <div key={s.label} className="bg-background p-6">
              <s.icon className="h-5 w-5 text-primary" />
              <div className="mt-3 text-2xl font-semibold">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader
              eyebrow="About TPI Computer Club"
              title="A modern computer training & innovation hub for TPI students."
              description="We bring together students, mentors and industry insights to help every member build practical, career-ready IT skills through structured tracks, workshops, and a peer-driven community."
            />
            <div className="mt-6 space-y-3 text-sm text-muted-foreground">
              <p>The club operates as a serious, organized technical community — not just a social group. We focus on consistent practice, real-world projects, and disciplined learning routines.</p>
              <p>From your first line of code to your first live workshop, the club is designed to grow with you.</p>
            </div>
            <Link to="/about" className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary">
              Read more about us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card-soft">
            <div className="text-xs font-mono uppercase tracking-wider text-primary">What we focus on</div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {focus.map((f) => (
                <div key={f.label} className="flex items-center gap-3 rounded-lg border border-border bg-background p-3">
                  <span className="grid h-9 w-9 place-items-center rounded-md bg-secondary text-primary"><f.icon className="h-4 w-4" /></span>
                  <span className="text-sm">{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LEARNING SPACE PREVIEW */}
      <section className="bg-surface/40">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-6">
          <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-end">
            <SectionHeader eyebrow="Learning Space — LMS" title="A complete digital classroom for TPI members." description="Structured courses, video lessons, weekly live classes and personal progress tracking — all in one place." />
            <Link to="/learning" className="inline-flex items-center gap-1 text-sm font-medium text-primary">Enter Learning Space <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 grid gap-6 sm:grid-cols-2">
              {courses.slice(0, 4).map((c) => <CourseCard key={c.slug} course={c} />)}
            </div>
            <div>
              <LiveClassCard data={todaysLiveClass} />
              <Link to="/dashboard" className="mt-4 block rounded-xl border border-border bg-card p-4 text-sm hover:border-primary/40">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Open Dashboard</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="mt-1 text-xs text-muted-foreground">View progress, lessons, and live schedule.</div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SKILL TRACKS */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <SectionHeader eyebrow="Curriculum" title="Skill Tracks We Offer" description="Five focused tracks that cover the most in-demand areas of modern IT." align="center" />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {tracks.map((t) => (
            <div key={t.title} className="group rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow">
              <div className="grid h-11 w-11 place-items-center rounded-lg bg-gold-gradient text-primary-foreground"><t.icon className="h-5 w-5" /></div>
              <div className="mt-5 text-lg font-semibold">{t.title}</div>
              <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
              <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs">
                <span className="text-muted-foreground">Related</span>
                <span className="font-mono text-primary">{t.related}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EVENTS */}
      <section className="bg-surface/40">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-6">
          <div className="flex items-end justify-between gap-4">
            <SectionHeader eyebrow="Upcoming Events" title="Workshops, contests & seminars" />
            <Link to="/events" className="text-sm font-medium text-primary">View all →</Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {events.filter((e) => e.upcoming).slice(0, 6).map((e) => (
              <div key={e.id} className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-center justify-between">
                  <span className="rounded-md border border-border px-2 py-0.5 font-mono text-[10px] text-cyber">{e.category}</span>
                  <span className="text-xs text-muted-foreground">{new Date(e.date).toLocaleDateString(undefined, { month: "short", day: "numeric" })}</span>
                </div>
                <h3 className="mt-3 text-base font-semibold">{e.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{e.description}</p>
                <div className="mt-4 flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" /> {e.location}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NOTICES */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <div className="flex items-end justify-between gap-4">
          <SectionHeader eyebrow="Notice Board" title="Latest official notices" />
          <Link to="/notices" className="text-sm font-medium text-primary">View all →</Link>
        </div>
        <div className="mt-10 overflow-hidden rounded-xl border border-border bg-card">
          {notices.slice(0, 4).map((n, i) => (
            <div key={n.id} className={`flex items-start gap-4 p-5 ${i > 0 ? "border-t border-border" : ""}`}>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-secondary text-primary"><Bell className="h-4 w-4" /></span>
              <div className="flex-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="font-mono">{n.date}</span>
                  <span>·</span>
                  <span>{n.category}</span>
                  {n.important && <span className="rounded-md bg-primary/15 px-1.5 py-0.5 text-[10px] font-semibold text-primary">IMPORTANT</span>}
                </div>
                <div className="mt-1 text-sm font-medium">{n.title}</div>
              </div>
              <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
            </div>
          ))}
        </div>
      </section>

      {/* COMMITTEE PREVIEW */}
      <section className="bg-surface/40">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-6">
          <div className="flex items-end justify-between gap-4">
            <SectionHeader eyebrow="Leadership" title="The Committee 2026" />
            <Link to="/committee" className="text-sm font-medium text-primary">Meet the team →</Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.slice(0, 4).map((m) => (
              <div key={m.id} className="rounded-xl border border-border bg-card p-5 text-center">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold-gradient text-lg font-bold text-primary-foreground">{m.initials}</div>
                <div className="mt-3 text-sm font-semibold">{m.name}</div>
                <div className="text-xs text-primary">{m.role}</div>
                <div className="mt-1 text-[11px] text-muted-foreground">{m.department}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <div className="flex items-end justify-between gap-4">
          <SectionHeader eyebrow="Gallery" title="Moments from the club" />
          <Link to="/gallery" className="text-sm font-medium text-primary">Open gallery →</Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
          {gallery.slice(0, 8).map((g) => (
            <div
              key={g.id}
              className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-border"
              style={{ background: `linear-gradient(135deg, oklch(0.4 0.12 ${g.hue}), oklch(0.22 0.06 ${(g.hue + 60) % 360}))` }}
            >
              <div className="absolute inset-0 bg-grid opacity-30" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                <div className="font-semibold">{g.title}</div>
                <div className="text-[10px] text-white/70">{g.category}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MEMBERSHIP CTA */}
      <section className="border-t border-border bg-hero">
        <div className="mx-auto max-w-5xl px-4 py-20 text-center md:px-6">
          <h2 className="text-3xl font-semibold sm:text-5xl">
            Join TPI Computer Club and start building <span className="text-gradient-gold">real IT skills</span>.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Hands-on learning, peer community, workshops, live classes, projects, and leadership opportunities — built for serious students.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/membership" className="inline-flex items-center gap-2 rounded-md bg-gold-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow">
              Become a Member <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/learning" className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary/40 px-6 py-3 text-sm font-semibold">
              Explore Learning Space
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
