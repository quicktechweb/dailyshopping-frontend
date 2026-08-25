import { useContext, useEffect, useRef, useState } from "react";
import { FaBars, FaQrcode, FaSearch, FaShoppingCart } from "react-icons/fa";
import {
  FiArrowLeft,
  FiBell,
  FiBookmark,
  FiChevronDown,
  FiCreditCard,
  FiHeart,
  FiMail,
  FiMapPin,
  FiMenu,
  FiMessageSquare,
  FiSearch,
  FiShare2,
  FiShoppingCart,
  FiSmartphone,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import axios from "axios";
import { ScanSearch } from "lucide-react";

const Navbar = () => {

    const [active, setActive] = useState(null);
      const [categories, setCategories] = useState([]);
        const [products, setProducts] = useState([]);
          const timer = useRef(null);
        
              const [open, setOpen] = useState(false);
                 const cartProducts = useContext(CartContext)[0];
                    
                     let totalQuantity = cartProducts.reduce((acc, product) => acc + (product.quantity || 1), 0);
      
    const [showNavbar, setShowNavbar] = useState(true);
const lastScrollY = useRef(0);

useEffect(() => {
  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }

    lastScrollY.current = currentScrollY;
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);


  

      useEffect(() => {
          const fetchProducts = async () => {
            try {
              const res = await fetch("https://serverluckyshop.luckyshop.com.bd/api/products");
              const data = await res.json();
              setProducts(data);
            } catch (err) {
              console.error("Error fetching products:", err);
            }
          };
          fetchProducts();
        }, []);
      
        // Build category → subcategory → childcategory structure
        useEffect(() => {
          const catMap = {};
          products.forEach((product) => {
            if (!product.categoryName) return;
      
            if (!catMap[product.categoryName]) {
              catMap[product.categoryName] = {
                name: product.categoryName,
                image: product.categoryImg || "",
                sub: [],
              };
            }
      
            if (product.subcategoryName) {
              let subcat = catMap[product.categoryName].sub.find(
                (s) => s.title === product.subcategoryName
              );
              if (!subcat) {
                subcat = {
                  title: product.subcategoryName,
                  image: product.subcategoryImg || "",
                  children: [],
                };
                catMap[product.categoryName].sub.push(subcat);
              }
      
              if (product.childcategoryName) {
                const exists = subcat.children.find(
                  (c) => c.name === product.childcategoryName
                );
                if (!exists) {
                  subcat.children.push({
                    name: product.childcategoryName,
                    image: product.childcategoryImg || product.images?.[0] || "",
                  });
                }
              }
            }
          });
          setCategories(Object.values(catMap));
        }, [products]);

        const handleEnter = () => {
    clearTimeout(timer.current);
    setOpen(true);
  };

  const handleLeave = () => {
    timer.current = setTimeout(() => setOpen(false), 150);
    setActive(null);
  };

  // Close mega menu on click
  const closeMegaMenu = () => {
    setOpen(false);
    setActive(null);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white ">
      {/* TOP PROMO BAR (normal scroll) */}
      <div className="w-full bg-white border-b hidden sm:block">
        <div className="max-w-[1240px] mx-auto px-6 py-2 flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <FiSmartphone className="text-gray-500" />
            <span className="font-medium">
              Free Shipping + Many Shopping Promotions in the App
            </span>
            <span className="text-gray-400">›</span>
          </div>

          <div className="flex items-center gap-6 text-gray-500">
            <span className="hover:text-gray-700 cursor-pointer">
              About DailyShopping
            </span>
            <Link to="/sellerRegistration">
             <span className="hover:text-gray-700 cursor-pointer">
              Start Selling
            </span>
            </Link>
           <Link to="/promopart">
            <span className="hover:text-gray-700 cursor-pointer">Promo</span>
           </Link>
           
            <span className="hover:text-gray-700 cursor-pointer">
              DailyShopping Care
            </span>
          </div>
        </div>
      </div>

      {/* MAIN NAVBAR (STICKY) */}
      <div className="w-full hidden sm:block  sticky top-0  z-50 bg-white   border-b">
        <div className="max-w-[1240px] mx-auto px-6 py-4 flex items-center gap-6">
          {/* LOGO */}
          <Link to="/"><img className="w-20 h-10" src="https://i.ibb.co.com/CKCp8K3q/Daily-Shopping-Logo-2.png"/></Link>
          {/* <span className="text-[#03AC0E] text-3xl font-extrabold">
            DailyShopping
          </span> */}

          {/* CATEGORY */}
            <div
                      className="relative hidden md:block ms-4"
                      onMouseEnter={handleEnter}
                      onMouseLeave={handleLeave}
                    >
                      <button className="flex items-center gap-2 font-semibold text-gray-800 hover:text-black transition">
                        <FaBars /> <span>All Categories</span>
                      </button>
          
                      {/* Mega Menu */}
                      <div
                        className={`absolute left-0 top-full mt-4 bg-white shadow-2xl border border-gray-200 rounded-2xl overflow-hidden
                          transition-all duration-300 ease-out
                          ${open
                            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                            : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
                          }`}
                        style={{ zIndex: 9999 }}
                      >
                        <div className="flex w-[1150px] h-[500px] relative">
          
                          {/* Left Column: Categories */}
                          <ul className="w-1/3 bg-gray-50 border-r border-gray-200 overflow-y-auto">
                            {categories.map((cat, idx) => (
                              <li
                                key={cat.name}
                                onMouseEnter={() => setActive(idx)}
                                className={`flex items-center px-4 py-4 text-sm cursor-pointer transition-colors duration-200 rounded-r-lg
                                  ${active === idx
                                    ? "bg-white text-black font-semibold shadow-inner"
                                    : "hover:bg-gray-100 text-gray-700"
                                  }`}
                              >
                                <Link
                                  to={`/category/${encodeURIComponent(cat.name)}`}
                                  className="flex items-center w-full"
                                  onClick={closeMegaMenu}
                                >
                                  {cat.image && (
                                    <img
                                      src={cat.image}
                                      alt={cat.name}
                                      className="w-6 h-6 mr-2 object-cover rounded"
                                    />
                                  )}
                                  {cat.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
          
                          {/* Right Column: Active Category Details */}
                          {active !== null && categories[active] && (
                            <div className="flex-1 bg-white p-6 overflow-y-auto z-50">
                              <h3 className="text-xl font-semibold text-gray-800 mb-5 border-b border-gray-200 pb-3">
                                {categories[active].name}
                              </h3>
          
                              {/* Childcategory Images */}
                              <div className="flex flex-wrap gap-4 mb-6">
                                {categories[active].sub.flatMap((sub) =>
                                  sub.children.map((child) => (
                                    <Link
                                      key={child.name}
                                      to={`/category/${encodeURIComponent(
                                        categories[active].name
                                      )}/${encodeURIComponent(sub.title)}/${encodeURIComponent(child.name)}`}
                                      className="flex flex-col items-center w-20 hover:scale-105 transition-transform"
                                      onClick={closeMegaMenu}
                                    >
                                      {child.image && (
                                        <img
                                          src={child.image}
                                          alt={child.name}
                                          className="w-16 h-16 object-contain rounded-lg border p-1 shadow-sm"
                                        />
                                      )}
                                      <h5 className="text-xs mt-2 text-gray-700 font-medium text-center">
                                        {child.name}
                                      </h5>
                                    </Link>
                                  ))
                                )}
                              </div>
          
                              {/* Subcategory List */}
                              <div className="grid grid-cols-2 gap-6">
                                {categories[active].sub.map((subItem) => (
                                  <div key={subItem.title}>
                                    <h4 className="font-semibold text-gray-700 mb-3">
                                      <Link
                                        to={`/category/${encodeURIComponent(
                                          categories[active].name
                                        )}/${encodeURIComponent(subItem.title)}`}
                                        className="hover:text-red-600 transition-colors"
                                        onClick={closeMegaMenu}
                                      >
                                        {subItem.title}
                                      </Link>
                                    </h4>
                                    <ul className="space-y-2">
                                      {subItem.children.map((child) => (
                                        <li key={child.name}>
                                          <Link
                                            to={`/category/${encodeURIComponent(
                                              categories[active].name
                                            )}/${encodeURIComponent(subItem.title)}/${encodeURIComponent(child.name)}`}
                                            className="text-sm text-gray-600 hover:text-black transition-colors duration-200"
                                            onClick={closeMegaMenu}
                                          >
                                            {child.name}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
          
                        </div>
                      </div>
                    </div>

          {/* SEARCH BAR */}
          <div className="flex-1">
            <div className="flex items-center border rounded-lg px-4 py-2">
              <FiSearch className="text-gray-400 text-lg" />
              <input
                type="text"
                placeholder="Search on DailyShopping"
                className="w-full px-3 outline-none text-sm"
              />
            </div>
          </div>

          {/* CART */}
           {/* Cart */}
                    <Link to="/orderreview">
                      <div className="flex flex-col items-center relative">
                        <div className="relative">
                          <FaShoppingCart className="text-2xl text-gray-800" />
                          <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                            {totalQuantity || 0}
                          </span>
                        </div>
                        <p className="text-xs font-medium text-gray-700 mt-1">Cart</p>
                      </div>
                    </Link>

          {/* AUTH */}
          <div className="flex items-center gap-3">
           <Link to="/login">
            <button className="px-4 py-2 text-sm font-semibold border border-[#03AC0E] text-[#03AC0E] rounded-lg hover:bg-green-50">
              Login
            </button></Link>
            <Link to="/registration">
               <button className="px-4 py-2 text-sm font-semibold bg-[#03AC0E] text-white rounded-lg hover:bg-green-700">
              Sign Up
            </button>
            </Link>
         
          </div>

          {/* LOCATION */}
          <div className="flex items-center gap-1 text-sm text-gray-600 cursor-pointer hover:text-gray-800">
            <FiMapPin />
            <span>Ship to</span>
            <span className="font-semibold text-gray-800">
              Central Road
            </span>
            <FiChevronDown className="text-gray-500 ml-1" />
          </div>
        </div>
      </div>

      {/* mobile responsive  */}
     <div className="sm:hidden fixed top-0 left-0 w-full bg-white z-50 border-b">
      <div className="flex items-center px-3 py-2 gap-2">

        {/* 🔍 Search */}
        <div className="flex flex-1 items-center border border-gray-500 rounded-lg  overflow-hidden h-10">
          <FiSearch className="ml-3 text-gray-400 text-lg" />

          <input
            type="text"
            placeholder="Search For Category"
            className="flex-1 px-2 text-sm outline-none"
          />

          <button className=" text-black text-sm font-semibold px-4 h-full">
            
          </button>
        </div>

        {/* ✉️ 🔔 🛒 Icons */}
        <div className="flex items-center gap-3">
          <FiMail className="text-[22px] text-gray-700" />
          <FiBell className="text-[22px] text-gray-700" />
          <FiShoppingCart className="text-[22px] text-gray-700" />
        </div>

      </div>
    </div>
    </header>
  );
};

export default Navbar;
