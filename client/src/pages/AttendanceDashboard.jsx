import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { FaCity, FaMapMarkerAlt, FaCheckCircle, FaUsers, FaSignOutAlt } from 'react-icons/fa'; // Import FontAwesome icons

const AttendanceDashboard = () => {
  const navigate = useNavigate(); // Initialize navigate function

  // Handle the click on "Erode" to navigate to Dashboard
  const handleErodeClick = () => {
    navigate('/dashboard'); // Navigate to Dashboard page
  };

  // Handle logout action
  const handleLogout = () => {
    navigate('/'); // Redirect to the login page (adjust path as necessary)
  };

  const locations = [
    { name: 'Hosur Corporation', total: 0, present: 0, icon: <FaCity /> },
    { name: 'GPS', total: 11, present: 0, icon: <FaMapMarkerAlt /> },
    { name: 'LD TIRUVANNAMALAI', total: 0, present: 0, icon: <FaMapMarkerAlt /> },
    { name: 'RTS', total: 86, present: 0, icon: <FaCheckCircle /> },
    { name: 'Avadi', total: 0, present: 0, icon: <FaCity /> },
    { name: 'Avadi Corporation', total: 0, present: 0, icon: <FaCity /> },
    { name: 'App test accounts', total: 2, present: 0, icon: <FaCheckCircle /> },
    { name: 'NPSWAMI', total: 12, present: 0, icon: <FaCity /> },
    { name: 'SWM Kovilpatti', total: 0, present: 0, icon: <FaMapMarkerAlt /> },
    { name: 'Thoothukudi', total: 0, present: 0, icon: <FaMapMarkerAlt /> },
    { name: 'CITY CLEAN CUDDALORE', total: 0, present: 0, icon: <FaCity /> },
    { name: 'ERODE CORPORATION', total: 0, present: 0, icon: <FaCity /> },
    { name: 'HCMC DBC', total: 0, present: 0, icon: <FaCheckCircle /> },
  ];

  return (
    <div className="min-h-[100vh] bg-gradient-to-r from-green-300 via-blue-200 to-purple-300 text-gray-900 flex flex-col justify-start items-center p-6">
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300 shadow-lg"
      >
        <FaSignOutAlt className="text-2xl" />
      </button>

      <div className="flex flex-col items-center mb-8">
        {/* Dashboard Icon */}
        <div className="text-6xl text-green-600 mb-4">
          <FaUsers />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-center">
          Attendance - Live Dashboard
        </h1>
        <p className="text-sm md:text-base text-gray-700">
          Monitor attendance records in real time.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-6xl">
        {locations.map((location, index) => {
          const percentage =
            location.total === 0 ? 0 : ((location.present / location.total) * 100).toFixed(2);
          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transform transition-transform hover:scale-105 p-4 cursor-pointer"
              onClick={location.name === 'ERODE CORPORATION' ? handleErodeClick : null}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="text-3xl text-blue-500">{location.icon}</div>
                <h2 className="text-lg font-bold">{location.name}</h2>
              </div>
              <div className="text-sm">
                <p>Total: <span className="font-bold">{location.total}</span></p>
                <p>Present: <span className="font-bold">{location.present}</span></p>
                <p>Percentage: <span className="font-bold">{percentage}%</span></p>
              </div>
              {location.name === 'ERODE CORPORATION' && (
                <p className="mt-2 text-blue-500 text-sm">
                  Click to view more
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AttendanceDashboard;
