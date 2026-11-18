import React, { useState } from 'react';
import './App.css';

function App() {
  const [board, setBoard] = useState(Array(81).fill(''));
  const [status, setStatus] = useState('');
  const [invalidIndices, setInvalidIndices] = useState(new Set());

  const handleChange = (index, value) => {
    if (value.length <= 1 && /^[1-9]?$/.test(value)) {
      const newBoard = [...board];
      newBoard[index] = value;
      setBoard(newBoard);
      setStatus('');
      setInvalidIndices(new Set());
    }
  };

  const validate = () => {
    const grid = board.map(v => v === '' ? 0 : parseInt(v));
    const invalid = new Set();

    // Check rows, cols, and boxes for conflicts
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const val = grid[i * 9 + j];
        if (val === 0) continue;

        // Check Row
        for (let k = 0; k < 9; k++) {
          if (k !== j && grid[i * 9 + k] === val) invalid.add(i * 9 + j);
        }
        // Check Col
        for (let k = 0; k < 9; k++) {
          if (k !== i && grid[k * 9 + j] === val) invalid.add(i * 9 + j);
        }
        // Check Box
        const startRow = Math.floor(i / 3) * 3;
        const startCol = Math.floor(j / 3) * 3;
        for (let r = startRow; r < startRow + 3; r++) {
          for (let c = startCol; c < startCol + 3; c++) {
            if ((r !== i || c !== j) && grid[r * 9 + c] === val) invalid.add(i * 9 + j);
          }
        }
      }
    }

    setInvalidIndices(invalid);
    if (invalid.size === 0) {
      setStatus('Valid Sudoku');
    } else {
      setStatus('Invalid Sudoku');
    }
  };

  const clearBoard = () => {
    setBoard(Array(81).fill(''));
    setStatus('');
    setInvalidIndices(new Set());
  };

  return (
    <div className="app">
      <h1>Sudoku Validator</h1>
      <p>Enter numbers 1-9 and validate the board.</p>
      <div className="board">
        {board.map((val, idx) => (
          <input
            key={idx}
            className={`cell ${invalidIndices.has(idx) ? 'invalid' : ''}`}
            type="text"
            value={val}
            onChange={(e) => handleChange(idx, e.target.value)}
          />
        ))}
      </div>
      <div className="button-group">
      <button onClick={validate}>Validate</button>
        <button onClick={clearBoard}>Clear</button>
    </div>
      <div className="status">{status}</div>
    </div>
  );
}

export default App;

