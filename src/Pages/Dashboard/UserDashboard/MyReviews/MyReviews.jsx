import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useAuth from "../../../Hooks/useAuth";

const MyReviews = () => {
  const { user } = useAuth();
  const userId = user?.userId || "";

  const [items, setItems] = useState([]);
  const [historyCount, setHistoryCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId ) {
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
        const [pendingRes, historyRes] = await Promise.all([
          axios.get("https://dailyshopping-backend.onrender.com/api/reviews/pending", {
            params: { userId },
          }),
          axios.get("https://dailyshopping-backend.onrender.com/api/reviews/history", {
            params: { userId },
          }),
        ]);

        setItems(pendingRes.data.items || []);
        setHistoryCount(historyRes.data.count || 0);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [userId]);

  return (
    <div className="bg-[#f5f5f5] min-h-screen md:-mt-10 -mt-8">
      <div className="max-w-6xl mx-auto bg-white p-3 md:p-6">
        {/* Header */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          My Reviews
        </h2>

        {/* Tabs */}
        <div className="flex border-b mb-6 overflow-x-auto">
          <button 
            className="mr-6 pb-2 text-sm font-medium whitespace-nowrap text-orange-500 border-b-2 border-orange-500"
          >
            To Be Reviewed ({items.length})
          </button>

          <Link to="/dashboard/myreviewshistory">
            <button className="pb-2 text-sm font-medium text-gray-400 whitespace-nowrap">
              History ({historyCount})
            </button>
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div className="py-16 text-center text-gray-500 text-sm">
            Loading your reviews...
          </div>
        )}

        {/* Empty */}
        {!loading && items.length === 0 && (
          <div className="py-16 text-center text-gray-500 text-sm">
            Nothing to review right now 🎉
          </div>
        )}

        {/* Review Items */}
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={`${item.orderId}-${item.itemId}`}
              className="
                border rounded bg-white
                px-3 py-4 md:px-4
                flex flex-col md:flex-row
                md:items-center md:justify-between
                gap-4
              "
            >
              {/* Left */}
              <div className="flex gap-3">
                <img
                  src={item.img}
                  alt="product"
                  className="w-16 h-16 object-cover border flex-shrink-0"
                />

                <div>
                  <p className="text-sm text-gray-800 font-medium leading-snug">
                    {item.title}
                  </p>
                  {item.color && (
                    <p className="text-xs text-gray-500 mt-1">
                      Color family: {item.color}
                    </p>
                  )}
                </div>
              </div>

              {/* Right */}
              <div
                className="
                  flex items-center justify-between
                  md:justify-end
                  gap-4 md:gap-6
                "
              >
                <div className="text-xs text-gray-500 hidden md:block">
                  Sold by{" "}
                  <span className="text-blue-600">{item.shopName}</span>
                </div>

                <Link to={`/dashboard/writereview/${item.orderId}/${item.itemId}`}>
                  <button
                    className="
                      border border-orange-500
                      text-orange-500 text-sm
                      px-5 py-1.5
                      hover:bg-orange-50 transition
                      w-full md:w-auto
                    "
                  >
                    REVIEW
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyReviews;