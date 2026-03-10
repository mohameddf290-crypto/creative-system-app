import { describe, it, expect } from 'vitest'
import { generateId, midiNoteToName, formatRelativeDate, clamp } from '@/utils'

describe('utils', () => {
  it('generateId returns a non-empty string', () => {
    const id = generateId()
    expect(typeof id).toBe('string')
    expect(id.length).toBeGreaterThan(0)
  })

  it('midiNoteToName converts MIDI numbers correctly', () => {
    expect(midiNoteToName(60)).toBe('C4')
    expect(midiNoteToName(69)).toBe('A4')
    expect(midiNoteToName(62)).toBe('D4')
  })

  it('clamp restricts value to range', () => {
    expect(clamp(5, 0, 10)).toBe(5)
    expect(clamp(-1, 0, 10)).toBe(0)
    expect(clamp(11, 0, 10)).toBe(10)
  })

  it('formatRelativeDate returns "Today" for today', () => {
    const today = new Date().toISOString()
    expect(formatRelativeDate(today)).toBe('Today')
  })
})
