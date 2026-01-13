// src/SearchBar.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

test('renders input and submit button', () => {
  render(<SearchBar />);
  
  // Check if input exists
  const inputElement = screen.getByPlaceholderText(/search here/i);
  expect(inputElement).toBeInTheDocument();

  // Check if button exists
  const buttonElement = screen.getByText(/submit/i);
  expect(buttonElement).toBeInTheDocument();
});

test('allows users to type', () => {
  render(<SearchBar />);
  const inputElement = screen.getByPlaceholderText(/search here/i);
  
  fireEvent.change(inputElement, { target: { value: 'React' } });
  expect(inputElement.value).toBe('React');
});
