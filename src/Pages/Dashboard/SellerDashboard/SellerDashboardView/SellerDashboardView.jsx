import { useState } from "react";
import {
  Home,
  Package,
  ShoppingCart,
  MessageCircle,
  Wallet,
  Settings,
  BookOpen,
  Store,
  Box,
  Truck,
  CheckCircle,
  ShoppingBag,
  DollarSign,
  Menu,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import ScrollToTop from "../../../HomePage/ScrollToTop/ScrollToTop";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 font-sans">
        <ScrollToTop/>

      {/* ================= MOBILE TOGGLE BUTTON ================= */}
      <button
        className="md:hidden fixed top-36 left-4 z-50 p-2 bg-white/80 backdrop-blur-lg rounded-xl shadow-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* ================= LEFT SIDEBAR ================= */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white/30 backdrop-blur-3xl border-r border-white/30 px-6 py-6 flex flex-col shadow-xl z-40
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:flex`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 mb-12">
          <div className="w-12 h-12  rounded-2xl shadow-lg">
            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
            DailyShop
          </h1>
        </div>

        {/* User */}
        <div className="mb-6">
          <p className="text-[11px] text-gray-400 uppercase tracking-widest">
            Welcome back
          </p>
          <h3 className="font-semibold text-gray-800 text-lg">Tonmoy</h3>
        </div>

        {/* Status */}
        <div className="bg-red-100 text-red-600 text-xs rounded-full px-4 py-2 text-center mb-8 font-semibold tracking-wide shadow-sm">
          CURRENT STATUS · INACTIVE
        </div>

        {/* Balance */}
        <div className="mb-10">
          <p className="text-xs text-gray-400 uppercase tracking-widest">
            Total Balance
          </p>
          <h2 className="text-3xl font-extrabold text-gray-900">
            ৳ 0.00
          </h2>
        </div>

        {/* Menu */}
        <nav className="flex-1 space-y-2 text-sm">
          <MenuItem icon={<Home size={20} />} label="Dashboard" active />
          <MenuItem icon={<Package size={20} />} label="Products" />
          <MenuItem icon={<ShoppingCart size={20} />} label="Orders" />
          <MenuItem icon={<BookOpen size={20} />} label="Purchase" />
          <MenuItem icon={<MessageCircle size={20} />} label="Messages" />
          <MenuItem icon={<Wallet size={20} />} label="Wallet" />
          <MenuItem icon={<BookOpen size={20} />} label="Ledger" />
          <MenuItem icon={<Settings size={20} />} label="Settings" />
        </nav>

        {/* Footer */}
        <div className="mt-auto text-center pt-6 border-t border-white/30">
          <h2 className="text-2xl font-extrabold">
            <span className="text-indigo-600">Daily</span>
            <span className="text-pink-500">Shop</span>
          </h2>
          <p className="text-xs text-gray-400 mt-2">
            © 2026 Daily Shopping. All rights reserved.
          </p>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 px-4 md:px-12 py-10 overflow-y-auto">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-14">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Dashboard
            </h1>
            <Link to="/sellershop">
             <button className="flex items-center gap-2 mt-3 md:mt-0 text-sm font-semibold text-white bg-indigo-600 px-4 py-2 rounded-xl shadow hover:bg-indigo-700 transition">
              VIEW YOUR STORE <Store size={16} />
            </button>
            </Link>
           
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mb-10 md:mb-14">
            <StatCard 
              title="Pending Orders" 
              value="0" 
              gradient="from-yellow-200 via-yellow-100 to-yellow-50"
              icon={<Box size={28} className="text-yellow-600" />}
            />
            <StatCard 
              title="Ready to Ship" 
              value="0" 
              gradient="from-orange-200 via-orange-100 to-orange-50"
              icon={<Truck size={28} className="text-orange-500" />}
            />
            <StatCard 
              title="Shipped Orders" 
              value="0" 
              gradient="from-green-200 via-green-100 to-green-50"
              icon={<CheckCircle size={28} className="text-green-600" />}
            />
          </div>

          {/* Recent Orders */}
          <div className="bg-white/50 backdrop-blur-xl rounded-3xl shadow-lg p-6 md:p-8 hover:shadow-2xl transition mb-10">
            <h2 className="font-semibold text-lg mb-2 text-gray-900">
              Recent Orders
            </h2>
            <p className="text-sm text-gray-500">
              No recent orders found.
            </p>
            <button className="text-indigo-600 text-sm mt-4 font-semibold hover:underline">
              View Full Orders →
            </button>
          </div>
        </div>
      </main>

      {/* ================= RIGHT SIDEBAR ================= */}
      <aside className="w-full md:w-80 bg-white/30 backdrop-blur-3xl border-t md:border-t-0 md:border-l border-white/30 p-4 md:p-8 shadow-xl flex flex-col mt-6 md:mt-0">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-semibold text-lg text-gray-900">
            Statistics
          </h2>
          <select className="text-sm border border-gray-200 rounded-lg px-3 py-1 bg-white/50 focus:outline-none">
            <option>Last 30 days</option>
          </select>
        </div>

        <div className="space-y-4 md:space-y-6">
          <RightCard 
            title="Orders" 
            value="0" 
            icon={<ShoppingCart size={22} className="text-indigo-600" />} 
          />
          <RightCard 
            title="Products" 
            value="0" 
            icon={<ShoppingBag size={22} className="text-pink-500" />} 
          />
          <RightCard 
            title="Total Sale" 
            value="৳0" 
            down 
            icon={<DollarSign size={22} className="text-green-600" />} 
          />
        </div>

        {/* Notices */}
        <div className="mt-6 md:mt-12 flex-1">
          <h2 className="font-semibold text-lg mb-4 text-gray-900">
            Notices
          </h2>
          <ul className="text-sm space-y-4 text-gray-600">
            <li className="border-l-2 border-indigo-500 pl-3">
              Notice title edited
              <div className="text-xs text-gray-400">
                03:52PM, 13-Feb-2024
              </div>
            </li>
            <li className="border-l-2 border-indigo-500 pl-3">
              New News
              <div className="text-xs text-gray-400">
                12:33PM, 12-Mar-2024
              </div>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function MenuItem({ icon, label, active }) {
  return (
    <div
      className={`relative flex items-center gap-3 px-4 py-3 rounded-2xl cursor-pointer transition-all hover:bg-white/40 ${
        active
          ? "bg-indigo-600/20 text-indigo-600 font-semibold shadow-md"
          : "text-gray-700"
      }`}
    >
      {active && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1.5 bg-indigo-600 rounded-r-full"></span>
      )}
      {icon}
      {label}
    </div>
  );
}

function StatCard({ title, value, gradient, icon }) {
  return (
    <div
      className={`bg-gradient-to-br ${gradient} rounded-3xl p-4 md:p-6 flex items-center gap-4 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
    >
      <div className="w-12 h-12 md:w-14 md:h-14 bg-white/70 rounded-xl flex items-center justify-center shadow-inner">
        {icon}
      </div>
      <div>
        <p className="text-xs md:text-sm text-gray-500 uppercase tracking-widest">
          {title}
        </p>
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">{value}</h2>
      </div>
    </div>
  );
}

function RightCard({ title, value, down, icon }) {
  return (
    <div className="bg-white/50 backdrop-blur-xl rounded-2xl p-4 md:p-5 flex items-center gap-4 shadow hover:shadow-lg transition duration-300">
      <div className="w-12 h-12 bg-white/70 rounded-xl flex items-center justify-center shadow-inner">
        {icon}
      </div>
      <div>
        <p className="text-xs md:text-sm text-gray-500 uppercase tracking-widest">
          {title}
        </p>
        <h2 className="text-xl font-extrabold text-gray-900">
          {value} {down && <span className="text-red-500 text-sm">↓</span>}
        </h2>
      </div>
    </div>
  );
}
