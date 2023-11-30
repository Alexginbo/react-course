import { useState } from 'react'
import './App.css'
import confetti from "canvas-confetti"

const TURNS = {
  X: 'x',
  O: 'o'
}


const Square = ({
  children,
  isSelected, /*que va a haber dentro del cuadrado*/
  updateBoard, /*Un método para actualizar el cuadrado* */
  index /*El index del cuadrado* */
}) => {
  const classname = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(index)
  }

  return(
    <div onClick={handleClick} className={classname}>
      {children}
    </div>
  )
}
/*Hay que meterlo dentro de la APP porque cuando se haga un click en un square
vamos a tener que actualizar el Board para volver a renderizarlo* */

/*Un estado es un valor, que cada vez que cambie va a volver a renderizar el componente* */
/*Para crear un estado tenemos que utilizar el hook useState()*/
/*Un estado cuenta con 2 partes, el estado inicial del elemento y una forma/función para actualizar
el elemento* */
/*Vamos a necesitar un estado que nos indique de quien es el turno* */
/*El spread operator ... sirve para copiar un array en otra variable* */
/*Hay que entender a la perfección el rest y el spread operator* */
/*Los estados son inmutables, para cambiarlos hay que hacerlo con una nueva
variable y actualizarlos con su setX, porque si lo que haces es cambiar directamente
el estado puede haber problemas de renderizado*/

const WINNER_COMBOS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

function App() {
  //Los useState tienen que estar siempre en el cuerpo del componente, no pueden estar ni dentro
  //de un if ni de un bucle ni nada...
  //pero le podemos pasar a nuestro useState una función como estado inicial
  const [board, setBoard] = useState(() => {
    //Es importante sacar el localStorage de aquí porque es una operación lenta y aquí se está
    //accediendo cada vez que se renderiza el board (cada vez que se actualiza)
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : 
    Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ? JSON.parse(turnFromStorage) : TURNS.X
  })
  const [winner, setWinner] = useState(null) //null hay ganador, false un empate

  const checkWinner = (boardToCheck) => {
    for(const combo of WINNER_COMBOS) {
      const [a,b,c] = combo
      if (boardToCheck[a] && boardToCheck[a] === boardToCheck[b] &&
          boardToCheck[a] === boardToCheck[c]) {
            return boardToCheck[a]
          }
    }
  }

  const checkEndGame = (boardToCheck) => {
    /*Si todas las posiciones del array boardToCheck son diferentes a null return true si no return false*/
    return boardToCheck.every((square) => square !== null)
  }
  
  const updateBoard = (index) => {
    /*Lo primero es cambiar el turno* */
    /*Necesitamos actualizar la situación del tablero y poner x/o donde se haya hecho
    click* */
    if(board[index] || winner) return
    const newBoard = [... board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    //guardar aquí partida (guardamos el estado del tablero)
    //localStorage llama directamente a toString(), por lo tanto si queremos guardar otros datos...
    //nos guarda el item como un String en el localStorage, pero en formato JSON y después podemos
    //volverlo a pasar a "objeto" porque recuperamos el String en formato JSONdd
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', JSON.stringify(newTurn))
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner) //la actualización del estado es asíncrona
      //alert(`El ganador es ${newWinner}`)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className='game'>
        {
          /*Ver que hace la función map(), el tag key y la _ como parámetro*/
          board.map((square, index) => {
            return (
              <Square 
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
        {
          winner !== null && (
            <section className='winner'>
              <div className='text'>
                <h2>
                  {
                    winner === false
                    ? 'Empate'
                    : 'Victoria'
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
