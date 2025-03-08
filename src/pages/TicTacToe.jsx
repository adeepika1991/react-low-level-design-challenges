import React, { useState } from 'react'

const checkWinner = (board) => {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6],           // Diagonals
  ];

  // You have a combo and check if all the elements in combo are same (X or O)
  // If yes, return that element... That element is winner
  for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    if (board[a] && board[b] === board[a] && board[c] === board[a]) {
      return board[a];
    }
  }
  return null;
}

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const winner = checkWinner(board);

  const handleClick = (boardIndex) => {
    if (board[boardIndex] || winner) return; // Once a value is set or Winner is detected , it can't be changed
    board[boardIndex] = isXNext ? 'X' : 'O';
    setBoard([...board]);
    setIsXNext(!isXNext);
  }

  function resetGame() {
    setBoard(Array(9).fill(null)); // Clear board
    setIsXNext(true); // Reset turn to X
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">
        {winner ? `Winner: ${winner} 🎉` : `Player ${isXNext ? "X" : "O"}'s turn`}
      </h2>
      <div className="grid grid-cols-3 gap-2">
        {board.map((square, index) => {
          return <Square value={square} key={index} onClick={() => handleClick(index)} />
        })}
      </div>
      <button
        onClick={resetGame}
        className="mt-4 px-4 py-2 bg-blue-500 text-white font-bold rounded shadow"
      >
        Reset Game
      </button>
    </div>
  );
}

const Square = ({ value, onClick }) => {

  return (
    <button className="w-20 h-20 border-2 border-gray-700 text-3xl font-bold bg-white"
      onClick={onClick}>
      {value}
    </button>
  );
}

export default TicTacToe

// Step 1 : Bring a Square
// Step 2 : Render the Square in form of Grid
// Step 3 : Set the board state, player turn state
// Step 4 : Add click handler to set X and O alternatively
// Step 5 : Add checks to make sure if the cell is already occupied no overrites are accepted
// Step 6 : Add custom function to check winning combination
// Step 7 : Add the Winner and Whose turn it is
// Step 8 : Restrict the Player from interacting with board if there's a winner
// Step 9 : Add Reset button that resets board state and player turn state