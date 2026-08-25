import { useState } from "react";
import { Link } from "react-router-dom";

const reviews = [
  {
    id: 1,
    title:
      "Dinning Table Mat/Wooden Nonslip Heat Pad For Kitchen round",
    color: "Gold",
    image:
      "https://static-01.daraz.com.bd/p/588d146f6e5c99b0caddf70bde00e518.jpg",
  },
  {
    id: 2,
    title:
      "Premium Quality - Hunter Gaming Mouse Pad-Hunter Micro Wolf Gamin...",
    color: "Black",
    image:
      "https://static-01.daraz.com.bd/p/588d146f6e5c99b0caddf70bde00e518.jpg",
  },
];

const MyReviews = () => {
  const [activeTab, setActiveTab] = useState("review");

  return (
    <div className="bg-[#f5f5f5] min-h-screen md:-mt-10 -mt-8">
      <div className="max-w-6xl mx-auto bg-white p-3 md:p-6">
        {/* Header */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          My Reviews
        </h2>

        {/* Tabs */}
        <div className="flex border-b mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab("review")}
            className={`mr-6 pb-2 text-sm font-medium whitespace-nowrap ${
              activeTab === "review"
                ? "text-orange-500 border-b-2 border-orange-500"
                : "text-gray-400"
            }`}
          >
            To Be Reviewed (2)
          </button>

          <Link to="/dashboard/myreviewshistory">
            <button className="pb-2 text-sm font-medium text-gray-400 whitespace-nowrap">
              History (31)
            </button>
          </Link>
        </div>

        {/* Review Items */}
        <div className="space-y-4">
          {reviews.map((item) => (
            <div
              key={item.id}
              className="
                border rounded bg-white
                px-3 py-4 md:px-4
                flex flex-col md:flex-row
                md:items-center md:justify-between
                gap-4
              "
            >
              {/* Left */}
              <div className="flex gap-3">
                <img
                  src={item.image}
                  alt="product"
                  className="w-16 h-16 object-cover border flex-shrink-0"
                />

                <div>
                  <p className="text-sm text-gray-800 font-medium leading-snug">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Color family: {item.color}
                  </p>
                </div>
              </div>

              {/* Right */}
              <div
                className="
                  flex items-center justify-between
                  md:justify-end
                  gap-4 md:gap-6
                "
              >
                <div className="text-xs text-gray-500 hidden md:block">
                  Sold by
                </div>

                <Link to="/dashboard/writereview">
                  <button
                    className="
                      border border-orange-500
                      text-orange-500 text-sm
                      px-5 py-1.5
                      hover:bg-orange-50 transition
                      w-full md:w-auto
                    "
                  >
                    REVIEW
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center gap-2 mt-6 justify-center md:justify-start">
          <button className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-400 rounded">
            ‹
          </button>
          <button className="w-8 h-8 flex items-center justify-center bg-teal-500 text-white rounded">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-400 rounded">
            ›
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyReviews;
