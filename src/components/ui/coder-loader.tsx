import { useEffect, useRef, useState } from "react";
import typingImg from "@/assets/coder-typing.png";
import slapImg from "@/assets/coder-slap.png";
import successImg from "@/assets/coder-success.png";

/**
 * CoderLoader (3D illustrations)
 *
 * Behavior:
 *  - Starts in "typing". After `cycleMs` (default 1500ms) of still loading,
 *    flips to "slap" for `slapMs` (default 500ms), then back to "typing".
 *    Repeats until `done` becomes true.
 *  - When `done` becomes true, switches to "success" and stays there for
 *    AT LEAST `successHoldMs` (default 1200ms) so the user always sees the
 *    smile + thumbs-up. The parent should call `onSuccessHoldComplete`
 *    before actually unmounting the overlay.
 */
export function CoderLoader({
  done = false,
  cycleMs = 1500,
  slapMs = 550,
  successHoldMs = 1200,
  label,
  className = "",
  size = 280,
  onSuccessHoldComplete,
}: {
  done?: boolean;
  cycleMs?: number;
  slapMs?: number;
  successHoldMs?: number;
  label?: string;
  className?: string;
  size?: number;
  onSuccessHoldComplete?: () => void;
}) {
  const [phase, setPhase] = useState<"typing" | "slap" | "success">("typing");
  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  // Cycling typing <-> slap while loading
  useEffect(() => {
    if (done) return;
    setPhase("typing");
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    const loop = () => {
      timer = setTimeout(() => {
        if (cancelled) return;
        setPhase("slap");
        timer = setTimeout(() => {
          if (cancelled) return;
          setPhase("typing");
          loop();
        }, slapMs);
      }, cycleMs);
    };
    loop();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [done, cycleMs, slapMs]);

  // When done flips true: show success and hold
  useEffect(() => {
    if (!done) return;
    setPhase("success");
    const t = setTimeout(() => onSuccessHoldComplete?.(), successHoldMs);
    return () => clearTimeout(t);
  }, [done, successHoldMs, onSuccessHoldComplete]);

  const src = phase === "success" ? successImg : phase === "slap" ? slapImg : typingImg;

  return (
    <div className={`flex flex-col items-center justify-center gap-5 ${className}`}>
      <div style={{ width: size, height: size }} className="relative">
        {/* glow */}
        <div className="absolute inset-6 rounded-full bg-primary/15 blur-3xl" />
        <img
          key={phase}
          src={src}
          alt=""
          width={768}
          height={768}
          className={`relative h-full w-full object-contain drop-shadow-2xl ${
            phase === "typing" ? "coder-bob" : phase === "slap" ? "coder-shake" : "coder-pop"
          }`}
        />
      </div>

      <div className="text-center">
        <div className="text-base font-semibold">
          {phase === "success" ? "All set!" : phase === "slap" ? "Hey, work!" : "Compiling…"}
        </div>
        {label && <div className="mt-1 text-xs text-muted-foreground">{label}</div>}
      </div>

      <style>{`
        .coder-bob   { animation: coder-bob   1.1s ease-in-out infinite; transform-origin: center bottom; }
        .coder-shake { animation: coder-shake 0.45s ease-out 1; }
        .coder-pop   { animation: coder-pop   0.55s cubic-bezier(.34,1.56,.64,1) 1; }
        @keyframes coder-bob   { 0%,100% { transform: translateY(0) rotate(0); } 50% { transform: translateY(-4px) rotate(-1deg); } }
        @keyframes coder-shake { 0% { transform: translateX(20px) rotate(4deg); } 30% { transform: translateX(-6px) rotate(-3deg); } 60% { transform: translateX(4px) rotate(2deg); } 100% { transform: translateX(0) rotate(0); } }
        @keyframes coder-pop   { 0% { transform: scale(0.6); opacity: 0; } 60% { transform: scale(1.08); opacity: 1; } 100% { transform: scale(1); } }
        @media (prefers-reduced-motion: reduce) {
          .coder-bob, .coder-shake, .coder-pop { animation: none; }
        }
      `}</style>
    </div>
  );
}

/** Full-screen centered overlay variant. */
export function CoderLoaderOverlay({
  done,
  label,
  onSuccessHoldComplete,
}: {
  done?: boolean;
  label?: string;
  onSuccessHoldComplete?: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-background/90 backdrop-blur-md">
      <CoderLoader done={done} label={label} size={320} onSuccessHoldComplete={onSuccessHoldComplete} />
    </div>
  );
}
