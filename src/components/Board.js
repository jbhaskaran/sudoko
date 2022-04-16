import React, { useEffect, useState, useCallback, useRef } from 'react';
import Square from './Square';
import Sudoko from '../sudoko/sudoko'
import generateGame from '../api/api';

function Board() {

  const [difficulty, setDifficulty] = useState('medium');
  const [result, setResult] = useState('unsolved');
  const [matrix, setMatrix] = useState([]);
  const sudokoGame = useRef();
  const size = 9;
  
  const fetchGame = useCallback(async (subscribed) => {
    const data = await generateGame(difficulty);
    const sudoko = new Sudoko();
    sudokoGame.current = sudoko;
    const board = sudoko.initializeBoard(data);
    if (subscribed) {
      setMatrix([...board]);
    }
  }, [difficulty]);

  useEffect(() => {
    let subscribed = true;
    fetchGame(subscribed).catch('Error');
    return () => subscribed = false;
  }, [fetchGame]);

  const squareValueChange = (e) => {
    const value = e.target.value;
    const id = e.target.id;
    const row = id[0];
    const col = id[1];
    matrix[row][col] = value ? parseInt(value) : '';
    setMatrix([...matrix]);
  }

  const squareItems = matrix.map((row, rowIndex) => {
    return row.map((col, colIndex) => {
      let id = `${rowIndex}${colIndex}`;
      return <Square id={id} value={col} onChange={squareValueChange} />
    });
  });

  const solve = () => {
    const sudoko = sudokoGame.current;
    const solved = sudoko.solveSudoku(matrix, size);
    if (solved) {
      setResult('solved');
    } else {
      setResult('unsolvable');
    }
    setMatrix([...matrix]);
  };

  const validate = () => {
    const sudoko = sudokoGame.current;
    const cloneMatrix = [...matrix];
    const valid = sudoko.solveSudoku(cloneMatrix, size);
    if (valid) {
      setResult('solved');
    } else {
      setResult('broken');
    }
  };

  const setDifficultyType = (setDifficultyType) => {
    setDifficulty(setDifficultyType);
    setResult('unsolved');
  };

  const clear = () => {
    const sudoko = sudokoGame.current;
    let matrix = sudoko.clear();
    setMatrix([...matrix]);
  }

  return (
    <>
      <div className='container' >
        {squareItems}
      </div>
      <div className='toolbar'>
        <div>
          <span><b>Generate:</b></span>
          <button className='button' onClick={() => setDifficultyType('easy')}>Easy</button>
          <button className='button' onClick={() => setDifficultyType('medium')}>Medium</button>
          <button className='button' onClick={() => setDifficultyType('hard')}>Hard</button>
        </div>
        <div className='right'>
          <span><b>Difficulty:</b></span> <span><b>{difficulty}</b></span>
          <button className='button' onClick={() => clear()}>Clear</button>
        </div>
      </div>
      <div className='resultbar'>
        <span><b>Result: {result}</b></span>
      </div>
      <div className='actionbar' >
        <div>
          <button className='solve' onClick={() => validate()}>Validate</button>
        </div>
        <div className='gap'>
        <button className='solve' onClick={() => solve()}>Solve</button>
        </div>
      </div>
    </>
  );
}

export default Board;
