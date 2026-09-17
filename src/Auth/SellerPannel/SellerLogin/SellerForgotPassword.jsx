import { useState } from "react";
import { FaSpinner, FaTimes } from "react-icons/fa";
import useSellerAuth from "../../../Pages/Hooks/useSellerAuth";

export default function SellerForgotPassword({ isOpen, onClose }) {
  const { resetPassword, isLoading } = useSellerAuth();

  const [mobileNumber, setMobileNumber] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  if (!isOpen) return null;

  const handleClose = () => {
    setMobileNumber("");
    setNewPassword("");
    setConfirmNewPassword("");
    onClose();
  };

  const handleReset = async (e) => {
    e.preventDefault();
    const success = await resetPassword(mobileNumber, newPassword, confirmNewPassword);
    if (success) handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <FaTimes size={18} />
        </button>

        <h3 className="text-2xl font-bold text-green-800 mb-2">Reset Password</h3>
        <p className="text-sm text-gray-500 mb-6">
          Enter your registered mobile number and set a new password.
        </p>

        <form onSubmit={handleReset} className="space-y-4">
          <input
            type="tel"
            placeholder="Mobile Number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            className="w-full border border-green-300 rounded-lg px-4 py-2.5 shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
            required
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border border-green-300 rounded-lg px-4 py-2.5 shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className="w-full border border-green-300 rounded-lg px-4 py-2.5 shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
            required
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition disabled:opacity-60"
          >
            {isLoading ? <FaSpinner className="animate-spin" /> : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}