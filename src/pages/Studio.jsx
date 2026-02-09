import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useInView } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Gem, Eye, Handshake, RefreshCcw } from 'lucide-react'

const principleIcons = [Gem, Eye, Handshake, RefreshCcw]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Studio() {
  const { t } = useTranslation()
  const headerRef = useRef(null)
  const philosophyRef = useRef(null)
  const deliveryRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })
  const philosophyInView = useInView(philosophyRef, { once: true, margin: '-80px' })
  const deliveryInView = useInView(deliveryRef, { once: true, margin: '-80px' })

  const principles = t('studio.philosophy.principles', { returnObjects: true })
  const phases = t('studio.delivery.phases', { returnObjects: true })

  return (
    <>
      <Helmet>
        <title>{`${t('nav.studio')} — Kiwi AI Lab`}</title>
      </Helmet>

      {/* Hero Header */}
      <section className="relative pt-32 lg:pt-40 pb-20 lg:pb-28">
        <div className="absolute top-20 right-1/4 w-[500px] h-[400px] bg-kiwi-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

        <div ref={headerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={headerInView ? 'visible' : 'hidden'}
              custom={0}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/[0.04] mb-6"
            >
              <span className="text-kiwi-500 text-xs font-semibold uppercase tracking-[0.15em]">
                {t('studio.badge')}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate={headerInView ? 'visible' : 'hidden'}
              custom={1}
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6"
            >
              {t('studio.title')}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={headerInView ? 'visible' : 'hidden'}
              custom={2}
              className="text-dark-200 text-base sm:text-lg lg:text-xl leading-relaxed"
            >
              {t('studio.subtitle')}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="relative pb-24 lg:pb-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

        <div ref={philosophyRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 lg:pt-32">
          <div className="max-w-3xl mb-14 lg:mb-16">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              animate={philosophyInView ? 'visible' : 'hidden'}
              custom={0}
              className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-5"
            >
              {t('studio.philosophy.title')}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={philosophyInView ? 'visible' : 'hidden'}
              custom={1}
              className="text-dark-200 text-base sm:text-lg leading-relaxed"
            >
              {t('studio.philosophy.description')}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
            {principles.map((principle, i) => {
              const Icon = principleIcons[i]
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate={philosophyInView ? 'visible' : 'hidden'}
                  custom={i + 2}
                  className="group glass rounded-3xl p-7 lg:p-8 glass-hover transition-all duration-500"
                >
                  <div className="w-11 h-11 rounded-xl bg-kiwi-500/[0.08] border border-kiwi-500/[0.1] flex items-center justify-center mb-5 group-hover:bg-kiwi-500/[0.12] group-hover:border-kiwi-500/20 transition-all duration-500">
                    <Icon size={20} className="text-kiwi-500" />
                  </div>
                  <h3 className="font-display text-white text-lg font-bold mb-2.5 tracking-tight">
                    {principle.title}
                  </h3>
                  <p className="text-dark-300 text-sm leading-relaxed">
                    {principle.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Delivery Model Section */}
      <section className="relative pb-32 lg:pb-44">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

        <div ref={deliveryRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 lg:pt-32">
          <div className="max-w-3xl mb-14 lg:mb-16">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              animate={deliveryInView ? 'visible' : 'hidden'}
              custom={0}
              className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-5"
            >
              {t('studio.delivery.title')}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={deliveryInView ? 'visible' : 'hidden'}
              custom={1}
              className="text-dark-200 text-base sm:text-lg leading-relaxed"
            >
              {t('studio.delivery.description')}
            </motion.p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-kiwi-500/20 via-kiwi-500/10 to-transparent" />

            <div className="space-y-4 lg:space-y-0">
              {phases.map((phase, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate={deliveryInView ? 'visible' : 'hidden'}
                  custom={i + 2}
                  className="relative lg:pl-20 lg:pb-10 last:pb-0"
                >
                  <div className="hidden lg:flex absolute left-[22px] top-7 w-[13px] h-[13px] rounded-full border-2 border-kiwi-500/40 bg-dark-950 items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-kiwi-500/60" />
                  </div>

                  <div className="glass rounded-2xl p-6 lg:p-7 glass-hover transition-all duration-500 group">
                    <div className="flex items-start gap-4">
                      <div className="lg:hidden shrink-0 w-9 h-9 rounded-xl bg-kiwi-500/[0.08] border border-kiwi-500/[0.1] flex items-center justify-center">
                        <span className="text-kiwi-500 text-xs font-bold">{String(i + 1).padStart(2, '0')}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="hidden lg:inline-block text-kiwi-500/40 text-xs font-bold tracking-widest">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <h3 className="font-display text-white text-base lg:text-lg font-bold tracking-tight">
                            {phase.label}
                          </h3>
                        </div>
                        <p className="text-dark-300 text-sm leading-relaxed">
                          {phase.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
