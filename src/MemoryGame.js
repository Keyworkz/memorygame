import React, { useState, useEffect } from "react";
import "./MemoryGame.css";
 
const animalEmojis = [
  "🐶",
  "🐱",
  "🐭",
  "🐹",
  "🐰",
  "🦊",
  "🐻",
  "🐼",
  "🐨",
  "🐯",
  "🦁",
  "🐮",
  "🐷",
  "🐸",
  "🐵",
  "🐔",
];
 
const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
 
  useEffect(() => {
    initializeGame();
  }, []);
 
  const initializeGame = () => {
    const shuffledCards = shuffle([
      ...animalEmojis.slice(0, 8),
      ...animalEmojis.slice(0, 8),
    ]);
    setCards(
      shuffledCards.map((emoji, index) => ({
        id: index,
        emoji,
        flipped: false,
      }))
    );
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
  };
 
  const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };
 
  const handleCardClick = (card) => {
    if (
      flippedCards.length === 2 ||
      flippedCards.includes(card.id) ||
      matchedCards.includes(card.id)
    )
      return;
 
    const newFlippedCards = [...flippedCards, card.id];
    setFlippedCards(newFlippedCards);
 
    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      const [firstCard, secondCard] = newFlippedCards.map((id) =>
        cards.find((c) => c.id === id)
      );
      if (firstCard.emoji === secondCard.emoji) {
        setMatchedCards([...matchedCards, firstCard.id, secondCard.id]);
        setFlippedCards([]);
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  };
 
  const isGameWon = matchedCards.length === cards.length && cards.length > 0;
 
  return (
    <div className="memory-game">
      <h1>Memory Game</h1>
      <p>Moves: {moves}</p>
      <div className="grid">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`card ${
              flippedCards.includes(card.id) || matchedCards.includes(card.id)
                ? "flipped"
                : ""
            }`}
            onClick={() => handleCardClick(card)}
          >
            <div className="front">{card.emoji}</div>
            <div className="back">❓</div>
          </div>
        ))}
      </div>
      {isGameWon && (
        <div className="win-message">
          <h2>Congratulations! You won the game in {moves} moves!</h2>
          <button onClick={initializeGame}>Play Again</button>
        </div>
      )}
    </div>
  );
};
 
export default MemoryGame;
