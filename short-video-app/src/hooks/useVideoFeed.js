import { useState, useEffect, useCallback } from 'react'

/**
 * Custom hook to manage video feed state including likes, follows, and playback
 */
export const useVideoFeed = (initialVideos) => {
  const [videos, setVideos] = useState(initialVideos)

  const toggleLike = useCallback((videoId) => {
    setVideos(prevVideos =>
      prevVideos.map(video =>
        video.id === videoId
          ? {
              ...video,
              liked: !video.liked,
              likes: video.liked ? video.likes - 1 : video.likes + 1
            }
          : video
      )
    )
  }, [])

  const toggleFollow = useCallback((videoId) => {
    setVideos(prevVideos =>
      prevVideos.map(video =>
        video.id === videoId
          ? { ...video, following: !video.following }
          : video
      )
    )
  }, [])

  const getVideoById = useCallback((videoId) => {
    return videos.find(v => v.id === videoId)
  }, [videos])

  return {
    videos,
    toggleLike,
    toggleFollow,
    getVideoById
  }
}

/**
 * Custom hook to manage scrolling behavior and active video
 */
export const useScrollFeed = (videoCount) => {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0)

  const handleScroll = useCallback((event) => {
    const element = event.target
    const scrollPercentage = (element.scrollLeft / (element.scrollWidth - element.clientWidth)) * 100

    // Determine which video is active based on scroll position
    const videoHeight = element.clientHeight
    const scrollTop = element.scrollTop
    const newIndex = Math.floor((scrollTop + videoHeight / 2) / videoHeight)

    if (newIndex >= 0 && newIndex < videoCount) {
      setActiveVideoIndex(newIndex)
    }
  }, [videoCount])

  return {
    activeVideoIndex,
    handleScroll,
    setActiveVideoIndex
  }
}
