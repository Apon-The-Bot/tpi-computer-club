import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ProgressBar } from "@/components/ui/progress-bar";
import { allLessons, getLesson } from "@/data/courses";
import { courseProgress, isLessonComplete, setLessonComplete, useProgressVersion } from "@/lib/progress";
import { ArrowLeft, ArrowRight, CheckCircle2, Circle, FileText } from "lucide-react";

export const Route = createFileRoute("/courses/$slug/lessons/$lessonSlug")({
  head: ({ params }) => {
    const r = getLesson(params.slug, params.lessonSlug);
    return { meta: [{ title: r ? `${r.lesson.title} — ${r.course.title}` : "Lesson" }] };
  },
  loader: ({ params }) => {
    const r = getLesson(params.slug, params.lessonSlug);
    if (!r) throw notFound();
    return r;
  },
  component: LessonPage,
  notFoundComponent: () => <DashboardLayout title="Not found"><div className="rounded-xl border border-border bg-card p-8 text-center text-sm">Lesson not found. <Link to="/courses" className="text-primary">Back to courses</Link></div></DashboardLayout>,
  errorComponent: ({ error }) => <DashboardLayout title="Error"><div className="rounded-xl border border-border bg-card p-8 text-center text-sm">{error.message}</div></DashboardLayout>,
});

function LessonPage() {
  useProgressVersion();
  const { course, module: mod, lesson } = Route.useLoaderData() as {
    course: import("@/data/courses").Course;
    module: import("@/data/courses").Module;
    lesson: import("@/data/courses").Lesson;
  };
  const lessons = allLessons(course);
  const idx = lessons.findIndex((l) => l.id === lesson.id);
  const prev = lessons[idx - 1];
  const next = lessons[idx + 1];
  const done = isLessonComplete(lesson.id);
  const p = courseProgress(course);

  return (
    <DashboardLayout title={course.title}>
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <div>
            <Link to="/courses/$slug" params={{ slug: course.slug }} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary">
              <ArrowLeft className="h-3 w-3" /> Back to course
            </Link>
            <div className="mt-3 text-xs font-mono uppercase tracking-wider text-primary">{mod.title}</div>
            <h1 className="mt-1 text-2xl font-semibold">{lesson.title}</h1>
          </div>

          <div className="overflow-hidden rounded-xl border border-border bg-black">
            <div className="aspect-video">
              <iframe
                className="h-full w-full"
                src={lesson.videoEmbedUrl}
                title={lesson.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-base font-semibold">About this lesson</h2>
            <p className="mt-2 text-sm text-muted-foreground">{lesson.description}</p>
            {lesson.resources && lesson.resources.length > 0 && (
              <div className="mt-5">
                <div className="text-xs font-mono uppercase tracking-wider text-primary">Resources</div>
                <ul className="mt-2 space-y-2">
                  {lesson.resources.map((r) => (
                    <li key={r.label}><a href={r.url} className="inline-flex items-center gap-2 text-sm text-primary"><FileText className="h-4 w-4" /> {r.label}</a></li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card p-5">
            <button
              onClick={() => setLessonComplete(lesson.id, !done)}
              className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold ${done ? "border border-border text-muted-foreground" : "bg-gold-gradient text-primary-foreground shadow-glow"}`}
            >
              {done ? <><CheckCircle2 className="h-4 w-4" /> Completed — Mark Incomplete</> : <><Circle className="h-4 w-4" /> Mark as Complete</>}
            </button>
            <div className="flex gap-2">
              {prev && (
                <Link to="/courses/$slug/lessons/$lessonSlug" params={{ slug: course.slug, lessonSlug: prev.slug }} className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-2 text-xs">
                  <ArrowLeft className="h-3.5 w-3.5" /> Previous
                </Link>
              )}
              {next && (
                <Link to="/courses/$slug/lessons/$lessonSlug" params={{ slug: course.slug, lessonSlug: next.slug }} className="inline-flex items-center gap-1 rounded-md border border-primary/60 bg-primary/10 px-3 py-2 text-xs text-primary">
                  Next <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Lesson sidebar */}
        <aside className="rounded-2xl border border-border bg-card p-5 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
          <div className="text-xs font-mono uppercase tracking-wider text-primary">Course Progress</div>
          <div className="mt-2 flex items-center justify-between text-xs"><span className="text-muted-foreground">{p.done} / {p.total} done</span><span className="font-mono text-primary">{p.percent}%</span></div>
          <div className="mt-2"><ProgressBar value={p.percent} /></div>
          <div className="mt-5 space-y-4">
            {course.modules.map((m) => (
              <div key={m.id}>
                <div className="text-xs font-semibold text-muted-foreground">{m.title}</div>
                <div className="mt-1 space-y-0.5">
                  {m.lessons.map((l) => {
                    const lDone = isLessonComplete(l.id);
                    const active = l.id === lesson.id;
                    return (
                      <Link key={l.id} to="/courses/$slug/lessons/$lessonSlug" params={{ slug: course.slug, lessonSlug: l.slug }} className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-xs ${active ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary/50"}`}>
                        {lDone ? <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> : <Circle className="h-3.5 w-3.5" />}
                        <span className="line-clamp-1 flex-1">{l.title}</span>
                        <span className="font-mono text-[10px]">{l.duration}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </DashboardLayout>
  );
}
