import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ProgressBar } from "@/components/ui/progress-bar";
import { courses, getCourse, allLessons } from "@/data/courses";
import { courseProgress, isLessonComplete, useProgressVersion } from "@/lib/progress";
import { ArrowRight, BookOpen, Clock, GraduationCap, CheckCircle2, Circle, ChevronDown, FileText } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/courses/$slug/")({
  head: ({ params }) => {
    const c = getCourse(params.slug);
    return {
      meta: [
        { title: c ? `${c.title} — TPI Learning Space` : "Course" },
        { name: "description", content: c?.shortDescription ?? "Course details" },
      ],
    };
  },
  loader: ({ params }) => {
    const c = getCourse(params.slug);
    if (!c) throw notFound();
    return { course: c };
  },
  component: CourseDetail,
  notFoundComponent: () => (
    <DashboardLayout title="Not found"><div className="rounded-xl border border-border bg-card p-8 text-center text-sm">Course not found. <Link to="/courses" className="text-primary">Back to courses</Link></div></DashboardLayout>
  ),
  errorComponent: ({ error }) => <DashboardLayout title="Error"><div className="rounded-xl border border-border bg-card p-8 text-center text-sm">{error.message}</div></DashboardLayout>,
});

function CourseDetail() {
  useProgressVersion();
  const { course } = Route.useLoaderData();
  const p = courseProgress(course);
  const first = allLessons(course)[0];
  const next = allLessons(course).find((l) => !isLessonComplete(l.id)) ?? first;
  const [openMod, setOpenMod] = useState<string | null>(course.modules[0]?.id ?? null);
  const otherCourses = courses.filter((c) => c.slug !== course.slug).slice(0, 3);

  return (
    <DashboardLayout title={course.title}>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 text-xs">
              <span className="rounded-md border border-border px-2 py-0.5 font-mono text-[10px] text-cyber">{course.category}</span>
              <span className="rounded-md border border-border px-2 py-0.5 font-mono text-[10px]">{course.level}</span>
            </div>
            <h1 className="mt-3 text-3xl font-semibold">{course.title}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{course.overview}</p>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {course.duration}</span>
              <span className="inline-flex items-center gap-1.5"><BookOpen className="h-3.5 w-3.5" /> {course.modules.length} modules · {allLessons(course).length} lessons</span>
              <span className="inline-flex items-center gap-1.5"><GraduationCap className="h-3.5 w-3.5" /> {course.instructor}</span>
            </div>
            <div className="mt-5">
              <div className="mb-1 flex items-center justify-between text-xs"><span className="text-muted-foreground">Your progress</span><span className="font-mono text-primary">{p.percent}%</span></div>
              <ProgressBar value={p.percent} />
            </div>
            <div className="mt-6">
              {next && (
                <Link to="/courses/$slug/lessons/$lessonSlug" params={{ slug: course.slug, lessonSlug: next.slug }} className="inline-flex items-center gap-2 rounded-md bg-gold-gradient px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow">
                  {p.percent > 0 ? "Continue" : "Start"} Lesson <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>

          {/* Outcomes */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-base font-semibold">What you'll learn</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {course.learningOutcomes.map((o) => (
                <li key={o} className="flex items-start gap-2 text-sm text-muted-foreground"><CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" /> {o}</li>
              ))}
            </ul>
          </div>

          {/* Curriculum */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-base font-semibold">Curriculum</h2>
            <div className="mt-4 divide-y divide-border">
              {course.modules.map((m) => {
                const open = openMod === m.id;
                return (
                  <div key={m.id} className="py-3">
                    <button onClick={() => setOpenMod(open ? null : m.id)} className="flex w-full items-center justify-between text-left">
                      <div>
                        <div className="text-sm font-semibold">{m.title}</div>
                        <div className="text-xs text-muted-foreground">{m.lessons.length} lessons</div>
                      </div>
                      <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
                    </button>
                    {open && (
                      <div className="mt-3 space-y-1 pl-2">
                        {m.lessons.map((l, i) => {
                          const done = isLessonComplete(l.id);
                          return (
                            <Link key={l.id} to="/courses/$slug/lessons/$lessonSlug" params={{ slug: course.slug, lessonSlug: l.slug }} className="flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-secondary/60">
                              <div className="flex items-center gap-3">
                                {done ? <CheckCircle2 className="h-4 w-4 text-primary" /> : <Circle className="h-4 w-4 text-muted-foreground" />}
                                <span className="text-muted-foreground font-mono text-xs">{i + 1}.</span>
                                <span>{l.title}</span>
                              </div>
                              <span className="font-mono text-[11px] text-muted-foreground">{l.duration}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Resources */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-base font-semibold">Resources</h2>
            <ul className="mt-4 space-y-2">
              {course.resources.map((r) => (
                <li key={r.label}>
                  <a href={r.url} className="inline-flex items-center gap-2 text-sm text-primary"><FileText className="h-4 w-4" /> {r.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="text-xs uppercase font-mono tracking-wider text-primary">Instructor</div>
            <div className="mt-3 flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-cyber-gradient font-bold text-cyber-foreground">{course.instructor.split(" ").map((s) => s[0]).slice(0, 2).join("")}</div>
              <div>
                <div className="text-sm font-semibold">{course.instructor}</div>
                <div className="text-xs text-muted-foreground">Mentor · TPI Computer Club</div>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="text-xs uppercase font-mono tracking-wider text-primary">Other Courses</div>
            <div className="mt-3 space-y-2">
              {otherCourses.map((c) => (
                <Link key={c.slug} to="/courses/$slug" params={{ slug: c.slug }} className="flex items-center justify-between rounded-md border border-border p-3 hover:border-primary/40">
                  <div>
                    <div className="text-sm font-semibold">{c.title}</div>
                    <div className="text-xs text-muted-foreground">{c.level}</div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </DashboardLayout>
  );
}
