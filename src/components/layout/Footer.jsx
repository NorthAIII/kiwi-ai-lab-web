import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { supportedLanguages } from '../../i18n/i18n.js'
import { Globe, ArrowUpRight, Mail } from 'lucide-react'
import KiwiLogo from '../ui/KiwiLogo'

export default function Footer() {
  const { t, i18n } = useTranslation()
  const currentYear = new Date().getFullYear()

  const handleLanguageChange = (code) => {
    i18n.changeLanguage(code)
  }

  return (
    <footer className="relative border-t border-white/[0.04]">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-kiwi-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="py-12 lg:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <KiwiLogo size={28} />
              <span className="font-display text-white font-bold text-sm">
                Kiwi<span className="text-kiwi-500">AI</span>{' '}
                <span className="text-dark-300 font-medium">Lab</span>
              </span>
            </div>
            <p className="text-dark-300 text-sm leading-relaxed max-w-xs mb-3">
              {t('footer.description')}
            </p>
            <a
              href="mailto:info@kiwiailab.com"
              className="inline-flex items-center gap-2 text-dark-300 text-sm hover:text-kiwi-500 transition-colors duration-200"
            >
              <Mail size={14} className="text-kiwi-500/60" />
              info@kiwiailab.com
            </a>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-[0.15em] mb-4">
              {t('footer.navigation')}
            </h4>
            <ul className="space-y-2.5">
              {['home', 'services', 'pricing', 'studio', 'contact'].map((key) => (
                <li key={key}>
                  <Link
                    to={key === 'home' ? '/' : `/${key}`}
                    className="text-dark-300 text-sm hover:text-kiwi-500 transition-colors duration-200"
                  >
                    {t(`nav.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-[0.15em] mb-4">
              {t('footer.services')}
            </h4>
            <ul className="space-y-2.5">
              {['strategy', 'llm', 'automation'].map((key) => (
                <li key={key}>
                  <Link
                    to="/services"
                    className="text-dark-300 text-sm hover:text-kiwi-500 transition-colors duration-200 flex items-center gap-1 group"
                  >
                    {t(`services.items.${key}.title`)}
                    <ArrowUpRight
                      size={11}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Language Switcher */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-[0.15em] mb-4 flex items-center gap-2">
              <Globe size={13} className="text-kiwi-500" />
              {t('footer.language')}
            </h4>
            <div className="grid grid-cols-2 gap-1.5">
              {supportedLanguages.map(({ code, label, flag }) => {
                const isActive = i18n.language === code || i18n.language?.startsWith(code)
                return (
                  <button
                    key={code}
                    onClick={() => handleLanguageChange(code)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-kiwi-500/10 text-kiwi-500 border border-kiwi-500/20'
                        : 'text-dark-300 hover:text-white hover:bg-white/[0.04] border border-transparent'
                    }`}
                  >
                    <span className="text-sm">{flag}</span>
                    <span>{label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-dark-400 text-xs">
            &copy; {currentYear} Kiwi AI Lab. {t('footer.rights')}
          </p>
          <p className="text-dark-500 text-xs italic">
            {t('footer.tagline')}
          </p>
        </div>
      </div>
    </footer>
  )
}
