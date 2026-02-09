import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useInView } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Send, Mail, MapPin, Clock, CheckCircle2, AlertCircle } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Contact() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  })
  const [status, setStatus] = useState(null)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          service: form.service,
          message: form.message,
          source: 'contact_form',
        }),
      })

      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus('success')
      setForm({ name: '', email: '', company: '', service: '', message: '' })
    } catch (err) {
      console.error('Contact form error:', err)
      setStatus('error')
    }
  }

  const serviceOptions = t('contact.form.serviceOptions', { returnObjects: true })

  const inputClasses =
    'w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-sm text-white placeholder:text-dark-400 focus:outline-none focus:border-kiwi-500/30 focus:ring-1 focus:ring-kiwi-500/20 transition-all duration-200'

  return (
    <>
      <Helmet>
        <title>{`${t('nav.contact')} — Kiwi AI Lab`}</title>
      </Helmet>

      <section ref={sectionRef} className="relative pt-32 lg:pt-40 pb-32 lg:pb-44">
        <div className="absolute top-20 left-1/3 w-[500px] h-[400px] bg-kiwi-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 lg:mb-18">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={0}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/[0.04] mb-6"
            >
              <span className="text-kiwi-500 text-xs font-semibold uppercase tracking-[0.15em]">
                {t('contact.badge')}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={1}
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-5"
            >
              {t('contact.title')}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={2}
              className="text-dark-200 text-base sm:text-lg leading-relaxed"
            >
              {t('contact.subtitle')}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 max-w-5xl mx-auto">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={3}
              className="lg:col-span-3"
            >
              <form onSubmit={handleSubmit} className="glass rounded-3xl p-7 lg:p-9 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-dark-200 mb-2 uppercase tracking-wider">
                      {t('contact.form.name')}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder={t('contact.form.namePlaceholder')}
                      required
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-dark-200 mb-2 uppercase tracking-wider">
                      {t('contact.form.email')}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder={t('contact.form.emailPlaceholder')}
                      required
                      className={inputClasses}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-dark-200 mb-2 uppercase tracking-wider">
                      {t('contact.form.company')}
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder={t('contact.form.companyPlaceholder')}
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-dark-200 mb-2 uppercase tracking-wider">
                      {t('contact.form.service')}
                    </label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className={`${inputClasses} appearance-none cursor-pointer`}
                    >
                      <option value="" disabled className="bg-dark-800 text-dark-400">
                        {t('contact.form.servicePlaceholder')}
                      </option>
                      {Object.entries(serviceOptions).map(([key, label]) => (
                        <option key={key} value={key} className="bg-dark-800 text-white">
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-dark-200 mb-2 uppercase tracking-wider">
                    {t('contact.form.message')}
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder={t('contact.form.messagePlaceholder')}
                    rows={5}
                    required
                    className={`${inputClasses} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="group w-full inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm font-semibold text-dark-950 bg-gradient-to-r from-kiwi-400 to-kiwi-500 rounded-xl hover:from-kiwi-300 hover:to-kiwi-400 transition-all duration-300 shadow-lg shadow-kiwi-500/20 hover:shadow-kiwi-500/30 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  {status === 'submitting' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-dark-950/30 border-t-dark-950 rounded-full animate-spin" />
                      {t('contact.form.submitting')}
                    </>
                  ) : (
                    <>
                      {t('contact.form.submit')}
                      <Send size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                    </>
                  )}
                </button>

                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3 p-4 rounded-xl bg-kiwi-500/[0.08] border border-kiwi-500/[0.15]"
                  >
                    <CheckCircle2 size={18} className="text-kiwi-500 mt-0.5 shrink-0" />
                    <p className="text-kiwi-400 text-sm">{t('contact.form.success')}</p>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3 p-4 rounded-xl bg-red-500/[0.08] border border-red-500/[0.15]"
                  >
                    <AlertCircle size={18} className="text-red-400 mt-0.5 shrink-0" />
                    <p className="text-red-300 text-sm">{t('contact.form.error')}</p>
                  </motion.div>
                )}
              </form>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={4}
              className="lg:col-span-2"
            >
              <div className="glass rounded-3xl p-7 lg:p-8 space-y-8">
                <h3 className="font-display text-white text-lg font-bold tracking-tight">
                  {t('contact.info.title')}
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-kiwi-500/[0.08] border border-kiwi-500/[0.1] flex items-center justify-center shrink-0">
                      <Mail size={18} className="text-kiwi-500" />
                    </div>
                    <div>
                      <a href="mailto:info@kiwiailab.com" className="text-white text-sm font-medium mb-0.5 hover:text-kiwi-500 transition-colors duration-200 block">
                        {t('contact.info.email')}
                      </a>
                      <p className="text-dark-400 text-xs">{t('contact.info.response')}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-kiwi-500/[0.08] border border-kiwi-500/[0.1] flex items-center justify-center shrink-0">
                      <MapPin size={18} className="text-kiwi-500" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium mb-0.5">{t('contact.info.locations')}</p>
                      <p className="text-dark-400 text-xs">Remote-first studio</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-kiwi-500/[0.08] border border-kiwi-500/[0.1] flex items-center justify-center shrink-0">
                      <Clock size={18} className="text-kiwi-500" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium mb-0.5">Mon — Fri</p>
                      <p className="text-dark-400 text-xs">09:00 — 18:00 (GMT+3)</p>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-white/[0.04]" />

                <p className="text-dark-400 text-xs leading-relaxed italic">
                  Every inquiry is reviewed personally by our founding team. No sales bots, no automated funnels — just a real conversation about your needs.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
