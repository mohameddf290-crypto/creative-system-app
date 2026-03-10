import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Bot, User } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useChatStore } from '@/stores/use-chat-store'
import { useAppStore } from '@/stores/use-app-store'
import { GlassButton } from '@/components/shared/glass-button'
import { cn } from '@/utils'

export function ChatPanel() {
  const { rightSidebarOpen, toggleRightSidebar } = useAppStore()
  const { messages, isTyping, sendMessage } = useChatStore()
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleSend = () => {
    if (!input.trim()) return
    sendMessage(input.trim())
    setInput('')
  }

  return (
    <AnimatePresence>
      {rightSidebarOpen && (
        <motion.aside
          initial={{ x: 320, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 320, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="w-80 flex-shrink-0 flex flex-col h-full backdrop-blur-xl bg-white/3 border-l border-white/8"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-white/8">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#0a84ff] to-[#bf5af2] flex items-center justify-center">
                <Bot size={14} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Copilot</p>
                <p className="text-xs text-white/40">Always listening</p>
              </div>
            </div>
            <GlassButton variant="ghost" size="sm" onClick={toggleRightSidebar}>
              <X size={16} />
            </GlassButton>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn('flex gap-2', msg.role === 'user' ? 'flex-row-reverse' : 'flex-row')}
              >
                <div
                  className={cn(
                    'w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1',
                    msg.role === 'user' ? 'bg-[#0a84ff]/30' : 'bg-[#bf5af2]/30',
                  )}
                >
                  {msg.role === 'user' ? (
                    <User size={12} className="text-[#0a84ff]" />
                  ) : (
                    <Bot size={12} className="text-[#bf5af2]" />
                  )}
                </div>
                <div
                  className={cn(
                    'max-w-[220px] px-3 py-2 rounded-xl text-sm',
                    msg.role === 'user'
                      ? 'bg-[#0a84ff]/20 text-white ml-auto'
                      : 'bg-white/8 text-white/85',
                  )}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-2">
                <div className="w-6 h-6 rounded-full bg-[#bf5af2]/30 flex items-center justify-center">
                  <Bot size={12} className="text-[#bf5af2]" />
                </div>
                <div className="bg-white/8 px-3 py-2 rounded-xl">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce"
                        style={{ animationDelay: `${i * 150}ms` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-white/8 p-4">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask anything..."
                className="flex-1 bg-white/8 border border-white/12 rounded-xl px-3 py-2 text-sm text-white placeholder-white/30 outline-none focus:border-[#0a84ff]/50"
              />
              <GlassButton variant="primary" size="sm" onClick={handleSend}>
                <Send size={14} />
              </GlassButton>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
