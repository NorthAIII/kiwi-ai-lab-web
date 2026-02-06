import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Linkedin, Mail } from 'lucide-react'

// WhatsApp & Telegram SVG icons (small inline for no extra deps)
function WhatsAppIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function TelegramIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  )
}

const contactChannels = [
  {
    key: 'whatsapp',
    icon: WhatsAppIcon,
    color: 'hover:bg-[#25D366]/10 hover:text-[#25D366] hover:border-[#25D366]/20',
    href: 'https://wa.me/YOUR_NUMBER',
  },
  {
    key: 'telegram',
    icon: TelegramIcon,
    color: 'hover:bg-[#0088cc]/10 hover:text-[#0088cc] hover:border-[#0088cc]/20',
    href: 'https://t.me/YOUR_USERNAME',
  },
  {
    key: 'email',
    icon: Mail,
    color: 'hover:bg-kiwi-500/10 hover:text-kiwi-500 hover:border-kiwi-500/20',
    href: 'mailto:hello@kiwiai.lab',
  },
  {
    key: 'linkedin',
    icon: Linkedin,
    color: 'hover:bg-[#0A66C2]/10 hover:text-[#0A66C2] hover:border-[#0A66C2]/20',
    href: 'https://linkedin.com/company/YOUR_COMPANY',
  },
]

export default function FAB() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [isFishing, setIsFishing] = useState(false)

  // Start fishing animation after 7 seconds
  useEffect(() => {
    const timer = setTimeout(() => setIsFishing(true), 7000)
    return () => clearTimeout(timer)
  }, [])

  // Stop fishing when menu is opened
  useEffect(() => {
    if (isOpen) setIsFishing(false)
  }, [isOpen])

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Expanded Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="glass rounded-2xl p-2 shadow-2xl shadow-black/40 min-w-[200px]"
          >
            {/* Header */}
            <div className="px-3 pt-2 pb-3 border-b border-white/[0.06]">
              <p className="text-white text-sm font-semibold">{t('fab.tooltip')}</p>
            </div>

            {/* Channels */}
            <div className="pt-1.5 space-y-0.5">
              {contactChannels.map(({ key, icon: Icon, color, href }, i) => (
                <motion.a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.05 }}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-dark-200 border border-transparent transition-all duration-200 ${color}`}
                >
                  <Icon size={17} />
                  <span className="text-sm font-medium">{t(`fab.${key}`)}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.92 }}
        className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br from-kiwi-500 to-kiwi-700 text-white flex items-center justify-center shadow-lg shadow-kiwi-500/25 hover:shadow-kiwi-500/40 transition-shadow duration-300 cursor-pointer ${
          isFishing && !isOpen ? 'animate-fishing' : ''
        }`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={22} strokeWidth={2.5} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle size={22} strokeWidth={2.5} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fishing ring effect */}
        {isFishing && !isOpen && (
          <span className="absolute inset-0 rounded-2xl animate-fishing" />
        )}
      </motion.button>
    </div>
  )
}
