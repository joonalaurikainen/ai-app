// GameModal.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const GameModal = ({ showModal, handleCloseModal, handleSpeedSelection }) => {
  return (
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
  );
};

export default GameModal;
