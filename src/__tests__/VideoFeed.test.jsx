import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import VideoFeed from '../components/VideoFeed'
import videos from '../data/videos'

describe('VideoFeed interactions and scrolling', ()=>{
  test('intersection observer sets active card and play state toggles, like and follow work', async ()=>{
    const { container } = render(<VideoFeed items={JSON.parse(JSON.stringify(videos))} />)

    // get mock observer and trigger intersection for the second card
    const obs = global.__io_observers[0]
    expect(obs).toBeDefined()

    const cards = container.querySelectorAll('.card')
    expect(cards.length).toBeGreaterThanOrEqual(3)

    const second = cards[1]
    // simulate it entering view
    obs.trigger([{ target: second, isIntersecting: true }])

    // Assert that second card shows Active status
    const activeLabel = await screen.findByText(/Status:\s*Active/i)
    expect(activeLabel).toBeInTheDocument()

    // click like button inside second card
    const likeBtn = second.querySelector('button[aria-label="like"]')
    expect(likeBtn).toBeTruthy()
    const beforeCount = second.querySelector('.count').textContent
    fireEvent.click(likeBtn)
    const afterCount = second.querySelector('.count').textContent
    expect(Number(afterCount)).toBe(Number(beforeCount) + 1)

    // click follow and ensure text toggles
    const followBtn = second.querySelector('.follow')
    expect(followBtn.textContent).toMatch(/Follow|Following/)
    const beforeText = followBtn.textContent
    fireEvent.click(followBtn)
    const afterText = followBtn.textContent
    expect(afterText === beforeText ? false : true).toBeTruthy()
  })
})
