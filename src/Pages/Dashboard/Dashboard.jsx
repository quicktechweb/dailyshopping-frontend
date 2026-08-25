import { useState } from "react";
import { FaBars,  FaTimes } from "react-icons/fa";
import { Outlet } from "react-router-dom";
// import useTitle from "../hooks/useTitle";
import DashboardSideBar from "./DashboardSideBar/DashboardSideBar";
import Footer from "../Shared/Footer/Footer";
import Navbar from "../Shared/Navbar/Navbar";
import DashboardNavbar from "./UserDashboard/DashboardNavbar/DashboardNavbar";
// import useFirebase from "../Hooks/useFirebase";

const Dashboard = () => {
//   useTitle("Dashboard Home");
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [isOpens, setIsOpens] = useState(false);
  // const { admin,subadmin } = useFirebase();
  // console.log(subadmin)


  const toggleDropdown = () => {
    setIsOpens(!isOpens);
  };
  // const value = 1;
  return (
  <div className="min-h-screen flex flex-col ">
    <div className="md:hidden">
    <DashboardNavbar />
  </div>

  <div className="hidden md:block">
    <Navbar />
  </div>

  <div className="flex justify-center flex-1 bg-gray-100">
    <div className="relative flex w-full max-w-7xl">

      {/* MOBILE OVERLAY */}
      {isOpenSidebar && (
        <div
          onClick={() => setIsOpenSidebar(false)}
          className="fixed  inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`
         fixed md:static z-50 md:z-auto
    top-0 left-0 h-screen md:h-auto
    w-[100%] sm:w-[65%] md:w-[25%]
    bg-white md:bg-transparent
    transform transition-transform duration-300 ease-in-out
    ${isOpenSidebar ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0
         
         
        `}
      >
        {/* mobile close */}
        <div className="md:hidden flex justify-end p-4 -mt-1">
          <FaTimes
            onClick={() => setIsOpenSidebar(false)}
            className="text-2xl text-white cursor-pointer"
          />
        </div>

        <DashboardSideBar  setIsOpenSidebar={setIsOpenSidebar} />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 md:w-[75%] mt-24 md:mt-36 mb-20    ">

        {/* HEADER */}
        <div className="flex items-center justify-between py-3 px-4 md:pl-16 md:py-1">
          {/* mobile menu */}
        {/* mobile menu */}
{/* Mobile Menu Button */}
{!isOpenSidebar && (
  <div className="md:hidden fixed top-4 left-4 z-[9999]">
    <FaBars
      onClick={() => setIsOpenSidebar(true)}
      className="text-2xl text-green-700 cursor-pointer p-1 hover:bg-orange-100 transition-colors"
    />
  </div>
)}




          {/* desktop search */}
          <div className="hidden md:flex ms-24 p-5">
            <div className="relative w-full max-w-md" />
          </div>

          <div />
        </div>

        {/* CONTENT */}
        <div className="px-2 ">
          <Outlet />
        </div>
      </div>

    </div>
  </div>

  <Footer />
</div>

  );
};
       
export default Dashboard;
