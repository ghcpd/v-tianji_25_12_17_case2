import React, { useEffect, useRef, useState } from 'react'
import { Video } from '../data/videos'
import { useFeed } from '../context/FeedContext'

export const VideoCard: React.FC<{video: Video}> = ({ video }) => {
  const ref = useRef<HTMLVideoElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const { toggleLike, toggleFollow } = useFeed()

  useEffect(() => {
    const v = ref.current
    if (!v) return
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          try {
            const maybePromise = v.play()
            if (maybePromise && typeof (maybePromise as any).catch === 'function') (maybePromise as any).catch(()=>{})
          } catch(e){ /* ignore in test environment */ }
          setPlaying(true)
        } else {
          try { v.pause() } catch(e){}
          setPlaying(false)
        }
      })
    }, { threshold: 0.6 })
    observer.observe(v)
    return () => observer.disconnect()
  }, [])

  const onTogglePlay = () => {
    const v = ref.current
    if (!v) return
    try {
      if (v.paused) {
        const maybePromise = v.play()
        if (maybePromise && typeof (maybePromise as any).catch === 'function') (maybePromise as any).catch(()=>{})
        setPlaying(true)
      } else {
        v.pause()
        setPlaying(false)
      }
    } catch(e){ /* ignore */ }
  }

  return (
    <div className="videoCard" data-testid={`video-card-${video.id}`}>
      <div className="meta">
        <div className="username">@{video.user} <button className="follow" onClick={() => toggleFollow(video.id)}>{video.followed ? 'Following' : 'Follow'}</button></div>
        <div className="desc">{video.description}</div>
      </div>
      <video ref={ref} src={video.src} loop muted playsInline data-testid={`video-${video.id}`} />

      <div className="controls">
        <div className={`icon ${video.liked ? 'like' : ''}`} onClick={() => toggleLike(video.id)} data-testid={`like-${video.id}`}>
          ♥<div style={{fontSize:12}}>{video.likes}</div>
        </div>
        <div className="icon" onClick={onTogglePlay} data-testid={`pause-${video.id}`}>{playing ? '❚❚' : '►'}</div>
      </div>
      {!playing && <div className="pauseOverlay" data-testid={`overlay-${video.id}`}>►</div>}
    </div>
  )
}

export default VideoCard