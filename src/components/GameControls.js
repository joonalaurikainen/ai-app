import React from 'react';
import { Button } from 'react-bootstrap';

const GameControls = ({ startNewGame }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '6px' }}>
            <Button onClick={startNewGame} variant="primary">Aloita uusi peli</Button>
        </div>
    );
};

export default GameControls;
