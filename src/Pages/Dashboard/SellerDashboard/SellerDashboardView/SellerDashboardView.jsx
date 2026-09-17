import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Store,
  Box,
  Truck,
  CheckCircle,
  XCircle,
  ShoppingCart,
  ChevronRight,
  DollarSign,
  Package,
  Boxes,
} from "lucide-react";
import { Line, Doughnut, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Filler,
} from "chart.js";
import StatCard from "../components/StatCard";
import { ChartCard, EmptyChartState } from "../components/ChartCard";
import useSellerStats from "../../../Hooks/useSellerStats";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Filler
);

const STATUS_COLORS = {
  Pending: "#f59e0b",
  Approved: "#3b82f6",
  "In Transit": "#6366f1",
  "Out for Delivery": "#8b5cf6",
  Delivered: "#059669",
  Returned: "#eab308",
  Canceled: "#ef4444",
  "On Hold": "#a855f7",
  Damaged: "#ec4899",
};

const chartBaseOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    x: { grid: { display: false }, ticks: { color: "#94a3b8", font: { size: 10, weight: "600" } } },
    y: { grid: { color: "#f1f5f9" }, ticks: { color: "#94a3b8", font: { size: 10 } }, beginAtZero: true },
  },
};

const legendBottomSmall = {
  position: "bottom",
  labels: { boxWidth: 8, padding: 10, font: { size: 10, weight: "600" }, color: "#475569" },
};

export default function SellerDashboardView() {
  const {
    loading,
    stats,
    statusDistribution,
    revenueTrend,
    avgOrderValueTrend,
    topProducts,
    recentOrders,
  } = useSellerStats();

  const revenueChartData = useMemo(
    () => ({
      labels: revenueTrend.map((d) => d.label),
      datasets: [
        {
          label: "Revenue (৳)",
          data: revenueTrend.map((d) => d.revenue),
          borderColor: "#047857",
          backgroundColor: (ctx) => {
            const { chartArea, ctx: canvasCtx } = ctx.chart;
            if (!chartArea) return "rgba(4,120,87,0.15)";
            const g = canvasCtx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
            g.addColorStop(0, "rgba(4,120,87,0.28)");
            g.addColorStop(1, "rgba(4,120,87,0)");
            return g;
          },
          fill: true,
          tension: 0.4,
          pointRadius: 2.5,
          pointBackgroundColor: "#047857",
          pointBorderColor: "#fff",
          pointBorderWidth: 1.5,
        },
      ],
    }),
    [revenueTrend]
  );

  const ordersVsDeliveredData = useMemo(
    () => ({
      labels: revenueTrend.map((d) => d.label),
      datasets: [
        { label: "Orders", data: revenueTrend.map((d) => d.count), backgroundColor: "#f97316", borderRadius: 6, maxBarThickness: 16 },
        { label: "Delivered", data: revenueTrend.map((d) => d.delivered), backgroundColor: "#047857", borderRadius: 6, maxBarThickness: 16 },
      ],
    }),
    [revenueTrend]
  );

  const statusChartData = useMemo(
    () => ({
      labels: statusDistribution.map((s) => s.label),
      datasets: [
        {
          data: statusDistribution.map((s) => s.value),
          backgroundColor: statusDistribution.map((s) => STATUS_COLORS[s.label] || "#94a3b8"),
          borderWidth: 0,
          hoverOffset: 6,
        },
      ],
    }),
    [statusDistribution]
  );

  const stockChartData = useMemo(
    () => ({
      labels: ["In Stock", "Low Stock", "Out of Stock"],
      datasets: [
        {
          label: "Products",
          data: [stats.inStockCount, stats.lowStockCount, stats.outOfStockCount],
          backgroundColor: ["#059669", "#f59e0b", "#ef4444"],
          borderRadius: 8,
          maxBarThickness: 22,
        },
      ],
    }),
    [stats]
  );

  const topProductsChartData = useMemo(
    () => ({
      labels: topProducts.map((p) => (p.title.length > 14 ? p.title.slice(0, 14) + "…" : p.title)),
      datasets: [
        {
          label: "Units Ordered",
          data: topProducts.map((p) => p.qty),
          backgroundColor: "#f97316",
          borderRadius: 8,
          maxBarThickness: 22,
        },
      ],
    }),
    [topProducts]
  );

  const avgOrderValueChartData = useMemo(
    () => ({
      labels: avgOrderValueTrend.map((d) => d.label),
      datasets: [
        {
          label: "Avg. Order Value (৳)",
          data: avgOrderValueTrend.map((d) => d.avgValue),
          borderColor: "#3b82f6",
          backgroundColor: (ctx) => {
            const { chartArea, ctx: canvasCtx } = ctx.chart;
            if (!chartArea) return "rgba(59,130,246,0.15)";
            const g = canvasCtx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
            g.addColorStop(0, "rgba(59,130,246,0.25)");
            g.addColorStop(1, "rgba(59,130,246,0)");
            return g;
          },
          fill: true,
          tension: 0.4,
          pointRadius: 2.5,
          pointBackgroundColor: "#3b82f6",
          pointBorderColor: "#fff",
          pointBorderWidth: 1.5,
        },
      ],
    }),
    [avgOrderValueTrend]
  );

  const customerChartData = useMemo(
    () => ({
      labels: ["New Customers", "Returning Customers"],
      datasets: [
        {
          data: [stats.newCustomers, stats.returningCustomers],
          backgroundColor: ["#6366f1", "#059669"],
          borderWidth: 0,
        },
      ],
    }),
    [stats]
  );

  const fulfillmentChartData = useMemo(
    () => ({
      labels: ["Delivered", "Remaining"],
      datasets: [
        {
          data: [stats.fulfillmentRate, 100 - stats.fulfillmentRate],
          backgroundColor: ["#047857", "#e2e8f0"],
          borderWidth: 0,
          circumference: 180,
          rotation: 270,
        },
      ],
    }),
    [stats]
  );

  const hasCustomerData = stats.newCustomers + stats.returningCustomers > 0;

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12 gap-4">
        <div>
          <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-1">
            Overview
          </p>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Dashboard
          </h1>
        </div>
        <Link to="/sellershop">
          <button className="group flex items-center gap-2 text-sm font-bold text-white bg-gradient-to-r from-emerald-700 to-orange-500 px-5 py-3 rounded-2xl shadow-lg shadow-emerald-700/30 hover:shadow-xl hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all duration-300">
            VIEW YOUR STORE
            <Store size={16} className="group-hover:rotate-6 transition-transform" />
          </button>
        </Link>
      </div>

      {/* Stats — 8 cards, 4 per row across 2 rows */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10 md:mb-14">
        <StatCard
          title="Pending Orders"
          value={loading ? "…" : stats.pending}
          tint="bg-amber-50 text-amber-600"
          icon={<Box size={22} />}
        />
        <StatCard
          title="Approved Orders"
          value={loading ? "…" : stats.approved}
          tint="bg-blue-50 text-blue-600"
          icon={<Truck size={22} />}
        />
        <StatCard
          title="Delivered Orders"
          value={loading ? "…" : stats.delivered}
          tint="bg-emerald-50 text-emerald-700"
          icon={<CheckCircle size={22} />}
        />
        <StatCard
          title="Cancelled / Returned"
          value={loading ? "…" : stats.cancelled}
          tint="bg-rose-50 text-rose-600"
          icon={<XCircle size={22} />}
        />

        <StatCard
          title="Total Orders"
          value={loading ? "…" : stats.totalOrders}
          tint="bg-indigo-50 text-indigo-600"
          icon={<ShoppingCart size={22} />}
        />
        <StatCard
          title="Total Revenue"
          value={loading ? "…" : `৳${stats.totalRevenue.toLocaleString()}`}
       subtitle={
  loading
    ? "Delivered orders, after commission"
    : `Total order price ৳${stats.totalGrossRevenue.toLocaleString()} → after commission ৳${stats.totalRevenue.toLocaleString()}`
}
          tint="bg-emerald-50 text-emerald-700"
          icon={<DollarSign size={22} />}
        />
        <StatCard
          title="Products Uploaded"
          value={loading ? "…" : stats.productsUploaded}
          tint="bg-orange-50 text-orange-600"
          icon={<Package size={22} />}
        />
        <StatCard
          title="Stock in Hand"
          value={loading ? "…" : stats.inStockUnits}
          subtitle="Total units across products"
          tint="bg-teal-50 text-teal-600"
          icon={<Boxes size={22} />}
        />
      </div>

      {/* Charts — 8 distinct, professional charts, 4 per row across 2 rows */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 md:gap-6 mb-10 md:mb-14">
        <ChartCard title="Revenue Trend" subtitle="Last 7 days · ৳">
          <Line data={revenueChartData} options={chartBaseOptions} />
        </ChartCard>

        <ChartCard title="Order Status" subtitle="Share of all orders">
          {statusDistribution.length > 0 ? (
            <Doughnut
              data={statusChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                cutout: "68%",
                plugins: { legend: legendBottomSmall },
              }}
            />
          ) : (
            <EmptyChartState text="No orders yet" />
          )}
        </ChartCard>

        <ChartCard title="Orders vs Delivered" subtitle="Last 7 days">
          <Bar
            data={ordersVsDeliveredData}
            options={{ ...chartBaseOptions, plugins: { legend: legendBottomSmall } }}
          />
        </ChartCard>

        <ChartCard title="Stock Health" subtitle="Inventory status">
          {stats.productsUploaded > 0 ? (
            <Bar
              data={stockChartData}
              options={{
                indexAxis: "y",
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  x: { grid: { color: "#f1f5f9" }, ticks: { color: "#94a3b8", font: { size: 10 } }, beginAtZero: true },
                  y: { grid: { display: false }, ticks: { color: "#475569", font: { size: 11, weight: "600" } } },
                },
              }}
            />
          ) : (
            <EmptyChartState text="No products yet" />
          )}
        </ChartCard>

        <ChartCard title="Top Selling Products" subtitle="By units ordered">
          {topProducts.length > 0 ? (
            <Bar
              data={topProductsChartData}
              options={{
                indexAxis: "y",
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  x: { grid: { color: "#f1f5f9" }, ticks: { color: "#94a3b8", font: { size: 10 } }, beginAtZero: true },
                  y: { grid: { display: false }, ticks: { color: "#475569", font: { size: 10, weight: "600" } } },
                },
              }}
            />
          ) : (
            <EmptyChartState text="No sales yet" />
          )}
        </ChartCard>

        <ChartCard title="Avg. Order Value" subtitle="Last 7 days · ৳">
          <Line data={avgOrderValueChartData} options={chartBaseOptions} />
        </ChartCard>

        <ChartCard title="Customer Mix" subtitle="New vs returning">
          {hasCustomerData ? (
            <Pie
              data={customerChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: legendBottomSmall },
              }}
            />
          ) : (
            <EmptyChartState text="No customers yet" />
          )}
        </ChartCard>

        <ChartCard title="Fulfillment Rate" subtitle="Delivered ÷ total orders" height="h-56 relative">
          {stats.totalOrders > 0 ? (
            <>
              <Doughnut
                data={fulfillmentChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  cutout: "75%",
                  plugins: { legend: { display: false }, tooltip: { enabled: false } },
                }}
              />
              <div className="absolute inset-x-0 top-[58%] -translate-y-1/2 text-center pointer-events-none">
                <span className="text-2xl font-black text-slate-900">{stats.fulfillmentRate}%</span>
              </div>
            </>
          ) : (
            <EmptyChartState text="No orders yet" />
          )}
        </ChartCard>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-3xl shadow-[0_0_1px_rgba(15,23,42,0.05),0_12px_36px_-10px_rgba(15,23,42,0.16),0_2px_10px_rgba(15,23,42,0.06)] p-6 md:p-8 hover:shadow-[0_0_1px_rgba(15,23,42,0.06),0_16px_44px_-10px_rgba(15,23,42,0.2),0_2px_12px_rgba(15,23,42,0.08)] transition-all duration-300 mb-10">
        <div className="flex items-center justify-between mb-1">
          <h2 className="font-bold text-lg text-slate-900">Recent Orders</h2>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
            Live
          </span>
        </div>

        {recentOrders.length === 0 ? (
          <>
            <p className="text-sm text-slate-400 mb-2">No recent orders found.</p>
            <div className="flex flex-col items-center justify-center py-10 text-center border-2 border-dashed border-slate-200 rounded-2xl">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-3">
                <ShoppingCart size={24} className="text-slate-300" />
              </div>
              <p className="text-sm text-slate-400">Your orders will show up here</p>
            </div>
          </>
        ) : (
          <div className="overflow-x-auto -mx-2">
            <table className="w-full text-sm min-w-[520px]">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-100">
                  <th className="py-3 px-2 font-bold">Customer</th>
                  <th className="py-3 px-2 font-bold">Product</th>
                  <th className="py-3 px-2 font-bold">Status</th>
                  <th className="py-3 px-2 font-bold text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order._id} className="border-b border-slate-50 last:border-0">
                    <td className="py-3 px-2 font-semibold text-slate-700">
                      {order.customer?.name || "—"}
                    </td>
                    <td className="py-3 px-2 text-slate-500 truncate max-w-[180px]">
                      {order.products?.[0]?.title}
                      {order.products?.length > 1 ? ` +${order.products.length - 1} more` : ""}
                    </td>
                    <td className="py-3 px-2">
                      <span className="text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right font-bold text-slate-900">
                      ৳{Number(order.totals?.grandtotal || 0).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Link
          to="../orders"
          className="group flex items-center gap-1 text-emerald-700 text-sm mt-6 font-bold hover:gap-2 transition-all w-fit"
        >
          View Full Orders
          <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
