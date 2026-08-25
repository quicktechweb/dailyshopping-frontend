export default function ManageAccount() {
  return (
    <div className="min-h-screen bg-[#f5f5f5] md:-mt-24 -mt-28 px-2 md:px-0">
      <div className="max-w-[1180px] mx-auto space-y-4">

        {/* Page Title */}
        <h2 className="text-[18px] mt-6 md:mt-0 font-medium text-[#212121]">
          Manage My Account
        </h2>

        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Personal Profile */}
          <div className="bg-white p-5 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-[14px] font-medium">Personal Profile</h3>
              <button className="text-[#1a9cb7] text-[12px]">EDIT</button>
            </div>

            <p className="text-[13px] text-[#212121] mb-1">Alex Johnson</p>
            <p className="text-[13px] text-[#757575] mb-3">
              an********@gmail.com
            </p>

            <label className="flex items-center gap-2 text-[13px] text-[#212121] mb-2">
              <input type="checkbox" className="accent-[#f57224]" />
              Receive marketing SMS
            </label>

            <label className="flex items-center gap-2 text-[13px] text-[#212121]">
              <input type="checkbox" className="accent-[#f57224]" />
              Receive marketing emails
            </label>
          </div>

          {/* Address Book */}
          <div className="bg-white p-5 shadow-sm md:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[14px] font-medium">Address Book</h3>
              <button className="text-[#1a9cb7] text-[12px]">EDIT</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Shipping */}
              <div>
                <p className="text-[12px] text-[#757575] mb-2">
                  DEFAULT SHIPPING ADDRESS
                </p>
                <p className="text-[13px] font-medium">Rezwan</p>
                <p className="text-[13px] text-[#212121] leading-5">
                 House-45, Road-12, Block-C, Green View Residency, Banani<br />
                 Dhaka - Dhaka - North - Banani<br />
                  (+880) 01799399918
                </p>
              </div>

              {/* Billing */}
              <div className="md:border-l md:border-[#eee] md:pl-6">
                <p className="text-[12px] text-[#757575] mb-2">
                  DEFAULT BILLING ADDRESS
                </p>
                <p className="text-[13px] font-medium">Rezwan</p>
                <p className="text-[13px] text-[#212121] leading-5">
                  House-45, Road-12, Block-C, Green View Residency, Banani<br />
                  Dhaka - Dhaka - North - Banani<br />
                  (+880) 01773889818
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white shadow-sm">

          <div className="px-5 py-4 border-b">
            <h3 className="text-[14px] font-medium">Recent Orders</h3>
          </div>

          {/* Desktop Table Header */}
          <div className="hidden md:grid grid-cols-5 px-5 py-3 text-[13px] text-[#757575] border-b">
            <div>Order #</div>
            <div>Placed On</div>
            <div>Items</div>
            <div>Total</div>
            <div></div>
          </div>

          {/* Rows */}
          {[1, 2, 3].map((_, i) => (
            <div
              key={i}
              className="
                border-b last:border-b-0
                px-4 py-4
                md:grid md:grid-cols-5 md:items-center
                space-y-2 md:space-y-0
              "
            >
              {/* Order */}
              <div className="flex justify-between md:block text-[13px]">
                <span className="text-[#212121] font-medium md:font-normal">
                  #6831446286
                </span>
                <span className="text-[#757575] md:hidden">
                  14/01/2026
                </span>
              </div>

              {/* Date (desktop) */}
              <div className="hidden md:block text-[13px] text-[#212121]">
                14/01/2026
              </div>

              {/* Item */}
              <div className="flex items-center gap-3">
                <img
                  src="https://static-01.daraz.com.bd/p/588d146f6e5c99b0caddf70bde00e518.jpg"
                  alt="item"
                  className="w-12 h-12 border"
                />
                <div className="md:hidden text-[13px] text-[#212121]">
                  ৳ 107
                </div>
              </div>

              {/* Total (desktop) */}
              <div className="hidden md:block text-[13px] text-[#212121]">
                ৳ 107
              </div>

              {/* Manage */}
              <div className="text-right md:text-left">
                <button className="text-[#1a9cb7] text-[13px] hover:underline">
                  MANAGE
                </button>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
