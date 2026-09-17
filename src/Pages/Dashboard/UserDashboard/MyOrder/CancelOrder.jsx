import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const reasons = [
  "Want to place a new order with more/different items",
  "Delivery time is too long",
  "Duplicate order",
  "Change of Delivery Address",
  "Shipping cost is too high",
  "Don't want this order/item anymore",
  "Forgot to use voucher/voucher issue",
  "Decided for alternative product",
  "Found cheaper elsewhere",
  "Seller asked me to cancel / informed that item is out of stock",
  "Change payment method",
];

const CancelOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [reason, setReason] = useState("");
  const [note, setNote] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`https://dailyshopping-backend.onrender.com/api/orders/${id}`);
        setOrder(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrder();
  }, [id]);

  const handleSubmit = async () => {
    if (!reason) {
      Swal.fire("Select a reason", "Please choose a cancellation reason.", "warning");
      return;
    }
    if (!agreed) {
      Swal.fire("Policy required", "Please accept the cancellation policy.", "warning");
      return;
    }

    setSubmitting(true);
    try {
      await axios.put(`https://dailyshopping-backend.onrender.com/api/orders/${id}/cancel`, {
        reason,
        note,
      });

      Swal.fire("Cancelled", "Your order has been cancelled.", "success");
      navigate(`/dashboard/orderdetails/${id}`);
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Failed to cancel order",
        "error"
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!order) return <div className="p-10 text-center text-gray-500">Loading...</div>;

  return (
    <div className="bg-gray-100 min-h-screen py-6">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-xl font-semibold mb-4">Request Cancellation</h1>

        {/* Items */}
        <div className="bg-white rounded-lg p-5 mb-4">
          <p className="font-medium mb-3">Choose the item(s) you want to cancel</p>
          {order.products.map((product, idx) => (
            <div key={idx} className="flex items-center gap-4 py-2">
              <input type="checkbox" checked readOnly className="w-4 h-4" />
              <img src={product.img} className="w-14 h-14 object-cover rounded border" />
              <div className="flex-1">
                <p className="text-sm">{product.title}</p>
              </div>
              <p className="text-sm text-gray-500">Qty: {product.quantity}</p>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="border rounded px-3 py-1.5 text-sm"
              >
                <option value="">Select a Reason</option>
                {reasons.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Additional info */}
        <div className="bg-white rounded-lg p-5 mb-4">
          <p className="font-medium mb-2">Additional Information (optional)</p>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            maxLength={256}
            placeholder="e.g. My phone has missing headphones"
            className="w-full border rounded p-3 text-sm h-24 resize-none"
          />
          <p className="text-right text-xs text-gray-400">{note.length}/256</p>
        </div>

        {/* Policy */}
        <div className="bg-white rounded-lg p-5 mb-4">
          <p className="font-medium mb-2">Cancellation Policy</p>
          <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded space-y-1">
            <p>1. Once submitted, the selected item(s) will be cancelled and cannot be retrieved.</p>
            <p>2. Refunds (if applicable) are processed within 24 hours if not yet handed to logistics.</p>
            <p>3. Partial cancellations may not be eligible for shipping fee refund.</p>
            <p>4. Youll receive a notification once cancellation is confirmed.</p>
          </div>
          <label className="flex items-center gap-2 mt-3 text-sm">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            I have read and accepted the Cancellation Policy.
          </label>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className={`px-8 py-2.5 rounded font-medium text-white ${
              submitting ? "bg-gray-400" : "bg-gray-800 hover:bg-black"
            }`}
          >
            {submitting ? "Submitting..." : "SUBMIT"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelOrder;