import React from 'react';

const Card = ({ children }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      {children}
    </div>
  );
};

export default Card;
