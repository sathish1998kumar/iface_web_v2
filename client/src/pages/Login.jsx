import  { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const navigate = useNavigate();

  const handleLogin = () => {
    // Static mobile number and OTP for validation (replace with your logic)
    const staticMobileNumber = "1234567890";
    const staticOtp = "123456";

    if (mobileNumber === staticMobileNumber && otp === staticOtp) {
      setErrorMessage(""); // Clear error message on successful login
      sessionStorage.setItem("isLoggedIn", true); // Save login state to sessionStorage
      navigate("/dashboard"); // Navigate to dashboard
    } else {
      setErrorMessage("Invalid Mobile Number or OTP"); // Set error message if validation fails
    }
  };

  return (
    <div className="min-h-[100vh] bg-gray-100 text-gray-900 flex justify-center items-center overflow-hidden">
      <div className="max-w-screen-lg m-0 sm:m-8 bg-white shadow sm:rounded-lg flex justify-between flex-1">
        {/* Background Image Section */}
        <div className="flex-1 bg-green-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/background.svg')", // Background image reference
            }}
          ></div>
        </div>

        {/* Login Form Section */}
        <div className="lg:w-1/3 xl:w-4/12 p-4 sm:p-8 flex flex-col justify-center items-center">
          {/* Logo */}
          <div>
            <img
              src="/iface_v.2.png" // Local image reference
              alt="Logo"
              className="w-3/4 mx-auto mb-4"
            />
          </div>

          {/* Login Heading */}
          <h1 className="text-xl font-semibold text-center text-gray-800 mb-4">
            Login to Your Account
          </h1>

          <div className="mt-4 flex flex-col items-center w-full">
            <div className="w-full flex-1 mt-4">
              {/* Mobile Number and OTP Inputs */}
              <div className="mx-auto max-w-xs">
                <input
                  className="w-full px-6 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-base focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="Mobile Number"
                />
                <input
                  className="w-full px-6 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-base focus:outline-none focus:border-gray-400 focus:bg-white mt-4"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="OTP"
                />
              </div>

              {/* Show error message if login fails */}
              {errorMessage && (
                <div className="mt-3 text-red-500 text-center">
                  <p>{errorMessage}</p>
                </div>
              )}

              {/* Sign In Button */}
              <button
                onClick={handleLogin}
                className="mx-auto max-w-xs mt-4 tracking-wide font-semibold bg-green-400 text-white w-full py-3 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none text-base"
              >
                <span className="ml-3">Sign In</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
