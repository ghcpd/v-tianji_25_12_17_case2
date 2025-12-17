import React, { useRef, useEffect, useState } from 'react'

export default function VideoCard({ item, isActive, onLike, onToggleFollow, onPlayToggle }){
  const videoRef = useRef(null)
  const [paused, setPaused] = useState(false)
  const [liked, setLiked] = useState(false)

  useEffect(()=>{
    setLiked(false)
  },[item.id])

  // auto play when active
  useEffect(()=>{
    const v = videoRef.current
    if(!v) return
    if(isActive){
      // try to play
      v.play && v.play().catch(()=>{})
      setPaused(false)
      onPlayToggle && onPlayToggle(item.id, true)
    } else {
      v.pause && v.pause()
      setPaused(true)
      onPlayToggle && onPlayToggle(item.id, false)
    }
  },[isActive])

  function handleLike(){
    setLiked(s=>!s)
    onLike && onLike(item.id)
  }

  function handleTogglePlay(){
    const v = videoRef.current
    if(!v) return
    if(v.paused){
      v.play && v.play().catch(()=>{})
      setPaused(false)
      onPlayToggle && onPlayToggle(item.id, true)
    } else {
      v.pause && v.pause()
      setPaused(true)
      onPlayToggle && onPlayToggle(item.id, false)
    }
  }

  return (
    <div className="card" data-id={item.id}>
      <div className="videoFrame">
        <video ref={videoRef} src={item.src} muted loop playsInline data-testid={`video-${item.id}`} />
        <div className="playOverlay" onClick={handleTogglePlay} role="button" aria-label="toggle-play">
          <div className="playIcon">{paused ? '▶' : ' '}</div>
        </div>
      </div>

      <div className="meta">
        <div className="user">
          <div className="avatar">{item.avatar}</div>
          <div style={{display:'flex',flexDirection:'column'}}>
            <div className="username">{item.user}</div>
            <div className="handle">{item.handle}</div>
          </div>
          <button className="follow" onClick={()=>onToggleFollow && onToggleFollow(item.id)}>{item.followed ? 'Following' : 'Follow'}</button>
        </div>

        <div className="desc">{item.desc}</div>
        <div className="tags">{item.tags}</div>

        <div style={{display:'flex',gap:12,alignItems:'center',marginTop:12}}>
          <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
            <button className={`btn ${liked ? 'liked': ''}`} aria-label="like" onClick={handleLike}>{liked ? '❤' : '♡'}</button>
            <div className="count">{item.likes + (liked?1:0)}</div>
            <div className="badge">Likes</div>
          </div>

          <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
            <div className="btn small">💬</div>
            <div className="count">{item.comments}</div>
            <div className="badge">Comments</div>
          </div>

        </div>

        <div className="small" style={{marginTop:18}}>
          <div>Video ID: <strong style={{color:'#cfe7ff'}}>{item.id}</strong></div>
          <div style={{marginTop:8}}>Status: <span style={{color:isActive? 'var(--accent)':'var(--muted)'}}>{isActive? 'Active':'Paused'}</span></div>
        </div>

      </div>
    </div>
  )
}
