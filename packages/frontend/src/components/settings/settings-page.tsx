import { motion } from 'framer-motion'
import { Eye, EyeOff, ExternalLink, Save, HardDrive, Keyboard, Shield, Info, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useSettingsStore } from '@/stores/use-settings-store'
import { useEngineeringStore } from '@/stores/use-engineering-store'
import { GlassCard } from '@/components/shared/glass-card'
import { GlassButton } from '@/components/shared/glass-button'
import { Badge } from '@/components/shared/badge'

export function SettingsPage() {
  const {
    apiKey,
    driveConnected,
    storagePath,
    shortcuts,
    darkMode,
    trackingEnabled,
    setApiKey,
    setDriveConnected,
    setStoragePath,
    setDarkMode,
    setTrackingEnabled,
  } = useSettingsStore()
  const { plugins, removePlugin } = useEngineeringStore()
  const [showApiKey, setShowApiKey] = useState(false)
  const [apiKeyInput, setApiKeyInput] = useState(apiKey)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setApiKey(apiKeyInput)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="p-6 space-y-6 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-xl font-semibold text-white">Settings</h2>
        <p className="text-sm text-white/50 mt-1">Configure Star Platinum to your workflow</p>
      </motion.div>

      {/* API Key */}
      <GlassCard className="p-5" animate>
        <div className="flex items-center gap-2 mb-4">
          <Info size={16} className="text-[#0a84ff]" />
          <h3 className="text-base font-semibold text-white">Claude API Key</h3>
        </div>
        <div className="space-y-3 mb-4 text-sm text-white/60">
          <p className="flex gap-2"><span className="text-white/40">1.</span> Go to <a href="https://console.anthropic.com" className="text-[#0a84ff] hover:underline" target="_blank" rel="noreferrer">console.anthropic.com</a></p>
          <p className="flex gap-2"><span className="text-white/40">2.</span> Create an account or sign in</p>
          <p className="flex gap-2"><span className="text-white/40">3.</span> Navigate to API Keys section</p>
          <p className="flex gap-2"><span className="text-white/40">4.</span> Create a new key and paste it below</p>
          <p className="flex gap-2"><span className="text-white/40">5.</span> Add billing — Claude API requires a payment method</p>
        </div>
        <div className="flex gap-2">
          <div className="flex-1 flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5">
            <input
              type={showApiKey ? 'text' : 'password'}
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder="sk-ant-api03-..."
              className="flex-1 bg-transparent text-sm text-white placeholder-white/30 outline-none"
            />
            <button onClick={() => setShowApiKey(!showApiKey)}>
              {showApiKey ? <EyeOff size={16} className="text-white/40" /> : <Eye size={16} className="text-white/40" />}
            </button>
          </div>
          <GlassButton variant={saved ? 'success' : 'primary'} size="md" onClick={handleSave}>
            <Save size={14} /> {saved ? 'Saved!' : 'Save'}
          </GlassButton>
        </div>
        {apiKey && (
          <p className="text-xs text-[#32d74b] mt-2 flex items-center gap-1">
            ✓ API key configured
          </p>
        )}
      </GlassCard>

      {/* Google Drive */}
      <GlassCard className="p-5" animate>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold text-white">Google Drive Backup</h3>
            <p className="text-xs text-white/50 mt-0.5">Auto-backup your projects to Google Drive</p>
          </div>
          {driveConnected ? (
            <Badge variant="green">Connected</Badge>
          ) : (
            <Badge variant="default">Not Connected</Badge>
          )}
        </div>
        <GlassButton
          variant={driveConnected ? 'danger' : 'primary'}
          size="md"
          onClick={() => setDriveConnected(!driveConnected)}
        >
          <ExternalLink size={14} />
          {driveConnected ? 'Disconnect Drive' : 'Connect Google Drive'}
        </GlassButton>
      </GlassCard>

      {/* Plugin Database */}
      <GlassCard className="p-5" animate>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold text-white">Plugin Database</h3>
            <p className="text-xs text-white/50 mt-0.5">{plugins.length} plugins configured</p>
          </div>
          <GlassButton variant="primary" size="sm">
            <Plus size={14} /> Add Plugin
          </GlassButton>
        </div>
        <div className="space-y-2">
          {plugins.map((plugin) => (
            <div key={plugin.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{plugin.name}</p>
                <div className="flex gap-2 mt-1">
                  <Badge variant="default" size="sm">{plugin.category}</Badge>
                  {plugin.manualStatus === 'uploaded' ? (
                    <Badge variant="green" size="sm">Manual ✓</Badge>
                  ) : (
                    <Badge variant="orange" size="sm">No Manual</Badge>
                  )}
                </div>
              </div>
              <GlassButton variant="ghost" size="sm">Upload Manual</GlassButton>
              <button onClick={() => removePlugin(plugin.id)}>
                <Trash2 size={14} className="text-white/30 hover:text-[#ff453a]" />
              </button>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Storage */}
      <GlassCard className="p-5" animate>
        <div className="flex items-center gap-2 mb-4">
          <HardDrive size={16} className="text-[#bf5af2]" />
          <h3 className="text-base font-semibold text-white">Storage Location</h3>
        </div>
        <div className="flex gap-2">
          <div className="flex-1 flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5">
            <code className="text-sm text-white/70">{storagePath}</code>
          </div>
          <GlassButton variant="ghost" size="md" onClick={() => setStoragePath('~/Documents/StarPlatinum')}>
            Change
          </GlassButton>
        </div>
      </GlassCard>

      {/* Appearance */}
      <GlassCard className="p-5" animate>
        <h3 className="text-base font-semibold text-white mb-4">Appearance</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-white">Dark Mode</p>
            <p className="text-xs text-white/50">Default and recommended</p>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`relative w-12 h-6 rounded-full transition-colors ${darkMode ? 'bg-[#0a84ff]' : 'bg-white/20'}`}
          >
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${darkMode ? 'left-7' : 'left-1'}`} />
          </button>
        </div>
      </GlassCard>

      {/* Keyboard Shortcuts */}
      <GlassCard className="p-5" animate>
        <div className="flex items-center gap-2 mb-4">
          <Keyboard size={16} className="text-[#ff9f0a]" />
          <h3 className="text-base font-semibold text-white">Keyboard Shortcuts</h3>
        </div>
        <div className="space-y-2">
          {shortcuts.map((shortcut) => (
            <div key={shortcut.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
              <span className="text-sm text-white/70">{shortcut.label}</span>
              <div className="flex gap-1">
                {shortcut.keys.map((key) => (
                  <kbd key={key} className="text-xs bg-white/10 border border-white/15 px-2 py-1 rounded-md text-white/70">
                    {key}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Privacy */}
      <GlassCard className="p-5" animate>
        <div className="flex items-center gap-2 mb-4">
          <Shield size={16} className="text-[#32d74b]" />
          <h3 className="text-base font-semibold text-white">Privacy</h3>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-white">Usage Analytics</p>
            <p className="text-xs text-white/50">Help improve Star Platinum</p>
          </div>
          <button
            onClick={() => setTrackingEnabled(!trackingEnabled)}
            className={`relative w-12 h-6 rounded-full transition-colors ${trackingEnabled ? 'bg-[#0a84ff]' : 'bg-white/20'}`}
          >
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${trackingEnabled ? 'left-7' : 'left-1'}`} />
          </button>
        </div>
      </GlassCard>

      {/* About */}
      <GlassCard className="p-5" animate>
        <h3 className="text-base font-semibold text-white mb-3">About</h3>
        <div className="space-y-1.5 text-sm text-white/60">
          <p><span className="text-white/40">Version:</span> 0.1.0 (Phase 1 Scaffold)</p>
          <p><span className="text-white/40">App:</span> Star Platinum ⭐</p>
          <p><span className="text-white/40">Framework:</span> Tauri + React 19</p>
          <p><span className="text-white/40">Built for:</span> Rap production & music composition</p>
        </div>
      </GlassCard>
    </div>
  )
}
