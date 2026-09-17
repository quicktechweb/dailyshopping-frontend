import { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import useSellerAuth from "./useSellerAuth";

// TODO: point this to your real backend base URL (or read from an env var)
const API_BASE = "https://dailyshopping-backend.onrender.com/api";

// Matches the order.status values used across UpdateOrder / AllUserOrder
export const STATUS_LABELS = {
  pending: "Pending",
  accepted: "Approved",
  intransit: "In Transit",
  outfordelivery: "Out for Delivery",
  delivered: "Delivered",
  returned: "Returned",
  canceled: "Canceled",
  hold: "On Hold",
  damage: "Damaged",
};

const dayKey = (d) => new Date(d).toISOString().slice(0, 10);

// Seller's actual earning from one order, AFTER admin commission is deducted.
// Shipping is excluded (it isn't seller income) and each product line's own
// adminCommission % (copied onto the order line when the order was placed)
// is applied to that line, not to the whole grandtotal.
const getSellerEarning = (order) =>
  (order.products || []).reduce((sum, p) => {
    const lineTotal =
      (Number(p.ProductPrice) || 0) * (Number(p.quantity) || 0) -
      (Number(p.itemDiscount) || 0);
    const commissionPct = Number(p.adminCommission) || 0;
    const sellerShare = lineTotal * (1 - commissionPct / 100);
    return sum + Math.max(sellerShare, 0);
  }, 0);

  const getOrderGrossAmount = (order) =>
  (order.products || []).reduce((sum, p) => {
    const lineTotal =
      (Number(p.ProductPrice) || 0) * (Number(p.quantity) || 0) -
      (Number(p.itemDiscount) || 0);
    return sum + Math.max(lineTotal, 0);
  }, 0);

  const getOrderCommission = (order) =>
  (order.products || []).reduce((sum, p) => {
    const lineTotal =
      (Number(p.ProductPrice) || 0) * (Number(p.quantity) || 0) -
      (Number(p.itemDiscount) || 0);
    const commissionPct = Number(p.adminCommission) || 0;
    return sum + Math.max(lineTotal * (commissionPct / 100), 0);
  }, 0);
/**
 * useSellerStats
 * ------------------------------------------------------------------
 * Single source of truth for the seller dashboard's numbers & charts.
 *
 *  - GET /api/seller-orders/:sellerId   -> res.data.orders
 *  - GET /api/products/seller/:sellerId -> res.data.data
 *
 * Both SellerDashboardView and SellerRightPanel import this hook so
 * every number on screen comes from the same live data.
 */
export default function useSellerStats() {
  const { seller } = useSellerAuth();
  const sellerId = seller?.sellerId;

  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAll = useCallback(async () => {
    if (!sellerId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const [ordersRes, productsRes] = await Promise.allSettled([
        axios.get(`${API_BASE}/seller-orders/${sellerId}`),
        axios.get(`${API_BASE}/products/seller/${sellerId}`),
      ]);

      setOrders(
        ordersRes.status === "fulfilled" ? ordersRes.value.data?.orders || [] : []
      );
      setProducts(
        productsRes.status === "fulfilled" ? productsRes.value.data?.data || [] : []
      );

      if (ordersRes.status === "rejected" && productsRes.status === "rejected") {
        setError("Failed to load dashboard data");
      }
    } catch (err) {
      console.error("useSellerStats fetch error:", err);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  }, [sellerId]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const derived = useMemo(() => {
    const countByStatus = (status) => orders.filter((o) => o.status === status).length;

    const pending = countByStatus("pending");
    const approved = countByStatus("accepted");
    const delivered = countByStatus("delivered");
    const cancelled = countByStatus("canceled") + countByStatus("returned");
    const totalOrders = orders.length;

    // Total Revenue = sum of seller earnings (commission already deducted)
    // for orders that have actually been delivered.
    const totalRevenue = orders
      .filter((o) => o.status === "delivered")
      .reduce((sum, o) => sum + getSellerEarning(o), 0);

      const totalGrossRevenue = orders
  .filter((o) => o.status === "delivered")
  .reduce((sum, o) => sum + getOrderGrossAmount(o), 0);

      const totalCommission = orders
  .filter((o) => o.status === "delivered")
  .reduce((sum, o) => sum + getOrderCommission(o), 0);

    const productsUploaded = products.length;
    const inStockUnits = products.reduce((sum, p) => sum + (Number(p.stock) || 0), 0);
    const lowStockCount = products.filter(
      (p) => Number(p.stock) > 0 && Number(p.stock) <= 5
    ).length;
    const outOfStockCount = products.filter((p) => Number(p.stock) === 0).length;
    const inStockCount = products.filter((p) => Number(p.stock) > 5).length;

    const statusDistribution = Object.entries(STATUS_LABELS)
      .map(([key, label]) => ({ key, label, value: countByStatus(key) }))
      .filter((s) => s.value > 0);

    // Last 7 days: revenue trend + orders-placed vs orders-delivered
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d;
    });

    const revenueTrend = days.map((d) => {
      const key = dayKey(d);
      const dayOrders = orders.filter((o) => o.createdAt && dayKey(o.createdAt) === key);
      const revenue = dayOrders
        .filter((o) => o.status === "delivered")
        .reduce((sum, o) => sum + getSellerEarning(o), 0);
      return {
        label: d.toLocaleDateString("en-US", { weekday: "short" }),
        revenue,
        count: dayOrders.length,
        delivered: dayOrders.filter((o) => o.status === "delivered").length,
      };
    });

    // Average order value per day (last 7 days) — separate signal from raw revenue
    const avgOrderValueTrend = revenueTrend.map((d) => ({
      label: d.label,
      avgValue: d.count > 0 ? Math.round(d.revenue / d.count) : 0,
    }));

    // Top 5 products by quantity actually ordered (from order line items)
    const quantityByTitle = {};
    orders.forEach((o) => {
      (o.products || []).forEach((p) => {
        const title = p.title || "Untitled";
        quantityByTitle[title] = (quantityByTitle[title] || 0) + (Number(p.quantity) || 0);
      });
    });
    const topProducts = Object.entries(quantityByTitle)
      .map(([title, qty]) => ({ title, qty }))
      .sort((a, b) => b.qty - a.qty)
      .slice(0, 5);

    // New vs returning customers, based on how many orders share the same phone number
    const ordersByPhone = {};
    orders.forEach((o) => {
      const phone = o.customer?.phone;
      if (!phone) return;
      ordersByPhone[phone] = (ordersByPhone[phone] || 0) + 1;
    });
    const newCustomers = Object.values(ordersByPhone).filter((c) => c === 1).length;
    const returningCustomers = Object.values(ordersByPhone).filter((c) => c > 1).length;

    // Overall fulfillment rate — delivered as a % of all orders placed
    const fulfillmentRate = totalOrders > 0 ? Math.round((delivered / totalOrders) * 100) : 0;

    const recentOrders = [...orders]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);

    return {
      pending,
      approved,
      delivered,
      cancelled,
      totalOrders,
      totalRevenue,
      totalGrossRevenue,
      totalCommission,
      productsUploaded,
      inStockUnits,
      lowStockCount,
      outOfStockCount,
      inStockCount,
      statusDistribution,
      revenueTrend,
      avgOrderValueTrend,
      topProducts,
      newCustomers,
      returningCustomers,
      fulfillmentRate,
      recentOrders,
    };
  }, [orders, products]);

  return {
    loading,
    error,
    sellerId,
    orders,
    products,
    stats: derived,
    statusDistribution: derived.statusDistribution,
    revenueTrend: derived.revenueTrend,
    avgOrderValueTrend: derived.avgOrderValueTrend,
    topProducts: derived.topProducts,
    recentOrders: derived.recentOrders,
    refresh: fetchAll,
  };
}
