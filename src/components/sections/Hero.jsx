import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Zap, Globe, Shield } from 'lucide-react'

const stats = [
  { key: 'projects', value: '50+', icon: Zap },
  { key: 'satisfaction', value: '99%', icon: Sparkles },
  { key: 'uptime', value: '99.9%', icon: Shield },
  { key: 'languages', value: '6', icon: Globe },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Hero() {
  const { t } = useTranslation()

  return (
    <section className="relative min-h-screen flex items-center pt-20 lg:pt-0 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(163,230,53,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(163,230,53,0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* Radial fade */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--color-dark-950)_70%)]" />
        {/* Top glow */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-kiwi-500/[0.06] rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-kiwi-500/10 mb-8"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-kiwi-500 animate-pulse" />
            <span className="text-kiwi-500 text-xs font-semibold uppercase tracking-[0.15em]">
              {t('hero.badge')}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6"
          >
            <span className="text-white">{t('hero.titleLine1')}</span>
            <br />
            <span className="text-gradient-kiwi">{t('hero.titleLine2')}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-dark-200 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto mb-10"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/contact"
              className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-kiwi-600 to-kiwi-700 rounded-2xl hover:from-kiwi-500 hover:to-kiwi-600 transition-all duration-300 shadow-xl shadow-kiwi-500/20 hover:shadow-kiwi-500/30"
            >
              {t('hero.cta')}
              <ArrowRight
                size={16}
                className="group-hover:translate-x-0.5 transition-transform duration-200"
              />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-dark-100 glass rounded-2xl border border-white/[0.06] hover:border-kiwi-500/20 hover:text-white transition-all duration-300"
            >
              {t('hero.ctaSecondary')}
            </Link>
          </motion.div>
        </div>

        {/* Stats Strip */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={5}
          className="mt-20 lg:mt-28 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-3xl mx-auto"
        >
          {stats.map(({ key, value, icon: Icon }) => (
            <div
              key={key}
              className="glass rounded-2xl px-5 py-4 text-center group hover:border-kiwi-500/10 transition-colors duration-300"
            >
              <Icon
                size={18}
                className="mx-auto mb-2 text-kiwi-500/60 group-hover:text-kiwi-500 transition-colors duration-300"
              />
              <p className="text-white text-2xl lg:text-3xl font-bold tracking-tight mb-1">
                {value}
              </p>
              <p className="text-dark-300 text-xs font-medium">{t(`hero.stats.${key}`)}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
