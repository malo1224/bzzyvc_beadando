import { useState } from 'react';

const icons = ['🍎', '🍌', '🍇', '🍓'];
const initialCards = [...icons, ...icons]
  .sort(() => Math.random() - 0.7)
  .map((icon, index) => ({ id: index, icon, isFlipped: false, isMatched: false }));

function MemoryGame() {
  const [cards, setCards] = useState(initialCards);
  const [flippedIndices, setFlippedIndices] = useState([]);

  const handleFlip = (index) => {
    if (cards[index].isFlipped || cards[index].isMatched || flippedIndices.length === 2) {
      return;
    }
    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);
    if (newFlippedIndices.length === 2) {
      const [first, second] = newFlippedIndices;
      
      if (newCards[first].icon === newCards[second].icon) {
        newCards[first].isMatched = true;
        newCards[second].isMatched = true;
        setCards(newCards);
        setFlippedIndices([]);
      } else {
        
        setTimeout(() => {
          newCards[first].isFlipped = false;
          newCards[second].isFlipped = false;
          setCards([...newCards]);
          setFlippedIndices([]);
        }, 500);
      }
    }
  };

  return (
    <div>
      <h2>Párkereső</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 60px)', gap: '10px' }}>
        {cards.map((card, i) => (
          <button 
            key={card.id} 
            onClick={() => handleFlip(i)} 
            style={{ height: '60px', fontSize: '24px', backgroundColor: card.isMatched ? 'lightgreen' : 'white' }}
          >
            {card.isFlipped || card.isMatched ? card.icon : '❓'}
          </button>
        ))}
      </div>
    </div>
  );
}
export default MemoryGame;  