import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { FaPhoneAlt, FaKey } from "react-icons/fa"; // React Icons for input fields

const Login = () => {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    mobileNumber: Yup.string()
      .required("Mobile Number is required")
      .matches(/^[0-9]{10}$/, "Mobile Number must be 10 digits"),
    otp: isOtpSent
      ? Yup.string()
          .required("OTP is required")
          .matches(/^[0-9]{6}$/, "OTP must be 6 digits")
      : Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      mobileNumber: "",
      otp: "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (!isOtpSent) {
        handleSendOtp(values.mobileNumber);
      } else {
        handleLogin(values.otp);
      }
    },
  });

  const handleSendOtp = (mobileNumber) => {
    if (mobileNumber === "1234567890") {
      setErrorMessage("");
      setIsOtpSent(true);
    } else {
      setErrorMessage("Invalid Mobile Number");
    }
  };

  const handleLogin = (otp) => {
    const staticOtp = "123456";
    if (otp === staticOtp) {
      setErrorMessage("");
      sessionStorage.setItem("isLoggedIn", true);
      navigate("/dashboard");
    } else {
      setErrorMessage("Invalid OTP");
    }
  };

  return (
    <div className="min-h-[100vh] bg-gradient-to-r from-green-300 via-blue-200 to-purple-300 text-gray-900 flex justify-center items-center overflow-hidden">
      <div className="max-w-screen-lg m-0 sm:m-8 bg-white shadow-lg sm:rounded-xl flex flex-col lg:flex-row justify-between flex-1 transform transition-all duration-500 hover:scale-105 rounded-[50px]">
        {/* Background Image Section */}
        <div className="flex-1 bg-green-100 text-center hidden lg:flex rounded-[20px] overflow-hidden">
          <div
            className="m-12 xl:m-1 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/background.svg')",
            }}
          ></div>
        </div>

        {/* Login Form Section */}
        <div className="lg:w-1/2 xl:w-5/12 p-4 sm:p-8 flex flex-col justify-center items-center">
          <div className="mb-4">
            <img
              src="/iface_v.2.png"
              alt="Logo"
              className="w-29 h-28 object-contain"
            />
          </div>

          <h1 className="text-xl font-semibold text-center text-gray-800 mb-4 transform transition-all duration-300 hover:text-green-500">
            Login to Your Account
          </h1>

          <form
            className="mt-4 flex flex-col items-center w-full"
            onSubmit={formik.handleSubmit}
          >
            <div className="w-full flex-1 mt-4">
              {/* Mobile Number Input */}
              <div className="relative mb-4">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  <FaPhoneAlt />
                </span>
                <input
                  className={`w-full pl-10 pr-4 py-3 rounded-lg font-medium bg-gray-100 border placeholder-gray-500 text-base focus:outline-none ${
                    formik.errors.mobileNumber && formik.touched.mobileNumber
                      ? "border-red-500"
                      : "border-gray-200 focus:border-gray-400"
                  }`}
                  type="text"
                  name="mobileNumber"
                  value={formik.values.mobileNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Mobile Number"
                />
                {formik.touched.mobileNumber && formik.errors.mobileNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.mobileNumber}
                  </p>
                )}
              </div>

              {/* OTP Input */}
              {isOtpSent && (
                <div className="relative mb-4">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <FaKey />
                  </span>
                  <input
                    className={`w-full pl-10 pr-4 py-3 rounded-lg font-medium bg-gray-100 border placeholder-gray-500 text-base focus:outline-none ${
                      formik.errors.otp && formik.touched.otp
                        ? "border-red-500"
                        : "border-gray-200 focus:border-gray-400"
                    }`}
                    type="text"
                    name="otp"
                    value={formik.values.otp}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="OTP"
                  />
                  {formik.touched.otp && formik.errors.otp && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.otp}</p>
                  )}
                </div>
              )}

              {/* Error Message */}
              {errorMessage && (
                <div className="mt-3 text-red-500 text-center">
                  <p>{errorMessage}</p>
                </div>
              )}

              {/* Send OTP or Login Button */}
              <button
                type="submit"
                className="mx-auto max-w-lg mt-4 tracking-wide font-semibold bg-green-400 text-white w-full py-3 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none text-base transform hover:scale-105"
              >
                {isOtpSent ? "Login" : "Send OTP"}
              </button>
            </div>
          </form>

          {/* Terms and Conditions */}
          <div className="mt-4 text-center text-sm text-gray-600">
            <p>
              By logging RTS, you agree to our{" "}
              <a
                href="/terms"
                className="text-green-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms and Conditions
              </a>{" "}
              and{" "}
              <a
                href="/privacy"
                className="text-green-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
