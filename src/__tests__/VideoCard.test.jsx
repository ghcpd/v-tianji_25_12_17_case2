import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import VideoCard from '../components/VideoCard'

const sample = {
  id: 'tx1', user: 'Test', handle: '@t', avatar: 'T', src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', desc: 'x', tags: '#', likes: 1, comments: 0, followed: false
}

describe('VideoCard unit behaviors', ()=>{
  test('auto-play when active calls play; clicking toggles play/pause', async ()=>{
    const playSpy = vi.spyOn(HTMLMediaElement.prototype, 'play')
    const pauseSpy = vi.spyOn(HTMLMediaElement.prototype, 'pause')

    const { rerender, container } = render(<VideoCard item={sample} isActive={false} />)
    const video = container.querySelector('video')
    expect(video).toBeTruthy()

    // initially not active -> paused
    rerender(<VideoCard item={sample} isActive={true} />)
    expect(playSpy).toHaveBeenCalled()

    // click overlay to pause
    const overlay = container.querySelector('.playOverlay')
    fireEvent.click(overlay)
    expect(pauseSpy).toHaveBeenCalled()

    // click overlay to play again
    fireEvent.click(overlay)
    expect(playSpy).toHaveBeenCalled()

    playSpy.mockRestore()
    pauseSpy.mockRestore()
  })

  test('like button toggles liked state and increments displayed count', ()=>{
    const { container } = render(<VideoCard item={sample} isActive={false} />)
    const likeBtn = container.querySelector('button[aria-label="like"]')
    const count = container.querySelector('.count')
    expect(count.textContent).toBe('1')
    fireEvent.click(likeBtn)
    expect(count.textContent).toBe('2')
    fireEvent.click(likeBtn)
    expect(count.textContent).toBe('1')
  })
})
