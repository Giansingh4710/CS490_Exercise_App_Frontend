import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthContextProvider } from '../../contexts/auth'
import Sidebar from './Sidebar'

const mockLogoutUser = jest.fn()
const mockAuthContext = {
  logoutUser: mockLogoutUser,
}

describe('Sidebar Component', () => {
  const wrapper = ({ children }) => (
    <Router>
      <AuthContextProvider value={mockAuthContext}>
        {children}
      </AuthContextProvider>
    </Router>
  )

  it('renders without crashing', () => {
    render(<Sidebar />, { wrapper })
    expect(screen.getByText(/FITFUSION/i)).toBeInTheDocument()
    expect(screen.getByText(/DASHBOARD/i)).toBeInTheDocument()
    expect(screen.getByText(/EXPLORE COACHES/i)).toBeInTheDocument()
    expect(screen.getByText(/MY COACH/i)).toBeInTheDocument()
    expect(screen.getByText(/WORKOUTS/i)).toBeInTheDocument()
    expect(screen.getByText(/PROFILE/i)).toBeInTheDocument()
    // because the icon is named "settings" as well, we must use "getAllByText()" and iterate through each element
    screen.getAllByText(/SETTINGS/i).forEach(element => {
      expect(element).toBeInTheDocument()
    })
    expect(screen.getByText(/LOG OUT/i)).toBeInTheDocument()
  })

  // I have commented out the pages that have not been set up yet
  // Once we set those pages up, we can uncomment
  it('has correct links', () => {
    render(<Sidebar />, { wrapper })
    expect(screen.getByText(/FITFUSION/i).closest('a')).toHaveAttribute(
      'href',
      '/',
    )
    expect(screen.getByText(/DASHBOARD/i).closest('a')).toHaveAttribute(
      'href',
      '/',
    )
    expect(screen.getByText(/EXPLORE COACHES/i).closest('a')).toHaveAttribute(
      'href',
      '/ExploreCoaches',
    )
    expect(screen.getByText(/MY COACH/i).closest('a')).toHaveAttribute(
      'href',
      '/MyCoach',
    )
    // expect(screen.getByText(/PROFILE/i).closest('a')).toHaveAttribute(
    //   'href',
    //   '/Profile',
    // )
    // expect(screen.getByText(/SETTINGS/i).closest('a')).toHaveAttribute(
    //   'href',
    //   '/Settings',
    // )
  })
  // this test still needs to be worked on: -KJ
  //   it('calls logoutUser on logout button click', async () => {
  //     render(<Sidebar />, { wrapper })

  //     const logoutButton = screen.getByText(/LOG OUT/i)
  //     fireEvent.click(logoutButton)

  //     await waitFor(() => expect(mockLogoutUser).toHaveBeenCalled())
  //   })
})
