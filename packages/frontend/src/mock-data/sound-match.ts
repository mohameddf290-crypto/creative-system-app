import type { PresetMatch, AudioAnalysis } from '@/types'

export const mockAudioAnalysis: AudioAnalysis = {
  frequency: 'Bright / Upper-Mid Focused',
  timbre: 'Metallic + Airy',
  attack: 'Fast Attack (~2ms)',
  decay: 'Short Decay',
  sustain: 'Low Sustain',
  release: 'Quick Release',
  harmonics: 'Rich Odd Harmonics + Slight Saturation',
  modulation: 'Subtle Vibrato (0.3 Hz)',
  spatial: 'Wide Stereo (85% width)',
  dynamics: 'Highly Compressed (5:1 ratio)',
  interpretedLabels: ['Bright', 'Metallic', 'Wide', 'Punchy', 'Atmospheric', 'Compressed'],
}

export const mockPresetMatches: PresetMatch[] = [
  {
    id: 'preset-1',
    presetName: 'Ethereal Drift',
    pluginName: 'Serum (Xfer Records)',
    inspirationScore: 91,
    tags: ['bright', 'atmospheric', 'wide'],
    spectralData: [0.2, 0.4, 0.7, 0.9, 0.8, 0.6, 0.4, 0.3, 0.2, 0.1],
    modificationInstructions: [
      {
        step: 1,
        instruction: 'Increase the Wavetable A position to 42% (from default 18%)',
        why: 'The reference has stronger upper partials — moving the wavetable position reveals brighter harmonic content that matches the metallic sheen.',
        parameterValue: 'Osc A Wt Pos: 42',
      },
      {
        step: 2,
        instruction: 'Set Filter Cutoff to 14.2kHz, Resonance to 22%',
        why: "The reference's high-frequency air sits above 12kHz. Opening the filter cutoff while keeping modest resonance preserves brightness without harshness.",
        parameterValue: 'CUT: 14.2k, RES: 22%',
      },
      {
        step: 3,
        instruction: 'Enable Reverb module: Size 65%, Damp 40%, Width 90%, Mix 28%',
        why: "Wide stereo reverb is a hallmark of the reference's spatial character. This setting creates depth without muddying the transients.",
        parameterValue: 'Rev Size: 65, Damp: 40, Width: 90, Mix: 28',
      },
    ],
  },
  {
    id: 'preset-2',
    presetName: 'Chrome Shadow',
    pluginName: 'Vital (Matt Tytel)',
    inspirationScore: 84,
    tags: ['metallic', 'dark', 'punchy'],
    spectralData: [0.3, 0.5, 0.8, 0.7, 0.5, 0.4, 0.3, 0.2, 0.15, 0.1],
    modificationInstructions: [
      {
        step: 1,
        instruction: 'Push Distortion Drive to 35% with Hard Clip mode',
        why: 'The reference shows saturated odd harmonics — hard clipping generates the metallic edge characteristic of the source material.',
        parameterValue: 'Drive: 35%, Mode: Hard Clip',
      },
      {
        step: 2,
        instruction: 'Set Compressor Attack to 1.8ms, Release to 45ms, Ratio 4.5:1',
        why: 'Matching the tight compression profile of the reference — fast attack clamps transients to create that punchy, controlled dynamic.',
        parameterValue: 'Att: 1.8ms, Rel: 45ms, Ratio: 4.5:1',
      },
    ],
  },
  {
    id: 'preset-3',
    presetName: 'Obsidian Air',
    pluginName: 'Massive X (Native Instruments)',
    inspirationScore: 78,
    tags: ['airy', 'wide', 'atmospheric'],
    spectralData: [0.1, 0.3, 0.5, 0.6, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2],
    modificationInstructions: [
      {
        step: 1,
        instruction: 'Morph Oscillator 1 phase to 180°, Oscillator 2 to 270°',
        why: 'Phase offset between oscillators creates the airy stereo spread heard in the reference — phase cancellation in mono is acceptable for atmosphere pads.',
        parameterValue: 'Osc1 Phase: 180°, Osc2 Phase: 270°',
      },
    ],
  },
  {
    id: 'preset-4',
    presetName: 'Frozen Pulse',
    pluginName: 'Phase Plant (Kilohearts)',
    inspirationScore: 72,
    tags: ['bright', 'fast-attack', 'transient'],
    spectralData: [0.4, 0.6, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.05],
    modificationInstructions: [
      {
        step: 1,
        instruction: 'Set Transient Shaper Attack to +8dB, Sustain to -3dB',
        why: "The reference has a pronounced attack snap with minimal sustain bloom — this transient shape directly mirrors the source's dynamic envelope.",
        parameterValue: 'TS Attack: +8dB, Sustain: -3dB',
      },
    ],
  },
  {
    id: 'preset-5',
    presetName: 'Quantum Static',
    pluginName: 'Pigments (Arturia)',
    inspirationScore: 65,
    tags: ['noisy', 'textured', 'compressed'],
    spectralData: [0.5, 0.5, 0.6, 0.5, 0.4, 0.35, 0.3, 0.25, 0.2, 0.15],
    modificationInstructions: [
      {
        step: 1,
        instruction: 'Enable Noise engine, set Type to White, Level to 18%',
        why: 'Controlled noise injection recreates the textural quality of the reference — at 18% it sits beneath the tonal content without masking it.',
        parameterValue: 'Noise Type: White, Level: 18%',
      },
    ],
  },
]
