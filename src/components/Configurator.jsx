import { Check, Info } from '@phosphor-icons/react'
import { useLang } from '../lang.jsx'
import JacketPreview from './JacketPreview.jsx'
import { EXTRAS_PRICE, FABRIC_PRICE, priceBreakdown } from '../data.js'

export default function Configurator({ cfg, setCfg }) {
  const { t, fmt, isAr } = useLang()
  const c = t.configure
  const price = priceBreakdown(cfg)

  const set = (patch) => setCfg((prev) => ({ ...prev, ...patch }))

  const fabricLabel =
    c.fabricOptions.find((f) => f.id === cfg.fabric)?.label || cfg.fabric
  const colourLabel =
    c.colourOptions.find((x) => x.id === cfg.colour)?.label || cfg.colour

  const extrasRows = []
  if (cfg.lining)
    extrasRows.push({ label: c.silkLining, value: EXTRAS_PRICE.lining })
  if (cfg.embroidery)
    extrasRows.push({ label: c.embroidery, value: EXTRAS_PRICE.embroidery })
  if (cfg.pocket)
    extrasRows.push({ label: c.extraPocket, value: EXTRAS_PRICE.pocket })
  if (price.fabric > 0)
    extrasRows.push({ label: fabricLabel, value: price.fabric })

  return (
    <section className="section configure" id="configure">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow reveal">{c.eyebrow}</span>
          <h2 className="h2 reveal" style={{ '--reveal-delay': '60ms' }}>
            {c.title}
          </h2>
          <p className="lead reveal" style={{ '--reveal-delay': '120ms' }}>
            {c.sub}
          </p>
        </div>

        <div className="config-grid">
          {/* ---------- preview + price ---------- */}
          <div className="config-preview-col">
            <div className="preview-card reveal">
              <span className="preview-tag">{c.previewLabel}</span>
              <JacketPreview cfg={cfg} className="preview-svg" />
              <div className="preview-chips">
                <span className="chip">{fabricLabel}</span>
                <span className="chip chip-gold">{colourLabel}</span>
              </div>
            </div>

            <aside className="price-card" aria-live="polite">
              <h3 className="price-title">{c.priceCard.title}</h3>

              <dl className="price-rows">
                <div className="price-row">
                  <dt>{c.priceCard.base}</dt>
                  <dd className="num">{fmt(price.base)}</dd>
                </div>
                {extrasRows.map((r) => (
                  <div className="price-row price-row-extras" key={r.label}>
                    <dt>{r.label}</dt>
                    <dd className="num">+{fmt(r.value)}</dd>
                  </div>
                ))}
                <div className="price-row price-row-total">
                  <dt>{c.priceCard.total}</dt>
                  <dd>
                    <span className="price-total num" key={price.total}>
                      {fmt(price.total)}
                    </span>
                    <span className="price-cur">{c.priceCard.currency}</span>
                  </dd>
                </div>
              </dl>

              <div className="price-deposit">
                <strong>
                  {c.priceCard.deposit}:{' '}
                  <span className="num">
                    {fmt(Math.round(price.total * 0.3))}–{fmt(Math.round(price.total * 0.5))}
                  </span>
                </strong>
                <p>{c.priceCard.depositNote}</p>
              </div>

              <p className="price-note">
                <Info size={15} aria-hidden="true" />
                {c.priceCard.confirmed}
              </p>
            </aside>
          </div>

          {/* ---------- options ---------- */}
          <div className="config-options">
            <fieldset className="opt-group reveal">
              <legend>{c.fabric}</legend>
              <div className="opt-list">
                {c.fabricOptions.map((f) => (
                  <label
                    key={f.id}
                    className={`opt-row${cfg.fabric === f.id ? ' is-selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="fabric"
                      value={f.id}
                      checked={cfg.fabric === f.id}
                      onChange={() => set({ fabric: f.id })}
                    />
                    <span className="opt-main">
                      <strong>{f.label}</strong>
                      <small>{f.note}</small>
                    </span>
                    <span className="opt-side">
                      {FABRIC_PRICE[f.id] > 0 ? (
                        <span className="chip chip-price num">
                          +{fmt(FABRIC_PRICE[f.id])}
                        </span>
                      ) : (
                        <span className="opt-included">
                          <Check size={13} weight="bold" aria-hidden="true" />
                        </span>
                      )}
                      <span className="opt-check" aria-hidden="true">
                        <Check size={13} weight="bold" />
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="opt-group reveal" style={{ '--reveal-delay': '80ms' }}>
              <legend>{c.colour}</legend>
              <div className="swatch-grid">
                {c.colourOptions.map((col) => (
                  <label
                    key={col.id}
                    className={`swatch${cfg.colour === col.id ? ' is-selected' : ''}`}
                    style={{ '--swatch': `var(--c-${col.id})` }}
                  >
                    <input
                      type="radio"
                      name="colour"
                      value={col.id}
                      checked={cfg.colour === col.id}
                      onChange={() => set({ colour: col.id })}
                    />
                    <span className="swatch-dot" aria-hidden="true" />
                    <span className="swatch-name">{col.label}</span>
                    {cfg.colour === col.id && (
                      <span className="swatch-check" aria-hidden="true">
                        <Check size={12} weight="bold" />
                      </span>
                    )}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="opt-group reveal" style={{ '--reveal-delay': '140ms' }}>
              <legend>{c.extras}</legend>
              <div className="toggle-list">
                <Toggle
                  id="opt-lining"
                  label={c.silkLining}
                  note={c.silkLiningNote}
                  price={EXTRAS_PRICE.lining}
                  checked={cfg.lining}
                  onChange={(v) => set({ lining: v })}
                />
                <Toggle
                  id="opt-pocket"
                  label={c.extraPocket}
                  note={c.extraPocketNote}
                  price={EXTRAS_PRICE.pocket}
                  checked={cfg.pocket}
                  onChange={(v) => set({ pocket: v })}
                />
                <div className="toggle-stack">
                  <Toggle
                    id="opt-emb"
                    label={c.embroidery}
                    note={c.embroideryNote}
                    price={EXTRAS_PRICE.embroidery}
                    checked={cfg.embroidery}
                    onChange={(v) => set({ embroidery: v })}
                  />
                  {cfg.embroidery && (
                    <div className="emb-field">
                      <label className="field-label" htmlFor="emb-name">
                        {c.embroideryPlaceholder}
                      </label>
                      <input
                        id="emb-name"
                        className="input"
                        type="text"
                        maxLength={14}
                        value={cfg.embroideryName}
                        placeholder={isAr ? 'مثال: أحمد' : 'e.g. AHMED'}
                        onChange={(e) => set({ embroideryName: e.target.value })}
                      />
                    </div>
                  )}
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </section>
  )
}

function Toggle({ id, label, note, price, checked, onChange }) {
  const { fmt } = useLang()
  return (
    <div className="toggle-card">
      <label className="toggle-row" htmlFor={id}>
        <span className="opt-main">
          <strong>{label}</strong>
          <small>{note}</small>
        </span>
        <span className="opt-side">
          <span className="chip chip-price num">+{fmt(price)}</span>
          <span className="switch">
            <input
              id={id}
              type="checkbox"
              checked={checked}
              onChange={(e) => onChange(e.target.checked)}
            />
            <span className="switch-track" aria-hidden="true">
              <span className="switch-thumb" />
            </span>
          </span>
        </span>
      </label>
    </div>
  )
}
