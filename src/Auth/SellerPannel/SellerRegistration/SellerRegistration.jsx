import { FcGoogle } from "react-icons/fc";
import { BsTruck, BsPeople, BsGlobe } from "react-icons/bs";
import ScrollToTop from "../../../Pages/HomePage/ScrollToTop/ScrollToTop";
import { Link, useNavigate } from "react-router-dom";

export default function SellerRegistration() {
      const navigate = useNavigate();
    
  return (
    <div className="min-h-screen  flex items-center justify-center px-4 py-14">
      <ScrollToTop />
      

      {/* MAIN CONTAINER */}
      <div className="w-full max-w-7xl bg-white rounded-[32px] shadow-[0_30px_80px_rgba(0,0,0,0.08)] grid lg:grid-cols-2 overflow-hidden">

        {/* ================= LEFT : FORM ================= */}
        
        <div className="p-8 md:p-14">

            
          <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-3">
            Become a Seller
          </h2>
          <p className="text-gray-500 text-center mb-10">
            Create your seller account & start selling nationwide
          </p>
          
            <div className="flex rounded-xl overflow-hidden border border-green-200 mb-6">
            <button
              onClick={() => navigate("/sellerLogin")}
              className="w-1/2 py-3 font-semibold text-sm bg-green-800 text-white"
            >
              Log In
            </button>
            <button
              onClick={() => navigate("/sellerRegistration")}
              className="w-1/2 py-3 font-semibold text-sm bg-green-100 text-green-800"
            >
              Sign Up
            </button>
          </div>

          {/* FORM */}
          <div className="space-y-5">
            <Input label="Mobile Number" placeholder="01XXXXXXXXX" />
            <Input label="Email Address" placeholder="example@email.com" />
            <Input label="City" placeholder="Dhaka" />
            <Input label="Shop / Business Name" placeholder="Your Shop Name" />

            <div className="grid md:grid-cols-2 gap-5">
              <Input type="password" label="Password" placeholder="••••••••" />
              <Input type="password" label="Confirm Password" placeholder="••••••••" />
            </div>

            <Input label="NID Number" placeholder="National ID Number" />

            <div className="grid md:grid-cols-2 gap-5">
              <File label="Upload NID Front" />
              <File label="Upload NID Back" />
            </div>

            <Input label="Trade License Number" placeholder="Trade License No" />
            <File label="Upload Trade License" />

            <Input label="TIN Number" placeholder="TIN Number" />
            <File label="Upload TIN Certificate" />
          </div>

          {/* BUTTONS */}
         
          <div className="mt-10 space-y-4">
             <Link to="/sellerview">
             <button className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-2xl font-semibold text-lg hover:opacity-95 transition shadow-lg">
              Continue & Verify
            </button>
          </Link>
            

            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl border border-gray-200 hover:bg-gray-50 transition font-medium"
            >
              <FcGoogle size={24} />
              Continue with Google
            </button>
          </div>
        </div>

        {/* ================= RIGHT : PREMIUM INFO ================= */}
   {/* ================= RIGHT : PREMIUM INFO ================= */}
<div className="relative bg-gradient-to-br from-green-200 to-green-50 p-12 flex flex-col  justify-between overflow-hidden">

  {/* Glow blobs */}
  <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/20 rounded-full blur-3xl"></div>
  <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/20 rounded-full blur-3xl"></div>

  {/* Content */}
  <div className="relative z-10 space-y-10 text-green-800">

    <div>
      <h3 className="text-4xl font-extrabold leading-tight">
        Sell Smarter.<br />Grow Faster.
      </h3>
      <p className="text-green-700 mt-4 max-w-md text-sm">
        Join thousands of trusted sellers and reach customers across Bangladesh with ease.
      </p>
    </div>

    {/* Features */}
    <div className="space-y-6">
      <PremiumFeature
        icon={<BsTruck size={26} />}
        title="Nationwide Delivery"
        desc="Fast & reliable logistics covering 10,000+ locations."
      />
      <PremiumFeature
        icon={<BsPeople size={26} />}
        title="Trusted Marketplace"
        desc="Millions of customers trust Daily Shopping every day."
      />
      <PremiumFeature
        icon={<BsGlobe size={26} />}
        title="Scale Without Limits"
        desc="Grow your brand locally & globally from one dashboard."
      />
    </div>
    <div className="space-y-6">
      <PremiumFeature
        icon={<BsTruck size={26} />}
        title="Nationwide Delivery"
        desc="Fast & reliable logistics covering 10,000+ locations."
      />
      <PremiumFeature
        icon={<BsPeople size={26} />}
        title="Trusted Marketplace"
        desc="Millions of customers trust Daily Shopping every day."
      />
      <PremiumFeature
        icon={<BsGlobe size={26} />}
        title="Scale Without Limits"
        desc="Grow your brand locally & globally from one dashboard."
      />
    </div>
    <div className="space-y-6">
      <PremiumFeature
        icon={<BsTruck size={26} />}
        title="Nationwide Delivery"
        desc="Fast & reliable logistics covering 10,000+ locations."
      />
      <PremiumFeature
        icon={<BsPeople size={26} />}
        title="Trusted Marketplace"
        desc="Millions of customers trust Daily Shopping every day."
      />
      <PremiumFeature
        icon={<BsGlobe size={26} />}
        title="Scale Without Limits"
        desc="Grow your brand locally & globally from one dashboard."
      />
    </div>
    <div className="space-y-6">
      <PremiumFeature
        icon={<BsTruck size={26} />}
        title="Nationwide Delivery"
        desc="Fast & reliable logistics covering 10,000+ locations."
      />
      <PremiumFeature
        icon={<BsPeople size={26} />}
        title="Trusted Marketplace"
        desc="Millions of customers trust Daily Shopping every day."
      />
      <PremiumFeature
        icon={<BsGlobe size={26} />}
        title="Scale Without Limits"
        desc="Grow your brand locally & globally from one dashboard."
      />
    </div>
  </div>

  {/* CTA CARD */}
  <div className="relative z-10 bg-white/95 backdrop-blur-xl p-8 rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.25)] mt-12">
    <h4 className="text-2xl font-extrabold text-gray-900 mb-2">
      Ready to start selling?
    </h4>
    <p className="text-gray-500 text-sm mb-6">
      Create your seller account and start earning today.
    </p>
  <Link to="/login">
    <button
      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3.5 rounded-xl font-semibold text-lg hover:opacity-95 transition shadow-lg"
    >
      Login User Account →
    </button></Link>
  </div>
</div>

      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

const Input = ({ label, placeholder, type = "text" }) => (
  <div className="space-y-1">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full rounded-2xl border border-gray-200 px-5 py-3.5 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
    />
  </div>
);
const PremiumFeature = ({ icon, title, desc }) => (
  <div className="flex items-center gap-4">
    <div className="w-14 h-14 rounded-2xl bg-white backdrop-blur-xl flex items-center justify-center shadow-lg">
      {icon}
    </div>
    <div>
      <h4 className="font-semibold text-lg">{title}</h4>
      <p className="text-sm text-green-700">{desc}</p>
    </div>
  </div>
);


const File = ({ label }) => (
  <label className="block rounded-2xl border-2 border-dashed border-gray-200 px-5 py-6 text-center cursor-pointer hover:border-green-500 transition">
    <p className="text-sm font-medium text-gray-700">{label}</p>
    <p className="text-xs text-gray-400 mt-1">PDF, JPG or PNG</p>
    <input type="file" className="hidden" />
  </label>
);

const Feature = ({ icon, title, desc }) => (
  <div className="flex items-start gap-5">
    <div className="bg-white/20 p-4 rounded-2xl backdrop-blur">
      {icon}
    </div>
    <div>
      <h4 className="text-xl font-semibold">{title}</h4>
      <p className="text-white/80 text-sm mt-1">{desc}</p>
    </div>
  </div>
);
