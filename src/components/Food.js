import React from 'react';

const Food = ({ food }) => {
  return (
    <div style={{ 
      width: '20px', 
      height: '20px', 
      backgroundColor: 'red', 
      position: 'absolute', 
      left: `${food.x * 20}px`, 
      top: `${food.y * 20}px` 
    }} />
  );
};

export default Food;
