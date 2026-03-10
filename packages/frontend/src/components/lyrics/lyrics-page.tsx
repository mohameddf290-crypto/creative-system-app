import { motion } from 'framer-motion'
import { Play, Pause, Wand2, Edit2, RefreshCw, X, Plus, Check } from 'lucide-react'
import { useState } from 'react'
import { useLyricsStore } from '@/stores/use-lyrics-store'
import { GlassCard } from '@/components/shared/glass-card'
import { GlassButton } from '@/components/shared/glass-button'
import { DropZone } from '@/components/shared/drop-zone'
import { Badge } from '@/components/shared/badge'
import { ScoreRing } from '@/components/shared/score-ring'
import { generateId } from '@/utils'
import { cn } from '@/utils'

export function LyricsPage() {
  const {
    engineeredSongName,
    referenceSheet,
    referenceSheetName,
    referenceFlows,
    blacklist,
    blacklistInput,
    lyricVariations,
    selectedLyrics,
    editedLyrics,
    toplineData,
    isGenerating,
    isToplinePlaying,
    currentToplineTime,
    setEngineeredSong,
    setReferenceSheet,
    addReferenceFlow,
    removeReferenceFlow,
    addToBlacklist,
    removeFromBlacklist,
    setBlacklistInput,
    setSelectedLyrics,
    setEditedLyrics,
    setIsToplinePlaying,
    generateLyrics,
  } = useLyricsStore()

  const [activeTab, setActiveTab] = useState<'input' | 'results' | 'editor' | 'topline'>('input')

  const handleReferenceSheetUpload = (f: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      setReferenceSheet(e.target?.result as string, f.name)
    }
    reader.readAsText(f)
  }

  const handleFlowUpload = (f: File) => {
    addReferenceFlow({
      id: generateId(),
      name: f.name,
      acapellaUrl: undefined,
      withSongUrl: undefined,
    })
  }

  const handleBlacklistAdd = () => {
    if (blacklistInput.trim()) {
      addToBlacklist(blacklistInput.trim())
      setBlacklistInput('')
    }
  }

  const handleGenerate = () => {
    generateLyrics()
    setActiveTab('results')
  }

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-xl font-semibold text-white">Lyrics & Topline</h2>
        <p className="text-sm text-white/50 mt-1">
          Rap-focused writing system. Anti-slop. Anti-cliché. Real bars.
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white/5 p-1 rounded-xl w-fit">
        {(['input', 'results', 'editor', 'topline'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'px-4 py-1.5 rounded-lg text-sm font-medium transition-all',
              activeTab === tab
                ? 'bg-[#0a84ff]/30 text-[#0a84ff]'
                : 'text-white/40 hover:text-white',
            )}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Input Tab */}
      {activeTab === 'input' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <GlassCard className="p-4" animate>
              <h3 className="text-sm font-semibold text-white mb-3">Engineered Song</h3>
              <DropZone
                onFileSelect={setEngineeredSong}
                accept="audio/*"
                label="Drop complete engineered song"
                sublabel="WAV, MP3 supported"
                fileName={engineeredSongName}
              />
            </GlassCard>

            <GlassCard className="p-4" animate>
              <h3 className="text-sm font-semibold text-white mb-3">Reference Sheet</h3>
              <DropZone
                onFileSelect={handleReferenceSheetUpload}
                accept=".txt,.doc,.docx,.md,text/*"
                label="Drop reference sheet (text file)"
                sublabel="Themes, explanations, elements"
                fileName={referenceSheetName}
              />
              {referenceSheet && (
                <div className="mt-3 max-h-28 overflow-y-auto p-2 bg-white/5 rounded-lg">
                  <p className="text-xs text-white/60 whitespace-pre-wrap">{referenceSheet.slice(0, 400)}{referenceSheet.length > 400 ? '...' : ''}</p>
                </div>
              )}
            </GlassCard>
          </div>

          <GlassCard className="p-4" animate>
            <h3 className="text-sm font-semibold text-white mb-3">Reference Flows</h3>
            <DropZone
              onFileSelect={handleFlowUpload}
              accept="audio/*"
              label="Drop reference flows"
              sublabel="Acapella + with-song files"
            />
            {referenceFlows.length > 0 && (
              <div className="mt-3 space-y-2">
                {referenceFlows.map((flow) => (
                  <div key={flow.id} className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2">
                    <Play size={12} className="text-white/40" />
                    <span className="text-xs text-white/70 flex-1 truncate">{flow.name}</span>
                    <button onClick={() => removeReferenceFlow(flow.id)}>
                      <X size={12} className="text-white/30 hover:text-white/70" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </GlassCard>

          <GlassCard className="p-4" animate>
            <h3 className="text-sm font-semibold text-white mb-3">Word Blacklist</h3>
            <div className="flex gap-2 mb-3">
              <input
                value={blacklistInput}
                onChange={(e) => setBlacklistInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleBlacklistAdd()}
                placeholder="Add word or phrase to avoid..."
                className="flex-1 bg-white/8 border border-white/12 rounded-xl px-3 py-2 text-sm text-white placeholder-white/30 outline-none focus:border-[#0a84ff]/50"
              />
              <GlassButton variant="ghost" size="sm" onClick={handleBlacklistAdd}>
                <Plus size={14} />
              </GlassButton>
            </div>
            {blacklist.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {blacklist.map((word) => (
                  <button
                    key={word}
                    onClick={() => removeFromBlacklist(word)}
                    className="flex items-center gap-1 text-xs bg-[#ff453a]/20 border border-[#ff453a]/30 text-[#ff453a] px-2 py-1 rounded-lg hover:bg-[#ff453a]/30"
                  >
                    {word} <X size={10} />
                  </button>
                ))}
              </div>
            )}
          </GlassCard>

          <GlassButton
            variant="primary"
            size="lg"
            onClick={handleGenerate}
            isLoading={isGenerating}
            className="w-full"
          >
            <Wand2 size={16} /> Generate Bars
          </GlassButton>
        </div>
      )}

      {/* Results Tab */}
      {activeTab === 'results' && (
        <div className="space-y-4">
          {isGenerating && (
            <div className="flex items-center justify-center gap-3 py-12">
              <RefreshCw size={20} className="animate-spin text-[#0a84ff]" />
              <span className="text-white/60">Generating bars...</span>
            </div>
          )}
          {lyricVariations.map((variation) => (
            <GlassCard
              key={variation.id}
              hoverable
              selected={selectedLyrics?.id === variation.id}
              className="p-5"
            >
              <div className="flex items-start gap-4">
                <ScoreRing score={variation.antiSlopScore} size={52} color="#32d74b" label="Anti-Slop" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="green">Anti-Slop: {variation.antiSlopScore}%</Badge>
                      <Badge variant="blue">Flow Fit: {variation.flowFitScore}%</Badge>
                      <Badge variant="default">{variation.barCount} bars</Badge>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <GlassButton variant="ghost" size="sm">
                        <RefreshCw size={12} />
                      </GlassButton>
                      <GlassButton
                        variant="primary"
                        size="sm"
                        onClick={() => {
                          setSelectedLyrics(variation)
                          setActiveTab('editor')
                        }}
                      >
                        <Edit2 size={12} /> Edit
                      </GlassButton>
                      <GlassButton
                        variant="success"
                        size="sm"
                        onClick={() => setSelectedLyrics(variation)}
                      >
                        <Check size={12} /> Select
                      </GlassButton>
                    </div>
                  </div>
                  {variation.antiSlopFlags.length > 0 && (
                    <div className="mb-2">
                      {variation.antiSlopFlags.map((flag, i) => (
                        <p key={i} className="text-xs text-[#ff9f0a] flex items-center gap-1">
                          ⚠️ {flag}
                        </p>
                      ))}
                    </div>
                  )}
                  <pre className="text-sm text-white/80 whitespace-pre-wrap font-sans leading-relaxed">
                    {variation.text}
                  </pre>
                </div>
              </div>
            </GlassCard>
          ))}
          {!isGenerating && lyricVariations.length === 0 && (
            <div className="text-center py-12">
              <p className="text-white/30 text-sm">Generate bars from the Input tab</p>
            </div>
          )}
        </div>
      )}

      {/* Editor Tab */}
      {activeTab === 'editor' && (
        <div className="space-y-4">
          {selectedLyrics ? (
            <GlassCard className="p-5" animate>
              <h3 className="text-sm font-semibold text-white mb-3">Edit Lyrics</h3>
              <div className="flex gap-2 mb-3">
                <Badge variant="green">Anti-Slop: {selectedLyrics.antiSlopScore}%</Badge>
                <Badge variant="default">{selectedLyrics.barCount} bars · {selectedLyrics.wordCount} words</Badge>
              </div>
              <textarea
                value={editedLyrics}
                onChange={(e) => setEditedLyrics(e.target.value)}
                className="w-full h-64 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#0a84ff]/50 resize-none font-mono leading-relaxed"
              />
              {blacklist.length > 0 && (
                <p className="text-xs text-white/40 mt-2">
                  ⚠️ Blacklisted words: {blacklist.join(', ')}
                </p>
              )}
            </GlassCard>
          ) : (
            <div className="text-center py-12">
              <p className="text-white/30 text-sm">Select a lyric variation from Results to edit</p>
            </div>
          )}
        </div>
      )}

      {/* Topline Tab */}
      {activeTab === 'topline' && (
        <div className="space-y-4">
          <GlassCard className="p-5" animate>
            <h3 className="text-base font-semibold text-white mb-1">Vocal Performance Guide</h3>
            <p className="text-xs text-white/50 mb-4">
              Apple Music-style synced text — follow the highlighted word
            </p>
            {toplineData ? (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <GlassButton
                    variant="primary"
                    size="md"
                    onClick={() => setIsToplinePlaying(!isToplinePlaying)}
                  >
                    {isToplinePlaying ? <Pause size={14} /> : <Play size={14} />}
                    {isToplinePlaying ? 'Pause Flow' : 'Play Flow Guide'}
                  </GlassButton>
                </div>

                {/* Synced lyrics display */}
                <div className="p-4 bg-black/20 rounded-xl flex flex-wrap gap-1.5">
                  {toplineData.syncedLyrics.map((w, i) => {
                    const isActive =
                      isToplinePlaying &&
                      currentToplineTime >= w.startTime &&
                      currentToplineTime < w.endTime
                    return (
                      <span
                        key={i}
                        className={cn(
                          'text-base transition-all duration-150',
                          isActive ? 'text-white font-bold' : 'text-white/40',
                        )}
                      >
                        {w.word}
                      </span>
                    )
                  })}
                </div>

                {/* Flow notations */}
                <div className="mt-4">
                  <h4 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">
                    Flow Notations
                  </h4>
                  <div className="space-y-2">
                    {toplineData.flowNotations.map((n, i) => {
                      const colorMap = {
                        'speed-up': 'text-[#ff9f0a]',
                        'slow-down': 'text-[#0a84ff]',
                        emphasis: 'text-[#bf5af2]',
                        pause: 'text-[#ff453a]',
                        normal: 'text-white/50',
                      }
                      return (
                        <div key={i} className="flex items-center gap-2">
                          <Badge variant="default" size="sm">Bar {n.barStart + 1}</Badge>
                          <span className={cn('text-xs', colorMap[n.type])}>
                            {n.type.replace('-', ' ')}
                          </span>
                          <span className="text-xs text-white/50">— {n.label}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-white/30 text-sm">Generate bars first to see the topline guide</p>
              </div>
            )}
          </GlassCard>
        </div>
      )}
    </div>
  )
}
