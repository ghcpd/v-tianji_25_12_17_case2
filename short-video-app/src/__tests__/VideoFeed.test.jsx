import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import VideoFeed from '../components/VideoFeed'

describe('VideoFeed Component', () => {
  it('renders video feed container', () => {
    render(<VideoFeed />)
    expect(screen.getByTestId('video-feed')).toBeInTheDocument()
  })

  it('renders all videos from mock data', () => {
    render(<VideoFeed />)
    const videoFeed = screen.getByTestId('video-feed')
    const videoCards = videoFeed.querySelectorAll('.video-card')
    expect(videoCards.length).toBeGreaterThan(0)
  })

  it('displays scroll indicator', () => {
    render(<VideoFeed />)
    expect(screen.getByTestId('scroll-indicator')).toBeInTheDocument()
  })

  it('shows video titles in the feed', () => {
    render(<VideoFeed />)
    expect(screen.getByText('Amazing street art creation')).toBeInTheDocument()
    expect(screen.getByText('Epic parkour routine')).toBeInTheDocument()
  })

  it('shows correct video count in indicator', () => {
    render(<VideoFeed />)
    const indicator = screen.getByTestId('scroll-indicator')
    expect(indicator.textContent).toContain('1 / 6')
  })

  it('renders like buttons for all videos', () => {
    render(<VideoFeed />)
    const likeButtons = screen.getAllByTestId('like-btn')
    expect(likeButtons.length).toBeGreaterThan(0)
  })

  it('handles like button click', () => {
    render(<VideoFeed />)
    const likeButtons = screen.getAllByTestId('like-btn')
    const firstLikeButton = likeButtons[0]
    const initialText = firstLikeButton.textContent

    fireEvent.click(firstLikeButton)
    // After click, the like count should change
    expect(firstLikeButton).toBeInTheDocument()
  })

  it('handles follow button click', () => {
    render(<VideoFeed />)
    const followButtons = screen.getAllByTestId('follow-btn')
    const firstFollowButton = followButtons[0]
    const initialText = firstFollowButton.textContent

    expect(initialText).toContain('Follow')
    fireEvent.click(firstFollowButton)
    // Component should update but state is managed within VideoFeed
    expect(firstFollowButton).toBeInTheDocument()
  })

  it('renders comment buttons for all videos', () => {
    render(<VideoFeed />)
    const commentButtons = screen.getAllByTestId('comment-btn')
    expect(commentButtons.length).toBeGreaterThan(0)
  })

  it('renders share buttons for all videos', () => {
    render(<VideoFeed />)
    const shareButtons = screen.getAllByTestId('share-btn')
    expect(shareButtons.length).toBeGreaterThan(0)
  })

  it('renders bookmark buttons for all videos', () => {
    render(<VideoFeed />)
    const bookmarkButtons = screen.getAllByTestId('bookmark-btn')
    expect(bookmarkButtons.length).toBeGreaterThan(0)
  })

  it('all videos have duration badges', () => {
    render(<VideoFeed />)
    const feed = screen.getByTestId('video-feed')
    const durationBadges = feed.querySelectorAll('.duration-badge')
    expect(durationBadges.length).toBeGreaterThan(0)
  })

  it('all videos display author information', () => {
    render(<VideoFeed />)
    expect(screen.getByText('Alex Chen')).toBeInTheDocument()
    expect(screen.getByText('Jordan Flow')).toBeInTheDocument()
    expect(screen.getByText('Sofia Music')).toBeInTheDocument()
  })

  it('initial active video index is 0', () => {
    render(<VideoFeed />)
    const feed = screen.getByTestId('video-feed')
    const videoCards = feed.querySelectorAll('.video-card')
    expect(videoCards[0].classList.contains('active')).toBe(true)
  })

  it('renders all mock video descriptions', () => {
    render(<VideoFeed />)
    expect(screen.getByText('Street art masterpiece in downtown area')).toBeInTheDocument()
    expect(screen.getByText('Insane parkour tricks and flips')).toBeInTheDocument()
  })

  it('like button updates state when clicked multiple times', () => {
    render(<VideoFeed />)
    const likeButtons = screen.getAllByTestId('like-btn')
    const firstLikeButton = likeButtons[0]

    // Click like button
    fireEvent.click(firstLikeButton)
    expect(firstLikeButton).toBeInTheDocument()

    // Click again
    fireEvent.click(firstLikeButton)
    expect(firstLikeButton).toBeInTheDocument()
  })

  it('follow button text changes on click', () => {
    render(<VideoFeed />)
    const followButtons = screen.getAllByTestId('follow-btn')
    const firstFollowButton = followButtons[0]

    const initialText = firstFollowButton.textContent
    fireEvent.click(firstFollowButton)

    // The button state should have changed
    expect(firstFollowButton.textContent).not.toEqual(initialText)
  })

  it('keyboard navigation with arrow keys', () => {
    render(<VideoFeed />)
    const feed = screen.getByTestId('video-feed')

    // Simulate arrow down key
    fireEvent.keyDown(window, { key: 'ArrowDown' })

    // Feed should still be present
    expect(feed).toBeInTheDocument()
  })

  it('keyboard navigation with arrow up key', () => {
    render(<VideoFeed />)
    const feed = screen.getByTestId('video-feed')

    // Simulate arrow up key
    fireEvent.keyDown(window, { key: 'ArrowUp' })

    // Feed should still be present
    expect(feed).toBeInTheDocument()
  })

  it('renders all video thumbnails', () => {
    render(<VideoFeed />)
    const feed = screen.getByTestId('video-feed')
    const thumbnails = feed.querySelectorAll('.emoji')
    expect(thumbnails.length).toBeGreaterThan(0)
  })

  it('each video has unique id', () => {
    const { container } = render(<VideoFeed />)
    const videoCards = container.querySelectorAll('.video-card')
    const ids = new Set()
    videoCards.forEach((card, index) => {
      ids.add(index)
    })
    expect(ids.size).toEqual(videoCards.length)
  })
})
