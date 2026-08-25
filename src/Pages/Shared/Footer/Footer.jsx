import { useContext, useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaPinterestP,
  FaInstagram,
  FaTag,
  FaGift,
  FaTruck,
  FaShoppingCart,
  FaUser,
  FaList,
  FaHome,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import { MdLocalOffer } from "react-icons/md";

import {
  IoHomeOutline,
  IoPlayCircleOutline,
  IoPricetagOutline,
  IoDocumentTextOutline,
  IoPersonOutline
} from "react-icons/io5";
import '@flaticon/flaticon-uicons/css/regular/rounded.css';


export default function Footer() {
    const cartProducts = useContext(CartContext)[0];
    const [showContent, setShowContent] = useState(true);

   let totalQuantity = cartProducts.reduce(
    (acc, product) => acc + (product.quantity || 1),
    0
  );
  return (
    <footer className="bg-white border-t">
      <div className="max-w-[1240px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 text-sm text-gray-700">
          
          {/* Tokopedia */}
          <div>
            <h4 className="font-bold text-black mb-4">DailyShopping</h4>
            <ul className="space-y-2">
              <li>About DailyShopping</li>
              <li>Intellectual Property Rights</li>
              <li>Careers</li>
              <li>Blog</li>
              <li>DailyShopping B2B Digital</li>
              <li>DailyShopping Marketing Solutions</li>
              <li>Body Mass Index Calculator</li>
              <li>DailyShopping Pharma</li>
              <li>Today’s Deals</li>
              <li>Buy Local</li>
            </ul>
          </div>

          {/* Buy & Sell */}
          <div>
            <h4 className="font-bold text-black mb-4">Buy</h4>
            <ul className="space-y-2 mb-6">
              <li>Bills & Top Up</li>
              <li>DailyShopping COD</li>
              <li>Free Shipping</li>
            </ul>

            <h4 className="font-bold text-black mb-4">Sell</h4>
            <ul className="space-y-2">
              <li>Seller Education Center</li>
              <li>Register Mall</li>
            </ul>

            <h4 className="font-bold text-black mt-6 mb-4">
              Help & Guidance
            </h4>
            <ul className="space-y-2">
              <li>DailyShopping Care</li>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          {/* Security */}
          <div>
            <h4 className="font-bold text-black mb-4">
              Payment Method
            </h4>
            <div className="space-y-4">
              <img
                src="https://i.ibb.co.com/0ytbG6WP/download.png"
                alt="PCI DSS"
                className="w-28"
              />
              <img
                src="https://i.ibb.co.com/YTJLkjNM/download-1.png"
                alt="BSI"
                className="w-28"
              />
              <img
                src="https://i.ibb.co.com/BWZgnQg/Rocket.webp"
                alt="BSI"
                className="w-28"
              />
            </div>

            <h4 className="font-bold text-black mt-6 mb-3">Follow Us</h4>
            <div className="flex gap-3">
              <FaFacebookF className="w-8 h-8 p-2 bg-gray-100 rounded-full" />
              <FaTwitter className="w-8 h-8 p-2 bg-gray-100 rounded-full" />
              <FaPinterestP className="w-8 h-8 p-2 bg-gray-100 rounded-full" />
              <FaInstagram className="w-8 h-8 p-2 bg-gray-100 rounded-full" />
            </div>
          </div>

          {/* App Promo */}
          <div className="md:col-span-2">
            <h4 className="font-bold text-black mb-4">
              Enjoy special benefits on the app:
            </h4>

           <ul className="space-y-3 mb-4">
  <li className="flex items-center gap-2">
    <FaTag className="text-green-500" />
    <span>Up to 70% discount only on the app</span>
  </li>

  <li className="flex items-center gap-2">
    <FaGift className="text-green-500" />
    <span>App-exclusive promotions</span>
  </li>

  <li className="flex items-center gap-2">
    <FaTruck className="text-green-500" />
    <span>Free shipping every day</span>
  </li>
</ul>

            <p className="mb-3">
              Open the app by scanning the QR code or clicking the buttons below:
            </p>

            <div className="flex items-center gap-2">
              <img
                src="https://i.ibb.co.com/zhnzR7d4/Playstore-Lucky.png"
                alt="QR Code"
                className="w-36 h-40"
              />

              <div className="flex flex-col gap-2">
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="Google Play"
                  className="h-10 w-32"
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="App Store"
                  className="h-10 w-36"
                />
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="AppGallery"
                  className="h-10 w-32"
                />
              </div>
            </div>

            <a
              href="#"
              className="inline-block mt-4 text-green-600 font-semibold"
            >
              Learn More →
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
    <div className="border-t py-4 text-xs text-gray-600">
  <div className="max-w-[1240px] mx-auto px-6 flex items-center justify-between">
    
    {/* Left */}
    <span>© 2026 - 2040, PT DailyShopping. All Rights Reserved.</span>

    {/* Center */}
    <span className="absolute left-1/2 -translate-x-1/2 text-gray-500">
      Designed &amp; Developed by <span className="font-semibold text-gray-700">QuickTech IT</span>
    </span>

    {/* Right */}
    <div className="flex gap-2">
      <button className="px-3 py-1 rounded bg-green-500 text-white">
        English
      </button>
      <button className="px-3 py-1 rounded bg-gray-100">
        Bangla
      </button>
    </div>

  </div>
</div>

   <div className="fixed bottom-0  left-0 w-full bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-50 md:hidden">
      <div className="w-full bg-white ">
      <div className="w-full bg-white shadow">
      {showContent && (
        <div className="flex items-center gap-3 px-3 py-2">

          {/* Close Icon */}
          <button
            onClick={() => setShowContent(false)}
            className="text-gray-500 text-xl leading-none"
          >
            ×
          </button>

          {/* Icon */}
          <div className="w-8 h-8 shrink-0">
            <img
              src="https://images.tokopedia.net/img/SESnHf/2025/4/6/98c5b00f-e19f-4ba9-bc73-3d2a0ec403ab.png"
              alt="promo"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Text */}
          <p className="text-xs text-gray-800 flex-1 leading-tight">
            <span className="font-semibold">Shop on the app</span>, enjoy free shipping & daily discount coupons!
          </p>

          {/* CTA Button */}
          <button className="bg-green-500 text-white text-xs font-semibold px-3 py-1.5 rounded-md">
            Offer
          </button>

        </div>
      )}
    </div>
    </div>
          {" "}
          <div className="relative flex justify-between items-center px-6 py-2 mt-3">
            {" "}
            {/* === Home === */}{" "}
            <Link
              to="/"
              className={`flex flex-col items-center justify-center text-[11px] transition-all duration-300 
                  "text-[#19745B] font-semibold"  "text-gray-500"
              }`}
            >
              {" "}
              <span className="text-xl mb-1">
                {" "}
               <i className="fi fi-rr-home"></i>
              </span>{" "}
              <span className="mt-1">Home</span>{" "}
            </Link>{" "}
            {/* === Category === */}{" "}
            <Link
              to="/categorypartmobile"
              className={`flex flex-col items-center justify-center text-[11px] transition-all duration-300 
               
                   "text-[#19745B] font-semibold"
                   "text-gray-500"
              }`}
            >
              {" "}
              <span className="text-xl mb-1">
                {" "}
            <i className="fi fi-rr-list"></i>

              </span>{" "}
              <span className="mt-1">Category</span>{" "}
            </Link>{" "}
            {/* === Cart (center floating button) === */}{" "}
            <Link
              to="/promopart"
              className={`flex flex-col items-center justify-center text-[11px] transition-all duration-300 
               
                   "text-[#19745B] font-semibold"
                   "text-gray-500"
              }`}
            >
              {" "}
              <span className="text-xl mb-1">
                {" "}
               <i className="fi fi-rr-ticket"></i>
              </span>{" "}
              <span className="mt-1">Promo</span>{" "}
            </Link>{" "}
        
  
            {/* === Offers === */}{" "}
            <Link
              to="/orderreview"
              className={`flex flex-col items-center justify-center text-[11px] transition-all duration-300 
               
                   "text-[#19745B] font-semibold"
                   "text-gray-500"
              }`}
            >
              {" "}
              <span className="text-xl mb-1">
                {" "}
               <i className="fi fi-rr-shopping-cart"></i>
              </span>{" "}
              <span className="mt-1">Cart</span>{" "}
            </Link>{" "}
            {/* === Account === */}{" "}
            <Link
      to="/dashboard"
      className={`flex flex-col items-center justify-center text-[11px] transition-all duration-300 
       
           "text-[#19745B] font-semibold"
           "text-gray-500"
      }`}
    >
      <span className="text-xl mb-1">
      <i className="fi fi-rr-user"></i>

      </span>
      <span className="mt-1">Account</span>
    </Link>
          </div>{" "}
        </div>
    </footer>
  );
}
