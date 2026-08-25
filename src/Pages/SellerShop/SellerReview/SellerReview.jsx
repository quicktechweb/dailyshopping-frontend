import {
  Star,
  ChevronDown,
  ThumbsUp,
  MoreVertical,
  MessageCircle,
  Share2,
} from "lucide-react";
import { Link } from "react-router-dom";
import ScrollToTop from "../../HomePage/ScrollToTop/ScrollToTop";

export default function SellerReview() {
  return (
    <div className="max-w-[1300px] mx-auto px-4 py-6 bg-gray-50">
      <ScrollToTop/>
      {/* STORE HEADER */}
     <div
  className="
    bg-white rounded-xl border
    p-4 sm:p-6
    flex flex-col md:flex-row
    md:items-center md:justify-between
    gap-4 md:gap-6 -mt-24 md:mt-0
  "
>
  {/* Left */}
  <div className="flex items-start sm:items-center gap-3 sm:gap-4">
    {/* Avatar */}
    <div className="
      w-12 h-12 sm:w-16 sm:h-16
      rounded-full bg-red-600
      flex items-center justify-center
      text-white font-bold
      text-lg sm:text-2xl
      shrink-0
    ">
      DK
    </div>

    <div>
      <h1 className="text-base sm:text-xl font-bold text-gray-900">
      Daily Shop
      </h1>

      <p className="text-xs sm:text-sm text-gray-500">
        Central Dhaka Bangladesh
      </p>

      <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-1 text-xs sm:text-sm text-gray-600">
        <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" />
        <span className="font-semibold text-gray-900">4.9</span>
        <span>(47.6k reviews)</span>
        <span className="text-gray-300 hidden sm:inline">•</span>
        <span className="hidden sm:inline">200k sold</span>
      </div>
    </div>
  </div>

  {/* Right Buttons */}
  <div
    className="
      flex md:flex-row
      gap-2 sm:gap-3
      overflow-x-auto md:overflow-visible
      scrollbar-hide
    "
  >
    <button
      className="
        flex-1 md:flex-none
        px-4 sm:px-6 py-2
        rounded-full
        bg-green-500 text-white
        text-sm sm:text-base
        font-semibold
        hover:bg-green-600
        transition
        shrink-0
      "
    >
      Follow
    </button>

    <button
      className="
        flex-1 md:flex-none
        px-4 sm:px-6 py-2
        rounded-full
        border border-green-500
        text-green-600
        text-sm sm:text-base
        font-semibold
        flex items-center justify-center gap-2
        hover:bg-green-50
        transition
        shrink-0
      "
    >
      <MessageCircle className="w-4 h-4" />
      Chat Seller
    </button>

    <button
      className="
        p-2
        rounded-full
        border
        shrink-0
        hover:bg-gray-100
        transition
      "
    >
      <Share2 className="w-4 h-4" />
    </button>
  </div>
</div>


      {/* TABS */}
        <div className="mt-6 border-b flex gap-8 text-sm font-medium">
             <Link to="/sellershop">
             <button className="pb-3 border-b-2 border-green-500 text-green-600">
               Home
             </button>
           </Link>
             
            <Link to="/sellershop-category">
             <button className="pb-3 text-gray-500 hover:text-green-600">
               Product
             </button>
             </Link>
             <Link to="/seller-review">
             <button className="pb-3 text-gray-500 hover:text-green-600">
               Reviews
             </button>
             </Link>
             
           </div>

      {/* RATING SUMMARY */}
      <div className="bg-gradient-to-b from-white to-orange-50 border rounded-xl p-6 mt-6 flex flex-col md:flex-row gap-10">
        <div className="w-[260px]">
          <div className="flex items-center gap-2">
            <Star className="w-7 h-7 text-yellow-400 fill-yellow-400" />
            <span className="text-3xl font-bold text-gray-900">4.9</span>
            <span className="text-gray-500 text-lg">/ 5.0</span>
          </div>

          <p className="text-sm mt-2 font-medium text-gray-800">
            98% of buyers are satisfied
          </p>
          <p className="text-xs text-gray-500 mt-1">
            47,624 ratings • 19,113 reviews
          </p>
        </div>

        <div className="flex-1 space-y-2">
          {[5, 4, 3, 2, 1].map((s) => (
            <div key={s} className="flex items-center gap-3 text-sm">
              <span className="w-4 text-gray-700">{s}</span>
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <div className="h-2 bg-gray-200 rounded-full flex-1">
                <div className="h-2 bg-green-500 rounded-full w-[65%]" />
              </div>
              <span className="text-xs text-gray-500 w-12">(110)</span>
            </div>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="grid grid-cols-12 gap-6 mt-6">
        {/* FILTER */}
        <aside className="col-span-12 md:col-span-3">
          <div className="bg-white border rounded-xl p-4">
            <h3 className="font-bold mb-4 text-gray-900">
              Filter Reviews
            </h3>

            <div className="border-t pt-4">
              <p className="font-semibold mb-3 text-sm">
                Media
              </p>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" className="accent-green-500" />
                With photos & videos
              </label>
            </div>

            <div className="border-t pt-4 mt-4">
              <p className="font-semibold mb-3 text-sm">
                Rating
              </p>
              {[5, 4, 3, 2, 1].map((r) => (
                <label
                  key={r}
                  className="flex items-center gap-2 text-sm mb-2 text-gray-700"
                >
                  <input type="checkbox" className="accent-green-500" />
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  {r} Stars
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* REVIEWS */}
        <section className="col-span-12 md:col-span-9">
          <div className="bg-white border rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-bold text-gray-900">
                  Featured Reviews
                </h3>
                <p className="text-xs text-gray-500">
                  Showing 10 of 10,000 reviews
                </p>
              </div>

              <button className="border px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-gray-50">
                Newest <ChevronDown size={16} />
              </button>
            </div>

            {/* REVIEW ITEM */}
            <div className="border-t pt-6">
              <div className="flex justify-between gap-6">
                <div className="flex gap-6">
                  {/* PRODUCT INFO */}
                  <div className="w-[120px] shrink-0">
                    <img
                      src="https://images.tokopedia.net/img/cache/200-square/aphluv/1997/1/1/97adf01e709f43f7824092cc09954b15~.jpeg.webp"
                      className="w-12 h-12 rounded-md object-cover"
                    />

                    <p className="text-xs text-gray-800 font-semibold mt-3 leading-snug line-clamp-3">
                      EZVIZ H6C Pro Indoor Smart Camera 3MP / 4MP / 5MP
                    </p>

                    <p className="text-[11px] text-gray-500 mt-1">
                      Variant: 5MP + 32GB Memory Card
                    </p>
                  </div>

                  {/* REVIEW CONTENT */}
                  <div className="max-w-[520px]">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          size={14}
                          className="text-yellow-400 fill-yellow-400"
                        />
                      ))}
                      <span className="text-xs text-gray-500 ml-2">
                        Today
                      </span>
                    </div>

                    <p className="text-sm font-semibold mt-2 text-gray-900">
                      R***i
                    </p>

                    <p className="text-sm mt-2 text-gray-700 leading-relaxed">
                      Product arrived as described. Very satisfied with the quality.
                    </p>

                    <button className="flex items-center gap-2 text-sm mt-4 text-gray-500 hover:text-green-600 transition">
                      <ThumbsUp size={14} />
                      Helpful
                    </button>
                  </div>
                </div>

                <MoreVertical size={18} className="text-gray-500 mt-1" />
              </div>

              <div className="text-right mt-4">
                <button className="text-green-600 text-sm font-semibold hover:underline">
                  View Seller Reply
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
