import React, { useEffect, useRef, useState } from 'react'
import VideoCard from './VideoCard'

export default function VideoFeed({ items }){
  const feedRef = useRef(null)
  const [activeId, setActiveId] = useState(items?.[0]?.id || null)
  const [lastPlayStates, setLastPlayStates] = useState({})
  const observerRef = useRef(null)

  useEffect(()=>{
    const el = feedRef.current
    if(!el) return

    const onChange = (entries)=>{
      entries.forEach(entry=>{
        const id = entry.target.getAttribute('data-id')
        if(entry.isIntersecting){
          setActiveId(id)
        }
      })
    }

    const obs = new IntersectionObserver(onChange, {threshold:0.6})
    observerRef.current = obs

    const cards = el.querySelectorAll('.card')
    cards.forEach(c=>obs.observe(c))

    return ()=>{ obs.disconnect() }
  },[items])

  function handleLike(id){
    // in-memory update
    const idx = items.findIndex(i=>i.id===id)
    if(idx>=0){ items[idx].likes += 1 }
    // forcing state update
    setLastPlayStates(s=>({...s, like:Date.now()}))
  }

  function handleToggleFollow(id){
    const idx = items.findIndex(i=>i.id===id)
    if(idx>=0){ items[idx].followed = !items[idx].followed }
    setLastPlayStates(s=>({...s, follow:Date.now()}))
  }

  function handlePlayToggle(id, playing){
    setLastPlayStates(s=>({...s, [id]: playing}))
  }

  return (
    <div>
      <div className="feed" ref={feedRef} data-testid="feed">
        {items.map(i=> (
          <VideoCard key={i.id} item={i} isActive={i.id===activeId} onLike={handleLike} onToggleFollow={handleToggleFollow} onPlayToggle={handlePlayToggle} />
        ))}
      </div>
    </div>
  )
}
