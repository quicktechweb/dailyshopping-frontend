import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { BadgeCheck, ShieldAlert, Clock, XCircle } from "lucide-react";
import useSellerAuth from "../../../Hooks/useSellerAuth";

export default function SellerVerification() {
  const { seller, setSeller } = useSellerAuth();
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(seller);

  // সবসময় latest status backend থেকে নিয়ে আসা (admin approve/reject করলে যাতে দেখা যায়)
  const fetchLatest = async () => {
    if (!seller?._id) return;
    try {
      const { data } = await axios.get(`https://dailyshopping-backend.onrender.com/api/sellers/${seller._id}`);
      setCurrent(data);
      localStorage.setItem("seller", JSON.stringify(data));
      setSeller(data);
    } catch (err) {
      console.error("Failed to fetch seller status:", err);
    }
  };

  useEffect(() => {
    fetchLatest();
    // eslint-disable-next-line
  }, []);

  const handleRequest = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `https://dailyshopping-backend.onrender.com/api/sellers/${seller._id}/request-verification`
      );
      if (data.success) {
        Swal.fire({ icon: "success", title: "Request Sent!", text: data.message, timer: 2500, showConfirmButton: false });
        setCurrent(data.seller);
        localStorage.setItem("seller", JSON.stringify(data.seller));
        setSeller(data.seller);
      } else {
        Swal.fire({ icon: "error", title: "Failed", text: data.message });
      }
    } catch (err) {
      Swal.fire({ icon: "error", title: "Failed", text: err.response?.data?.message || "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  const status = current?.verificationStatus || "Not Requested";

  const statusConfig = {
    "Not Requested": { color: "bg-slate-50 text-slate-500", icon: ShieldAlert, text: "You are not verified yet" },
    "Pending": { color: "bg-amber-50 text-amber-600", icon: Clock, text: "Your request is under review by Admin" },
    "Approved": { color: "bg-emerald-50 text-emerald-600", icon: BadgeCheck, text: "Congratulations! Your shop is Verified" },
    "Rejected": { color: "bg-rose-50 text-rose-600", icon: XCircle, text: "Your request was rejected" },
  };

  const { color, icon: Icon, text } = statusConfig[status];

  return (
    <div>
      <div className="mb-8">
        <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-1">Account</p>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Get Verified</h1>
      </div>

      <div className="bg-white rounded-3xl shadow-[0_0_1px_rgba(15,23,42,0.05),0_12px_36px_-10px_rgba(15,23,42,0.16),0_2px_10px_rgba(15,23,42,0.06)] p-6 md:p-8">
        <div className={`flex items-center gap-3 rounded-2xl px-5 py-4 font-bold text-sm mb-6 ${color}`}>
          <Icon size={22} />
          <span>{text}</span>
        </div>

        {status === "Rejected" && current?.verificationRejectReason && (
          <p className="text-sm text-rose-500 mb-4">
            <b>Reason:</b> {current.verificationRejectReason}
          </p>
        )}

        <p className="text-sm text-slate-500 mb-6">
          Verified badge পেলে আপনার shop এবং product এ একটা নীল টিক দেখা যাবে, যা customer কে বিশ্বাস
          করতে সাহায্য করবে। Request পাঠানোর পর Admin আপনার তথ্য যাচাই করে approve/reject করবে।
        </p>

        <button
          onClick={handleRequest}
          disabled={loading || status === "Pending" || status === "Approved"}
          className="text-sm font-bold text-white bg-gradient-to-r from-emerald-700 to-orange-500 px-6 py-3 rounded-2xl shadow-lg shadow-emerald-700/30 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          {status === "Pending"
            ? "Request Pending..."
            : status === "Approved"
            ? "Already Verified"
            : status === "Rejected"
            ? "Request Again"
            : loading
            ? "Sending..."
            : "Request Verification"}
        </button>
      </div>
    </div>
  );
}