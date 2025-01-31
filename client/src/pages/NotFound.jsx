import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  // Navigate to Home
  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 text-white overflow-hidden">
      <div className="text-center animate-fade-in-up">
        <h1 className="text-9xl font-bold text-white animate-bounce">
          404
        </h1>
        <h2 className="mt-4 text-4xl font-semibold text-white animate-fade-in">
          Page Not Found
        </h2>
        <p className="mt-2 text-xl text-gray-100 max-w-md mx-auto animate-fade-in">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={goToHome}
          className="mt-8 px-8 py-3 bg-white text-purple-600 font-bold text-lg rounded-full shadow-lg hover:bg-opacity-90 transition duration-300 animate-pulse"
        >
          Go Back to Home
        </button>
      </div>
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-white rounded-full animate-float"
          style={{
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 3 + 2}s`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
};

export default NotFound;