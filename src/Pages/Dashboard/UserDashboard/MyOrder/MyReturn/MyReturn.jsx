import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useAuth from "../../../../Hooks/useAuth";

const statusTextMap = {
  requested: "Your return request is being reviewed",
  approved: "Your return has been approved",
  declined: "Sorry, your refund request has been declined",
  picked_up: "Your return package is on its way to our logistics facility",
  received: "Return Package Received",
  refunded: "Your refund has been approved",
};

export default function MyReturns() {
  const { user } = useAuth();
  const userId = user?.userId || "";

  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchReturns = async () => {
      try {
        const res = await axios.get("https://dailyshopping-backend.onrender.com/api/my-returns", {
          params: { userId },
        });
        setReturns(res.data);
      } catch (err) {
        console.error("Failed to fetch returns:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReturns();
  }, [userId]);

  return (
    <div className="bg-gray-100 md:-mt-12 p-3 -mt-7 md:p-6">
      <h2 className="text-xl font-semibold mb-4 -mt-4">
        My Returns
      </h2>

      {loading && (
        <div className="bg-white py-16 text-center text-gray-500 text-sm">
          Loading...
        </div>
      )}

      {!loading && returns.length === 0 && (
        <div className="bg-white py-16 text-center text-gray-500 text-sm">
          No return requests found
        </div>
      )}

      <div className="space-y-4">
        {!loading && returns.map((order) => (
          <div
            key={order._id}
            className="bg-white border border-gray-200 rounded"
          >
            {/* TOP BAR */}
            <div className="
              flex flex-col md:flex-row
              md:justify-between md:items-center
              gap-2
              px-4 py-3 border-b text-sm
            ">
              <div className="flex flex-col md:flex-row md:gap-10 text-gray-600">
                <div>
                  <p>Returned on {new Date(order.returnRequestedAt).toLocaleString()}</p>
                  <p>
                    Order{" "}
                    <span className="text-blue-500">
                      #{order._id}
                    </span>
                  </p>
                </div>

                <div className="md:mt-0 mt-1">
                  <span className="text-black font-medium">
                    Return to {order.shopName}
                  </span>
                </div>
              </div>

              <Link
                to={`/dashboard/returndetails/${order._id}`}
                className="text-blue-600 md:self-auto self-start"
              >
                MORE DETAILS
              </Link>
            </div>

            {/* PRODUCT ROWS */}
            {order.products.map((item, idx) => (
              <div
                key={idx}
                className="
                  px-4 py-4
                  flex flex-col md:flex-row
                  md:items-center
                  gap-4 md:gap-6
                "
              >
                {/* IMAGE */}
                <img
                  src={item.img}
                  alt=""
                  className="w-16 h-16 object-contain"
                />

                {/* PRODUCT INFO */}
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
                <div className="hidden md:block text-sm text-gray-400 w-16">
                  Qty: {item.quantity}
                </div>

                {/* STATUS */}
                <div className="md:w-[220px] md:flex md:justify-center">
                  <div className="
                    bg-gray-200 text-gray-700 text-xs
                    text-center px-4 py-2
                    rounded-full leading-snug
                    w-full md:w-auto
                  ">
                    {statusTextMap[order.returnStatus] || "Processing"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}