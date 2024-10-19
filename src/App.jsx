import { useState } from "react"
import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log"
import GameOver from "./components/GameOver"
import { WINNING_COMBINATIONS } from "./winning-combinations"

const PLAYER = {X:'Player 1', O:'Player 2'}
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X'
  if (gameTurns.length > 0 && gameTurns[0].player === 'X')
    currentPlayer = 'O'
  return currentPlayer;
}

function deriveWinner(gameBoard, playerNames) {
  let winner;
  for (const winnng of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[winnng[0].row][winnng[0].column]
    const secondSquareSymbol = gameBoard[winnng[1].row][winnng[1].column]
    const thirdSquareSymbol = gameBoard[winnng[2].row][winnng[2].column]

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && secondSquareSymbol === thirdSquareSymbol) {
      winner = playerNames[firstSquareSymbol];
    }
  }
  return winner;
}

function deriveGameBoard(gameTurns){
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [playerNames, setPlayerNames] = useState({
    X: 'Playre 1',
    O: 'Player 2'
  })
  //const [hasWinner, setHasWinner] = useState(false);
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, playerNames)
  const hasDraw = gameTurns.length === 9 && !winner

  //For Arrays as state, use deep copy to avoid bugs without it the value in the reference get's updated immediately
  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns(prevTurns => {
      const activePlayer = deriveActivePlayer(prevTurns)
      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: activePlayer }, ...prevTurns]
      return updatedTurns;
    });
  }

  function handleRematch() {
    setGameTurns([])
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayerNames(prevPlayerNames => {
      return {
        ...prevPlayerNames, [symbol]: newName
      }
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName={PLAYER.X} symbol="X" isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange}></Player>
          <Player initialName={PLAYER.O} symbol="O" isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange}></Player>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRematch} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns}>Log</Log>
    </main>
  )
}

export default App