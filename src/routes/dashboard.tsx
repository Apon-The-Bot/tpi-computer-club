import { createFileRoute, Link } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { LiveClassCard } from "@/components/dashboard/LiveClassCard";
import { ProgressBar } from "@/components/ui/progress-bar";
import { courses, allLessons } from "@/data/courses";
import { todaysLiveClass, upcomingClasses } from "@/data/liveClass";
import { notices } from "@/data/notices";
import { mockUser } from "@/data/user";
import { courseProgress, totalCompleted, useProgressVersion } from "@/lib/progress";
import { Award, Bell, Sparkles, Trophy, BookOpen, ArrowRight, Clock } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Learning Space" }] }),
  component: Dashboard,
});

function Dashboard() {
  useProgressVersion();
  const enrolled = courses.filter((c) => mockUser.enrolledCourses.includes(c.slug));
  const overall = enrolled.length === 0 ? 0 : Math.round(enrolled.reduce((a, c) => a + courseProgress(c).percent, 0) / enrolled.length);
  const continueCourse = enrolled[0];
  const continueLesson = continueCourse ? allLessons(continueCourse)[0] : null;
  const recommended = courses.find((c) => !mockUser.enrolledCourses.includes(c.slug));
  const totalLessonsDone = totalCompleted();

  return (
    <DashboardLayout title="Overview">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Welcome */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-primary">Welcome back</div>
              <h1 className="mt-2 text-2xl font-semibold">Hello, {mockUser.name.split(" ")[0]} 👋</h1>
              <p className="mt-1 text-sm text-muted-foreground">{mockUser.department} · {mockUser.semester}</p>
            </div>
            <div className="hidden text-right sm:block">
              <div className="text-xs text-muted-foreground">Overall Progress</div>
              <div className="text-3xl font-semibold text-primary">{overall}%</div>
            </div>
          </div>
          <div className="mt-5"><ProgressBar value={overall} /></div>
          <div className="mt-6 grid grid-cols-3 gap-3">
            <Stat label="Enrolled" value={enrolled.length} icon={BookOpen} />
            <Stat label="Lessons Done" value={totalLessonsDone} icon={Trophy} />
            <Stat label="Badges" value={mockUser.badges.length} icon={Award} />
          </div>
        </div>

        <LiveClassCard data={todaysLiveClass} />

        {/* Course progress */}
        <div className="lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-semibold">My Courses</h2>
            <Link to="/courses" className="text-xs font-medium text-primary">All courses →</Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {enrolled.map((c) => {
              const p = courseProgress(c);
              return (
                <Link key={c.slug} to="/courses/$slug" params={{ slug: c.slug }} className="rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/40">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold">{c.title}</div>
                    <span className="rounded-md border border-border px-2 py-0.5 font-mono text-[10px] text-primary">{p.percent}%</span>
                  </div>
                  <div className="mt-3"><ProgressBar value={p.percent} /></div>
                  <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{p.done} / {p.total} lessons</span>
                    <span className="inline-flex items-center gap-1 text-primary">Continue <ArrowRight className="h-3.5 w-3.5" /></span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Continue learning */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="text-xs font-mono uppercase tracking-wider text-primary">Continue learning</div>
          {continueCourse && continueLesson ? (
            <>
              <div className="mt-3 text-base font-semibold">{continueLesson.title}</div>
              <div className="text-xs text-muted-foreground">{continueCourse.title}</div>
              <Link
                to="/courses/$slug/lessons/$lessonSlug"
                params={{ slug: continueCourse.slug, lessonSlug: continueLesson.slug }}
                className="mt-4 inline-flex items-center gap-2 rounded-md bg-gold-gradient px-3 py-2 text-xs font-semibold text-primary-foreground"
              >
                Resume Lesson <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </>
          ) : (
            <div className="mt-3 text-sm text-muted-foreground">Pick a course to start.</div>
          )}
        </div>

        {/* Upcoming classes */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="text-base font-semibold">Upcoming Classes</h2>
          <div className="mt-4 space-y-3">
            {upcomingClasses.map((c) => (
              <div key={c.id} className="flex items-start gap-3 rounded-lg border border-border p-3">
                <span className="grid h-9 w-9 place-items-center rounded-md bg-cyber-gradient text-cyber-foreground"><Clock className="h-4 w-4" /></span>
                <div className="flex-1">
                  <div className="text-sm font-semibold">{c.title}</div>
                  <div className="text-xs text-muted-foreground">{c.course} · {c.instructor}</div>
                </div>
                <div className="text-right text-[11px] text-muted-foreground">
                  <div>{c.date}</div><div>{c.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent notices */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="text-base font-semibold">Recent Notices</h2>
          <div className="mt-4 space-y-3">
            {notices.slice(0, 4).map((n) => (
              <div key={n.id} className="flex items-start gap-3 border-b border-border pb-3 last:border-0 last:pb-0">
                <Bell className="mt-0.5 h-4 w-4 text-primary" />
                <div className="flex-1">
                  <div className="text-xs text-muted-foreground">{n.date} · {n.category}</div>
                  <div className="text-sm">{n.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended */}
        {recommended && (
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-primary">
              <Sparkles className="h-4 w-4" /> Recommended
            </div>
            <div className="mt-3 text-base font-semibold">{recommended.title}</div>
            <p className="mt-1 text-sm text-muted-foreground">{recommended.shortDescription}</p>
            <Link to="/courses/$slug" params={{ slug: recommended.slug }} className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary">
              Explore course <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        )}

        {/* Achievements */}
        <div className="rounded-2xl border border-border bg-card p-5 lg:col-span-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">Achievements</h2>
            <span className="text-xs text-muted-foreground">{mockUser.badges.length} earned</span>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {mockUser.badges.map((b) => (
              <div key={b.id} className="flex items-center gap-3 rounded-lg border border-border p-4">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-gold-gradient text-primary-foreground"><Trophy className="h-5 w-5" /></div>
                <div>
                  <div className="text-sm font-semibold">{b.title}</div>
                  <div className="text-xs text-muted-foreground">{b.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function Stat({ label, value, icon: Icon }: { label: string; value: number; icon: any }) {
  return (
    <div className="rounded-lg border border-border bg-background p-4">
      <Icon className="h-4 w-4 text-primary" />
      <div className="mt-2 text-xl font-semibold">{value}</div>
      <div className="text-[11px] text-muted-foreground">{label}</div>
    </div>
  );
}
