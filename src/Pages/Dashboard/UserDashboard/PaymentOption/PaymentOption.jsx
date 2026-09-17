import { useEffect, useState } from "react";
import { FaCcVisa, FaCcMastercard } from "react-icons/fa";
import { X } from "lucide-react";
import axios from "axios";
import useAuth from "../../../Hooks/useAuth";

const API_URL = "https://dailyshopping-backend.onrender.com/api/auth";

const CardIcon = ({ brand }) => {
  if (brand === "mastercard") return <FaCcMastercard className="text-red-500 text-3xl" />;
  return <FaCcVisa className="text-blue-600 text-3xl" />;
};

const PaymentOptions = () => {
  const { user } = useAuth();
  const userId = user?.userId || "";

  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showCardModal, setShowCardModal] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);

  const [cardForm, setCardForm] = useState({ cardNumber: "", expiryDate: "", cardBrand: "visa" });
  const [walletForm, setWalletForm] = useState({ walletProvider: "bKash", walletNumber: "" });
  const [saving, setSaving] = useState(false);

  const cards = paymentMethods.filter((p) => p.type === "card");
  const wallets = paymentMethods.filter((p) => p.type === "wallet");

  const fetchPayments = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }
    try {
      const res = await axios.get(`${API_URL}/payments/${userId}`);
      if (res.data.success) setPaymentMethods(res.data.paymentMethods);
    } catch (err) {
      console.error("Fetch payment methods error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [userId]);

  const handleAddCard = async () => {
    if (!cardForm.cardNumber || !cardForm.expiryDate) {
      alert("Card number and expiry date required");
      return;
    }
    setSaving(true);
    try {
      const res = await axios.post(`${API_URL}/payments/${userId}/card`, cardForm);
      if (res.data.success) {
        setPaymentMethods(res.data.paymentMethods);
        setCardForm({ cardNumber: "", expiryDate: "", cardBrand: "visa" });
        setShowCardModal(false);
      }
    } catch (err) {
      console.error("Add card error:", err);
      alert("Failed to add card");
    } finally {
      setSaving(false);
    }
  };

  const handleAddWallet = async () => {
    if (!walletForm.walletNumber) {
      alert("Wallet number required");
      return;
    }
    setSaving(true);
    try {
      const res = await axios.post(`${API_URL}/payments/${userId}/wallet`, walletForm);
      if (res.data.success) {
        setPaymentMethods(res.data.paymentMethods);
        setWalletForm({ walletProvider: "bKash", walletNumber: "" });
        setShowWalletModal(false);
      }
    } catch (err) {
      console.error("Add wallet error:", err);
      alert("Failed to add wallet");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (paymentId) => {
    if (!window.confirm("Delete this payment method?")) return;
    try {
      const res = await axios.delete(`${API_URL}/payments/${userId}/${paymentId}`);
      if (res.data.success) setPaymentMethods(res.data.paymentMethods);
    } catch (err) {
      console.error("Delete payment method error:", err);
      alert("Failed to delete");
    }
  };

  return (
    <div className=" bg-gray-100 py-8 px-4 -mt-20">
      <div className="max-w-5xl mx-auto">

        {/* PAGE TITLE */}
        <h1 className="text-xl font-semibold text-gray-800 mb-6">
          My Payment Options
        </h1>

        {/* ================= CREDIT / DEBIT CARD ================= */}
        <div className="bg-white rounded-sm mb-6">
          <div className="px-6 pt-5 pb-3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base font-semibold text-gray-800">
                Select Payment Method
              </h2>
            </div>

            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-semibold text-gray-700">
                Credit / Debit Card
              </h3>
              <button
                onClick={() => setShowCardModal(true)}
                className="text-sm text-blue-600 hover:underline"
              >
                + Add Card
              </button>
            </div>

            {/* TABLE HEADER */}
            <div className="grid grid-cols-12 text-xs text-gray-500 pb-2 border-b">
              <div className="col-span-6">Card Number</div>
              <div className="col-span-4">Expiry Date</div>
              <div className="col-span-2 text-right"></div>
            </div>

            {loading && (
              <p className="py-6 text-sm text-gray-500 text-center">Loading...</p>
            )}

            {!loading && cards.length === 0 && (
              <p className="py-6 text-sm text-gray-500 text-center">No card added</p>
            )}

            {!loading && cards.map((card) => (
              <div key={card._id} className="grid grid-cols-12 items-center py-4 border-b last:border-b-0">
                <div className="col-span-6 flex items-center gap-3">
                  <CardIcon brand={card.cardBrand} />
                  <span className="text-sm text-gray-800">
                    {card.cardNumber}
                  </span>
                </div>

                <div className="col-span-4 text-sm text-gray-700">
                  Expires {card.expiryDate}
                </div>

                <div className="col-span-2 text-right">
                  <button
                    onClick={() => handleDelete(card._id)}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= DIGITAL WALLET ================= */}
        <div className="bg-white rounded-sm">
          <div className="px-6 pt-5 pb-3">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-semibold text-gray-700">
                Digital Wallet
              </h3>
              <button
                onClick={() => setShowWalletModal(true)}
                className="text-sm text-blue-600 hover:underline"
              >
                + Add Wallet
              </button>
            </div>

            {/* TABLE HEADER */}
            <div className="grid grid-cols-12 text-xs text-gray-500 pb-2 border-b">
              <div className="col-span-6">Card Number</div>
              <div className="col-span-4">Expiry Date</div>
              <div className="col-span-2 text-right"></div>
            </div>

            {loading && (
              <p className="py-6 text-sm text-gray-500 text-center">Loading...</p>
            )}

            {!loading && wallets.length === 0 && (
              <p className="py-6 text-sm text-gray-500 text-center">No wallet added</p>
            )}

            {!loading && wallets.map((wallet) => (
              <div key={wallet._id} className="grid grid-cols-12 items-center py-4 border-b last:border-b-0">
                <div className="col-span-6 flex items-center gap-3">
                  <img
                    src="https://laz-img-cdn.alicdn.com/tfs/TB14FT1JpOWBuNjy0FiXXXFxVXa-400-400.png"
                    alt="Wallet"
                    className="h-7"
                  />
                  <span className="text-sm text-gray-800">
                    {wallet.walletProvider} — {wallet.walletNumber}
                  </span>
                </div>

                <div className="col-span-4 text-sm text-gray-700"></div>

                <div className="col-span-2 text-right">
                  <button
                    onClick={() => handleDelete(wallet._id)}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ================= ADD CARD MODAL ================= */}
      {showCardModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-sm w-full max-w-md p-6 relative">
            <button
              onClick={() => setShowCardModal(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>

            <h3 className="text-base font-semibold text-gray-800 mb-4">
              Add Credit / Debit Card
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Card Number</label>
                <input
                  type="text"
                  placeholder="e.g. 7792******7289"
                  value={cardForm.cardNumber}
                  onChange={(e) => setCardForm((p) => ({ ...p, cardNumber: e.target.value }))}
                  className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Expiry Date</label>
                <input
                  type="text"
                  placeholder="e.g. 08/32"
                  value={cardForm.expiryDate}
                  onChange={(e) => setCardForm((p) => ({ ...p, expiryDate: e.target.value }))}
                  className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Card Brand</label>
                <select
                  value={cardForm.cardBrand}
                  onChange={(e) => setCardForm((p) => ({ ...p, cardBrand: e.target.value }))}
                  className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
                >
                  <option value="visa">Visa</option>
                  <option value="mastercard">Mastercard</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowCardModal(false)}
                className="px-6 py-2 border rounded bg-gray-100 text-gray-600 hover:bg-gray-200 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCard}
                disabled={saving}
                className="px-6 py-2 rounded bg-orange-500 text-white hover:bg-orange-600 text-sm disabled:opacity-60"
              >
                {saving ? "SAVING..." : "SAVE"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= ADD WALLET MODAL ================= */}
      {showWalletModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-sm w-full max-w-md p-6 relative">
            <button
              onClick={() => setShowWalletModal(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>

            <h3 className="text-base font-semibold text-gray-800 mb-4">
              Add Digital Wallet
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Wallet Provider</label>
                <select
                  value={walletForm.walletProvider}
                  onChange={(e) => setWalletForm((p) => ({ ...p, walletProvider: e.target.value }))}
                  className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
                >
                  <option value="bKash">bKash</option>
                  <option value="Nagad">Nagad</option>
                  <option value="Rocket">Rocket</option>
                  <option value="Upay">Upay</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Wallet Number</label>
                <input
                  type="text"
                  placeholder="e.g. 017******518"
                  value={walletForm.walletNumber}
                  onChange={(e) => setWalletForm((p) => ({ ...p, walletNumber: e.target.value }))}
                  className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowWalletModal(false)}
                className="px-6 py-2 border rounded bg-gray-100 text-gray-600 hover:bg-gray-200 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleAddWallet}
                disabled={saving}
                className="px-6 py-2 rounded bg-orange-500 text-white hover:bg-orange-600 text-sm disabled:opacity-60"
              >
                {saving ? "SAVING..." : "SAVE"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentOptions;