import React, { useState } from 'react'
import './App.css'
import Square from './Square'

const renderFrom = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

const App = () => {

  const [gameState, setGameState] = useState(renderFrom);
  const [currentPlayer, setCurrentPlayer] = useState('cross');
  const [finishedState, setFinishedState] = useState(false);

  return (
    <div className='main-div'>
      <div>
        <h1>Tic Tac Toe</h1>
      </div>
      <div className='move-detection'>
        <div className='left'>You</div>
        <div className='right'>Opponent</div>
      </div>
      <div>
        <div className='square-wrapper'>
          {gameState && gameState.map((arr, rowIndex) => 
              arr.map((e, colIndex) => {
                return (<Square
                  setFinishedState={setFinishedState}
                  finishedState={finishedState}
                  currentPlayer={currentPlayer}
                  setCurrentPlayer={setCurrentPlayer}
                  setGameState={setGameState}
                  id={rowIndex * 3 + colIndex}
                  key={rowIndex * 3 + colIndex} />
                );
              })
            )
          }
        </div>
      </div>
    </div>
  )
}

export default App