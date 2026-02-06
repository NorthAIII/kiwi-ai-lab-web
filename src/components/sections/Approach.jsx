import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useInView } from 'framer-motion'
import { Search, Cpu, Rocket } from 'lucide-react'

const cards = [
  { key: 'discover', icon: Search, step: '01' },
  { key: 'architect', icon: Cpu, step: '02' },
  { key: 'deploy', icon: Rocket, step: '03' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Approach() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section ref={sectionRef} className="relative pt-24 pb-32 lg:pt-36 lg:pb-44">
      {/* Section divider glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={0}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/[0.04] mb-6"
          >
            <span className="text-kiwi-500 text-xs font-semibold uppercase tracking-[0.15em]">
              {t('approach.badge')}
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={1}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-5"
          >
            {t('approach.title')}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={2}
            className="text-dark-200 text-base sm:text-lg leading-relaxed"
          >
            {t('approach.subtitle')}
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {cards.map(({ key, icon: Icon, step }, i) => (
            <motion.div
              key={key}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={i + 3}
              className="group relative glass rounded-3xl p-7 lg:p-8 glass-hover transition-all duration-500"
            >
              {/* Step number watermark */}
              <span className="absolute top-6 right-7 text-6xl font-black text-white/[0.02] group-hover:text-kiwi-500/[0.05] transition-colors duration-500 select-none">
                {step}
              </span>

              {/* Icon */}
              <div className="relative w-12 h-12 rounded-2xl bg-kiwi-500/[0.08] border border-kiwi-500/[0.1] flex items-center justify-center mb-6 group-hover:bg-kiwi-500/[0.12] group-hover:border-kiwi-500/20 transition-all duration-500">
                <Icon size={22} className="text-kiwi-500" />
              </div>

              {/* Content */}
              <h3 className="text-white text-lg lg:text-xl font-bold mb-3 tracking-tight">
                {t(`approach.cards.${key}.title`)}
              </h3>
              <p className="text-dark-300 text-sm leading-relaxed">
                {t(`approach.cards.${key}.description`)}
              </p>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 inset-x-8 h-[2px] bg-gradient-to-r from-kiwi-500/0 via-kiwi-500/20 to-kiwi-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
            </motion.div>
          ))}
        </div>

        {/* Connecting line (desktop) */}
        <div className="hidden md:flex items-center justify-center mt-10">
          <div className="flex items-center gap-2">
            {['Discover', 'Architect', 'Deploy'].map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-kiwi-500/30 border border-kiwi-500/20" />
                {i < 2 && (
                  <div className="w-24 lg:w-32 h-px bg-gradient-to-r from-kiwi-500/20 to-kiwi-500/5" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
