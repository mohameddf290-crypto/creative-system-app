import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp, CheckSquare, Square, Lock, RefreshCw, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useEngineeringStore } from '@/stores/use-engineering-store'
import { GlassCard } from '@/components/shared/glass-card'
import { GlassButton } from '@/components/shared/glass-button'
import { DropZone } from '@/components/shared/drop-zone'
import { Badge } from '@/components/shared/badge'
import { generateId } from '@/utils'
import { cn } from '@/utils'

export function EngineeringPage() {
  const {
    stems,
    roadmap,
    currentPhase,
    completedInstructions,
    plugins,
    isAnalyzing,
    addStem,
    removeStem,
    updateStemName,
    setReferenceTrack,
    referenceTrackName,
    toggleInstruction,
    completePhase,
    removePlugin,
    generateRoadmap,
  } = useEngineeringStore()

  const [activeTab, setActiveTab] = useState<'setup' | 'roadmap' | 'plugins'>('setup')
  const [expandedPhases, setExpandedPhases] = useState<Set<string>>(new Set(['phase-1']))

  const togglePhase = (id: string) => {
    setExpandedPhases((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleStemUpload = (f: File) => {
    addStem({ id: generateId(), name: f.name.replace(/\.[^.]+$/, ''), filePath: f.name, category: 'Instrument' })
  }

  const getPhaseProgress = (phaseId: string) => {
    const phase = roadmap.find((p) => p.id === phaseId)
    if (!phase) return { completed: 0, total: 0 }
    const allInstructions = phase.instruments.flatMap((i) => i.instructions)
    const total = allInstructions.length
    const completed = allInstructions.filter((i) => completedInstructions.has(i.id)).length
    return { completed, total }
  }

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-xl font-semibold text-white">Engineering</h2>
        <p className="text-sm text-white/50 mt-1">
          Precision mixing roadmap. Every instrument. Every phase. Industry grade.
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white/5 p-1 rounded-xl w-fit">
        {(['setup', 'roadmap', 'plugins'] as const).map((tab) => (
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

      {/* Setup Tab */}
      {activeTab === 'setup' && (
        <div className="space-y-4">
          <GlassCard className="p-4" animate>
            <h3 className="text-sm font-semibold text-white mb-3">Upload Stems</h3>
            <DropZone
              onFileSelect={handleStemUpload}
              accept="audio/*"
              label="Drop stems here"
              sublabel="Upload individual tracks (kick, 808, snare, etc.)"
              multiple
            />
            {stems.length > 0 && (
              <div className="mt-3 space-y-2">
                {stems.map((stem) => (
                  <div key={stem.id} className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2">
                    <div className="w-1.5 h-6 rounded-full bg-[#0a84ff]/60" />
                    <input
                      value={stem.name}
                      onChange={(e) => updateStemName(stem.id, e.target.value)}
                      className="flex-1 bg-transparent text-sm text-white outline-none"
                    />
                    <button onClick={() => removeStem(stem.id)}>
                      <Trash2 size={14} className="text-white/30 hover:text-[#ff453a]" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </GlassCard>

          <GlassCard className="p-4" animate>
            <h3 className="text-sm font-semibold text-white mb-3">Reference Track (Optional)</h3>
            <DropZone
              onFileSelect={setReferenceTrack}
              accept="audio/*"
              label="Drop reference track"
              sublabel="For A/B comparison during mixing"
              fileName={referenceTrackName}
            />
          </GlassCard>

          <GlassButton
            variant="primary"
            size="lg"
            onClick={() => { generateRoadmap(); setActiveTab('roadmap') }}
            isLoading={isAnalyzing}
            className="w-full"
          >
            <RefreshCw size={16} /> Analyze & Create Roadmap
          </GlassButton>
        </div>
      )}

      {/* Roadmap Tab */}
      {activeTab === 'roadmap' && (
        <div className="space-y-3">
          {isAnalyzing && (
            <div className="flex items-center justify-center gap-3 py-12">
              <RefreshCw size={20} className="animate-spin text-[#0a84ff]" />
              <span className="text-white/60">Building roadmap...</span>
            </div>
          )}

          {roadmap.length > 0 && (
            <>
              {/* Progress bar */}
              <GlassCard className="p-4" animate>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-white/60">Overall Progress</span>
                  <span className="text-xs text-white/60">{currentPhase} / {roadmap.length} phases</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#0a84ff] to-[#bf5af2] rounded-full transition-all duration-500"
                    style={{ width: `${(currentPhase / roadmap.length) * 100}%` }}
                  />
                </div>
              </GlassCard>

              {roadmap.map((phase) => {
                const { completed, total } = getPhaseProgress(phase.id)
                const isExpanded = expandedPhases.has(phase.id)
                const isCurrentPhase = phase.phaseNumber === currentPhase + 1
                return (
                  <GlassCard
                    key={phase.id}
                    className={cn(
                      'overflow-hidden',
                      phase.isComplete && 'border-[#32d74b]/30',
                      isCurrentPhase && 'border-[#0a84ff]/30',
                      phase.isLocked && 'opacity-60',
                    )}
                    animate={false}
                  >
                    {/* Phase header */}
                    <button
                      className="w-full flex items-center gap-3 p-4 text-left hover:bg-white/3 transition-colors"
                      onClick={() => togglePhase(phase.id)}
                    >
                      <div className={cn(
                        'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm font-bold',
                        phase.isComplete ? 'bg-[#32d74b]/20 text-[#32d74b]' : isCurrentPhase ? 'bg-[#0a84ff]/20 text-[#0a84ff]' : 'bg-white/8 text-white/40'
                      )}>
                        {phase.isLocked ? <Lock size={14} /> : phase.phaseNumber}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-white">PHASE {phase.phaseNumber}: {phase.phaseName}</p>
                          {phase.isComplete && <Badge variant="green" size="sm">Complete</Badge>}
                          {isCurrentPhase && !phase.isComplete && <Badge variant="blue" size="sm">Current</Badge>}
                          {phase.isLocked && <Badge variant="default" size="sm">Locked</Badge>}
                        </div>
                        <p className="text-xs text-white/40 mt-0.5">{completed}/{total} instructions complete</p>
                      </div>
                      {isExpanded ? <ChevronUp size={16} className="text-white/40" /> : <ChevronDown size={16} className="text-white/40" />}
                    </button>

                    {/* Phase content */}
                    {isExpanded && (
                      <div className="border-t border-white/8">
                        <div className="px-4 py-3">
                          <p className="text-xs text-white/50 mb-4">{phase.description}</p>
                          {phase.instruments.map((instrument) => (
                            <div key={instrument.instrumentName} className="mb-5">
                              <p className="text-xs font-bold text-white/80 uppercase tracking-wider mb-2">
                                {instrument.instrumentName}
                              </p>
                              <div className="space-y-3">
                                {instrument.instructions.map((instr) => {
                                  const isDone = completedInstructions.has(instr.id)
                                  return (
                                    <div
                                      key={instr.id}
                                      className={cn(
                                        'flex gap-3 p-3 rounded-xl transition-all',
                                        isDone ? 'bg-[#32d74b]/8' : 'bg-white/3',
                                      )}
                                    >
                                      <button
                                        onClick={() => toggleInstruction(instr.id)}
                                        className="flex-shrink-0 mt-0.5"
                                      >
                                        {isDone ? (
                                          <CheckSquare size={18} className="text-[#32d74b]" />
                                        ) : (
                                          <Square size={18} className="text-white/30" />
                                        )}
                                      </button>
                                      <div className="flex-1 min-w-0">
                                        <p className={cn('text-sm', isDone ? 'text-white/50 line-through' : 'text-white')}>
                                          {instr.text}
                                        </p>
                                        {instr.parameterDetails && (
                                          <code className="text-xs text-[#0a84ff] bg-[#0a84ff]/10 px-2 py-0.5 rounded mt-1 inline-block">
                                            {instr.parameterDetails}
                                          </code>
                                        )}
                                        <p className="text-xs text-white/40 mt-1 italic">{instr.why}</p>
                                      </div>
                                    </div>
                                  )
                                })}
                              </div>
                            </div>
                          ))}
                          {!phase.isComplete && !phase.isLocked && completed === total && total > 0 && (
                            <GlassButton
                              variant="success"
                              size="sm"
                              onClick={() => completePhase(phase.id)}
                              className="mt-2"
                            >
                              Mark Phase Complete →
                            </GlassButton>
                          )}
                        </div>
                      </div>
                    )}
                  </GlassCard>
                )
              })}
            </>
          )}

          {!isAnalyzing && roadmap.length === 0 && (
            <div className="text-center py-12">
              <p className="text-white/30 text-sm">Upload stems from the Setup tab to generate a roadmap</p>
            </div>
          )}
        </div>
      )}

      {/* Plugins Tab */}
      {activeTab === 'plugins' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-white">Plugin Database</h3>
            <GlassButton variant="primary" size="sm">
              <Plus size={14} /> Add Plugin
            </GlassButton>
          </div>
          <div className="space-y-2">
            {plugins.map((plugin) => (
              <GlassCard key={plugin.id} className="p-4" hoverable>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0a84ff]/20 to-[#bf5af2]/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">{plugin.category === 'EQ' ? '🎛' : plugin.category === 'Compressor' ? '⚡' : '🌊'}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white">{plugin.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Badge variant="default" size="sm">{plugin.category}</Badge>
                      {plugin.manualStatus === 'uploaded' ? (
                        <Badge variant="green" size="sm">Manual ✓</Badge>
                      ) : (
                        <Badge variant="orange" size="sm">No Manual</Badge>
                      )}
                    </div>
                  </div>
                  <button onClick={() => removePlugin(plugin.id)}>
                    <Trash2 size={14} className="text-white/30 hover:text-[#ff453a]" />
                  </button>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
