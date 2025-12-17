import { render, screen, act } from '@testing-library/react'
import VideoFeed from './VideoFeed'
import mockVideos from '../mockData'
import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock IntersectionObserver
const observe = vi.fn()
const unobserve = vi.fn()
const disconnect = vi.fn()

beforeEach(() => {
  ;(window as any).IntersectionObserver = vi.fn(function (cb, options) {
    this.observe = observe
    this.unobserve = unobserve
    this.disconnect = disconnect
    this.trigger = (entries: any[]) => cb(entries, this)
  })
})

describe('VideoFeed', () => {
  it('renders correct number of video cards', () => {
    render(<VideoFeed />)
    const videoCards = screen.getAllByTestId('video-player')
    expect(videoCards.length).toBe(mockVideos.length)
  })

  it('plays and pauses videos based on intersection', () => {
    const { container } = render(<VideoFeed />)
    // Scroll to trigger observer events
    const observerInstance = (window.IntersectionObserver as any).mock.instances[0]
    const videoEl = container.querySelector('video') as HTMLVideoElement
    // mock play/pause
    videoEl.play = vi.fn()
    videoEl.pause = vi.fn()

    act(() => {
      observerInstance.trigger([{ isIntersecting: true, target: videoEl.parentElement }])
    })
    expect(videoEl.play).toHaveBeenCalled()

    act(() => {
      observerInstance.trigger([{ isIntersecting: false, target: videoEl.parentElement }])
    })
    expect(videoEl.pause).toHaveBeenCalled()
  })
})

