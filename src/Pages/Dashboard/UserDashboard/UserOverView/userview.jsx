import {
  FaShoppingBag,
  FaWallet,
  FaMoneyBillWave,
  FaUserFriends,
  FaCopy,
  FaCheck,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import { useEffect, useState } from "react";
import axios from "axios";

const UserOverView = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [orders, setOrders] = useState([]);
  const [withdraws, setWithdraws] = useState([]);
  const [referrals, setReferrals] = useState([]);
  const [copied, setCopied] = useState(false);

  const referralCode = user?.myrefferalcode;
  const referralLink = `${window.location.origin}/newregister?ref=${referralCode}`;

   const myorder = [
  {
    customer: {
      name: "anik",
      phone: "01714345878",
      address: "testing"
    },
    totals: {
      quantity: 1,
      subtotal: 7550,
      shipping: 60,
      grandtotal: 7610
    },
    paymentInfo: {
      walletBefore: null,
      walletAfter: null,
      trxID: null,
      amount: null,
      phone: null,
      date: null
    },
    consignment_id: null,
    tracking_code: null,
    _id: "691ed2c1386020db7308772b",
    products: [
      {
        title: "Microsoft Xbox Wireless Controller - Electric Volt",
        ProductPrice: 7550,
        purchasePrice: 8500,
        quantity: 1,
        img: "https://luckyshop.com.bd/demo/1763032030619_xbox-wireless-controller-electric-volt-01-500x500.jpg",
        selectedSize: "",
        selectedColor: "",
        _id: "690ee3b99e309a82f66b3e0b"
      }
    ],
    status: "returned",
    orderPayment: "unpaid",
    statusHistory: [
      "pending",
      "accepted",
      "pending",
      "accepted",
      "hold",
      "returned"
    ],
    paymentMethod: "Cash on Delivery",
    userAuth: "01714345878",
    paymentId: "39967496",
    createdAt: "2025-11-20T08:35:13.165Z",
    updatedAt: "2025-11-20T08:56:01.333Z",
    __v: 5,
    delivery_status: "in_review"
  },
   {
    customer: {
      name: "anik",
      phone: "01714345878",
      address: "testing"
    },
    totals: {
      quantity: 1,
      subtotal: 7550,
      shipping: 60,
      grandtotal: 7610
    },
    paymentInfo: {
      walletBefore: null,
      walletAfter: null,
      trxID: null,
      amount: null,
      phone: null,
      date: null
    },
    consignment_id: null,
    tracking_code: null,
    _id: "691ed2c1386020db7308772b",
    products: [
      {
        title: "Microsoft Xbox Wireless Controller - Electric Volt",
        ProductPrice: 7550,
        purchasePrice: 8500,
        quantity: 1,
        img: "https://luckyshop.com.bd/demo/1763032030619_xbox-wireless-controller-electric-volt-01-500x500.jpg",
        selectedSize: "",
        selectedColor: "",
        _id: "690ee3b99e309a82f66b3e0b"
      }
    ],
    status: "returned",
    orderPayment: "unpaid",
    statusHistory: [
      "pending",
      "accepted",
      "pending",
      "accepted",
      "hold",
      "returned"
    ],
    paymentMethod: "Cash on Delivery",
    userAuth: "01714345878",
    paymentId: "39967496",
    createdAt: "2025-11-20T08:35:13.165Z",
    updatedAt: "2025-11-20T08:56:01.333Z",
    __v: 5,
    delivery_status: "in_review"
  },
   {
    customer: {
      name: "anik",
      phone: "01714345878",
      address: "testing"
    },
    totals: {
      quantity: 1,
      subtotal: 7550,
      shipping: 60,
      grandtotal: 7610
    },
    paymentInfo: {
      walletBefore: null,
      walletAfter: null,
      trxID: null,
      amount: null,
      phone: null,
      date: null
    },
    consignment_id: null,
    tracking_code: null,
    _id: "691ed2c1386020db7308772b",
    products: [
      {
        title: "Microsoft Xbox Wireless Controller - Electric Volt",
        ProductPrice: 7550,
        purchasePrice: 8500,
        quantity: 1,
        img: "https://luckyshop.com.bd/demo/1763032030619_xbox-wireless-controller-electric-volt-01-500x500.jpg",
        selectedSize: "",
        selectedColor: "",
        _id: "690ee3b99e309a82f66b3e0b"
      }
    ],
    status: "returned",
    orderPayment: "unpaid",
    statusHistory: [
      "pending",
      "accepted",
      "pending",
      "accepted",
      "hold",
      "returned"
    ],
    paymentMethod: "Cash on Delivery",
    userAuth: "01714345878",
    paymentId: "39967496",
    createdAt: "2025-11-20T08:35:13.165Z",
    updatedAt: "2025-11-20T08:56:01.333Z",
    __v: 5,
    delivery_status: "in_review"
  }
];

  useEffect(() => {
    if (!user) return;

    axios
      .get("https://serverluckyshop.luckyshop.com.bd/api/my-orders", {
        params: { userAuth: user?.email || user?.phoneNumber },
      })
      .then((res) => setOrders(res.data || []));

    axios
      .get(
        `https://serverluckyshop.luckyshop.com.bd/api/wallet/my-requests/${user._id}`
      )
      .then((res) => setWithdraws(res.data.requests || []));

    axios
      .get("https://serverluckyshop.luckyshop.com.bd/api/auth/alluser")
      .then((res) => {
        if (res.data.success) {
          const refs = res.data.users.filter(
            (u) => u.referralCode === referralCode
          );
          setReferrals(refs);
        }
      });
  }, [user]);

  const stats = [
    {
      title: " Orders",
      value: 1,
      // value: orders.length,
      icon: <FaShoppingBag />,
      accent: "from-indigo-500 to-indigo-600",
      path: "/dashboard/myorder",
    },
    {
      title: "Wallet",
      // value: `$${user?.walletBalance?.toFixed(2) || "0.00"}`,
      value: "0.00",
      icon: <FaWallet />,
      accent: "from-emerald-500 to-emerald-600",
      path: "/dashboard/wallet",
    },
    {
      title: "Withdraw",
      value: "0.00",
      icon: <FaMoneyBillWave />,
      accent: "from-amber-500 to-amber-600",
      path: "/dashboard/withdraw",
    },
    {
      title: "Referrals",
      value: "0.00",
      icon: <FaUserFriends />,
      accent: "from-fuchsia-500 to-purple-600",
      path: "/dashboard/refferallist",
    },
  ];

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
  <div className="min-h-screen  px-4 py-8 lg:px-10 ">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Account Overview
          </h1>
          <p className="text-gray-500 mt-1">
            Real-time snapshot of your activity & earnings
          </p>
        </div>

        {/* Stats */}
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
  {stats.map((s, i) => (
    <div
      key={i}
      onClick={() => navigate(s.path)}
      className="group cursor-pointer rounded-2xl bg-white/80 backdrop-blur-xl 
      border border-white/60 shadow-sm 
      active:scale-[0.98] sm:hover:shadow-2xl sm:hover:-translate-y-1 
      transition-all duration-300"
    >
      {/* top accent bar */}
      <div className={`h-1.5 rounded-t-2xl bg-gradient-to-r ${s.accent}`} />

      <div className="p-4 sm:p-5 flex items-center justify-between">
        {/* text */}
        <div>
          <p className="text-[11px] sm:text-xs uppercase tracking-wide text-gray-500">
            {s.title}
          </p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-0.5 sm:mt-1">
            {s.value}
          </p>
        </div>

        {/* icon */}
        <div
          className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center 
          rounded-xl text-white bg-gradient-to-tr ${s.accent} 
          shadow-md sm:group-hover:scale-110 transition`}
        >
          {s.icon}
        </div>
      </div>
    </div>
  ))}
</div>


        {/* Orders & Wallet */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Orders */}
          <div className="lg:col-span-2 bg-white rounded-2xl border shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Orders
              </h2>
              <Link
                to="/dashboard/myorder"
                className="text-sm text-indigo-600 hover:underline"
              >
                View all
              </Link>
            </div>

            <table className="w-full text-sm">
              <thead className="text-gray-500 border-b">
                <tr>
                  <th className="text-left py-3">Order</th>
                  <th className="text-left py-3">Status</th>
                  <th className="text-left py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {myorder.slice(0, 5).map((o, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="py-3 font-medium">
                      #{o.paymentId}
                    </td>
                    <td className="py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          o.status === "Delivered"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {o.status}
                      </span>
                    </td>
                    <td className="py-3 text-gray-500">
                      {new Date(o.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan="3" className="py-8 text-center text-gray-400">
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Wallet */}
          <div className="relative overflow-hidden bg-green-900 text-white rounded-2xl p-6 shadow-xl">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,_white,_transparent_60%)]" />

            <div className="relative">
              <p className="text-sm text-gray-400">Available Balance</p>
              <p className="text-4xl font-bold mt-2">
                ${user?.walletBalance?.toFixed(2) || "0.00"}
              </p>

              <div className="mt-8 space-y-3">
                <Link to="/dashboard/wallet">
                  <button className="w-full bg-white text-gray-900 py-3 rounded-xl font-semibold hover:bg-gray-100 transition">
                    Add Funds
                  </button>
                </Link>
                <Link to="/dashboard/withdraw">
                  <button className="w-full border border-white/30 py-3 mt-2 rounded-xl hover:bg-white/10 transition">
                    Withdraw
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Referral */}
        <div className="bg-white rounded-2xl border shadow-sm p-6 space-y-5">
          <h2 className="text-lg font-semibold text-gray-900">
            Referral Program
          </h2>

          <div className="flex items-center justify-between bg-white border border-gray-100 rounded-xl p-4">
            <span className="font-bold text-emerald-700 tracking-widest">
              {referralCode || "—"}
            </span>
            <button
              onClick={() => handleCopy(referralCode)}
              className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-white border hover:shadow"
            >
              {copied ? <FaCheck /> : <FaCopy />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <input
              value={referralLink}
              readOnly
              className="flex-1 border rounded-xl px-4 py-3 text-sm bg-gray-50"
            />
            <button
              // onClick={() => handleCopy(referralLink)}
              className="px-6 py-3 rounded-xl bg-gray-900 text-white text-sm hover:bg-gray-800"
            >
              Copy Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOverView;
