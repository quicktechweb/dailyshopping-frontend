import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { BsTruck, BsPeople, BsGlobe } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import ScrollToTop from "../../Pages/HomePage/ScrollToTop/ScrollToTop";
import useAuth from "../../Pages/Hooks/useAuth";
import ForgotPassword from "../ForgotPassword/ForgotPassword";

export default function Login() {
  const navigate = useNavigate();
  const { loginWithPhoneAndPass, googleSignIn } = useAuth();
  const [showForgotModal, setShowForgotModal] = useState(false);

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    loginWithPhoneAndPass(phone, password, navigate);
  };

  return (
    <div className="min-h-screen  flex items-center justify-center  px-4">
      <ScrollToTop />
      <div className="bg-white max-w-5xl w-full shadow-2xl rounded-3xl md:-mt-20 -mt-10 overflow-hidden flex flex-col md:flex-row">

        {/* Left Form */}
        <div className="md:w-1/2 p-10 flex flex-col justify-center space-y-6">
          <h2 className="text-3xl font-bold text-center text-green-800">Welcome Back!</h2>
          <p className="text-center text-green-700 text-sm">Login to access your account</p>

          {/* Tabs */}
          <div className="flex rounded-xl overflow-hidden border border-green-200 mb-6">
            <button
              onClick={() => navigate("/login")}
              className="w-1/2 py-3 font-semibold text-sm bg-green-800 text-white"
            >
              Log In
            </button>
            <button
              onClick={() => navigate("/registration")}
              className="w-1/2 py-3 font-semibold text-sm bg-green-100 text-green-800"
            >
              Sign Up
            </button>
          </div>

          {/* Login Form */}
          <form className="space-y-4" onSubmit={handleLogin}>
            <input
              type="tel"
              placeholder="Phone Number*"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-green-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
              required
            />
            <input
              type="password"
              placeholder="Password*"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-green-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
              required
            />

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="text-green-700 text-xs underline mb-2"
              >
                Forgot Your Password?
              </button>
            </div>
            
            <Link to="/dashboard">
              <button
              type="submit"
              className="w-full bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition"
            >
              Login
            </button>
            </Link>
          
          </form>

          {/* OR Divider */}
          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-green-200"></div>
            <span className="px-2 text-green-400 font-semibold text-sm">OR</span>
            <div className="flex-1 h-px bg-green-200"></div>
          </div>

          {/* Google Login */}
          <button
            onClick={() => googleSignIn(navigate)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-green-400 bg-white text-green-700 font-medium shadow-sm hover:shadow-md hover:bg-green-50 transition"
          >
            <FcGoogle size={22} /> Login with Google
          </button>
        </div>

        {/* Right Panel */}
        <div className="md:w-1/2 bg-gradient-to-br from-green-200 to-green-50 p-10 flex flex-col justify-around space-y-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-green-800">Why Choose Daily Shopping?</h3>
            <p className="text-green-700 text-sm">We make your shopping and delivery experience fast, safe, and reliable.</p>

            <div className="flex items-center gap-3">
              <div className="bg-white p-4 rounded-xl shadow-lg flex items-center justify-center text-green-700">
                <BsTruck size={30} />
              </div>
              <div>
                <h4 className="font-semibold text-green-800">Fast Delivery</h4>
                <p className="text-green-600 text-sm">Delivering across 10,000+ cities</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-white p-4 rounded-xl shadow-lg flex items-center justify-center text-green-700">
                <BsPeople size={30} />
              </div>
              <div>
                <h4 className="font-semibold text-green-800">Trusted Service</h4>
                <p className="text-green-600 text-sm">Millions of happy customers</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-white p-4 rounded-xl shadow-lg flex items-center justify-center text-green-700">
                <BsGlobe size={30} />
              </div>
              <div>
                <h4 className="font-semibold text-green-800">Global Reach</h4>
                <p className="text-green-600 text-sm">Serving customers worldwide</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
           <h4 className="font-bold text-green-800 mb-2">Are you a seller ?</h4>
            <p className="text-green-600 text-sm mb-4">Create your account and experience the best service.</p>
            <button
              onClick={() => navigate("/registration")}
              className="bg-green-700 text-white py-2 px-6 rounded-lg font-semibold hover:bg-green-800 transition"
            >
              Create Seller Account
            </button>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPassword isOpen={showForgotModal} onClose={() => setShowForgotModal(false)} />
    </div>
  );
}
