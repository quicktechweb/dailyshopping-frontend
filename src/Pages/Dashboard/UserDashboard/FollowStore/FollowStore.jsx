import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useAuth from "../../../Hooks/useAuth";

export default function FollowStore() {
  const { user } = useAuth();
  const userId = user?.uid || user?._id || user?.userId;
  const [stores, setStores] = useState([]);

  useEffect(() => {
    if (!userId) return;
    axios
      .get(`http://localhost:5000/api/seller-follow/my`, { params: { userId } })
      .then((res) => setStores(res.data?.data || []))
      .catch((err) => console.error("Follow list fetch error:", err));
  }, [userId]);

  return (
    <div className="min-h-screen bg-[#f5f5f5] md:-mt-10">
      <div className="max-w-[1180px] mx-auto px-3 lg:px-0">
        <div className="bg-white px-4 lg:px-6 pt-5 pb-3 mb-3">
          <h2 className="text-[18px] font-medium text-[#212121] mb-3">
            My Wishlist & Followed Stores
          </h2>

          <div className="flex gap-6 lg:gap-8 border-b border-[#e5e5e5] text-[14px] overflow-x-auto">
            <Link to="/dashboard/mywishlist">
              <button className="pb-3 text-[#757575] whitespace-nowrap hover:text-[#f57224]">
                My Wishlist
              </button>
            </Link>
          
            <button className="pb-3 border-b-2 border-[#f57224] text-[#f57224] font-medium whitespace-nowrap">
              Followed Stores
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {stores.length === 0 && (
            <div className="bg-white px-4 py-6 text-sm text-[#757575]">
              Ekhono kono store follow kora hoyni.
            </div>
          )}

          {stores.map((store, index) => (
            <div
              key={index}
              className="bg-white shadow-sm px-4 lg:px-6 py-4 lg:py-5 flex flex-col lg:flex-row lg:items-center justify-between gap-3"
            >
              <div className="flex items-center gap-4">
                <div className="w-[52px] h-[52px] border border-[#e5e5e5] bg-red-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {(store.shopName || "S").charAt(0)}
                </div>
                <h3 className="text-[14px] font-medium text-[#212121]">
                  {store.shopName}
                </h3>
              </div>

              <div className="text-[13px] text-[#757575] flex items-center gap-3 lg:gap-0">
                <span className="text-[#212121] font-medium">✓ FOLLOWING</span>
                <span className="hidden lg:inline mx-3 text-[#ddd]">|</span>
                <Link to={`/sellershop/${store.sellerId}`} className="text-[#1a9cb7] hover:underline">
                  VISIT
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}