import { useState, useEffect } from "react";
import axios from "axios";
import {
  Trophy,
  Gift,
  CalendarDays,
  Clock,
  Truck,
  DollarSign,
  User,
} from "lucide-react";
import ScrollToTop from "../../ScrollToTop/ScrollToTop";

export default function WinnerStatics() {
  const [winners, setWinners] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);

  // Fetch winners from API
  useEffect(() => {
    const fetchWinners = async () => {
      try {
        const res = await axios.get("https://serverluckyshop.luckyshop.com.bd/api/coupons/winners");
        if (res.data.success) {
          setWinners(res.data.winners);
        }
      } catch (err) {
        console.error("Failed to fetch winners:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchWinners();
  }, []);

  // Counts for each category
  const totalWinners = winners.length;
  const couponsWithWinners = winners.filter(w => w.productName.toLowerCase().includes("voucher")).length;
  const recentWinners = winners.filter(w => {
    const d = new Date(w.createdAt);
    const thirty = new Date();
    thirty.setDate(thirty.getDate() - 30);
    return d >= thirty;
  }).length;
  const pendingChoices = winners.filter(w => w.status === "pending").length;
  const shippingChoices = winners.filter(w => w.status === "shipped").length;
  const repurchaseChoices = winners.filter(w => w.status === "repurchase").length;

  // Filter table rows based on selected filter
  const filteredWinners = winners.filter((w) => {
    if (filter === "ALL" || filter === "TOTAL WINNERS") return true;
    if (filter === "COUPONS WITH WINNERS") return w.productName.toLowerCase().includes("voucher");
    if (filter === "RECENT WINNERS (30 DAYS)") {
      const d = new Date(w.createdAt);
      const thirty = new Date();
      thirty.setDate(thirty.getDate() - 30);
      return d >= thirty;
    }
    if (filter === "PENDING CHOICES") return w.status === "pending";
    if (filter === "SHIPPING CHOICES") return w.status === "shipped";
    if (filter === "REPURCHASE CHOICES") return w.status === "repurchase";
    return true;
  });

  const stats = [
    { label: "TOTAL WINNERS", icon: <Trophy className="w-6 h-6" />, count: totalWinners },
    { label: "COUPONS WITH WINNERS", icon: <Gift className="w-6 h-6" />, count: couponsWithWinners },
    { label: "RECENT WINNERS (30 DAYS)", icon: <CalendarDays className="w-6 h-6" />, count: recentWinners },
    { label: "PENDING CHOICES", icon: <Clock className="w-6 h-6" />, count: pendingChoices },
    { label: "SHIPPING CHOICES", icon: <Truck className="w-6 h-6" />, count: shippingChoices },
    { label: "REPURCHASE CHOICES", icon: <DollarSign className="w-6 h-6" />, count: repurchaseChoices },
  ];

  if (loading) {
    return <div className="p-6 text-center text-gray-500">Loading winners…</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <ScrollToTop />

      {/* ===== Winners Statistics ===== */}
      <section className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800">
          Winners Statistics
        </h1>
        <p className="text-center text-gray-500 mt-1 mb-8">
          Click a card to filter the table below
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {stats.map((item) => (
            <button
              key={item.label}
              onClick={() => setFilter(item.label)}
              className={`bg-white border rounded-lg shadow-sm p-5 flex flex-col items-center text-center transition 
                ${filter === item.label ? "border-green-600 ring-2 ring-green-600" : "border-gray-200 hover:border-green-400"}`}
            >
              <div className="text-green-600">{item.icon}</div>
              <p className="text-3xl font-bold text-gray-900 mt-2">{item.count}</p>
              <p className="text-sm font-medium text-gray-700 mt-1">{item.label}</p>
            </button>
          ))}
        </div>
      </section>

      {/* ===== Winners Table ===== */}
      <section className="max-w-6xl mx-auto mt-12 mb-28 md:mb-0">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          {filter === "ALL" ? "All Winners" : filter}
        </h2>
        <p className="text-center text-gray-500 mt-1 mb-6">
          {filter === "ALL"
            ? "Latest lucky winners and their prizes"
            : `Showing results for: ${filter}`}
        </p>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-md">
            <thead>
              <tr className="bg-green-600 text-white">
                <th className="py-3 px-4 text-left font-medium flex items-center gap-1">
                  <User className="w-4 h-4" /> WINNER
                </th>
                <th className="py-3 px-4 text-left font-medium">🎁 COUPON PRODUCT</th>
                <th className="py-3 px-4 text-left font-medium">🎫 WINNING TICKET</th>
                <th className="py-3 px-4 text-left font-medium">🗓 WON DATE</th>
              </tr>
            </thead>
            <tbody>
              {filteredWinners.length > 0 ? (
                filteredWinners.map((w, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4 text-gray-800 font-medium">{w.username}</td>
                    <td className="py-3 px-4 text-gray-700">{w.productName}</td>
                    <td className="py-3 px-4 text-gray-700">{w.couponId}</td>
                    <td className="py-3 px-4 text-gray-700">{new Date(w.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500">
                    No winners found for this category.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
