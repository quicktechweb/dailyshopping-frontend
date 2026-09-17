import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import useAuth from "../../../../Hooks/useAuth";

const RATING_LABELS = {
  1: "Terrible",
  2: "Bad",
  3: "Okay",
  4: "Good",
  5: "Delightful",
};

const SELLER_LABELS = ["Negative", "Neutral", "Positive"];
const SELLER_ICONS = ["😞", "😐", "😊"];

const MAX_IMAGES = 6;
const MAX_IMAGE_SIZE_MB = 5;

export default function WriteReview() {
  const { orderId, itemId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const userId = user?.userId || "";
  const userAuth = user?.email || user?.phoneNumber || "";
  const displayName = user?.displayName || user?.name || "You";

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [photos, setPhotos] = useState([]); // File objects
  const [previews, setPreviews] = useState([]); // object URLs

  const [sellerRating, setSellerRating] = useState(2); // default Positive
  const [sellerComment, setSellerComment] = useState("");

  const [deliveryRating, setDeliveryRating] = useState(0);
  const [deliveryComment, setDeliveryComment] = useState("");

  const [anonymous, setAnonymous] = useState(true);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const loadItem = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/reviews/item/${orderId}/${itemId}`
        );
        setItem(res.data);
      } catch (err) {
        console.error("Failed to load item:", err);
        setLoadError(
          err?.response?.data?.message || "Could not load this order item."
        );
      } finally {
        setLoading(false);
      }
    };
    loadItem();
  }, [orderId, itemId]);

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files || []);
    const room = MAX_IMAGES - photos.length;
    if (room <= 0) return;

    const valid = files
      .filter((f) => f.size <= MAX_IMAGE_SIZE_MB * 1024 * 1024)
      .slice(0, room);

    if (valid.length < files.length) {
      alert(`Each photo must be under ${MAX_IMAGE_SIZE_MB}MB.`);
    }

    setPhotos((prev) => [...prev, ...valid]);
    setPreviews((prev) => [...prev, ...valid.map((f) => URL.createObjectURL(f))]);
    e.target.value = "";
  };

  const removePhoto = (idx) => {
    setPhotos((prev) => prev.filter((_, i) => i !== idx));
    setPreviews((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async () => {
    if (!userAuth) {
      alert("Please log in to submit a review.");
      return;
    }
    if (!comment.trim()) {
      alert("Please write a few words about the product.");
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("userAuth", userAuth);
      formData.append("username", displayName);
      formData.append("orderId", orderId);
      formData.append("itemId", itemId);
      formData.append("rating", rating);
      formData.append("comment", comment);
      formData.append("sellerRating", sellerRating);
      formData.append("sellerComment", sellerComment);
      formData.append("deliveryRating", deliveryRating || "");
      formData.append("deliveryComment", deliveryComment);
      formData.append("anonymous", anonymous);
      photos.forEach((file) => formData.append("photos", file));

      await axios.post("http://localhost:5000/api/reviews", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/dashboard/myreviewshistory");
    } catch (err) {
      console.error("Failed to submit review:", err);
      alert(err?.response?.data?.message || "Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-sm">
        Loading...
      </div>
    );
  }

  if (loadError || !item) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-sm">
        {loadError || "This item is not available for review."}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center md:-mt-10">
      <div className="bg-white w-full max-w-6xl p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-6">Write Review</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* LEFT SIDE */}
          <div>
            <p className="text-sm text-gray-500 mb-2">
              Delivered on{" "}
              {item.deliveredOn
                ? new Date(item.deliveredOn).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : "—"}
            </p>

            <div className="flex gap-4 items-start mb-4">
              <img
                src={item.img}
                alt="product"
                className="w-20 h-20 border rounded object-cover"
              />

              <div>
                <h3 className="font-medium text-sm">{item.title}</h3>
                {item.color && (
                  <p className="text-xs text-gray-500">
                    Color family: {item.color}
                  </p>
                )}

                {/* Product Rating */}
                <div className="flex items-center mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => setRating(star)}
                      className={`cursor-pointer text-xl ${
                        star <= rating ? "text-orange-400" : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {RATING_LABELS[rating]}
                  </span>
                </div>
              </div>
            </div>

            {/* Review Text */}
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="What do you think of this product?"
              className="w-full border rounded p-3 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
              rows="5"
            />

            {/* Upload */}
            <div className="mt-4">
              <div className="flex flex-wrap gap-3">
                {previews.map((src, i) => (
                  <div key={i} className="relative w-28 h-28 border rounded overflow-hidden">
                    <img src={src} alt="" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removePhoto(i)}
                      className="absolute top-1 right-1 bg-black/60 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
                    >
                      ✕
                    </button>
                  </div>
                ))}

                {photos.length < MAX_IMAGES && (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-28 h-28 border-2 border-dashed flex flex-col items-center justify-center text-gray-400 cursor-pointer"
                  >
                    <span className="text-2xl">📷</span>
                    <span className="text-xs mt-1">Upload Photo</span>
                  </div>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handlePhotoChange}
              />

              <ul className="text-xs text-gray-500 mt-3 space-y-1">
                <li>• Maximum {MAX_IMAGES} images can be uploaded</li>
                <li>• Image size can be maximum {MAX_IMAGE_SIZE_MB}mb</li>
                <li>• It takes up to 24 hours for the image to be reviewed</li>
              </ul>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div>
            <p className="text-sm mb-2">
              Sold by{" "}
              <span className="text-blue-600">{item.shopName || "Seller"}</span>
            </p>

            {/* Seller Rating */}
            <h4 className="text-sm font-medium mb-2">
              Rate and review your seller:
            </h4>

            <div className="flex gap-4 mb-3">
              {SELLER_ICONS.map((icon, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSellerRating(i)}
                  className={`text-3xl ${
                    sellerRating === i ? "opacity-100" : "opacity-40"
                  }`}
                >
                  {icon}
                </button>
              ))}
              <span className="text-sm self-center text-orange-500">
                {SELLER_LABELS[sellerRating]}
              </span>
            </div>

            <textarea
              value={sellerComment}
              onChange={(e) => setSellerComment(e.target.value)}
              placeholder="How is your overall experience with the seller?"
              className="w-full border rounded p-3 text-sm mb-6 focus:outline-none focus:ring-1 focus:ring-orange-400"
              rows="4"
            />

            {/* Delivery Review */}
            <h4 className="text-sm font-medium mb-2">
              Rate and review delivery service:
            </h4>

            <div className="flex mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setDeliveryRating(star)}
                  className={`text-xl cursor-pointer ${
                    star <= deliveryRating ? "text-orange-400" : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>

            <textarea
              value={deliveryComment}
              onChange={(e) => setDeliveryComment(e.target.value)}
              placeholder="How is your overall delivery experience?"
              className="w-full border rounded p-3 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
              rows="4"
            />

            {/* Footer */}
            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center gap-2">
                <span className="text-sm">Review as {displayName}</span>
                <button
                  type="button"
                  onClick={() => setAnonymous(!anonymous)}
                  className={`w-10 h-5 flex items-center rounded-full p-1 ${
                    anonymous ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full transform transition ${
                      anonymous ? "translate-x-5" : ""
                    }`}
                  />
                </button>
                <span className="text-sm text-blue-500">Anonymous</span>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="mt-6 w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white py-3 rounded font-medium"
            >
              {submitting ? "SUBMITTING..." : "SUBMIT"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}