export default function EditProfile() {
  return (
    <div className=" -mt-10">
      <div className="max-w-6xl mx-auto px-6">
        {/* TITLE */}
        <h1 className="text-xl font-semibold text-gray-800 mb-6">
          Edit Profile
        </h1>

        {/* CARD */}
        <div className="bg-white p-10">
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
                  defaultValue="Rezwan Rashid"
                  className="w-full border border-gray-300 px-3 py-2 pr-10 text-sm focus:outline-none"
                />

                {/* CLEAR ICON */}
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">
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
                an*********@gmail.com
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
                +880 172*****18
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
                  defaultValue="08"
                  className="w-16 border border-gray-300 px-2 py-2 text-sm focus:outline-none"
                />
                <input
                  type="number"
                  defaultValue="19"
                  className="w-16 border border-gray-300 px-2 py-2 text-sm focus:outline-none"
                />
                <input
                  type="number"
                  defaultValue="2000"
                  className="w-24 border border-gray-300 px-2 py-2 text-sm focus:outline-none"
                />
              </div>
            </div>

            {/* GENDER */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Gender
              </label>

              <select className="border border-gray-300 px-3 py-2 text-sm w-40 focus:outline-none">
                <option>male</option>
                <option>female</option>
                <option>other</option>
              </select>
            </div>
          </div>

          {/* SAVE BUTTON */}
          <div className="mt-16">
            <button className="bg-[#f57224] hover:bg-[#e5671f] text-white px-14 py-3 text-sm font-semibold">
              SAVE CHANGES
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
