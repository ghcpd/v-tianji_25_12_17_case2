import React, { useEffect, useRef, useState } from 'react'
import { videos as initialVideos } from '../mock/videos'
import VideoCard from './VideoCard'
import type { Video } from '../types'

export default function VideoFeed() {
  const [videos, setVideos] = useState<Video[]>(initialVideos)
  const [active, setActive] = useState<string | null>(videos[0]?.id ?? null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const nodes = Array.from(containerRef.current?.querySelectorAll('.card') ?? [])
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            const id = entry.target.getAttribute('data-testid')?.replace('card-', '')
            if (id) setActive(id)
          }
        })
      },
      { threshold: [0.6] }
    )

    nodes.forEach((n) => observer.observe(n))
    return () => observer.disconnect()
  }, [videos])

  const handleLike = (id: string) => {
    setVideos((prev) => prev.map((v) => (v.id === id ? { ...v, liked: !v.liked, likes: v.liked ? v.likes - 1 : v.likes + 1 } : v)))
  }

  return (
    <div className="feed" ref={containerRef} data-testid="feed">
      {videos.map((v) => (
        <VideoCard key={v.id} video={v} isActive={active === v.id} onLike={handleLike} />
      ))}
    </div>
  )
}
