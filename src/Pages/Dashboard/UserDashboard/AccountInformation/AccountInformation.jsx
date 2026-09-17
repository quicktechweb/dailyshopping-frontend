import { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLock, FaCamera } from "react-icons/fa";
import ScrollToTop from "../../../HomePage/ScrollToTop/ScrollToTop";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";

const IMGBB_API_KEY = "ab454291ebee91b49b021ecac51be17c"; // ✅ এখানে তোমার imgbb API key বসাও

export default function AccountInformation() {
  const { user } = useAuth();
  const userId = user?.userId;

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const [editOpen, setEditOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);

  // Edit profile form state
  const [displayName, setDisplayName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);

  // Password form state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);

  // ✅ Fetch profile
  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/auth/profile/${userId}`);
        if (res.data.success) {
          setProfile(res.data.user);
          setDisplayName(res.data.user.displayName || "");
          setBirthday(res.data.user.birthday || "");
          setGender(res.data.user.gender || "");
          setAvatar(res.data.user.avatar || "");
        }
      } catch (err) {
        console.error("Fetch profile failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  // ✅ Upload image to imgbb
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setAvatarFile(file);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        formData
      );

      const imageUrl = res.data?.data?.url;
      if (imageUrl) {
        setAvatar(imageUrl); // ✅ শুধু preview + save করার জন্য state এ রাখা হলো
      } else {
        throw new Error("Upload failed");
      }
    } catch (err) {
      console.error("Image upload failed:", err);
      Swal.fire({ icon: "error", title: "Image upload failed", text: "Try again." });
    } finally {
      setUploading(false);
    }
  };

  // ✅ Save profile (name, birthday, gender, avatar link)
  const handleSaveProfile = async () => {
    if (!userId) return;
    setSavingProfile(true);

    try {
      const res = await axios.put(`http://localhost:5000/api/auth/profile/${userId}`, {
        displayName,
        birthday,
        gender,
        avatar, // ✅ imgbb link database এ যাবে
      });

      if (res.data.success) {
        setProfile(res.data.user);
        setEditOpen(false);
        Swal.fire({
          icon: "success",
          title: "Profile updated",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      console.error("Update profile failed:", err);
      Swal.fire({ icon: "error", title: "Failed", text: "Could not update profile." });
    } finally {
      setSavingProfile(false);
    }
  };

  // ✅ Change password
  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      return Swal.fire({ icon: "warning", title: "All fields required" });
    }
    if (newPassword !== confirmPassword) {
      return Swal.fire({ icon: "warning", title: "Passwords do not match" });
    }
    if (newPassword.length < 6) {
      return Swal.fire({ icon: "warning", title: "Password must be at least 6 characters" });
    }

    setChangingPassword(true);

    try {
      const res = await axios.put(
        `http://localhost:5000/api/auth/change-password/${userId}`,
        { currentPassword, newPassword }
      );

      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Password changed successfully",
          timer: 1500,
          showConfirmButton: false,
        });
        setPasswordOpen(false);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      console.error("Change password failed:", err);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: err.response?.data?.message || "Could not change password.",
      });
    } finally {
      setChangingPassword(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading account information...
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Please sign in to view account information.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 -mt-12">
      <ScrollToTop />
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Page Title */}
        <h1 className="text-2xl font-semibold text-gray-800">
          Account Information
        </h1>

        {/* Profile Section */}
        <div className="bg-white shadow rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Profile Picture */}
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-3xl overflow-hidden">
              {profile?.avatar ? (
                <img src={profile.avatar} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                <FaUser />
              )}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {profile?.displayName || "No Name"}
              </h2>
              <p className="text-sm text-gray-500">
                Member since{" "}
                {profile?.createdAt
                  ? new Date(profile.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })
                  : "N/A"}
              </p>
            </div>
          </div>
          <button
            onClick={() => setEditOpen(true)}
            className="mt-2 md:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
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
                <p className="text-gray-500 text-sm">{profile?.email || "Not set"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <FaPhone className="text-gray-500 w-5 h-5" />
              <div>
                <p className="text-gray-900 font-medium">Phone</p>
                <p className="text-gray-500 text-sm">{profile?.phoneNumber || "Not set"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <FaMapMarkerAlt className="text-gray-500 w-5 h-5" />
              <div>
                <p className="text-gray-900 font-medium">Gender</p>
                <p className="text-gray-500 text-sm">{profile?.gender || "Not set"}</p>
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
        </div>

        {/* Account Actions */}
        <div className="bg-white shadow rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Account Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setPasswordOpen(true)}
              className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              <FaLock /> Change Password
            </button>
          </div>
        </div>
      </div>

      {/* ================= EDIT PROFILE MODAL ================= */}
      {editOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md space-y-4">
            <h3 className="text-lg font-semibold">Edit Profile</h3>

            {/* Avatar */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center relative">
                {avatar ? (
                  <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <FaUser className="text-gray-400 text-2xl" />
                )}
              </div>
              <label className="flex items-center gap-2 text-sm text-blue-600 cursor-pointer">
                <FaCamera />
                {uploading ? "Uploading..." : "Change Photo"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                  disabled={uploading}
                />
              </label>
            </div>

            <div>
              <label className="text-sm text-gray-600">Display Name</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 mt-1 text-sm"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Birthday</label>
              <input
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 mt-1 text-sm"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 mt-1 text-sm"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setEditOpen(false)}
                className="px-4 py-2 text-sm rounded-lg border"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                disabled={savingProfile || uploading}
                className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
              >
                {savingProfile ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= CHANGE PASSWORD MODAL ================= */}
      {passwordOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md space-y-4">
            <h3 className="text-lg font-semibold">Change Password</h3>

            <div>
              <label className="text-sm text-gray-600">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 mt-1 text-sm"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 mt-1 text-sm"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 mt-1 text-sm"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setPasswordOpen(false)}
                className="px-4 py-2 text-sm rounded-lg border"
              >
                Cancel
              </button>
              <button
                onClick={handleChangePassword}
                disabled={changingPassword}
                className="px-4 py-2 text-sm rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-60"
              >
                {changingPassword ? "Changing..." : "Change Password"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}