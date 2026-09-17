import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { BsTruck, BsPeople, BsGlobe } from "react-icons/bs";
import ScrollToTop from "../../Pages/HomePage/ScrollToTop/ScrollToTop";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../Pages/Hooks/useAuth";
import { nanoid } from "nanoid";

export default function Registration() {
  const currentPath = window.location.pathname;
  const navigate = useNavigate();
  const { googleSignIn } = useAuth();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [referral, setReferral] = useState("");
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);

  const handleRegisterClick = async (e) => {
    e.preventDefault();
    if (!/^\d{11}$/.test(phone)) {
      Swal.fire("Invalid!", "Enter valid 11-digit Bangladeshi phone number", "warning");
      return;
    }
    if (password !== confirmPassword) {
      Swal.fire("Error", "Passwords do not match!", "error");
      return;
    }
    try {
      const res = await fetch(`https://dailyshopping-backend.onrender.com/api/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: phone }),
      });
      const data = await res.json();
      if (data.success) {
        setShowOtpModal(true);
        Swal.fire("OTP Sent!", "Check your phone for the OTP", "success");
      } else {
        Swal.fire("Error", data.message || "Failed to send OTP", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Server error while sending OTP", "error");
    }
  };

  const verifyOtpAndRegister = async () => {
    try {
      const res = await fetch(`https://dailyshopping-backend.onrender.com/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: phone, otp }),
      });
      const data = await res.json();
      if (!data.success) {
        Swal.fire("Error", data.message || "Invalid OTP", "error");
        return;
      }

      const myrefferalcode = `REF-${nanoid(8).toUpperCase()}`;
      const regRes = await fetch(`https://dailyshopping-backend.onrender.com/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber: phone,
          password,
          displayName: phone,
          referralCode: referral || "",
          myrefferalcode,
          newpartuser: "user",
        }),
      });

      const regData = await regRes.json();
      if (regData.success) {
        Swal.fire("Success!", `Account created!\nReferral Code: ${myrefferalcode}`, "success");
        navigate("/");
      } else {
        Swal.fire("Error", regData.message || "Registration failed", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Server error while verifying OTP", "error");
    }
  };

  useEffect(() => {
    if (showOtpModal) {
      setTimer(30);
      setCanResend(false);
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [showOtpModal]);

  const handleResendOtp = async () => {
    try {
      const res = await fetch(`https://dailyshopping-backend.onrender.com/api/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: phone }),
      });
      const data = await res.json();
      if (data.success) {
        Swal.fire("OTP Sent!", "A new OTP has been sent.", "success");
        setTimer(30);
        setCanResend(false);
      } else {
        Swal.fire("Error", data.message || "Failed to resend OTP", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Server error while resending OTP", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <ScrollToTop />

      <div className="bg-white max-w-5xl w-full shadow-2xl rounded-3xl md:-mt-8 -mt-12 overflow-hidden flex flex-col md:flex-row">
        
        {/* Form Section */}
        <div className="md:w-1/2 p-10 bg-white flex flex-col justify-center space-y-6">
          <h2 className="text-3xl font-bold text-center text-green-800">Daily Shopping</h2>
          <p className="text-center text-green-700 mb-4">Sign up to start your shopping journey</p>

          {/* Tabs */}
          <div className="flex rounded-xl overflow-hidden border border-green-200 mb-6">
            <button
              onClick={() => navigate("/login")}
              className={`w-1/2 py-3 font-semibold text-sm ${currentPath === "/login" ? "bg-green-800 text-white" : "bg-green-100 text-green-800"}`}
            >
              Log In
            </button>
            <button
              onClick={() => navigate("/registration")}
              className={`w-1/2 py-3 font-semibold text-sm ${currentPath === "/registration" ? "bg-green-800 text-white" : "bg-green-100 text-green-800"}`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleRegisterClick}>
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-green-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-green-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-green-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
              required
            />
            <input
              type="text"
              placeholder="Referral Code (Optional)"
              value={referral}
              onChange={(e) => setReferral(e.target.value)}
              className="w-full border border-green-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
            />

            <button
              type="submit"
              className="w-full bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition"
            >
              Register
            </button>
          </form>

          {/* OR */}
          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-green-200"></div>
            <span className="px-2 text-green-400 font-semibold text-sm">OR</span>
            <div className="flex-1 h-px bg-green-200"></div>
          </div>

          <button
            onClick={() => googleSignIn(navigate)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-green-400 rounded-lg hover:bg-green-50 transition"
          >
            <FcGoogle size={22} /> Register with Google
          </button>
        </div>

        {/* Right Panel - Professional itchy style */}
        <div className="md:w-1/2 bg-gradient-to-br from-green-200 to-green-50 p-10 flex flex-col justify-around space-y-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-green-800">Why Choose Daily Shopping?</h3>
            <p className="text-green-700 text-sm">We make your shifting and shopping experience smooth and reliable.</p>

            <div className="flex items-center gap-3">
              <div className="bg-white p-4 rounded-xl shadow-lg flex items-center justify-center text-green-700">
                <BsTruck size={30} />
              </div>
              <div>
                <h4 className="font-semibold text-green-800">Fast Delivery</h4>
                <p className="text-green-600 text-sm">Get your orders on time across 10,000+ cities.</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-white p-4 rounded-xl shadow-lg flex items-center justify-center text-green-700">
                <BsPeople size={30} />
              </div>
              <div>
                <h4 className="font-semibold text-green-800">Trusted Service</h4>
                <p className="text-green-600 text-sm">Millions of happy customers & counting.</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-white p-4 rounded-xl shadow-lg flex items-center justify-center text-green-700">
                <BsGlobe size={30} />
              </div>
              <div>
                <h4 className="font-semibold text-green-800">Global Reach</h4>
                <p className="text-green-600 text-sm">Serving customers across 6 continents.</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            {/* <h4 className="font-bold text-green-800 mb-2">Get Started Today!</h4> */}
            <h4 className="font-bold text-green-800 mb-2">Are you a seller ?</h4>
            <p className="text-green-600 text-sm mb-4">Create your account and experience the best service.</p>
            <button
              onClick={() => navigate("/sellerRegistration")}
              className="bg-green-700 text-white py-2 px-6 rounded-lg font-semibold hover:bg-green-800 transition"
            >
              Create Seller Account
            </button>
          </div>
        </div>
      </div>

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-80 p-6 rounded-2xl shadow-2xl">
            <h3 className="text-center font-bold text-green-800 mb-4">Enter 6-digit OTP</h3>
            <div className="flex justify-between mb-4">
              {Array.from({ length: 6 }).map((_, idx) => (
                <input
                  key={idx}
                  maxLength={1}
                  type="text"
                  className="w-10 h-10 border border-green-300 rounded-md text-center text-lg font-bold focus:ring-2 focus:ring-green-400 focus:outline-none"
                  id={`otp-${idx}`}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    if (!value) return;
                    const newOtp = otp.split("");
                    newOtp[idx] = value;
                    setOtp(newOtp.join(""));
                    if (idx < 5) document.getElementById(`otp-${idx + 1}`)?.focus();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && idx > 0 && !otp[idx]) {
                      document.getElementById(`otp-${idx - 1}`)?.focus();
                    }
                  }}
                />
              ))}
            </div>
            <div className="text-center mb-3">
              {!canResend ? (
                <p className="text-xs text-green-500">
                  Resend OTP in <span className="font-bold">{timer}s</span>
                </p>
              ) : (
                <button onClick={handleResendOtp} className="text-green-700 text-xs font-semibold underline">
                  Resend OTP
                </button>
              )}
            </div>
            <button
              onClick={verifyOtpAndRegister}
              className="w-full bg-green-700 text-white py-2 rounded-md font-semibold hover:bg-green-800 transition"
            >
              Verify & Register
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
