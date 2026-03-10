import type { EngineeringPhase, Plugin } from '@/types'

export const mockPlugins: Plugin[] = [
  {
    id: 'plugin-1',
    name: 'FabFilter Pro-Q 3',
    category: 'EQ',
    manualPath: undefined,
    manualStatus: 'uploaded',
    isFlStock: false,
    createdAt: '2024-09-01T00:00:00Z',
  },
  {
    id: 'plugin-2',
    name: 'FabFilter Pro-C 2',
    category: 'Compressor',
    manualPath: undefined,
    manualStatus: 'uploaded',
    isFlStock: false,
    createdAt: '2024-09-01T00:00:00Z',
  },
  {
    id: 'plugin-3',
    name: 'Valhalla VintageVerb',
    category: 'Reverb',
    manualPath: undefined,
    manualStatus: 'not_uploaded',
    isFlStock: false,
    createdAt: '2024-09-05T00:00:00Z',
  },
]

export const mockEngineeringRoadmap: EngineeringPhase[] = [
  {
    id: 'phase-1',
    phaseNumber: 1,
    phaseName: 'Technical Prep / Cleanup',
    description:
      'Remove noise, fix clipping, consolidate clips, and ensure every stem is clean before any processing begins. No creative decisions here — purely surgical cleanup.',
    isComplete: false,
    isLocked: false,
    instruments: [
      {
        instrumentName: 'Kick',
        instructions: [
          {
            id: 'p1-kick-1',
            text: 'Remove resonance at 47Hz using FabFilter Pro-Q 3: Band 2, Bell, -4.2dB, Q=3.5, Linear Phase Off',
            why: 'The kick has a room resonance at 47Hz that adds boominess without weight. Cutting it frees up sub-bass headroom for the 808.',
            pluginName: 'FabFilter Pro-Q 3',
            parameterDetails: 'Band 2 | Bell | 47Hz | -4.2dB | Q=3.5 | Linear Phase Off',
            isCompleted: false,
          },
          {
            id: 'p1-kick-2',
            text: 'High-pass filter at 28Hz (24dB/oct) to remove sub-bass rumble',
            why: 'Below 28Hz is inaudible and wastes headroom. A steep high-pass removes it cleanly without affecting the kick body.',
            pluginName: 'FabFilter Pro-Q 3',
            parameterDetails: 'Band 1 | High-Pass | 28Hz | 24dB/oct',
            isCompleted: false,
          },
          {
            id: 'p1-kick-3',
            text: 'Check for clipping peaks above -0.1dBFS. Apply Fruity Peak Controller to auto-trim if any peaks detected',
            why: 'Clipped samples introduce distortion that compounds through every processing stage. Fix it at the source.',
            isCompleted: false,
          },
        ],
      },
      {
        instrumentName: '808',
        instructions: [
          {
            id: 'p1-808-1',
            text: 'Pitch-correct 808 to root note F# (fundamental 185Hz) using Newtone or Pitcher',
            why: 'The 808 was triggered at a slightly flat pitch (-14 cents off F#). Correct pitch before processing so all subsequent EQ decisions align to the right fundamental.',
            isCompleted: false,
          },
          {
            id: 'p1-808-2',
            text: 'Trim silence from start of 808 clip: remove 8ms of pre-roll noise before the attack',
            why: '8ms of low-level noise before the 808 punch smears the transient when summed with other elements. Remove it.',
            isCompleted: false,
          },
        ],
      },
      {
        instrumentName: 'Hi-Hats',
        instructions: [
          {
            id: 'p1-hh-1',
            text: 'High-pass all hi-hat channels at 800Hz (12dB/oct) in FabFilter Pro-Q 3',
            why: 'Low-frequency buildup in hi-hats creates mud in the low-mids. Since hi-hats contribute no useful content below 800Hz, cutting here cleans the mix without affecting perceived timbre.',
            pluginName: 'FabFilter Pro-Q 3',
            parameterDetails: 'Band 1 | High-Pass | 800Hz | 12dB/oct',
            isCompleted: false,
          },
          {
            id: 'p1-hh-2',
            text: 'Check for inter-sample peaks on the closed hi-hat — apply Fruity Limiter at -0.5dBFS true peak ceiling',
            why: 'Hi-hats are notorious for inter-sample peaks that exceed 0dBFS after D/A conversion. Limiting true peaks prevents distortion in playback.',
            isCompleted: false,
          },
        ],
      },
      {
        instrumentName: 'Snare',
        instructions: [
          {
            id: 'p1-snare-1',
            text: 'Remove box resonance at 220Hz using FabFilter Pro-Q 3: Bell, -3.8dB, Q=4.2',
            why: 'The snare has a pronounced cardboard resonance at 220Hz that makes it sound cheap and boxy. A narrow surgical cut removes it while preserving the body.',
            pluginName: 'FabFilter Pro-Q 3',
            parameterDetails: 'Bell | 220Hz | -3.8dB | Q=4.2',
            isCompleted: false,
          },
          {
            id: 'p1-snare-2',
            text: 'Align snare transient to grid: nudge 6ms earlier to lock to beat 2.0 precisely',
            why: 'Snare sits 6ms late relative to the grid. Over a full mix, this slight drag compounds and creates a sloppy, unintentional feel — unless that was the artistic intent (it is not here).',
            isCompleted: false,
          },
        ],
      },
      {
        instrumentName: 'Lead Synth',
        instructions: [
          {
            id: 'p1-lead-1',
            text: 'Normalize Lead Synth audio to -6dBFS peak (using Fruity Peak Controller: Target -6dB)',
            why: 'The lead synth is excessively hot at -1.2dBFS peak, leaving no headroom for compression gain staging downstream.',
            isCompleted: false,
          },
          {
            id: 'p1-lead-2',
            text: 'High-pass at 180Hz to remove low-end content competing with the kick and 808',
            why: 'Synth leads occupy the same register as kick fundamentals when unfiltered. Removing content below 180Hz gives the bass elements room to breathe.',
            pluginName: 'FabFilter Pro-Q 3',
            parameterDetails: 'Band 1 | High-Pass | 180Hz | 18dB/oct',
            isCompleted: false,
          },
        ],
      },
      {
        instrumentName: 'Pad',
        instructions: [
          {
            id: 'p1-pad-1',
            text: 'High-pass Pad at 250Hz; Low-pass at 12kHz to contain it in the mid-range',
            why: "Pads should not compete with kick/808 in the low end or with hi-hats in the high end. Containing the pad's frequency range to 250Hz–12kHz keeps it in its designated role: filling the mid-frequency space.",
            pluginName: 'FabFilter Pro-Q 3',
            parameterDetails: 'HP: 250Hz 12dB/oct | LP: 12kHz 12dB/oct',
            isCompleted: false,
          },
        ],
      },
    ],
  },
  {
    id: 'phase-2',
    phaseNumber: 2,
    phaseName: 'Static Balance',
    description:
      'Set all fader levels with nothing but volume — no compression or EQ yet. Build the mix foundation by ear, establishing the relative levels that feel right before any processing.',
    isComplete: false,
    isLocked: true,
    instruments: [
      {
        instrumentName: 'Kick',
        instructions: [
          {
            id: 'p2-kick-1',
            text: 'Set Kick fader to -6dB (mix reference point)',
            why: 'Kick is the anchor of this mix. -6dB gives ample headroom on the master bus while keeping it prominent. Everything else is set relative to this.',
            isCompleted: false,
          },
          {
            id: 'p2-kick-2',
            text: 'Pan Kick dead centre (0.00)',
            why: 'Low frequencies below 200Hz phase-cancel when panned. Mono kick is non-negotiable for translation across speakers.',
            isCompleted: false,
          },
        ],
      },
      {
        instrumentName: '808',
        instructions: [
          {
            id: 'p2-808-1',
            text: 'Set 808 fader to -8.5dB — it should sit just beneath the kick in terms of perceived loudness',
            why: 'The 808 provides weight and pitch but should not overpower the kick punch. -8.5dB keeps it filling the sub space without dominating.',
            isCompleted: false,
          },
        ],
      },
      {
        instrumentName: 'Hi-Hats',
        instructions: [
          {
            id: 'p2-hh-1',
            text: 'Set closed hi-hat to -14dB, open hi-hat to -16dB',
            why: 'Hi-hats should provide rhythmic texture without dominating. -14dB for closed keeps the groove present; open hat lower to maintain dynamics in the roll pattern.',
            isCompleted: false,
          },
        ],
      },
      {
        instrumentName: 'Snare',
        instructions: [
          {
            id: 'p2-snare-1',
            text: 'Set Snare to -9dB — audible, assertive, but not louder than the kick',
            why: 'Snare defines the 2 and 4 (or off-beat in trap). At -9dB it cuts through without fighting the kick for dominance.',
            isCompleted: false,
          },
        ],
      },
      {
        instrumentName: 'Lead Synth',
        instructions: [
          {
            id: 'p2-lead-1',
            text: 'Set Lead Synth to -10dB for an initial balance pass',
            why: 'Lead synth supports the track melodically — it should be audible but supporting the rhythm section, not competing with it at this stage.',
            isCompleted: false,
          },
        ],
      },
      {
        instrumentName: 'Pad',
        instructions: [
          {
            id: 'p2-pad-1',
            text: 'Set Pad to -18dB — barely felt, providing harmonic glue',
            why: "The pad's role is atmospheric fill. At -18dB it's present on playback at moderate volume but should almost disappear when soloed — that's the right level.",
            isCompleted: false,
          },
        ],
      },
    ],
  },
  {
    id: 'phase-3',
    phaseNumber: 3,
    phaseName: 'Tone Shaping & Dynamics',
    description:
      'Creative EQ and compression per instrument. This is where you shape the character, punch, and breathability of each element. Every move here is intentional and musical.',
    isComplete: false,
    isLocked: true,
    instruments: [
      {
        instrumentName: 'Kick',
        instructions: [
          {
            id: 'p3-kick-1',
            text: 'Boost kick body at 80Hz: FabFilter Pro-Q 3 Bell +3.5dB, Q=1.8',
            why: 'The kick needs chest — the fundamental weight that you feel in your sternum at concert volume. 80Hz is the sweet spot for this sample.',
            pluginName: 'FabFilter Pro-Q 3',
            parameterDetails: 'Bell | 80Hz | +3.5dB | Q=1.8',
            isCompleted: false,
          },
          {
            id: 'p3-kick-2',
            text: 'Compress kick with FabFilter Pro-C 2: Attack 3ms, Release 80ms, Ratio 4:1, Threshold -18dB, Knee 2dB',
            why: 'Kick compression with 3ms attack preserves the transient snap (the "click") while the 4:1 ratio controls the sustain tail. 80ms release ensures the compressor recovers fully before the next hit.',
            pluginName: 'FabFilter Pro-C 2',
            parameterDetails: 'Attack: 3ms | Release: 80ms | Ratio: 4:1 | Threshold: -18dB | Knee: 2dB',
            isCompleted: false,
          },
        ],
      },
      {
        instrumentName: '808',
        instructions: [
          {
            id: 'p3-808-1',
            text: 'Sidechain compress 808 from kick: FabFilter Pro-C 2, Attack 0.5ms, Release 300ms, Ratio 6:1, -20dB threshold',
            why: 'Sidechain compression ensures the 808 ducks every time the kick hits, preventing low-frequency masking and creating the breathing, pumping dynamic that defines modern trap production.',
            pluginName: 'FabFilter Pro-C 2',
            parameterDetails: 'Sidechain: Kick | Attack: 0.5ms | Release: 300ms | Ratio: 6:1 | Threshold: -20dB',
            isCompleted: false,
          },
        ],
      },
      {
        instrumentName: 'Snare',
        instructions: [
          {
            id: 'p3-snare-1',
            text: 'Boost snare presence at 3.5kHz: +4dB Bell, Q=2.0 for cut-through',
            why: '3–4kHz is where the snare crack lives. Boosting here makes the snare audible on phone speakers and laptop speakers — the places your audience actually listens.',
            pluginName: 'FabFilter Pro-Q 3',
            parameterDetails: 'Bell | 3.5kHz | +4dB | Q=2.0',
            isCompleted: false,
          },
          {
            id: 'p3-snare-2',
            text: 'Add parallel compression: blend 40% heavily compressed signal (20:1, -30dB threshold) with dry signal',
            why: 'New York compression technique — the heavily compressed parallel layer adds thickness and sustain without crushing the transient of the original signal.',
            isCompleted: false,
          },
        ],
      },
      {
        instrumentName: 'Lead Synth',
        instructions: [
          {
            id: 'p3-lead-1',
            text: 'Cut Lead Synth at 900Hz: Bell -2.5dB, Q=3.0 to remove harsh mid-frequency',
            why: '900Hz is the notorious "telephone frequency" — it often causes harshness in synth leads. A narrow cut here opens up the mix.',
            isCompleted: false,
          },
        ],
      },
      {
        instrumentName: 'Hi-Hats',
        instructions: [
          {
            id: 'p3-hh-1',
            text: 'Air boost at 16kHz: +2.5dB Shelf to add sparkle',
            why: 'Hi-hats benefit from a gentle shelf boost above 16kHz to add air and shimmer. This is the frequency range of cymbals in live recording.',
            isCompleted: false,
          },
        ],
      },
      {
        instrumentName: 'Pad',
        instructions: [
          {
            id: 'p3-pad-1',
            text: 'Gentle compression on Pad: Attack 50ms, Release 400ms, Ratio 2:1 — just for glue',
            why: 'Slow attack allows the pad transients through; the gentle ratio just adds cohesion. The goal is not to compress — it is to glue.',
            isCompleted: false,
          },
        ],
      },
    ],
  },
  {
    id: 'phase-4',
    phaseNumber: 4,
    phaseName: 'Space & Depth',
    description:
      'Reverb, delay, stereo width, and depth placement. Build the three-dimensional space of the mix — what is close, what is far, what is wide, what is centred.',
    isComplete: false,
    isLocked: true,
    instruments: [
      {
        instrumentName: 'Kick',
        instructions: [
          {
            id: 'p4-kick-1',
            text: 'No reverb on kick — keep it bone dry and forward',
            why: 'Reverb on kick smears the low frequencies and moves the kick backward in the depth perspective. Trap kicks should feel like they are 2 feet from your face.',
            isCompleted: false,
          },
        ],
      },
      {
        instrumentName: 'Snare',
        instructions: [
          {
            id: 'p4-snare-1',
            text: 'Send Snare to Room Reverb bus: Valhalla VintageVerb, Room algorithm, Decay 0.8s, Pre-delay 12ms, Mix 22%',
            why: 'A short room reverb places the snare in a physical space without pushing it to the back of the mix. 12ms pre-delay separates the reverb from the dry signal, preserving the transient.',
            pluginName: 'Valhalla VintageVerb',
            parameterDetails: 'Algorithm: Room | Decay: 0.8s | Pre-delay: 12ms | Mix: 22%',
            isCompleted: false,
          },
        ],
      },
      {
        instrumentName: 'Lead Synth',
        instructions: [
          {
            id: 'p4-lead-1',
            text: 'Add stereo width to Lead Synth using Fruity Stereo Shaper: widen to 70% at high frequencies (above 1kHz)',
            why: 'Widening only the high frequencies above 1kHz keeps the lead mono-compatible in the low-mids while creating impressive width on stereo systems.',
            isCompleted: false,
          },
          {
            id: 'p4-lead-2',
            text: 'Send 15% to long plate reverb: Decay 2.5s, Predelay 25ms — gives the lead an ethereal tail',
            why: 'The plate reverb on the lead creates an atmospheric wash between phrases, filling the silence without cluttering the active performance.',
            isCompleted: false,
          },
        ],
      },
      {
        instrumentName: 'Pad',
        instructions: [
          {
            id: 'p4-pad-1',
            text: 'Send Pad 35% to Hall Reverb: Valhalla VintageVerb Hall, Decay 4.5s, High-pass reverb return at 300Hz',
            why: 'The pad needs to exist in a large, indefinite space. A 4.5s hall reverb with high-passed return keeps the low end from building up while creating the sense of infinite space.',
            pluginName: 'Valhalla VintageVerb',
            parameterDetails: 'Algorithm: Hall | Decay: 4.5s | Reverb return HP: 300Hz',
            isCompleted: false,
          },
        ],
      },
      {
        instrumentName: '808',
        instructions: [
          {
            id: 'p4-808-1',
            text: '808 stays mono, no reverb, no width processing',
            why: 'Sub-bass energy in stereo causes phase cancellation on mono systems and vinyl cutting issues. The 808 must remain centred and mono.',
            isCompleted: false,
          },
        ],
      },
      {
        instrumentName: 'Hi-Hats',
        instructions: [
          {
            id: 'p4-hh-1',
            text: 'Pan hi-hats across stereo field: Closed Hat -15L, Open Hat +20R, create natural spread',
            why: 'Distributing hi-hats across the stereo field mimics how a real drum kit sounds — the cymbals are never all in the same position. This adds dimension and reduces mono clutter.',
            isCompleted: false,
          },
        ],
      },
    ],
  },
  {
    id: 'phase-5',
    phaseNumber: 5,
    phaseName: 'Bus Processing & Mix Validation',
    description:
      'Apply glue compression and EQ to the master bus and instrument group buses. Validate the mix against the reference track. Check mono compatibility, translation on multiple speaker systems.',
    isComplete: false,
    isLocked: true,
    instruments: [
      {
        instrumentName: 'Drum Bus',
        instructions: [
          {
            id: 'p5-drums-1',
            text: 'Apply glue compression on Drum Bus: FabFilter Pro-C 2, Attack 10ms, Release 150ms, Ratio 2:1, Threshold -12dB, GR target -2 to -3dB',
            why: 'Bus compression "glues" the drum elements together — they start behaving as a single organism rather than separate pieces. 2–3dB of gain reduction is the sweet spot for glue without squashing.',
            pluginName: 'FabFilter Pro-C 2',
            parameterDetails: 'Attack: 10ms | Release: 150ms | Ratio: 2:1 | Threshold: -12dB | GR: -2 to -3dB',
            isCompleted: false,
          },
        ],
      },
      {
        instrumentName: 'Master Bus',
        instructions: [
          {
            id: 'p5-master-1',
            text: 'Low-shelf boost on Master Bus: FabFilter Pro-Q 3, +1.5dB at 40Hz — global bass weight',
            why: "A gentle master bus low-shelf adds cohesive bottom end across the whole mix. Unlike per-track boosts, this feels natural because it affects everything equally — the mix's 'gravity' increases uniformly.",
            isCompleted: false,
          },
          {
            id: 'p5-master-2',
            text: 'Check mono: solo mono sum, verify kick and 808 remain present and in phase',
            why: "Mono compatibility is not optional — DSPs, phone speakers, Bluetooth speakers, and many club systems sum to mono. If your mix falls apart in mono, it fails in the real world.",
            isCompleted: false,
          },
          {
            id: 'p5-master-3',
            text: "A/B mix against reference track at matched loudness (±0.5 LUFS): compare bottom end weight, vocal space, and overall density",
            why: "Reference-checking is the most objective quality gate available. If your mix sounds thinner, brighter, or less cohesive than the reference at the same volume, you haven't finished.",
            isCompleted: false,
          },
        ],
      },
      {
        instrumentName: 'Lead Synth',
        instructions: [
          {
            id: 'p5-lead-1',
            text: 'Final level pass on Lead Synth: automate volume down -2dB during busiest drum fills',
            why: 'The lead competes with the drum fills in the densest sections. A -2dB automation dip during fills gives the drums room to breathe without permanently reducing the lead level.',
            isCompleted: false,
          },
        ],
      },
      {
        instrumentName: 'Kick',
        instructions: [
          {
            id: 'p5-kick-1',
            text: 'Set Master Bus limiter ceiling to -0.3dBFS true peak: Fruity Limiter, Brick Wall mode',
            why: 'True peak limiting at -0.3dBFS prevents inter-sample distortion during streaming platform encoding (platforms add their own processing that can push peaks above 0dBFS).',
            isCompleted: false,
          },
        ],
      },
      {
        instrumentName: 'Pad',
        instructions: [
          {
            id: 'p5-pad-1',
            text: 'Automate Pad send level: reduce reverb send by -6dB during verses, restore during breaks',
            why: 'Modulating the reverb send amount creates dynamic contrast — the mix feels more intimate during tight sections and expansive during open sections.',
            isCompleted: false,
          },
        ],
      },
      {
        instrumentName: 'Hi-Hats',
        instructions: [
          {
            id: 'p5-hh-1',
            text: 'Validate hi-hat level on laptop speakers (90Hz–15kHz range): should be clearly audible but not harsh',
            why: "Laptop speakers have limited frequency range and no sub-bass. Testing on them reveals how the mix translates to the primary listening environment of your audience.",
            isCompleted: false,
          },
        ],
      },
    ],
  },
]
