import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLock } from "react-icons/fa";
import ScrollToTop from "../../../HomePage/ScrollToTop/ScrollToTop";

export default function AccountInformation() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 -mt-12">
        <ScrollToTop/>
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Page Title */}
        <h1 className="text-2xl font-semibold text-gray-800">
          Account Information
        </h1>

        {/* Profile Section */}
        <div className="bg-white shadow rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Profile Picture */}
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-3xl">
              <FaUser />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">John Doe</h2>
              <p className="text-sm text-gray-500">Member since Jan 2023</p>
            </div>
          </div>
          <button className="mt-2 md:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Edit Profile
          </button>
        </div>

        {/* Contact Information */}
        <div className="bg-white shadow rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <FaEnvelope className="text-gray-500 w-5 h-5" />
              <div>
                <p className="text-gray-900 font-medium">Email</p>
                <p className="text-gray-500 text-sm">johndoe@example.com</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <FaPhone className="text-gray-500 w-5 h-5" />
              <div>
                <p className="text-gray-900 font-medium">Phone</p>
                <p className="text-gray-500 text-sm">+1 234 567 890</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <FaMapMarkerAlt className="text-gray-500 w-5 h-5" />
              <div>
                <p className="text-gray-900 font-medium">Address</p>
                <p className="text-gray-500 text-sm">123 Main Street, City, Country</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <FaLock className="text-gray-500 w-5 h-5" />
              <div>
                <p className="text-gray-900 font-medium">Password</p>
                <p className="text-gray-500 text-sm">********</p>
              </div>
            </div>

          </div>

          <div className="flex justify-end mt-4">
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
              Update Information
            </button>
          </div>
        </div>

        {/* Account Actions */}
        <div className="bg-white shadow rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Account Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <FaLock /> Change Password
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <FaEnvelope /> Manage Email
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2 border border-red-400 text-red-600 rounded-lg hover:bg-red-50 transition">
              <FaUser /> Deactivate Account
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
