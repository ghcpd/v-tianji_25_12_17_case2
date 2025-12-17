import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import VideoCard from '../components/VideoCard'
import type { Video } from '../types'

const mockVideo: Video = {
  id: 'test-1',
  title: 'Test',
  author: 'Author',
  src: '',
  likes: 3
}

describe('VideoCard', () => {
  beforeEach(() => {
    // mock play/pause since jsdom doesn't implement media playback
    (HTMLMediaElement.prototype as any).play = vi.fn().mockImplementation(function () {
      // simulate changes when play is called
      Object.defineProperty(this, 'paused', { value: false, configurable: true })
      return Promise.resolve()
    })
    ;(HTMLMediaElement.prototype as any).pause = vi.fn().mockImplementation(function () {
      Object.defineProperty(this, 'paused', { value: true, configurable: true })
    })
  })

  it('renders and toggles like', () => {
    const onLike = vi.fn()
    render(<VideoCard video={mockVideo} isActive={false} onLike={onLike} />)
    const likeBtn = screen.getByTestId('like-test-1')
    expect(likeBtn).toBeInTheDocument()
    fireEvent.click(likeBtn)
    expect(onLike).toHaveBeenCalledWith('test-1')
  })

  it('plays when active', async () => {
    render(<VideoCard video={mockVideo} isActive={true} onLike={() => {}} />)
    const playState = await screen.findByText(/playing/i)
    expect(playState).toBeInTheDocument()
  })
})
