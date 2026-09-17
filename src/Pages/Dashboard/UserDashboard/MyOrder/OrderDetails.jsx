import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  if (loading) return <div className="p-10 text-center text-gray-500">Loading...</div>;
  if (!order) return <div className="p-10 text-center text-gray-500">Order not found</div>;

  const canCancel = !["canceled", "delivered", "completed"].includes(order.status);
  const canReturn = ["delivered", "completed"].includes(order.status) && !order.returnStatus;

  return (
    <div className="bg-gray-100 min-h-screen ">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-xl font-semibold mb-4">Order Details</h1>

        <div className="bg-white rounded-lg p-5 mb-4">
          <div className="flex justify-between items-center border-b pb-3 mb-3">
            <span className="font-medium">🏪 {order.shopName}</span>
            {canCancel && (
              <button
                onClick={() => navigate(`/dashboard/cancelorder/${order._id}`)}
                className="text-sm text-blue-600 border border-blue-600 px-4 py-1.5 rounded hover:bg-blue-50"
              >
                Cancel
              </button>
            )}

            {canReturn && (
  <button
    onClick={() => navigate(`/dashboard/requestreturn/${order._id}`)}
    className="text-sm text-orange-600 border border-orange-600 px-4 py-1.5 rounded hover:bg-orange-50 ml-2"
  >
    Return
  </button>
)}
          </div>

          {order.products.map((product, idx) => (
            <div key={idx} className="flex items-center gap-4 py-3 border-b last:border-b-0">
              <img
                src={product.img}
                className="w-16 h-16 object-cover rounded border"
                alt={product.title}
              />
              <div className="flex-1">
                <p className="text-sm font-medium">{product.title}</p>
                <p className="text-xs text-gray-500">
                  Color Family: {product.selectedColor || "N/A"}
                  {product.selectedSize ? `, Size: ${product.selectedSize}` : ""}
                </p>
              </div>
              <p className="text-sm">৳ {product.ProductPrice}</p>
              <p className="text-sm text-gray-500">Qty: {product.quantity}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg p-5 mb-4">
          <p className="text-sm text-gray-600">
            Order ID: <span className="font-medium text-gray-800">{order._id}</span>
          </p>
          <p className="text-sm text-gray-600">
            Placed on: {new Date(order.createdAt).toLocaleString()}
          </p>
          <p className="text-sm text-gray-600">
            Paid by: {order.paymentMethod}
          </p>
          <p className="text-sm text-gray-600 capitalize">
            Status: <span className="font-medium">{order.status}</span>
          </p>
          {order.status === "canceled" && (
            <p className="text-sm text-red-600 mt-1">
              Cancel reason: {order.cancelReason}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-5">
            <h3 className="font-medium mb-2">Delivery Address</h3>
            <p className="text-sm text-gray-700">{order.customer?.name}</p>
            <p className="text-sm text-gray-700">{order.customer?.address}</p>
            <p className="text-sm text-gray-700">{order.customer?.phone}</p>
          </div>

          <div className="bg-white rounded-lg p-5">
            <h3 className="font-medium mb-2">Total Summary</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <div className="flex justify-between">
                <span>Subtotal</span><span>৳ {order.totals?.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span><span>৳ {order.totals?.shipping}</span>
              </div>
              <div className="flex justify-between font-semibold border-t pt-1 mt-1">
                <span>Total</span><span>৳ {order.totals?.grandtotal}</span>
              </div>
            </div>
          </div>
        </div>

        <Link to="/dashboard/myorder" className="inline-block mt-4 text-sm text-blue-600">
          ← Back to My Orders
        </Link>
      </div>
    </div>
  );
};

export default OrderDetails;