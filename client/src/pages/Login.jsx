import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPhoneAlt, FaKey } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";

const schema = z.object({
  mobileNumber: z.string()
    .regex(/^\d{10}$/, "Mobile number must be exactly 10 digits")
    .nonempty("Mobile number is required"),
  otp: z.string()
    .regex(/^\d{6}$/, "OTP must be exactly 6 digits")
    .optional(),
});

const FloatingPaths = ({ position }) => {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position
      } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position
      } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position
      } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    color: `rgba(0, 0, 0, ${0.1 + i * 0.03})`, // Black color with varying opacity
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
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
  );
};

const Login = () => {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn")) {
      navigate("/CardCount");
    }
  }, [navigate]);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const handleSendOtp = (data) => {
    setIsOtpSent(true);
    toast.success("OTP sent successfully!", { position: "top-right", autoClose: 2000 });
  };

  const handleLogin = (data) => {
    if (data.otp === "123456") {
      localStorage.setItem("isLoggedIn", "true");
      toast.success("Login successful!", { position: "top-right", autoClose: 2000 });
      setTimeout(() => navigate("/CardCount"), 2000);
    } else {
      toast.error("Invalid OTP!", { position: "top-right", autoClose: 2000 });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-gray-900 flex justify-center items-center overflow-hidden relative">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <ToastContainer />
<div className="max-w-screen-lg m-0 sm:m-8 bg-white/80 shadow-lg sm:rounded-xl flex flex-col lg:flex-row justify-between flex-1 transform transition-all duration-500 hover:scale-105 rounded-[50px] relative z-10">
        <div className="flex-1 bg-green-100 text-center hidden lg:flex rounded-[20px] overflow-hidden">
          <div className="m-12 xl:m-1 w-full bg-contain bg-center bg-no-repeat" style={{ backgroundImage: "url('/background.svg')" }}></div>
        </div> 
        <div className="lg:w-1/2 xl:w-5/12 p-4 sm:p-8 flex flex-col justify-center items-center">
          <div className="mb-4">
            <img src="/iface_v.2.png" alt="Logo" className="w-29 h-28 object-contain" />
          </div>

          <h1 className="text-xl font-semibold text-center text-gray-800 mb-4 transition-all duration-300 hover:text-green-500">
            Login to Your Account
          </h1>

          <form onSubmit={handleSubmit(isOtpSent ? handleLogin : handleSendOtp)} className="w-full flex flex-col items-center">
            <div className="w-full flex-1 mt-4">
              <div className="relative mb-4">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  <FaPhoneAlt />
                </span>
                <input
                  {...register("mobileNumber")}
                  className="w-full pl-10 pr-4 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-base focus:outline-none focus:border-gray-400"
                  type="text"
                  placeholder="Mobile Number"
                />
                <p className="text-red-500">{errors.mobileNumber?.message}</p>
              </div>

              {isOtpSent && (
                <div className="relative mb-4">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <FaKey />
                  </span>
                  <input
                    {...register("otp")}
                    className="w-full pl-10 pr-4 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-base focus:outline-none focus:border-gray-400"
                    type="text"
                    placeholder="OTP"
                  />
                  <p className="text-red-500 text-sm mt-1">{errors.otp?.message}</p>
                </div>
              )}

              <button
                type="submit"
                className="mx-auto max-w-lg mt-4 tracking-wide font-semibold bg-green-400 text-white w-full py-3 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none text-base transform hover:scale-105"
              >
                {isOtpSent ? "Login" : "Send OTP"}
              </button>
            </div>
          </form>

          <div className="mt-4 text-center text-sm text-gray-600">
            <p>
              By logging in, you agree to our {" "}
              <a href="/terms" className="text-green-500 hover:underline" target="_blank" rel="noopener noreferrer">
                Terms and Conditions
              </a>{" "}
              and {" "}
              <a href="/privacy" className="text-green-500 hover:underline" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;