import { useEffect, useState } from "react";

/**
 * CoderLoader
 * - phase "coding": cartoon coder typing very fast & focused
 * - phase "slap": after `slapAfterMs` of waiting, the coder slaps the PC and resumes coding
 * - phase "success": when `done` becomes true, coder looks up, smiles & gives a thumbs-up
 */
export function CoderLoader({
  done = false,
  slapAfterMs = 6000,
  label,
  className = "",
}: {
  done?: boolean;
  slapAfterMs?: number;
  label?: string;
  className?: string;
}) {
  const [phase, setPhase] = useState<"coding" | "slap" | "success">("coding");

  useEffect(() => {
    if (done) {
      setPhase("success");
      return;
    }
    setPhase("coding");
    const t = setInterval(() => {
      setPhase((p) => (p === "coding" ? "slap" : "coding"));
    }, slapAfterMs);
    return () => clearInterval(t);
  }, [done, slapAfterMs]);

  // auto-revert slap back to coding after 900ms
  useEffect(() => {
    if (phase !== "slap") return;
    const t = setTimeout(() => setPhase("coding"), 900);
    return () => clearTimeout(t);
  }, [phase]);

  return (
    <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
      <div className="relative h-40 w-40">
        <svg viewBox="0 0 200 200" className="h-full w-full">
          {/* Desk */}
          <rect x="20" y="150" width="160" height="8" rx="2" fill="oklch(0.32 0.04 260)" />
          {/* Laptop base */}
          <rect x="55" y="135" width="90" height="15" rx="2" fill="oklch(0.4 0.04 260)" />
          {/* Laptop screen */}
          <g
            style={{
              transformOrigin: "100px 135px",
              transform: phase === "slap" ? "rotate(-10deg) translateX(-3px)" : "rotate(0deg)",
              transition: "transform 220ms ease",
            }}
          >
            <rect x="58" y="80" width="84" height="58" rx="4" fill="oklch(0.22 0.04 260)" stroke="oklch(0.5 0.05 260)" strokeWidth="1" />
            {/* Code lines on screen */}
            <g className={phase === "coding" ? "coder-screen" : ""}>
              <rect x="64" y="88" width="22" height="3" rx="1" fill="oklch(0.78 0.16 75)" opacity="0.9" />
              <rect x="68" y="95" width="40" height="3" rx="1" fill="oklch(0.7 0.16 235)" opacity="0.85" />
              <rect x="68" y="102" width="30" height="3" rx="1" fill="oklch(0.65 0.18 160)" opacity="0.85" />
              <rect x="64" y="109" width="50" height="3" rx="1" fill="oklch(0.78 0.16 75)" opacity="0.9" />
              <rect x="68" y="116" width="36" height="3" rx="1" fill="oklch(0.7 0.16 235)" opacity="0.85" />
              <rect x="64" y="123" width="44" height="3" rx="1" fill="oklch(0.65 0.18 160)" opacity="0.85" />
              {/* Blinking cursor */}
              <rect x="116" y="123" width="2" height="3" fill="oklch(0.97 0.01 240)" className="coder-cursor" />
            </g>
          </g>

          {/* Character body */}
          <ellipse cx="100" cy="170" rx="36" ry="10" fill="oklch(0.15 0.04 260)" opacity="0.5" />

          {/* Head */}
          <g
            style={{
              transformOrigin: "100px 60px",
              transform:
                phase === "success"
                  ? "translateY(-2px)"
                  : phase === "slap"
                  ? "translateX(-2px) rotate(-4deg)"
                  : "translateY(0)",
              transition: "transform 200ms ease",
            }}
          >
            <circle cx="100" cy="60" r="22" fill="oklch(0.82 0.06 60)" />
            {/* Hair */}
            <path d="M78 56 Q100 32 122 56 Q120 46 100 42 Q80 46 78 56 Z" fill="oklch(0.2 0.02 60)" />
            {/* Glasses */}
            <circle cx="92" cy="62" r="5" fill="none" stroke="oklch(0.2 0.02 60)" strokeWidth="1.5" />
            <circle cx="108" cy="62" r="5" fill="none" stroke="oklch(0.2 0.02 60)" strokeWidth="1.5" />
            <line x1="97" y1="62" x2="103" y2="62" stroke="oklch(0.2 0.02 60)" strokeWidth="1.5" />
            {/* Eyes - inside glasses */}
            {phase === "success" ? (
              <>
                <path d="M89 62 Q92 59 95 62" stroke="oklch(0.2 0.02 60)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <path d="M105 62 Q108 59 111 62" stroke="oklch(0.2 0.02 60)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              </>
            ) : (
              <>
                <circle cx="92" cy="62" r="1.5" fill="oklch(0.15 0.02 260)" />
                <circle cx="108" cy="62" r="1.5" fill="oklch(0.15 0.02 260)" />
              </>
            )}
            {/* Mouth */}
            {phase === "success" ? (
              <path d="M90 72 Q100 82 110 72" stroke="oklch(0.2 0.02 60)" strokeWidth="2" fill="oklch(0.4 0.1 20)" strokeLinecap="round" />
            ) : phase === "slap" ? (
              <path d="M92 73 L108 73" stroke="oklch(0.2 0.02 60)" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M93 72 Q100 75 107 72" stroke="oklch(0.2 0.02 60)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            )}
          </g>

          {/* Shoulders / shirt */}
          <path d="M62 92 Q100 78 138 92 L142 130 L58 130 Z" fill="oklch(0.4 0.12 245)" />

          {/* Left arm — typing or thumbs-up */}
          {phase === "success" ? (
            <g style={{ transformOrigin: "75px 110px" }}>
              <path d="M70 110 L60 80 L66 76 L74 100 Z" fill="oklch(0.82 0.06 60)" />
              {/* thumbs up fist */}
              <circle cx="60" cy="74" r="6" fill="oklch(0.82 0.06 60)" />
              <rect x="58" y="62" width="4" height="9" rx="2" fill="oklch(0.82 0.06 60)" />
            </g>
          ) : (
            <g className="coder-arm-left">
              <rect x="64" y="100" width="8" height="28" rx="3" fill="oklch(0.82 0.06 60)" />
              <circle cx="68" cy="132" r="5" fill="oklch(0.82 0.06 60)" />
            </g>
          )}

          {/* Right arm — typing, thumbs-up, or slapping */}
          {phase === "success" ? (
            <g>
              <rect x="128" y="100" width="8" height="28" rx="3" fill="oklch(0.82 0.06 60)" />
              <circle cx="132" cy="132" r="5" fill="oklch(0.82 0.06 60)" />
            </g>
          ) : phase === "slap" ? (
            <g className="coder-arm-slap">
              <rect x="128" y="92" width="8" height="32" rx="3" fill="oklch(0.82 0.06 60)" transform="rotate(-25 132 108)" />
              <circle cx="118" cy="128" r="6" fill="oklch(0.82 0.06 60)" />
              {/* impact lines */}
              <g stroke="oklch(0.78 0.16 75)" strokeWidth="2" strokeLinecap="round">
                <line x1="92" y1="128" x2="86" y2="124" />
                <line x1="92" y1="134" x2="86" y2="138" />
                <line x1="90" y1="131" x2="82" y2="131" />
              </g>
            </g>
          ) : (
            <g className="coder-arm-right">
              <rect x="128" y="100" width="8" height="28" rx="3" fill="oklch(0.82 0.06 60)" />
              <circle cx="132" cy="132" r="5" fill="oklch(0.82 0.06 60)" />
            </g>
          )}

          {/* Success sparkle */}
          {phase === "success" && (
            <g className="coder-sparkle">
              <circle cx="148" cy="50" r="2" fill="oklch(0.78 0.16 75)" />
              <circle cx="158" cy="64" r="1.5" fill="oklch(0.78 0.16 75)" />
              <circle cx="42" cy="58" r="1.5" fill="oklch(0.78 0.16 75)" />
            </g>
          )}
        </svg>
      </div>

      <div className="text-center">
        <div className="text-sm font-semibold">
          {phase === "success" ? "All set! " : phase === "slap" ? "Rebooting brain…" : "Compiling…"}
        </div>
        {label && <div className="mt-1 text-xs text-muted-foreground">{label}</div>}
      </div>

      <style>{`
        .coder-cursor { animation: coder-blink 0.6s steps(2) infinite; }
        @keyframes coder-blink { 50% { opacity: 0; } }
        .coder-arm-left  { transform-origin: 68px 104px; animation: coder-type-l 0.18s ease-in-out infinite; }
        .coder-arm-right { transform-origin: 132px 104px; animation: coder-type-r 0.18s ease-in-out infinite; }
        @keyframes coder-type-l { 0%,100% { transform: translateY(0) rotate(0); } 50% { transform: translateY(-3px) rotate(-6deg); } }
        @keyframes coder-type-r { 0%,100% { transform: translateY(-3px) rotate(6deg); } 50% { transform: translateY(0) rotate(0); } }
        .coder-arm-slap { animation: coder-slap 0.4s ease-out; }
        @keyframes coder-slap { 0% { transform: translateX(20px) rotate(20deg); } 60% { transform: translateX(-4px) rotate(-10deg); } 100% { transform: translateX(0) rotate(0); } }
        .coder-screen rect { animation: coder-screen-flicker 0.35s steps(3) infinite; }
        @keyframes coder-screen-flicker { 50% { opacity: 0.55; } }
        .coder-sparkle circle { animation: coder-sparkle 1.4s ease-in-out infinite; }
        @keyframes coder-sparkle { 0%,100% { opacity: 0.3; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1.3); } }
        @media (prefers-reduced-motion: reduce) {
          .coder-cursor, .coder-arm-left, .coder-arm-right, .coder-arm-slap, .coder-screen rect, .coder-sparkle circle { animation: none; }
        }
      `}</style>
    </div>
  );
}

/** Full-screen overlay variant — show while a route/data is loading. */
export function CoderLoaderOverlay({ done, label }: { done?: boolean; label?: string }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-background/80 backdrop-blur-sm">
      <CoderLoader done={done} label={label} />
    </div>
  );
}
