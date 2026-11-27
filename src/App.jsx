import { useCallback, useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Journey from './components/Journey.jsx'
import Configurator from './components/Configurator.jsx'
import MeasureGuide from './components/MeasureGuide.jsx'
import OrderReview from './components/OrderReview.jsx'
import Rules from './components/Rules.jsx'
import Footer from './components/Footer.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import { MEASURES } from './data.js'
import { useLang } from './lang.jsx'

const DEFAULT_CFG = {
  fabric: 'wool',
  colour: 'navy',
  lining: false,
  embroidery: false,
  embroideryName: '',
  pocket: false,
}

/** Reveal-on-scroll: one shared observer for every [class~="reveal"] element. */
const revealed = new WeakSet()
let revealIO = null

function observeReveals() {
  const els = document.querySelectorAll('.reveal')
  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-visible'))
    return
  }
  if (!revealIO) {
    revealIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            revealIO.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    )
  }
  els.forEach((el) => {
    if (revealed.has(el)) return
    revealed.add(el)
    revealIO.observe(el)
  })
}

/** Runs after every render so remounted sections are picked up too. */
function useReveal() {
  useEffect(observeReveals)
}

export default function App() {
  useReveal()
  const { t } = useLang()

  const [cfg, setCfg] = useState(DEFAULT_CFG)
  const [values, setValues] = useState(() => MEASURES.map(() => ''))

  // MeasureGuide keeps its own current step internally. To jump to a specific
  // measurement from the order card we remount it (key bump) with a target step.
  const [guide, setGuide] = useState({ key: 0, step: 0 })

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  const editStep = useCallback((i) => {
    setGuide((g) => ({ key: g.key + 1, step: Math.max(0, i) }))
    scrollTo('measure')
  }, [])

  const editConfig = useCallback(() => scrollTo('configure'), [])

  // canonical URL for the current origin (single-page site)
  useEffect(() => {
    let link = document.querySelector('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = window.location.origin + window.location.pathname
  }, [])

  return (
    <>
      <ScrollProgress />
      <a className="skip-link" href="#main">
        {t.common.skip}
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Journey />
        <Configurator cfg={cfg} setCfg={setCfg} />
        <MeasureGuide
          key={guide.key}
          initialStep={guide.step}
          values={values}
          setValues={setValues}
          onDone={() => scrollTo('order')}
        />
        <OrderReview
          cfg={cfg}
          values={values}
          onEditStep={editStep}
          onEditConfig={editConfig}
        />
        <Rules />
      </main>
      <Footer />
    </>
  )
}
