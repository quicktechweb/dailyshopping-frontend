import useSellerAuth from "../../../Hooks/useSellerAuth";

// TODO: wire the form submit to a real "update seller profile" API call.
export default function SellerSettings() {
  const { seller } = useSellerAuth();

  const fields = [
    { label: "Shop Name", value: seller?.shopName || "" },
    { label: "Mobile Number", value: seller?.mobileNumber || "" },
    { label: "Email", value: seller?.email || "" },
    { label: "City", value: seller?.city || "" },
  ];

  return (
    <div>
      <div className="mb-8">
        <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-1">
          Account
        </p>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          Settings
        </h1>
      </div>

      <div className="bg-white rounded-3xl shadow-[0_0_1px_rgba(15,23,42,0.05),0_12px_36px_-10px_rgba(15,23,42,0.16),0_2px_10px_rgba(15,23,42,0.06)] p-6 md:p-8">
        <h2 className="font-bold text-lg text-slate-900 mb-6">Shop Profile</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {fields.map((f) => (
            <div key={f.label}>
              <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1.5 block">
                {f.label}
              </label>
              <input
                defaultValue={f.value}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              />
            </div>
          ))}
        </div>

        <button className="mt-8 text-sm font-bold text-white bg-gradient-to-r from-emerald-700 to-orange-500 px-6 py-3 rounded-2xl shadow-lg shadow-emerald-700/30 hover:-translate-y-0.5 transition-all duration-300">
          Save Changes
        </button>
      </div>
    </div>
  );
}
