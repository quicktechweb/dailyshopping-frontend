import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useAuth from "../../../../Hooks/useAuth";

const AddAddressBook = () => {
  const { user } = useAuth();
  const userId = user?.userId || "";

  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAddresses = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }
    try {
      const res = await axios.get(
        `https://dailyshopping-backend.onrender.com/api/auth/addresses/${userId}`
      );
      if (res.data.success) setAddresses(res.data.addresses);
    } catch (err) {
      console.error("Fetch addresses error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, [userId]);

  const handleSetDefaultShipping = async (addressId) => {
    try {
      await axios.patch(
        `https://dailyshopping-backend.onrender.com/api/auth/addresses/${userId}/${addressId}/default-shipping`
      );
      fetchAddresses();
    } catch (err) {
      console.error("Set default shipping error:", err);
    }
  };

  const handleSetDefaultBilling = async (addressId) => {
    try {
      await axios.patch(
        `https://dailyshopping-backend.onrender.com/api/auth/addresses/${userId}/${addressId}/default-billing`
      );
      fetchAddresses();
    } catch (err) {
      console.error("Set default billing error:", err);
    }
  };

  return (
    <div className="md:-mt-10 -mt-8">
      <div className="max-w-6xl mx-auto px-4 md:px-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-4">
          <h1 className="text-xl font-semibold text-gray-800  md:mt-0">
            Address Book
          </h1>

          <div className="text-sm text-blue-500 space-x-3 hidden md:block">
            <span className="cursor-pointer">
              Make default shipping address
            </span>
            <span>|</span>
            <span className="cursor-pointer">
              Make default billing address
            </span>
          </div>
        </div>

        {/* CARD */}
        <div className="bg-white">

          {/* TABLE HEADER – desktop only */}
          <div className="hidden md:grid grid-cols-6 px-6 py-3 text-sm text-gray-500 border-b">
            <div>Full Name</div>
            <div className="col-span-2">Address</div>
            <div>Postcode</div>
            <div>Phone Number</div>
            <div></div>
          </div>

          {/* LOADING */}
          {loading && (
            <div className="py-16 text-center text-gray-500 text-sm">
              Loading addresses...
            </div>
          )}

          {/* EMPTY */}
          {!loading && addresses.length === 0 && (
            <div className="py-16 text-center text-gray-500 text-sm">
              No address found
            </div>
          )}

          {/* ROWS */}
          {!loading && addresses.map((addr) => (
            <div
              key={addr._id}
              className="
                border-b
                px-4 py-4
                md:px-6 md:py-6
                md:grid md:grid-cols-6
                text-sm text-gray-800
                space-y-2 md:space-y-0
              "
            >
              {/* NAME */}
              <div className="md:block font-medium">
                {addr.name}
              </div>

              {/* ADDRESS */}
              <div className="md:col-span-2">
                <span className="inline-block bg-orange-500 text-white text-xs px-2 py-0.5 rounded mr-2 mb-1">
                  {addr.label}
                </span>
                <p className="inline md:block">
                  {addr.address}
                </p>
              </div>

              {/* POSTCODE / area */}
              <div className="text-gray-600">
                {[addr.province, addr.city, addr.zone].filter(Boolean).join(" - ")}
              </div>

              {/* PHONE */}
              <div className="text-gray-600">
                (+880) {addr.phone}
              </div>

              {/* ACTION */}
              <div className="md:text-right pt-2 md:pt-0">
                {addr.isDefaultShipping ? (
                  <p className="text-xs text-gray-500">Default Shipping Address</p>
                ) : (
                  <p
                    onClick={() => handleSetDefaultShipping(addr._id)}
                    className="text-xs text-blue-500 cursor-pointer"
                  >
                    Set as Default Shipping
                  </p>
                )}
                {addr.isDefaultBilling ? (
                  <p className="text-xs text-gray-500 mb-2">Default Billing Address</p>
                ) : (
                  <p
                    onClick={() => handleSetDefaultBilling(addr._id)}
                    className="text-xs text-blue-500 cursor-pointer mb-2"
                  >
                    Set as Default Billing
                  </p>
                )}

                <Link
                  to={`/dashboard/editaddress/${addr._id}`}
                  className="text-blue-500 text-sm font-medium"
                >
                  EDIT
                </Link>
              </div>
            </div>
          ))}

          {/* ADD BUTTON */}
          <div className="flex justify-center md:justify-end p-4 md:p-6">
            <Link
              to="/dashboard/addnewaddress"
              className="bg-[#1aa4c8] hover:bg-[#1793b3] text-white px-6 py-3 text-sm font-semibold w-full md:w-auto text-center"
            >
              + ADD NEW ADDRESS
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AddAddressBook;