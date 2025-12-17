import { render, screen, fireEvent, act } from '@testing-library/react'
import { vi } from 'vitest'
import { VideoItem } from '../App'

const mockVideo = {
  id: '1',
  videoUrl: 'test.mp4',
  thumbnail: 'thumb.jpg',
  description: 'Test video',
  user: 'TestUser',
  likes: 10,
  isLiked: false,
  comments: ['Comment1']
}

const mockOnLike = vi.fn()
const mockOnComment = vi.fn()

describe('VideoItem', () => {
  it('renders video details', () => {
    render(<VideoItem video={mockVideo} onLike={mockOnLike} onComment={mockOnComment} />)
    expect(screen.getByText('TestUser')).toBeInTheDocument()
    expect(screen.getByText('Test video')).toBeInTheDocument()
  })

  it('toggles play/pause', async () => {
    render(<VideoItem video={mockVideo} onLike={mockOnLike} onComment={mockOnComment} />)
    const playButton = screen.getByText('⏸️')
    await act(async () => {
      fireEvent.click(playButton)
    })
    expect(screen.getByText('▶️')).toBeInTheDocument()
  })

  it('handles like', async () => {
    render(<VideoItem video={mockVideo} onLike={mockOnLike} onComment={mockOnComment} />)
    const likeButton = screen.getByText('🤍 10')
    await act(async () => {
      fireEvent.click(likeButton)
    })
    expect(mockOnLike).toHaveBeenCalledWith('1')
  })

  it('shows comments', async () => {
    render(<VideoItem video={mockVideo} onLike={mockOnLike} onComment={mockOnComment} />)
    const commentButton = screen.getByText('💬 1')
    await act(async () => {
      fireEvent.click(commentButton)
    })
    expect(screen.getByText('Comment1')).toBeInTheDocument()
  })

  it('adds comment', async () => {
    render(<VideoItem video={mockVideo} onLike={mockOnLike} onComment={mockOnComment} />)
    const commentButton = screen.getByText('💬 1')
    await act(async () => {
      fireEvent.click(commentButton)
    })
    const input = screen.getByPlaceholderText('Add comment')
    await act(async () => {
      fireEvent.change(input, { target: { value: 'New comment' } })
    })
    const postButton = screen.getByText('Post')
    await act(async () => {
      fireEvent.click(postButton)
    })
    expect(mockOnComment).toHaveBeenCalledWith('1', 'New comment')
  })
})