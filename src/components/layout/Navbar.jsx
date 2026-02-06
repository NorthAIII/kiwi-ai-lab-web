import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronRight } from 'lucide-react'
import KiwiLogo from '../ui/KiwiLogo'

const navLinks = [
  { key: 'home', path: '/' },
  { key: 'services', path: '/services' },
  { key: 'pricing', path: '/pricing' },
  { key: 'studio', path: '/studio' },
  { key: 'contact', path: '/contact' },
]

export default function Navbar() {
  const { t } = useTranslation()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass border-b border-white/[0.06] shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <KiwiLogo size={34} />
              <div className="flex flex-col">
                <span className="text-white font-bold text-base leading-tight tracking-tight">
                  Kiwi<span className="text-kiwi-500">AI</span>
                </span>
                <span className="text-dark-300 text-[10px] font-medium uppercase tracking-[0.2em] leading-tight">
                  Lab
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map(({ key, path }) => {
                const isActive = location.pathname === path
                return (
                  <Link
                    key={key}
                    to={path}
                    className="relative px-4 py-2 text-sm font-medium transition-colors duration-200"
                  >
                    <span className={isActive ? 'text-white' : 'text-dark-200 hover:text-white'}>
                      {t(`nav.${key}`)}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute bottom-0 inset-x-2 h-[2px] bg-gradient-to-r from-kiwi-500 to-kiwi-600 rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                )
              })}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-kiwi-600 to-kiwi-700 rounded-xl hover:from-kiwi-500 hover:to-kiwi-600 transition-all duration-300 shadow-lg shadow-kiwi-500/20 hover:shadow-kiwi-500/30"
              >
                {t('nav.getStarted')}
                <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-xl text-dark-200 hover:text-white hover:bg-white/5 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 z-40 w-[280px] h-full glass border-l border-white/[0.06] lg:hidden"
            >
              <div className="flex flex-col pt-24 px-6">
                {navLinks.map(({ key, path }, i) => {
                  const isActive = location.pathname === path
                  return (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 + 0.1, duration: 0.3 }}
                    >
                      <Link
                        to={path}
                        className={`block py-3.5 text-base font-medium border-b border-white/[0.04] transition-colors duration-200 ${
                          isActive ? 'text-kiwi-500' : 'text-dark-200 hover:text-white'
                        }`}
                      >
                        {t(`nav.${key}`)}
                      </Link>
                    </motion.div>
                  )
                })}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.3 }}
                  className="mt-6"
                >
                  <Link
                    to="/contact"
                    className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold text-white bg-gradient-to-r from-kiwi-600 to-kiwi-700 rounded-xl"
                  >
                    {t('nav.getStarted')}
                    <ChevronRight size={14} />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
