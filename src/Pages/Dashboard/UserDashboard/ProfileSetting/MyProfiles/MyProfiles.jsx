import { useState } from "react";
import { Camera } from "lucide-react";

export default function MyProfiles() {
  const [editing, setEditing] = useState(false);

  const [user, setUser] = useState({
    displayName: "Tonmoy Ahmed",
    email: "tonmoy@example.com",
    phoneNumber: "017xxxxxxxx",
    birthday: "1998-06-15",
    gender: "male",
    address: "Dhaka, Bangladesh",
    avatar:
      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  });

  const [form, setForm] = useState({ ...user });
  const [preview, setPreview] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = () => {
    setUser(form);
    setEditing(false);
  };

  return (
    <div className="  -mt-10 md:mt-0 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl  overflow-hidden grid md:grid-cols-3">

          {/* LEFT PROFILE PANEL */}
          <div className="relative bg-gradient-to-br from-emerald-600 to-teal-700 flex flex-col items-center justify-center p-10">
            <div className="relative">
              <img
                src={preview || user.avatar}
                alt="Avatar"
                className="w-36 h-36 rounded-full border-4 border-white shadow-xl object-cover"
              />

              {editing && (
                <label className="absolute bottom-2 right-2 bg-white text-emerald-600 p-2 rounded-full shadow cursor-pointer hover:scale-105 transition">
                  <Camera size={18} />
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) =>
                      setPreview(URL.createObjectURL(e.target.files[0]))
                    }
                  />
                </label>
              )}
            </div>

            <h2 className="text-white text-2xl font-bold mt-5">
              {user.displayName}
            </h2>
            <p className="text-emerald-100 text-sm mt-1">
              Premium Member
            </p>
          </div>

          {/* RIGHT CONTENT */}
          <div className="md:col-span-2 p-10">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-800">
                My Profile
              </h1>

              {!editing && (
                <button
                  onClick={() => setEditing(true)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-xl transition shadow"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {/* PROFILE FIELDS */}
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { label: "Full Name", name: "displayName" },
                { label: "Email", name: "email" },
                { label: "Phone", name: "phoneNumber" },
                { label: "Birthday", name: "birthday", type: "date" },
                { label: "Gender", name: "gender" },
                { label: "Address", name: "address" },
              ].map(({ label, name, type }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    {label}
                  </label>

                  {editing ? (
                    name === "gender" ? (
                      <select
                        name={name}
                        value={form[name]}
                        onChange={handleChange}
                        className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <input
                        type={type || "text"}
                        name={name}
                        value={form[name]}
                        onChange={handleChange}
                        className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-emerald-500"
                      />
                    )
                  ) : (
                    <div className="w-full bg-gray-50 border rounded-xl px-4 py-2 text-gray-700">
                      {user[name]}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* ACTION BUTTONS */}
            {editing && (
              <div className="flex gap-4 pt-6">
                <button
                  onClick={handleSave}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-xl transition shadow"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => {
                    setForm(user);
                    setEditing(false);
                    setPreview(null);
                  }}
                  className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-xl transition"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
