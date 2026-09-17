import { useEffect, useState } from "react";
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

export default function EditProfile() {
  const { user } = useAuth();
  const userId = user?.userId || "";

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [gender, setGender] = useState("male");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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
        if (res.data.success) {
          const u = res.data.user;
          setDisplayName(u.displayName || "");
          setEmail(u.email || "");
          setPhoneNumber(u.phoneNumber || "");
          setGender(u.gender || "male");
          if (u.birthday) {
            const [y, m, d] = u.birthday.split("-");
            setYear(y || "");
            setMonth(m || "");
            setDay(d || "");
          }
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleSave = async () => {
    if (!userId) return;
    setSaving(true);
    try {
      const birthday =
        year && month && day
          ? `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`
          : undefined;

      const res = await axios.put(
        `http://localhost:5000/api/auth/profile/${userId}`,
        { displayName, birthday, gender }
      );

      if (res.data.success) {
        alert("Profile updated successfully");
      }
    } catch (err) {
      console.error("Profile update error:", err);
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className=" -mt-10">
      <div className="max-w-6xl mx-auto px-6">
        {/* TITLE */}
        <h1 className="text-xl font-semibold text-gray-800 mb-6">
          Edit Profile
        </h1>

        {/* CARD */}
        <div className="bg-white p-10">
          {loading ? (
            <p className="text-sm text-gray-500">Loading profile...</p>
          ) : (
            <>
              {/* TOP GRID */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* FULL NAME */}
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Full Name
                  </label>

                  <div className="relative">
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full border border-gray-300 px-3 py-2 pr-10 text-sm focus:outline-none"
                    />

                    {/* CLEAR ICON */}
                    <span
                      onClick={() => setDisplayName("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                    >
                      ✕
                    </span>
                  </div>
                </div>

                {/* EMAIL */}
                <div>
                  <p className="text-sm text-gray-600 mb-2">
                    Email Address{" "}
                    <span className="text-blue-500 cursor-pointer">
                      Change
                    </span>
                  </p>
                  <p className="text-gray-900 text-sm">
                    {maskEmail(email) || "-"}
                  </p>
                </div>

                {/* MOBILE */}
                <div>
                  <p className="text-sm text-gray-600 mb-2">
                    Mobile{" "}
                    <span className="text-blue-500 cursor-pointer">
                      Change
                    </span>
                  </p>
                  <p className="text-gray-900 text-sm">
                    {maskPhone(phoneNumber) || "-"}
                  </p>
                </div>
              </div>

              {/* BOTTOM GRID */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-10">
                {/* BIRTHDAY */}
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Birthday
                  </label>

                  <div className="flex gap-3">
                    <input
                      type="number"
                      value={month}
                      onChange={(e) => setMonth(e.target.value)}
                      className="w-16 border border-gray-300 px-2 py-2 text-sm focus:outline-none"
                    />
                    <input
                      type="number"
                      value={day}
                      onChange={(e) => setDay(e.target.value)}
                      className="w-16 border border-gray-300 px-2 py-2 text-sm focus:outline-none"
                    />
                    <input
                      type="number"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="w-24 border border-gray-300 px-2 py-2 text-sm focus:outline-none"
                    />
                  </div>
                </div>

                {/* GENDER */}
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Gender
                  </label>

                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="border border-gray-300 px-3 py-2 text-sm w-40 focus:outline-none"
                  >
                    <option value="male">male</option>
                    <option value="female">female</option>
                    <option value="other">other</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {/* SAVE BUTTON */}
          <div className="mt-16">
            <button
              onClick={handleSave}
              disabled={saving || loading}
              className="bg-[#f57224] hover:bg-[#e5671f] text-white px-14 py-3 text-sm font-semibold disabled:opacity-60"
            >
              {saving ? "SAVING..." : "SAVE CHANGES"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}