import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Wallet, ArrowDownCircle, ArrowUpCircle, X, Clock3, CheckCircle2, XCircle } from "lucide-react";
import useSellerAuth from "../../../Hooks/useSellerAuth";

const STATUS_STYLES = {
  pending: { label: "Pending", cls: "bg-amber-50 text-amber-600", icon: Clock3 },
  approved: { label: "Approved", cls: "bg-emerald-50 text-emerald-600", icon: CheckCircle2 },
  rejected: { label: "Rejected", cls: "bg-rose-50 text-rose-600", icon: XCircle },
};

export default function SellerWallet() {
  const { seller } = useSellerAuth();
  const [balance, setBalance] = useState(Number(seller?.walletBalance || 0));
  const [transactions, setTransactions] = useState([]);
  const [withdrawRequests, setWithdrawRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("bKash");
  const [paymentNumber, setPaymentNumber] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const pendingTotal = withdrawRequests
    .filter((r) => r.status === "pending")
    .reduce((sum, r) => sum + Number(r.amount || 0), 0);

  const availableBalance = Math.max(balance - pendingTotal, 0);

  const fetchWalletData = async () => {
    if (!seller?.sellerId) return;
    try {
      const sellerRes = await axios.get(`https://dailyshopping-backend.onrender.com/api/sellers/${seller._id}`);
      setBalance(Number(sellerRes.data?.walletBalance || 0));

      const [txnRes, wdRes] = await Promise.all([
        axios.get(`https://dailyshopping-backend.onrender.com/api/wallet/seller/${seller.sellerId}/transactions`),
        axios.get(`https://dailyshopping-backend.onrender.com/api/wallet/seller/${seller.sellerId}/withdraw-requests`),
      ]);

      setTransactions(txnRes.data?.transactions || []);
      setWithdrawRequests(wdRes.data?.requests || []);
    } catch (err) {
      console.error("Failed to fetch wallet data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWalletData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seller?.sellerId]);

  const resetForm = () => {
    setAmount("");
    setMethod("bKash");
    setPaymentNumber("");
  };

  const handleWithdrawSubmit = async (e) => {
    e.preventDefault();
    const numAmount = Number(amount);

    if (!numAmount || numAmount <= 0) {
      Swal.fire({ icon: "warning", title: "সঠিক Amount দিন" });
      return;
    }
    if (numAmount > availableBalance) {
      Swal.fire({
        icon: "warning",
        title: "Balance অপর্যাপ্ত",
        text: `আপনার available balance ৳${availableBalance.toFixed(2)} এর বেশি withdraw করা যাবে না।`,
      });
      return;
    }
    if (!paymentNumber.trim()) {
      Swal.fire({ icon: "warning", title: "Payment Number দিন" });
      return;
    }

    setSubmitting(true);
    try {
      const { data } = await axios.post("https://dailyshopping-backend.onrender.com/api/wallet/seller/withdraw-request", {
        sellerId: seller.sellerId,
        amount: numAmount,
        method,
        paymentNumber: paymentNumber.trim(),
      });

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Withdraw Request পাঠানো হয়েছে",
          text: "Admin অনুমোদন করলে টাকা wallet থেকে কেটে নেওয়া হবে।",
          timer: 2500,
          showConfirmButton: false,
        });
        setShowModal(false);
        resetForm();
        fetchWalletData();
      } else {
        Swal.fire({ icon: "error", title: "Failed", text: data.message });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: err.response?.data?.message || "Something went wrong",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-1">Finance</p>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Wallet</h1>
      </div>

      <div className="mb-8 p-6 md:p-8 rounded-3xl bg-gradient-to-br from-emerald-700 to-emerald-900 shadow-lg shadow-emerald-900/20 text-white relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        <p className="text-[11px] text-emerald-200 uppercase tracking-widest font-semibold relative">
          Available Balance
        </p>
        <h2 className="text-4xl font-extrabold mt-1 relative">৳ {balance.toFixed(2)}</h2>
        {pendingTotal > 0 && (
          <p className="text-[11px] text-emerald-200/80 mt-1 relative">
            ৳{pendingTotal.toFixed(2)} pending withdraw request-এ আটকে আছে · Withdrawable ৳
            {availableBalance.toFixed(2)}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 mt-6 relative">
          <button className="flex items-center gap-2 justify-center bg-white text-emerald-800 font-bold text-sm px-5 py-3 rounded-2xl hover:-translate-y-0.5 transition-all">
            <ArrowDownCircle size={16} />
            Add Funds
          </button>
          <button
            onClick={() => setShowModal(true)}
            disabled={availableBalance <= 0}
            className="flex items-center gap-2 justify-center bg-emerald-800/60 text-white font-bold text-sm px-5 py-3 rounded-2xl border border-emerald-400/40 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            <ArrowUpCircle size={16} />
            Withdraw
          </button>
        </div>
      </div>

      {/* Withdraw Requests */}
      <div className="bg-white rounded-3xl shadow-[0_0_1px_rgba(15,23,42,0.05),0_12px_36px_-10px_rgba(15,23,42,0.16),0_2px_10px_rgba(15,23,42,0.06)] p-6 md:p-8 mb-8">
        <h2 className="font-bold text-lg text-slate-900 mb-4">Withdraw Requests</h2>
        {loading ? (
          <p className="text-slate-400 text-sm">Loading...</p>
        ) : withdrawRequests.length === 0 ? (
          <p className="text-sm text-slate-400">No withdraw requests yet</p>
        ) : (
          <div className="divide-y divide-slate-100">
            {withdrawRequests.map((r) => {
              const s = STATUS_STYLES[r.status] || STATUS_STYLES.pending;
              const StatusIcon = s.icon;
              return (
                <div key={r._id} className="flex justify-between items-center py-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {r.method} · {r.paymentNumber}
                    </p>
                    <p className="text-xs text-slate-400">
                      {new Date(r.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-sm text-slate-800">৳{Number(r.amount).toFixed(2)}</span>
                    <span
                      className={`flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full ${s.cls}`}
                    >
                      <StatusIcon size={12} />
                      {s.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="bg-white rounded-3xl shadow-[0_0_1px_rgba(15,23,42,0.05),0_12px_36px_-10px_rgba(15,23,42,0.16),0_2px_10px_rgba(15,23,42,0.06)] p-6 md:p-8">
        <h2 className="font-bold text-lg text-slate-900 mb-4">Transaction History</h2>
        {loading ? (
          <p className="text-slate-400 text-sm">Loading...</p>
        ) : transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-slate-200 rounded-2xl">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-3">
              <Wallet size={24} className="text-slate-300" />
            </div>
            <p className="text-sm text-slate-400">No transactions yet</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {transactions.map((t) => (
              <div key={t._id} className="flex justify-between items-center py-3">
                <div>
                  <p className="text-sm font-semibold text-slate-800">{t.note}</p>
                  <p className="text-xs text-slate-400">
                    {new Date(t.createdAt).toLocaleString()}
                  </p>
                </div>
                <span
                  className={`font-bold text-sm ${
                    t.type === "credit" ? "text-emerald-600" : "text-rose-600"
                  }`}
                >
                  {t.type === "credit" ? "+" : "-"}৳{t.amount.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Withdraw Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 md:p-8 relative shadow-2xl">
            <button
              onClick={() => {
                setShowModal(false);
                resetForm();
              }}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-black text-slate-900 mb-1">Withdraw Request</h3>
            <p className="text-xs text-slate-400 mb-6">
              Withdrawable Balance:{" "}
              <span className="font-bold text-emerald-700">৳{availableBalance.toFixed(2)}</span>
            </p>

            <form onSubmit={handleWithdrawSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1 block">
                  Amount
                </label>
                <input
                  type="number"
                  min="1"
                  max={availableBalance}
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1 block">
                  Method
                </label>
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="bKash">bKash</option>
                  <option value="Nagad">Nagad</option>
                  <option value="Rocket">Rocket</option>
                  <option value="Bank">Bank</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1 block">
                  Payment Number / Account
                </label>
                <input
                  type="text"
                  value={paymentNumber}
                  onChange={(e) => setPaymentNumber(e.target.value)}
                  placeholder="e.g. 01XXXXXXXXX"
                  className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-emerald-700 text-white font-bold text-sm px-5 py-3 rounded-2xl hover:bg-emerald-800 transition-all disabled:opacity-60"
              >
                {submitting ? "Submitting..." : "Submit Withdraw Request"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}