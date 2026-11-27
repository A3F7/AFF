import { ArrowRight, Scissors, Star } from '@phosphor-icons/react'
import { useLang } from '../lang.jsx'
import Logo from './Logo.jsx'

export default function Hero() {
  const { t, isAr } = useLang()
  const h = t.hero

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <section className="hero" id="top">
      <div className="hero-bg" aria-hidden="true">
        <span className="thread thread-1" />
        <span className="thread thread-2" />
        <span className="thread thread-3" />
      </div>

      <div className="container hero-inner">
        <div className="hero-copy">
          <span className="eyebrow reveal">{h.eyebrow}</span>
          <h1 className="display reveal" style={{ '--reveal-delay': '60ms' }}>
            {h.title1}
            {' '}
            <br />
            <em>{h.title2}</em>
          </h1>
          <p className="lead reveal" style={{ '--reveal-delay': '120ms' }}>
            {h.sub}
          </p>

          <div className="hero-ctas reveal" style={{ '--reveal-delay': '180ms' }}>
            <button type="button" className="btn btn-primary" onClick={() => scrollTo('measure')}>
              {h.ctaPrimary}
              <ArrowRight size={16} className={isAr ? 'flip-x' : ''} aria-hidden="true" />
            </button>
            <button type="button" className="btn btn-outline" onClick={() => scrollTo('how')}>
              {h.ctaSecondary}
            </button>
          </div>

          <div className="hero-price reveal" style={{ '--reveal-delay': '240ms' }}>
            <span className="hero-price-label">{h.priceLabel}</span>
            <span className="hero-price-value num">
              {h.price}
              <small>{h.currency}</small>
            </span>
          </div>

          <ul className="hero-stats reveal" style={{ '--reveal-delay': '300ms' }}>
            {h.stats.map((s) => (
              <li key={s.label}>
                <strong className="num">{s.value}</strong>
                <span>{s.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-visual reveal" style={{ '--reveal-delay': '160ms' }}>
          <div className="hero-card">
            <div className="hero-card-stitch" aria-hidden="true" />
            <Logo variant="hero" className="hero-monogram" />
            <div className="hero-card-tag">
              <Scissors size={15} aria-hidden="true" />
              {isAr ? 'ورشة واحدة · قصّ بالإيد' : 'One workshop · cut by hand'}
            </div>
          </div>
          <div className="hero-seal">
            <Star size={16} weight="fill" aria-hidden="true" />
            <span>
              <strong className="num">{isAr ? '٢٥+' : '25+'}</strong>
              {isAr ? 'سنة خبرة' : 'years craft'}
            </span>
          </div>
        </div>
      </div>

      <div className="hero-marquee" aria-hidden="true">
        <div className="marquee-track">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="marquee-set">
              <span>{isAr ? 'تفصيل على المقاس' : 'MADE TO MEASURE'}</span>
              <i aria-hidden="true" />
              <span>{isAr ? 'صنع في مصر' : 'HANDMADE IN EGYPT'}</span>
              <i aria-hidden="true" />
              <span>{isAr ? 'تسليم ١٤ يوم' : '14 DAYS TO YOUR DOOR'}</span>
              <i aria-hidden="true" />
              <span>{isAr ? 'تعديل مجاني' : 'ONE FREE ADJUSTMENT'}</span>
              <i aria-hidden="true" />
              <span>{isAr ? 'دفع عربون ٣٠٪' : '30% DEPOSIT TO CONFIRM'}</span>
              <i aria-hidden="true" />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
