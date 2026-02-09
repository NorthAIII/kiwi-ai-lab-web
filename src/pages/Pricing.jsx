import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { CheckCircle2, ArrowRight, Star, Shield, Zap, Building2 } from 'lucide-react'

const tiers = [
  { key: 'starter', icon: Zap, popular: false },
  { key: 'growth', icon: Star, popular: true },
  { key: 'scale', icon: Shield, popular: false },
  { key: 'enterprise', icon: Building2, popular: false },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
}

function PricingCard({ tierKey, icon: Icon, popular, index, isInView }) {
  const { t } = useTranslation()
  const features = t(`pricing.tiers.${tierKey}.features`, { returnObjects: true })

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      custom={index + 2}
      className={`relative group flex flex-col glass rounded-3xl p-7 lg:p-8 transition-all duration-500 ${
        popular
          ? 'border-kiwi-500/30 ring-1 ring-kiwi-500/10 scale-[1.02] lg:scale-105'
          : 'glass-hover'
      }`}
    >
      {/* Popular badge */}
      {popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-kiwi-400 to-kiwi-500 rounded-full text-dark-950 text-xs font-semibold shadow-lg shadow-kiwi-500/20">
          {t('pricing.popular')}
        </div>
      )}

      {/* Icon + Tier name */}
      <div className="flex items-center gap-3 mb-5">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
          popular
            ? 'bg-kiwi-500/15 border border-kiwi-500/20'
            : 'bg-kiwi-500/[0.08] border border-kiwi-500/[0.1]'
        }`}>
          <Icon size={20} className="text-kiwi-500" />
        </div>
        <h3 className="font-display text-white text-lg font-bold tracking-tight">
          {t(`pricing.tiers.${tierKey}.name`)}
        </h3>
      </div>

      {/* Price */}
      <div className="mb-2">
        <span className="font-display text-white text-4xl font-bold tracking-tight">
          {t(`pricing.tiers.${tierKey}.price`)}
        </span>
        <span className="text-dark-300 text-sm font-medium ml-1">
          {t(`pricing.tiers.${tierKey}.period`)}
        </span>
      </div>

      {/* Description */}
      <p className="text-dark-300 text-sm leading-relaxed mb-7">
        {t(`pricing.tiers.${tierKey}.description`)}
      </p>

      {/* Features */}
      <ul className="space-y-3 mb-8 flex-1">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <CheckCircle2 size={15} className={`mt-0.5 shrink-0 ${popular ? 'text-kiwi-500' : 'text-kiwi-500/50'}`} />
            <span className="text-dark-200 text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        to="/contact"
        className={`group/btn inline-flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
          popular
            ? 'text-dark-950 bg-gradient-to-r from-kiwi-400 to-kiwi-500 hover:from-kiwi-300 hover:to-kiwi-400 shadow-lg shadow-kiwi-500/20 hover:shadow-kiwi-500/30'
            : 'text-kiwi-400 border border-kiwi-500/20 hover:bg-kiwi-500/[0.08] hover:text-kiwi-300'
        }`}
      >
        {t(`pricing.tiers.${tierKey}.cta`)}
        <ArrowRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform duration-200" />
      </Link>
    </motion.div>
  )
}

export default function Pricing() {
  const { t } = useTranslation()
  const headerRef = useRef(null)
  const cardsRef = useRef(null)
  const guaranteeRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })
  const cardsInView = useInView(cardsRef, { once: true, margin: '-80px' })
  const guaranteeInView = useInView(guaranteeRef, { once: true, margin: '-80px' })

  return (
    <>
      <Helmet>
        <title>{`${t('nav.pricing')} — Kiwi AI Lab`}</title>
      </Helmet>

      <section className="relative pt-32 lg:pt-40 pb-32 lg:pb-44">
        {/* Background glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-kiwi-500/[0.04] rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-14 lg:mb-18">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={headerInView ? 'visible' : 'hidden'}
              custom={0}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/[0.04] mb-6"
            >
              <span className="text-kiwi-500 text-xs font-semibold uppercase tracking-[0.15em]">
                {t('pricing.badge')}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate={headerInView ? 'visible' : 'hidden'}
              custom={1}
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-5"
            >
              {t('pricing.title')}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={headerInView ? 'visible' : 'hidden'}
              custom={2}
              className="text-dark-200 text-base sm:text-lg leading-relaxed"
            >
              {t('pricing.subtitle')}
            </motion.p>
          </div>

          {/* Pricing Cards */}
          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-6">
            {tiers.map(({ key, icon, popular }, i) => (
              <PricingCard
                key={key}
                tierKey={key}
                icon={icon}
                popular={popular}
                index={i}
                isInView={cardsInView}
              />
            ))}
          </div>

          {/* Zero Risk Guarantee */}
          <motion.div
            ref={guaranteeRef}
            variants={fadeUp}
            initial="hidden"
            animate={guaranteeInView ? 'visible' : 'hidden'}
            custom={0}
            className="mt-16 lg:mt-20 max-w-3xl mx-auto glass rounded-3xl p-8 lg:p-10 text-center"
          >
            <div className="w-12 h-12 rounded-2xl bg-kiwi-500/[0.1] border border-kiwi-500/[0.15] flex items-center justify-center mx-auto mb-5">
              <Shield size={24} className="text-kiwi-500" />
            </div>
            <h3 className="font-display text-white text-xl lg:text-2xl font-bold tracking-tight mb-3">
              {t('pricing.guarantee.title')}
            </h3>
            <p className="text-dark-300 text-sm lg:text-base leading-relaxed">
              {t('pricing.guarantee.description')}
            </p>
          </motion.div>
        </div>
      </section>
    </>
  )
}
