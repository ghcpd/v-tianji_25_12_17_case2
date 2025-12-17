import React from 'react'
import { render, screen, act } from '@testing-library/react'
import VideoFeed from '../components/VideoFeed'

// mock IntersectionObserver
class MockIO {
  callback: IntersectionObserverCallback
  constructor(cb: IntersectionObserverCallback) {
    this.callback = cb
  }
  observe() {}
  disconnect() {}
  unobserve() {}
}

;(window as any).IntersectionObserver = MockIO as any

describe('VideoFeed', () => {
  it('renders feed and items', () => {
    render(<VideoFeed />)
    const feed = screen.getByTestId('feed')
    expect(feed).toBeInTheDocument()
    const cards = feed.querySelectorAll('.card')
    expect(cards.length).toBeGreaterThan(0)
  })
})
