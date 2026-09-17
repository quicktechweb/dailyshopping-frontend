import axios from "axios";
import { useEffect, useState,  useRef } from "react";
// import Swal from "sweetalert2";

const AllCouponDataShow = () => {
  const [coupons, setCoupons] = useState([]);
  const [winners, setWinners] = useState({});
  const [loading, setLoading] = useState(true);
  const [modalData, setModalData] = useState(null); // modal state
  const [notifiedWinners, setNotifiedWinners] = useState(() => {
    const stored = localStorage.getItem("notifiedWinners");
    return stored ? JSON.parse(stored) : {};
  });
  const notifiedRef = useRef(notifiedWinners);

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/coupons");
      const data = await res.json();
      if (data.success) setCoupons(data.coupons);
    } catch (err) {
      console.error("Error fetching coupons:", err);
    } finally {
      setLoading(false);
    }
  };

  const sendWinnerNotification = async (winner) => {
  try {
    const res = await axios.get("http://localhost:5000/api/auth/active-users");
    const users = res.data.users || [];

    console.log("Total users found:", users.length);

    for (const user of users) {
      try {
        // check if this user is the winner
        const isWinner =
          String(user._id) === String(winner.userId) ||
          user.email === winner.useremail ||
          user.phoneNumber === winner.userRegPhone;

        await axios.post("http://localhost:5000/api/notification/create", {
          userId: user._id, // always valid
          title: isWinner ? "🎉 Congratulations!" : "🏆 New Winner Announced!",
          message: isWinner
            ? `You won Round ${winner.round} for ${winner.productName}! 🏆`
            : `${winner.username} has won Round ${winner.round} for ${winner.productName}.`,
        });
      } catch (err) {
        console.error(
          `❌ Notification failed for ${user._id}:`,
          err.response?.data || err.message
        );
      }
    }

    console.log("All user notifications saved (winner + others)");

  } catch (err) {
    console.error("❌ Error fetching users:", err.message);
  }
};

  const fetchWinners = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/coupons/winners");
      const data = await res.json();
      if (!data.success) return;

      const newWinnerMap = {};
      data.winners.forEach((w) => {
        const key = `${w.productId}_R${w.round}`;
        newWinnerMap[key] = w;

        if (!notifiedRef.current[key] && w.isNewWinner) {
          sendWinnerNotification(w);
          notifiedRef.current[key] = true;
          setNotifiedWinners((prev) => {
            const updated = { ...prev, [key]: true };
            localStorage.setItem("notifiedWinners", JSON.stringify(updated));
            return updated;
          });
        }
      });

      setWinners(newWinnerMap);
    } catch (err) {
      console.error("Error fetching winners:", err);
    }
  };

  useEffect(() => {
    fetchCoupons();
    fetchWinners();
    const interval = setInterval(fetchWinners, 10000);
    return () => clearInterval(interval);
  }, []);

  const productRounds = {};
  const sortedCoupons = [...coupons].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  sortedCoupons.forEach((c) => {
    const productId = c.productId;
    const limit = c.couponlimit ?? 5;
    if (!productRounds[productId]) productRounds[productId] = [];
    const rounds = productRounds[productId];
    let currentRound = rounds[rounds.length - 1];
    if (!currentRound || currentRound.coupons.length >= limit) {
      currentRound = { round: rounds.length + 1, coupons: [], product: c, couponlimit: limit };
      rounds.push(currentRound);
    }
    currentRound.coupons.push(c);
  });

  const allRounds = Object.values(productRounds).flat();

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        All Coupon Purchases
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-600"></div>
        </div>
      ) : allRounds.length === 0 ? (
        <div className="py-20 text-center text-gray-500 text-lg font-medium">
          No coupon purchases found.
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-md border">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-xs font-semibold text-gray-700 uppercase">#</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-700 uppercase">Product</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-700 uppercase">Round</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-700 uppercase">Total Buys</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-700 uppercase">Winner</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-700 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {allRounds.map((r, index) => {
                const product = r.product;
                const key = `${product.productId}_R${r.round}`;
                const winner = winners[key];
                const totalQty = r.coupons.reduce((sum, c) => sum + (c.quantity || 1), 0);
                const isLimitReached = totalQty >= r.couponlimit;

                return (
                  <tr key={key} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 text-gray-700">{index + 1}</td>
                    <td className="px-4 py-3 flex items-center gap-3">
                      <img src={product.productImage} alt={product.productName} className="w-12 h-12 object-contain rounded border" />
                      <span className="font-medium text-gray-800">{product.productName}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 font-medium">Round {r.round}</td>
                    <td className="px-4 py-3 text-gray-700">
                      {totalQty} / {r.couponlimit} {isLimitReached && <span className="text-green-600 font-semibold">✅</span>}
                    </td>
                    <td className="px-4 py-3 text-green-600 font-semibold">
                      {winner ? (
                        <div>{winner.username} ({winner.userPhone}) - {winner.couponId}</div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setModalData(r)}
                        className="px-3 py-2 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                      >
                        View Users
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {modalData && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={() => setModalData(null)}
        >
          <div
            className="bg-white rounded-xl shadow-lg w-11/12 md:w-2/3 max-h-[80vh] overflow-y-auto p-4"
            onClick={(e) => e.stopPropagation()} // prevent modal close when clicking inside
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">
                Users for {modalData.product.productName} - Round {modalData.round}
              </h3>
              <button
                onClick={() => setModalData(null)}
                className="text-gray-500 hover:text-gray-700 font-bold text-xl"
              >
                &times;
              </button>
            </div>

            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 py-2 font-semibold">Username</th>
                  <th className="px-3 py-2 font-semibold">Phone</th>
                  <th className="px-3 py-2 font-semibold">Coupon ID</th>
                  <th className="px-3 py-2 font-semibold">Purchased At</th>
                  <th className="px-3 py-2 font-semibold">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {modalData.coupons.map((c) => (
                  <tr key={c._id} className="hover:bg-gray-50">
                    <td className="px-3 py-2">{c.username || "-"}</td>
                    <td className="px-3 py-2">{c.userPhone}</td>
                    <td className="px-3 py-2">{c.couponId}</td>
                    <td className="px-3 py-2">{new Date(c.createdAt).toLocaleString()}</td>
                    <td className="px-3 py-2">{c.quantity || 1}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4 text-right">
              <button
                onClick={() => setModalData(null)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllCouponDataShow;
