import { useMemo, useState } from 'react'
import { PencilSimple, WarningCircle, WhatsappLogo } from '@phosphor-icons/react'
import { useLang } from '../lang.jsx'
import { MEASURES, allMeasuresFilled, buildOrderMessage, isMeasureValid, priceBreakdown, waLink } from '../data.js'

export default function OrderReview({ cfg, values, onEditStep, onEditConfig }) {
  const { t, lang, fmt, isAr } = useLang()
  const o = t.order
  const [alerted, setAlerted] = useState(false)
  const price = priceBreakdown(cfg)

  const done = allMeasuresFilled(values)
  const missing = MEASURES.filter((s, i) => !isMeasureValid(values[i], s))

  const fabricLabel =
    t.configure.fabricOptions.find((f) => f.id === cfg.fabric)?.label || cfg.fabric
  const colourLabel =
    t.configure.colourOptions.find((x) => x.id === cfg.colour)?.label || cfg.colour

  const message = useMemo(
    () =>
      buildOrderMessage({
        lang,
        cfg: { ...cfg, fabricLabel, colourLabel },
        values,
        total: fmt(price.total),
      }),
    [lang, cfg, fabricLabel, colourLabel, values, price.total, fmt]
  )

  const details = [
    { label: t.configure.fabric, value: fabricLabel },
    { label: t.configure.colour, value: colourLabel },
    {
      label: t.configure.silkLining,
      value: cfg.lining ? (isAr ? 'أيوه' : 'Yes') : (isAr ? 'لا' : 'No'),
    },
    {
      label: t.configure.embroidery,
      value: cfg.embroidery
        ? cfg.embroideryName || (isAr ? 'أيوه' : 'Yes')
        : isAr
          ? 'لا'
          : 'No',
    },
    {
      label: t.configure.extraPocket,
      value: cfg.pocket ? (isAr ? 'أيوه' : 'Yes') : isAr ? 'لا' : 'No',
    },
  ]

  const handleSend = (e) => {
    if (!done) {
      e.preventDefault()
      setAlerted(true)
    }
  }

  return (
    <section className="section order" id="order">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow reveal">{o.eyebrow}</span>
          <h2 className="h2 reveal" style={{ '--reveal-delay': '60ms' }}>
            {o.title}
          </h2>
          <p className="lead reveal" style={{ '--reveal-delay': '120ms' }}>
            {o.sub}
          </p>
        </div>

        <div className="order-grid">
          {/* jacket summary */}
          <div className="order-card card reveal">
            <div className="order-card-head">
              <h3 className="h3">{o.jacketTitle}</h3>
              <button type="button" className="link-btn" onClick={onEditConfig}>
                <PencilSimple size={14} aria-hidden="true" />
                {o.change}
              </button>
            </div>
            <dl className="summary-list">
              {details.map((d) => (
                <div className="summary-row" key={d.label}>
                  <dt>{d.label}</dt>
                  <dd>{d.value}</dd>
                </div>
              ))}
            </dl>
            <div className="summary-total">
              <span>{t.configure.priceCard.total}</span>
              <strong>
                <span className="num">{fmt(price.total)}</span>
                <small>{t.configure.priceCard.currency}</small>
              </strong>
            </div>
          </div>

          {/* measurements summary */}
          <div
            className={`order-card card reveal${done ? '' : ' is-incomplete'}`}
            style={{ '--reveal-delay': '90ms' }}
          >
            <div className="order-card-head">
              <h3 className="h3">{o.measuresTitle}</h3>
              <button
                type="button"
                className="link-btn"
                onClick={() => onEditStep(0)}
              >
                <PencilSimple size={14} aria-hidden="true" />
                {o.change}
              </button>
            </div>
            <ul className="measure-summary">
              {MEASURES.map((s, i) => {
                const ok = isMeasureValid(values[i], s)
                const unit = s.kind === 'weight' ? t.measure.weightUnit : t.measure.unit
                return (
                  <li key={s.id} className={ok ? '' : 'is-missing'}>
                    <span className="ms-label">{t.measure.steps[i].name}</span>
                    <span className="ms-value num">
                      {ok ? `${String(values[i]).replace(',', '.')} ${unit}` : o.missing}
                    </span>
                    <button
                      type="button"
                      className="ms-edit"
                      onClick={() => onEditStep(i)}
                      aria-label={`${t.measure.steps[i].name} — ${o.change}`}
                    >
                      <PencilSimple size={13} aria-hidden="true" />
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        {alerted && !done && (
          <p className="order-alert" role="alert">
            <WarningCircle size={18} weight="fill" aria-hidden="true" />
            {o.missingAlert} ({missing.length}) —{' '}
            <button
              type="button"
              className="link-btn"
              onClick={() =>
                onEditStep(
                  MEASURES.findIndex((s, i) => !isMeasureValid(values[i], s))
                )
              }
            >
              {o.change}
            </button>
          </p>
        )}

        <div className="order-cta reveal">
          <a
            className={`btn btn-wa btn-lg${done ? '' : ' is-blocked'}`}
            href={done ? waLink(message) : '#measure'}
            target={done ? '_blank' : undefined}
            rel={done ? 'noopener noreferrer' : undefined}
            onClick={handleSend}
            aria-disabled={!done}
          >
            <WhatsappLogo size={20} weight="fill" aria-hidden="true" />
            {o.send}
          </a>
          <p className="order-note">{o.sendingNote}</p>
          <p className="order-deposit">{o.depositLine}</p>
        </div>
      </div>
    </section>
  )
}
