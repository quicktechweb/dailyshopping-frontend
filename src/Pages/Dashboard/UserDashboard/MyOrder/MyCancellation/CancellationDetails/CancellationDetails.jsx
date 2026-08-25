const cancelledOrders = [
  {
    id: "#620135942526286",
    date: "2021-10-23 08:40:22",
    items: [
      {
        id: 1,
        name: "ক্যাউন্ড u1 মাইক্ৰোফোন প্রফেশনাল লাভালিয়ার মাইক্ৰোফোন",
        price: 130,
        qty: 1,
        reason: "Don't want this order/item anymore",
        image: "https://static-01.daraz.com.bd/p/6feb7301a8a504df89b9944a0f58e87b.jpg",
      },
      {
        id: 2,
        name: "সব অ্যান্ড্রয়েড ফোনের জন্য মাইকের সাথে সাউন্ড উচ্চ মানের বেজেস ইয়ারফোন বেচ ১ টি ফ্রি",
        price: 111,
        qty: 1,
        reason: "Don't want this order/item anymore",
        image: "https://static-01.daraz.com.bd/p/6feb7301a8a504df89b9944a0f58e87b.jpg",
      },
    ],
  },
];

const CancellationDetails = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 md:-mt-16 -mt-4">
      {cancelledOrders.map((order) => (
        <div key={order.id} className=" rounded  overflow-hidden">
          {/* Header */}
          <div className="p-4 bg-white  border-b">
            <h2 className="text-lg font-semibold text-gray-800">Cancellation Details</h2>
            <p className="text-sm text-gray-500 mt-1">
              Canceled on {order.date} <br />
              Order <span className="text-blue-600 font-medium">{order.id}</span>
            </p>
          </div>

          {/* Items */}
          <div className="space-y-6 mt-2">
            {order.items.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded ">
                
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
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded"
                  />

                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="font-medium text-gray-800">{item.name}</h3>
                    <p className="text-gray-500 text-sm mt-1">{item.reason}</p>
                    <p className="text-gray-700 mt-2 font-medium">
                      Tk {item.price} &nbsp; | &nbsp; Qty: {item.qty}
                    </p>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CancellationDetails;
