import { useState, useRef, useEffect } from 'react'
import { Send, Settings, Trash2, MessageSquare } from 'lucide-react'
import OpenAI from 'openai'
import './App.css'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

function App() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [apiKey, setApiKey] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [model, setModel] = useState('gpt-3.5-turbo')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Load API key from localStorage on component mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem('openai-api-key')
    if (savedApiKey) {
      setApiKey(savedApiKey)
    } else {
      setShowSettings(true)
    }
  }, [])

  // Save API key to localStorage when it changes
  useEffect(() => {
    if (apiKey) {
      localStorage.setItem('openai-api-key', apiKey)
    }
  }, [apiKey])

  const sendMessage = async () => {
    if (!input.trim() || !apiKey || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true
      })

      const response = await openai.chat.completions.create({
        model: model,
        messages: [
          ...messages.map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          { role: 'user', content: input.trim() }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.choices[0]?.message?.content || 'Sorry, I could not generate a response.',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error calling OpenAI API:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, there was an error processing your request. Please check your API key and try again.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const clearConversation = () => {
    setMessages([])
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatMessage = (content: string) => {
    // Simple formatting for code blocks and line breaks
    return content.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        {index < content.split('\n').length - 1 && <br />}
      </span>
    ))
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <MessageSquare size={24} />
            <h1>ChatGPT Clone</h1>
          </div>
          <div className="header-actions">
            <button
              onClick={clearConversation}
              className="icon-button"
              title="Clear conversation"
            >
              <Trash2 size={18} />
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="icon-button"
              title="Settings"
            >
              <Settings size={18} />
            </button>
          </div>
        </div>
      </header>

      {showSettings && (
        <div className="settings-panel">
          <div className="settings-content">
            <h3>Settings</h3>
            <div className="setting-group">
              <label htmlFor="api-key">OpenAI API Key:</label>
              <input
                id="api-key"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your OpenAI API key"
                className="settings-input"
              />
            </div>
            <div className="setting-group">
              <label htmlFor="model">Model:</label>
              <select
                id="model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="settings-select"
              >
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                <option value="gpt-4">GPT-4</option>
                <option value="gpt-4-turbo-preview">GPT-4 Turbo</option>
              </select>
            </div>
            <button
              onClick={() => setShowSettings(false)}
              className="close-settings"
            >
              Close Settings
            </button>
          </div>
        </div>
      )}

      <main className="chat-container">
        {messages.length === 0 ? (
          <div className="welcome-message">
            <MessageSquare size={48} />
            <h2>Welcome to ChatGPT Clone</h2>
            <p>Start a conversation by typing a message below.</p>
            {!apiKey && (
              <p className="api-key-warning">
                ⚠️ Please set your OpenAI API key in settings first.
              </p>
            )}
          </div>
        ) : (
          <div className="messages">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.role}`}> 
                <div className="message-content">
                  <div className="message-text">
                    {formatMessage(message.content)}
                  </div>
                  <div className="message-time">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message assistant">
                <div className="message-content">
                  <div className="message-text">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </main>

      <footer className="input-container">
        <div className="input-wrapper">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            className="message-input"
            rows={1}
            disabled={!apiKey || isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || !apiKey || isLoading}
            className="send-button"
            title="Send message"
          >
            <Send size={20} />
          </button>
        </div>
      </footer>
    </div>
  )
}

export default App
