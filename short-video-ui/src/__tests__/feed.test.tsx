import React from 'react'
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react'
import App from '../App'
import { sampleVideos } from '../data/videos'

describe('Feed interactions', ()=>{
  test('renders feed with videos', ()=>{
    render(<App />)
    const feed = screen.getByTestId('feed')
    expect(feed).toBeInTheDocument()
    sampleVideos.forEach(v=>{
      expect(screen.getByTestId(`video-card-${v.id}`)).toBeInTheDocument()
    })
  })

  test('like toggles and updates count', async ()=>{
    render(<App />)
    const likeBtn = screen.getByTestId(`like-v1`)
    expect(likeBtn).toBeInTheDocument()
    fireEvent.click(likeBtn)
    // After click, the context updates; we expect the likes number to change in DOM
    await waitFor(()=>{
      expect(likeBtn.textContent).toContain((sampleVideos[0].likes + 1).toString())
    })
  })

  test('follow toggles on first video', async ()=>{
    render(<App />)
    const firstCard = screen.getByTestId('video-card-v1')
    const followBtn = (within(firstCard) as any).getByText('Follow')
    fireEvent.click(followBtn)
    await waitFor(()=>{
      expect(followBtn.textContent).toBe('Following')
    })
  })

  test('autoplay triggers when intersection observer reports intersecting', async ()=>{
    render(<App />)
    const videoEl = screen.getByTestId('video-v1') as HTMLVideoElement
    // Initially overlay is visible because video is paused
    expect(screen.queryByTestId('overlay-v1')).toBeInTheDocument()
    // Simulate IO callback using helper to target specific element
    expect((window as any).__io_trigger).toBeDefined()
    ;(window as any).__io_trigger(videoEl, true)
    // overlay should be removed when playing
    await waitFor(()=>{
      expect(screen.queryByTestId('overlay-v1')).not.toBeInTheDocument()
    })
  })

  test('pause/play button toggles', async ()=>{
    render(<App />)
    const pauseBtn = screen.getByTestId('pause-v1')
    // initial overlay exists
    expect(screen.queryByTestId('overlay-v1')).toBeInTheDocument()
    // click to play
    fireEvent.click(pauseBtn)
    await waitFor(()=>{
      expect(screen.queryByTestId('overlay-v1')).not.toBeInTheDocument()
    })
  })


})