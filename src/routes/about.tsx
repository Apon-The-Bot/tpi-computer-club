import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { SectionHeader } from "@/components/SectionHeader";
import { Target, Eye, CheckCircle2, Users, Sparkles, GraduationCap } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — TPI Computer Club" },
      { name: "description", content: "Learn about TPI Computer Club — our mission, vision and the technical focus areas we train students in." },
      { property: "og:title", content: "About — TPI Computer Club" },
      { property: "og:description", content: "Mission, vision and core objectives of the TPI Computer Club." },
    ],
  }),
  component: About,
});

const objectives = [
  "Develop disciplined coding & problem-solving habits",
  "Run weekly live classes, workshops and contests",
  "Mentor students for industry-grade IT skills",
  "Build a culture of collaboration and ownership",
  "Encourage research, projects and presentations",
  "Promote ethical use of technology and security",
];

function About() {
  return (
    <PublicLayout>
      <section className="bg-hero border-b border-border">
        <div className="mx-auto max-w-5xl px-4 py-20 md:px-6">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-primary">About the Club</div>
          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">An institutional home for serious tech-minded students.</h1>
          <p className="mt-5 max-w-3xl text-muted-foreground">
            TPI Computer Club is an official student-led technology community at the institute. We exist to bridge classroom theory with real-world digital skills through structured learning tracks, expert mentorship, hands-on workshops, and a supportive peer network.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl grid gap-6 px-4 py-16 md:grid-cols-2 md:px-6">
        <div className="rounded-2xl border border-border bg-card p-8">
          <Target className="h-6 w-6 text-primary" />
          <h2 className="mt-3 text-xl font-semibold">Our Mission</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            To empower every TPI student with practical, industry-relevant IT skills through community-driven learning, disciplined practice and project-based education.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-8">
          <Eye className="h-6 w-6 text-primary" />
          <h2 className="mt-3 text-xl font-semibold">Our Vision</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            To become the most active and respected institutional tech community — recognised for producing skilled, ethical and innovative IT professionals.
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
