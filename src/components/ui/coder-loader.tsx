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
        <div className="coder-model" aria-hidden="true">
          <div className="coder-desk-leg" />
          <div className="coder-desk" />
          <div className="coder-monitor"><span /></div>
          <div className="coder-chair-back" />
          <div className="coder-chair-seat" />
          <div className="coder-neck" />
          <div className="coder-head"><span /></div>
          <div className="coder-hair" />
          <div className="coder-body" />
          <div className="coder-leg coder-leg-front" />
          <div className="coder-leg coder-leg-back" />
          <div className="coder-arm coder-arm-left" />
          <div className="coder-arm coder-arm-right" />
          <div className="coder-palm coder-palm-left" />
          <div className="coder-palm coder-palm-right" />
          <div className="coder-keyboard" />
        </div>
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
        .coder-frame-slap { transform-origin: 58% 52%; }
        .coder-frame-success { transform-origin: 50% 64%; }
        .coder-model {
          position: absolute;
          inset: 0;
          opacity: 0;
          transform-style: preserve-3d;
          transition: opacity .2s ease;
          z-index: 2;
        }
        .coder-loader-stage[data-phase="typing"] .coder-model { opacity: 1; }
        .coder-loader-stage[data-phase="typing"] .coder-frame-slap,
        .coder-loader-stage[data-phase="typing"] .coder-frame-success { pointer-events: none; }
        .coder-desk {
          position: absolute;
          left: 15%;
          bottom: 27%;
          width: 43%;
          height: 6.5%;
          border-radius: 999px 20px 20px 999px;
          background: linear-gradient(180deg, #ffb84e 0%, #e88416 100%);
          box-shadow: inset 0 -7px 10px rgba(91, 43, 10, .22), 0 12px 20px rgba(0, 0, 0, .18);
          transform: skewX(-8deg);
          z-index: 2;
        }
        .coder-desk-leg {
          position: absolute;
          left: 20%;
          bottom: 0;
          width: 15%;
          height: 28%;
          border-radius: 16px 16px 22px 22px;
          background: linear-gradient(90deg, #f6d88a, #d5a54b);
          box-shadow: inset -10px 0 16px rgba(105, 72, 21, .18);
          z-index: 1;
        }
        .coder-monitor {
          position: absolute;
          left: 15%;
          bottom: 38%;
          width: 21%;
          height: 29%;
          border-radius: 12px;
          background: linear-gradient(135deg, #22304a, #111827);
          border: 5px solid #654631;
          box-shadow: inset 0 0 0 2px rgba(255,255,255,.08), 0 12px 18px rgba(0,0,0,.22);
          transform: rotate(-7deg);
          z-index: 3;
        }
        .coder-monitor::after {
          content: "";
          position: absolute;
          left: 44%;
          bottom: -37%;
          width: 12%;
          height: 36%;
          border-radius: 8px;
          background: #6b472e;
        }
        .coder-monitor span,
        .coder-monitor span::before,
        .coder-monitor span::after {
          content: "";
          position: absolute;
          left: 18%;
          height: 2px;
          border-radius: 999px;
          background: #49dcb1;
          box-shadow: 0 8px 0 #f6b84e, 0 16px 0 #7dd3fc, 0 24px 0 #f87171;
        }
        .coder-monitor span { top: 22%; width: 42%; }
        .coder-monitor span::before { top: 7px; width: 62%; left: 12%; }
        .coder-monitor span::after { top: 15px; width: 35%; left: 26%; }
        .coder-keyboard {
          position: absolute;
          left: 31%;
          bottom: 30%;
          width: 29%;
          height: 5%;
          border-radius: 999px;
          background: linear-gradient(180deg, #d6dbe8, #7d8798);
          box-shadow: inset 0 -5px 7px rgba(15, 23, 42, .3), 0 7px 9px rgba(0,0,0,.18);
          transform: rotate(-1deg) skewX(-18deg);
          z-index: 5;
        }
        .coder-chair-back {
          position: absolute;
          right: 18%;
          bottom: 27%;
          width: 8%;
          height: 36%;
          border-radius: 18px;
          background: linear-gradient(90deg, #f6a12f, #c86816);
          box-shadow: inset -9px 0 14px rgba(104, 48, 7, .22);
          z-index: 1;
        }
        .coder-chair-seat {
          position: absolute;
          right: 23%;
          bottom: 16%;
          width: 31%;
          height: 11%;
          border-radius: 999px;
          background: linear-gradient(180deg, #f7a83f, #b95413);
          box-shadow: 0 11px 15px rgba(0,0,0,.2);
          z-index: 2;
        }
        .coder-neck {
          position: absolute;
          right: 39%;
          bottom: 56%;
          width: 7%;
          height: 10%;
          border-radius: 999px;
          background: linear-gradient(135deg, #f2b783, #c9744b);
          z-index: 5;
        }
        .coder-head {
          position: absolute;
          right: 33%;
          bottom: 61%;
          width: 20%;
          height: 22%;
          border-radius: 44% 52% 48% 48%;
          background: radial-gradient(circle at 76% 42%, #1d1d1d 0 2.5%, transparent 3%), linear-gradient(135deg, #ffc58f, #d98257 72%);
          box-shadow: inset -11px -9px 17px rgba(99, 49, 27, .2), 0 10px 15px rgba(0,0,0,.12);
          z-index: 6;
        }
        .coder-head span {
          position: absolute;
          right: 2%;
          top: 46%;
          width: 9%;
          height: 14%;
          border-radius: 999px;
          background: linear-gradient(135deg, #f0a775, #bd6b48);
        }
        .coder-hair {
          position: absolute;
          right: 36%;
          bottom: 74%;
          width: 22%;
          height: 13%;
          border-radius: 70% 40% 42% 36%;
          background: linear-gradient(135deg, #4b5563, #0f172a 70%);
          box-shadow: inset -9px -5px 13px rgba(255,255,255,.12);
          transform: rotate(-8deg);
          z-index: 7;
        }
        .coder-body {
          position: absolute;
          right: 31%;
          bottom: 32%;
          width: 22%;
          height: 30%;
          border-radius: 32% 34% 42% 42%;
          background: linear-gradient(135deg, #ffbd3d 0%, #f59b22 48%, #c15a12 100%);
          box-shadow: inset -13px -13px 20px rgba(108, 50, 6, .22), inset 10px 10px 18px rgba(255,255,255,.16);
          transform: rotate(-8deg);
          z-index: 4;
        }
        .coder-leg {
          position: absolute;
          height: 9%;
          border-radius: 999px;
          background: linear-gradient(180deg, #1e5169, #153546);
          box-shadow: inset 0 -5px 8px rgba(0,0,0,.22);
          z-index: 3;
        }
        .coder-leg-front { right: 22%; bottom: 24%; width: 30%; transform: rotate(9deg); }
        .coder-leg-back { right: 29%; bottom: 19%; width: 25%; transform: rotate(-5deg); opacity: .9; }
        .coder-arm {
          position: absolute;
          width: 24%;
          height: 8%;
          border-radius: 999px;
          background: linear-gradient(90deg, #f9bb84, #d67b52);
          box-shadow: inset 0 -6px 9px rgba(109, 54, 31, .22), 0 6px 8px rgba(0,0,0,.12);
          z-index: 6;
        }
        .coder-arm-left {
          right: 39%;
          bottom: 43%;
          transform-origin: 90% 50%;
          animation: coder-left-type .18s cubic-bezier(.2,.8,.2,1) infinite alternate;
        }
        .coder-arm-right {
          right: 30%;
          bottom: 39%;
          transform-origin: 82% 50%;
          animation: coder-right-type .18s cubic-bezier(.2,.8,.2,1) infinite alternate-reverse;
        }
        .coder-palm {
          position: absolute;
          width: 9%;
          height: 6%;
          border-radius: 999px;
          background: linear-gradient(135deg, #ffd0a0, #c9754d);
          box-shadow: inset -4px -4px 8px rgba(93, 45, 25, .22);
          z-index: 7;
        }
        .coder-palm-left {
          right: 54%;
          bottom: 36%;
          animation: coder-palm-left .18s cubic-bezier(.2,.8,.2,1) infinite alternate;
        }
        .coder-palm-right {
          right: 43%;
          bottom: 34%;
          animation: coder-palm-right .18s cubic-bezier(.2,.8,.2,1) infinite alternate-reverse;
        }
        .coder-loader-stage[data-phase="typing"] .coder-keyboard::before,
        .coder-loader-stage[data-phase="typing"] .coder-keyboard::after {
          content: "";
          position: absolute;
          top: 34%;
          width: 17%;
          height: 18%;
          border-radius: 999px;
          background: #edf2ff;
          animation: coder-key-press .18s ease infinite alternate;
        }
        .coder-keyboard::before { left: 24%; }
        .coder-keyboard::after { right: 22%; animation-delay: .09s; }
        .coder-loader-stage:not([data-phase="typing"]) .coder-model { opacity: 0; }
        .coder-loader-stage[data-phase="typing"] .coder-frame { opacity: 0 !important; }
        .coder-loader-stage[data-phase="slap"] .coder-frame-slap { animation: coder-slap-hit .48s cubic-bezier(.18,.86,.2,1.18) both; }
        .coder-loader-stage[data-phase="success"] .coder-frame-success { animation: coder-pop .45s cubic-bezier(.34,1.56,.64,1); }
        @keyframes coder-left-type {
          0% { transform: rotate(-6deg) translate3d(0, -5px, 24px); }
          100% { transform: rotate(-18deg) translate3d(-8px, 8px, 24px); }
        }
        @keyframes coder-right-type {
          0% { transform: rotate(-15deg) translate3d(1px, 6px, 26px); }
          100% { transform: rotate(-3deg) translate3d(-8px, -6px, 26px); }
        }
        @keyframes coder-palm-left {
          0% { transform: translate3d(0, -4px, 30px) scale(1); }
          100% { transform: translate3d(-8px, 7px, 30px) scale(.96); }
        }
        @keyframes coder-palm-right {
          0% { transform: translate3d(0, 5px, 30px) scale(.96); }
          100% { transform: translate3d(-8px, -6px, 30px) scale(1); }
        }
        @keyframes coder-key-press {
          0% { transform: translateY(-3px) scaleX(.72); opacity: .25; }
          100% { transform: translateY(2px) scaleX(1.15); opacity: .95; }
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
