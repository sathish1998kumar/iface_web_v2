import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaPhoneAlt, FaKey, FaArrowLeft } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const schema = z.object({
  mobileNumber: z
    .string()
    .regex(/^\d{10}$/, "Mobile number must be exactly 10 digits")
    .nonempty("Mobile number is required"),
  otp: z
    .string()
    .regex(/^\d{5}$/, "OTP must be exactly 5 digits")
    .optional(),
});

const FloatingPaths = ({ position }) => {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    color: `rgba(0, 0, 0, ${0.1 + i * 0.03})`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="w-full h-full text-slate-950 dark:text-white"
        viewBox="0 0 696 316"
        fill="none"
      >
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

const OtpInput = ({ value, onChange, onComplete, focus }) => {
  const inputsRef = useRef([]);
  const [otp, setOtp] = useState(Array(5).fill(""));

  useEffect(() => {
    if (value) {
      const newOtp = value.split("");
      setOtp([...newOtp, ...Array(5 - newOtp.length).fill("")]);
    } else {
      setOtp(Array(5).fill(""));
    }
  }, [value]);

  useEffect(() => {
    if (focus && inputsRef.current[0]) {
      inputsRef.current[0].focus();
    }
  }, [focus]);

  const handleChange = (e, index) => {
    const newValue = e.target.value;

    if (/^\d*$/.test(newValue) && newValue.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = newValue;
      setOtp(newOtp);

      const otpValue = newOtp.join("");
      onChange(otpValue);

      if (newValue && index < 4) {
        inputsRef.current[index + 1].focus();
      }

      if (otpValue.length === 5) {
        onComplete();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1].focus();
    } else if (e.key === "ArrowRight" && index < 4) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text/plain").slice(0, 5);
    if (/^\d+$/.test(pasteData)) {
      const newOtp = pasteData
        .split("")
        .concat(Array(5 - pasteData.length).fill(""));
      setOtp(newOtp);
      onChange(pasteData);
      if (pasteData.length === 5) {
        onComplete();
      }
    }
  };

  return (
    <div className="flex justify-center space-x-2">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (inputsRef.current[index] = el)}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className="w-12 h-12 text-center text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      ))}
    </div>
  );
};

const Login = () => {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpFocus, setOtpFocus] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // 'success', 'error', 'warning', 'info'
  });
  const mobileNumberRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn")) {
      navigate("/CardCount");
    }
    // Focus mobile number field on load
    if (mobileNumberRef.current) {
      mobileNumberRef.current.focus();
    }
  }, [navigate]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const showToast = (message, severity = "success") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleSendOtp = (data) => {
    setIsOtpSent(true);
    setOtpFocus(true);
    showToast("OTP sent successfully! Check your mobile", "success");
  };

  const handleLogin = (data) => {
    if (data.otp === "12345") {
      localStorage.setItem("isLoggedIn", "true");
      showToast("Login successful! Redirecting...", "success");
      setTimeout(() => navigate("/CardCount"), 2000);
    }
    if (data.otp === "54321") {
      localStorage.setItem("isLoggedIn", "true");
      showToast("Login successful! Redirecting...", "success");
      setTimeout(() => navigate("/dashboard"), 2000);
    } else {
      showToast("Invalid OTP! Please try again", "error");
    }
  };

  const handleOtpChange = (otpValue) => {
    setValue("otp", otpValue, { shouldValidate: true });
  };

  const handleBackToMobile = () => {
    setIsOtpSent(false);
    setOtpFocus(false);
    if (mobileNumberRef.current) {
      mobileNumberRef.current.focus();
    }
  };

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleCloseSnackbar}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-gray-900 flex justify-center items-center overflow-hidden relative">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      {/* MUI Snackbar - Positioned top-right */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{
          position: "absolute",
          top: "24px",
          right: "24px",
          "& .MuiPaper-root": {
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            minWidth: "300px",
          },
        }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          action={action}
          sx={{
            width: "100%",
            borderRadius: "12px",
            alignItems: "center",
            "& .MuiAlert-icon": {
              alignItems: "center",
            },
            "& .MuiAlert-message": {
              padding: "8px 0",
            },
          }}
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>

      <div className="max-w-screen-lg m-0 sm:m-8 bg-white/80 shadow-lg sm:rounded-xl flex flex-col lg:flex-row justify-between flex-1 transform transition-all duration-500">
        <div className="flex-1 bg-green-200 text-center hidden lg:flex rounded-[20px] overflow-hidden">
          <div
            className="m-12 xl:m-1 w-full bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/background.svg')" }}
          ></div>
        </div>
        <div className="lg:w-1/2 xl:w-5/12  bg-green-100 rounded-xl p-4 sm:p-8 flex flex-col justify-center items-center">
          <div className="mb-4">
            <img
              src="/iface_v.2.png"
              alt="Logo"
              className="w-29 h-28 object-contain"
            />
          </div>

          <h1 className="text-xl font-semibold text-center text-gray-800 mb-4 transition-all duration-300 hover:text-green-500">
            {isOtpSent ? "Enter OTP" : "Login to Your Account"}
          </h1>

          {isOtpSent && (
            <button
              onClick={handleBackToMobile}
              className="self-start mb-2 flex items-center text-green-500 hover:text-green-700 transition-colors"
            >
              <FaArrowLeft className="mr-1" />
              Back to mobile number
            </button>
          )}

          <form
            onSubmit={handleSubmit(isOtpSent ? handleLogin : handleSendOtp)}
            className="w-full flex flex-col items-center"
          >
            <div className="w-full flex-1 mt-4">
              {!isOtpSent ? (
                <div className="relative mb-4">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <FaPhoneAlt />
                  </span>
                  <input
                    {...register("mobileNumber")}
                    ref={(e) => {
                      register("mobileNumber").ref(e);
                      mobileNumberRef.current = e;
                    }}
                    className="w-full pl-10 pr-4 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-base focus:outline-none focus:border-gray-400"
                    type="text"
                    placeholder="Mobile Number"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSubmit(handleSendOtp)();
                      }
                    }}
                  />
                  <p className="text-red-500">{errors.mobileNumber?.message}</p>
                </div>
              ) : (
                <div className="mb-4">
                  <div className="flex items-center justify-center mb-2 text-gray-500"></div>
                  <OtpInput
                    value=""
                    onChange={handleOtpChange}
                    onComplete={() => handleSubmit(handleLogin)()}
                    focus={otpFocus}
                  />
                  <input type="hidden" {...register("otp")} />
                  <p className="text-red-500 text-sm mt-1 text-center">
                    {errors.otp?.message}
                  </p>
                </div>
              )}

              <button
                type="submit"
                className="mx-auto max-w-lg mt-4 tracking-wide font-semibold bg-green-400 text-white w-full py-3 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none text-base transform"
              >
                {isOtpSent ? "Verify OTP" : "Send OTP"}
              </button>
            </div>
          </form>

          <div className="mt-4 text-center text-sm text-gray-600">
            <p>
              By logging in, you agree to our{" "}
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
