import React, { useState } from 'react'

export interface Video {
  id: string
  user: string
  caption: string
  videoUrl: string
  likes: number
  isFollowing: boolean
}

interface Props {
  video: Video
}

const VideoCard: React.FC<Props> = ({ video }) => {
  const [likes, setLikes] = useState(video.likes)
  const [following, setFollowing] = useState(video.isFollowing)
  const [paused, setPaused] = useState(false)

  const toggleLike = () => setLikes((l) => l + 1)
  const toggleFollow = () => setFollowing((f) => !f)

  const handleVideoClick = () => setPaused((p) => !p)

  return (
    <div className="video-card-container">
      <video
        data-testid="video-player"
        src={video.videoUrl}
        muted
        loop
        playsInline
        preload="metadata"
        onClick={handleVideoClick}
        style={{ opacity: paused ? 0.5 : 1 }}
      />
      <div className="overlay">
        <div className="info">
          <div className="user">@{video.user}</div>
          <div className="caption">{video.caption}</div>
          <div className="actions">
            <button data-testid="like-button" onClick={toggleLike}>❤️ {likes}</button>
            <button data-testid="follow-button" onClick={toggleFollow}>{following ? 'Following' : 'Follow'}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoCard
