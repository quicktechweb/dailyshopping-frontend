
export default function ReturnDetails() {
  const steps = [
    "We have received your return request",
    "Pending Pick Up",
    "Your return package is on its way to our logistics facility",
    "Return Package Received",
    "Sorry, your refund request has been declined",
  ];

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
          <div>Returned on 2024-10-17 12:33:04</div>
          <div>
            Order{" "}
            <span className="text-blue-600">
              #664790081026286
            </span>
          </div>
          <div className="text-xs">
            RA Code: RN924783234926286
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
                    index === steps.length - 1
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
                    index === steps.length - 1
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
            2024-10-17 12:33:04
          </span>
          <p>
            If you have selected the pick-up option, the courier will contact
            you. If you have selected the drop-off option, please drop your
            return product to the nearest Daraz Hub/ Daraz Shop. Please pack
            the return product(s) securely and stick the return shipping label
            or write the tracking number and order number on the outer side of
            the package.
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
          src="https://img.drz.lazcdn.com/g/kf/Sd2de1aea6911468db60a02517c52db7bY.jpg_200x200q80.jpg_.avif"
          alt=""
          className="w-16 h-16 object-contain"
        />

        <div className="flex-1">
          <p className="text-sm font-medium text-gray-800">
            Lotto Casual Lifestyle Shoes for Men
          </p>
          <p className="text-sm text-gray-500">
            Reason: Item does not fit me
          </p>
        </div>

        <div className="flex justify-between md:block text-sm">
          <div className="text-gray-800 font-medium">
            ৳ 632
          </div>
          <div className="text-gray-400">
            Qty: 1
          </div>
        </div>
      </div>
    </div>
  );
}
