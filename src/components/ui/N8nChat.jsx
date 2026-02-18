import { useState, useRef, useEffect, useCallback } from 'react'

const WEBHOOK_URL =
  'https://kiwiailab.app.n8n.cloud/webhook/0645ff08-6505-49bd-925e-8feaaec34ab6/chat'

const SESSION_END_WEBHOOK =
  'https://kiwiailab.app.n8n.cloud/webhook/chat-session-end'

function generateSessionId() {
  const stored = sessionStorage.getItem('kiwi-chat-session')
  if (stored) return stored
  const id = crypto.randomUUID()
  sessionStorage.setItem('kiwi-chat-session', id)
  return id
}

export default function N8nChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: 'Welcome to Kiwi AI Lab! We help businesses streamline their operations with smart automation. What can I help you with today?',
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [leadInfo, setLeadInfo] = useState(null)
  const [leadForm, setLeadForm] = useState({ name: '', company: '', email: '' })
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const sessionId = useRef(generateSessionId())
  const hasConversation = useRef(false)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  useEffect(() => {
    if (isOpen && !showLeadForm && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen, showLeadForm])

  function handleLeadSubmit(e) {
    e.preventDefault()
    const { name, company, email } = leadForm
    if (!name.trim() || !email.trim()) return

    const info = { name: name.trim(), company: company.trim(), email: email.trim() }
    setLeadInfo(info)
    setShowLeadForm(false)

    setMessages((prev) => [
      ...prev,
      {
        role: 'bot',
        text: `Perfect, ${info.name}! Your meeting request has been submitted. We'll reach out to you at ${info.email} shortly. Is there anything else you'd like to know?`,
      },
    ])

    // Send meeting request + chat log to n8n
    fetch(SESSION_END_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'meeting_request',
        leadName: info.name,
        leadCompany: info.company,
        leadEmail: info.email,
        sessionId: sessionId.current,
        chatLog: messages.map((m) => `${m.role === 'user' ? 'Visitor' : 'Kiwi'}: ${m.text}`).join('\n'),
        messageCount: messages.length,
        timestamp: new Date().toISOString(),
      }),
    }).catch(() => {})
  }

  // Show lead form from a bot-triggered CTA button
  function promptLeadForm() {
    if (leadInfo) return // already captured
    setShowLeadForm(true)
    scrollToBottom()
  }

  function handleClose() {
    if (hasConversation.current && messages.length > 1) {
      fetch(SESSION_END_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'session_end',
          leadName: leadInfo?.name || 'Anonymous',
          leadCompany: leadInfo?.company || '',
          leadEmail: leadInfo?.email || '',
          sessionId: sessionId.current,
          chatLog: messages
            .map((m) => `${m.role === 'user' ? (leadInfo?.name || 'Visitor') : 'Kiwi'}: ${m.text}`)
            .join('\n'),
          messageCount: messages.length,
          timestamp: new Date().toISOString(),
        }),
      }).catch(() => {})
    }

    setIsOpen(false)
    setMessages([
      {
        role: 'bot',
        text: 'Welcome to Kiwi AI Lab! We help businesses streamline their operations with smart automation. What can I help you with today?',
      },
    ])
    setLeadInfo(null)
    setLeadForm({ name: '', company: '', email: '' })
    setShowLeadForm(false)
    hasConversation.current = false
    sessionStorage.removeItem('kiwi-chat-session')
    sessionId.current = generateSessionId()
  }

  async function sendMessage(e) {
    e.preventDefault()
    const text = input.trim()
    if (!text || isLoading) return

    hasConversation.current = true
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', text }])
    setIsLoading(true)

    const botIndex = messages.length + 1
    setMessages((prev) => [...prev, { role: 'bot', text: '' }])

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chatInput: text,
          sessionId: sessionId.current,
        }),
      })

      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      const contentType = res.headers.get('content-type') || ''

      if (contentType.includes('text/event-stream') || contentType.includes('stream') || res.body) {
        const reader = res.body.getReader()
        const decoder = new TextDecoder()
        let fullText = ''
        let buffer = ''

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n')
          buffer = lines.pop() || ''

          for (const line of lines) {
            const trimmed = line.trim()
            if (!trimmed) continue
            try {
              const parsed = JSON.parse(trimmed)
              if (parsed.type === 'item' && parsed.content) {
                fullText += parsed.content
                setMessages((prev) => {
                  const updated = [...prev]
                  updated[botIndex] = { role: 'bot', text: fullText }
                  return updated
                })
              }
            } catch {
              if (!trimmed.startsWith('{') && !trimmed.startsWith('data:')) {
                fullText += trimmed
                setMessages((prev) => {
                  const updated = [...prev]
                  updated[botIndex] = { role: 'bot', text: fullText }
                  return updated
                })
              }
            }
          }
        }

        if (buffer.trim()) {
          try {
            const parsed = JSON.parse(buffer.trim())
            if (parsed.type === 'item' && parsed.content) fullText += parsed.content
          } catch { /* ignore */ }
        }

        if (!fullText) {
          const raw = decoder.decode()
          try {
            const json = JSON.parse(raw)
            fullText = json.output || json.text || json.response || raw
          } catch {
            fullText = raw
          }
        }

        setMessages((prev) => {
          const updated = [...prev]
          updated[botIndex] = { role: 'bot', text: fullText || 'Sorry, I could not generate a response.' }
          return updated
        })
      } else {
        const data = await res.json()
        const reply = data.output || data.text || data.response || JSON.stringify(data)
        setMessages((prev) => {
          const updated = [...prev]
          updated[botIndex] = { role: 'bot', text: reply }
          return updated
        })
      }
    } catch (err) {
      console.error('Chat error:', err)
      setMessages((prev) => {
        const updated = [...prev]
        updated[botIndex] = {
          role: 'bot',
          text: 'Sorry, something went wrong. Please try again.',
        }
        return updated
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Toggle */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="kiwi-chat-toggle"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
        )}
      </button>

      {/* Window */}
      {isOpen && (
        <div className="kiwi-chat-window">
          {/* Header */}
          <div className="kiwi-chat-header">
            <div>
              <div className="kiwi-chat-title">Kiwi AI Lab</div>
              <div className="kiwi-chat-subtitle">Smart solutions for your business.</div>
            </div>
            <button onClick={handleClose} className="kiwi-chat-close" aria-label="Close chat">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
          </div>

          {/* Messages */}
          <div className="kiwi-chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`kiwi-chat-msg kiwi-chat-msg-${msg.role}`}>
                <div className={`kiwi-chat-bubble kiwi-chat-bubble-${msg.role}`}>
                  {msg.text || (isLoading && i === messages.length - 1 ? '...' : '')}
                </div>
              </div>
            ))}

            {/* CTA Button — shown after a few messages if no lead captured */}
            {!leadInfo && !showLeadForm && messages.length >= 4 && (
              <div className="kiwi-chat-msg kiwi-chat-msg-bot">
                <button onClick={promptLeadForm} className="kiwi-chat-cta-btn">
                  Book a Free Consultation
                </button>
              </div>
            )}

            {/* Inline Lead Capture Form */}
            {showLeadForm && (
              <div className="kiwi-chat-msg kiwi-chat-msg-bot">
                <form onSubmit={handleLeadSubmit} className="kiwi-chat-lead-form">
                  <p className="kiwi-chat-lead-title">Book a meeting with our team</p>
                  <div className="kiwi-chat-lead-field">
                    <input
                      type="text"
                      value={leadForm.name}
                      onChange={(e) => setLeadForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="Your name *"
                      required
                      autoFocus
                    />
                  </div>
                  <div className="kiwi-chat-lead-field">
                    <input
                      type="text"
                      value={leadForm.company}
                      onChange={(e) => setLeadForm((f) => ({ ...f, company: e.target.value }))}
                      placeholder="Company"
                    />
                  </div>
                  <div className="kiwi-chat-lead-field">
                    <input
                      type="email"
                      value={leadForm.email}
                      onChange={(e) => setLeadForm((f) => ({ ...f, email: e.target.value }))}
                      placeholder="Email *"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="kiwi-chat-lead-submit"
                    disabled={!leadForm.name.trim() || !leadForm.email.trim()}
                  >
                    Book a Meeting
                  </button>
                </form>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          {!showLeadForm && (
            <form onSubmit={sendMessage} className="kiwi-chat-input-area">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
                className="kiwi-chat-input"
              />
              <button type="submit" disabled={isLoading || !input.trim()} className="kiwi-chat-send">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
              </button>
            </form>
          )}
        </div>
      )}
    </>
  )
}
