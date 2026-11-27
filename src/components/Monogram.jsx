/**
 * Recreated AF monogram: serif A + F, hanger hook, gold needle with thread
 * and a four-hole button — drawn as vectors so it scales and recolours.
 */
export default function Monogram({ size = 44, className = '' }) {
  return (
    <svg
      viewBox="0 0 130 104"
      width={size}
      height={(size * 104) / 130}
      className={className}
      role="img"
      aria-label="Ahmed Fayed monogram"
    >
      {/* hanger hook above the A */}
      <path
        d="M47 18 C47 8 39 5 36 11 C33 17 40 21 44 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* A */}
      <path
        d="M18 88 L43 22 L51 22 L76 88"
        fill="none"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M30 64 L64 64" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      {/* F */}
      <path
        d="M88 22 L88 88"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path d="M88 22 L118 22" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      <path d="M88 52 L110 52" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      {/* gold needle sweeping through the letters */}
      <g stroke="var(--gold-500, #C2A15D)">
        <path
          d="M30 96 L108 30"
          fill="none"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <ellipse
          cx="111"
          cy="27"
          rx="3"
          ry="6"
          fill="none"
          strokeWidth="2"
          transform="rotate(28 111 27)"
        />
        {/* thread curving off the needle */}
        <path
          d="M111 21 C92 6 62 6 48 20 C36 32 42 50 60 52"
          fill="none"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M60 52 C78 54 88 66 82 84"
          fill="none"
          strokeWidth="2.4"
          strokeDasharray="5 6"
          strokeLinecap="round"
          opacity="0.75"
        />
      </g>
      {/* four-hole button */}
      <g>
        <circle cx="90" cy="68" r="10" fill="currentColor" />
        <circle cx="86.5" cy="65" r="1.7" fill="var(--cream-100, #F7F4ED)" />
        <circle cx="93.5" cy="65" r="1.7" fill="var(--cream-100, #F7F4ED)" />
        <circle cx="86.5" cy="71.5" r="1.7" fill="var(--cream-100, #F7F4ED)" />
        <circle cx="93.5" cy="71.5" r="1.7" fill="var(--cream-100, #F7F4ED)" />
      </g>
    </svg>
  )
}
