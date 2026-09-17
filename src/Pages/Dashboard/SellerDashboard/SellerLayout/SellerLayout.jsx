import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import ScrollToTop from "../../../HomePage/ScrollToTop/ScrollToTop";
import SellerSidebar from "./SellerSidebar";
import SellerRightPanel from "./SellerRightPanel";

/**
 * SellerLayout
 * -------------------------------------------------------
 * - Left sidebar  : fixed, full-height, always mounted.
 * - Right panel   : fixed, full-height, always mounted.
 * - Middle column : <Outlet/> — this is the ONLY part that
 *   re-renders when a sidebar link is clicked. Clicking
 *   "Products" swaps in the Products page; clicking "Wallet"
 *   swaps in the Wallet page; the two side panels never
 *   unmount or reset.
 */
export default function SellerLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans">
      <ScrollToTop />

      {/* Mobile sidebar toggle */}
      <button
        className="md:hidden fixed top-36 left-4 z-50 p-3 bg-white rounded-2xl shadow-[0_8px_24px_-4px_rgba(15,23,42,0.18)]"
        onClick={() => setSidebarOpen((v) => !v)}
      >
        {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ============== LEFT SIDEBAR (fixed) ============== */}
      <aside
        className={`fixed top-0 left-0 h-screen w-72 z-40 bg-white px-6 py-8 flex flex-col
          shadow-[0_0_1px_rgba(15,23,42,0.05),0_10px_40px_-8px_rgba(15,23,42,0.16),0_2px_10px_rgba(15,23,42,0.06)]
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <SellerSidebar onNavigate={() => setSidebarOpen(false)} />
      </aside>

      {/* ============== RIGHT PANEL (fixed) ============== */}
      <aside
        className="hidden lg:flex fixed top-0 right-0 h-screen w-80 z-30 bg-white p-8 flex-col overflow-y-auto
          shadow-[0_0_1px_rgba(15,23,42,0.05),0_10px_40px_-8px_rgba(15,23,42,0.16),0_2px_10px_rgba(15,23,42,0.06)]"
      >
        <SellerRightPanel />
      </aside>

      {/* ============== MIDDLE (dynamic, Outlet) ============== */}
      <main className="min-h-screen overflow-y-auto bg-white px-4 py-10 md:px-8 md:ml-72 lg:px-12 lg:mr-80">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Stats panel content repeated below the page on small/medium screens
          (right column is hidden there since there's no room for a 3rd fixed rail) */}
      <div className="lg:hidden px-4 pb-10 md:px-8 md:ml-72">
        <div className="max-w-7xl mx-auto">
          <SellerRightPanel />
        </div>
      </div>
    </div>
  );
}
