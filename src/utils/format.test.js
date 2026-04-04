import { describe, it, expect } from 'vitest'
import { formatNumber, formatCrores, formatPercent, utilizationColor } from './format'

describe('formatNumber', () => {
  it('returns -- for null or undefined', () => {
    expect(formatNumber(null)).toBe('--')
    expect(formatNumber(undefined)).toBe('--')
  })

  it('formats crores (>=10M)', () => {
    expect(formatNumber(10000000)).toBe('1.0 Cr')
    expect(formatNumber(25000000)).toBe('2.5 Cr')
  })

  it('formats lakhs (>=100K)', () => {
    expect(formatNumber(100000)).toBe('1.0 L')
    expect(formatNumber(550000)).toBe('5.5 L')
  })

  it('formats thousands with Indian locale', () => {
    const result = formatNumber(1500)
    expect(result).toBeTruthy()
    expect(result).not.toBe('--')
  })

  it('returns small numbers as strings', () => {
    expect(formatNumber(42)).toBe('42')
  })
})

describe('formatCrores', () => {
  it('returns -- for null', () => {
    expect(formatCrores(null)).toBe('--')
  })

  it('formats with Rs and Cr suffix', () => {
    const result = formatCrores(1500)
    expect(result).toContain('Rs')
    expect(result).toContain('Cr')
  })
})

describe('formatPercent', () => {
  it('returns -- for null', () => {
    expect(formatPercent(null)).toBe('--')
  })

  it('formats percentage with one decimal', () => {
    expect(formatPercent(85.123)).toBe('85.1%')
  })
})

describe('utilizationColor', () => {
  it('returns success for >=90%', () => {
    expect(utilizationColor(95)).toBe('var(--success)')
  })

  it('returns warning for >=75%', () => {
    expect(utilizationColor(80)).toBe('var(--warning)')
  })

  it('returns danger for <75%', () => {
    expect(utilizationColor(50)).toBe('var(--danger)')
  })
})
