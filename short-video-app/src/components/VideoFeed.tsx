import React, { useRef, useEffect } from 'react'
import VideoCard from './VideoCard'
import mockVideos from '../mockData'

const VideoFeed: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  // Use IntersectionObserver to autoplay the video in view
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const elements = Array.from(container.querySelectorAll('.video-card'))
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.8,
    }

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const videoEl = entry.target.querySelector('video') as HTMLVideoElement | null
        if (!videoEl) return
        if (entry.isIntersecting) {
          // Call play if available and ignore promise rejections in browsers or tests
          try {
            const playResult = videoEl.play()
            if (playResult && playResult.catch) {
              playResult.catch(() => {})
            }
          } catch {
            // ignore
          }
        } else {
          videoEl.pause()
        }
      })
    }

    const observer = new IntersectionObserver(handleIntersect, options)
    elements.forEach((el) => observer.observe(el))

    return () => {
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  return (
    <div className="video-feed" ref={containerRef}>
      {mockVideos.map((v) => (
        <div key={v.id} className="video-card">
          <VideoCard video={v} />
        </div>
      ))}
    </div>
  )
}

export default VideoFeed
