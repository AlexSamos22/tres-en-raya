import './index.css'
import { useState } from 'react'

const TRUNS = {
  X: 'X',
  O: 'O'
}

const Square = ({children, isSelected, updateBoard, index}) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(index)
  }

  return(
    <div onClick={handleClick} className= {className}>
        {children}
    </div>
  )
}

const winnerCombos = [
  [0,1,2], [3,4,5], [6,7,8], // Horizontal
  [0,3,6], [1,4,7], [2,5,8], // Vertical
  [0,4,8], [2,4,6] // Diagonal
]

function App() {

  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TRUNS.X)
  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) => {
    for (const combo of winnerCombos) {
      const [a, b, c] = combo
      if(boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]){
        return boardToCheck[a]
      }
    }
    return null
  }

  const checkEndGame = (boardToCheck) => {
    return boardToCheck.every((square) => square !== null)
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TRUNS.X)
    setWinner(null)
  }

  const updateBoard = (index) => {
    if(board[index] !== null || winner) return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    const newTurn = turn === TRUNS.X ? TRUNS.O : TRUNS.X
    setTurn(newTurn)
    const newWinner = checkWinner(newBoard)
    if(newWinner){
      setWinner(newWinner)
    }else if(checkEndGame(newBoard)){
      setWinner(false)
    }
  }

  return (
    <main className='board'>
      <h1>Tres en raya</h1>
      <button onClick={resetGame}>Resetear el Juego</button>
      <section className='game'>
        {
          board.map((cell, index) => {
            return (
              <Square key={index} index={index} updateBoard={updateBoard}>
                {board[index]}
              </Square>
            )
          })
        }        
      </section>
      <section className='turn'>
        <Square isSelected={turn == TRUNS.X }>{TRUNS.X}</Square>
        <Square isSelected={turn == TRUNS.O }>{TRUNS.O}</Square>
      </section>

      {
        winner !== null && (
          <section className='winner'>
            <div className='text'>
              <h2>
                {
                  winner === false ? 'Empate' : `Ganador:`
                }
              </h2>
              <header className='win'>
                {winner && <Square>{winner}</Square>}
              </header>
              <footer>
                <button onClick={resetGame}>Empezar de nuevo</button>
              </footer>
            </div>
          </section>
        )
      }
    </main>
    
  )
}

export default App
