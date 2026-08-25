import { useState } from "react";
import { FaHome, FaBriefcase } from "react-icons/fa";

const AddNewAddress = () => {
  const [label, setLabel] = useState("HOME");

  return (
    <div className="bg-white md:-mt-10 -mt-3 p-6">
      <div className="mx-auto max-w-6xl  p-6 ">
        {/* Title */}
        <h2 className="mb-6 text-lg font-semibold text-gray-800">
          Add New Address
        </h2>

        {/* ================= MAIN GRID ================= */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          
          {/* ================= LEFT SIDE ================= */}
          <div className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="text-sm text-gray-600">Full Name</label>
              <input
                type="text"
                placeholder="First Last"
                className="mt-1 w-full rounded border px-3 py-2 focus:border-orange-500 focus:outline-none"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="text-sm text-gray-600">Phone Number</label>
              <input
                type="text"
                placeholder="Please enter your phone number"
                className="mt-1 w-full rounded border px-3 py-2 focus:border-orange-500 focus:outline-none"
              />
            </div>

            {/* Landmark */}
            <div>
              <label className="text-sm text-gray-600">
                Landmark (Optional)
              </label>
              <input
                type="text"
                placeholder="E.g. beside train station"
                className="mt-1 w-full rounded border px-3 py-2 focus:border-orange-500 focus:outline-none"
              />
            </div>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="space-y-6">
            {/* Province */}
            <div>
              <label className="text-sm text-gray-600">
                Province / Region
              </label>
              <select className="mt-1 w-full rounded border bg-white px-3 py-2 focus:border-orange-500 focus:outline-none">
                <option>Please choose your province / region</option>
              </select>
            </div>

            {/* City */}
            <div>
              <label className="text-sm text-gray-600">City</label>
              <select className="mt-1 w-full rounded border bg-white px-3 py-2 focus:border-orange-500 focus:outline-none">
                <option>Please choose your city</option>
              </select>
            </div>

            {/* Zone */}
            <div>
              <label className="text-sm text-gray-600">Zone</label>
              <select className="mt-1 w-full rounded border bg-white px-3 py-2 focus:border-orange-500 focus:outline-none">
                <option>Please choose your zone</option>
              </select>
            </div>

            {/* Address */}
            <div>
              <label className="text-sm text-gray-600">Address</label>
              <input
                type="text"
                placeholder="Please enter your address"
                className="mt-1 w-full rounded border px-3 py-2 focus:border-orange-500 focus:outline-none"
              />
            </div>

            {/* ================= LABEL (RIGHT SIDE) ================= */}
            <div className="pt-2 text-left">
              <p className="mb-3 text-sm text-gray-700">
                Select a label for effective delivery:
              </p>

              <div className="flex justify-start gap-4">
                <button
                  onClick={() => setLabel("OFFICE")}
                  className={`flex items-center gap-2 rounded border px-6 py-3 text-sm
                    ${
                      label === "OFFICE"
                        ? "border-blue-500 text-blue-600"
                        : "border-gray-300 text-gray-600"
                    }
                  `}
                >
                  <FaBriefcase />
                  OFFICE
                </button>

                <button
                  onClick={() => setLabel("HOME")}
                  className={`flex items-center gap-2 rounded border px-6 py-3 text-sm
                    ${
                      label === "HOME"
                        ? "border-orange-500 text-orange-600"
                        : "border-gray-300 text-gray-600"
                    }
                  `}
                >
                  <FaHome />
                  HOME
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================= ACTION BUTTONS ================= */}
        <div className="mt-10 flex justify-end gap-4">
          <button className="rounded border bg-gray-100 px-8 py-2 text-gray-600 hover:bg-gray-200">
            Cancel
          </button>

          <button className="rounded bg-orange-500 px-10 py-2 text-white hover:bg-orange-600">
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewAddress;
