import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import {
  Home,
  Package,
  ShoppingCart,
  MessageCircle,
  Wallet,
  Settings,
  BookOpen,
  ShoppingBag,
  TrendingUp,
  BadgeCheck,
} from "lucide-react";
import useSellerAuth from "../../../Hooks/useSellerAuth";

// Path is relative to the parent "/sellerview" route.
const NAV_ITEMS = [
  { label: "Dashboard", icon: Home, path: "" },
  { label: "Products", icon: Package, path: "products" },
  { label: "Show All Product", icon: Package, path: "showallproduct" },
  { label: "Orders", icon: ShoppingCart, path: "orders" },
  { label: "Verification Request", icon: ShoppingCart, path: "sellerverification" },
  // { label: "Purchase", icon: BookOpen, path: "purchase" },
  { label: "Messages", icon: MessageCircle, path: "messages" },
  { label: "Wallet", icon: Wallet, path: "wallet" },
  { label: "Low Stock", icon: BookOpen, path: "lowstock" },
  { label: "Stock Out", icon: BookOpen, path: "stockout" },
  { label: "Settings", icon: Settings, path: "settings" },
];

export default function SellerSidebar({ onNavigate }) {
  const { seller } = useSellerAuth();
  const [balance, setBalance] = useState(Number(seller?.walletBalance || 0));

  useEffect(() => {
    // seller context theke initial value set kore rakhi
    setBalance(Number(seller?.walletBalance || 0));

    const fetchBalance = async () => {
      if (!seller?._id) return;
      try {
        const res = await axios.get(`https://dailyshopping-backend.onrender.com/api/sellers/${seller._id}`);
        setBalance(Number(res.data?.walletBalance || 0));
      } catch (err) {
        console.error("Failed to fetch sidebar wallet balance:", err);
      }
    };

    fetchBalance();
  }, [seller]);

  const sellerName = seller?.shopName || seller?.name || "Seller";
  const isActive = seller?.status === "active";
  const initial = sellerName?.[0]?.toUpperCase() || "S";

  return (
    <>
      {/* Logo */}
      <div className="flex items-center gap-3 mb-10">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg shadow-orange-500/30 flex items-center justify-center">
          <ShoppingBag size={20} className="text-white" />
        </div>
        <h1 className="text-xl font-black tracking-tight text-slate-900">
          <span className="text-emerald-700">Daily</span>
          <span className="text-orange-500">Shopping</span>
        </h1>
      </div>

      {/* User */}
      <div className="flex items-center gap-3 mb-6 p-3 rounded-2xl bg-white shadow-sm">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-orange-500 flex items-center justify-center text-white font-bold text-sm">
          {initial}
        </div>
        <div className="min-w-0">
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
            Welcome back
          </p>
          <h3 className="font-bold text-slate-800 text-sm truncate flex items-center gap-1">
            {sellerName}
            {seller?.verified && (
              <BadgeCheck size={15} className="text-emerald-600 shrink-0" />
            )}
          </h3>
        </div>
      </div>

      {/* Status */}
      <div
        className={`flex items-center justify-center gap-2 text-[11px] rounded-2xl px-4 py-2.5 mb-6 font-bold tracking-wide ${
          isActive ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
        }`}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-emerald-500" : "bg-rose-500"}`}
        />
        CURRENT STATUS · {isActive ? "ACTIVE" : "INACTIVE"}
      </div>

      {/* Balance */}
      <div className="mb-8 p-5 rounded-3xl bg-gradient-to-br from-emerald-700 to-emerald-900 shadow-lg shadow-emerald-900/20 text-white relative overflow-hidden">
        <div className="absolute -top-8 -right-8 w-28 h-28 bg-white/10 rounded-full blur-2xl" />
        <p className="text-[10px] text-emerald-200 uppercase tracking-widest font-semibold relative">
          Total Balance
        </p>
        <h2 className="text-3xl font-extrabold mt-1 relative">৳ {balance.toFixed(2)}</h2>
        <div className="flex items-center gap-1 mt-2 text-[11px] text-emerald-200 relative">
          <TrendingUp size={12} />
          <span>{balance > 0 ? "Updated just now" : "No activity yet"}</span>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 space-y-1.5 text-sm">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            end={item.path === ""}
            onClick={onNavigate}
          >
            {({ isActive: linkActive }) => (
              <div
                className={`relative flex items-center gap-3 px-4 py-3 rounded-2xl cursor-pointer transition-all duration-200 ${
                  linkActive
                    ? "bg-emerald-700 text-white font-semibold shadow-md shadow-emerald-700/20"
                    : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                }`}
              >
                <item.icon size={19} />
                <span>{item.label}</span>
                {linkActive && (
                  <span className="absolute right-3 w-1.5 h-1.5 rounded-full bg-orange-300" />
                )}
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="mt-auto text-center pt-6">
        <h2 className="text-lg font-black">
          <span className="text-emerald-700">Daily</span>
          <span className="text-orange-500">Shopping</span>
        </h2>
        <p className="text-[10px] text-slate-400 mt-1.5">
          © 2026 Daily Shopping. All rights reserved.
        </p>
      </div>
    </>
  );
}