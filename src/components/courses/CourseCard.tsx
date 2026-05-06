import { Link } from "@tanstack/react-router";
import { type Course } from "@/data/courses";
import { courseProgress, useProgressVersion } from "@/lib/progress";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Clock, BookOpen, ArrowRight } from "lucide-react";

const accentClass: Record<Course["accent"], string> = {
  gold: "from-[oklch(0.82_0.17_80)] to-[oklch(0.7_0.18_55)]",
  cyber: "from-[oklch(0.7_0.16_235)] to-[oklch(0.55_0.2_260)]",
  emerald: "from-[oklch(0.75_0.16_160)] to-[oklch(0.55_0.16_180)]",
  rose: "from-[oklch(0.75_0.18_15)] to-[oklch(0.6_0.2_350)]",
  violet: "from-[oklch(0.7_0.18_300)] to-[oklch(0.55_0.2_270)]",
};

export function CourseCard({ course }: { course: Course }) {
  useProgressVersion();
  const p = courseProgress(course);
  return (
    <Link
      to="/courses/$slug"
      params={{ slug: course.slug }}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow"
    >
      <div className={`relative h-32 bg-gradient-to-br ${accentClass[course.accent]} p-5`}>
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative flex h-full items-end justify-between">
          <div className="font-mono text-4xl font-bold text-primary-foreground/90">{course.icon}</div>
          <span className="rounded-md bg-black/30 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-white">
            {course.level}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{course.category}</div>
        <h3 className="mt-1 text-lg font-semibold">{course.title}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{course.shortDescription}</p>
        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {course.duration}</span>
          <span className="inline-flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" /> {course.modules.length} modules</span>
        </div>
        <div className="mt-4">
          <div className="mb-1 flex items-center justify-between text-[11px] text-muted-foreground">
            <span>Progress</span>
            <span className="font-mono text-primary">{p.percent}%</span>
          </div>
          <ProgressBar value={p.percent} />
        </div>
        <div className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary">
          {p.percent > 0 ? "Continue" : "Start"} learning
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
