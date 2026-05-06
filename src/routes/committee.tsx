import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { SectionHeader } from "@/components/SectionHeader";
import { team } from "@/data/team";
import { Mail, Linkedin, Github } from "lucide-react";

export const Route = createFileRoute("/committee")({
  head: () => ({
    meta: [
      { title: "Committee — TPI Computer Club" },
      { name: "description", content: "Meet the executive committee, advisors and volunteers of TPI Computer Club." },
      { property: "og:title", content: "Committee — TPI Computer Club" },
      { property: "og:description", content: "The leadership team behind TPI Computer Club." },
    ],
  }),
  component: Committee,
});

function Committee() {
  const advisor = team.find((t) => t.role.includes("Advisor"));
  const exec = team.filter((t) => !t.role.includes("Advisor"));
  return (
    <PublicLayout>
      <section className="bg-hero border-b border-border">
        <div className="mx-auto max-w-5xl px-4 py-16 md:px-6">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-primary">Leadership</div>
          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">Committee 2026</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">The dedicated mentors and student leaders driving the club forward.</p>
        </div>
      </section>

      {advisor && (
        <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
          <SectionHeader eyebrow="Advisor" title="Chief Mentor" />
          <div className="mt-6 max-w-md rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-4">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-cyber-gradient text-lg font-bold text-cyber-foreground">{advisor.initials}</div>
              <div>
                <div className="text-lg font-semibold">{advisor.name}</div>
                <div className="text-sm text-primary">{advisor.role}</div>
                <div className="text-xs text-muted-foreground">{advisor.department}</div>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">{advisor.bio}</p>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <SectionHeader eyebrow="Executive Committee" title="Student Leaders & Volunteers" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {exec.map((m) => (
            <div key={m.id} className="group rounded-xl border border-border bg-card p-5 text-center transition-all hover:-translate-y-1 hover:border-primary/40">
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gold-gradient text-xl font-bold text-primary-foreground">{m.initials}</div>
              <div className="mt-3 text-sm font-semibold">{m.name}</div>
              <div className="text-xs text-primary">{m.role}</div>
              <div className="mt-1 text-[11px] text-muted-foreground">{m.department}</div>
              <p className="mt-3 line-clamp-3 text-xs text-muted-foreground">{m.bio}</p>
              <div className="mt-4 flex justify-center gap-2 text-muted-foreground">
                <a href="#" className="rounded-md border border-border p-1.5 hover:text-primary"><Mail className="h-3.5 w-3.5" /></a>
                <a href="#" className="rounded-md border border-border p-1.5 hover:text-primary"><Linkedin className="h-3.5 w-3.5" /></a>
                <a href="#" className="rounded-md border border-border p-1.5 hover:text-primary"><Github className="h-3.5 w-3.5" /></a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}
