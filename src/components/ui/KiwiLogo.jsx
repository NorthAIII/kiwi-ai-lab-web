export default function KiwiLogo({ size = 36, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="kiwi-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="50%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id="kiwi-glow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#7e22ce" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* Body — rounded teardrop shape */}
      <ellipse cx="30" cy="34" rx="18" ry="16" fill="url(#kiwi-grad)" />

      {/* Head — smaller circle overlapping top-right */}
      <circle cx="42" cy="22" r="11" fill="url(#kiwi-grad)" />

      {/* Eye — the AI spark */}
      <circle cx="45" cy="20" r="3" fill="#09090b" />
      <circle cx="46.2" cy="18.8" r="1.2" fill="white" opacity="0.9" />

      {/* Beak — long, thin kiwi bird beak */}
      <path
        d="M53 22 L63 20.5 L53 24Z"
        fill="url(#kiwi-grad)"
        opacity="0.85"
      />

      {/* Legs — minimal line strokes */}
      <line x1="24" y1="48" x2="20" y2="58" stroke="url(#kiwi-grad)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="34" y1="48" x2="34" y2="58" stroke="url(#kiwi-grad)" strokeWidth="2.5" strokeLinecap="round" />

      {/* AI circuit accent — subtle tech lines on body */}
      <path
        d="M20 30 L26 30 L26 38"
        stroke="white"
        strokeWidth="1"
        opacity="0.12"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="26" cy="38" r="1.5" fill="white" opacity="0.15" />
      <path
        d="M34 28 L34 34 L40 34"
        stroke="white"
        strokeWidth="1"
        opacity="0.12"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="34" cy="28" r="1.5" fill="white" opacity="0.15" />
    </svg>
  )
}
