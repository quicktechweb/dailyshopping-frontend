import { Link } from "react-router-dom";

const cancellations = [
  {
    id: 1,
    requestedAt: "2022-05-14 23:56:04",
    orderId: "#627280625226286",
    items: [
      {
        title: "new sunglasses For man",
        image:
          "https://static-01.daraz.com.bd/p/6feb7301a8a504df89b9944a0f58e87b.jpg",
        qty: 1,
      },
    ],
  },
  {
    id: 2,
    requestedAt: "2021-10-23 08:40:22",
    orderId: "#62013594256286",
    items: [
      {
        title:
          "কনডেন্সার টাইপ মাইক্রোফোন প্রফেশনাল ল্যাভালিয়ার মাইক্রোফোন",
        image:
          "https://static-01.daraz.com.bd/p/6feb7301a8a504df89b9944a0f58e87b.jpg",
        qty: 1,
      },
      {
        title:
          "সব অ্যান্ড্রয়েড ফোনের জন্য মাইক্রোফোন সহ সাউন্ড সিস্টেম বক্স ইয়ারফোন",
        image:
          "https://static-01.daraz.com.bd/p/6feb7301a8a504df89b9944a0f58e87b.jpg",
        qty: 1,
      },
      {
        title:
          "3.5mm অডিও আউট ও মাইক স্প্লিটার কেবল হেডফোন অ্যাডাপ্টার",
        image:
          "https://static-01.daraz.com.bd/p/6feb7301a8a504df89b9944a0f58e87b.jpg",
        qty: 1,
      },
    ],
  },
];

export default function MyCancellations() {
  return (
    <div className="bg-gray-100 p-3 md:p-6">
      <h2 className="text-xl font-semibold mb-4 md:-mt-16 -mt-9">
        My Cancellations
      </h2>

      <div className="space-y-4">
        {cancellations.map((order) => (
          <div
            key={order.id}
            className="bg-white border border-gray-200"
          >
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
                  Requested on {order.requestedAt}
                </div>
                <div className="text-black">
                  Order{" "}
                  <span className="text-blue-600">
                    {order.orderId}
                  </span>
                </div>
              </div>

              <Link
                to="/dashboard/canceldetails"
                className="text-blue-600 self-start md:self-auto"
              >
                MORE DETAILS
              </Link>
            </div>

            {/* PRODUCT LIST */}
            <div className="divide-y">
              {order.items.map((item, idx) => (
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
                    src={item.image}
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
                      Qty: {item.qty}
                    </p>
                  </div>

                  {/* Desktop qty */}
                  <div className="hidden md:block w-20 text-sm text-gray-400">
                    Qty: {item.qty}
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
