import { useEffect, useState } from "react";

/**
 * CoderLoader — cute chibi coder, sits sideways at the laptop facing RIGHT (toward the viewer).
 * - "coding": eyes locked on screen, fingers tapping super fast
 * - "slap": gives the laptop a quick whack, then resumes
 * - "success": turns to face the viewer with a big smile + thumbs-up
 */
export function CoderLoader({
  done = false,
  slapAfterMs = 6000,
  label,
  className = "",
  size = 220,
}: {
  done?: boolean;
  slapAfterMs?: number;
  label?: string;
  className?: string;
  size?: number;
}) {
  const [phase, setPhase] = useState<"coding" | "slap" | "success">("coding");

  useEffect(() => {
    if (done) {
      setPhase("success");
      return;
    }
    setPhase("coding");
    const t = setInterval(() => setPhase((p) => (p === "coding" ? "slap" : "coding")), slapAfterMs);
    return () => clearInterval(t);
  }, [done, slapAfterMs]);

  useEffect(() => {
    if (phase !== "slap") return;
    const t = setTimeout(() => setPhase("coding"), 900);
    return () => clearTimeout(t);
  }, [phase]);

  const skin = "oklch(0.86 0.06 60)";
  const hair = "oklch(0.22 0.03 40)";
  const shirt = "oklch(0.55 0.16 245)";
  const screen = "oklch(0.2 0.04 260)";
  const laptop = "oklch(0.45 0.04 260)";
  const gold = "oklch(0.78 0.16 75)";
  const cyber = "oklch(0.7 0.16 235)";

  return (
    <div className={`flex flex-col items-center justify-center gap-5 ${className}`}>
      <div style={{ width: size, height: size }} className="relative">
        <svg viewBox="0 0 220 220" className="h-full w-full">
          {/* soft floor shadow */}
          <ellipse cx="110" cy="195" rx="78" ry="8" fill="oklch(0.1 0.04 260)" opacity="0.55" />

          {/* desk */}
          <rect x="20" y="170" width="180" height="6" rx="2" fill="oklch(0.32 0.04 260)" />

          {/* ============ LAPTOP — on the LEFT, screen faces RIGHT (toward chibi) ============ */}
          {/* base */}
          <rect x="32" y="158" width="58" height="12" rx="2" fill={laptop} />
          {/* screen back (tilted slightly) */}
          <g
            style={{
              transformOrigin: "70px 158px",
              transform: phase === "slap" ? "rotate(8deg) translateX(2px)" : "rotate(0deg)",
              transition: "transform 220ms ease",
            }}
          >
            <rect x="38" y="98" width="50" height="62" rx="4" fill={laptop} />
            <rect x="42" y="102" width="42" height="54" rx="3" fill={screen} />
            {/* code lines (only visible to chibi from this side) */}
            <g className={phase === "coding" ? "coder-screen" : ""}>
              <rect x="46" y="108" width="22" height="3" rx="1" fill={gold} opacity="0.95" />
              <rect x="50" y="115" width="30" height="3" rx="1" fill={cyber} opacity="0.9" />
              <rect x="46" y="122" width="18" height="3" rx="1" fill="oklch(0.65 0.18 160)" opacity="0.9" />
              <rect x="50" y="129" width="26" height="3" rx="1" fill={gold} opacity="0.95" />
              <rect x="46" y="136" width="34" height="3" rx="1" fill={cyber} opacity="0.9" />
              <rect x="50" y="143" width="20" height="3" rx="1" fill="oklch(0.65 0.18 160)" opacity="0.9" />
              <rect x="78" y="143" width="2" height="3" fill="oklch(0.97 0.01 240)" className="coder-cursor" />
            </g>
          </g>

          {/* ============ CHIBI CODER — sits on the RIGHT, head turns to viewer on success ============ */}
          {/* body / hoodie */}
          <path d="M118 170 Q118 132 142 130 Q170 128 178 152 L182 170 Z" fill={shirt} />
          {/* hoodie pocket */}
          <path d="M138 158 L172 158 L168 168 L142 168 Z" fill="oklch(0.45 0.14 245)" opacity="0.7" />

          {/* head — cute big round chibi head */}
          <g
            style={{
              transformOrigin: "150px 100px",
              transform:
                phase === "success"
                  ? "rotate(0deg)"
                  : phase === "slap"
                  ? "rotate(-18deg) translateY(-1px)"
                  : "rotate(-22deg)",
              transition: "transform 350ms cubic-bezier(.34,1.56,.64,1)",
            }}
          >
            {/* ear (only visible when sideways) */}
            {phase !== "success" && <circle cx="172" cy="103" r="4" fill={skin} />}

            {/* face */}
            <circle cx="150" cy="100" r="28" fill={skin} />

            {/* hair — fluffy top */}
            <path d="M124 98 Q128 70 150 68 Q172 70 176 96 Q170 84 150 82 Q130 84 124 98 Z" fill={hair} />
            <path d="M170 84 Q178 86 178 96 Q172 92 168 90 Z" fill={hair} />

            {/* cheeks — cute blush */}
            <ellipse cx={phase === "success" ? "138" : "162"} cy="108" rx="4" ry="2.5" fill="oklch(0.78 0.14 20)" opacity="0.55" />
            {phase === "success" && <ellipse cx="162" cy="108" rx="4" ry="2.5" fill="oklch(0.78 0.14 20)" opacity="0.55" />}

            {/* eyes — facing right when coding, facing viewer (front) on success */}
            {phase === "success" ? (
              <>
                {/* happy closed-up eyes ^ ^ */}
                <path d="M138 98 Q142 93 146 98" stroke="oklch(0.18 0.04 260)" strokeWidth="2.2" fill="none" strokeLinecap="round" />
                <path d="M154 98 Q158 93 162 98" stroke="oklch(0.18 0.04 260)" strokeWidth="2.2" fill="none" strokeLinecap="round" />
              </>
            ) : phase === "slap" ? (
              <>
                <path d="M156 102 L164 102" stroke="oklch(0.18 0.04 260)" strokeWidth="2" strokeLinecap="round" />
                <path d="M144 102 L150 102" stroke="oklch(0.18 0.04 260)" strokeWidth="2" strokeLinecap="round" />
              </>
            ) : (
              <>
                {/* focused eyes looking LEFT toward the laptop */}
                <ellipse cx="155" cy="102" rx="3" ry="3.6" fill="white" />
                <ellipse cx="145" cy="102" rx="3" ry="3.6" fill="white" />
                <circle cx="153" cy="103" r="2" fill="oklch(0.15 0.04 260)" />
                <circle cx="143" cy="103" r="2" fill="oklch(0.15 0.04 260)" />
                <circle cx="152.3" cy="102.3" r="0.7" fill="white" />
                <circle cx="142.3" cy="102.3" r="0.7" fill="white" />
              </>
            )}

            {/* mouth */}
            {phase === "success" ? (
              <path d="M140 114 Q150 124 160 114 Q150 120 140 114 Z" fill="oklch(0.4 0.12 20)" stroke="oklch(0.18 0.04 260)" strokeWidth="1.5" strokeLinejoin="round" />
            ) : phase === "slap" ? (
              <path d="M144 116 Q150 112 156 116" stroke="oklch(0.18 0.04 260)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            ) : (
              <path d="M146 114 Q150 117 154 114" stroke="oklch(0.18 0.04 260)" strokeWidth="1.6" fill="none" strokeLinecap="round" />
            )}
          </g>

          {/* ===== ARMS ===== */}
          {phase === "success" ? (
            <>
              {/* both arms forward, RIGHT hand thumbs-up out toward viewer/right */}
              <path d="M134 150 Q120 158 116 168 L128 172 Q132 162 142 158 Z" fill={shirt} />
              {/* left hand resting */}
              <circle cx="120" cy="168" r="6" fill={skin} />
              {/* right arm raised with thumbs up */}
              <g style={{ transformOrigin: "168px 150px" }} className="coder-thumb">
                <path d="M168 150 Q186 138 196 122 L188 116 Q176 130 162 142 Z" fill={shirt} />
                {/* fist */}
                <circle cx="194" cy="118" r="8" fill={skin} />
                {/* thumb */}
                <rect x="190" y="100" width="6" height="14" rx="3" fill={skin} />
                {/* nail highlight */}
                <ellipse cx="193" cy="103" rx="2" ry="1.2" fill="white" opacity="0.6" />
              </g>
            </>
          ) : phase === "slap" ? (
            <>
              {/* left arm */}
              <g className="coder-arm-left">
                <path d="M134 150 Q124 156 118 162 L126 168 Q132 162 140 158 Z" fill={shirt} />
                <circle cx="122" cy="164" r="6" fill={skin} />
              </g>
              {/* right arm reaching out to slap the laptop on its left */}
              <g className="coder-arm-slap">
                <path d="M138 150 Q108 152 88 156 L92 166 Q116 162 142 160 Z" fill={shirt} />
                <circle cx="90" cy="160" r="7" fill={skin} />
                {/* impact */}
                <g stroke={gold} strokeWidth="2.4" strokeLinecap="round">
                  <line x1="78" y1="156" x2="70" y2="150" />
                  <line x1="78" y1="164" x2="70" y2="170" />
                  <line x1="76" y1="160" x2="66" y2="160" />
                </g>
              </g>
            </>
          ) : (
            <>
              {/* both hands typing on the keyboard to the LEFT */}
              <g className="coder-arm-left">
                <path d="M134 150 Q108 152 86 162 L90 170 Q114 162 140 158 Z" fill={shirt} />
                <circle cx="88" cy="166" r="6" fill={skin} />
              </g>
              <g className="coder-arm-right">
                <path d="M138 152 Q116 156 92 164 L96 172 Q120 166 144 162 Z" fill={shirt} />
                <circle cx="94" cy="168" r="6" fill={skin} />
              </g>
            </>
          )}

          {/* sparkles on success */}
          {phase === "success" && (
            <g className="coder-sparkle">
              <circle cx="190" cy="60" r="2.5" fill={gold} />
              <circle cx="200" cy="80" r="1.8" fill={gold} />
              <circle cx="40" cy="70" r="1.8" fill={gold} />
              <circle cx="55" cy="55" r="2.2" fill={gold} />
            </g>
          )}
        </svg>
      </div>

      <div className="text-center">
        <div className="text-sm font-semibold">
          {phase === "success" ? "All set!" : phase === "slap" ? "Rebooting brain…" : "Compiling…"}
        </div>
        {label && <div className="mt-1 text-xs text-muted-foreground">{label}</div>}
      </div>

      <style>{`
        .coder-cursor { animation: coder-blink 0.6s steps(2) infinite; }
        @keyframes coder-blink { 50% { opacity: 0; } }
        .coder-arm-left  { transform-origin: 130px 154px; animation: coder-type-l 0.16s ease-in-out infinite; }
        .coder-arm-right { transform-origin: 134px 156px; animation: coder-type-r 0.16s ease-in-out infinite; }
        @keyframes coder-type-l { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
        @keyframes coder-type-r { 0%,100% { transform: translateY(-3px); } 50% { transform: translateY(0); } }
        .coder-arm-slap { animation: coder-slap 0.45s ease-out; transform-origin: 138px 154px; }
        @keyframes coder-slap { 0% { transform: translateX(30px) rotate(20deg); } 60% { transform: translateX(-3px) rotate(-8deg); } 100% { transform: translateX(0) rotate(0); } }
        .coder-screen rect { animation: coder-screen-flicker 0.35s steps(3) infinite; }
        @keyframes coder-screen-flicker { 50% { opacity: 0.6; } }
        .coder-sparkle circle { animation: coder-sparkle 1.4s ease-in-out infinite; }
        @keyframes coder-sparkle { 0%,100% { opacity: 0.3; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1.3); } }
        .coder-thumb { animation: coder-thumb-bob 1.2s ease-in-out infinite; transform-origin: 184px 130px; }
        @keyframes coder-thumb-bob { 0%,100% { transform: translateY(0) rotate(0); } 50% { transform: translateY(-4px) rotate(-4deg); } }
        @media (prefers-reduced-motion: reduce) {
          .coder-cursor, .coder-arm-left, .coder-arm-right, .coder-arm-slap, .coder-screen rect, .coder-sparkle circle, .coder-thumb { animation: none; }
        }
      `}</style>
    </div>
  );
}

/** Full-screen centered overlay variant. */
export function CoderLoaderOverlay({ done, label }: { done?: boolean; label?: string }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-background/85 backdrop-blur-md">
      <CoderLoader done={done} label={label} size={260} />
    </div>
  );
}
