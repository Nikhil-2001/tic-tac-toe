export default function GameBoard({ onSelectSquare, board}) {
    //console.log('Done')

    // const [gameBoard, setGameBoard] = useState(intialGameBoard)

    // //ImportantConcept
    // function handleSelectSquare(rowIndex, colIndex)
    // {
    //     setGameBoard((prevGameBoard) => {
    //         const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
    //         updatedBoard[rowIndex][colIndex] = activePlayerSymbol
    //         return updatedBoard;
    //     })

    //     onSelectSquare();
    // }

    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, colIndex) => (
                        <li key={colIndex}><button onClick= {()=> onSelectSquare(rowIndex, colIndex)} disabled={playerSymbol!==null}>{playerSymbol}</button></li>)
                    )}
                </ol>
            </li>)}
        </ol>)
}