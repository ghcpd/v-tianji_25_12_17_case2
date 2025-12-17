import React, { createContext, useContext, useState } from 'react'
import { Video, sampleVideos } from '../data/videos'

type FeedState = {
  videos: Video[]
  toggleLike: (id: string) => void
  toggleFollow: (id: string) => void
  addComment: (id: string, comment: string) => void
}

const FeedContext = createContext<FeedState | undefined>(undefined)

export const FeedProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [videos, setVideos] = useState<Video[]>(sampleVideos)

  const toggleLike = (id: string) => {
    setVideos(vs => vs.map(v => v.id === id ? { ...v, liked: !v.liked, likes: v.liked ? v.likes - 1 : v.likes + 1 } : v))
  }

  const toggleFollow = (id: string) => {
    setVideos(vs => vs.map(v => v.id === id ? { ...v, followed: !v.followed } : v))
  }

  const addComment = (id: string, comment: string) => {
    // mocked: do nothing but could store comments
    console.log('comment added', id, comment)
  }

  return (
    <FeedContext.Provider value={{ videos, toggleLike, toggleFollow, addComment }}>
      {children}
    </FeedContext.Provider>
  )
}

export const useFeed = () => {
  const ctx = useContext(FeedContext)
  if (!ctx) throw new Error('useFeed must be used within FeedProvider')
  return ctx
}
