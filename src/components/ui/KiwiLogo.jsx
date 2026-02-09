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
        <radialGradient id="kiwi-flesh" cx="45%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#A8F060" />
          <stop offset="60%" stopColor="#7EC845" />
          <stop offset="100%" stopColor="#4A8C2A" />
        </radialGradient>
        <radialGradient id="kiwi-inner" cx="45%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#C4F288" />
          <stop offset="100%" stopColor="#8FD45A" />
        </radialGradient>
      </defs>

      {/* Hexagonal frame */}
      <polygon
        points="32,4 56.5,18 56.5,46 32,60 7.5,46 7.5,18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.25"
      />

      {/* Kiwi slice — outer ring */}
      <circle cx="32" cy="32" r="22" fill="#1A2010" />
      <circle cx="32" cy="32" r="20.5" fill="#2E6818" />
      <circle cx="32" cy="32" r="18.5" fill="url(#kiwi-flesh)" />

      {/* White separator ring */}
      <circle cx="32" cy="32" r="13" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.6" />

      {/* Inner flesh */}
      <circle cx="32" cy="32" r="12.5" fill="url(#kiwi-inner)" />

      {/* Central core */}
      <circle cx="32" cy="32" r="4" fill="rgba(255,255,255,0.85)" />
      <circle cx="32" cy="32" r="1.5" fill="#7EC845" opacity="0.5" />

      {/* Seed/neural lines */}
      <g stroke="rgba(15,15,30,0.5)" strokeWidth="0.9">
        <line x1="32" y1="28" x2="32" y2="14" />
        <line x1="32" y1="36" x2="32" y2="50" />
        <line x1="35.5" y1="30" x2="48.5" y2="22.5" />
        <line x1="28.5" y1="34" x2="15.5" y2="41.5" />
        <line x1="35.5" y1="34" x2="48.5" y2="41.5" />
        <line x1="28.5" y1="30" x2="15.5" y2="22.5" />
      </g>

      {/* Data nodes */}
      <g fill="rgba(15,15,30,0.6)">
        <circle cx="32" cy="14.5" r="1.3" />
        <circle cx="32" cy="49.5" r="1.3" />
        <circle cx="48" cy="23" r="1.3" />
        <circle cx="16" cy="41" r="1.3" />
        <circle cx="48" cy="41" r="1.3" />
        <circle cx="16" cy="23" r="1.3" />
      </g>

      {/* Circuit traces to hex frame */}
      <g stroke="#7EC845" strokeWidth="0.8" fill="none" opacity="0.7">
        <polyline points="32,13.5 32,8 35,5" />
        <polyline points="49,23 53,20.5 55.5,22" />
        <polyline points="49,41 53,43.5 55.5,42" />
        <polyline points="32,50.5 32,56 29,59" />
        <polyline points="15,41 11,43.5 8.5,42" />
        <polyline points="15,23 11,20.5 8.5,22" />
      </g>

      {/* Circuit endpoint dots */}
      <g fill="#7EC845" opacity="0.8">
        <circle cx="35" cy="5" r="1.2" />
        <circle cx="55.5" cy="22" r="1.2" />
        <circle cx="55.5" cy="42" r="1.2" />
        <circle cx="29" cy="59" r="1.2" />
        <circle cx="8.5" cy="42" r="1.2" />
        <circle cx="8.5" cy="22" r="1.2" />
      </g>
    </svg>
  )
}
