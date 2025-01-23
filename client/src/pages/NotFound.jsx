import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  // Navigate to Home
  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-300 via-purple-300 to-indigo-400 text-gray-800">
      <h1 className="text-9xl font-bold text-white drop-shadow-lg">404</h1>
      <h2 className="mt-4 text-3xl md:text-4xl font-semibold text-white">Page Not Found</h2>
      <p className="mt-2 text-lg md:text-xl text-gray-100">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <button
        onClick={goToHome}
        className="mt-6 px-6 py-3 bg-blue-500 text-white font-medium text-lg rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
      >
        Go Back to Home
      </button>
    </div>
  );
};

export default NotFound;
