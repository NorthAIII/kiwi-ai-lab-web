import { useEffect } from 'react'

export default function N8nChat() {
  useEffect(() => {
    // Dynamically import and initialize the n8n chat widget
    async function initChat() {
      try {
        const { createChat } = await import(
          'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js'
        )

        createChat({
          webhookUrl:
            'https://northaisolutions.app.n8n.cloud/webhook/ec59a35c-41c4-47ec-b96f-58593ba27bcc/chat',
          mode: 'window',
          chatInputKey: 'chatInput',
          chatSessionKey: 'sessionId',
          defaultLanguage: 'en',
          showWelcomeScreen: false,
          initialMessages: [
            'Hello! 👋 I\'m Kiwi AI assistant. How can I help you today?',
          ],
          i18n: {
            en: {
              title: 'Kiwi AI Lab',
              subtitle: 'Ask us anything about our AI solutions.',
              footer: '',
              getStarted: 'New Conversation',
              inputPlaceholder: 'Type your message...',
            },
          },
        })
      } catch (error) {
        console.error('Failed to initialize n8n chat widget:', error)
      }
    }

    initChat()
  }, [])

  // The n8n chat widget injects its own DOM elements — no JSX output needed
  return null
}
