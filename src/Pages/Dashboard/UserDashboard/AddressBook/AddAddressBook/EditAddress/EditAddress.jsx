import { useState } from "react";
import { X } from "lucide-react";

const EditAddress = () => {
  const [form, setForm] = useState({
    name: "Alex",
    phone: "017327788318",
    landmark: "",
    province: "Dhaka",
    city: "Dhaka - North",
    zone: "House-45, Road-12, Block-C, Green View Residency, Banani ",
    address: "House-45, Road-12, Block-C, Green View Residency, Banani",
    label: "HOME",
  });

  const handleChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex justify-center bg-white md:-mt-10 ">
      <div className="w-full max-w-6xl p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Edit My Address
          </h2>
          <button className="text-blue-500 text-sm hover:underline">
            Delete
          </button>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left */}
          <div className="space-y-5">
            {[
              { label: "Full Name", key: "name" },
              { label: "Phone Number", key: "phone" },
              {
                label: "Landmark (Optional)",
                key: "landmark",
                placeholder: "E.g. beside train station",
              },
            ].map(({ label, key, placeholder }) => (
              <div key={key}>
                <label className="block text-sm text-gray-700 mb-1">
                  {label}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={form[key]}
                    placeholder={placeholder}
                    onChange={e => handleChange(key, e.target.value)}
                    className="w-full border rounded px-3 py-2 pr-9 focus:outline-none focus:ring-1 focus:ring-orange-400"
                  />
                  {form[key] && (
                    <X
                      size={16}
                      onClick={() => handleChange(key, "")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right */}
          <div className="space-y-5">
            {[
              { label: "Province / Region", key: "province" },
              { label: "City", key: "city" },
              { label: "Zone", key: "zone" },
            ].map(({ label, key }) => (
              <div key={key}>
                <label className="block text-sm text-gray-700 mb-1">
                  {label}
                </label>
                <select
                  value={form[key]}
                  onChange={e => handleChange(key, e.target.value)}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-400"
                >
                  <option>{form[key]}</option>
                </select>
              </div>
            ))}

            {/* Address */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Address
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={form.address}
                  onChange={e => handleChange("address", e.target.value)}
                  className="w-full border rounded px-3 py-2 pr-9 focus:outline-none focus:ring-1 focus:ring-orange-400"
                />
                {form.address && (
                  <X
                    size={16}
                    onClick={() => handleChange("address", "")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Label */}
        <div className="mt-8">
          <p className="text-sm font-medium mb-3 text-gray-800">
            Select a label for effective delivery:
          </p>
          <div className="flex gap-4">
            {["OFFICE", "HOME"].map(type => (
              <button
                key={type}
                onClick={() => handleChange("label", type)}
                className={`px-6 py-3 border rounded text-sm font-medium transition
                  ${
                    form.label === type
                      ? "border-orange-500 text-orange-500 bg-orange-50"
                      : "border-gray-300 text-gray-600 hover:border-gray-400"
                  }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 mt-10">
          <button className="px-8 py-2 border rounded bg-gray-100 text-gray-600 hover:bg-gray-200">
            Cancel
          </button>
          <button className="px-10 py-2 rounded bg-orange-500 text-white hover:bg-orange-600">
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditAddress;
