import { useState } from 'react'
import './App.css'
import Minesweeper from './src/Minesweeper.jsx';
import MemoryGame from './src/MemoryGame.jsx';

function App() {
  const  [isMineSweeper, setIsMineSweeper] = useState(true);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Játékközpont</h1>
      <nav>
        <button onClick={() => setIsMineSweeper(true)}>Aknakereső</button>
        <button onClick={() => setIsMineSweeper(false)}>Párkereső</button>
      </nav>
      <hr />
      {isMineSweeper ? <Minesweeper /> : <MemoryGame />}
    </div>
  );
}

export default App
