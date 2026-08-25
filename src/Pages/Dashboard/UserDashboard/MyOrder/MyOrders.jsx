import { useState } from "react";
import { Search } from "lucide-react";

const tabs = ["All", "To Pay", "To ship", "To Receive", "To Review(43)"];

const orders = [
  {
    shop: "SASIN",
    status: "Completed",
    product: {
      title:
        "Premium Quality - Hunter Gaming Mouse Pad-Hunter Micro Wolf Gaming Mouse Pad ...",
      color: "Black",
      price: 65,
      qty: 1,
      image:
        "https://static-01.daraz.com.bd/p/001516414e7bd7239bf0ed6a19e0b7ea.jpg_170x170q80.jpg_.webp",
    },
  },
  {
    shop: "SASIN",
    status: "Completed",
    product: {
      title:
        "Premium Quality - Hunter Gaming Mouse Pad-Hunter Micro Wolf Gaming Mouse Pad ...",
      color: "Black",
      price: 65,
      qty: 1,
      image:
        "https://static-01.daraz.com.bd/p/001516414e7bd7239bf0ed6a19e0b7ea.jpg_170x170q80.jpg_.webp",
    },
  },
  {
    shop: "SASIN",
    status: "Completed",
    product: {
      title:
        "Premium Quality - Hunter Gaming Mouse Pad-Hunter Micro Wolf Gaming Mouse Pad ...",
      color: "Black",
      price: 65,
      qty: 1,
      image:
        "https://static-01.daraz.com.bd/p/001516414e7bd7239bf0ed6a19e0b7ea.jpg_170x170q80.jpg_.webp",
    },
  },
  {
    shop: "SASIN",
    status: "Completed",
    product: {
      title:
        "Premium Quality - Hunter Gaming Mouse Pad-Hunter Micro Wolf Gaming Mouse Pad ...",
      color: "Black",
      price: 65,
      qty: 1,
      image:
        "https://static-01.daraz.com.bd/p/001516414e7bd7239bf0ed6a19e0b7ea.jpg_170x170q80.jpg_.webp",
    },
  },
];

const MyOrders = () => {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="bg-gray-100 md:-mt-10 -mt-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-xl font-semibold mb-4">My Orders</h1>

        {/* Tabs */}
        <div className="flex gap-8 border-b mb-4 text-sm">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 ${
                activeTab === tab
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="bg-white p-3 mb-4 flex items-center gap-2">
          <Search size={18} className="text-gray-400" />
          <input
            placeholder="Search by seller name, order ID or product name"
            className="w-full outline-none text-sm"
          />
        </div>

        {/* Orders */}
        <div className="space-y-4">
          {orders.map((order, idx) => (
            <div key={idx} className="bg-white">
              {/* Shop Header */}
              <div className="flex justify-between items-center px-4 py-3 border-b">
                <span className="font-medium">🏪 {order.shop}</span>
                <span className="text-xs px-3 py-1 bg-gray-100 rounded-full">
                  {order.status}
                </span>
              </div>

              {/* 🔥 Product Row – Daraz exact */}
             {/* 🔥 Product Row – Desktop same, Mobile responsive */}
<div className="
  px-4 py-4
  grid gap-3
  grid-cols-1
  sm:grid-cols-[80px_320px_90px_70px]
  items-start sm:items-center
">
  {/* Image */}
  <div className="flex sm:block">
    <img
      src={order.product.image}
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
        {order.product.title}
      </p>

      <p className="text-xs text-gray-400 mt-1">
        Color Family: {order.product.color}
      </p>

      <div className="flex justify-between mt-2 text-sm">
        <span>৳ {order.product.price}</span>
        <span className="text-gray-500">Qty: {order.product.qty}</span>
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
      {order.product.title}
    </p>
    <p className="text-xs text-gray-400 mt-1">
      Color Family: {order.product.color}
    </p>
  </div>

  {/* Desktop price */}
  <div className="text-sm text-center whitespace-nowrap hidden sm:block">
    ৳ {order.product.price}
  </div>

  {/* Desktop qty */}
  <div className="text-sm text-right text-gray-500 whitespace-nowrap hidden sm:block">
    Qty: {order.product.qty}
  </div>
</div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
