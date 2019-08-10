import React from "react";

function Board() {
  const [square, setSquares] = React.useState(Array(9).fill(null));
  let status;
  const nextTurn = findNextTurn(square);
  const winner = checkWinner(square);

  //Deciding the status of the game.
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (square.every(Boolean)) {
    status = `Scratch: Cat's game`;
  } else {
    status = `Next player: ${nextTurn}`;
  }

  /*
    This method will count next player turn
    if it is X or O, be default here it is 'X';
  */
  function findNextTurn(square) {
    const XSquareCount = square.filter(r => r === "X").length;
    const OSquareCount = square.filter(r => r === "O").length;
    return OSquareCount === XSquareCount ? "X" : "O";
  }

  /**
   * This method compare the box values
   * aaccording to given value per box
   * with various combinations as you
   * can see in line array.
   * In TicTocToe game , if any value
   * X || O continously score 3 box then
   * it will be winner.
   * @param {*} square
   */
  function checkWinner(square) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
      let [a, b, c] = lines[i];
      if (square[a] && square[a] === square[b] && square[b] === square[c]) {
        return square[a];
      }
    }

    return null;
  }

  function selectSquare(squareIndex) {
    if (winner || square[squareIndex]) {
      return;
    }

    const SquareData = [...square];
    SquareData[squareIndex] = nextTurn;
    setSquares(SquareData);
  }

  //Rendering boxes shape button on whom click
  //we will call selectSquare with button index.
  function squareBox(i) {
    return (
      <button onClick={() => selectSquare(i)} className="square">
        {square[i]}
      </button>
    );
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {squareBox(0)}
        {squareBox(1)}
        {squareBox(2)}
      </div>
      <div className="board-row">
        {squareBox(3)}
        {squareBox(4)}
        {squareBox(5)}
      </div>
      <div className="board-row">
        {squareBox(6)}
        {squareBox(7)}
        {squareBox(8)}
      </div>
    </div>
  );
}

function TicToc() {
  return (
    <div className="tictoc">
      <div className="tictoc-board" />
      <Board />
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <TicToc />
    </div>
  );
}

export default App;
