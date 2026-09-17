import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const stepOrder = ["requested", "approved", "picked_up", "received", "refunded"];
const stepLabels = {
  requested: "We have received your return request",
  approved: "Pending Pick Up",
  picked_up: "Your return package is on its way to our logistics facility",
  received: "Return Package Received",
  refunded: "Refund Completed",
  declined: "Sorry, your refund request has been declined",
};

export default function ReturnDetails() {
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

  if (loading) return <div className="p-10 text-center text-gray-500">Loading...</div>;
  if (!order) return <div className="p-10 text-center text-gray-500">Return not found</div>;

  const isDeclined = order.returnStatus === "declined";

  // declined হলে শুধু "requested" + "declined" দেখাবে, নাহলে পুরো ৫ ধাপ
  const steps = isDeclined
    ? [stepLabels.requested, stepLabels.declined]
    : stepOrder.map((s) => stepLabels[s]);

  const currentIndex = isDeclined
    ? steps.length - 1
    : stepOrder.indexOf(order.returnStatus);

  const product = order.products[0];

  return (
    <div className="bg-gray-100 min-h-screen p-3 md:p-6 md:-mt-16">

      {/* PAGE TITLE */}
      <h2 className="text-xl font-semibold mb-4">
        Return Details
      </h2>

      {/* TOP INFO BAR */}
      <div
        className="
          bg-white border border-gray-200
          px-4 py-3
          flex flex-col md:flex-row
          md:justify-between md:items-center
          gap-3
          mb-6
        "
      >
        <div className="text-sm text-gray-700 space-y-1">
          <div>Returned on {new Date(order.returnRequestedAt).toLocaleString()}</div>
          <div>
            Order{" "}
            <span className="text-blue-600">
              #{order._id}
            </span>
          </div>
          <div className="text-xs">
            RA Code: {order.raCode}
          </div>
        </div>

        <div className="flex gap-3 md:self-auto self-start">
          <button className="bg-orange-500 text-white px-4 md:px-6 py-2 text-sm font-semibold">
            PRINT
          </button>
          <button className="bg-gray-400 text-white px-4 md:px-6 py-2 text-sm font-semibold">
            DOWNLOAD
          </button>
        </div>
      </div>

      {/* TIMELINE */}
      <div className="bg-white border border-gray-200 px-4 md:px-12 py-6 md:py-10 mb-6">

        {/* DESKTOP TIMELINE */}
        <div className="relative hidden md:block">
          <div className="absolute top-[9px] left-0 w-full h-[2px] bg-green-500" />

          <div className="flex justify-between relative">
            {steps.map((text, index) => (
              <div
                key={index}
                className="flex flex-col items-center w-1/5 text-center"
              >
                <div
                  className={`w-4 h-4 rounded-full z-10 ${
                    index > currentIndex
                      ? "bg-white border-2 border-green-500"
                      : "bg-green-500"
                  }`}
                />

                <p className="text-xs text-gray-800 mt-4 leading-snug px-2">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* MOBILE TIMELINE */}
        <div className="md:hidden space-y-4">
          {steps.map((text, index) => (
            <div key={index} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div
                  className={`w-3 h-3 rounded-full ${
                    index > currentIndex
                      ? "border-2 border-green-500"
                      : "bg-green-500"
                  }`}
                />
                {index !== steps.length - 1 && (
                  <div className="w-[2px] h-8 bg-green-500" />
                )}
              </div>

              <p className="text-sm text-gray-800 leading-snug">
                {text}
              </p>
            </div>
          ))}
        </div>

        {/* INFO MESSAGE */}
        <div className="
          mt-6 md:mt-8
          bg-gray-100 border border-gray-200
          p-4
          text-sm text-gray-700
          flex flex-col md:flex-row
          gap-2 md:gap-4
        ">
          <span className="text-gray-500 text-xs whitespace-nowrap">
            {new Date(order.returnRequestedAt).toLocaleString()}
          </span>
          <p>
            If you have selected the pick-up option, the courier will contact
            you. If you have selected the drop-off option, please drop your
            return product to the nearest hub. Please pack
            the return product(s) securely and write the RA code and order
            number on the outer side of the package.
          </p>
        </div>
      </div>

      {/* PRODUCT INFO */}
      <div
        className="
          bg-white border border-gray-200
          px-4 py-4
          flex flex-col md:flex-row
          md:items-center
          gap-3 md:gap-6
        "
      >
        <img
          src={product.img}
          alt=""
          className="w-16 h-16 object-contain"
        />

        <div className="flex-1">
          <p className="text-sm font-medium text-gray-800">
            {product.title}
          </p>
          <p className="text-sm text-gray-500">
            Reason: {order.returnReason}
          </p>
          {order.returnNote && (
            <p className="text-xs text-gray-400 mt-1">
              Note: {order.returnNote}
            </p>
          )}
        </div>

        <div className="flex justify-between md:block text-sm">
          <div className="text-gray-800 font-medium">
            ৳ {product.ProductPrice}
          </div>
          <div className="text-gray-400">
            Qty: {product.quantity}
          </div>
        </div>
      </div>
    </div>
  );
}