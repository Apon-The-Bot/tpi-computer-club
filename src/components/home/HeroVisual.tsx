import { Radio, Terminal, ShieldCheck, Code2 } from "lucide-react";
import { ProgressBar } from "@/components/ui/progress-bar";

export function HeroVisual() {
  return (
    <div className="relative h-[460px] w-full">
      {/* Glow */}
      <div className="absolute -inset-10 -z-10 bg-[radial-gradient(ellipse_at_center,oklch(0.78_0.16_75/0.18),transparent_60%)]" />

      {/* Code editor card */}
      <div className="absolute left-0 top-0 w-[78%] rotate-[-2deg] rounded-xl border border-border bg-card shadow-card-soft">
        <div className="flex items-center justify-between border-b border-border px-3 py-2">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.7_0.18_25)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.78_0.16_85)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.7_0.16_150)]" />
          </div>
          <div className="font-mono text-[10px] text-muted-foreground">main.c — TPI</div>
          <Code2 className="h-3.5 w-3.5 text-muted-foreground" />
        </div>
        <pre className="overflow-hidden p-4 font-mono text-[12px] leading-6 text-muted-foreground">
{`#include <stdio.h>
int main(void) {
  printf("Think. Create. `}<span className="text-primary">Innovate.</span>{`\\n");
  return `}<span className="text-cyber">0</span>{`;
}`}
        </pre>
      </div>

      {/* Live class card */}
      <div className="absolute right-0 top-8 w-[58%] rotate-[3deg] rounded-xl border border-border bg-card p-4 shadow-card-soft">
        <div className="flex items-center gap-2 text-xs">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[oklch(0.7_0.2_25)] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[oklch(0.7_0.2_25)]" />
          </span>
          <span className="font-semibold text-foreground">LIVE NOW</span>
          <span className="text-muted-foreground">· 8:00 PM</span>
        </div>
        <div className="mt-2 text-sm font-semibold">Pointers in C</div>
        <div className="text-xs text-muted-foreground">by Md. Rakibul Islam · C Programming</div>
        <button className="mt-3 inline-flex items-center gap-2 rounded-md bg-cyber-gradient px-3 py-1.5 text-xs font-semibold text-cyber-foreground">
          <Radio className="h-3.5 w-3.5" /> Join Now
        </button>
      </div>

      {/* Course progress card */}
      <div className="absolute bottom-10 left-6 w-[62%] rotate-[1deg] rounded-xl border border-border bg-card p-4 shadow-card-soft">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-muted-foreground">Continue learning</div>
            <div className="text-sm font-semibold">C++ Programming</div>
          </div>
          <span className="rounded-md border border-border px-2 py-0.5 font-mono text-[10px] text-primary">68%</span>
        </div>
        <ProgressBar value={68} className="mt-3" />
        <div className="mt-2 text-[11px] text-muted-foreground font-mono">module 3 · classes & objects</div>
      </div>

      {/* Cyber badge */}
      <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 shadow-card-soft">
        <ShieldCheck className="h-5 w-5 text-cyber" />
        <div>
          <div className="text-[11px] font-semibold">Cyber Security</div>
          <div className="text-[10px] text-muted-foreground">OWASP Top 10</div>
        </div>
      </div>

      {/* Terminal mini */}
      <div className="absolute right-[34%] top-[44%] hidden w-44 rotate-[-4deg] rounded-lg border border-border bg-[oklch(0.13_0.04_260)] p-2 font-mono text-[10px] shadow-card-soft md:block">
        <div className="flex items-center gap-1 text-muted-foreground">
          <Terminal className="h-3 w-3" /> tpi@club:~$
        </div>
        <div className="mt-1 text-cyber">$ build skills --mode=pro</div>
        <div className="text-primary">ready to innovate</div>
      </div>
    </div>
  );
}
