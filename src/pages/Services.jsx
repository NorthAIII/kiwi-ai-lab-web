import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { BrainCircuit, Layers, Workflow, CheckCircle2, ArrowRight } from 'lucide-react'

const services = [
  { key: 'strategy', icon: BrainCircuit },
  { key: 'llm', icon: Layers },
  { key: 'automation', icon: Workflow },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
}

function ServiceCard({ serviceKey, icon: Icon, index, isInView }) {
  const { t } = useTranslation()
  const features = t(`services.items.${serviceKey}.features`, { returnObjects: true })

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      custom={index + 2}
      className="group relative glass rounded-3xl p-8 lg:p-10 glass-hover transition-all duration-500"
    >
      {/* Icon */}
      <div className="w-14 h-14 rounded-2xl bg-kiwi-500/[0.08] border border-kiwi-500/[0.1] flex items-center justify-center mb-7 group-hover:bg-kiwi-500/[0.12] group-hover:border-kiwi-500/20 transition-all duration-500">
        <Icon size={26} className="text-kiwi-500" />
      </div>

      {/* Title & Description */}
      <h3 className="text-white text-xl lg:text-2xl font-bold mb-4 tracking-tight">
        {t(`services.items.${serviceKey}.title`)}
      </h3>
      <p className="text-dark-300 text-sm lg:text-base leading-relaxed mb-8">
        {t(`services.items.${serviceKey}.description`)}
      </p>

      {/* Features */}
      <ul className="space-y-3">
        {features.map((feature, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.12 + i * 0.06 + 0.5, duration: 0.3 }}
            className="flex items-start gap-3"
          >
            <CheckCircle2 size={16} className="text-kiwi-500/60 mt-0.5 shrink-0" />
            <span className="text-dark-200 text-sm">{feature}</span>
          </motion.li>
        ))}
      </ul>

      {/* Bottom accent */}
      <div className="absolute bottom-0 inset-x-8 h-[2px] bg-gradient-to-r from-kiwi-500/0 via-kiwi-500/20 to-kiwi-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
    </motion.div>
  )
}

export default function Services() {
  const { t } = useTranslation()
  const headerRef = useRef(null)
  const cardsRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })
  const cardsInView = useInView(cardsRef, { once: true, margin: '-80px' })

  return (
    <>
      <Helmet>
        <title>{`${t('nav.services')} — Kiwi AI Lab`}</title>
      </Helmet>

      <section className="relative pt-32 lg:pt-40 pb-32 lg:pb-44">
        {/* Background glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-kiwi-500/[0.04] rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={headerInView ? 'visible' : 'hidden'}
              custom={0}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/[0.04] mb-6"
            >
              <span className="text-kiwi-500 text-xs font-semibold uppercase tracking-[0.15em]">
                {t('services.badge')}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate={headerInView ? 'visible' : 'hidden'}
              custom={1}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-5"
            >
              {t('services.title')}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={headerInView ? 'visible' : 'hidden'}
              custom={2}
              className="text-dark-200 text-base sm:text-lg leading-relaxed"
            >
              {t('services.subtitle')}
            </motion.p>
          </div>

          {/* Service Cards */}
          <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">
            {services.map(({ key, icon }, i) => (
              <ServiceCard
                key={key}
                serviceKey={key}
                icon={icon}
                index={i}
                isInView={cardsInView}
              />
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={cardsInView ? 'visible' : 'hidden'}
            custom={6}
            className="text-center mt-16 lg:mt-20"
          >
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2.5 px-8 py-4 text-sm font-semibold text-dark-950 bg-gradient-to-r from-kiwi-500 to-kiwi-600 rounded-2xl hover:from-kiwi-400 hover:to-kiwi-500 transition-all duration-300 shadow-xl shadow-kiwi-500/20 hover:shadow-kiwi-500/30"
            >
              {t('services.cta')}
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform duration-200" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
