import { motion } from 'framer-motion'
import { Play, Pause, Edit2, RefreshCw, ChevronDown, ChevronUp, Check } from 'lucide-react'
import { useState } from 'react'
import { useChordsStore } from '@/stores/use-chords-store'
import { GlassCard } from '@/components/shared/glass-card'
import { GlassButton } from '@/components/shared/glass-button'
import { DropZone } from '@/components/shared/drop-zone'
import { ScoreRing } from '@/components/shared/score-ring'
import { Badge } from '@/components/shared/badge'
import { cn } from '@/utils'
import type { ChordInterpretation } from '@/types'

function ChordTimeline({
  interpretation,
  isPlaying,
  currentTime,
}: {
  interpretation: ChordInterpretation
  isPlaying: boolean
  currentTime: number
}) {
  const totalDuration = interpretation.progression.reduce((sum, c) => sum + c.duration, 0)
  return (
    <div className="flex gap-1 mt-3">
      {interpretation.progression.map((chord, i) => {
        const isActive =
          isPlaying && currentTime >= chord.startTime && currentTime < chord.startTime + chord.duration
        return (
          <div
            key={i}
            className={cn(
              'flex-1 rounded-lg px-2 py-3 text-center transition-all duration-200',
              isActive
                ? 'bg-[#0a84ff]/30 border border-[#0a84ff]/60'
                : 'bg-white/5 border border-white/10',
            )}
            style={{ flexBasis: `${(chord.duration / totalDuration) * 100}%` }}
          >
            <p className={cn('text-xs font-bold', isActive ? 'text-[#0a84ff]' : 'text-white')}>
              {chord.chord}
            </p>
            <p className="text-[10px] text-white/30 mt-0.5">{Math.round(chord.confidence)}%</p>
          </div>
        )
      })}
    </div>
  )
}

export function ChordsPage() {
  const {
    audioFileName,
    bpm,
    key,
    interpretations,
    selectedInterpretation,
    isAnalyzing,
    isPlaying,
    currentTime,
    setAudioFile,
    setSelectedInterpretation,
    setIsPlaying,
    setBpm,
    setKey,
    runMockAnalysis,
  } = useChordsStore()
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [editingKey, setEditingKey] = useState(false)
  const [editingBpm, setEditingBpm] = useState(false)
  const [keyInput, setKeyInput] = useState('')
  const [bpmInput, setBpmInput] = useState('')

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-xl font-semibold text-white">Chords</h2>
        <p className="text-sm text-white/50 mt-1">
          Real chord analysis for real songs. Non-negotiable accuracy.
        </p>
      </motion.div>

      {/* Upload */}
      <GlassCard className="p-4" animate>
        <DropZone
          onFileSelect={(f) => {
            setAudioFile(f)
            runMockAnalysis()
          }}
          accept="audio/*"
          label="Drop drumless audio or melody"
          sublabel="WAV, MP3, FLAC supported"
          fileName={audioFileName}
        />
        {audioFileName && (
          <div className="flex items-center gap-3 mt-3">
            <GlassButton variant="ghost" size="sm" onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              {isPlaying ? 'Pause' : 'Play'}
            </GlassButton>
            {isAnalyzing && (
              <span className="text-xs text-[#0a84ff] flex items-center gap-1.5">
                <RefreshCw size={12} className="animate-spin" /> Analyzing chords...
              </span>
            )}
            {bpm && !isAnalyzing && (
              <div className="flex items-center gap-4 ml-auto">
                {/* BPM */}
                <div className="flex items-center gap-1">
                  <span className="text-xs text-white/40">BPM:</span>
                  {editingBpm ? (
                    <input
                      autoFocus
                      value={bpmInput}
                      onChange={(e) => setBpmInput(e.target.value)}
                      onBlur={() => {
                        const v = parseInt(bpmInput)
                        if (!isNaN(v)) setBpm(v)
                        setEditingBpm(false)
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          const v = parseInt(bpmInput)
                          if (!isNaN(v)) setBpm(v)
                          setEditingBpm(false)
                        }
                      }}
                      className="w-14 bg-white/10 border border-[#0a84ff]/50 rounded px-1 text-xs text-white outline-none"
                    />
                  ) : (
                    <button
                      onClick={() => { setEditingBpm(true); setBpmInput(String(bpm)) }}
                      className="flex items-center gap-1 text-xs text-white hover:text-[#0a84ff]"
                    >
                      {bpm} <Edit2 size={10} className="text-white/40" />
                    </button>
                  )}
                </div>
                {/* Key */}
                <div className="flex items-center gap-1">
                  <span className="text-xs text-white/40">Key:</span>
                  {editingKey ? (
                    <input
                      autoFocus
                      value={keyInput}
                      onChange={(e) => setKeyInput(e.target.value)}
                      onBlur={() => { setKey(keyInput || key); setEditingKey(false) }}
                      onKeyDown={(e) => { if (e.key === 'Enter') { setKey(keyInput || key); setEditingKey(false) } }}
                      className="w-20 bg-white/10 border border-[#0a84ff]/50 rounded px-1 text-xs text-white outline-none"
                    />
                  ) : (
                    <button
                      onClick={() => { setEditingKey(true); setKeyInput(key ?? '') }}
                      className="flex items-center gap-1 text-xs text-white hover:text-[#0a84ff]"
                    >
                      {key} <Edit2 size={10} className="text-white/40" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </GlassCard>

      {/* Interpretations */}
      {interpretations.length > 0 && (
        <div>
          <h3 className="text-base font-semibold text-white mb-3">
            Chord Interpretations ({interpretations.length})
          </h3>
          <div className="space-y-3">
            {interpretations.map((interp) => (
              <GlassCard
                key={interp.id}
                hoverable
                selected={selectedInterpretation?.id === interp.id}
                className="p-4"
              >
                <div className="flex items-start gap-4">
                  <ScoreRing score={interp.confidenceScore} size={52} label="Confidence" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-white">{interp.label}</p>
                        <p className="text-xs text-white/50 mt-0.5 font-mono">
                          {interp.progression.map((c) => c.chord).join(' → ')}
                        </p>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <GlassButton variant="ghost" size="sm">
                          <Play size={12} />
                        </GlassButton>
                        <GlassButton
                          variant="primary"
                          size="sm"
                          onClick={() => setSelectedInterpretation(interp)}
                        >
                          <Check size={12} /> Select
                        </GlassButton>
                      </div>
                    </div>

                    <ChordTimeline
                      interpretation={interp}
                      isPlaying={isPlaying && selectedInterpretation?.id === interp.id}
                      currentTime={currentTime}
                    />

                    <button
                      onClick={() => setExpandedId(expandedId === interp.id ? null : interp.id)}
                      className="flex items-center gap-1 text-xs text-white/30 hover:text-white/60 mt-2"
                    >
                      {expandedId === interp.id ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                      Why this interpretation
                    </button>
                    {expandedId === interp.id && (
                      <p className="text-xs text-white/50 mt-2 leading-relaxed">{interp.reasoning}</p>
                    )}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {selectedInterpretation && (
        <GlassCard className="p-5" animate>
          <h3 className="text-base font-semibold text-white mb-1">Selected Interpretation</h3>
          <p className="text-sm text-white/50 mb-3">{selectedInterpretation.label}</p>
          <div className="flex items-center gap-3 mb-3">
            <Badge variant="green">Selected</Badge>
            <Badge variant="blue">{selectedInterpretation.confidenceScore}% confidence</Badge>
          </div>
          <p className="text-sm font-mono text-white/80">
            {selectedInterpretation.progression.map((c) => c.chord).join(' → ')}
          </p>
        </GlassCard>
      )}

      {!audioFileName && (
        <div className="text-center py-12">
          <p className="text-white/30 text-sm">Upload an audio file to detect chord progressions</p>
        </div>
      )}
    </div>
  )
}
