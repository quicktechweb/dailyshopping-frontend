import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { BsTruck, BsPeople, BsGlobe } from "react-icons/bs";
import { FaSpinner } from "react-icons/fa";
import ScrollToTop from "../../../Pages/HomePage/ScrollToTop/ScrollToTop";
import { Link, useNavigate } from "react-router-dom";

export default function SellerRegistration() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    mobileNumber: "",
    email: "",
    city: "",
    shopName: "",
    password: "",
    confirmPassword: "",
    nidNumber: "",
    tradeLicenseNumber: "",
    tinNumber: "",
  });

  const [files, setFiles] = useState({
    nidFront: null,
    nidBack: null,
    tradeLicense: null,
    tinCertificate: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (key, file) => {
    setFiles({ ...files, [key]: file });
  };

  // Upload single image to backend (imgbb)
  const uploadImage = async (file) => {
    if (!file) return "";

    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("https://dailyshopping-backend.onrender.com/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!data?.success) {
      throw new Error(data.message || "Image upload failed");
    }

    return data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Password and Confirm Password do not match");
      return;
    }

    setLoading(true);

    try {
      // সব ফাইল একসাথে upload করা (parallel)
      const [nidFrontImg, nidBackImg, tradeLicenseImg, tinCertificateImg] =
        await Promise.all([
          uploadImage(files.nidFront),
          uploadImage(files.nidBack),
          uploadImage(files.tradeLicense),
          uploadImage(files.tinCertificate),
        ]);

      const payload = {
        ...form,
        nidFrontImg,
        nidBackImg,
        tradeLicenseImg,
        tinCertificateImg,
      };

      const res = await fetch("https://dailyshopping-backend.onrender.com/api/sellers/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!data?.success) {
        throw new Error(data.message || "Registration failed");
      }

      alert("Registration submitted successfully!");
      navigate("/sellerview");
    } catch (err) {
      console.error("Seller registration error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-14">
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
              type="button"
              onClick={() => navigate("/sellerLogin")}
              className="w-1/2 py-3 font-semibold text-sm bg-green-800 text-white"
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => navigate("/sellerRegistration")}
              className="w-1/2 py-3 font-semibold text-sm bg-green-100 text-green-800"
            >
              Sign Up
            </button>
          </div>

          {error && (
            <div className="mb-5 rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600 font-medium">
              {error}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Mobile Number"
              name="mobileNumber"
              placeholder="01XXXXXXXXX"
              value={form.mobileNumber}
              onChange={handleChange}
              required
            />
            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="example@email.com"
              value={form.email}
              onChange={handleChange}
              required
            />
            <Input
              label="City"
              name="city"
              placeholder="Dhaka"
              value={form.city}
              onChange={handleChange}
              required
            />
            <Input
              label="Shop / Business Name"
              name="shopName"
              placeholder="Your Shop Name"
              value={form.shopName}
              onChange={handleChange}
              required
            />

            <div className="grid md:grid-cols-2 gap-5">
              <Input
                type="password"
                label="Password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
              />
              <Input
                type="password"
                label="Confirm Password"
                name="confirmPassword"
                placeholder="••••••••"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <Input
              label="NID Number"
              name="nidNumber"
              placeholder="National ID Number"
              value={form.nidNumber}
              onChange={handleChange}
              required
            />

            <div className="grid md:grid-cols-2 gap-5">
              <File
                label="Upload NID Front"
                onChange={(file) => handleFileChange("nidFront", file)}
              />
              <File
                label="Upload NID Back"
                onChange={(file) => handleFileChange("nidBack", file)}
              />
            </div>

            <Input
              label="Trade License Number"
              name="tradeLicenseNumber"
              placeholder="Trade License No"
              value={form.tradeLicenseNumber}
              onChange={handleChange}
            />
            <File
              label="Upload Trade License"
              onChange={(file) => handleFileChange("tradeLicense", file)}
            />

            <Input
              label="TIN Number"
              name="tinNumber"
              placeholder="TIN Number"
              value={form.tinNumber}
              onChange={handleChange}
            />
            <File
              label="Upload TIN Certificate"
              onChange={(file) => handleFileChange("tinCertificate", file)}
            />

            {/* BUTTONS */}
            <div className="mt-10 space-y-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-2xl font-semibold text-lg hover:opacity-95 transition shadow-lg disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Continue & Verify"
                )}
              </button>

              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl border border-gray-200 hover:bg-gray-50 transition font-medium"
              >
                <FcGoogle size={24} />
                Continue with Google
              </button>
            </div>
          </form>
        </div>

        {/* ================= RIGHT : PREMIUM INFO ================= */}
        <div className="relative bg-gradient-to-br from-green-200 to-green-50 p-12 flex flex-col justify-between overflow-hidden">

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
              <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3.5 rounded-xl font-semibold text-lg hover:opacity-95 transition shadow-lg">
                Login User Account →
              </button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

const Input = ({ label, name, placeholder, type = "text", value, onChange, required }) => (
  <div className="space-y-1">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
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

const File = ({ label, onChange }) => (
  <label className="block rounded-2xl border-2 border-dashed border-gray-200 px-5 py-6 text-center cursor-pointer hover:border-green-500 transition">
    <p className="text-sm font-medium text-gray-700">{label}</p>
    <p className="text-xs text-gray-400 mt-1">PDF, JPG or PNG</p>
    <input
      type="file"
      className="hidden"
      onChange={(e) => onChange(e.target.files[0])}
    />
  </label>
);