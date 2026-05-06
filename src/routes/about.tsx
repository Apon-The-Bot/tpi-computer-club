import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { SectionHeader } from "@/components/SectionHeader";
import { Target, Eye, CheckCircle2, Users, Sparkles, GraduationCap } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — TPI Computer Club | Tangail Polytechnic Institute" },
      { name: "description", content: "TPI Computer Club is the official programming community of the Computer Department at Tangail Polytechnic Institute (TPI), built to take students beyond theory into real, hands-on coding." },
      { property: "og:title", content: "About — TPI Computer Club" },
      { property: "og:description", content: "The official programming club of the Computer Department, Tangail Polytechnic Institute (TPI)." },
    ],
  }),
  component: About,
});

const objectives = [
  "Take Computer Department students beyond theory-heavy textbooks into real coding practice",
  "Run regular hands-on classes, workshops and programming contests inside TPI",
  "Build problem-solving skills using actual projects, not just exam syllabus",
  "Mentor juniors so every batch of the Computer Department gets stronger",
  "Create a friendly space where TPI students learn, build and grow together",
  "Prepare Computer Department students for jobs, freelancing and higher studies",
];

function About() {
  return (
    <PublicLayout>
      <section className="bg-hero border-b border-border">
        <div className="mx-auto max-w-5xl px-4 py-20 md:px-6">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-primary">About TPI Computer Club</div>
          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">Built for the Computer Department students of Tangail Polytechnic Institute.</h1>
          <p className="mt-5 max-w-3xl text-muted-foreground">
            TPI Computer Club is the official programming community of the Computer Department at <strong>Tangail Polytechnic Institute (TPI)</strong>. The club was started thinking about every single student of our department — because the books we study today are mostly filled with theory, with very little real coding practice. We wanted a place where TPI students could actually sit down, write code, break things, build projects and learn the way the real industry works.
          </p>
          <p className="mt-4 max-w-3xl text-muted-foreground">
            From the first semester to the final, our goal is simple — no Computer Department student of TPI should leave the institute knowing only definitions. They should leave knowing how to build.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl grid gap-6 px-4 py-16 md:grid-cols-2 md:px-6">
        <div className="rounded-2xl border border-border bg-card p-8">
          <Target className="h-6 w-6 text-primary" />
          <h2 className="mt-3 text-xl font-semibold">Our Mission</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            To make sure every Computer Department student at Tangail Polytechnic Institute gets the chance to learn real programming — not just memorise theory from the syllabus, but actually code, build and ship projects.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-8">
          <Eye className="h-6 w-6 text-primary" />
          <h2 className="mt-3 text-xl font-semibold">Our Vision</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            To make TPI Computer Club the strongest student tech community in any polytechnic of Bangladesh — a club where Computer Department students of TPI graduate as skilled developers, ready for the real IT industry.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <SectionHeader eyebrow="Core Objectives" title="What we work toward, every semester." />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {objectives.map((o) => (
            <div key={o} className="flex items-start gap-3 rounded-xl border border-border bg-card p-5">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
              <span className="text-sm">{o}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface/40 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-6">
          <SectionHeader eyebrow="Why it matters" title="Real impact on student careers." description="Every workshop, lesson and event is designed with one outcome in mind — making our members ready for real IT roles after graduation." />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              { icon: GraduationCap, title: "Better Academic Outcomes", desc: "Members consistently outperform peers on lab assessments and projects." },
              { icon: Users, title: "Stronger Professional Network", desc: "Alumni, mentors and industry guests build long-lasting connections." },
              { icon: Sparkles, title: "Real Portfolio Projects", desc: "Students leave with deployable projects, not just certificates." },
            ].map((c) => (
              <div key={c.title} className="rounded-xl border border-border bg-card p-6">
                <c.icon className="h-6 w-6 text-primary" />
                <h3 className="mt-3 text-lg font-semibold">{c.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
