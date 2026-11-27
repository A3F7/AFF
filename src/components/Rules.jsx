import { useLang } from '../lang.jsx'

export default function Rules() {
  const { t } = useLang()
  const r = t.rules

  return (
    <section className="section rules">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow reveal">{r.eyebrow}</span>
          <h2 className="h2 reveal" style={{ '--reveal-delay': '60ms' }}>
            {r.title}
          </h2>
          <span className="stitch reveal" style={{ '--reveal-delay': '120ms' }} />
        </div>

        <ul className="rules-grid">
          {r.items.map((item, i) => (
            <li
              className="rule-card reveal"
              key={item.title}
              style={{ '--reveal-delay': `${(i % 3) * 80}ms` }}
            >
              <span className="rule-num num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
