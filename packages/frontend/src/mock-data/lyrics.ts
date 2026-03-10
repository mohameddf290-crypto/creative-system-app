import type { LyricVariation, ToplineData } from '@/types'

export const mockLyricVariations: LyricVariation[] = [
  {
    id: 'lyrics-1',
    text: `move in silence, the city remembers names
every corner got a story written in the rain
I been cold since the winter broke without a flame
now they calling out my number but the digits never change

walked the block when the block was all I had
turned my losses into leverage every time it got bad
nobody handed me the crown but I wore it on my head
now the ones who never noticed gon' remember what I said

system say I'm winning but the mirror tell it straight
calculated every risk before I touched the gate
built from midnight conversations at the intersection
where the hunger and the vision finally reached perfection`,
    antiSlopScore: 91,
    antiSlopFlags: [],
    flowFitScore: 88,
    barCount: 12,
    wordCount: 148,
  },
  {
    id: 'lyrics-2',
    text: `they'll never understand the frequency I'm on
a different calibration — tune in or move along
I studied all the patterns where the ordinary falls
then I wrote my own equations in between the walls

pressure make a diamond — but the process make a man
every stumble in the darkness was a part of the plan
speak with intention, every syllable precise
cut through all the static — pay attention to the price

northern lights don't explain themselves, they just exist
I been operating at a wavelength some would miss
truth is louder than applause when rooms go quiet
build the foundation first — the rest will follow`,
    antiSlopScore: 87,
    antiSlopFlags: ['Check: "pressure make a diamond" — common phrase, review context'],
    flowFitScore: 85,
    barCount: 12,
    wordCount: 135,
  },
  {
    id: 'lyrics-3',
    text: `I keep the ledger balanced — what I owe I always pay
navigated through the static for a thousand different days
every scar a tuition fee for knowledge that I earned
the pages others didn't read are lessons that I learned

momentum doesn't stop when there is something to protect
I been moving through dimensions that haven't intersected
detail in the architecture where the others only see
the blueprint in the negative space — that's currency to me

tell me where the language fails and I will fill the gap
thread the needle through the chaos coming right back
the ones who stayed the longest know the version that is real
underneath the reputation — there's a person who can feel`,
    antiSlopScore: 84,
    antiSlopFlags: [],
    flowFitScore: 91,
    barCount: 12,
    wordCount: 142,
  },
]

export const mockToplineData: ToplineData = {
  syncedLyrics: [
    { word: 'move', startTime: 0.0, endTime: 0.3 },
    { word: 'in', startTime: 0.3, endTime: 0.45 },
    { word: 'silence,', startTime: 0.45, endTime: 0.9 },
    { word: 'the', startTime: 0.9, endTime: 1.05 },
    { word: 'city', startTime: 1.05, endTime: 1.35 },
    { word: 'remembers', startTime: 1.35, endTime: 1.8 },
    { word: 'names', startTime: 1.8, endTime: 2.4 },
    { word: 'every', startTime: 2.5, endTime: 2.75 },
    { word: 'corner', startTime: 2.75, endTime: 3.1 },
    { word: 'got', startTime: 3.1, endTime: 3.25 },
    { word: 'a', startTime: 3.25, endTime: 3.35 },
    { word: 'story', startTime: 3.35, endTime: 3.7 },
    { word: 'written', startTime: 3.7, endTime: 4.0 },
    { word: 'in', startTime: 4.0, endTime: 4.15 },
    { word: 'the', startTime: 4.15, endTime: 4.25 },
    { word: 'rain', startTime: 4.25, endTime: 4.8 },
  ],
  flowNotations: [
    { barStart: 0, type: 'normal', label: 'Steady cadence, land on downbeats' },
    { barStart: 2, type: 'speed-up', label: 'Pick up pace through bar 3' },
    { barStart: 4, type: 'emphasis', label: 'Hit "never" hard — full stop before it' },
    { barStart: 8, type: 'slow-down', label: 'Draw out the end of each bar' },
    { barStart: 10, type: 'pause', label: '1-beat breath before "finally"' },
  ],
}
