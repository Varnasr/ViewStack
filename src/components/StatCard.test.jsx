import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import StatCard from './StatCard'

describe('StatCard', () => {
  it('renders label and value', () => {
    render(<StatCard label="Test Label" value={42} />)
    expect(screen.getByText('Test Label')).toBeInTheDocument()
    expect(screen.getByText('42')).toBeInTheDocument()
  })

  it('renders subtitle when provided', () => {
    render(<StatCard label="Label" value={1} subtitle="A subtitle" />)
    expect(screen.getByText('A subtitle')).toBeInTheDocument()
  })

  it('does not render subtitle when not provided', () => {
    const { container } = render(<StatCard label="Label" value={1} />)
    expect(container.querySelector('.subtitle')).toBeNull()
  })
})
