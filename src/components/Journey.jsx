import { useLang } from '../lang.jsx'

export default function Journey() {
  const { t } = useLang()
  const j = t.journey

  return (
    <section className="section journey" id="how">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow reveal">{j.eyebrow}</span>
          <h2 className="h2 reveal" style={{ '--reveal-delay': '60ms' }}>
            {j.title}
          </h2>
          <span className="stitch reveal" style={{ '--reveal-delay': '120ms' }} />
        </div>

        <ol className="journey-grid">
          {j.steps.map((s, i) => (
            <li className="journey-card reveal" key={s.title} style={{ '--reveal-delay': `${i * 90}ms` }}>
              <span className="journey-num" aria-hidden="true">
                {s.n}
              </span>
              <h3 className="h3">{s.title}</h3>
              <p>{s.body}</p>
              {i < j.steps.length - 1 && (
                <span className="journey-dash" aria-hidden="true" />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
