import { useState } from "react";

export default function WriteReview() {
  const [rating, setRating] = useState(5);
  const [sellerRating, setSellerRating] = useState(3);
  const [anonymous, setAnonymous] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center md:-mt-10">
      <div className="bg-white w-full max-w-6xl p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-6">Write Review</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* LEFT SIDE */}
          <div>
            <p className="text-sm text-gray-500 mb-2">
              Delivered on 14 Jan 2026
            </p>

            <div className="flex gap-4 items-start mb-4">
              <img
                src="https://static-01.daraz.com.bd/p/588d146f6e5c99b0caddf70bde00e518.jpg"
                alt="product"
                className="w-20 h-20 border rounded"
              />

              <div>
                <h3 className="font-medium text-sm">
                  Dinning Table Mat/Wooden Nonslip Heat Pad For Kitchen round
                </h3>
                <p className="text-xs text-gray-500">Color family: Gold</p>

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
                    Delightful
                  </span>
                </div>
              </div>
            </div>

            {/* Review Text */}
            <textarea
              placeholder="What do you think of this product?"
              className="w-full border rounded p-3 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
              rows="5"
            />

            {/* Upload */}
            <div className="mt-4">
              <div className="w-28 h-28 border-2 border-dashed flex flex-col items-center justify-center text-gray-400 cursor-pointer">
                <span className="text-2xl">📷</span>
                <span className="text-xs mt-1">Upload Photo</span>
              </div>

              <ul className="text-xs text-gray-500 mt-3 space-y-1">
                <li>• Maximum 6 images can be uploaded</li>
                <li>• Image size can be maximum 5mb</li>
                <li>• It takes up to 24 hours for the image to be reviewed</li>
              </ul>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div>
            <p className="text-sm mb-2">
              Sold by <span className="text-blue-600">Knock To Buy</span>
            </p>

            {/* Seller Rating */}
            <h4 className="text-sm font-medium mb-2">
              Rate and review your seller:
            </h4>

            <div className="flex gap-4 mb-3">
              {["😞", "😐", "😊"].map((icon, i) => (
                <button
                  key={i}
                  onClick={() => setSellerRating(i)}
                  className={`text-3xl ${
                    sellerRating === i ? "opacity-100" : "opacity-40"
                  }`}
                >
                  {icon}
                </button>
              ))}
              <span className="text-sm self-center text-orange-500">
                Positive
              </span>
            </div>

            <textarea
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
                  className="text-gray-300 text-xl cursor-pointer"
                >
                  ★
                </span>
              ))}
            </div>

            <textarea
              placeholder="How is your overall delivery experience?"
              className="w-full border rounded p-3 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
              rows="4"
            />

            {/* Footer */}
            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center gap-2">
                <span className="text-sm">Review as Rezwan Rashid</span>
                <button
                  onClick={() => setAnonymous(!anonymous)}
                  className={`w-10 h-5 flex items-center rounded-full p-1 ${
                    anonymous ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full transform ${
                      anonymous ? "translate-x-5" : ""
                    }`}
                  />
                </button>
                <span className="text-sm text-blue-500">Anonymous</span>
              </div>
            </div>

            <button className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded font-medium">
              SUBMIT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
