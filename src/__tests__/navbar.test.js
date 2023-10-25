import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Navbar from '../components/navbar'

describe('Navbar Component', () => {
  test('renders 2 navigation links', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )

    const links = screen.getAllByRole('link') // Assert that there are three navigation links
    expect(links).toHaveLength(2)
    expect(links[0].textContent).toBe('Landing Page')
    expect(links[1].textContent).toBe('Other Page')

    expect(links[0].getAttribute('href')).toBe('/')
    expect(links[1].getAttribute('href')).toBe('/other')

    links.forEach((link) => {
      expect(link.className).toBe('linkATag')
    })
  })

  test('if word "Landing" on Navbar page', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )
    const linkElement = screen.getByText(/Landing/i)
    expect(linkElement).toBeInTheDocument()
  })
})
