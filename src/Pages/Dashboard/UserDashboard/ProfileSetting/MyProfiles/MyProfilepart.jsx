import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useAuth from "../../../../Hooks/useAuth";

const maskEmail = (email) => {
  if (!email) return "";
  const [name, domain] = email.split("@");
  if (!domain) return email;
  return `${name.slice(0, 2)}${"*".repeat(Math.max(name.length - 2, 3))}@${domain}`;
};

const maskPhone = (phone) => {
  if (!phone) return "";
  const clean = phone.replace(/^0/, "");
  return `+880 ${clean.slice(0, 3)}*****${clean.slice(-2)}`;
};

const MyProfilePart = () => {
  const { user } = useAuth();
  const userId = user?.userId || "";

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/auth/profile/${userId}`
        );
        if (res.data.success) setProfile(res.data.user);
      } catch (err) {
        console.error("Profile fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  return (
    <div className=" md:-mt-12 -mt-8">
      <div className="max-w-6xl mx-auto px-6">
        {/* TITLE */}
        <h1 className="text-xl font-semibold text-gray-800 mb-6">
          My profile
        </h1>

        {/* CARD */}
        <div className="bg-white p-10 rounded-sm">
          {loading ? (
            <p className="text-sm text-gray-500">Loading profile...</p>
          ) : (
            <>
              {/* TOP GRID */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* FULL NAME */}
                <div>
                  <p className="text-sm text-gray-500 mb-2">Full Name</p>
                  <p className="text-gray-900">{profile?.displayName || "-"}</p>
                </div>

                {/* EMAIL */}
                <div>
                  <p className="text-sm text-gray-500 mb-2">
                    Email Address{" "}
                    <span className="text-blue-500 cursor-pointer">Change</span>
                  </p>
                  <p className="text-gray-900 mb-2">
                    {maskEmail(profile?.email) || "-"}
                  </p>

                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input type="checkbox" className="w-4 h-4" />
                    Receive marketing emails
                  </label>
                </div>

                {/* MOBILE */}
                <div>
                  <p className="text-sm text-gray-500 mb-2">
                    Mobile{" "}
                    <span className="text-blue-500 cursor-pointer">Change</span>
                  </p>
                  <p className="text-gray-900 mb-2">
                    {maskPhone(profile?.phoneNumber) || "-"}
                  </p>

                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input type="checkbox" className="w-4 h-4" />
                    Receive marketing SMS
                  </label>
                </div>
              </div>

              {/* BOTTOM GRID */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
                {/* BIRTHDAY */}
                <div>
                  <p className="text-sm text-gray-500 mb-2">Birthday</p>
                  <p className="text-gray-900">{profile?.birthday || "-"}</p>
                </div>

                {/* GENDER */}
                <div>
                  <p className="text-sm text-gray-500 mb-2">Gender</p>
                  <p className="text-gray-900">{profile?.gender || "-"}</p>
                </div>
              </div>
            </>
          )}

          {/* BUTTONS */}
          <div className="mt-14 flex flex-col gap-4 w-60">
            <Link
              to="/dashboard/editprofile"
              className="bg-[#1aa4c8] hover:bg-[#1793b3] text-white py-3 text-sm font-semibold text-center block"
            >
              EDIT PROFILE
            </Link>

            <button className="bg-[#1aa4c8] hover:bg-[#1793b3] text-white py-3 text-sm font-semibold">
              CHANGE PASSWORD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyProfilePart;