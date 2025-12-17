import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import VideoCard from '../components/VideoCard'

describe('VideoCard Component', () => {
  const mockVideo = {
    id: 1,
    author: 'Test Author',
    avatar: '👨',
    title: 'Test Video',
    videoUrl: 'test.mp4',
    thumbnail: '🎬',
    likes: 100,
    comments: 50,
    shares: 25,
    duration: '00:30',
    liked: false,
    following: false,
    description: 'Test description'
  }

  const mockHandlers = {
    onLike: () => {},
    onFollow: () => {},
    onComment: () => {},
    onShare: () => {}
  }

  it('renders video card with all elements', () => {
    render(
      <VideoCard
        video={mockVideo}
        isActive={true}
        {...mockHandlers}
      />
    )

    expect(screen.getByText('Test Video')).toBeInTheDocument()
    expect(screen.getByText('Test Author')).toBeInTheDocument()
    expect(screen.getByText('Test description')).toBeInTheDocument()
    expect(screen.getByText('00:30')).toBeInTheDocument()
  })

  it('displays correct like count', () => {
    const { container } = render(
      <VideoCard
        video={mockVideo}
        isActive={true}
        {...mockHandlers}
      />
    )

    const likeButton = screen.getByTestId('like-btn')
    expect(likeButton.textContent).toContain('100')
  })

  it('displays correct comment count', () => {
    render(
      <VideoCard
        video={mockVideo}
        isActive={true}
        {...mockHandlers}
      />
    )

    const commentButton = screen.getByTestId('comment-btn')
    expect(commentButton.textContent).toContain('50')
  })

  it('displays correct share count', () => {
    render(
      <VideoCard
        video={mockVideo}
        isActive={true}
        {...mockHandlers}
      />
    )

    const shareButton = screen.getByTestId('share-btn')
    expect(shareButton.textContent).toContain('25')
  })

  it('calls onLike handler when like button is clicked', () => {
    const onLikeMock = () => {}
    const onLikeSpy = { fn: onLikeMock }
    onLikeSpy.fn = () => {}

    let liked = false
    const onLikeHandler = () => {
      liked = !liked
    }

    render(
      <VideoCard
        video={mockVideo}
        isActive={true}
        onLike={onLikeHandler}
        onFollow={mockHandlers.onFollow}
        onComment={mockHandlers.onComment}
        onShare={mockHandlers.onShare}
      />
    )

    const likeButton = screen.getByTestId('like-btn')
    fireEvent.click(likeButton)
    expect(liked).toBe(true)
  })

  it('calls onFollow handler when follow button is clicked', () => {
    let isFollowing = false
    const onFollowHandler = () => {
      isFollowing = !isFollowing
    }

    render(
      <VideoCard
        video={mockVideo}
        isActive={true}
        onLike={mockHandlers.onLike}
        onFollow={onFollowHandler}
        onComment={mockHandlers.onComment}
        onShare={mockHandlers.onShare}
      />
    )

    const followButton = screen.getByTestId('follow-btn')
    expect(followButton.textContent).toContain('Follow')
    fireEvent.click(followButton)
    expect(isFollowing).toBe(true)
  })

  it('displays liked state when video is liked', () => {
    const likedVideo = { ...mockVideo, liked: true }
    render(
      <VideoCard
        video={likedVideo}
        isActive={true}
        {...mockHandlers}
      />
    )

    const likeButton = screen.getByTestId('like-btn')
    expect(likeButton.textContent).toContain('❤️')
  })

  it('displays unlicked state when video is not liked', () => {
    const unlikedVideo = { ...mockVideo, liked: false }
    render(
      <VideoCard
        video={unlikedVideo}
        isActive={true}
        {...mockHandlers}
      />
    )

    const likeButton = screen.getByTestId('like-btn')
    expect(likeButton.textContent).toContain('🤍')
  })

  it('displays following state when user follows author', () => {
    const followingVideo = { ...mockVideo, following: true }
    render(
      <VideoCard
        video={followingVideo}
        isActive={true}
        {...mockHandlers}
      />
    )

    const followButton = screen.getByTestId('follow-btn')
    expect(followButton.textContent).toContain('Following')
  })

  it('applies active class when isActive is true', () => {
    const { container } = render(
      <VideoCard
        video={mockVideo}
        isActive={true}
        {...mockHandlers}
      />
    )

    const videoCard = container.querySelector('.video-card')
    expect(videoCard.classList.contains('active')).toBe(true)
  })

  it('does not apply active class when isActive is false', () => {
    const { container } = render(
      <VideoCard
        video={mockVideo}
        isActive={false}
        {...mockHandlers}
      />
    )

    const videoCard = container.querySelector('.video-card')
    expect(videoCard.classList.contains('active')).toBe(false)
  })

  it('calls onComment handler when comment button is clicked', () => {
    let commentClicked = false
    const onCommentHandler = () => {
      commentClicked = true
    }

    render(
      <VideoCard
        video={mockVideo}
        isActive={true}
        onLike={mockHandlers.onLike}
        onFollow={mockHandlers.onFollow}
        onComment={onCommentHandler}
        onShare={mockHandlers.onShare}
      />
    )

    const commentButton = screen.getByTestId('comment-btn')
    fireEvent.click(commentButton)
    expect(commentClicked).toBe(true)
  })

  it('calls onShare handler when share button is clicked', () => {
    let shareClicked = false
    const onShareHandler = () => {
      shareClicked = true
    }

    render(
      <VideoCard
        video={mockVideo}
        isActive={true}
        onLike={mockHandlers.onLike}
        onFollow={mockHandlers.onFollow}
        onComment={mockHandlers.onComment}
        onShare={onShareHandler}
      />
    )

    const shareButton = screen.getByTestId('share-btn')
    fireEvent.click(shareButton)
    expect(shareClicked).toBe(true)
  })

  it('renders author avatar', () => {
    render(
      <VideoCard
        video={mockVideo}
        isActive={true}
        {...mockHandlers}
      />
    )

    const avatar = screen.getByText('👨')
    expect(avatar).toBeInTheDocument()
  })
})
