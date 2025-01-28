import { useNavigate } from "react-router-dom"
import {
  FaCity,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaUsers,
  FaSignOutAlt,
  FaUserCheck,
  FaUserTimes,
  FaPercent,
} from "react-icons/fa"

const AttendanceDashboard = () => {
  const navigate = useNavigate()

  const handleErodeClick = () => {
    navigate("/dashboard")
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    sessionStorage.clear()
    navigate("/login")
  }

  const locations = [
    { name: "Hosur Corporation", total: 100, present: 85, icon: <FaCity />, gradient: "from-blue-400 to-blue-600" },
    { name: "GPS", total: 11, present: 9, icon: <FaMapMarkerAlt />, gradient: "from-green-400 to-green-600" },
    { name: "TIRUVANNAMALAI LD", total: 50, present: 42, icon: <FaMapMarkerAlt />, gradient: "from-yellow-400 to-yellow-600" },
    { name: "RTS", total: 86, present: 80, icon: <FaCheckCircle />, gradient: "from-red-400 to-red-600" },
    { name: "Avadi", total: 75, present: 70, icon: <FaCity />, gradient: "from-purple-400 to-purple-600" },
    { name: "Avadi Corporation", total: 120, present: 110, icon: <FaCity />, gradient: "from-indigo-400 to-indigo-600" },
    { name: "App test accounts", total: 2, present: 2, icon: <FaCheckCircle />, gradient: "from-pink-400 to-pink-600" },
    { name: "NPSWAMI", total: 12, present: 10, icon: <FaCity />, gradient: "from-teal-400 to-teal-600" },
    { name: "SWM Kovilpatti", total: 60, present: 55, icon: <FaMapMarkerAlt />, gradient: "from-orange-400 to-orange-600" },
    { name: "Thoothukudi", total: 90, present: 82, icon: <FaMapMarkerAlt />, gradient: "from-cyan-400 to-cyan-600" },
    { name: "CITY CLEAN CUDDALORE", total: 70, present: 65, icon: <FaCity />, gradient: "from-lime-400 to-lime-600" },
    { name: "ERODE CORPORATION", total: 150, present: 140, icon: <FaCity />, gradient: "from-emerald-400 to-emerald-600" },
    { name: "HCMC DBC", total: 40, present: 38, icon: <FaCheckCircle />, gradient: "from-sky-400 to-sky-600" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 text-gray-800 flex flex-col justify-start items-center p-6 space-y-8 relative overflow-hidden">
      {/* Background SVG Pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 20v-1.41l2.83-2.83 1.41 1.41L1.41 20H0zm20 0v-1.41l2.83-2.83 1.41 1.41L21.41 20H20zM0 0v1.41l2.83 2.83-1.41 1.41L0 3.41V0h1.41l2.83 2.83-1.41 1.41L0 1.41V0h20v1.41l-2.83 2.83 1.41 1.41L21.41 0H20zm0 11.41V10h1.41l2.83 2.83-1.41 1.41L0 11.41zm0 20v-1.41l2.83-2.83 1.41 1.41L1.41 31.41 0 31.41v-1.41zM10 40v-1.41l2.83-2.83 1.41 1.41-2.83 2.83H10zM20 40v-1.41l2.83-2.83 1.41 1.41-2.83 2.83H20zm10 0v-1.41l2.83-2.83 1.41 1.41-2.83 2.83H30zm10 0v-1.41l2.83-2.83 1.41 1.41-2.83 2.83H40z" fill="#4f46e5" fillOpacity="0.2"/>
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern)"/>
        </svg>
      </div>

      {/* Animated Gradient Orbs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <button
        onClick={handleLogout}
        className="absolute top-6 right-6 p-3 bg-white text-gray-700 rounded-full shadow-lg hover:bg-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 z-10"
      >
        <FaSignOutAlt className="text-2xl" />
      </button>

      <div className="flex flex-col items-center mb-12 space-y-4 z-10">
        <div className="text-6xl text-indigo-600 mb-4 animate-bounce">
          <FaUsers />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 tracking-tight">
          Attendance Dashboard
        </h1>
        <p className="text-lg md:text-xl text-gray-600 text-center max-w-2xl">
          Real-time attendance monitoring across multiple locations.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full max-w-7xl z-10">
        {locations.map((location, index) => {
          const percentage = location.total === 0 ? 0 : ((location.present / location.total) * 100).toFixed(2)
          const absent = location.total - location.present
          return (
            <div
              key={index}
              className={`bg-gradient-to-br ${location.gradient} text-white rounded-2xl shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:scale-105 p-6 cursor-pointer overflow-hidden group backdrop-filter backdrop-blur-lg bg-opacity-80`}
              onClick={location.name === "ERODE CORPORATION" ? handleErodeClick : undefined}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-4xl bg-white bg-opacity-20 p-3 rounded-full">{location.icon}</div>
                <p className="text-sm opacity-75 font-medium">{`Code: ${index + 1}`}</p>
              </div>
              <h2 className="text-xl font-bold mb-4 truncate">{location.name}</h2>
              <div className="grid grid-cols-3 gap-2 text-sm mb-4">
                <div className="flex flex-col items-center bg-white bg-opacity-20 rounded-lg p-2">
                  <FaUsers className="text-xl mb-1" />
                  <p className="font-semibold">{location.total}</p>
                  <p className="text-xs opacity-75">Total</p>
                </div>
                <div className="flex flex-col items-center bg-white bg-opacity-20 rounded-lg p-2">
                  <FaUserCheck className="text-xl mb-1" />
                  <p className="font-semibold">{location.present}</p>
                  <p className="text-xs opacity-75">Present</p>
                </div>
                <div className="flex flex-col items-center bg-white bg-opacity-20 rounded-lg p-2">
                  <FaUserTimes className="text-xl mb-1" />
                  <p className="font-semibold">{absent}</p>
                  <p className="text-xs opacity-75">Absent</p>
                </div>
              </div>
              <div className="flex items-center justify-center bg-white bg-opacity-20 rounded-lg p-2">
                <FaPercent className="text-xl mr-2" />
                <p className="font-bold text-2xl">{percentage}%</p>
                <p className="text-xs ml-2 opacity-75">Attendance</p>
              </div>
              {location.name === "ERODE CORPORATION" && (
                <div className="mt-4 flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-sm font-medium">View more</p>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AttendanceDashboard
