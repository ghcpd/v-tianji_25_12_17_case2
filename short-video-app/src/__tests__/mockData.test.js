import { describe, it, expect } from 'vitest'
import { MOCK_VIDEOS, generateMockVideos } from '../utils/mockData'

describe('Mock Data', () => {
  it('MOCK_VIDEOS contains videos', () => {
    expect(MOCK_VIDEOS.length).toBeGreaterThan(0)
  })

  it('each video has required properties', () => {
    MOCK_VIDEOS.forEach(video => {
      expect(video).toHaveProperty('id')
      expect(video).toHaveProperty('author')
      expect(video).toHaveProperty('avatar')
      expect(video).toHaveProperty('title')
      expect(video).toHaveProperty('thumbnail')
      expect(video).toHaveProperty('likes')
      expect(video).toHaveProperty('comments')
      expect(video).toHaveProperty('shares')
      expect(video).toHaveProperty('duration')
      expect(video).toHaveProperty('liked')
      expect(video).toHaveProperty('following')
      expect(video).toHaveProperty('description')
    })
  })

  it('video ids are unique', () => {
    const ids = MOCK_VIDEOS.map(v => v.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(ids.length)
  })

  it('video likes are positive numbers', () => {
    MOCK_VIDEOS.forEach(video => {
      expect(typeof video.likes).toBe('number')
      expect(video.likes).toBeGreaterThanOrEqual(0)
    })
  })

  it('video comments are positive numbers', () => {
    MOCK_VIDEOS.forEach(video => {
      expect(typeof video.comments).toBe('number')
      expect(video.comments).toBeGreaterThanOrEqual(0)
    })
  })

  it('video shares are positive numbers', () => {
    MOCK_VIDEOS.forEach(video => {
      expect(typeof video.shares).toBe('number')
      expect(video.shares).toBeGreaterThanOrEqual(0)
    })
  })

  it('generateMockVideos returns correct count', () => {
    const videos = generateMockVideos(3)
    expect(videos.length).toBe(3)
  })

  it('generateMockVideos returns all videos by default', () => {
    const videos = generateMockVideos()
    expect(videos.length).toBe(MOCK_VIDEOS.length)
  })

  it('generateMockVideos respects max count', () => {
    const videos = generateMockVideos(2)
    expect(videos.length).toBe(2)
    expect(videos[0].id).toBe(MOCK_VIDEOS[0].id)
    expect(videos[1].id).toBe(MOCK_VIDEOS[1].id)
  })

  it('all videos have string titles', () => {
    MOCK_VIDEOS.forEach(video => {
      expect(typeof video.title).toBe('string')
      expect(video.title.length).toBeGreaterThan(0)
    })
  })

  it('all videos have string authors', () => {
    MOCK_VIDEOS.forEach(video => {
      expect(typeof video.author).toBe('string')
      expect(video.author.length).toBeGreaterThan(0)
    })
  })

  it('all videos have valid duration format', () => {
    const durationRegex = /^\d{2}:\d{2}$/
    MOCK_VIDEOS.forEach(video => {
      expect(video.duration).toMatch(durationRegex)
    })
  })

  it('liked property is boolean', () => {
    MOCK_VIDEOS.forEach(video => {
      expect(typeof video.liked).toBe('boolean')
    })
  })

  it('following property is boolean', () => {
    MOCK_VIDEOS.forEach(video => {
      expect(typeof video.following).toBe('boolean')
    })
  })

  it('initial liked state is false', () => {
    MOCK_VIDEOS.forEach(video => {
      expect(video.liked).toBe(false)
    })
  })

  it('initial following state is false', () => {
    MOCK_VIDEOS.forEach(video => {
      expect(video.following).toBe(false)
    })
  })

  it('all videos have descriptions', () => {
    MOCK_VIDEOS.forEach(video => {
      expect(typeof video.description).toBe('string')
      expect(video.description.length).toBeGreaterThan(0)
    })
  })

  it('all videos have avatar emojis', () => {
    MOCK_VIDEOS.forEach(video => {
      expect(typeof video.avatar).toBe('string')
      expect(video.avatar.length).toBeGreaterThan(0)
    })
  })

  it('all videos have thumbnail emojis', () => {
    MOCK_VIDEOS.forEach(video => {
      expect(typeof video.thumbnail).toBe('string')
      expect(video.thumbnail.length).toBeGreaterThan(0)
    })
  })
})
