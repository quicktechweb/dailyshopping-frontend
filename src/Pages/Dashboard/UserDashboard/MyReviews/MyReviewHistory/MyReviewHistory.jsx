import { FiFrown, FiMeh, FiSmile } from "react-icons/fi";

const reviews = [
  {
    id: 1,
    title:
      "Samsung Galaxy S10 4G Premium Silicone Case Crystal Clear Soft TPU...",
    color: "Transparent",
    image: "https://static-01.daraz.com.bd/p/588d146f6e5c99b0caddf70bde00e518.jpg",
    rating: 5,
    label: "Delightful",
    review: "",
  },
  {
    id: 2,
    title: "Yacht Man Red Perfume 100ml",
    color: "Blue",
    image: "https://static-01.daraz.com.bd/p/588d146f6e5c99b0caddf70bde00e518.jpg",
    rating: 5,
    label: "Delightful",
    review: "Good but smell long lasting kom.",
  },
  {
    id: 3,
    title:
      "Cute Trendy Daisy Necklace Sun Flower Necklaces for Girls Simple Styli...",
    color: "WHITE FLOWER",
    image: "https://static-01.daraz.com.bd/p/588d146f6e5c99b0caddf70bde00e518.jpg",
    rating: 5,
    label: "Delightful",
    review: "",
  },
];

const Star = () => (
  <svg
    className="w-5 h-5 text-yellow-400"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95a1 1 0 00.95.69h4.156c.969 0 1.371 1.24.588 1.81l-3.364 2.444a1 1 0 00-.364 1.118l1.286 3.95c.3.921-.755 1.688-1.54 1.118l-3.364-2.444a1 1 0 00-1.176 0l-3.364 2.444c-.784.57-1.838-.197-1.539-1.118l1.286-3.95a1 1 0 00-.364-1.118L2.02 9.377c-.783-.57-.38-1.81.588-1.81h4.156a1 1 0 00.95-.69l1.286-3.95z" />
  </svg>
);

const SellerEmoji = ({ type }) => {
  return (
    <div className="w-8 h-8 border rounded-full flex items-center justify-center text-gray-400 hover:text-orange-500 hover:border-orange-500 cursor-pointer">
      {type === "sad" && <FiFrown size={18} />}
      {type === "neutral" && <FiMeh size={18} />}
      {type === "happy" && <FiSmile size={18} />}
    </div>
  );
};

const MyReviewsHistory = () => {
  return (
    <div className=" min-h-screen ">
      <div className="max-w-6xl mx-auto md:-mt-16 p-6">
        {/* Header */}
        <h2 className="text-xl font-semibold mb-4">My Reviews</h2>
       <div className="bg-white ">
         

        {/* Tabs */}
        <div className="flex border-b mb-6 p-3">
          <div className="text-sm text-gray-400 mr-8 pb-2">
            To Be Reviewed (2)
          </div>
          <div className="text-sm text-orange-500 border-b-2 border-orange-500 pb-2 font-medium">
            History (31)
          </div>
        </div>
       </div>

        {/* Review List */}
       <div className="space-y-6">
  {reviews.map((item) => (
    <div
      key={item.id}
      className="border rounded bg-white p-4 lg:p-6 flex flex-col lg:flex-row gap-6"
    >
      {/* LEFT */}
      <div className="flex-1">
        <p className="text-xs text-gray-400 mb-2">Purchased on</p>
        <p className="text-sm font-semibold mb-2">
          Your product rating & review:
        </p>

        <div className="flex gap-4">
          <img
            src={item.image}
            alt=""
            className="w-14 h-14 border object-cover"
          />

          <div>
            <p className="text-sm text-gray-800 max-w-md">
              {item.title}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Color Family: {item.color}
            </p>

            {/* Stars */}
            <div className="flex items-center gap-1 mt-2">
              {[...Array(item.rating)].map((_, i) => (
                <Star key={i} />
              ))}
              <span className="text-sm text-gray-700 ml-2">
                {item.label}
              </span>
            </div>
          </div>
        </div>

        {/* Review Text */}
        {item.review && (
          <div className="mt-4 bg-[#f5f5f5] border p-3 text-sm text-gray-700">
            {item.review}
            <div className="flex items-center gap-1 text-xs text-gray-400 mt-2">
              👍 0
            </div>
          </div>
        )}
      </div>

      {/* DIVIDER (desktop only) */}
      <div className="hidden lg:block w-px bg-gray-200"></div>

      {/* RIGHT */}
      <div className="w-full lg:w-64">
        <p className="text-xs text-gray-400 mb-2">Sold by</p>
        <p className="text-sm font-semibold mb-3">
          Your seller review:
        </p>

        <div className="flex gap-3">
          <SellerEmoji type="sad" />
          <SellerEmoji type="neutral" />
          <SellerEmoji type="happy" />
        </div>
      </div>
    </div>
  ))}
</div>

      </div>
    </div>
  );
};

export default MyReviewsHistory;
