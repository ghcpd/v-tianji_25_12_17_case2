import React, { useRef, useEffect } from 'react'
import { useFeed } from '../context/FeedContext'
import VideoCard from './VideoCard'

export const Feed: React.FC = () => {
  const { videos } = useFeed()
  const feedRef = useRef<HTMLDivElement | null>(null)

  useEffect(()=>{
    // smooth scroll snapping: ensure first video fills view
    if (feedRef.current) feedRef.current.scrollTop = 0
  }, [])

  return (
    <div className="feed" ref={feedRef} data-testid="feed">
      {videos.map(v => (
        <VideoCard key={v.id} video={v} />
      ))}
    </div>
  )
}

export default Feed