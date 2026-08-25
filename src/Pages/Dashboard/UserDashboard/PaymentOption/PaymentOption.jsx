import { FaCcVisa } from "react-icons/fa";

const PaymentOptions = () => {
  return (
    <div className=" bg-gray-100 py-8 px-4 -mt-20">
      <div className="max-w-5xl mx-auto">

        {/* PAGE TITLE */}
        <h1 className="text-xl font-semibold text-gray-800 mb-6">
          My Payment Options
        </h1>

        {/* ================= CREDIT / DEBIT CARD ================= */}
        <div className="bg-white rounded-sm mb-6">
          <div className="px-6 pt-5 pb-3">
            <h2 className="text-base font-semibold text-gray-800 mb-4">
              Select Payment Method
            </h2>

            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Credit / Debit Card
            </h3>

            {/* TABLE HEADER */}
            <div className="grid grid-cols-12 text-xs text-gray-500 pb-2 border-b">
              <div className="col-span-6">Card Number</div>
              <div className="col-span-4">Expiry Date</div>
              <div className="col-span-2 text-right"></div>
            </div>

            {/* ROW */}
            <div className="grid grid-cols-12 items-center py-4">
              <div className="col-span-6 flex items-center gap-3">
                <FaCcVisa className="text-blue-600 text-3xl" />
                <span className="text-sm text-gray-800">
                  7792******7289
                </span>
              </div>

              <div className="col-span-4 text-sm text-gray-700">
                Expires 08/32
              </div>

              <div className="col-span-2 text-right">
                <button className="text-sm text-blue-600 hover:underline">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================= DIGITAL WALLET ================= */}
        <div className="bg-white rounded-sm">
          <div className="px-6 pt-5 pb-3">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Digital Wallet
            </h3>

            {/* TABLE HEADER */}
            <div className="grid grid-cols-12 text-xs text-gray-500 pb-2 border-b">
              <div className="col-span-6">Card Number</div>
              <div className="col-span-4">Expiry Date</div>
              <div className="col-span-2 text-right"></div>
            </div>

            {/* ROW */}
            <div className="grid grid-cols-12 items-center py-4">
              <div className="col-span-6 flex items-center gap-3">
                <img
                  src="https://laz-img-cdn.alicdn.com/tfs/TB14FT1JpOWBuNjy0FiXXXFxVXa-400-400.png"
                  alt="Wallet"
                  className="h-7"
                />
                <span className="text-sm text-gray-800">
                  017******518
                </span>
              </div>

              <div className="col-span-4 text-sm text-gray-700"></div>

              <div className="col-span-2 text-right">
                <button className="text-sm text-blue-600 hover:underline">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PaymentOptions;
