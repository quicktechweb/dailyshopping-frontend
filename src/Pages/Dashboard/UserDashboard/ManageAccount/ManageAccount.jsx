import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useAuth from "../../../Hooks/useAuth"; // ⚠️ path তোমার ফোল্ডার অনুযায়ী ঠিক করে নিও

const maskEmail = (email) => {
  if (!email) return "";
  const [name, domain] = email.split("@");
  if (!domain) return email;
  return `${name.slice(0, 2)}${"*".repeat(Math.max(name.length - 2, 3))}@${domain}`;
};

export default function ManageAccount() {
  const { user } = useAuth();
  const userId = user?.userId || "";

  const [profile, setProfile] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [orders, setOrders] = useState([]);

  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingAddresses, setLoadingAddresses] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);

  const shippingAddr = addresses.find((a) => a.isDefaultShipping);
  const billingAddr = addresses.find((a) => a.isDefaultBilling);

  useEffect(() => {
    if (!userId) {
      setLoadingProfile(false);
      setLoadingAddresses(false);
      setLoadingOrders(false);
      return;
    }

    // Profile
    axios
      .get(`http://localhost:5000/api/auth/profile/${userId}`)
      .then((res) => {
        if (res.data.success) setProfile(res.data.user);
      })
      .catch((err) => console.error("Profile fetch error:", err))
      .finally(() => setLoadingProfile(false));

    // Addresses
    axios
      .get(`http://localhost:5000/api/auth/addresses/${userId}`)
      .then((res) => {
        if (res.data.success) setAddresses(res.data.addresses);
      })
      .catch((err) => console.error("Addresses fetch error:", err))
      .finally(() => setLoadingAddresses(false));

    // Recent Orders
    axios
      .get("http://localhost:5000/api/my-orders", { params: { userId } })
      .then((res) => {
        setOrders(Array.isArray(res.data) ? res.data.slice(0, 3) : []);
      })
      .catch((err) => console.error("Orders fetch error:", err))
      .finally(() => setLoadingOrders(false));
  }, [userId]);

  return (
    <div className="min-h-screen bg-[#f5f5f5] -mt-10 px-2 md:px-0">
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
              <Link to="/dashboard/editprofile" className="text-[#1a9cb7] text-[12px]">
                EDIT
              </Link>
            </div>

            {loadingProfile ? (
              <p className="text-[13px] text-[#757575]">Loading...</p>
            ) : (
              <>
                <p className="text-[13px] text-[#212121] mb-1">
                  {profile?.displayName || "-"}
                </p>
                <p className="text-[13px] text-[#757575] mb-3">
                  {maskEmail(profile?.email) || "-"}
                </p>

                <label className="flex items-center gap-2 text-[13px] text-[#212121] mb-2">
                  <input type="checkbox" className="accent-[#f57224]" />
                  Receive marketing SMS
                </label>

                <label className="flex items-center gap-2 text-[13px] text-[#212121]">
                  <input type="checkbox" className="accent-[#f57224]" />
                  Receive marketing emails
                </label>
              </>
            )}
          </div>

          {/* Address Book */}
          <div className="bg-white p-5 shadow-sm md:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[14px] font-medium">Address Book</h3>
              <Link to="/dashboard/addressbook" className="text-[#1a9cb7] text-[12px]">
                EDIT
              </Link>
            </div>

            {loadingAddresses ? (
              <p className="text-[13px] text-[#757575]">Loading...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Shipping */}
                <div>
                  <p className="text-[12px] text-[#757575] mb-2">
                    DEFAULT SHIPPING ADDRESS
                  </p>
                  {shippingAddr ? (
                    <>
                      <p className="text-[13px] font-medium">{shippingAddr.name}</p>
                      <p className="text-[13px] text-[#212121] leading-5">
                        {shippingAddr.address}
                        <br />
                        {[shippingAddr.province, shippingAddr.city, shippingAddr.zone]
                          .filter(Boolean)
                          .join(" - ")}
                        <br />
                        (+880) {shippingAddr.phone}
                      </p>
                    </>
                  ) : (
                    <p className="text-[13px] text-[#757575]">No default shipping address</p>
                  )}
                </div>

                {/* Billing */}
                <div className="md:border-l md:border-[#eee] md:pl-6">
                  <p className="text-[12px] text-[#757575] mb-2">
                    DEFAULT BILLING ADDRESS
                  </p>
                  {billingAddr ? (
                    <>
                      <p className="text-[13px] font-medium">{billingAddr.name}</p>
                      <p className="text-[13px] text-[#212121] leading-5">
                        {billingAddr.address}
                        <br />
                        {[billingAddr.province, billingAddr.city, billingAddr.zone]
                          .filter(Boolean)
                          .join(" - ")}
                        <br />
                        (+880) {billingAddr.phone}
                      </p>
                    </>
                  ) : (
                    <p className="text-[13px] text-[#757575]">No default billing address</p>
                  )}
                </div>
              </div>
            )}
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

          {/* Loading */}
          {loadingOrders && (
            <div className="py-10 text-center text-[13px] text-[#757575]">
              Loading orders...
            </div>
          )}

          {/* Empty */}
          {!loadingOrders && orders.length === 0 && (
            <div className="py-10 text-center text-[13px] text-[#757575]">
              No recent orders found
            </div>
          )}

          {/* Rows */}
          {!loadingOrders && orders.map((order) => {
            const firstProduct = order.products?.[0];
            const total = order.products?.reduce(
              (sum, p) => sum + (p.ProductPrice || 0) * (p.quantity || 1),
              0
            );

            return (
              <div
                key={order._id}
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
                    #{order._id?.slice(-10)}
                  </span>
                  <span className="text-[#757575] md:hidden">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString("en-GB")
                      : "-"}
                  </span>
                </div>

                {/* Date (desktop) */}
                <div className="hidden md:block text-[13px] text-[#212121]">
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString("en-GB")
                    : "-"}
                </div>

                {/* Item */}
                <div className="flex items-center gap-3">
                  <img
                    src={firstProduct?.img}
                    alt="item"
                    className="w-12 h-12 border object-cover"
                  />
                  <div className="md:hidden text-[13px] text-[#212121]">
                    ৳ {total || 0}
                  </div>
                </div>

                {/* Total (desktop) */}
                <div className="hidden md:block text-[13px] text-[#212121]">
                  ৳ {total || 0}
                </div>

                {/* Manage */}
                <div className="text-right md:text-left">
                  <Link
                    to={`/dashboard/orderdetails/${order._id}`}
                    className="text-[#1a9cb7] text-[13px] hover:underline"
                  >
                    MANAGE
                  </Link>
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
}