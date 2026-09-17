import { useContext, useEffect, useState } from "react";
import { FiTrash2, FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth"; // ✅ path adjust koro
import { CartContext } from "../../../Shared/Context/CartContext"; // ✅ path adjust koro

const MyWishlist = () => {
  const { user } = useAuth();
  const [cart, setCart] = useContext(CartContext);

  const [wishlistData, setWishlistData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 FIXED: userId (USR-xxxx) format কে আগে priority দেওয়া হচ্ছে
  const userId = user?.userId || user?.uid || user?._id;

  // ✅ Fetch wishlist
  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchWishlist = async () => {
      try {
        const res = await axios.get("https://dailyshopping-backend.onrender.com/api/wishlist", {
          params: { userId },
        });

        // Group by shopName (store)
        const grouped = {};
        (res.data || []).forEach((item) => {
          const storeName = item.productData?.shopName || "Unknown Store";
          if (!grouped[storeName]) grouped[storeName] = [];
          grouped[storeName].push(item);
        });

        const groupedArray = Object.keys(grouped).map((store) => ({
          store,
          items: grouped[store],
        }));

        setWishlistData(groupedArray);
      } catch (err) {
        console.error("Fetch wishlist failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [userId]);

  // ✅ Remove item — এখন productId দিয়ে ডিলিট হচ্ছে (backend route এখন productId expect করে)
  const handleRemove = async (item) => {
    // 🔹 wishlist entry এর ভেতরের productId ব্যবহার হচ্ছে, wishlist doc এর _id না
    const productId = item.productId || item.productData?._id;

    if (!productId) {
      console.error("productId missing on wishlist item:", item);
      return;
    }

    try {
      await axios.delete(`https://dailyshopping-backend.onrender.com/api/wishlist/${productId}`, {
        params: { userId },
      });

      setWishlistData((prev) =>
        prev
          .map((group) => ({
            ...group,
            items: group.items.filter((i) => i._id !== item._id),
          }))
          .filter((group) => group.items.length > 0)
      );

      Swal.fire({
        icon: "success",
        title: "Removed",
        text: "Item removed from wishlist.",
        timer: 1200,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error("Remove wishlist failed:", err);
      Swal.fire({ icon: "error", title: "Failed", text: "Could not remove item." });
    }
  };

  // ✅ Add to cart
  const handleAddToCart = (item) => {
    const product = item.productData;
    if (!product) return;

    const exists = cart.find((pd) => pd._id === product._id);

    let newCart = [];
    if (exists) {
      const rest = cart.filter((pd) => pd._id !== product._id);
      newCart = [...rest, { ...exists, quantity: exists.quantity + 1 }];
    } else {
      newCart = [...cart, { ...product, quantity: 1 }];
    }

    localStorage.setItem("productCart", JSON.stringify(newCart));
    setCart(newCart);

    Swal.fire({
      icon: "success",
      title: "Added to cart!",
      timer: 1200,
      showConfirmButton: false,
      position: "top-end",
      toast: true,
    });
  };

  // ✅ Add all to cart
  const handleAddAllToCart = () => {
    let newCart = [...cart];

    wishlistData.forEach((group) => {
      group.items.forEach((item) => {
        const product = item.productData;
        if (!product) return;

        const exists = newCart.find((pd) => pd._id === product._id);
        if (exists) {
          newCart = newCart.map((pd) =>
            pd._id === product._id ? { ...pd, quantity: pd.quantity + 1 } : pd
          );
        } else {
          newCart.push({ ...product, quantity: 1 });
        }
      });
    });

    localStorage.setItem("productCart", JSON.stringify(newCart));
    setCart(newCart);

    Swal.fire({
      icon: "success",
      title: "All items added to cart!",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const totalCount = wishlistData.reduce((sum, g) => sum + g.items.length, 0);

  return (
    <div className="bg-[#f5f5f5] min-h-screen md:-mt-10 -mt-6">
      <div className="max-w-6xl mx-auto px-3 lg:px-0">
        {/* Header */}
        <h2 className="text-xl font-semibold mb-4">
          My Wishlist & Followed Stores ({totalCount})
        </h2>

        {/* Tabs */}
        <div className="flex gap-8 border-b mb-4 text-sm">
          <span className="pb-2 border-b-2 border-teal-700 text-teal-700 font-medium">
            My Wishlist ({totalCount})
          </span>
         
          <Link to="/dashboard/followstore">
            <span className="text-gray-500">Followed Stores</span>
          </Link>
        </div>

        {/* Add all */}
        <div className="bg-white p-4 mb-4">
          <button
            onClick={handleAddAllToCart}
            disabled={totalCount === 0}
            className="text-sm text-sky-600 font-medium disabled:text-gray-400"
          >
            ADD ALL TO CART
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="bg-white p-6 text-center text-gray-500 text-sm">
            Loading wishlist...
          </div>
        )}

        {/* Empty */}
        {!loading && totalCount === 0 && (
          <div className="bg-white p-6 text-center text-gray-500 text-sm">
            Your wishlist is empty.
          </div>
        )}

        {/* Wishlist List */}
        {!loading &&
          wishlistData.map((group, idx) => (
            <div key={idx} className="bg-white mb-4">
              {/* Store name */}
              <div className="px-4 py-3 text-sm font-medium border-b">
                {group.store}
              </div>

              {group.items.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col lg:flex-row lg:items-center justify-between px-4 py-4 border-b last:border-b-0 gap-4 lg:gap-0"
                >
                  {/* LEFT */}
                  <div className="flex gap-4">
                    <img
                      src={item.productImg}
                      alt=""
                      className="w-16 h-16 border object-cover flex-shrink-0"
                    />

                    <div>
                      <div className="flex items-start gap-2">
                        <p className="text-sm lg:max-w-md">
                          {item.productTitle}
                        </p>
                      </div>

                      {item.productData?.color && (
                        <p className="text-xs text-gray-500 mt-1">
                          Color family: {item.productData.color}
                        </p>
                      )}

                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-orange-500 font-semibold">
                          ৳ {item.productPrice}
                        </span>

                        {item.productData?.oldPrice && (
                          <>
                            <span className="line-through text-xs text-gray-400">
                              ৳ {item.productData.oldPrice}
                            </span>
                            {item.productData?.discount && (
                              <span className="text-xs text-orange-500">
                                -{item.productData.discount}%
                              </span>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="flex items-center gap-4 lg:justify-end">
                    <button
                      onClick={() => handleRemove(item)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <FiTrash2 size={18} />
                    </button>

                    <button
                      onClick={() => handleAddToCart(item)}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded flex items-center gap-2"
                    >
                      <FiShoppingCart />
                      <span className="text-sm lg:hidden">Add to Cart</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyWishlist;
