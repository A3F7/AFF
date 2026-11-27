/**
 * Stylised tailor's figure. Each of the 8 steps highlights its own zone with
 * an animated gold "tape" line (stroke draw + gentle pulse) over the outline.
 */

const ZONES = {
  // 0 height — vertical tape floor to head
  height: (
    <>
      <line className="zone-line" x1="46" y1="30" x2="46" y2="330" />
      <line className="zone-cap" x1="38" y1="30" x2="54" y2="30" />
      <line className="zone-cap" x1="38" y1="330" x2="54" y2="330" />
      <line className="zone-guide" x1="54" y1="34" x2="120" y2="34" />
      <line className="zone-guide" x1="54" y1="330" x2="120" y2="330" />
    </>
  ),
  // 1 weight — whole figure pulses
  weight: <rect className="zone-halo" x="96" y="26" width="88" height="306" rx="44" />,
  // 2 neck — arc around the neck base
  neck: (
    <>
      <ellipse className="zone-line" cx="140" cy="74" rx="24" ry="9" />
      <circle className="zone-dot" cx="140" cy="74" r="4" />
    </>
  ),
  // 3 shoulder — edge to edge
  shoulder: (
    <>
      <line className="zone-line" x1="102" y1="92" x2="178" y2="92" />
      <line className="zone-cap" x1="102" y1="84" x2="102" y2="100" />
      <line className="zone-cap" x1="178" y1="84" x2="178" y2="100" />
      <circle className="zone-dot" cx="102" cy="92" r="4" />
      <circle className="zone-dot zone-dot-b" cx="178" cy="92" r="4" />
    </>
  ),
  // 4 chest — fullest part
  chest: (
    <>
      <path className="zone-line" d="M104 138 Q140 148 176 138" />
      <line className="zone-cap" x1="104" y1="130" x2="104" y2="146" />
      <line className="zone-cap" x1="176" y1="130" x2="176" y2="146" />
      <circle className="zone-dot" cx="104" cy="140" r="4" />
      <circle className="zone-dot zone-dot-b" cx="176" cy="140" r="4" />
    </>
  ),
  // 5 waist — natural waist
  waist: (
    <>
      <path className="zone-line" d="M110 194 Q140 202 170 194" />
      <line className="zone-cap" x1="110" y1="186" x2="110" y2="202" />
      <line className="zone-cap" x1="170" y1="186" x2="170" y2="202" />
      <circle className="zone-dot" cx="110" cy="196" r="4" />
      <circle className="zone-dot zone-dot-b" cx="170" cy="196" r="4" />
    </>
  ),
  // 6 sleeve — shoulder tip to wrist bone
  sleeve: (
    <>
      <path className="zone-line" d="M104 96 L78 190 L74 246" />
      <line className="zone-cap" x1="96" y1="92" x2="112" y2="100" />
      <line className="zone-cap" x1="66" y1="246" x2="82" y2="246" />
      <circle className="zone-dot" cx="104" cy="96" r="4" />
      <circle className="zone-dot zone-dot-b" cx="74" cy="246" r="4" />
    </>
  ),
  // 7 jacket length — base of neck down
  jacketLength: (
    <>
      <line className="zone-line" x1="140" y1="80" x2="140" y2="244" />
      <line className="zone-cap" x1="130" y1="80" x2="150" y2="80" />
      <line className="zone-line zone-line-h" x1="112" y1="244" x2="168" y2="244" />
      <circle className="zone-dot" cx="140" cy="80" r="4" />
      <circle className="zone-dot zone-dot-b" cx="140" cy="244" r="4" />
    </>
  ),
}

const KEYS = [
  'height',
  'weight',
  'neck',
  'shoulder',
  'chest',
  'waist',
  'sleeve',
  'jacketLength',
]

export default function MeasureFigure({ step, label }) {
  const zone = ZONES[KEYS[step]] || null
  return (
    <svg
      viewBox="0 0 240 360"
      className="measure-figure"
      role="img"
      aria-label={label}
      key={step}
    >
      {/* body outline: a calm tailor's mannequin silhouette */}
      <g className="figure-body">
        {/* head */}
        <circle cx="140" cy="42" r="20" />
        {/* neck */}
        <path d="M131 60 L131 72 M149 60 L149 72" />
        {/* shoulders + torso */}
        <path d="M102 92 Q140 78 178 92 L172 150 Q170 190 166 214 L114 214 Q110 190 108 150 Z" />
        {/* arms */}
        <path d="M104 94 Q88 130 80 176 L74 246" />
        <path d="M176 94 Q192 130 200 176 L206 246" />
        {/* hips + legs */}
        <path d="M114 214 Q112 250 116 288 L120 330" />
        <path d="M166 214 Q168 250 164 288 L160 330" />
        <path d="M140 214 L140 300" opacity="0.35" />
        {/* hands */}
        <circle cx="72" cy="256" r="8" />
        <circle cx="208" cy="256" r="8" />
        {/* feet */}
        <path d="M120 330 L112 344 M160 330 L168 344" />
      </g>

      {/* ground */}
      <line className="figure-ground" x1="40" y1="348" x2="216" y2="348" />

      <g className="figure-zone">{zone}</g>
    </svg>
  )
}
