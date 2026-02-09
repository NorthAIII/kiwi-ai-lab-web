import { useState, useRef, useEffect, useCallback } from 'react'

const WEBHOOK_URL =
  'https://northaisolutions.app.n8n.cloud/webhook/0645ff08-6505-49bd-925e-8feaaec34ab6/chat'

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
    { role: 'bot', text: "Hello! 👋 I'm Kiwi AI assistant. How can I help you today?" },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const sessionId = useRef(generateSessionId())

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  async function sendMessage(e) {
    e.preventDefault()
    const text = input.trim()
    if (!text || isLoading) return

    setInput('')
    setMessages((prev) => [...prev, { role: 'user', text }])
    setIsLoading(true)

    // Add a placeholder bot message for streaming
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

      // Handle streaming response
      if (contentType.includes('text/event-stream') || contentType.includes('stream') || res.body) {
        const reader = res.body.getReader()
        const decoder = new TextDecoder()
        let fullText = ''
        let buffer = ''

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          buffer += decoder.decode(value, { stream: true })

          // Try to parse each line as JSON
          const lines = buffer.split('\n')
          buffer = lines.pop() || '' // keep incomplete line in buffer

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
              // Not JSON — might be plain text response
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

        // Process remaining buffer
        if (buffer.trim()) {
          try {
            const parsed = JSON.parse(buffer.trim())
            if (parsed.type === 'item' && parsed.content) {
              fullText += parsed.content
            }
          } catch {
            // ignore
          }
        }

        // If we got no text from streaming, try parsing entire response as JSON
        if (!fullText) {
          const raw = decoder.decode()
          try {
            const json = JSON.parse(raw)
            fullText = json.output || json.text || json.response || raw
          } catch {
            fullText = raw
          }
        }

        // Final update
        setMessages((prev) => {
          const updated = [...prev]
          updated[botIndex] = { role: 'bot', text: fullText || 'Sorry, I could not generate a response.' }
          return updated
        })
      } else {
        // Non-streaming JSON response
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
      {/* Chat Toggle Button */}
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

      {/* Chat Window */}
      {isOpen && (
        <div className="kiwi-chat-window">
          {/* Header */}
          <div className="kiwi-chat-header">
            <div>
              <div className="kiwi-chat-title">Kiwi AI Lab</div>
              <div className="kiwi-chat-subtitle">Ask us anything about our AI solutions.</div>
            </div>
            <button onClick={() => setIsOpen(false)} className="kiwi-chat-close" aria-label="Close chat">
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
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
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
        </div>
      )}
    </>
  )
}
