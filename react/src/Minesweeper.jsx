import { useState } from 'react';

function Minesweeper() {
  const [board, setBoard] = useState(Array(25).fill(null).map(() => Math.random() > 0.8));
  const [revealed, setRevealed] = useState(Array(25).fill(false));
  const [gameOver, setGameOver] = useState(false);

  const handleClick = (index) => {
    if (gameOver) return;
    const newRevealed = [...revealed];
    newRevealed[index] = true;
    setRevealed(newRevealed);
    
    if (board[index]) {
      alert("Vesztettél.");
      setGameOver(true);
    }
  };

  return (
    <div>
      <h2>Aknakereső</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 40px)', gap: '5px' }}>
        {board.map((isMine, i) => (
          <button key={i} onClick={() => handleClick(i)} style={{ width: '40px', height: '40px' }}>
            {revealed[i] ? (isMine ? '💣' : 'O') : '?'}
          </button>
        ))}
      </div>
    </div>
  );
}
export default Minesweeper;