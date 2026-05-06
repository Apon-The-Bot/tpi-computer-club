import { useEffect, useRef, useState } from "react";
import typingImg from "@/assets/coder-typing.png";
import slapImg from "@/assets/coder-slap.png";
import successImg from "@/assets/coder-success.png";

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
  const successTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  useEffect(() => {
    if (!done) return;
    if (successTimer.current) clearTimeout(successTimer.current);
    setPhase("success");
    successTimer.current = setTimeout(() => onSuccessHoldComplete?.(), successHoldMs);
    return () => {
      if (successTimer.current) clearTimeout(successTimer.current);
    };
  }, [done, successHoldMs, onSuccessHoldComplete]);

  const src = phase === "success" ? successImg : phase === "slap" ? slapImg : typingImg;

  return (
    <div className={`flex flex-col items-center justify-center gap-5 ${className}`}>
      <div
        aria-hidden="true"
        data-phase={phase}
        className="coder-loader-stage relative"
        style={{ width: size, height: size }}
      >
        <div className="coder-glow" />
        <img
          src={typingImg}
          alt=""
          className="coder-frame"
          style={{ opacity: phase === "typing" ? 1 : 0 }}
        />
        <img
          src={slapImg}
          alt=""
          className="coder-frame"
          style={{ opacity: phase === "slap" ? 1 : 0 }}
        />
        <img
          src={successImg}
          alt=""
          className="coder-frame"
          style={{ opacity: phase === "success" ? 1 : 0 }}
        />
      </div>

      <div className="text-center">
        <div className="text-base font-semibold">
          {phase === "success" ? "All set!" : phase === "slap" ? "Hey, work!" : "Compiling…"}
        </div>
        {label && <div className="mt-1 text-xs text-muted-foreground">{label}</div>}
      </div>

      <style>{`
        .coder-loader-stage { position: relative; }
        .coder-glow {
          position: absolute;
          inset: 12%;
          border-radius: 999px;
          background: radial-gradient(circle, color-mix(in oklab, var(--primary) 30%, transparent), transparent 62%);
          filter: blur(18px);
          z-index: 0;
        }
        .coder-frame {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: opacity .25s ease, transform .35s cubic-bezier(.2,.8,.2,1);
          z-index: 1;
        }
        .coder-loader-stage[data-phase="typing"] .coder-frame { animation: coder-bob 1.4s ease-in-out infinite; }
        .coder-loader-stage[data-phase="slap"] .coder-frame[style*="opacity: 1"] { animation: coder-shake .25s ease-in-out 2; }
        .coder-loader-stage[data-phase="success"] .coder-frame[style*="opacity: 1"] { animation: coder-pop .45s cubic-bezier(.34,1.56,.64,1); }

        @keyframes coder-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes coder-shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px) rotate(-1deg); }
          75% { transform: translateX(4px) rotate(1deg); }
        }
        @keyframes coder-pop {
          0% { transform: scale(.85); }
          60% { transform: scale(1.06); }
          100% { transform: scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .coder-frame { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
