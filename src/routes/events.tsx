import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { SectionHeader } from "@/components/SectionHeader";
import { events, type EventCategory } from "@/data/events";
import { MapPin, Calendar } from "lucide-react";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — TPI Computer Club" },
      { name: "description", content: "Workshops, seminars, contests and trainings hosted by TPI Computer Club." },
      { property: "og:title", content: "Events — TPI Computer Club" },
      { property: "og:description", content: "Browse upcoming and past events organised by TPI Computer Club." },
    ],
  }),
  component: Events,
});

const cats: ("All" | EventCategory)[] = ["All", "Collaboration", "Workshop", "Seminar", "Competition", "Training", "Awareness"];

function Events() {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const filtered = events.filter((e) => (tab === "upcoming" ? e.upcoming : !e.upcoming) && (cat === "All" || e.category === cat));
  return (
    <PublicLayout>
      <section className="bg-hero border-b border-border">
        <div className="mx-auto max-w-5xl px-4 py-16 md:px-6">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-primary">Events</div>
          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">Workshops, Contests & Seminars</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">A consistent calendar of technical events designed to challenge and inspire our members.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-md border border-border bg-card p-1">
            {(["upcoming", "past"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`rounded px-3 py-1.5 text-xs font-medium capitalize ${tab === t ? "bg-gold-gradient text-primary-foreground" : "text-muted-foreground"}`}>{t}</button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {cats.map((c) => (
              <button key={c} onClick={() => setCat(c)} className={`rounded-full border px-3 py-1 text-xs ${cat === c ? "border-primary text-primary" : "border-border text-muted-foreground"}`}>{c}</button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((e) => (
            <div key={e.id} className="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow">
              {e.image && (
                <div className="aspect-video overflow-hidden bg-background">
                  <img src={e.image} alt={e.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
              )}
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <span className="rounded-md border border-border px-2 py-0.5 font-mono text-[10px] text-cyber">{e.category}</span>
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground"><Calendar className="h-3 w-3" /> {new Date(e.date).toLocaleDateString()}</span>
                </div>
                <h3 className="mt-3 text-base font-semibold leading-snug">{e.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{e.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" /> {e.location}</span>
                  {e.host && <span className="text-[10px] font-mono text-primary">{e.host}</span>}
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && <div className="col-span-full rounded-xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground">No events to show.</div>}
        </div>
      </section>
    </PublicLayout>
  );
}
