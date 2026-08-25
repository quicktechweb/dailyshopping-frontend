import { useState } from "react";
import { 
  FaHome, FaUsers, FaChartLine, FaBell, FaTags, FaBoxOpen, FaCog, FaShoppingCart, FaDollarSign,
  FaGift, FaWarehouse,  FaClipboardList, FaMedal, 
  FaLayerGroup, FaDesktop, FaMobileAlt, FaHeart, FaUserShield, FaFileAlt, FaPenFancy, FaChartPie, 
  FaMoneyBillWave, FaPaperPlane,
  FaSellcast,
  FaSignOutAlt,
  FaCertificate,
  FaStarHalfAlt,
  FaFileInvoiceDollar,
  FaChartBar,
  FaTasks,
  FaClock,
  FaDatabase,
  FaInfoCircle,
  FaPhone,
  FaEnvelope,
  FaShippingFast,
  FaQuestionCircle,
  FaShoppingBag,
  FaAward,
  FaBox,
  FaStore,
  FaBullhorn,
  FaRocket,
  FaHandshake,
  FaTruck,
  FaClipboard,
  FaUser,
  FaWallet
} from "react-icons/fa";

import { Link, NavLink, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import useAuth from "../../Hooks/useAuth";
import { ChevronRight, XCircleIcon } from "lucide-react";
import { ChevronLeft, MessageSquare, ShoppingBag, RotateCcw, XCircle, Heart, Ticket, Star, MapPin, CreditCard, User, Settings, FileText, MessageCircle, HelpCircle } from "lucide-react";
import { BsCreditCard } from "react-icons/bs";

const DashboardSideBar = ({ setIsOpenSidebar }) => {
   const {  user, userLogOut } = useAuth();
   const role = user?.newpartroles; // SUPERadmin, moderator, support, or user
   const newroles = user?.newpartuser; // SUPERadmin, moderator, support, or user
  console.log("User role:", role);
  

  // State for toggling sections dynamically
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (key) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

   

  // Sidebar configuration
  const sidebarItems = 
  [
   

    
   {
  key: "MyProfile",
  title: "My Profile",
  roles: ["user"],
  icon: FaUser,
  permissionKey: "MyProfile",
  path: "/dashboard/myprofile"
},
   {
  key: "Address Book",
  title: "Address Book",
  roles: ["user"],
  icon: FaClipboardList,
  permissionKey: "Address Book",
  path: "/dashboard/addressbook"
},
   {
  key: "My Payment Option",
  title: "My Payment Option",
  roles: ["user"],
  icon: FaWallet,
  permissionKey: "My Payment Option",
  path: "/dashboard/paymentoption"
},
    
    {
      key: "WishList",
      title: "WishList",
      roles: ["user"],
      icon: FaHeart,
      permissionKey: "WishList",
      links: [{ title: "Show",icon: FaAward, path: "/dashboard/userwhitelist" }],
    },
   

  
    {
      key: "profile",
      title: "Profile",
       roles: ["user"],
      icon: FaUserShield,
      permissionKey: "profile",
      links: [
        { title: "My Profile",icon: FaChartPie, path: "/dashboard/myprofile" },
        // { title: "ShowProducts", path: "/dashboard/showproducts" },
      ],
    },
   
  
  
 
  
  ];
  


  const sidebarorderItems = 
  [
   

    
   {
  key: "My Return",
  title: "My Return",
  roles: ["user"],
  icon: FaMoneyBillWave,
  permissionKey: "MyReturn",
  path: "/dashboard/myreturn"
},
   {
  key: "My Cancellation",
  title: "My Cancellation",
  roles: ["user"],
  icon: XCircleIcon,
  permissionKey: "MyCancellation",
  path: "/dashboard/mycancellation"
},
   
 
  
  ];

  // Helper to check if the user can see a sidebar item
   // Helper to check if the user can see a sidebar item
//  const canSee = (item) => {
//   if (!user || !user.newpartroles) return false;

//   // Normalize roles
//   const roles = Array.isArray(user.newpartroles) ? user.newpartroles : [user.newpartroles];
//   const permissions = user.permissions || {};

//   // 🟢 SUPERadmin → everything except user-only
//   if (roles.includes("SUPERadmin")) {
//     if (item.roles?.includes("user")) return false;
//     return true;
//   }

//   // 🟡 Normal ADMIN/MODERATOR/SUPPORT etc (non-user)
//   const isUserRole = roles.includes("user");

//   // USER → only "user" role specific menu
//   if (isUserRole) {
//     return item.roles?.includes("user") || false;
//   }

//   // OTHER ROLES (admin/mod/support/custom)
//   // Menu তে যদি permissionKey নাই → free menu → দেখাও
//   if (!item.permissionKey) return true;

//   // যদি user.permissions[item.permissionKey].enabled true → দেখাও
//   if (permissions[item.permissionKey]?.enabled) return true;

//   // Default deny
//   return false;
// };
const navigate = useNavigate();

const menu = [
  { icon: MessageSquare, label: "Message", path: "/dashboard/message" },
  { icon: ShoppingBag, label: "My Orders", path: "/dashboard/myorder" },
  { icon: RotateCcw, label: "My Returns", path: "/dashboard/myreturn" },
  { icon: XCircle, label: "My Cancellations", path: "/dashboard/mycancellation" },
  { icon: Heart, label: "My Wishlist & Followed Stores", path: "/dashboard/mywishlist" },
  { icon: Ticket, label: "My Reviews", path: "/dashboard/myreviews" },
  { icon: Star, label: "My Profile", path: "/dashboard/myprofile" },
  { icon: MapPin, label: "Address Book", path: "/dashboard/addressbook" },
  { icon: CreditCard, label: "My Payment Options", path: "/dashboard/paymentoption" },
  { icon: User, label: "Account Information", path: "/dashboard/accountinformation" },
];

const bottomMenu = [
  { icon: Settings, label: "Setting", path: "/dashboard/settings" },
  { icon: FileText, label: "Policies", path: "/dashboard/policy" },
  { icon: MessageCircle, label: "Feedback", path: "/dashboard/feedback" },
  // { icon: HelpCircle, label: "Help", path: "/help" },
  // { icon: MessageSquare, label: "Chat with us", path: "/chat" },
];



const canSee = (item) => {
  // static user only
  // const roles = user.newpartroles;

  // শুধু user role এর menu দেখাবে
  return item.roles?.includes("user") || false;
};

 
  return (
    <>
    <div className="w-full  md:mt-32 mt-12 ">
  {/* OUTER SHADOW WRAPPER */}
  <div
    className="
      bg-white
      rounded-3xl
      
      border border-gray-200
       my-4
    "
  >

    <div className="md:hidden -mt-[105px] h-screen overflow-hidden">
      <div className="  bg-gray-100 h-full
      overflow-y-auto
      scrollbar-hide">
{/* Header */}
<div>
  <div className="bg-green-700  text-white px-4 py-3 flex items-center gap-3 ">
<ChevronLeft className="w-5 h-5"  onClick={() => navigate(-1)} />
<h1 className="text-lg font-semibold">My Account</h1>
</div>
</div>


{/* Greeting */}
<div className="bg-white px-4 py-3 text-sm text-gray-700">
Hello, <span className="font-semibold">Rezwan Rashid</span>
</div>


{/* Menu List */}
<div className="bg-white divide-y ">
  {menu.map((item, i) => (
    <Link
      key={i}
      to={item.path}
       onClick={() => setIsOpenSidebar(false)}
      className="flex items-center gap-4 px-4 py-3 max-w-sm mx-auto text-gray-700 active:bg-gray-100"
    >
      <item.icon className="w-5 h-5 text-gray-400" />
      <span className="text-sm">{item.label}</span>
    </Link>
  ))}
</div>



{/* Bottom Section */}
<div className="mt-2 bg-white divide-y">
  {bottomMenu.map((item, i) => (
    <Link
      key={i}
      to={item.path}
       onClick={() => setIsOpenSidebar(false)}
      className="flex items-center gap-4 max-w-sm mx-auto px-4 py-3 text-gray-700 active:bg-gray-100"
    >
      <item.icon className="w-5 h-5 text-gray-400" />
      <span className="text-sm">{item.label}</span>
    </Link>
  ))}
</div>



{/* SMS Toggle */}
<div className="mt-2 bg-white px-4 py-3 flex items-center justify-between">
<p className="text-xs text-gray-500 max-w-[75%]">
Id like to receive exclusive offers and promotions via SMS
</p>
<div className="w-10 h-5 bg-gray-300 rounded-full relative">
<div className="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5" />
</div>
</div>
</div>
    </div>
    <section className="flex flex-col gap-3 px-2 py-4">

      {/* Dashboard Home */}
      <div className="grid ">
        <NavLink to="/dashboard">
          <div
            className="
              dashboardNavLink group ml-3 mt-2
              flex items-center gap-2 p-2 rounded-xl
              bg-white  
               hover:shadow-md
              hover:-translate-y-[1px]
              transition-all duration-300 active:scale-95
            "
          >
           
          </div>
        </NavLink>
      </div>

      {/* Dynamic Sidebar Items */}
      <Link to="/dashboard/manageaccount" className="-mt-5">
       <h2 className="ms-5 font-semibold">Manage My Account</h2>
      </Link>
     
   {sidebarItems.map((item) => {
  if (!canSee(item)) return null;

  // ================= SINGLE LINK (NO DROPDOWN) =================
  if (!item.links) {
    return (
      <NavLink
        key={item.key}
        to={item.path}
        onClick={() => setIsOpenSidebar(false)}
        className={({ isActive }) =>
          `
            ml-2 flex items-center gap-2 p-1 ms-5 rounded-xl
            border-l-[4px]
            transition-all duration-300
            ${
              isActive
                ? "border-[#007cde]  "
                : "border-transparent  hover:bg-gray-50"
            }
          `
        }
      >
        <item.icon
          className={`text-[18px] ${
            location.pathname === item.path
              ? "text-[#007cde]"
              : "text-gray-500"
          }`}
        />
        <span
          className={`text-sm font-semibold ${
            location.pathname === item.path
              ? "text-[#007cde]"
              : "text-gray-900"
          }`}
        >
          {item.title}
        </span>
      </NavLink>
    );
  }

  // ================= DROPDOWN ITEM =================
  
})}


 <Link to="/dashboard/myorder">
  <h2 className="ms-5 font-semibold"> My Orders</h2>

 </Link>
   {sidebarorderItems.map((item) => {
  if (!canSee(item)) return null;

  // ================= SINGLE LINK (NO DROPDOWN) =================
  if (!item.links) {
    return (
      <NavLink
        key={item.key}
        to={item.path}
        onClick={() => setIsOpenSidebar(false)}
        className={({ isActive }) =>
          `
            ml-2 flex items-center gap-2 p-1 ms-5 rounded-xl
            border-l-[4px]
            transition-all duration-300
            ${
              isActive
                ? "border-[#007cde] "
                : "border-transparent  hover:bg-gray-50"
            }
          `
        }
      >
        <item.icon
          className={`text-[18px] ${
            location.pathname === item.path
              ? "text-[#007cde]"
              : "text-gray-500"
          }`}
        />
        <span
          className={`text-sm font-semibold ${
            location.pathname === item.path
              ? "text-[#007cde]"
              : "text-gray-900"
          }`}
        >
          {item.title}
        </span>
      </NavLink>
    );
  }

  // ================= DROPDOWN ITEM =================
  
})}

<Link to="/dashboard/myreviews">
  <h2 className="ms-5 font-semibold"> My Reviews</h2>

 </Link>
<Link to="/dashboard/mywishlist">
  <h2 className="ms-5 font-semibold"> My Wishlist</h2>

 </Link>

      {/* Logout */}
      <button
        onClick={async () => {
          try {
            await userLogOut();
            window.location.href = "/";
          } catch (error) {
            console.error("Logout failed:", error);
          }
        }}
        className="
          mt-6 ml-5 flex items-center gap-2
          rounded-xl px-4 py-2
          text-gray-700 font-semibold text-sm
          bg-white 
          hover:shadow-md hover:text-red-600
          transition-all duration-300 active:scale-95
        "
      >
        <FaSignOutAlt className="text-base" />
        Log out
      </button>

    </section>
  </div>
</div>

      {/* <div className="w-full h-[2px] bg-white mt-5"></div> */}
    </>
  );
};

DashboardSideBar.propTypes = {
  setIsOpenSidebar: PropTypes.func.isRequired,
};

export default DashboardSideBar;
