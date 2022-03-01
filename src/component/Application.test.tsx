import React from 'react'
import { render } from '@testing-library/react'
// import { render, screen } from '@testing-library/react'
import Application from './Application'

test('Renders Application', () => {
  render(<Application />)
  // const linkElement = screen.getByText(/learn react/i)
  // expect(linkElement).toBeInTheDocument()
})
