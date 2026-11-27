/**
 * Real brand logo from public/logo.jpg, used as-is (no distortion/added text).
 * `variant` controls sizing; `blend` enables theme blending (drop light bg).
 */
export default function Logo({ className = '', variant = 'inline', blend = true, alt = 'Ahmed Fayed' }) {
  const cls = ['af-logo', `af-logo--${variant}`, blend ? 'af-logo--blend' : '', className]
    .filter(Boolean)
    .join(' ')
  return (
    <img
      src="/logo.png"
      alt={alt}
      width={247}
      height={172}
      className={cls}
      loading="eager"
      decoding="async"
      draggable={false}
    />
  )
}
