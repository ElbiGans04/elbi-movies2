import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Elbi Movies Text', () => {
  render(<App />);
  const linkElement = screen.getByText(/Elbi Movies/i);
  expect(linkElement).toBeInTheDocument();
});
