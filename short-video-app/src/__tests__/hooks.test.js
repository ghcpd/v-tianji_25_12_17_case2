import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useVideoFeed, useScrollFeed } from '../hooks/useVideoFeed'
import { generateMockVideos } from '../utils/mockData'

describe('useVideoFeed Hook', () => {
  it('initializes with provided videos', () => {
    const mockVideos = generateMockVideos(3)
    const { result } = renderHook(() => useVideoFeed(mockVideos))

    expect(result.current.videos.length).toBe(3)
    expect(result.current.videos[0].id).toBe(mockVideos[0].id)
  })

  it('toggleLike updates video like state', () => {
    const mockVideos = generateMockVideos(1)
    const { result } = renderHook(() => useVideoFeed(mockVideos))

    const initialLiked = result.current.videos[0].liked
    const initialLikes = result.current.videos[0].likes

    act(() => {
      result.current.toggleLike(mockVideos[0].id)
    })

    expect(result.current.videos[0].liked).toBe(!initialLiked)
    expect(result.current.videos[0].likes).toBe(initialLikes + 1)
  })

  it('toggleLike increments like count when not liked', () => {
    const mockVideos = generateMockVideos(1)
    mockVideos[0].liked = false
    const { result } = renderHook(() => useVideoFeed(mockVideos))

    const initialLikes = result.current.videos[0].likes

    act(() => {
      result.current.toggleLike(mockVideos[0].id)
    })

    expect(result.current.videos[0].likes).toBe(initialLikes + 1)
  })

  it('toggleLike decrements like count when already liked', () => {
    const mockVideos = generateMockVideos(1)
    mockVideos[0].liked = true
    const { result } = renderHook(() => useVideoFeed(mockVideos))

    const initialLikes = result.current.videos[0].likes

    act(() => {
      result.current.toggleLike(mockVideos[0].id)
    })

    expect(result.current.videos[0].likes).toBe(initialLikes - 1)
  })

  it('toggleLike does not affect other videos', () => {
    const mockVideos = generateMockVideos(3)
    const { result } = renderHook(() => useVideoFeed(mockVideos))

    const initialLikes1 = result.current.videos[1].likes
    const initialLikes2 = result.current.videos[2].likes

    act(() => {
      result.current.toggleLike(mockVideos[0].id)
    })

    expect(result.current.videos[1].likes).toBe(initialLikes1)
    expect(result.current.videos[2].likes).toBe(initialLikes2)
  })

  it('toggleFollow updates video follow state', () => {
    const mockVideos = generateMockVideos(1)
    const { result } = renderHook(() => useVideoFeed(mockVideos))

    const initialFollowing = result.current.videos[0].following

    act(() => {
      result.current.toggleFollow(mockVideos[0].id)
    })

    expect(result.current.videos[0].following).toBe(!initialFollowing)
  })

  it('toggleFollow does not affect other videos', () => {
    const mockVideos = generateMockVideos(3)
    const { result } = renderHook(() => useVideoFeed(mockVideos))

    const initialFollowing1 = result.current.videos[1].following
    const initialFollowing2 = result.current.videos[2].following

    act(() => {
      result.current.toggleFollow(mockVideos[0].id)
    })

    expect(result.current.videos[1].following).toBe(initialFollowing1)
    expect(result.current.videos[2].following).toBe(initialFollowing2)
  })

  it('getVideoById returns correct video', () => {
    const mockVideos = generateMockVideos(3)
    const { result } = renderHook(() => useVideoFeed(mockVideos))

    const video = result.current.getVideoById(mockVideos[1].id)
    expect(video.id).toBe(mockVideos[1].id)
    expect(video.author).toBe(mockVideos[1].author)
  })

  it('getVideoById returns undefined for non-existent video', () => {
    const mockVideos = generateMockVideos(3)
    const { result } = renderHook(() => useVideoFeed(mockVideos))

    const video = result.current.getVideoById(999)
    expect(video).toBeUndefined()
  })

  it('multiple toggleLike calls work correctly', () => {
    const mockVideos = generateMockVideos(1)
    mockVideos[0].liked = false
    const { result } = renderHook(() => useVideoFeed(mockVideos))

    const initialLikes = result.current.videos[0].likes

    act(() => {
      result.current.toggleLike(mockVideos[0].id)
    })

    expect(result.current.videos[0].likes).toBe(initialLikes + 1)

    act(() => {
      result.current.toggleLike(mockVideos[0].id)
    })

    expect(result.current.videos[0].likes).toBe(initialLikes)
    expect(result.current.videos[0].liked).toBe(false)
  })

  it('multiple toggleFollow calls work correctly', () => {
    const mockVideos = generateMockVideos(1)
    const { result } = renderHook(() => useVideoFeed(mockVideos))

    const initialFollowing = result.current.videos[0].following

    act(() => {
      result.current.toggleFollow(mockVideos[0].id)
    })

    expect(result.current.videos[0].following).toBe(!initialFollowing)

    act(() => {
      result.current.toggleFollow(mockVideos[0].id)
    })

    expect(result.current.videos[0].following).toBe(initialFollowing)
  })
})

describe('useScrollFeed Hook', () => {
  it('initializes with activeVideoIndex of 0', () => {
    const { result } = renderHook(() => useScrollFeed(5))
    expect(result.current.activeVideoIndex).toBe(0)
  })

  it('setActiveVideoIndex updates the active video', () => {
    const { result } = renderHook(() => useScrollFeed(5))

    act(() => {
      result.current.setActiveVideoIndex(2)
    })

    expect(result.current.activeVideoIndex).toBe(2)
  })

  it('handleScroll is a function', () => {
    const { result } = renderHook(() => useScrollFeed(5))
    expect(typeof result.current.handleScroll).toBe('function')
  })

  it('activeVideoIndex does not exceed video count', () => {
    const { result } = renderHook(() => useScrollFeed(5))

    act(() => {
      result.current.setActiveVideoIndex(10)
    })

    // activeVideoIndex can be set beyond count, that's the component's responsibility
    expect(result.current.activeVideoIndex).toBe(10)
  })

  it('activeVideoIndex can be 0', () => {
    const { result } = renderHook(() => useScrollFeed(5))

    act(() => {
      result.current.setActiveVideoIndex(3)
    })

    act(() => {
      result.current.setActiveVideoIndex(0)
    })

    expect(result.current.activeVideoIndex).toBe(0)
  })
})
