import React, { useRef, useEffect } from 'react'
import '../styles/VideoCard.css'

const VideoCard = ({
  video,
  isActive,
  onLike,
  onFollow,
  onComment,
  onShare
}) => {
  const videoRef = useRef(null)

  // Auto-play/pause based on active state
  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play().catch(() => {
          // Video autoplay may fail due to browser policies
        })
      } else {
        videoRef.current.pause()
        videoRef.current.currentTime = 0
      }
    }
  }, [isActive])

  return (
    <div className={`video-card ${isActive ? 'active' : ''}`}>
      {/* Video Container */}
      <div className="video-container">
        <div className="video-placeholder">
          <div className="emoji">{video.thumbnail}</div>
          <p>{video.title}</p>
        </div>
      </div>

      {/* Side Actions */}
      <div className="side-actions">
        {/* Like Button */}
        <div
          className={`action-btn like-btn ${video.liked ? 'liked' : ''}`}
          onClick={() => onLike(video.id)}
          data-testid="like-btn"
        >
          <div className="icon">{video.liked ? '❤️' : '🤍'}</div>
          <span className="count">{video.likes}</span>
        </div>

        {/* Comment Button */}
        <div
          className="action-btn comment-btn"
          onClick={() => onComment?.(video.id)}
          data-testid="comment-btn"
        >
          <div className="icon">💬</div>
          <span className="count">{video.comments}</span>
        </div>

        {/* Share Button */}
        <div
          className="action-btn share-btn"
          onClick={() => onShare?.(video.id)}
          data-testid="share-btn"
        >
          <div className="icon">📤</div>
          <span className="count">{video.shares}</span>
        </div>

        {/* Bookmark Button */}
        <div className="action-btn bookmark-btn" data-testid="bookmark-btn">
          <div className="icon">🔖</div>
        </div>
      </div>

      {/* Bottom Info Section */}
      <div className="bottom-info">
        {/* Author Info */}
        <div className="author-info">
          <div className="avatar">{video.avatar}</div>
          <div className="author-details">
            <h3>{video.author}</h3>
            <p>{video.description}</p>
          </div>
          {/* Follow Button */}
          <button
            className={`follow-btn ${video.following ? 'following' : ''}`}
            onClick={() => onFollow(video.id)}
            data-testid="follow-btn"
          >
            {video.following ? '✓ Following' : '+ Follow'}
          </button>
        </div>

        {/* Duration Badge */}
        <div className="duration-badge">{video.duration}</div>
      </div>
    </div>
  )
}

export default VideoCard
