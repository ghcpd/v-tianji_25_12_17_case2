import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import VideoCard from './VideoCard'
import { describe, it, expect } from 'vitest'

const mockVideo = {
  id: '1',
  user: 'testuser',
  caption: 'Test caption',
  videoUrl: 'https://sample-videos.com/video123/mp4/240/big_buck_bunny_240p_1mb.mp4',
  likes: 10,
  isFollowing: false,
}

describe('VideoCard', () => {
  it('renders video and toggles pause on click', async () => {
    render(<VideoCard video={mockVideo} />)

    const video = screen.getByTestId('video-player') as HTMLVideoElement
    // initial opacity should be 1
    expect(video).toHaveStyle({ opacity: '1' })

    await userEvent.click(video)
    expect(video).toHaveStyle({ opacity: '0.5' })

    await userEvent.click(video)
    expect(video).toHaveStyle({ opacity: '1' })
  })

  it('increments likes when like button is clicked', async () => {
    render(<VideoCard video={mockVideo} />)

    const likeBtn = screen.getByTestId('like-button')
    expect(likeBtn).toHaveTextContent('❤️ 10')

    await userEvent.click(likeBtn)
    expect(likeBtn).toHaveTextContent('❤️ 11')
  })

  it('toggles follow state', async () => {
    render(<VideoCard video={mockVideo} />)
    const followBtn = screen.getByTestId('follow-button')

    expect(followBtn).toHaveTextContent('Follow')
    await userEvent.click(followBtn)
    expect(followBtn).toHaveTextContent('Following')
    await userEvent.click(followBtn)
    expect(followBtn).toHaveTextContent('Follow')
  })
})

