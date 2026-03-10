import { motion } from 'framer-motion'
import { Play, Pause, Wand2, Download, GitCompare, Check } from 'lucide-react'
import { useMelodyStore } from '@/stores/use-melody-store'
import { GlassCard } from '@/components/shared/glass-card'
import { GlassButton } from '@/components/shared/glass-button'
import { Badge } from '@/components/shared/badge'
import { ScoreRing } from '@/components/shared/score-ring'
import { midiNoteToName } from '@/utils'
import type { MelodyVariation, TimeSignature, Contour, Articulation } from '@/types'

const PIANO_ROLL_HEIGHT = 80
const NOTE_HEIGHT = 6
const BEAT_WIDTH = 28

function MiniPianoRoll({ melody }: { melody: MelodyVariation }) {
  if (!melody.notes.length) return null
  const minPitch = Math.min(...melody.notes.map((n) => n.pitch)) - 2
  const maxPitch = Math.max(...melody.notes.map((n) => n.pitch)) + 2
  const pitchRange = maxPitch - minPitch
  const totalBeats = Math.max(...melody.notes.map((n) => n.startBeat + n.duration)) + 1

  return (
    <div
      className="relative bg-black/30 rounded-lg overflow-hidden"
      style={{ height: PIANO_ROLL_HEIGHT, width: '100%' }}
    >
      {/* Grid lines */}
      {Array.from({ length: Math.ceil(totalBeats) }).map((_, i) => (
        <div
          key={i}
          className="absolute top-0 bottom-0 border-l border-white/5"
          style={{ left: i * BEAT_WIDTH }}
        />
      ))}
      {/* Notes */}
      {melody.notes.map((note, i) => {
        const y = ((maxPitch - note.pitch) / pitchRange) * (PIANO_ROLL_HEIGHT - NOTE_HEIGHT)
        const x = note.startBeat * BEAT_WIDTH
        const w = Math.max(note.duration * BEAT_WIDTH - 2, 4)
        const alpha = note.velocity / 127
        return (
          <div
            key={i}
            className="absolute rounded-sm"
            style={{
              left: x,
              top: y,
              width: w,
              height: NOTE_HEIGHT,
              backgroundColor: `rgba(10, 132, 255, ${alpha})`,
            }}
            title={`${midiNoteToName(note.pitch)} vel:${note.velocity}`}
          />
        )
      })}
    </div>
  )
}

export function MelodyPage() {
  const {
    chordProgression,
    tempo,
    timeSignature,
    length,
    contour,
    articulation,
    melodies,
    selectedMelody,
    playingMelodyId,
    isGenerating,
    setChordProgression,
    setTempo,
    setTimeSignature,
    setLength,
    setContour,
    setArticulation,
    setSelectedMelody,
    setPlayingMelodyId,
    generateMelodies,
  } = useMelodyStore()

  const togglePlay = (id: string) => {
    setPlayingMelodyId(playingMelodyId === id ? null : id)
  }

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-xl font-semibold text-white">Melody</h2>
        <p className="text-sm text-white/50 mt-1">
          Instrumental melodies — intellectual, human, emotionally resonant.
        </p>
      </motion.div>

      {/* Input panel */}
      <GlassCard className="p-5 space-y-4" animate>
        <h3 className="text-sm font-semibold text-white">Generation Parameters</h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-white/50 mb-1 block">Chord Progression</label>
            <input
              value={chordProgression}
              onChange={(e) => setChordProgression(e.target.value)}
              className="w-full bg-white/8 border border-white/12 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-[#0a84ff]/50"
              placeholder="e.g. Am7 → Dm9 → G7 → Cmaj7"
            />
          </div>
          <div>
            <label className="text-xs text-white/50 mb-1 block">Tempo (BPM)</label>
            <input
              type="number"
              value={tempo}
              onChange={(e) => setTempo(Number(e.target.value))}
              className="w-full bg-white/8 border border-white/12 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-[#0a84ff]/50"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-xs text-white/50 mb-1 block">Time Signature</label>
            <select
              value={timeSignature}
              onChange={(e) => setTimeSignature(e.target.value as TimeSignature)}
              className="w-full bg-white/8 border border-white/12 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-[#0a84ff]/50"
            >
              {['4/4', '3/4', '6/8', '5/4', '7/8'].map((sig) => (
                <option key={sig} value={sig} className="bg-[#1a1a1a]">{sig}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-white/50 mb-1 block">Length (bars)</label>
            <select
              value={length}
              onChange={(e) => setLength(Number(e.target.value) as 1 | 2 | 4 | 8)}
              className="w-full bg-white/8 border border-white/12 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-[#0a84ff]/50"
            >
              {[1, 2, 4, 8].map((n) => (
                <option key={n} value={n} className="bg-[#1a1a1a]">{n} bars</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-white/50 mb-1 block">Contour</label>
            <select
              value={contour}
              onChange={(e) => setContour(e.target.value as Contour)}
              className="w-full bg-white/8 border border-white/12 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-[#0a84ff]/50"
            >
              {['arch', 'wave', 'angular', 'surprise'].map((c) => (
                <option key={c} value={c} className="bg-[#1a1a1a]">{c.charAt(0).toUpperCase() + c.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="text-xs text-white/50 mb-2 block">Articulation</label>
          <div className="flex gap-2">
            {(['legato', 'staccato', 'mixed', 'surprise'] as Articulation[]).map((art) => (
              <button
                key={art}
                onClick={() => setArticulation(art)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  articulation === art
                    ? 'bg-[#0a84ff]/30 border border-[#0a84ff]/60 text-[#0a84ff]'
                    : 'bg-white/5 border border-white/10 text-white/50 hover:text-white'
                }`}
              >
                {art.charAt(0).toUpperCase() + art.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <GlassButton
          variant="primary"
          size="lg"
          onClick={generateMelodies}
          isLoading={isGenerating}
          className="w-full"
        >
          <Wand2 size={16} /> Generate Melodies
        </GlassButton>
      </GlassCard>

      {/* Results */}
      {melodies.length > 0 && (
        <div>
          <h3 className="text-base font-semibold text-white mb-3">
            Melody Variations ({melodies.length})
          </h3>
          <div className="space-y-3">
            {melodies.map((melody) => (
              <GlassCard
                key={melody.id}
                hoverable
                selected={selectedMelody?.id === melody.id}
                className="p-4"
              >
                <div className="flex items-start gap-4">
                  <ScoreRing score={melody.qualityScore} size={52} label="Quality" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="blue">{melody.contour}</Badge>
                        <Badge variant="purple">{melody.articulation}</Badge>
                        {melody.emotionTags.map((tag) => (
                          <Badge key={tag} variant="default" size="sm">{tag}</Badge>
                        ))}
                      </div>
                      <div className="flex gap-1.5 flex-shrink-0">
                        <GlassButton
                          variant="ghost"
                          size="sm"
                          onClick={() => togglePlay(melody.id)}
                        >
                          {playingMelodyId === melody.id ? <Pause size={12} /> : <Play size={12} />}
                        </GlassButton>
                        <GlassButton variant="ghost" size="sm">
                          <GitCompare size={12} />
                        </GlassButton>
                        <GlassButton
                          variant="primary"
                          size="sm"
                          onClick={() => setSelectedMelody(melody)}
                        >
                          <Check size={12} /> Select
                        </GlassButton>
                      </div>
                    </div>
                    <MiniPianoRoll melody={melody} />
                    <p className="text-xs text-white/50 mt-2 leading-relaxed">{melody.explanation}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {selectedMelody && (
        <GlassCard className="p-5" animate>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-white">Selected Melody</h3>
            <GlassButton variant="ghost" size="sm">
              <Download size={14} /> Export MIDI
            </GlassButton>
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge variant="green">Selected</Badge>
            <Badge variant="blue">{selectedMelody.qualityScore}% quality</Badge>
            <Badge variant="purple">{selectedMelody.contour}</Badge>
          </div>
          <MiniPianoRoll melody={selectedMelody} />
        </GlassCard>
      )}

      {!isGenerating && melodies.length === 0 && (
        <div className="text-center py-12">
          <p className="text-white/30 text-sm">Configure parameters and generate melodies above</p>
        </div>
      )}
    </div>
  )
}
