import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import GameBoard from './components/GameBoard';

function App() {
  const [gameStarted, setGameStarted] = useState(false); // Seurataan onko peli jo käynnissä

  const startGame = () => {
    setGameStarted(true); // Asetetaan peli käynnissä olevaksi
  };

  return (
    <>
      <div className='banner'>
        <p>Matopeli</p>
      </div>

      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8}>
            {/* Näytetään pelilauta vain, jos peli on käynnissä */}
            {gameStarted ? (
              <GameBoard startGame={startGame} />
            ) : (
              <div className="container mt-4">
                <div className="card p-4">
                  <div className="card-body text-center">
                    <p className="card-text">Tämä on tekoälyllä tehty matopeli.</p>
                    <p>Pääset peliin painamalla alla olevaa painiketta.</p>
                    <button onClick={startGame} className="btn btn-primary">Matopeli</button>
                  </div>
                </div>
              </div>

            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
