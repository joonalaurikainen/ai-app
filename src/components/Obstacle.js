import React from 'react';

const Obstacle = ({ obstacle }) => {
  return (
    <div style={{
      width: '20px',
      height: '20px',
      backgroundColor: 'black',
      position: 'absolute',
      left: `${obstacle.x * 20}px`,
      top: `${obstacle.y * 20}px`
    }} />
  );
};

export default Obstacle
