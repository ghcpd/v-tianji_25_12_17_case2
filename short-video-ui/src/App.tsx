import React from 'react'
import { FeedProvider } from './context/FeedContext'
import Feed from './components/Feed'

export default function App(){
  return (
    <div className="app">
      <header className="header">
        <h2>Shorts</h2>
      </header>
      <FeedProvider>
        <Feed />
      </FeedProvider>
    </div>
  )
}