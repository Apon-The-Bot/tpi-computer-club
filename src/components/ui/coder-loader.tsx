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
          style={{ opacity: phase === "typing" ? 1 : 0 }}
        />
        <div className="coder-keyboard" />
        <div className="coder-hand coder-hand-left" />
        <div className="coder-hand coder-hand-right" />
        <div className="coder-keys coder-keys-left" />
        <div className="coder-keys coder-keys-right" />
        <img
          src={slapImg}
          alt=""
          className="coder-frame coder-frame-slap"
          style={{ opacity: phase === "slap" ? 1 : 0 }}
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
        .coder-loader-stage { position: relative; perspective: 900px; }
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
        .coder-frame-typing { transform: translateZ(0); }
        .coder-frame-slap { transform-origin: 58% 52%; }
        .coder-frame-success { transform-origin: 50% 64%; }
        .coder-keyboard {
          position: absolute;
          left: 30%;
          right: 22%;
          bottom: 18%;
          height: 13%;
          border-radius: 12px 12px 18px 18px;
          background:
            linear-gradient(180deg, color-mix(in oklab, var(--foreground) 18%, transparent), transparent 58%),
            linear-gradient(135deg, color-mix(in oklab, var(--primary) 62%, var(--background)), color-mix(in oklab, var(--foreground) 22%, var(--background)));
          box-shadow: 0 16px 26px color-mix(in oklab, var(--foreground) 22%, transparent);
          opacity: 0;
          transform: rotateX(60deg) rotateZ(-3deg);
          transform-origin: center bottom;
          transition: opacity .18s ease;
          z-index: 2;
        }
        .coder-hand {
          position: absolute;
          width: 21%;
          height: 12%;
          border-radius: 999px 999px 58% 58%;
          background:
            radial-gradient(circle at 72% 32%, color-mix(in oklab, var(--background) 72%, transparent) 0 9%, transparent 10%),
            linear-gradient(145deg, #f5c49d 0%, #d98a64 48%, #8f543d 100%);
          box-shadow:
            inset 9px 9px 12px color-mix(in oklab, var(--background) 30%, transparent),
            inset -8px -8px 14px color-mix(in oklab, var(--foreground) 24%, transparent),
            0 10px 16px color-mix(in oklab, var(--foreground) 18%, transparent);
          opacity: 0;
          transition: opacity .18s ease;
          z-index: 4;
        }
        .coder-hand-left {
          left: 31%;
          bottom: 26%;
          transform-origin: 14% 48%;
          transform: rotate(-13deg) translate3d(0, 0, 28px);
        }
        .coder-hand-right {
          right: 29%;
          bottom: 25%;
          transform-origin: 86% 48%;
          transform: rotate(13deg) translate3d(0, 0, 28px) scaleX(-1);
        }
        .coder-keys {
          position: absolute;
          width: 5%;
          height: 2%;
          bottom: 24%;
          border-radius: 999px;
          background: color-mix(in oklab, var(--primary) 76%, var(--primary-foreground));
          filter: blur(.2px);
          opacity: 0;
          z-index: 3;
        }
        .coder-keys-left { left: 40%; }
        .coder-keys-right { right: 36%; }
        .coder-loader-stage[data-phase="typing"] .coder-keyboard,
        .coder-loader-stage[data-phase="typing"] .coder-hand,
        .coder-loader-stage[data-phase="typing"] .coder-keys { opacity: 1; }
        .coder-loader-stage[data-phase="typing"] .coder-hand-left { animation: coder-left-type .22s cubic-bezier(.2,.8,.2,1) infinite alternate; }
        .coder-loader-stage[data-phase="typing"] .coder-hand-right { animation: coder-right-type .22s cubic-bezier(.2,.8,.2,1) infinite alternate-reverse; }
        .coder-loader-stage[data-phase="typing"] .coder-keys-left { animation: coder-key-press .22s ease infinite alternate; }
        .coder-loader-stage[data-phase="typing"] .coder-keys-right { animation: coder-key-press .22s ease infinite alternate-reverse; }
        .coder-loader-stage[data-phase="slap"] .coder-frame-slap { animation: coder-slap-hit .48s cubic-bezier(.18,.86,.2,1.18) both; }
        .coder-loader-stage[data-phase="success"] .coder-frame-success { animation: coder-pop .45s cubic-bezier(.34,1.56,.64,1); }

        @keyframes coder-left-type {
          0% { transform: rotate(-18deg) translate3d(-2%, -7%, 30px); }
          100% { transform: rotate(-5deg) translate3d(8%, 9%, 30px); }
        }
        @keyframes coder-right-type {
          0% { transform: rotate(18deg) translate3d(2%, -7%, 30px) scaleX(-1); }
          100% { transform: rotate(5deg) translate3d(-8%, 9%, 30px) scaleX(-1); }
        }
        @keyframes coder-key-press {
          0% { transform: translateY(-5px) scaleX(.75); opacity: .22; }
          100% { transform: translateY(3px) scaleX(1.3); opacity: 1; }
        }
        @keyframes coder-slap-hit {
          0% { transform: translateX(0) rotate(0deg) scale(1); }
          28% { transform: translateX(10px) rotate(2deg) scale(1.02); }
          50% { transform: translateX(-12px) rotate(-4deg) scale(.99); }
          72% { transform: translateX(7px) rotate(2deg) scale(1.01); }
          100% { transform: translateX(0) rotate(0deg) scale(1); }
        }
        @keyframes coder-pop {
          0% { transform: scale(.85); }
          60% { transform: scale(1.06); }
          100% { transform: scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .coder-frame, .coder-hand, .coder-keys { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
