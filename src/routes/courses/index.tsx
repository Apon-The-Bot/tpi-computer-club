import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { CourseCard } from "@/components/courses/CourseCard";
import { courses } from "@/data/courses";
import { Search } from "lucide-react";

export const Route = createFileRoute("/courses/")({
  head: () => ({ meta: [{ title: "Courses — Learning Space" }] }),
  component: CoursesPage,
});

function CoursesPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<"All" | string>("All");
  const [level, setLevel] = useState<"All" | string>("All");
  const cats = ["All", ...Array.from(new Set(courses.map((c) => c.category)))];
  const levels = ["All", "Beginner", "Intermediate", "Advanced"];
  const filtered = courses.filter((c) =>
    (cat === "All" || c.category === cat) &&
    (level === "All" || c.level === level) &&
    (c.title + c.shortDescription).toLowerCase().includes(q.toLowerCase())
  );
  return (
    <DashboardLayout title="Courses">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search courses…" className="h-10 w-full rounded-md border border-border bg-card pl-9 pr-3 text-sm outline-none focus:border-primary" />
        </div>
        <Select value={cat} onChange={setCat} options={cats} />
        <Select value={level} onChange={setLevel} options={levels} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => <CourseCard key={c.slug} course={c} />)}
        {filtered.length === 0 && <div className="col-span-full rounded-xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground">No matching courses.</div>}
      </div>
    </DashboardLayout>
  );
}

function Select({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className="h-10 rounded-md border border-border bg-card px-3 text-sm outline-none focus:border-primary">
      {options.map((o) => <option key={o}>{o}</option>)}
    </select>
  );
}
