import { useEffect, useRef, useState } from "react";

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
        <div className="coder-desk" />

        <div className="coder-monitor">
          <div className="coder-screen">
            <span className="code-line line-one" />
            <span className="code-line line-two" />
            <span className="code-line line-three" />
            <span className="code-cursor" />
          </div>
          <div className="hit-burst"><i /><i /><i /><i /></div>
        </div>

        <div className="coder-keyboard">
          {Array.from({ length: 8 }).map((_, index) => (
            <span key={index} />
          ))}
        </div>

        <div className="chibi-coder">
          <div className="coder-shadow" />
          <div className="coder-body" />
          <div className="coder-neck" />
          <div className="coder-head">
            <div className="coder-hair hair-back" />
            <div className="coder-hair hair-front" />
            <div className="coder-ear" />
            <div className="coder-face">
              <span className="eye eye-left" />
              <span className="eye eye-right" />
              <span className="cheek cheek-left" />
              <span className="cheek cheek-right" />
              <span className="mouth" />
            </div>
          </div>
          <div className="arm arm-left"><span /></div>
          <div className="arm arm-right"><span /></div>
          <div className="thumbs-up"><span /></div>
        </div>
        <div className="success-sparkles"><i /><i /><i /></div>
      </div>

      <div className="text-center">
        <div className="text-base font-semibold">
          {phase === "success" ? "All set!" : phase === "slap" ? "Hey, work!" : "Compiling…"}
        </div>
        {label && <div className="mt-1 text-xs text-muted-foreground">{label}</div>}
      </div>

      <style>{`
        .coder-loader-stage {
          --skin: oklch(88% 0.09 68);
          --skin-shadow: oklch(74% 0.12 61);
          --hair: oklch(24% 0.05 35);
          --shirt: var(--primary);
          --shirt-dark: color-mix(in oklab, var(--primary) 72%, black);
          --screen: color-mix(in oklab, var(--background) 75%, var(--primary) 25%);
          --screen-code: color-mix(in oklab, var(--primary) 60%, white);
          perspective: 820px;
          transform-style: preserve-3d;
        }
        .coder-glow {
          position: absolute;
          inset: 12%;
          border-radius: 999px;
          background: radial-gradient(circle, color-mix(in oklab, var(--primary) 30%, transparent), transparent 62%);
          filter: blur(18px);
        }
        .coder-desk {
          position: absolute;
          left: 10%;
          right: 8%;
          bottom: 12%;
          height: 13%;
          border-radius: 999px 999px 24px 24px;
          background: linear-gradient(180deg, color-mix(in oklab, var(--muted) 78%, white), color-mix(in oklab, var(--muted) 88%, black));
          box-shadow: 0 18px 26px color-mix(in oklab, var(--foreground) 18%, transparent);
          transform: rotateX(62deg) translateZ(-18px);
        }
        .coder-monitor {
          position: absolute;
          width: 36%;
          height: 31%;
          right: 9%;
          top: 25%;
          transform-origin: 50% 80%;
        }
        .coder-monitor::before {
          content: "";
          position: absolute;
          left: 42%;
          bottom: -21%;
          width: 17%;
          height: 23%;
          border-radius: 8px;
          background: linear-gradient(180deg, color-mix(in oklab, var(--muted) 88%, white), color-mix(in oklab, var(--muted) 82%, black));
        }
        .coder-monitor::after {
          content: "";
          position: absolute;
          left: 26%;
          right: 25%;
          bottom: -25%;
          height: 9%;
          border-radius: 999px;
          background: color-mix(in oklab, var(--muted) 80%, black);
        }
        .coder-screen {
          position: absolute;
          inset: 0;
          overflow: hidden;
          border: max(4px, .04em) solid color-mix(in oklab, var(--muted) 76%, black);
          border-radius: 11% 11% 9% 9%;
          background: linear-gradient(145deg, var(--screen), color-mix(in oklab, var(--screen) 68%, black));
          box-shadow: inset 0 0 18px color-mix(in oklab, var(--primary) 18%, transparent), 0 12px 24px color-mix(in oklab, var(--foreground) 16%, transparent);
        }
        .coder-screen::before {
          content: "";
          position: absolute;
          inset: 8% 10% auto;
          height: 8%;
          border-radius: 999px;
          background: color-mix(in oklab, var(--primary) 22%, transparent);
        }
        .code-line {
          position: absolute;
          left: 15%;
          height: 6%;
          border-radius: 999px;
          background: var(--screen-code);
          box-shadow: 0 0 10px color-mix(in oklab, var(--primary) 42%, transparent);
          transform-origin: left center;
        }
        .line-one { top: 34%; width: 54%; animation: code-type 1.5s steps(6) infinite; }
        .line-two { top: 49%; width: 68%; animation: code-type 1.5s .18s steps(7) infinite; }
        .line-three { top: 64%; width: 44%; animation: code-type 1.5s .36s steps(5) infinite; }
        .code-cursor {
          position: absolute;
          left: 64%;
          top: 62%;
          width: 4%;
          height: 12%;
          border-radius: 999px;
          background: color-mix(in oklab, var(--primary) 45%, white);
          animation: cursor-blink .42s steps(2) infinite;
        }
        .coder-keyboard {
          position: absolute;
          left: 36%;
          bottom: 20%;
          width: 37%;
          height: 9%;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 5%;
          padding: 2.2%;
          border-radius: 18% 18% 30% 30%;
          background: linear-gradient(180deg, color-mix(in oklab, var(--muted) 88%, white), color-mix(in oklab, var(--muted) 84%, black));
          transform: rotateX(58deg) rotateZ(-3deg);
          box-shadow: 0 7px 14px color-mix(in oklab, var(--foreground) 14%, transparent);
        }
        .coder-keyboard span {
          border-radius: 4px;
          background: color-mix(in oklab, var(--background) 65%, var(--primary) 35%);
          animation: key-flash .3s infinite alternate;
        }
        .coder-keyboard span:nth-child(2n) { animation-delay: .12s; }
        .coder-keyboard span:nth-child(3n) { animation-delay: .2s; }
        .chibi-coder {
          position: absolute;
          left: 15%;
          top: 18%;
          width: 50%;
          height: 70%;
          transform-style: preserve-3d;
          transition: transform .38s cubic-bezier(.2,.8,.2,1), left .38s cubic-bezier(.2,.8,.2,1), top .38s cubic-bezier(.2,.8,.2,1);
        }
        .coder-shadow {
          position: absolute;
          left: 25%;
          bottom: 6%;
          width: 58%;
          height: 9%;
          border-radius: 999px;
          background: color-mix(in oklab, var(--foreground) 14%, transparent);
          filter: blur(6px);
        }
        .coder-body {
          position: absolute;
          left: 31%;
          top: 48%;
          width: 36%;
          height: 32%;
          border-radius: 40% 42% 28% 28%;
          background: linear-gradient(145deg, color-mix(in oklab, var(--shirt) 78%, white), var(--shirt-dark));
          box-shadow: inset -10px -10px 18px color-mix(in oklab, black 16%, transparent), 0 12px 18px color-mix(in oklab, var(--foreground) 13%, transparent);
        }
        .coder-neck {
          position: absolute;
          left: 44%;
          top: 42%;
          width: 13%;
          height: 13%;
          border-radius: 999px;
          background: linear-gradient(90deg, var(--skin), var(--skin-shadow));
        }
        .coder-head {
          position: absolute;
          left: 24%;
          top: 12%;
          width: 42%;
          height: 40%;
          border-radius: 48% 52% 45% 48%;
          background: radial-gradient(circle at 68% 30%, color-mix(in oklab, var(--skin) 92%, white), var(--skin) 40%, var(--skin-shadow) 96%);
          box-shadow: inset -10px -8px 16px color-mix(in oklab, var(--skin-shadow) 42%, transparent), 0 10px 18px color-mix(in oklab, var(--foreground) 12%, transparent);
          transform: rotateY(-18deg);
          transform-origin: 65% 65%;
          transition: all .4s cubic-bezier(.2,.8,.2,1);
        }
        .coder-ear {
          position: absolute;
          right: -5%;
          top: 43%;
          width: 15%;
          height: 19%;
          border-radius: 50%;
          background: var(--skin-shadow);
          box-shadow: inset -2px -1px 0 color-mix(in oklab, var(--skin-shadow) 75%, black);
        }
        .coder-hair {
          position: absolute;
          background: var(--hair);
          z-index: 2;
        }
        .hair-back {
          inset: -8% 8% 58% -3%;
          border-radius: 60% 48% 42% 42%;
          box-shadow: 8px 7px 0 color-mix(in oklab, var(--hair) 78%, black);
        }
        .hair-front {
          left: 10%;
          top: -4%;
          width: 64%;
          height: 30%;
          border-radius: 56% 42% 62% 28%;
          transform: rotate(-7deg);
        }
        .coder-face {
          position: absolute;
          inset: 0;
          z-index: 3;
          transition: transform .38s cubic-bezier(.2,.8,.2,1);
        }
        .eye {
          position: absolute;
          top: 48%;
          width: 7%;
          height: 10%;
          border-radius: 999px;
          background: color-mix(in oklab, var(--foreground) 86%, black);
          box-shadow: 0 0 0 2px color-mix(in oklab, white 45%, transparent);
        }
        .eye-left { left: 55%; }
        .eye-right { left: 74%; opacity: .25; transform: scaleX(.55); }
        .cheek {
          position: absolute;
          top: 60%;
          width: 11%;
          height: 5%;
          border-radius: 999px;
          background: oklch(78% 0.12 28 / .5);
          opacity: .75;
        }
        .cheek-left { left: 50%; }
        .cheek-right { left: 74%; opacity: 0; }
        .mouth {
          position: absolute;
          left: 66%;
          top: 65%;
          width: 12%;
          height: 6%;
          border-bottom: 3px solid color-mix(in oklab, var(--foreground) 72%, black);
          border-radius: 0 0 999px 999px;
        }
        .arm {
          position: absolute;
          width: 31%;
          height: 10%;
          border-radius: 999px;
          background: linear-gradient(90deg, var(--shirt-dark), var(--skin));
          transform-origin: 10% 50%;
          z-index: 4;
          box-shadow: inset -3px -3px 6px color-mix(in oklab, black 13%, transparent);
        }
        .arm span, .thumbs-up span {
          position: absolute;
          right: -8%;
          top: -16%;
          width: 25%;
          height: 130%;
          border-radius: 999px;
          background: radial-gradient(circle at 35% 25%, color-mix(in oklab, var(--skin) 90%, white), var(--skin-shadow));
          box-shadow: inset -2px -3px 4px color-mix(in oklab, var(--skin-shadow) 35%, transparent);
        }
        .arm-left {
          left: 41%;
          top: 57%;
          transform: rotate(28deg);
          animation: type-left .22s ease-in-out infinite alternate;
        }
        .arm-right {
          left: 45%;
          top: 64%;
          transform: rotate(18deg);
          animation: type-right .18s ease-in-out infinite alternate;
        }
        .thumbs-up {
          position: absolute;
          left: 69%;
          top: 41%;
          width: 26%;
          height: 13%;
          border-radius: 999px;
          background: linear-gradient(90deg, var(--shirt-dark), var(--skin));
          transform: rotate(-72deg) scale(.2);
          transform-origin: 10% 50%;
          opacity: 0;
          z-index: 7;
          transition: all .36s cubic-bezier(.34,1.56,.64,1);
        }
        .thumbs-up::after {
          content: "";
          position: absolute;
          right: -8%;
          top: -76%;
          width: 12%;
          height: 88%;
          border-radius: 999px;
          background: var(--skin);
          transform: rotate(28deg);
        }
        .hit-burst, .success-sparkles { opacity: 0; pointer-events: none; }
        .hit-burst {
          position: absolute;
          left: -10%;
          top: 25%;
          width: 44%;
          height: 44%;
          z-index: 8;
        }
        .hit-burst i, .success-sparkles i {
          position: absolute;
          width: 24%;
          height: 8%;
          border-radius: 999px;
          background: color-mix(in oklab, var(--primary) 55%, white);
          box-shadow: 0 0 10px color-mix(in oklab, var(--primary) 50%, transparent);
        }
        .hit-burst i:nth-child(1) { left: 40%; top: 0; transform: rotate(88deg); }
        .hit-burst i:nth-child(2) { right: 0; top: 42%; transform: rotate(0deg); }
        .hit-burst i:nth-child(3) { left: 12%; bottom: 0; transform: rotate(-45deg); }
        .hit-burst i:nth-child(4) { left: 0; top: 30%; transform: rotate(25deg); }
        .success-sparkles {
          position: absolute;
          inset: 12% 5% auto auto;
          width: 38%;
          height: 34%;
          z-index: 12;
        }
        .success-sparkles i { animation: sparkle .85s ease-in-out infinite alternate; }
        .success-sparkles i:nth-child(1) { left: 18%; top: 20%; transform: rotate(45deg); }
        .success-sparkles i:nth-child(2) { right: 10%; top: 42%; transform: rotate(-20deg); animation-delay: .16s; }
        .success-sparkles i:nth-child(3) { left: 45%; bottom: 8%; transform: rotate(82deg); animation-delay: .28s; }

        .coder-loader-stage[data-phase="slap"] .arm-left,
        .coder-loader-stage[data-phase="slap"] .arm-right {
          animation: slap-hand ${slapMs}ms cubic-bezier(.24,.86,.36,1) 1 both;
        }
        .coder-loader-stage[data-phase="slap"] .coder-monitor {
          animation: monitor-thappor ${slapMs}ms ease-out 1;
        }
        .coder-loader-stage[data-phase="slap"] .hit-burst {
          animation: burst-pop ${slapMs}ms ease-out 1;
        }
        .coder-loader-stage[data-phase="slap"] .code-line,
        .coder-loader-stage[data-phase="slap"] .code-cursor,
        .coder-loader-stage[data-phase="success"] .code-line,
        .coder-loader-stage[data-phase="success"] .code-cursor,
        .coder-loader-stage[data-phase="success"] .coder-keyboard span {
          animation: none;
        }
        .coder-loader-stage[data-phase="success"] .chibi-coder {
          left: 24%;
          top: 14%;
          transform: translateZ(18px) scale(1.05);
        }
        .coder-loader-stage[data-phase="success"] .coder-head {
          left: 24%;
          width: 48%;
          transform: rotateY(0deg) scale(1.04);
          border-radius: 50% 50% 46% 46%;
        }
        .coder-loader-stage[data-phase="success"] .coder-monitor {
          transform: translateX(23%) scale(.82);
          opacity: .5;
        }
        .coder-loader-stage[data-phase="success"] .coder-face { transform: translateX(-6%); }
        .coder-loader-stage[data-phase="success"] .eye-left { left: 32%; width: 8%; height: 11%; }
        .coder-loader-stage[data-phase="success"] .eye-right { left: 62%; opacity: 1; transform: none; width: 8%; height: 11%; }
        .coder-loader-stage[data-phase="success"] .cheek-left { left: 23%; opacity: .9; }
        .coder-loader-stage[data-phase="success"] .cheek-right { left: 72%; opacity: .9; }
        .coder-loader-stage[data-phase="success"] .mouth {
          left: 41%;
          top: 66%;
          width: 28%;
          height: 13%;
          border: 0;
          border-radius: 0 0 999px 999px;
          background: linear-gradient(180deg, white 0 42%, color-mix(in oklab, var(--foreground) 82%, black) 43% 100%);
          box-shadow: inset 0 -4px 0 oklch(54% 0.13 28);
        }
        .coder-loader-stage[data-phase="success"] .arm-left { opacity: 0; transform: rotate(130deg) scale(.5); animation: none; }
        .coder-loader-stage[data-phase="success"] .arm-right { opacity: 0; animation: none; }
        .coder-loader-stage[data-phase="success"] .thumbs-up {
          opacity: 1;
          transform: rotate(-54deg) scale(1);
          animation: thumb-wiggle .95s ease-in-out infinite;
        }
        .coder-loader-stage[data-phase="success"] .success-sparkles { opacity: 1; }

        @keyframes type-left { from { transform: rotate(25deg) translateY(0); } to { transform: rotate(35deg) translateY(4%); } }
        @keyframes type-right { from { transform: rotate(14deg) translateY(4%); } to { transform: rotate(24deg) translateY(-2%); } }
        @keyframes code-type { 0% { transform: scaleX(.18); opacity: .55; } 70%, 100% { transform: scaleX(1); opacity: 1; } }
        @keyframes cursor-blink { 50% { opacity: .15; } }
        @keyframes key-flash { from { opacity: .45; transform: translateY(0); } to { opacity: 1; transform: translateY(1px); } }
        @keyframes slap-hand {
          0% { transform: rotate(18deg) translate(0, 0); }
          42% { transform: rotate(-18deg) translate(34%, -74%); }
          55% { transform: rotate(-6deg) translate(52%, -56%); }
          100% { transform: rotate(20deg) translate(0, 0); }
        }
        @keyframes monitor-thappor {
          0%, 35% { transform: rotate(0deg); }
          45% { transform: rotate(7deg) translateX(5%); }
          58% { transform: rotate(-5deg) translateX(-3%); }
          75% { transform: rotate(3deg) translateX(2%); }
          100% { transform: rotate(0deg); }
        }
        @keyframes burst-pop {
          0%, 35% { opacity: 0; transform: scale(.2); }
          46% { opacity: 1; transform: scale(1.12); }
          100% { opacity: 0; transform: scale(1.45); }
        }
        @keyframes thumb-wiggle { 0%,100% { transform: rotate(-54deg) scale(1); } 50% { transform: rotate(-48deg) scale(1.04); } }
        @keyframes sparkle { from { transform: scale(.8) rotate(var(--r, 0deg)); opacity: .45; } to { transform: scale(1.18) rotate(var(--r, 0deg)); opacity: 1; } }
        @media (prefers-reduced-motion: reduce) {
          .coder-loader-stage *, .coder-loader-stage *::before, .coder-loader-stage *::after { animation: none !important; transition: none !important; }
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
