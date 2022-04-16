export default class Sudoku {

  canAddToRow(board, row, num) {
    for(let col = 0; col < board.length; col++)
    {
        if (board[row][col] === num)
        {
            return false;
        }
    }
    return true;
  }
  
  canAddToCol(board, col, num) {
    for(let row = 0; row < board.length; row++)
    {
        if (board[row][col] === num)
        {
            return false;
        }
    }
    return true;
  }
  
  canAddToGrid(board, row, col, num) {
    let sqrt = Math.floor(Math.sqrt(board.length));
    let boxRowStart = row - row % sqrt;
    let boxColStart = col - col % sqrt;
    for(let r = boxRowStart; r < boxRowStart + sqrt; r++)
    {
      for(let d = boxColStart; d < boxColStart + sqrt; d++)
      {
          if (board[r][d] === num)
          {
              return false;
          }
      }
    }
    return true;
  }
  
  canAddNumber(board, row, col, num)
  {
    // see if the number can be added to the row
    if(!this.canAddToRow(board, row, num)) {
      return false;
    }
    
    // see if the number can be added to the row
    if(!this.canAddToCol(board, col, num)) {
      return false;
    }
  
    // see if the number can be added to the row
    if(!this.canAddToGrid(board, row, col, num)) {
      return false;
    }
    
    // number can be added
    return true;
  }
  
  solveSudoku(board, n)
  {
    let row = -1;
    let col = -1;
    let isEmpty = true;
    for(let i = 0; i < n; i++)
    {
        for(let j = 0; j < n; j++)
        {
            if (board[i][j] === 0)
            {
                row = i;
                col = j;
                isEmpty = false;
                break;
            }
        }
        if (!isEmpty)
        {
            break;
        }
    }
  
    // No empty space left
    if (isEmpty)
    {
      return true;
    }
  
    // backtrack row
    for(let num = 1; num <= n; num++)
    {
        if (this.canAddNumber(board, row, col, num))
        {
          board[row][col] = num;
          if (this.solveSudoku(board, n))
          {
            return true;
          }
          else
          {
            board[row][col] = 0;
          }
        }
    }
    return false;
  }

  initializeBoard(data) {
    const rowMap = {
      A: 0,
      B: 1,
      C: 2,
      D: 3,
      E: 4,
      F: 5,
      G: 6,
      H: 7,
      I: 8
    }
    let board = this.clear();
    const puzzle = data.puzzle;
    for(const entry in puzzle) {
      const value = puzzle[entry];
      const row = rowMap[entry[0]];
      const col = parseInt(entry[1]) - 1;
      board[row][col] = parseInt(value);
    }
    return board;
  }

  clear() {
    let board = new Array(9);
    for(let i = 0; i < board.length; i++) {
      board[i] = new Array(9).fill(0);
    }
    return board;
  }

}
