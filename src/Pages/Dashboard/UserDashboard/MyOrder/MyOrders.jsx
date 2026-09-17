import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import axios from "axios";
import useAuth from "../../../Hooks/useAuth"; // ⚠️ path তোমার ফোল্ডার অনুযায়ী ঠিক করে নিও
import { Link } from "react-router-dom";

// 🔹 প্রতিটা tab সরাসরি একটা actual order status এর সাথে মিলবে
const tabStatusMap = {
  All: null, // null মানে সব status
  confirmed: ["confirmed"],
  processing: ["processing"],
  shipped: ["shipped"],
  out_for_delivery: ["out_for_delivery"],
  delivered: ["delivered"],
  cancelled: ["cancelled"],
  returned: ["returned"],
};

const tabs = Object.keys(tabStatusMap);

const MyOrders = () => {
  const { user } = useAuth();
  const userId = user?.userId || "";

  const [activeTab, setActiveTab] = useState("All");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/my-orders", {
          params: { userId },
        });
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  // 🔹 active tab অনুযায়ী orders filter করা হচ্ছে
  const allowedStatuses = tabStatusMap[activeTab];
  const filteredOrders = allowedStatuses
    ? orders.filter((order) => allowedStatuses.includes(order.status))
    : orders; // "All" হলে সব দেখাবে

  return (
    <div className="bg-gray-100 md:-mt-10 -mt-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-xl font-semibold mb-4">My Orders</h1>

        {/* Tabs */}
        <div className="flex gap-8 border-b mb-4 text-sm">
          {tabs.map((tab) => {
            // 🔹 প্রতিটা tab এর নিজের count দেখানোর জন্য
            const tabCount = tabStatusMap[tab]
              ? orders.filter((o) => tabStatusMap[tab].includes(o.status)).length
              : orders.length;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 flex items-center gap-1 ${
                  activeTab === tab
                    ? "border-b-2 border-black text-black"
                    : "text-gray-500"
                }`}
              >
                {tab === "All" ? "All" : tab.replace(/_/g, " ")}
                {tabCount > 0 && (
                  <span className="text-xs text-gray-400">({tabCount})</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="bg-white p-3 mb-4 flex items-center gap-2">
          <Search size={18} className="text-gray-400" />
          <input
            placeholder="Search by seller name, order ID or product name"
            className="w-full outline-none text-sm"
          />
        </div>

        {/* Loading */}
        {loading && (
          <div className="bg-white py-16 text-center text-gray-500 text-sm">
            Loading your orders...
          </div>
        )}

        {/* Empty */}
        {!loading && filteredOrders.length === 0 && (
          <div className="bg-white py-16 text-center text-gray-500 text-sm">
            No orders found
          </div>
        )}

        {/* Orders */}
        <div className="space-y-4">
          {!loading &&
            filteredOrders.map((order) => (
              <Link
                to={`/dashboard/orderdetails/${order._id}`}
                key={order._id}
                className="bg-white block hover:shadow-md transition"
              >
                <div className="bg-white">
                  {/* Shop Header */}
                  <div className="flex justify-between items-center px-4 py-3 border-b">
                    <span className="font-medium">🏪 {order.shopName}</span>
                    <span className="text-xs px-3 py-1 bg-gray-100 rounded-full capitalize">
                      {order.status}
                    </span>
                  </div>

                  {/* Product rows */}
                  {order.products.map((product, idx) => (
                    <div
                      key={idx}
                      className="
                        px-4 py-4
                        grid gap-3
                        grid-cols-1
                        sm:grid-cols-[80px_320px_90px_70px]
                        items-start sm:items-center
                        border-b last:border-b-0
                      "
                    >
                      {/* Image */}
                      <div className="flex sm:block">
                        <img
                          src={product.img}
                          className="w-20 h-20 border rounded object-cover"
                        />

                        {/* Mobile content beside image */}
                        <div className="ml-3 sm:hidden flex-1">
                          <p
                            className="text-sm text-gray-800 leading-snug overflow-hidden"
                            style={{
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                            }}
                          >
                            {product.title}
                          </p>

                          <p className="text-xs text-gray-400 mt-1">
                            Color Family: {product.selectedColor || "N/A"}
                          </p>

                          <div className="flex justify-between mt-2 text-sm">
                            <span>৳ {product.ProductPrice}</span>
                            <span className="text-gray-500">Qty: {product.quantity}</span>
                          </div>
                        </div>
                      </div>

                      {/* Desktop title */}
                      <div className="max-w-[320px] hidden sm:block">
                        <p
                          className="text-sm text-gray-800 leading-snug overflow-hidden"
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {product.title}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Color Family: {product.selectedColor || "N/A"}
                        </p>
                      </div>

                      {/* Desktop price */}
                      <div className="text-sm text-center whitespace-nowrap hidden sm:block">
                        ৳ {product.ProductPrice}
                      </div>

                      {/* Desktop qty */}
                      <div className="text-sm text-right text-gray-500 whitespace-nowrap hidden sm:block">
                        Qty: {product.quantity}
                      </div>
                    </div>
                  ))}
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
