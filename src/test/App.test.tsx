import { render, screen, act } from '@testing-library/react'
import App from '../App'

describe('App', () => {
  it('renders the video feed', () => {
    render(<App />)
    expect(screen.getByText('User1')).toBeInTheDocument()
    expect(screen.getByText('A fun video of a bunny')).toBeInTheDocument()
  })

  it('handles like interaction', async () => {
    render(<App />)
    const likeButton = screen.getAllByText('🤍 100')[0]
    await act(async () => {
      likeButton.click()
    })
    expect(screen.getByText('❤️ 101')).toBeInTheDocument()
  })

  it('handles comment interaction', async () => {
    render(<App />)
    const commentButton = screen.getAllByText('💬 2')[0]
    await act(async () => {
      commentButton.click()
    })
    expect(screen.getByPlaceholderText('Add comment')).toBeInTheDocument()
  })
})