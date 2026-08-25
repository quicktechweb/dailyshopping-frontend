import { useState } from "react";
import { FaUser, FaLock, FaBell, FaGlobe, FaSignOutAlt } from "react-icons/fa";
import ScrollToTop from "../../../HomePage/ScrollToTop/ScrollToTop";

export default function Settings() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 -mt-10">
        <ScrollToTop/>
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Page Title */}
        <h1 className="text-2xl font-semibold text-gray-800">
          Settings
        </h1>

        {/* Profile Settings */}
        <div className="bg-white shadow rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-3xl">
              <FaUser />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">John Doe</h2>
              <p className="text-sm text-gray-500">Update your profile info</p>
            </div>
          </div>
          <button className="mt-2 md:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Edit Profile
          </button>
        </div>

        {/* Security Settings */}
        <div className="bg-white shadow rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <FaLock /> Security
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-gray-900 font-medium">Change Password</p>
                <p className="text-gray-500 text-sm">Update your account password</p>
              </div>
              <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Change
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-gray-900 font-medium">Two-Factor Authentication</p>
                <p className="text-gray-500 text-sm">Enhance account security</p>
              </div>
              <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Enable
              </button>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white shadow rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <FaBell /> Notifications
          </h2>
          <div className="space-y-4">
            {/* Email Notifications */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-gray-900 font-medium">Email Notifications</p>
                <p className="text-gray-500 text-sm">Receive updates via email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailNotif}
                  onChange={() => setEmailNotif(!emailNotif)}
                  className="sr-only"
                />
                <div
                  className={`w-11 h-6 bg-gray-300 rounded-full transition-colors ${
                    emailNotif ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
                <div
                  className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transform transition-transform ${
                    emailNotif ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </label>
            </div>

            {/* SMS Notifications */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-gray-900 font-medium">SMS Notifications</p>
                <p className="text-gray-500 text-sm">Receive updates via SMS</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={smsNotif}
                  onChange={() => setSmsNotif(!smsNotif)}
                  className="sr-only"
                />
                <div
                  className={`w-11 h-6 bg-gray-300 rounded-full transition-colors ${
                    smsNotif ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
                <div
                  className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transform transition-transform ${
                    smsNotif ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </label>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white shadow rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <FaGlobe /> Preferences
          </h2>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              Language Settings
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              Manage Payment Methods
            </button>
          </div>
        </div>

        {/* Logout */}
        <div className="bg-white shadow rounded-xl p-6 flex justify-end">
          <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
            <FaSignOutAlt /> Logout
          </button>
        </div>

      </div>
    </div>
  );
}
