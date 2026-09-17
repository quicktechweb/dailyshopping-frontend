import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CancellationDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/orders/${id}`);
        setOrder(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading)
    return <div className="p-10 text-center text-gray-500">Loading...</div>;
  if (!order)
    return <div className="p-10 text-center text-gray-500">Order not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 md:-mt-16 -mt-4">
      <div className="rounded overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-white border-b">
          <h2 className="text-lg font-semibold text-gray-800">Cancellation Details</h2>
          <p className="text-sm text-gray-500 mt-1">
            Canceled on {new Date(order.updatedAt).toLocaleString()} <br />
            Order <span className="text-blue-600 font-medium">#{order._id}</span>
          </p>
        </div>

        {/* Items */}
        <div className="space-y-6 mt-2">
          {order.products.map((item, idx) => (
            <div key={idx} className="bg-white p-4 rounded">
              {/* Progress / Status Bar - Top & Centered */}
              <div className="w-full flex justify-center mb-4">
                <div className="w-56">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span>Cancellation in Process</span>
                    <span className="font-semibold text-green-600">Cancelled</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div className="bg-green-600 h-2 rounded-full w-full"></div>
                  </div>
                </div>
              </div>

              {/* Product Details - Image left, text right */}
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded"
                />

                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="font-medium text-gray-800">{item.title}</h3>
                  <p className="text-gray-500 text-sm mt-1">
                    {order.cancelReason}
                  </p>
                  {order.cancelNote && (
                    <p className="text-gray-400 text-xs mt-1">
                      Note: {order.cancelNote}
                    </p>
                  )}
                  <p className="text-gray-700 mt-2 font-medium">
                    Tk {item.ProductPrice} &nbsp; | &nbsp; Qty: {item.quantity}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CancellationDetails;