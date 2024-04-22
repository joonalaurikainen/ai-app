import React, { useState, useEffect, useCallback } from 'react';
import Snake from './Snake';
import Food from './Food';
import Obstacle from './Obstacle';
import '../App.css';
import { Button, Modal } from 'react-bootstrap';

const GameBoard = ({ startGame }) => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [obstacles, setObstacles] = useState([{ x: 15, y: 15 }]); // Muutettu esteiden tilaa arrayksi

  const [direction, setDirection] = useState('RIGHT');
  const [gameOver, setGameOver] = useState(true);
  const [speed, setSpeed] = useState(200);
  const [gridSize] = useState(20);
  const [score, setScore] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const startNewGame = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSpeedSelection = (selectedSpeed) => {
    setSpeed(selectedSpeed);
    setShowModal(false);
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    generateFood();
    setObstacles([{ x: 15, y: 15 }]);
  };

  const generateFood = useCallback(() => {
    const findValidFoodPosition = () => {
      const potentialFood = {
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize)
      };
      if (obstacles.some(obstacle => obstacle.x === potentialFood.x && obstacle.y === potentialFood.y)) {
        return findValidFoodPosition();
      } else {
        return potentialFood;
      }
    };

    const newFood = findValidFoodPosition();
    setFood(newFood);
  }, [gridSize, obstacles]);

  const generateObstacle = useCallback(() => {
    const newObstacle = {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize)
    };
    setObstacles(prevObstacles => [...prevObstacles, newObstacle]); // Lisätään uusi este arrayhin
  }, [gridSize]);

  const handleMovement = useCallback(() => {
    setSnake(prevSnake => {
      const newSnake = [...prevSnake];
      const head = { ...newSnake[0] };

      switch (direction) {
        case 'UP':
          head.y -= 1;
          break;
        case 'DOWN':
          head.y += 1;
          break;
        case 'LEFT':
          head.x -= 1;
          break;
        case 'RIGHT':
          head.x += 1;
          break;
        default:
          break;
      }

      if (newSnake.some((part, index) => index > 0 && part.x === head.x && part.y === head.y)) {
        setGameOver(true);
        return prevSnake;
      }

      if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
        setGameOver(true);
        return prevSnake;
      }

      if (obstacles.some(obstacle => obstacle.x === head.x && obstacle.y === head.y)) {
        setGameOver(true);
        return prevSnake;
      }

      if (head.x === food.x && head.y === food.y) {
        generateFood();
        generateObstacle(); // Lisätään uusi este ruoan syömisen yhteydessä
      } else {
        newSnake.pop();
      }
      newSnake.unshift(head);

      setScore(snake.length - 1, +1)
      return newSnake;
    });
  }, [direction, gridSize, food, obstacles, generateFood, generateObstacle, snake.length]);

  const handleKeyPress = useCallback((e) => {
    switch (e.key) {
      case 'ArrowUp':
        if (direction !== 'DOWN') setDirection('UP');
        break;
      case 'ArrowDown':
        if (direction !== 'UP') setDirection('DOWN');
        break;
      case 'ArrowLeft':
        if (direction !== 'RIGHT') setDirection('LEFT');
        break;
      case 'ArrowRight':
        if (direction !== 'LEFT') setDirection('RIGHT');
        break;
      default:
        break;
    }
  }, [direction]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      handleKeyPress(e);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyPress]);

  useEffect(() => {
    let timeoutId;

    const moveSnake = () => {
      if (gameStarted && !gameOver) {
        handleMovement();
        timeoutId = setTimeout(moveSnake, speed);
      }
    };

    moveSnake();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [gameStarted, gameOver, speed, handleMovement]);

  useEffect(() => {
    if (gameOver) {
      setSnake([{ x: 10, y: 10 }]);
      setFood({ x: 5, y: 5 });
      setDirection('RIGHT');
      setGameStarted(false);
    }
  }, [gameOver]);

  return (
    <>
      <div className="game-board">
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Valitse nopeus:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Button onClick={() => handleSpeedSelection(1000)}>Hidas</Button>
                <div style={{ margin: '8px 0' }}></div>
                <Button onClick={() => handleSpeedSelection(500)}>Normaali</Button>
                <div style={{ margin: '8px 0' }}></div>
                <Button onClick={() => handleSpeedSelection(200)}>Nopea</Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>

        {gameOver ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '6px' }}>
            <Button onClick={startNewGame} variant="primary">Aloita uusi peli</Button>
          </div>
        ) : (
          <>
            <div className="grid-container">
              {[...Array(gridSize)].map((_, row) => (
                <div key={row} className="grid-row">
                  {[...Array(gridSize)].map((_, col) => (
                    <div key={col} className="grid-cell"></div>
                  ))}
                </div>
              ))}
            </div>
            <Snake snake={snake} />
            <Food food={food} />
            {obstacles.map((obstacle, index) => (
              <Obstacle key={index} obstacle={obstacle} />
            ))}
          </>
        )}
      </div>
      <div className="score-container">
        <span className="score">Pisteet: {score}</span>
      </div>
    </>
  );
};

export default GameBoard;
