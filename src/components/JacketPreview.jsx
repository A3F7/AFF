import { useId } from 'react'
import { COLOUR_HEX } from '../data.js'

/** Mix a hex towards black (0 = original, 1 = black). */
function shade(hex, amount) {
  const n = parseInt(hex.slice(1), 16)
  const r = Math.round(((n >> 16) & 255) * (1 - amount))
  const g = Math.round(((n >> 8) & 255) * (1 - amount))
  const b = Math.round((n & 255) * (1 - amount))
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`
}

/**
 * Live jacket preview: colour, fabric texture, silk lining, embroidered name
 * and extra pocket all render straight from the configurator state.
 */
export default function JacketPreview({ cfg, className = '' }) {
  const uid = useId().replace(/:/g, '')
  const body = COLOUR_HEX[cfg.colour] || COLOUR_HEX.navy
  const trim = shade(body, 0.45)
  const seam = shade(body, 0.25)

  const fabric = cfg.fabric || 'wool'
  const dens = { wool: 6, 'wool-premium': 7, linen: 9, velvet: 12 }[fabric] || 6
  const texOpacity = { wool: 0.1, 'wool-premium': 0.09, linen: 0.16, velvet: 0.14 }[fabric] || 0.1

  const patterns = {
    wool: (
      <pattern id={`${uid}-tex`} width={dens} height={dens} patternUnits="userSpaceOnUse">
        <path d={`M0 0 H${dens} M0 0 V${dens}`} stroke="#fff" strokeWidth="0.6" opacity="0.9" />
      </pattern>
    ),
    'wool-premium': (
      <pattern id={`${uid}-tex`} width={dens} height={dens} patternUnits="userSpaceOnUse">
        <path
          d={`M0 ${dens} L${dens} 0 M-1 1 L1 -1 M${dens - 1} ${dens + 1} L${dens + 1} ${dens - 1}`}
          stroke="#fff"
          strokeWidth="0.55"
          opacity="0.9"
        />
      </pattern>
    ),
    linen: (
      <pattern id={`${uid}-tex`} width={dens} height={dens} patternUnits="userSpaceOnUse">
        <path d={`M0 1 H${dens}`} stroke="#fff" strokeWidth="1.1" opacity="0.85" />
        <path d={`M1 0 V${dens}`} stroke="#fff" strokeWidth="0.7" opacity="0.7" />
        <path d={`M0 ${dens / 2} H${dens}`} stroke="#000" strokeWidth="0.5" opacity="0.35" />
      </pattern>
    ),
    velvet: (
      <pattern id={`${uid}-tex`} width={dens} height={dens} patternUnits="userSpaceOnUse">
        <rect width={dens} height={dens} fill={`url(#${uid}-velvet)`} />
        <path d={`M${dens / 2} 0 V${dens}`} stroke="#fff" strokeWidth="2.4" opacity="0.28" />
        <path d={`M0 0 V${dens}`} stroke="#fff" strokeWidth="1" opacity="0.14" />
      </pattern>
    ),
  }

  return (
    <svg
      viewBox="0 0 400 470"
      className={className}
      role="img"
      aria-label={`Jacket preview: ${cfg.colour}, ${cfg.fabric} fabric${cfg.lining ? ', silk lining' : ''}${cfg.embroidery && cfg.embroideryName ? `, name ${cfg.embroideryName}` : ''}${cfg.pocket ? ', extra pocket' : ''}`}
    >
      <defs>
        <linearGradient id={`${uid}-velvet`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0.16" />
          <stop offset="0.5" stopColor="#000" stopOpacity="0.12" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.16" />
        </linearGradient>
        <linearGradient id={`${uid}-sheen`} x1="0" y1="0" x2="1" y2="0.3">
          <stop offset="0" stopColor="#fff" stopOpacity="0.2" />
          <stop offset="0.45" stopColor="#fff" stopOpacity="0.02" />
          <stop offset="1" stopColor="#000" stopOpacity="0.18" />
        </linearGradient>
        <linearGradient id={`${uid}-silk`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E8D9B8" />
          <stop offset="0.5" stopColor="#C2A15D" />
          <stop offset="1" stopColor="#A8873F" />
        </linearGradient>
        <filter id={`${uid}-blur`} x="-40%" y="-200%" width="180%" height="500%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
        <clipPath id={`${uid}-clip`}>
          <path d="M108 108 C130 92 160 84 178 82 L222 82 C240 84 270 92 292 108 C302 160 304 300 300 412 L100 412 C96 300 98 160 108 108 Z" />
          <path d="M108 108 C78 116 58 140 52 176 C46 216 42 270 44 316 L84 326 C90 300 94 260 96 220 C98 196 100 178 104 164 Z" />
          <path d="M292 108 C322 116 342 140 348 176 C354 216 358 270 356 316 L316 326 C310 300 306 260 304 220 C302 196 300 178 296 164 Z" />
        </clipPath>
        {patterns[fabric] || patterns.wool}
      </defs>

      {/* floor shadow */}
      <ellipse cx="200" cy="446" rx="132" ry="9" fill="#0F1A2E" opacity="0.16" filter={`url(#${uid}-blur)`} />

      {/* sleeves */}
      <path
        d="M108 108 C78 116 58 140 52 176 C46 216 42 270 44 316 L84 326 C90 300 94 260 96 220 C98 196 100 178 104 164 Z"
        fill={body}
      />
      <path
        d="M292 108 C322 116 342 140 348 176 C354 216 358 270 356 316 L316 326 C310 300 306 260 304 220 C302 196 300 178 296 164 Z"
        fill={body}
      />

      {/* body */}
      <path
        d="M108 108 C130 92 160 84 178 82 L222 82 C240 84 270 92 292 108 C302 160 304 300 300 412 L100 412 C96 300 98 160 108 108 Z"
        fill={body}
      />

      {/* fabric texture + sheen over the whole garment */}
      <g clipPath={`url(#${uid}-clip)`}>
        <rect x="0" y="0" width="400" height="470" fill={`url(#${uid}-tex)`} opacity={texOpacity} />
        <rect x="0" y="0" width="400" height="470" fill={`url(#${uid}-sheen)`} />
      </g>

      {/* seams: armhole + side */}
      <g stroke={seam} strokeWidth="1.6" fill="none" opacity="0.75">
        <path d="M108 108 C104 130 102 148 101 168" />
        <path d="M292 108 C296 130 298 148 299 168" />
        <path d="M100 412 C98 400 98 388 99 376" opacity="0.4" />
        <path d="M300 412 C302 400 302 388 301 376" opacity="0.4" />
      </g>

      {/* cuffs (contrast, like the workshop sample) */}
      <path d="M44 300 L84 310 L84 326 L44 316 Z" fill={trim} />
      <path d="M356 300 L316 310 L316 326 L356 316 Z" fill={trim} />

      {/* silk lining flash inside the collar */}
      <path d="M176 82 L224 82 L216 114 L200 102 L184 114 Z" fill={`url(#${uid}-silk)`} />

      {/* collar */}
      <g fill={trim}>
        <path d="M200 94 L176 80 C162 74 152 78 148 88 L158 132 L200 108 Z" />
        <path d="M200 94 L224 80 C238 74 248 78 252 88 L242 132 L200 108 Z" />
      </g>
      <path
        d="M176 80 C162 74 152 78 148 88"
        fill="none"
        stroke={shade(trim, 0.3)}
        strokeWidth="2"
      />
      <path
        d="M224 80 C238 74 248 78 252 88"
        fill="none"
        stroke={shade(trim, 0.3)}
        strokeWidth="2"
      />

      {/* zip */}
      <line x1="200" y1="98" x2="200" y2="412" stroke={shade(trim, 0.35)} strokeWidth="5" />
      <line
        x1="200"
        y1="98"
        x2="200"
        y2="412"
        stroke="#B9C0C9"
        strokeWidth="5"
        strokeDasharray="3 4"
      />
      <rect x="196" y="112" width="8" height="18" rx="3" fill="#9AA3AD" />
      <circle cx="200" cy="134" r="4" fill="#9AA3AD" />

      {/* lower welt pockets */}
      <path d="M124 322 L170 306" stroke={trim} strokeWidth="7" strokeLinecap="round" />
      <path d="M276 322 L230 306" stroke={trim} strokeWidth="7" strokeLinecap="round" />

      {/* extra inside pocket */}
      {cfg.pocket && (
        <path
          d="M244 196 L286 186"
          stroke={trim}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="8 5"
        />
      )}

      {/* embroidered name */}
      {cfg.embroidery && cfg.embroideryName ? (
        <text
          x="152"
          y="204"
          textAnchor="middle"
          fill="#E8D9B8"
          stroke={body}
          strokeWidth="2.6"
          paintOrder="stroke"
          fontFamily="Cormorant, Georgia, serif"
          fontSize="21"
          fontWeight="600"
          letterSpacing="1.5"
        >
          {cfg.embroideryName.slice(0, 14)}
        </text>
      ) : (
        <circle cx="152" cy="200" r="5" fill={trim} opacity="0.9" />
      )}
    </svg>
  )
}
