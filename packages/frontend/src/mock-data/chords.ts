import type { ChordInterpretation } from '@/types'

export const mockChordInterpretations: ChordInterpretation[] = [
  {
    id: 'interp-1',
    label: 'Minor Modal — Dorian Flavour',
    confidenceScore: 94,
    progression: [
      { chord: 'Dm9', startTime: 0, duration: 2.1, confidence: 96 },
      { chord: 'Am11', startTime: 2.1, duration: 2.1, confidence: 93 },
      { chord: 'Gmaj7', startTime: 4.2, duration: 2.1, confidence: 91 },
      { chord: 'Em7', startTime: 6.3, duration: 2.1, confidence: 94 },
    ],
    reasoning:
      'The raised 6th degree strongly suggests Dorian mode over natural minor. The Gmaj7 chord (major VII in D context) is the signature Dorian colour chord — it avoids the diminished chord of natural minor and gives that smooth, jazz-influenced melancholic feel. Per-chord confidence is high across all four events. The bass movement outlines D–A–G–E, consistent with Dorian harmony.',
  },
  {
    id: 'interp-2',
    label: 'Minor ii–V–i Jazz Cycle',
    confidenceScore: 87,
    progression: [
      { chord: 'Em7b5', startTime: 0, duration: 2.1, confidence: 84 },
      { chord: 'A7b9', startTime: 2.1, duration: 2.1, confidence: 88 },
      { chord: 'Dm(maj7)', startTime: 4.2, duration: 2.1, confidence: 86 },
      { chord: 'G9', startTime: 6.3, duration: 2.1, confidence: 91 },
    ],
    reasoning:
      "A classic jazz minor ii–V–i motion. The E half-diminished resolves through the altered dominant A7b9 to a dramatic D minor with major 7th. The G9 extension suggests a brief tonicization or reharmonisation. This interpretation captures a more sophisticated harmonic reading — ideal if you're going for the emotional complexity of modern jazz-rap.",
  },
  {
    id: 'interp-3',
    label: 'Phrygian Dominant — Spanish/Dark',
    confidenceScore: 79,
    progression: [
      { chord: 'Dm', startTime: 0, duration: 2.1, confidence: 81 },
      { chord: 'Eb maj7', startTime: 2.1, duration: 2.1, confidence: 76 },
      { chord: 'Csus2', startTime: 4.2, duration: 2.1, confidence: 78 },
      { chord: 'Dm', startTime: 6.3, duration: 2.1, confidence: 82 },
    ],
    reasoning:
      'The Eb major chord (bII in D minor) is the hallmark of Phrygian or Phrygian Dominant harmony. This gives the progression a dark, tense, cinematic quality — common in flamenco, film scores, and experimental trap. Lower confidence because the Csus2 introduces ambiguity; it could also be read as a passing chord.',
  },
  {
    id: 'interp-4',
    label: 'Neo-Soul Extended — Lush',
    confidenceScore: 71,
    progression: [
      { chord: 'Dm11', startTime: 0, duration: 2.1, confidence: 73 },
      { chord: 'Bbmaj9#11', startTime: 2.1, duration: 2.1, confidence: 68 },
      { chord: 'Am9', startTime: 4.2, duration: 2.1, confidence: 72 },
      { chord: 'Gm7/C', startTime: 6.3, duration: 2.1, confidence: 71 },
    ],
    reasoning:
      'An extended neo-soul reading with lush chord voicings. The Bbmaj9#11 (Lydian colour in Bb) adds a dreamy, floating quality. This interpretation suits a softer, more emotional mood. Lower confidence because the bass movement is slightly ambiguous between this and the Dorian interpretation — the recorded bass line could support either.',
  },
  {
    id: 'interp-5',
    label: 'Aeolian — Pure Natural Minor',
    confidenceScore: 63,
    progression: [
      { chord: 'Dm', startTime: 0, duration: 2.1, confidence: 65 },
      { chord: 'Am', startTime: 2.1, duration: 2.1, confidence: 62 },
      { chord: 'Gm', startTime: 4.2, duration: 2.1, confidence: 61 },
      { chord: 'Em7b5', startTime: 6.3, duration: 2.1, confidence: 64 },
    ],
    reasoning:
      "A straightforward natural minor reading. All triads from the D Aeolian scale. Lower confidence because the audio contains chromatic notes that suggest a more complex modality — the pure natural minor doesn't fully account for the raised 6th that appears in beat 3.5 of each bar. Use this interpretation if you want the simplest, most playable version.",
  },
]
