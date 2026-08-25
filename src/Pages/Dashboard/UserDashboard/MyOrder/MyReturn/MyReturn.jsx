import { Link } from "react-router-dom";

const returns = [
  {
    id: 1,
    returnedAt: "2024-10-17 12:33:04",
    orderId: "#664790081026286",
    product: "Lotto Casual Lifestyle Shoes for Men",
    image:
      "https://img.drz.lazcdn.com/g/kf/Sd2de1aea6911468db60a02517c52db7bY.jpg_200x200q80.jpg_.avif",
    qty: 1,
    statusText: "Sorry, your refund request has been declined",
  },
  {
    id: 2,
    returnedAt: "2022-05-12 11:20:53",
    orderId: "#627063239326286",
    product:
      "Lenovo HE05 Wireless Sport Earphone Magnetic Hanging With Bluetooth 5.0",
    image:
      "https://img.drz.lazcdn.com/g/kf/Sd2de1aea6911468db60a02517c52db7bY.jpg_200x200q80.jpg_.avif",
    qty: 1,
    statusText: "Your refund has been approved",
  },
];

export default function MyReturns() {
  return (
    <div className="bg-gray-100 md:-mt-12 p-3 -mt-7 md:p-6">
      <h2 className="text-xl font-semibold mb-4 -mt-4">
        My Returns
      </h2>

      <div className="space-y-4">
        {returns.map((item) => (
          <div
            key={item.id}
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
                  <p>Returned on {item.returnedAt}</p>
                  <p>
                    Order{" "}
                    <span className="text-blue-500">
                      {item.orderId}
                    </span>
                  </p>
                </div>

                <div className="md:mt-0 mt-1">
                  <span className="text-black font-medium">
                    Return to Daraz
                  </span>
                </div>
              </div>

              <Link
                to="/dashboard/returndetails"
                className="text-blue-600 md:self-auto self-start"
              >
                MORE DETAILS
              </Link>
            </div>

            {/* PRODUCT ROW */}
            <div className="
              px-4 py-4
              flex flex-col md:flex-row
              md:items-center
              gap-4 md:gap-6
            ">
              {/* IMAGE */}
              <img
                src={item.image}
                alt=""
                className="w-16 h-16 object-contain"
              />

              {/* PRODUCT INFO */}
              <div className="flex-1">
                <p className="text-sm text-gray-800 leading-snug">
                  {item.product}
                </p>

                {/* Mobile qty */}
                <p className="text-sm text-gray-400 mt-1 md:hidden">
                  Qty: {item.qty}
                </p>
              </div>

              {/* Desktop qty */}
              <div className="hidden md:block text-sm text-gray-400 w-16">
                Qty: {item.qty}
              </div>

              {/* STATUS */}
              <div className="md:w-[220px] md:flex md:justify-center">
                <div className="
                  bg-gray-200 text-gray-700 text-xs
                  text-center px-4 py-2
                  rounded-full leading-snug
                  w-full md:w-auto
                ">
                  {item.statusText}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
