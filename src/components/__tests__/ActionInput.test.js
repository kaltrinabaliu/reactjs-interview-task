import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ActionInput from '../components/ActionInput';

describe('ActionInput component', () => {
  it('renders with the provided placeholder', () => {
    render(<ActionInput placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('calls onChange handler when text is input', () => {
    const handleChange = jest.fn();
    render(<ActionInput placeholder="Enter text" onChange={handleChange} />);
    fireEvent.change(screen.getByPlaceholderText('Enter text'), { target: { value: 'New text' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
