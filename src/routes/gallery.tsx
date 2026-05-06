import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { gallery, type GalleryItem } from "@/data/gallery";
import { X } from "lucide-react";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — TPI Computer Club" },
      { name: "description", content: "Photos from workshops, events, lab activities and meetings of TPI Computer Club." },
      { property: "og:title", content: "Gallery — TPI Computer Club" },
      { property: "og:description", content: "A look inside the activities of TPI Computer Club." },
    ],
  }),
  component: Gallery,
});

const cats: ("All" | GalleryItem["category"])[] = ["All", "Workshops", "Events", "Lab Activities", "Training", "Meetings"];

function Gallery() {
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const [open, setOpen] = useState<GalleryItem | null>(null);
  const items = gallery.filter((g) => cat === "All" || g.category === cat);
  return (
    <PublicLayout>
      <section className="bg-hero border-b border-border">
        <div className="mx-auto max-w-5xl px-4 py-16 md:px-6">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-primary">Gallery</div>
          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">Moments from the Club</h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="flex flex-wrap gap-2">
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`rounded-full border px-3 py-1 text-xs ${cat === c ? "border-primary text-primary" : "border-border text-muted-foreground"}`}>{c}</button>
          ))}
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {items.map((g) => (
            <button
              key={g.id}
              onClick={() => setOpen(g)}
              className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-border"
              style={{ background: `linear-gradient(135deg, oklch(0.4 0.12 ${g.hue}), oklch(0.22 0.06 ${(g.hue + 60) % 360}))` }}
            >
              <div className="absolute inset-0 bg-grid opacity-30" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-left text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                <div className="font-semibold">{g.title}</div>
                <div className="text-[10px] text-white/70">{g.category}</div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6" onClick={() => setOpen(null)}>
          <button className="absolute right-6 top-6 text-white" onClick={() => setOpen(null)}><X /></button>
          <div className="aspect-video w-full max-w-4xl rounded-xl border border-border" style={{ background: `linear-gradient(135deg, oklch(0.5 0.15 ${open.hue}), oklch(0.25 0.08 ${(open.hue + 60) % 360}))` }} />
        </div>
      )}
    </PublicLayout>
  );
}
