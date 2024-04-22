import React from 'react';

const Snake = ({ snake }) => {
  return (
    <div>
      {snake.map((segment, index) => (
        <div key={index} style={{ 
          width: '20px', 
          height: '20px', 
          backgroundColor: 'green', 
          position: 'absolute', 
          left: `${segment.x * 20}px`, 
          top: `${segment.y * 20}px` 
        }} />
      ))}
    </div>
  );
};

export default Snake;
