import { WhatsappLogo, InstagramLogo, TiktokLogo, Phone } from '@phosphor-icons/react'
import { useLang } from '../lang.jsx'
import Logo from './Logo.jsx'
import { WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from '../data.js'

export default function Footer() {
  const { t } = useLang()
  const f = t.footer

  return (
    <footer className="site-footer">
      <div className="footer-stitch" aria-hidden="true" />
      <div className="container footer-inner">
        <div className="footer-brand">
          <Logo variant="footer" className="footer-mark" />
          <div>
            <p>{f.tagline}</p>
          </div>
        </div>

        <div className="footer-col">
          <h3>{f.contact}</h3>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsappLogo size={17} weight="fill" aria-hidden="true" />
            {f.whatsapp}
          </a>
          <a href={`tel:+${WHATSAPP_NUMBER}`}>
            <Phone size={17} aria-hidden="true" />
            <span className="num" dir="ltr">
              {WHATSAPP_DISPLAY}
            </span>
          </a>
        </div>

        <div className="footer-col">
          <h3>{f.follow}</h3>
          <div className="footer-social">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <InstagramLogo size={20} aria-hidden="true" />
            </a>
            <a
              href="https://www.tiktok.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
            >
              <TiktokLogo size={20} aria-hidden="true" />
            </a>
          </div>
          <p className="footer-note">{f.note}</p>
        </div>
      </div>

      <div className="container footer-base">
        <p>{f.rights}</p>
      </div>
    </footer>
  )
}
