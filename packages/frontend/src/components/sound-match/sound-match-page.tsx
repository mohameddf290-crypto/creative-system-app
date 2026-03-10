import { motion } from 'framer-motion'
import { Play, ChevronDown, ChevronUp, Zap, RefreshCw } from 'lucide-react'
import { useState } from 'react'
import { useSoundMatchStore } from '@/stores/use-sound-match-store'
import { GlassCard } from '@/components/shared/glass-card'
import { GlassButton } from '@/components/shared/glass-button'
import { DropZone } from '@/components/shared/drop-zone'
import { ScoreRing } from '@/components/shared/score-ring'
import { Badge } from '@/components/shared/badge'
import { cn } from '@/utils'

function SpectralBar({ values, color = '#0a84ff' }: { values: number[]; color?: string }) {
  return (
    <div className="flex items-end gap-0.5 h-12">
      {values.map((v, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm opacity-70"
          style={{ height: `${v * 100}%`, backgroundColor: color }}
        />
      ))}
    </div>
  )
}

export function SoundMatchPage() {
  const {
    referenceAudioName,
    analysisResult,
    presetMatches,
    selectedMatch,
    isAnalyzing,
    setReferenceAudio,
    setSelectedMatch,
    runMockAnalysis,
  } = useSoundMatchStore()
  const [expandedRaw, setExpandedRaw] = useState(false)
  const [expandedModIds, setExpandedModIds] = useState<Set<string>>(new Set())

  const toggleMod = (id: string) => {
    setExpandedModIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-xl font-semibold text-white">SoundMatch</h2>
        <p className="text-sm text-white/50 mt-1">
          Upload a reference sound. Get inspiration — not imitation.
        </p>
      </motion.div>

      {/* Drop zone */}
      <GlassCard className="p-4" animate>
        <DropZone
          onFileSelect={(f) => {
            setReferenceAudio(f)
            runMockAnalysis()
          }}
          accept=".wav,.mp3,.flac,.ogg,audio/*"
          label="Drop reference audio here"
          sublabel="Accepts WAV, MP3, FLAC, OGG"
          fileName={referenceAudioName}
        />
        {referenceAudioName && (
          <div className="flex items-center gap-2 mt-3">
            <GlassButton variant="ghost" size="sm">
              <Play size={14} /> Preview
            </GlassButton>
            {isAnalyzing && (
              <span className="text-xs text-[#0a84ff] flex items-center gap-1.5">
                <RefreshCw size={12} className="animate-spin" /> Analyzing...
              </span>
            )}
          </div>
        )}
      </GlassCard>

      {/* Analysis */}
      {analysisResult && (
        <GlassCard className="p-5" animate>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-white">Tonal Character</h3>
            <button
              onClick={() => setExpandedRaw(!expandedRaw)}
              className="flex items-center gap-1 text-xs text-white/40 hover:text-white/70"
            >
              {expandedRaw ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              {expandedRaw ? 'Hide' : 'Raw data'}
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {analysisResult.interpretedLabels.map((label) => (
              <Badge key={label} variant="blue">
                {label}
              </Badge>
            ))}
          </div>
          {expandedRaw && (
            <div className="grid grid-cols-2 gap-2 text-xs">
              {Object.entries(analysisResult)
                .filter(([k]) => k !== 'interpretedLabels')
                .map(([k, v]) => (
                  <div key={k} className="flex gap-2">
                    <span className="text-white/40 capitalize">{k}:</span>
                    <span className="text-white/80">{String(v)}</span>
                  </div>
                ))}
            </div>
          )}
        </GlassCard>
      )}

      {/* Preset Matches */}
      {presetMatches.length > 0 && (
        <div>
          <h3 className="text-base font-semibold text-white mb-3">
            Inspiration Matches ({presetMatches.length})
          </h3>
          <div className="space-y-3">
            {presetMatches.map((match) => (
              <GlassCard
                key={match.id}
                hoverable
                selected={selectedMatch?.id === match.id}
                className="p-4"
              >
                <div className="flex items-start gap-4">
                  <ScoreRing score={match.inspirationScore} size={56} label="Inspiration" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-white">{match.presetName}</p>
                        <p className="text-xs text-white/50 mt-0.5">{match.pluginName}</p>
                      </div>
                      <div className="flex gap-2">
                        <GlassButton variant="ghost" size="sm">
                          <Play size={12} />
                        </GlassButton>
                        <GlassButton
                          variant="primary"
                          size="sm"
                          onClick={() => setSelectedMatch(match)}
                        >
                          Modify
                        </GlassButton>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {match.tags.map((tag) => (
                        <Badge key={tag} variant="default" size="sm">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-3">
                      <p className="text-xs text-white/40 mb-1">Spectral comparison</p>
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <p className="text-[10px] text-white/30 mb-1">Reference</p>
                          <SpectralBar values={[0.3, 0.5, 0.8, 0.9, 0.8, 0.6, 0.4, 0.3, 0.2, 0.1]} color="#bf5af2" />
                        </div>
                        <div className="flex-1">
                          <p className="text-[10px] text-white/30 mb-1">Preset</p>
                          <SpectralBar values={match.spectralData} color="#0a84ff" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modification instructions */}
                {selectedMatch?.id === match.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 pt-4 border-t border-white/10"
                  >
                    <h4 className="text-sm font-semibold text-white mb-3">Modification Steps</h4>
                    <div className="space-y-3">
                      {match.modificationInstructions.map((step) => (
                        <div key={step.step} className="flex gap-3">
                          <div className="w-6 h-6 rounded-full bg-[#0a84ff]/20 border border-[#0a84ff]/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-bold text-[#0a84ff]">{step.step}</span>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-white">{step.instruction}</p>
                            {step.parameterValue && (
                              <code className="text-xs text-[#0a84ff] bg-[#0a84ff]/10 px-2 py-0.5 rounded mt-1 inline-block">
                                {step.parameterValue}
                              </code>
                            )}
                            <button
                              onClick={() => toggleMod(`${match.id}-${step.step}`)}
                              className={cn(
                                'flex items-center gap-1 text-xs mt-1',
                                expandedModIds.has(`${match.id}-${step.step}`)
                                  ? 'text-white/60'
                                  : 'text-white/30 hover:text-white/60',
                              )}
                            >
                              <Zap size={11} />
                              {expandedModIds.has(`${match.id}-${step.step}`) ? 'Hide' : 'Why'}
                            </button>
                            {expandedModIds.has(`${match.id}-${step.step}`) && (
                              <p className="text-xs text-white/50 mt-1 italic">{step.why}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {!referenceAudioName && (
        <div className="text-center py-12">
          <p className="text-white/30 text-sm">Upload a reference audio file to begin analysis</p>
        </div>
      )}
    </div>
  )
}
