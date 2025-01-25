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
    // Clear session storage or authentication tokens
    localStorage.removeItem("authToken"); // Example: Clear token from local storage
    sessionStorage.clear(); // Clear session storage if used

    // Redirect to login page
    navigate("/login"); // Adjust the path as needed
  };
  const locations = [
    { name: 'Hosur Corporation', total: 0, present: 0, icon: <FaCity /> },
    { name: 'GPS', total: 11, present: 0, icon: <FaMapMarkerAlt /> },
    { name: 'TIRUVANNAMALAI LD', total: 0, present: 0, icon: <FaMapMarkerAlt /> },
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
    <div className="min-h-[100vh] bg-gradient-to-r from-green-300 via-blue-200 to-purple-300 text-gray-800 flex flex-col justify-start items-center p-6 animate-gradient">
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute top-6 right-6 p-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-all duration-300 transform hover:scale-110"
      >
        <FaSignOutAlt className="text-2xl" />
      </button>

      <div className="flex flex-col items-center mb-8">
        {/* Dashboard Icon */}
        <div className="text-5xl text-blue-600 mb-4">
          <FaUsers />
        </div>
        <h1 className="text-3xl md:text-4xl font-semibold text-center text-gray-900">
          Attendance - Live Dashboard
        </h1>
        <p className="text-sm md:text-base text-gray-600">
          Monitor attendance records in real time.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {locations.map((location, index) => {
          const percentage =
            location.total === 0 ? 0 : ((location.present / location.total) * 100).toFixed(2);
          return (
            <div
              key={index}
              className="bg-white text-gray-800 rounded-lg shadow-xl hover:shadow-2xl transform transition-transform hover:scale-105 p-6 cursor-pointer hover:bg-indigo-100 duration-300"
              onClick={location.name === 'ERODE CORPORATION' ? handleErodeClick : null}
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="text-4xl text-indigo-500">{location.icon}</div>
                <div>
                  <h2 className="text-xl font-semibold">{location.name}</h2>
                  <p className="text-sm text-gray-500">{`Location Code: ${index + 1}`}</p>
                </div>
              </div>
              <div className="text-sm text-gray-600 space-y-2">
                <p>Total: <span className="font-semibold">{location.total}</span></p>
                <p>Present: <span className="font-semibold">{location.present}</span></p>
                <p>Percentage: <span className="font-semibold">{percentage}%</span></p>
              </div>
              {location.name === 'ERODE CORPORATION' && (
                <p className="mt-4 text-indigo-500 text-sm font-medium">
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
