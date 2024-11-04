import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ActionButton from '../components/ActionButton';

describe('ActionButton component', () => {
  it('renders with the provided label', () => {
    render(<ActionButton label="Click me" bgColor="#1264A3" />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls the click handler when clicked', () => {
    const handleClick = jest.fn();
    render(<ActionButton label="Click me" bgColor="#1264A3" click={handleClick} />);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
