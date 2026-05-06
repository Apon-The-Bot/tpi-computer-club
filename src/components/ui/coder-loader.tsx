import { useEffect, useState } from "react";

/**
 * CoderLoader — chunky 3D-style chibi coder.
 * - faces RIGHT (toward viewer) while coding sideways at the laptop
 * - on success: turns fully to the viewer, big smile + thumbs-up
 * - on long load: slaps the laptop, then keeps coding
 *
 * Pure SVG with radial/linear gradients + layered shadows for a soft 3D look.
 */
export function CoderLoader({
  done = false,
  slapAfterMs = 6000,
  label,
  className = "",
  size = 260,
}: {
  done?: boolean;
  slapAfterMs?: number;
  label?: string;
  className?: string;
  size?: number;
}) {
  const [phase, setPhase] = useState<"coding" | "slap" | "success">("coding");
  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    if (done) {
      setPhase("success");
      setBounce(true);
      const t = setTimeout(() => setBounce(false), 800);
      return () => clearTimeout(t);
    }
    setPhase("coding");
    const t = setInterval(() => setPhase((p) => (p === "coding" ? "slap" : "coding")), slapAfterMs);
    return () => clearInterval(t);
  }, [done, slapAfterMs]);

  useEffect(() => {
    if (phase !== "slap") return;
    const t = setTimeout(() => setPhase("coding"), 950);
    return () => clearTimeout(t);
  }, [phase]);

  return (
    <div className={`flex flex-col items-center justify-center gap-5 ${className}`}>
      <div style={{ width: size, height: size }} className={`relative ${bounce ? "coder-pop" : ""}`}>
        <svg viewBox="0 0 260 260" className="h-full w-full" style={{ overflow: "visible" }}>
          <defs>
            {/* Skin */}
            <radialGradient id="skin" cx="40%" cy="35%" r="70%">
              <stop offset="0%" stopColor="#ffe2c2" />
              <stop offset="60%" stopColor="#f3c79a" />
              <stop offset="100%" stopColor="#c98e63" />
            </radialGradient>
            {/* Hair */}
            <radialGradient id="hair" cx="50%" cy="20%" r="80%">
              <stop offset="0%" stopColor="#4a3525" />
              <stop offset="100%" stopColor="#1c130b" />
            </radialGradient>
            {/* Hoodie (cyber blue) */}
            <linearGradient id="hoodie" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5aa9ff" />
              <stop offset="55%" stopColor="#2f6fd8" />
              <stop offset="100%" stopColor="#1a3d80" />
            </linearGradient>
            <linearGradient id="hoodieDark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2a5cb5" />
              <stop offset="100%" stopColor="#102356" />
            </linearGradient>
            {/* Laptop */}
            <linearGradient id="laptopBody" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d6dbe6" />
              <stop offset="100%" stopColor="#7a8294" />
            </linearGradient>
            <linearGradient id="laptopBase" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9aa1b1" />
              <stop offset="100%" stopColor="#444a5a" />
            </linearGradient>
            <radialGradient id="screen" cx="50%" cy="40%" r="80%">
              <stop offset="0%" stopColor="#1d2742" />
              <stop offset="100%" stopColor="#070a18" />
            </radialGradient>
            {/* Desk */}
            <linearGradient id="desk" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3a3140" />
              <stop offset="100%" stopColor="#1a141d" />
            </linearGradient>
            {/* Gold for thumbs up nail / sparkles */}
            <radialGradient id="gold" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#ffe28a" />
              <stop offset="100%" stopColor="#caa14a" />
            </radialGradient>
            {/* Cheeks */}
            <radialGradient id="blush" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ff9aaa" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#ff9aaa" stopOpacity="0" />
            </radialGradient>
            <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.2" />
            </filter>
          </defs>

          {/* ground shadow */}
          <ellipse cx="130" cy="232" rx="98" ry="10" fill="#000" opacity="0.45" />

          {/* desk */}
          <rect x="14" y="200" width="232" height="14" rx="3" fill="url(#desk)" />
          <rect x="14" y="200" width="232" height="2" rx="1" fill="#fff" opacity="0.08" />

          {/* ============ LAPTOP on the LEFT, screen tilts toward chibi ============ */}
          {/* base */}
          <g>
            <path d="M28 192 L108 192 L116 200 L20 200 Z" fill="url(#laptopBase)" />
            <rect x="28" y="186" width="80" height="8" rx="2" fill="url(#laptopBase)" />
          </g>
          {/* screen */}
          <g
            style={{
              transformOrigin: "70px 188px",
              transform: phase === "slap" ? "rotate(10deg) translateX(2px)" : "rotate(0deg)",
              transition: "transform 220ms ease",
            }}
          >
            <rect x="34" y="106" width="68" height="84" rx="6" fill="url(#laptopBody)" />
            <rect x="34" y="106" width="68" height="84" rx="6" fill="none" stroke="#3a4055" strokeWidth="1.2" />
            <rect x="40" y="112" width="56" height="72" rx="4" fill="url(#screen)" />
            {/* code lines */}
            <g className={phase === "coding" ? "coder-screen" : ""}>
              <rect x="46" y="120" width="26" height="3.5" rx="1.5" fill="#ffd66b" />
              <rect x="50" y="129" width="38" height="3.5" rx="1.5" fill="#7ec5ff" />
              <rect x="46" y="138" width="22" height="3.5" rx="1.5" fill="#7af0c4" />
              <rect x="50" y="147" width="32" height="3.5" rx="1.5" fill="#ffd66b" />
              <rect x="46" y="156" width="40" height="3.5" rx="1.5" fill="#7ec5ff" />
              <rect x="50" y="165" width="24" height="3.5" rx="1.5" fill="#7af0c4" />
              <rect x="76" y="165" width="2.5" height="4" fill="#ffffff" className="coder-cursor" />
            </g>
            {/* glossy reflection */}
            <path d="M40 112 L96 112 L96 130 Q70 138 40 134 Z" fill="#ffffff" opacity="0.06" />
          </g>

          {/* ============ CHIBI on the RIGHT ============ */}
          <g>
            {/* legs (just a hint behind the desk) */}
            <ellipse cx="170" cy="208" rx="34" ry="6" fill="#000" opacity="0.25" />

            {/* body / hoodie */}
            <g>
              {/* back side shadow */}
              <path d="M124 198 Q120 156 152 148 Q190 142 206 168 L214 200 Z" fill="url(#hoodieDark)" />
              {/* main hoodie */}
              <path d="M126 198 Q122 158 156 152 Q194 148 208 174 L214 200 Z" fill="url(#hoodie)" />
              {/* hoodie pocket */}
              <path d="M148 184 L196 184 L190 196 L154 196 Z" fill="#1a3d80" opacity="0.55" />
              <path d="M148 184 L196 184" stroke="#ffffff" strokeWidth="0.8" opacity="0.25" />
              {/* drawstrings */}
              <path d="M168 152 L166 168" stroke="#ffffff" strokeWidth="1.4" opacity="0.7" />
              <path d="M178 152 L180 168" stroke="#ffffff" strokeWidth="1.4" opacity="0.7" />
              <circle cx="166" cy="170" r="1.8" fill="#ffffff" opacity="0.85" />
              <circle cx="180" cy="170" r="1.8" fill="#ffffff" opacity="0.85" />
            </g>

            {/* neck */}
            <rect x="166" y="138" width="16" height="14" rx="4" fill="url(#skin)" />
            <rect x="166" y="138" width="16" height="4" fill="#000" opacity="0.18" />

            {/* HEAD — chunky chibi, rotates between sideways and forward */}
            <g
              style={{
                transformOrigin: "174px 110px",
                transform:
                  phase === "success"
                    ? "rotate(0deg) translateY(-2px)"
                    : phase === "slap"
                    ? "rotate(-22deg)"
                    : "rotate(-26deg)",
                transition: "transform 380ms cubic-bezier(.34,1.56,.64,1)",
              }}
            >
              {/* ear (visible when sideways) */}
              {phase !== "success" && (
                <g>
                  <ellipse cx="206" cy="116" rx="5" ry="6" fill="url(#skin)" />
                  <ellipse cx="207" cy="118" rx="2" ry="3" fill="#a76a3f" opacity="0.6" />
                </g>
              )}

              {/* face base — big round */}
              <circle cx="174" cy="110" r="34" fill="url(#skin)" />
              {/* chin shadow */}
              <ellipse cx="174" cy="134" rx="22" ry="6" fill="#000" opacity="0.12" filter="url(#soft)" />
              {/* face highlight */}
              <ellipse cx="162" cy="98" rx="14" ry="10" fill="#ffffff" opacity="0.22" filter="url(#soft)" />

              {/* HAIR — fluffy 3D top */}
              <path d="M142 108 Q146 72 174 70 Q204 72 208 106 Q198 88 188 84 Q200 92 202 108 Q190 96 178 94 Q186 100 188 110 Q176 96 166 96 Q174 104 172 112 Q160 100 152 102 Q160 110 158 116 Q146 110 142 108 Z" fill="url(#hair)" />
              {/* hair shine */}
              <path d="M158 84 Q170 76 184 80" stroke="#ffffff" strokeWidth="2" opacity="0.35" strokeLinecap="round" fill="none" />

              {/* CHEEKS */}
              <ellipse cx={phase === "success" ? "158" : "188"} cy="120" rx="7" ry="4" fill="url(#blush)" />
              {phase === "success" && <ellipse cx="190" cy="120" rx="7" ry="4" fill="url(#blush)" />}

              {/* EYES */}
              {phase === "success" ? (
                <>
                  {/* happy ^ ^ */}
                  <path d="M158 108 Q164 100 170 108" stroke="#241a13" strokeWidth="3" fill="none" strokeLinecap="round" />
                  <path d="M178 108 Q184 100 190 108" stroke="#241a13" strokeWidth="3" fill="none" strokeLinecap="round" />
                </>
              ) : phase === "slap" ? (
                <>
                  <path d="M178 112 L188 112" stroke="#241a13" strokeWidth="2.4" strokeLinecap="round" />
                  <path d="M164 112 L172 112" stroke="#241a13" strokeWidth="2.4" strokeLinecap="round" />
                </>
              ) : (
                <>
                  {/* big anime eyes looking LEFT toward laptop */}
                  <ellipse cx="180" cy="112" rx="4.5" ry="5.5" fill="#ffffff" />
                  <ellipse cx="166" cy="112" rx="4.5" ry="5.5" fill="#ffffff" />
                  <circle cx="177" cy="113" r="3" fill="#241a13" />
                  <circle cx="163" cy="113" r="3" fill="#241a13" />
                  <circle cx="176" cy="112" r="1" fill="#ffffff" />
                  <circle cx="162" cy="112" r="1" fill="#ffffff" />
                  {/* tiny brows of focus */}
                  <path d="M158 102 L172 100" stroke="#241a13" strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M174 100 L188 102" stroke="#241a13" strokeWidth="1.6" strokeLinecap="round" />
                </>
              )}

              {/* MOUTH */}
              {phase === "success" ? (
                <g>
                  <path d="M160 128 Q174 142 188 128 Q174 138 160 128 Z" fill="#7a2030" stroke="#241a13" strokeWidth="1.6" strokeLinejoin="round" />
                  {/* tooth */}
                  <rect x="170" y="129" width="6" height="3" rx="1" fill="#ffffff" />
                </g>
              ) : phase === "slap" ? (
                <path d="M168 132 Q174 128 180 132" stroke="#241a13" strokeWidth="2" fill="none" strokeLinecap="round" />
              ) : (
                <path d="M168 128 Q174 132 180 128" stroke="#241a13" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              )}
            </g>

            {/* ============ ARMS ============ */}
            {phase === "success" ? (
              <>
                {/* left arm relaxed at side */}
                <g>
                  <path d="M138 174 Q126 188 130 200 L146 200 Q146 192 152 184 Z" fill="url(#hoodie)" />
                  <circle cx="136" cy="198" r="8" fill="url(#skin)" />
                </g>
                {/* RIGHT arm raised — thumbs up toward viewer */}
                <g style={{ transformOrigin: "200px 180px" }} className="coder-thumb">
                  <path d="M196 178 Q220 156 232 130 L218 122 Q204 144 188 168 Z" fill="url(#hoodie)" />
                  {/* sleeve cuff */}
                  <ellipse cx="222" cy="128" rx="10" ry="6" fill="url(#hoodieDark)" transform="rotate(-30 222 128)" />
                  {/* fist */}
                  <circle cx="226" cy="124" r="11" fill="url(#skin)" />
                  {/* knuckle shading */}
                  <path d="M218 122 Q226 128 234 122" stroke="#a76a3f" strokeWidth="1.2" fill="none" opacity="0.5" />
                  {/* thumb up */}
                  <rect x="221" y="100" width="10" height="20" rx="5" fill="url(#skin)" />
                  <ellipse cx="226" cy="104" rx="3.5" ry="2" fill="url(#gold)" opacity="0.85" />
                </g>
              </>
            ) : phase === "slap" ? (
              <>
                {/* left arm typing */}
                <g className="coder-arm-left">
                  <path d="M152 176 Q132 184 120 198 L132 204 Q146 192 162 186 Z" fill="url(#hoodie)" />
                  <circle cx="124" cy="200" r="7" fill="url(#skin)" />
                </g>
                {/* RIGHT arm slap */}
                <g className="coder-arm-slap">
                  <path d="M168 176 Q130 178 96 192 L100 204 Q140 196 174 188 Z" fill="url(#hoodie)" />
                  <circle cx="96" cy="196" r="9" fill="url(#skin)" />
                  <g stroke="#ffd66b" strokeWidth="2.6" strokeLinecap="round">
                    <line x1="80" y1="190" x2="70" y2="184" />
                    <line x1="80" y1="200" x2="70" y2="206" />
                    <line x1="78" y1="195" x2="66" y2="195" />
                  </g>
                </g>
              </>
            ) : (
              <>
                {/* both hands typing on the laptop to the LEFT */}
                <g className="coder-arm-left">
                  <path d="M150 176 Q120 184 100 200 L106 210 Q132 198 158 188 Z" fill="url(#hoodie)" />
                  <circle cx="104" cy="206" r="8" fill="url(#skin)" />
                </g>
                <g className="coder-arm-right">
                  <path d="M158 178 Q128 188 108 204 L114 214 Q140 202 166 192 Z" fill="url(#hoodie)" />
                  <circle cx="112" cy="210" r="8" fill="url(#skin)" />
                </g>
              </>
            )}
          </g>

          {/* sparkles on success */}
          {phase === "success" && (
            <g className="coder-sparkle">
              <g transform="translate(232,70)">
                <path d="M0 -6 L1.5 -1.5 L6 0 L1.5 1.5 L0 6 L-1.5 1.5 L-6 0 L-1.5 -1.5 Z" fill="url(#gold)" />
              </g>
              <g transform="translate(248,110)">
                <path d="M0 -4 L1 -1 L4 0 L1 1 L0 4 L-1 1 L-4 0 L-1 -1 Z" fill="url(#gold)" />
              </g>
              <g transform="translate(36,90)">
                <path d="M0 -5 L1.2 -1.2 L5 0 L1.2 1.2 L0 5 L-1.2 1.2 L-5 0 L-1.2 -1.2 Z" fill="url(#gold)" />
              </g>
            </g>
          )}
        </svg>
      </div>

      <div className="text-center">
        <div className="text-base font-semibold">
          {phase === "success" ? "All set!" : phase === "slap" ? "Rebooting brain…" : "Compiling…"}
        </div>
        {label && <div className="mt-1 text-xs text-muted-foreground">{label}</div>}
      </div>

      <style>{`
        .coder-cursor { animation: coder-blink 0.6s steps(2) infinite; }
        @keyframes coder-blink { 50% { opacity: 0; } }
        .coder-arm-left  { transform-origin: 150px 180px; animation: coder-type-l 0.16s ease-in-out infinite; }
        .coder-arm-right { transform-origin: 158px 182px; animation: coder-type-r 0.16s ease-in-out infinite; }
        @keyframes coder-type-l { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
        @keyframes coder-type-r { 0%,100% { transform: translateY(-3px); } 50% { transform: translateY(0); } }
        .coder-arm-slap { animation: coder-slap 0.45s ease-out; transform-origin: 170px 180px; }
        @keyframes coder-slap { 0% { transform: translateX(36px) rotate(20deg); } 60% { transform: translateX(-3px) rotate(-8deg); } 100% { transform: translateX(0) rotate(0); } }
        .coder-screen rect { animation: coder-screen-flicker 0.32s steps(3) infinite; }
        @keyframes coder-screen-flicker { 50% { opacity: 0.55; } }
        .coder-sparkle g { animation: coder-sparkle 1.4s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
        .coder-sparkle g:nth-child(2) { animation-delay: 0.4s; }
        .coder-sparkle g:nth-child(3) { animation-delay: 0.8s; }
        @keyframes coder-sparkle { 0%,100% { opacity: 0.3; } 50% { opacity: 1; } }
        .coder-thumb { animation: coder-thumb-bob 1.2s ease-in-out infinite; transform-origin: 210px 150px; }
        @keyframes coder-thumb-bob { 0%,100% { transform: translateY(0) rotate(0); } 50% { transform: translateY(-6px) rotate(-5deg); } }
        .coder-pop { animation: coder-pop 0.7s cubic-bezier(.34,1.56,.64,1); }
        @keyframes coder-pop { 0% { transform: scale(0.6); } 60% { transform: scale(1.1); } 100% { transform: scale(1); } }
        @media (prefers-reduced-motion: reduce) {
          .coder-cursor, .coder-arm-left, .coder-arm-right, .coder-arm-slap, .coder-screen rect, .coder-sparkle g, .coder-thumb, .coder-pop { animation: none; }
        }
      `}</style>
    </div>
  );
}

/** Full-screen centered overlay variant. */
export function CoderLoaderOverlay({ done, label }: { done?: boolean; label?: string }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-background/85 backdrop-blur-md">
      <CoderLoader done={done} label={label} size={300} />
    </div>
  );
}
