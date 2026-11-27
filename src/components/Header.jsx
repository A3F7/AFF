import { useEffect, useState } from 'react'
import { WhatsappLogo, List, X } from '@phosphor-icons/react'
import Logo from './Logo.jsx'
import { useLang } from '../lang.jsx'
import { WHATSAPP_NUMBER } from '../data.js'

const LINKS = [
  { id: 'how', key: 'how' },
  { id: 'configure', key: 'configure' },
  { id: 'measure', key: 'measure' },
  { id: 'order', key: 'order' },
]

export default function Header() {
  const { t, lang, setLang } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const go = (id) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="container header-inner">
        <a
          className="brand"
          href="#top"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          <Logo variant="header" className="brand-logo" />
        </a>

        <nav className={`main-nav${open ? ' is-open' : ''}`} aria-label="Main">
          {LINKS.map((l) => (
            <button key={l.id} type="button" onClick={() => go(l.id)}>
              {t.nav[l.key]}
            </button>
          ))}
          <a
            className="btn btn-wa nav-wa"
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsappLogo size={18} weight="fill" aria-hidden="true" />
            {t.nav.cta}
          </a>
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="lang-switch"
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            aria-label={t.common.langSwitchAria}
          >
            {t.common.langSwitch}
          </button>
          <a
            className="icon-wa"
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.nav.cta}
          >
            <WhatsappLogo size={22} weight="fill" aria-hidden="true" />
          </a>
          <button
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={24} aria-hidden="true" /> : <List size={24} aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>
  )
}
