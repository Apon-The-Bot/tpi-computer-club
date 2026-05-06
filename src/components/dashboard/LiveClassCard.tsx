import { Radio, ExternalLink, Clock, User } from "lucide-react";
import type { LiveClass } from "@/data/liveClass";

export function LiveClassCard({ data, compact = false }: { data: LiveClass; compact?: boolean }) {
  const isLive = data.status === "Live";
  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-card p-5 shadow-card-soft">
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-cyber-gradient opacity-20 blur-2xl" />
      <div className="relative">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 text-xs">
            {isLive ? (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[oklch(0.7_0.2_25)] opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[oklch(0.7_0.2_25)]" />
                </span>
                <span className="font-semibold text-foreground">LIVE NOW</span>
              </>
            ) : (
              <>
                <span className="h-2 w-2 rounded-full bg-cyber" />
                <span className="font-semibold">{data.status}</span>
              </>
            )}
          </div>
          <span className="rounded-md border border-border px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
            Today’s Class
          </span>
        </div>
        <h3 className={`mt-2 ${compact ? "text-base" : "text-xl"} font-semibold`}>{data.title}</h3>
        <div className="mt-1 text-sm text-muted-foreground">{data.course}</div>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> {data.instructor}</span>
          <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {data.time}</span>
        </div>
        <a
          href={data.meetingLink}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-md bg-gold-gradient px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
        >
          <Radio className="h-4 w-4" /> Join Now
          <ExternalLink className="h-3.5 w-3.5 opacity-70" />
        </a>
      </div>
    </div>
  );
}
