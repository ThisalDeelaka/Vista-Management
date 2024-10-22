import React from 'react';

const Button = ({ children, onClick, type = 'button', variant = 'primary' }) => {
  const baseStyles = "px-8 py-4 rounded-full shadow-lg transition-all duration-300 font-semibold transform hover:scale-105 focus:outline-none";
  
  const variantStyles = {
    primary: "bg-gradient-to-r from-teal-500 to-teal-700 text-white hover:from-teal-600 hover:to-teal-800",
    secondary: "bg-white text-gray-800 hover:bg-gray-100 border border-gray-300 shadow-md hover:shadow-xl",
    outline: "border-2 border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white",
    danger: "bg-red-500 text-white hover:bg-red-600"
  };

  return (
    <button 
      onClick={onClick} 
      type={type} 
      className={`${baseStyles} ${variantStyles[variant] || variantStyles.primary}`}
    >
      {children}
    </button>
  );
};

export default Button;
