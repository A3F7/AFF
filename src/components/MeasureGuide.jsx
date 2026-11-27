import { useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, CheckCircle, Ruler } from '@phosphor-icons/react'
import { useLang } from '../lang.jsx'
import MeasureFigure from './MeasureFigure.jsx'
import { MEASURES, isMeasureValid, allMeasuresFilled } from '../data.js'

export default function MeasureGuide({ values, setValues, onDone, initialStep = 0 }) {
  const { t, isAr } = useLang()
  const m = t.measure
  const [step, setStep] = useState(() =>
    Math.min(Math.max(0, initialStep), MEASURES.length - 1)
  )
  const [touched, setTouched] = useState({})
  const inputRef = useRef(null)

  const spec = MEASURES[step]
  const stepInfo = m.steps[step]
  const raw = values[step] ?? ''
  const valid = isMeasureValid(raw, spec)
  const showError = touched[step] && raw !== '' && !valid
  const emptyError = touched[step] && raw === ''
  const done = allMeasuresFilled(values)
  const isLast = step === MEASURES.length - 1
  const isWeight = spec.kind === 'weight'
  const unit = isWeight ? m.weightUnit : m.unit

  const go = (next) => {
    if (next > step) {
      setTouched((t) => ({ ...t, [step]: true }))
      if (!valid) {
        inputRef.current?.focus()
        return
      }
    }
    if (next > MEASURES.length - 1) {
      onDone?.()
      return
    }
    setStep(Math.max(0, next))
    requestAnimationFrame(() => inputRef.current?.focus({ preventScroll: true }))
  }

  const update = (v) => {
    const next = [...values]
    next[step] = v
    setValues(next)
  }

  const jumpTo = (i) => {
    setStep(i)
    requestAnimationFrame(() => inputRef.current?.focus({ preventScroll: true }))
  }

  const missingCount = MEASURES.filter((s, i) => !isMeasureValid(values[i], s)).length

  return (
    <section className="section measure" id="measure">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow reveal">{m.eyebrow}</span>
          <h2 className="h2 reveal" style={{ '--reveal-delay': '60ms' }}>
            {m.title}
          </h2>
          <p className="lead reveal" style={{ '--reveal-delay': '120ms' }}>
            {m.sub}
          </p>
        </div>

        <div className="measure-grid">
          {/* ---------- figure + step nav ---------- */}
          <div className="measure-visual reveal">
            <div className="figure-card">
              <span className="figure-tag">
                <Ruler size={15} aria-hidden="true" />
                {m.tapeAlt}: {stepInfo.name}
              </span>
              <MeasureFigure step={step} label={`${stepInfo.name} — ${stepInfo.where}`} />
            </div>

            <nav className="step-dots" aria-label={m.eyebrow}>
              {MEASURES.map((s, i) => {
                const filled = isMeasureValid(values[i], s)
                return (
                  <button
                    key={s.id}
                    type="button"
                    className={`step-dot${i === step ? ' is-active' : ''}${
                      filled ? ' is-filled' : ''
                    }`}
                    aria-current={i === step ? 'step' : undefined}
                    aria-label={`${i + 1}. ${m.steps[i].name}${filled ? ` — ${m.done}` : ''}`}
                    onClick={() => jumpTo(i)}
                  >
                    <span className="num">{i + 1}</span>
                  </button>
                )
              })}
            </nav>
          </div>

          {/* ---------- step form ---------- */}
          <div className="measure-panel card">
            <p className="step-counter num" aria-live="polite">
              {m.stepOf(step + 1, MEASURES.length)}
            </p>

            <div className="step-track" aria-hidden="true">
              <span style={{ width: `${((step + 1) / MEASURES.length) * 100}%` }} />
            </div>

            <div className="step-body" key={step}>
              <h3 className="h3">{stepInfo.name}</h3>
              <p className="step-where">
                <span>{stepInfo.where}</span>
              </p>
              <p className="step-tip">{stepInfo.tip}</p>

              <div className="field measure-field">
                <label className="field-label" htmlFor="measure-input">
                  {stepInfo.name} ({unit})
                </label>
                <div className="input-wrap">
                  <input
                    id="measure-input"
                    ref={inputRef}
                    className="input num"
                    type="text"
                    inputMode="decimal"
                    autoComplete="off"
                    value={raw}
                    aria-describedby={`measure-hint measure-error-${step}`}
                    aria-invalid={showError || emptyError ? 'true' : undefined}
                    placeholder={isWeight ? '82' : '40'}
                    onChange={(e) => update(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, [step]: true }))}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        go(step + 1)
                      }
                    }}
                  />
                  <span className="input-unit">{unit}</span>
                </div>
                <p className="hint-text" id="measure-hint">
                  {m.skipHint}
                </p>
                <p
                  className="error-text"
                  id={`measure-error-${step}`}
                  role="alert"
                  style={{ visibility: showError || emptyError ? 'visible' : 'hidden' }}
                >
                  {emptyError ? m.required : m.range(spec.min, spec.max, unit)}
                </p>
              </div>

              <div className="step-actions">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => go(step - 1)}
                  disabled={step === 0}
                >
                  <ArrowLeft size={16} className={isAr ? 'flip-x' : ''} aria-hidden="true" />
                  {m.prev}
                </button>

                {!isLast ? (
                  <button type="button" className="btn btn-primary" onClick={() => go(step + 1)}>
                    {m.next}
                    <ArrowRight size={16} className={isAr ? 'flip-x' : ''} aria-hidden="true" />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => go(step + 1)}
                  >
                    {m.finish}
                    <ArrowRight size={16} className={isAr ? 'flip-x' : ''} aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>

            <p className={`measure-done${done ? ' is-on' : ''}`} aria-live="polite">
              <CheckCircle size={17} weight="fill" aria-hidden="true" />
              {done
                ? m.complete
                : isAr
                  ? `باقي ${missingCount} مقاس`
                  : `${missingCount} measurement${missingCount === 1 ? '' : 's'} to go`}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
