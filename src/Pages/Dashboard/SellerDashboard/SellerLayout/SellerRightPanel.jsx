import { Bell, ShoppingCart, ShoppingBag, DollarSign } from "lucide-react";
import RightCard from "../components/RightCard";
import useSellerStats from "../../../Hooks/useSellerStats";

// TODO: wire a real /notices endpoint when one exists on the backend.
const notices = [
  { title: "Notice title edited", time: "03:52PM, 13-Feb-2024" },
  { title: "New News", time: "12:33PM, 12-Mar-2024" },
];

export default function SellerRightPanel() {
  const { loading, stats } = useSellerStats();

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <h2 className="font-bold text-lg text-slate-900">Statistics</h2>
          <Bell size={15} className="text-slate-300" />
        </div>
        <select className="text-xs font-semibold rounded-xl px-3 py-1.5 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-200">
          <option>Last 30 days</option>
          <option>Last 7 days</option>
          <option>Today</option>
        </select>
      </div>

      <div className="space-y-3 md:space-y-4">
        <RightCard
          title="Orders"
          value={loading ? "…" : stats.totalOrders}
          accent="bg-emerald-50 text-emerald-700"
          icon={<ShoppingCart size={20} />}
        />
        <RightCard
          title="Products"
          value={loading ? "…" : stats.productsUploaded}
          accent="bg-orange-50 text-orange-600"
          icon={<ShoppingBag size={20} />}
        />
        <RightCard
          title="Total Sale"
          value={loading ? "…" : `৳${stats.totalRevenue.toLocaleString()}`}
          down={!loading && stats.totalRevenue === 0}
          accent="bg-emerald-50 text-emerald-700"
          icon={<DollarSign size={20} />}
        />
      </div>

      {/* Notices */}
      <div className="mt-8 md:mt-12 flex-1">
        <h2 className="font-bold text-lg mb-4 text-slate-900">Notices</h2>
        <ul className="text-sm space-y-3">
          {notices.map((n, i) => (
            <li
              key={i}
              className="p-3 rounded-2xl bg-white shadow-[0_0_1px_rgba(15,23,42,0.05),0_6px_18px_-6px_rgba(15,23,42,0.14),0_2px_6px_rgba(15,23,42,0.05)] hover:shadow-[0_0_1px_rgba(15,23,42,0.06),0_10px_24px_-6px_rgba(15,23,42,0.18),0_2px_8px_rgba(15,23,42,0.06)] transition-all duration-300"
            >
              <p className="font-semibold text-slate-700">{n.title}</p>
              <div className="text-[11px] text-slate-400 mt-1">{n.time}</div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
