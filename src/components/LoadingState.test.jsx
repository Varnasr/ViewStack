import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LoadingState, ErrorState } from './LoadingState'

describe('LoadingState', () => {
  it('renders default loading message', () => {
    render(<LoadingState />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('renders custom loading message', () => {
    render(<LoadingState message="Please wait" />)
    expect(screen.getByText('Please wait')).toBeInTheDocument()
  })

  it('has correct aria role', () => {
    render(<LoadingState />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })
})

describe('ErrorState', () => {
  it('renders default error message', () => {
    render(<ErrorState />)
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument()
  })

  it('renders custom error message', () => {
    render(<ErrorState message="Network error" />)
    expect(screen.getByText('Network error')).toBeInTheDocument()
  })

  it('has correct aria role', () => {
    render(<ErrorState />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })
})
