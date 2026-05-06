import { createFileRoute, Link } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ProgressBar } from "@/components/ui/progress-bar";
import { mockUser } from "@/data/user";
import { courses } from "@/data/courses";
import { courseProgress, totalCompleted, useProgressVersion } from "@/lib/progress";
import { Mail, Phone, BookOpen, Trophy, Settings, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — Learning Space" }] }),
  component: Profile,
});

function Profile() {
  useProgressVersion();
  const enrolled = courses.filter((c) => mockUser.enrolledCourses.includes(c.slug));
  const overall = enrolled.length === 0 ? 0 : Math.round(enrolled.reduce((a, c) => a + courseProgress(c).percent, 0) / enrolled.length);

  return (
    <DashboardLayout title="My Profile">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-gold-gradient text-lg font-bold text-primary-foreground">{mockUser.initials}</div>
            <div>
              <div className="text-lg font-semibold">{mockUser.name}</div>
              <div className="text-sm text-primary">{mockUser.semester}</div>
              <div className="text-xs text-muted-foreground">{mockUser.department}</div>
            </div>
          </div>
          <div className="mt-5 space-y-2 text-sm">
            <Row label="Roll" value={mockUser.roll} />
            <Row label="Email" value={mockUser.email} icon={Mail} />
            <Row label="Phone" value={mockUser.phone} icon={Phone} />
          </div>
          <button className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md border border-border px-3 py-2 text-xs"><Settings className="h-3.5 w-3.5" /> Settings</button>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">Learning summary</h2>
            <span className="text-xs text-muted-foreground">{totalCompleted()} lessons completed</span>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <Stat label="Enrolled" value={enrolled.length} icon={BookOpen} />
            <Stat label="Overall" value={`${overall}%`} icon={Trophy} />
            <Stat label="Badges" value={mockUser.badges.length} icon={Trophy} />
          </div>
          <div className="mt-6">
            <div className="mb-2 text-xs text-muted-foreground">Overall progress</div>
            <ProgressBar value={overall} />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 lg:col-span-2">
          <h2 className="text-base font-semibold">Enrolled courses</h2>
          <div className="mt-4 space-y-3">
            {enrolled.map((c) => {
              const p = courseProgress(c);
              return (
                <Link key={c.slug} to="/courses/$slug" params={{ slug: c.slug }} className="flex items-center gap-4 rounded-lg border border-border p-4 hover:border-primary/40">
                  <div className="grid h-10 w-10 place-items-center rounded-md bg-secondary font-mono font-bold text-primary">{c.icon}</div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold">{c.title}</div>
                    <div className="mt-1"><ProgressBar value={p.percent} /></div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-xs text-primary">{p.percent}%</div>
                    <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-base font-semibold">Achievements</h2>
          <div className="mt-4 space-y-3">
            {mockUser.badges.map((b) => (
              <div key={b.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-gold-gradient text-primary-foreground"><Trophy className="h-4 w-4" /></div>
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

function Row({ label, value, icon: Icon }: { label: string; value: string; icon?: any }) {
  return (
    <div className="flex items-center justify-between border-b border-border pb-2 last:border-0 last:pb-0">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="inline-flex items-center gap-2">{Icon && <Icon className="h-3.5 w-3.5 text-muted-foreground" />}{value}</span>
    </div>
  );
}

function Stat({ label, value, icon: Icon }: { label: string; value: any; icon: any }) {
  return (
    <div className="rounded-lg border border-border bg-background p-4">
      <Icon className="h-4 w-4 text-primary" />
      <div className="mt-2 text-xl font-semibold">{value}</div>
      <div className="text-[11px] text-muted-foreground">{label}</div>
    </div>
  );
}
