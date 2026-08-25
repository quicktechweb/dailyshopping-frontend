import { Link } from "react-router-dom";

const AddAddressBook = () => {
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

          {/* ROW */}
          <div
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
              Rezwan
            </div>

            {/* ADDRESS */}
            <div className="md:col-span-2">
              <span className="inline-block bg-orange-500 text-white text-xs px-2 py-0.5 rounded mr-2 mb-1">
                HOME
              </span>
              <p className="inline md:block">
                House-45, Road-12, Block-C, Green View Residency, Banani
                House-45, Road-12, Block-C, Green View Residency, Banani
              </p>
            </div>

            {/* POSTCODE */}
            <div className="text-gray-600">
             Dhaka - Dhaka - North - Banani

            </div>

            {/* PHONE */}
            <div className="text-gray-600">
              (+880) 01799399918
            </div>

            {/* ACTION */}
            <div className="md:text-right pt-2 md:pt-0">
              <p className="text-xs text-gray-500">
                Default Shipping Address
              </p>
              <p className="text-xs text-gray-500 mb-2">
                Default Billing Address
              </p>

              <Link
                to="/dashboard/editaddress"
                className="text-blue-500 text-sm font-medium"
              >
                EDIT
              </Link>
            </div>
          </div>

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
