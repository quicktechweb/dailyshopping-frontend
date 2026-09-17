import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const returnReasons = [
  "Item defective or does not work",
  "Item damaged or has physical defects",
  "Missing parts or accessories",
  "Wrong item received",
  "Item not as described",
  "Item is fake / not genuine",
  "Item doesn't fit (size issue)",
  "Changed my mind",
  "No longer needed",
  "Performance not as expected",
];

const RequestReturn = () => {
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
      Swal.fire("Select a reason", "Please choose a return reason.", "warning");
      return;
    }
    if (!agreed) {
      Swal.fire("Policy required", "Please accept the return policy.", "warning");
      return;
    }

    setSubmitting(true);
    try {
      await axios.post(`https://dailyshopping-backend.onrender.com/api/orders/${id}/return`, {
        reason,
        note,
      });

      Swal.fire("Requested", "Your return request has been submitted.", "success");
      navigate(`/dashboard/myreturn`);
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Failed to request return",
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
        <h1 className="text-xl font-semibold mb-4">Request Return</h1>

        <div className="bg-white rounded-lg p-5 mb-4">
          <p className="font-medium mb-3">Choose the item(s) you want to return</p>
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
                {returnReasons.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg p-5 mb-4">
          <p className="font-medium mb-2">Additional Information (optional)</p>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            maxLength={256}
            placeholder="e.g. The item stopped working after 2 days"
            className="w-full border rounded p-3 text-sm h-24 resize-none"
          />
          <p className="text-right text-xs text-gray-400">{note.length}/256</p>
        </div>

        <div className="bg-white rounded-lg p-5 mb-4">
          <p className="font-medium mb-2">Return Policy</p>
          <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded space-y-1">
            <p>1. Returns must be requested within the eligible return window after delivery.</p>
            <p>2. Item(s) must be in original condition with packaging and accessories.</p>
            <p>3. Once approved, our courier will contact you for pickup (or drop-off info will be shared).</p>
            <p>4. Refunds are processed after the item passes quality check at our warehouse.</p>
          </div>
          <label className="flex items-center gap-2 mt-3 text-sm">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            I have read and accepted the Return Policy.
          </label>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className={`px-8 py-2.5 rounded font-medium text-white ${
              submitting ? "bg-gray-400" : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            {submitting ? "Submitting..." : "SUBMIT"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestReturn;