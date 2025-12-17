import React from 'react'
import { render, screen } from '@testing-library/react'
import App from '../App'

describe('App root', ()=>{
  test('renders header and feed', ()=>{
    render(<App />)
    expect(screen.getByText(/Shorts Studio/)).toBeInTheDocument()
    expect(screen.getByTestId('feed')).toBeInTheDocument()
  })
})
