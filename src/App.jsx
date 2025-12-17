import React from 'react'
import VideoFeed from './components/VideoFeed'
import videos from './data/videos'

export default function App(){
  return (
    <div className="app" role="application">
      <div className="header">
        <div className="logo">SV</div>
        <div>
          <div className="title">Shorts Studio</div>
          <div className="subtitle">Smooth short-video browsing • Mock data</div>
        </div>
      </div>

      <VideoFeed items={videos} />

      <div className="footerNote">Built for test: Short-Video Browsing UI • Demo mock</div>
    </div>
  )
}
