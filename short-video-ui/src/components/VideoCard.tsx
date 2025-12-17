import React, { useEffect, useRef, useState } from 'react'
import type { Video } from '../types'

type Props = {
  video: Video
  isActive: boolean
  onLike: (id: string) => void
}

export default function VideoCard({ video, isActive, onLike }: Props) {
  const ref = useRef<HTMLVideoElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [liked, setLiked] = useState(!!video.liked)

  useEffect(() => {
    const vid = ref.current
    if (!vid) return
    if (isActive) {
      const playPromise = vid.play()
      // some browsers return a promise
      if (playPromise && typeof playPromise.then === 'function') {
        playPromise.then(() => setPlaying(true)).catch(() => setPlaying(false))
      } else {
        setPlaying(!vid.paused)
      }
    } else {
      vid.pause()
      setPlaying(false)
    }
  }, [isActive])

  const toggleLike = () => {
    setLiked((s) => !s)
    onLike(video.id)
  }

  const togglePlay = () => {
    const vid = ref.current
    if (!vid) return
    if (vid.paused) {
      vid.play()
      setPlaying(true)
    } else {
      vid.pause()
      setPlaying(false)
    }
  }

  return (
    <div className="card" data-testid={`card-${video.id}`}>
      <video
        ref={ref}
        className="video-el"
        src={video.src}
        muted
        playsInline
        loop
        data-testid={`video-${video.id}`}
      />

      <div className="play-state">{playing ? 'Playing' : 'Paused'}</div>

      <div className="overlay">
        <button aria-label="like" onClick={toggleLike} className="icon-btn" data-testid={`like-${video.id}`}>
          {liked ? '♥' : '♡'}
        </button>
        <button aria-label="play" onClick={togglePlay} className="icon-btn" data-testid={`play-${video.id}`}>
          {playing ? '⏸' : '▶'}
        </button>
      </div>

      <div className="info-bar">
        <div className="meta">
          <div className="title">{video.title}</div>
          <div className="author">@{video.author}</div>
        </div>
      </div>
    </div>
  )
}
