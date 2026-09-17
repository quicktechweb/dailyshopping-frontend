import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useAuth from "../../../../Hooks/useAuth";

export default function MyCancellations() {
  const { user } = useAuth();
  const userId = user?.userId || "";

  const [cancellations, setCancellations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchCancellations = async () => {
      try {
        const res = await axios.get(
          "https://dailyshopping-backend.onrender.com/api/my-cancellations", // ⬅️ নতুন dedicated API
          { params: { userId } }
        );
        setCancellations(res.data);
      } catch (err) {
        console.error("Failed to fetch cancellations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCancellations();
  }, [userId]);

  return (
    <div className="bg-gray-100 p-3 md:p-6">
      <h2 className="text-xl font-semibold mb-4 md:-mt-16 -mt-9">
        My Cancellations
      </h2>

      {loading && (
        <div className="bg-white py-16 text-center text-gray-500 text-sm">
          Loading...
        </div>
      )}

      {!loading && cancellations.length === 0 && (
        <div className="bg-white py-16 text-center text-gray-500 text-sm">
          No cancelled orders found
        </div>
      )}

      <div className="space-y-4">
        {!loading &&
          cancellations.map((order) => (
            <div key={order._id} className="bg-white border border-gray-200">
              {/* TOP BAR */}
              <div
                className="
                  flex flex-col md:flex-row
                  md:justify-between md:items-center
                  gap-2
                  px-4 py-3
                  border-b text-sm
                "
              >
                <div className="text-gray-600">
                  <div>
                    Requested on {new Date(order.updatedAt).toLocaleString()}
                  </div>
                  <div className="text-black">
                    Order{" "}
                    <span className="text-blue-600">#{order._id}</span>
                  </div>
                </div>

                <Link
                  to={`/dashboard/canceldetails/${order._id}`}
                  className="text-blue-600 self-start md:self-auto"
                >
                  MORE DETAILS
                </Link>
              </div>

              {/* PRODUCT LIST */}
              <div className="divide-y">
                {order.products.map((item, idx) => (
                  <div
                    key={idx}
                    className="
                      px-4 py-4
                      flex flex-col md:flex-row
                      md:items-center
                      gap-3 md:gap-6
                    "
                  >
                    {/* IMAGE */}
                    <img
                      src={item.img}
                      alt=""
                      className="w-16 h-16 object-contain"
                    />

                    {/* TITLE */}
                    <div className="flex-1">
                      <p className="text-sm text-gray-800 leading-snug">
                        {item.title}
                      </p>

                      {/* Mobile qty */}
                      <p className="text-sm text-gray-400 mt-1 md:hidden">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    {/* Desktop qty */}
                    <div className="hidden md:block w-20 text-sm text-gray-400">
                      Qty: {item.quantity}
                    </div>

                    {/* STATUS */}
                    <div className="md:w-[120px] md:flex md:justify-center">
                      <span
                        className="
                          bg-gray-200 text-gray-700
                          text-xs px-4 py-1
                          rounded-full
                          w-fit
                        "
                      >
                        Cancelled
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}