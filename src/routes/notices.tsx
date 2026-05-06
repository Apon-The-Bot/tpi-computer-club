import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { notices } from "@/data/notices";
import { Bell, Search } from "lucide-react";

export const Route = createFileRoute("/notices")({
  head: () => ({
    meta: [
      { title: "Notices — TPI Computer Club" },
      { name: "description", content: "Official notices from the TPI Computer Club — announcements, schedules and important updates." },
      { property: "og:title", content: "Notices — TPI Computer Club" },
      { property: "og:description", content: "Browse the latest official notices from TPI Computer Club." },
    ],
  }),
  component: Notices,
});

function Notices() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<"All" | "Important" | "General" | "Event" | "Class">("All");
  const filtered = notices.filter((n) => (cat === "All" || n.category === cat) && (n.title + n.body).toLowerCase().includes(q.toLowerCase()));
  return (
    <PublicLayout>
      <section className="bg-hero border-b border-border">
        <div className="mx-auto max-w-5xl px-4 py-16 md:px-6">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-primary">Notice Board</div>
          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">Official Notices</h1>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 md:px-6">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search notices…" className="h-10 w-full rounded-md border border-border bg-card pl-9 pr-3 text-sm outline-none focus:border-primary" />
          </div>
          <div className="flex flex-wrap gap-2">
            {(["All", "Important", "General", "Event", "Class"] as const).map((c) => (
              <button key={c} onClick={() => setCat(c)} className={`rounded-full border px-3 py-1 text-xs ${cat === c ? "border-primary text-primary" : "border-border text-muted-foreground"}`}>{c}</button>
            ))}
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-xl border border-border bg-card">
          {filtered.map((n, i) => (
            <details key={n.id} className={`group p-5 ${i > 0 ? "border-t border-border" : ""}`}>
              <summary className="flex cursor-pointer list-none items-start gap-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-secondary text-primary"><Bell className="h-4 w-4" /></span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span className="font-mono">{n.date}</span><span>·</span><span>{n.category}</span>
                    {n.important && <span className="rounded-md bg-primary/15 px-1.5 py-0.5 text-[10px] font-semibold text-primary">IMPORTANT</span>}
                  </div>
                  <div className="mt-1 text-sm font-semibold">{n.title}</div>
                </div>
              </summary>
              <p className="ml-13 mt-3 pl-13 text-sm text-muted-foreground" style={{ paddingLeft: "3.25rem" }}>{n.body}</p>
            </details>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}
