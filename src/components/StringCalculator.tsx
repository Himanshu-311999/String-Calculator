import React, { useState } from 'react';
import './StringCalculator.css';


function add(numbers: string) {
  if (numbers === "") {
    return 0;
  }

  let delimiter = /,|\n/;
  if (numbers.startsWith("//")) {
    const parts = numbers.split("\n");
    delimiter = new RegExp(parts[0][2]);
    numbers = parts[1];
  }

  const nums = numbers.split(delimiter).map(Number);
  const negatives = nums.filter(n => n < 0);

  if (negatives.length > 0) {
    throw new Error(`negative numbers not allowed ${negatives.join(",")}`);
  }

  return nums.reduce((sum, num) => sum + num, 0);
}

const StringCalculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  const handleInputChange = (e: any) => {
    setInput(e.target.value);
  };

  const handleCalculate = () => {
    try {
      const sum = add(input);
      setResult(sum);
      setError('');
    } catch (e: any) {
      setError(e.message);
      setResult(null);
    }
  };

  return (
    <div className="calculator">
      <h1>String Calculator</h1>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Enter numbers"
      />
      <button onClick={handleCalculate}>Calculate</button>
      {result !== null && <div className="result">Result: {result}</div>}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default StringCalculator;
