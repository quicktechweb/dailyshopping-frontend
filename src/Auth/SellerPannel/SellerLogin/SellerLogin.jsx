import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { BsTruck, BsPeople, BsGlobe } from "react-icons/bs";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ScrollToTop from "../../../Pages/HomePage/ScrollToTop/ScrollToTop";
import SellerForgotPassword from "./SellerForgotPassword";
import useSellerAuth from "../../../Pages/Hooks/useSellerAuth";

export default function SellerLogin() {
  const navigate = useNavigate();
  const { sellerLogin, isLoading } = useSellerAuth();
  const [showForgotModal, setShowForgotModal] = useState(false);

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (!phone || !password) return;

    sellerLogin(phone, password, () => navigate("/sellerview"));
  };

  return (
    <div className="min-h-screen  flex items-center justify-center  px-4">
      <ScrollToTop />
      <div className="bg-white max-w-5xl w-full shadow-2xl rounded-3xl md:-mt-44 mt-2 overflow-hidden flex flex-col md:flex-row">

        {/* Left Form */}
        <div className="md:w-1/2 p-10 flex flex-col justify-center space-y-6">
          <h2 className="text-3xl font-bold text-center text-green-800">Welcome Back!</h2>
          <p className="text-center text-green-700 text-sm">Login to access your seller account</p>

          {/* Tabs */}
          <div className="flex rounded-xl overflow-hidden border border-green-200 mb-6">
            <button
              type="button"
              onClick={() => navigate("/sellerLogin")}
              className="w-1/2 py-3 font-semibold text-sm bg-green-800 text-white"
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => navigate("/sellerRegistration")}
              className="w-1/2 py-3 font-semibold text-sm bg-green-100 text-green-800"
            >
              Sign Up
            </button>
          </div>

          {/* Login Form */}
          <form className="space-y-4" onSubmit={handleLogin}>
            <input
              type="tel"
              placeholder="Mobile Number*"
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
                className="text-green-700 text-xs underline"
              >
                Forgot Your Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-green-200"></div>
            <span className="px-2 text-green-400 font-semibold text-sm">OR</span>
            <div className="flex-1 h-px bg-green-200"></div>
          </div>

          <button
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

          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
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

      <SellerForgotPassword isOpen={showForgotModal} onClose={() => setShowForgotModal(false)} />
    </div>
  );
}