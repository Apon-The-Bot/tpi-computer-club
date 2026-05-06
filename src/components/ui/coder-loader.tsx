import { useEffect, useRef, useState } from "react";
import typingImg from "@/assets/coder-typing.png";
import typing2Img from "@/assets/coder-typing-2.png";
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
  const [tick, setTick] = useState(0);
  const successTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Alternate typing frames at ~30fps for smooth hand motion
  useEffect(() => {
    if (phase !== "typing") return;
    const id = setInterval(() => setTick((t) => t + 1), 33);
    return () => clearInterval(id);
  }, [phase]);

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

  const typingA = tick % 2 === 0;

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
          className="coder-frame coder-frame-typing"
          style={{ opacity: phase === "typing" ? (typingA ? 1 : 0) : 0 }}
        />
        <img
          src={typing2Img}
          alt=""
          className="coder-frame coder-frame-typing"
          style={{ opacity: phase === "typing" ? (typingA ? 0 : 1) : 0 }}
        />
        <img
          src={slapImg}
          alt=""
          className="coder-frame coder-frame-slap"
          style={{ opacity: phase === "slap" ? 1 : 0, transitionDuration: "320ms" }}
        />
        <img
          src={successImg}
          alt=""
          className="coder-frame coder-frame-success"
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
          transition: opacity .12s linear;
          z-index: 1;
          will-change: opacity, transform;
          backface-visibility: hidden;
        }
        .coder-loader-stage[data-phase="typing"] .coder-frame-typing {
          animation: coder-bob 1.6s ease-in-out infinite;
        }
        .coder-loader-stage[data-phase="slap"] .coder-frame-slap {
          animation: coder-slap-hit .82s cubic-bezier(.18,.86,.2,1.18) both;
          transform-origin: 60% 55%;
        }
        .coder-loader-stage[data-phase="success"] .coder-frame-success {
          animation: coder-pop .45s cubic-bezier(.34,1.56,.64,1);
          transform-origin: 50% 64%;
        }
        @keyframes coder-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes coder-slap-hit {
          0% { transform: translateX(0) translateY(0) rotate(0deg) scale(1); }
          12% { transform: translateX(-4px) translateY(-6px) rotate(-3deg) scale(1.03); }
          26% { transform: translateX(14px) translateY(6px) rotate(5deg) scale(1.05); }
          44% { transform: translateX(-16px) translateY(-2px) rotate(-5deg) scale(.98); }
          60% { transform: translateX(10px) translateY(3px) rotate(3deg) scale(1.02); }
          76% { transform: translateX(-6px) translateY(-1px) rotate(-2deg) scale(1.01); }
          100% { transform: translateX(0) translateY(0) rotate(0deg) scale(1); }
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
