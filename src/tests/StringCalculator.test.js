import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StringCalculator from '../components/StringCalculator';

describe('StringCalculator Component', () => {
  test('renders the String Calculator component', () => {
    const { getByPlaceholderText, getByText } = render(<StringCalculator />);
    expect(getByPlaceholderText('Enter numbers')).toBeInTheDocument();
    expect(getByText('Calculate')).toBeInTheDocument();
  });

  test('returns 0 for an empty string', () => {
    const { getByPlaceholderText, getByText, getByRole } = render(<StringCalculator />);
    fireEvent.change(getByPlaceholderText('Enter numbers'), { target: { value: '' } });
    fireEvent.click(getByText('Calculate'));
    expect(getByRole('alert')).toHaveTextContent('Result: 0');
  });

  test('returns the number for a single number string', () => {
    const { getByPlaceholderText, getByText, getByRole } = render(<StringCalculator />);
    fireEvent.change(getByPlaceholderText('Enter numbers'), { target: { value: '1' } });
    fireEvent.click(getByText('Calculate'));
    expect(getByRole('alert')).toHaveTextContent('Result: 1');
  });

  test('returns the sum of two numbers separated by a comma', () => {
    const { getByPlaceholderText, getByText, getByRole } = render(<StringCalculator />);
    fireEvent.change(getByPlaceholderText('Enter numbers'), { target: { value: '1,5' } });
    fireEvent.click(getByText('Calculate'));
    expect(getByRole('alert')).toHaveTextContent('Result: 6');
  });

  test('returns the sum of numbers separated by new lines', () => {
    const { getByPlaceholderText, getByText, getByRole } = render(<StringCalculator />);
    fireEvent.change(getByPlaceholderText('Enter numbers'), { target: { value: '1\n2,3' } });
    fireEvent.click(getByText('Calculate'));
    expect(getByRole('alert')).toHaveTextContent('Result: 6');
  });

  test('supports different delimiters', () => {
    const { getByPlaceholderText, getByText, getByRole } = render(<StringCalculator />);
    fireEvent.change(getByPlaceholderText('Enter numbers'), { target: { value: '//;\n1;2' } });
    fireEvent.click(getByText('Calculate'));
    expect(getByRole('alert')).toHaveTextContent('Result: 3');
  });

  test('throws an exception for negative numbers', () => {
    const { getByPlaceholderText, getByText } = render(<StringCalculator />);
    fireEvent.change(getByPlaceholderText('Enter numbers'), { target: { value: '1,-2,3' } });
    fireEvent.click(getByText('Calculate'));
    expect(getByText('negative numbers not allowed -2')).toBeInTheDocument();
  });

  test('throws an exception with all negative numbers', () => {
    const { getByPlaceholderText, getByText } = render(<StringCalculator />);
    fireEvent.change(getByPlaceholderText('Enter numbers'), { target: { value: '1,-2,-3' } });
    fireEvent.click(getByText('Calculate'));
    expect(getByText('negative numbers not allowed -2,-3')).toBeInTheDocument();
  });
});