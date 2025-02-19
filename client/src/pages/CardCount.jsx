import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { Users, Building, UserCheck, UserX, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const StatCard = ({ icon: Icon, label, value, color, gradient, index, activeIndex, setActiveIndex, onClick }) => {
  const [start, setStart] = useState(false);
  const isActive = index === activeIndex;
  const isVisible = index <= activeIndex;

  useEffect(() => {
    if (isActive) {
      setStart(true);
      setTimeout(() => {
        setActiveIndex(activeIndex + 1);
      }, 2500);
    }
  }, [activeIndex, index, setActiveIndex]);

  return isVisible ? (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: isActive ? 1.1 : 1 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.1 }}
      className={`relative flex flex-col items-center justify-center rounded-2xl ${gradient} p-6 shadow-xl transition-all duration-300 opacity-85 cursor-pointer`}
      onClick={onClick}
    >
      <motion.div>
        <Icon className={`w-14 h-14 ${color}`} />
      </motion.div>
      <p className="text-xl font-semibold text-gray-800 mt-4">{label}</p>
      <div className="flex items-center mt-2">
        <CountUp
          start={start ? 0 : null}
          end={value}
          duration={2}
          separator=","
          className="text-6xl font-extrabold text-gray-900"
        />
        <span className="ml-1 text-3xl font-semibold text-gray-600">+</span>
      </div>
    </motion.div>
  ) : null;
};

const CardCount = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate(); // Use navigate for page routing

  const stats = [
    {
      icon: Building,
      label: "Clients",
      value: 2580,
      color: "text-blue-600",
      gradient: "bg-gray-100",
      onClick: () => navigate("/GoogleMap"), // Navigate to GoogleMap page
    },
    { icon: Users, label: "Employees", value: 14350, color: "text-emerald-600", gradient: "bg-gray-100" },
    { icon: UserCheck, label: "Present Employees", value: 9840, color: "text-violet-600", gradient: "bg-gray-100" },
    { icon: UserX, label: "Absent Employees", value: 145, color: "text-red-600", gradient: "bg-gray-100" },
  ];

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-500 relative">
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute top-6 right-6 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg flex items-center transition-all duration-300"
      >
        <LogOut className="w-5 h-5 mr-2" /> Logout
      </button>

      <div className="container mx-auto px-6 py-20 text-center">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-14">
          <h1 className="text-5xl font-extrabold text-white mb-4">iFace v2 Dashboard Overview</h1>
          <p className="text-lg text-gray-300">Real-time insights into key metrics.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} index={index} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardCount;
