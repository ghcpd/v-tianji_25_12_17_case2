import React, { useState, useRef, useEffect } from 'react'
import VideoCard from './VideoCard'
import { useVideoFeed, useScrollFeed } from '../hooks/useVideoFeed'
import { generateMockVideos } from '../utils/mockData'
import '../styles/VideoFeed.css'

const VideoFeed = () => {
  const initialVideos = generateMockVideos()
  const { videos, toggleLike, toggleFollow } = useVideoFeed(initialVideos)
  const { activeVideoIndex, handleScroll } = useScrollFeed(videos.length)
  const feedRef = useRef(null)
  const [isScrolling, setIsScrolling] = useState(false)

  // Handle scroll events
  useEffect(() => {
    const element = feedRef.current
    if (!element) return

    let scrollTimeout
    const onScroll = (e) => {
      setIsScrolling(true)
      clearTimeout(scrollTimeout)
      
      // Calculate active video based on scroll position
      const scrollTop = element.scrollTop
      const videoHeight = element.clientHeight
      const newIndex = Math.round(scrollTop / videoHeight)
      
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false)
      }, 150)
    }

    element.addEventListener('scroll', onScroll)
    return () => {
      element.removeEventListener('scroll', onScroll)
      clearTimeout(scrollTimeout)
    }
  }, [])

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const element = feedRef.current
      if (element) {
        element.scrollTop += element.clientHeight
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const element = feedRef.current
      if (element) {
        element.scrollTop -= element.clientHeight
      }
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleLike = (videoId) => {
    toggleLike(videoId)
  }

  const handleFollow = (videoId) => {
    toggleFollow(videoId)
  }

  const handleComment = (videoId) => {
    // Mock comment handler
    console.log(`Comment on video ${videoId}`)
  }

  const handleShare = (videoId) => {
    // Mock share handler
    console.log(`Share video ${videoId}`)
  }

  return (
    <div className="video-feed" ref={feedRef} data-testid="video-feed">
      {videos.map((video, index) => (
        <VideoCard
          key={video.id}
          video={video}
          isActive={index === activeVideoIndex}
          onLike={handleLike}
          onFollow={handleFollow}
          onComment={handleComment}
          onShare={handleShare}
        />
      ))}
      
      {/* Scroll Indicator */}
      <div className="scroll-indicator" data-testid="scroll-indicator">
        <div className="indicator-dot">
          {activeVideoIndex + 1} / {videos.length}
        </div>
      </div>
    </div>
  )
}

export default VideoFeed
