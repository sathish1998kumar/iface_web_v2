import { useState, useEffect } from "react"
import CountUp from "react-countup"
import { motion } from "framer-motion"
import { Users, Building, UserCheck, UserX, LogOut } from "lucide-react"
import { useNavigate } from "react-router-dom"

const StatCard = ({ icon: Icon, label, value, color, gradient, index, activeIndex, setActiveIndex, onClick }) => {
  const [start, setStart] = useState(false)
  const isActive = index === activeIndex
  const isVisible = index <= activeIndex

  useEffect(() => {
    if (isActive) {
      setStart(true)
      setTimeout(() => {
        setActiveIndex(activeIndex + 1)
      }, 2500)
    }
  }, [activeIndex, index, setActiveIndex])

  return isVisible ? (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: isActive ? 1.05 : 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
      className={`relative flex flex-col items-center justify-center rounded-xl ${gradient} p-5 shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer`}
      onClick={onClick}
    >
      <div
        className={`flex items-center justify-center w-12 h-12 rounded-full bg-opacity-20 ${color.replace("text-", "bg-")} mb-3`}
      >
        <Icon className={`w-6 h-6 ${color}`} strokeWidth={2} />
      </div>
      <p className="text-base font-semibold text-gray-700 mb-1">{label}</p>
      <div className="flex items-baseline">
        <CountUp
          start={start ? 0 : null}
          end={value}
          duration={2}
          separator=","
          className="text-4xl font-bold text-gray-900"
        />
        <span className="ml-1 text-xl font-medium text-gray-600">+</span>
      </div>
    </motion.div>
  ) : null
}

const FloatingPaths = ({ position }) => {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position
      } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position
      } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position
      } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    color: `rgba(15,23,42,${0.1 + i * 0.03})`,
    width: 0.5 + i * 0.03,
  }))

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg className="w-full h-full text-slate-950 dark:text-white" viewBox="0 0 696 316" fill="none">
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.1 + path.id * 0.03}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  )
}

const CardCount = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const navigate = useNavigate()

  const stats = [
    {
      icon: Building,
      label: "Clients",
      value: 2580,
      color: "text-blue-600",
      gradient: "bg-white",
      onClick: () => navigate("/GoogleMap"),
    },
    {
      icon: Users,
      label: "Total Employees",
      value: 14350,
      color: "text-emerald-600",
      gradient: "bg-white",
    },
    {
      icon: UserCheck,
      label: "Present Employees",
      value: 9840,
      color: "text-violet-600",
      gradient: "bg-white",
    },
    {
      icon: UserX,
      label: "Absent Employees",
      value: 145,
      color: "text-red-600",
      gradient: "bg-white",
    },
  ]

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    window.location.href = "/"
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-gray-900 relative">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white font-medium py-1.5 px-3 rounded-lg flex items-center transition-all duration-300 z-10 text-sm"
      >
        <LogOut className="w-4 h-4 mr-1.5" /> Logout
      </button>

      <div className="container mx-auto px-4 py-16 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h1 className="text-4xl font-bold text-white mb-3">iFace v2 Dashboard Overview</h1>
          <p className="text-base text-gray-300">Real-time insights into key metrics.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} index={index} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CardCount