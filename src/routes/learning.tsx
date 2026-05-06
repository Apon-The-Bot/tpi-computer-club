import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { SectionHeader } from "@/components/SectionHeader";
import { CourseCard } from "@/components/courses/CourseCard";
import { courses } from "@/data/courses";
import { ArrowRight, BookOpen, Radio, TrendingUp, Folder, Users, ListChecks } from "lucide-react";

export const Route = createFileRoute("/learning")({
  head: () => ({
    meta: [
      { title: "Learning Space — TPI Computer Club" },
      { name: "description", content: "Structured courses, video lessons, weekly live classes and progress tracking inside the TPI Computer Club Learning Space." },
      { property: "og:title", content: "Learning Space — TPI Computer Club" },
      { property: "og:description", content: "The complete LMS for TPI students." },
    ],
  }),
  component: Learning,
});

const features = [
  { icon: ListChecks, title: "Structured syllabus", desc: "Modules, lessons and outcomes designed for steady progress." },
  { icon: BookOpen, title: "Video lessons", desc: "Embedded YouTube lessons you can watch anywhere." },
  { icon: Radio, title: "Live classes", desc: "Weekly mentor-led classes for every track." },
  { icon: TrendingUp, title: "Progress tracking", desc: "See your completion and pick up exactly where you left off." },
  { icon: Folder, title: "Resources", desc: "Slides, exercises and reference material for every lesson." },
  { icon: Users, title: "Community support", desc: "Ask questions, get unstuck, learn together." },
];

function Learning() {
  return (
    <PublicLayout>
      <section className="bg-hero border-b border-border">
        <div className="mx-auto max-w-5xl px-4 py-16 md:px-6">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-primary">Learning Space · LMS</div>
          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">A digital classroom built for TPI students.</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">Everything you need to learn — courses, live classes, progress tracking, resources and a supportive community.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-md bg-gold-gradient px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow">
              Go to Dashboard <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/courses" className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary/40 px-5 py-3 text-sm font-semibold">Browse Courses</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <SectionHeader eyebrow="Available Courses" title="Pick a track and start learning today." />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => <CourseCard key={c.slug} course={c} />)}
        </div>
      </section>

      <section className="bg-surface/40 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
          <SectionHeader eyebrow="Why Learning Space" title="Built around how students actually learn." />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-xl border border-border bg-card p-6">
                <f.icon className="h-5 w-5 text-primary" />
                <div className="mt-3 text-base font-semibold">{f.title}</div>
                <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
