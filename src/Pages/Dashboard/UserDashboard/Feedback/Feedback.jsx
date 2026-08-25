import { useState } from "react";
import { FaStar } from "react-icons/fa";
import ScrollToTop from "../../../HomePage/ScrollToTop/ScrollToTop";

export default function Feedback() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    comments: "",
  });

  const handleChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback submitted:", feedback, rating);
    alert("Thank you for your feedback!");
    setFeedback({ name: "", email: "", comments: "" });
    setRating(0);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 -mt-10">
        <ScrollToTop/>
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Page Title */}
        <h1 className="text-2xl font-semibold text-gray-800">Feedback</h1>

        {/* Feedback Form */}
        <div className="bg-white shadow rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Send Us Your Feedback</h2>
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={feedback.name}
                onChange={handleChange}
                placeholder="Your name"
                className="mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={feedback.email}
                onChange={handleChange}
                placeholder="Your email"
                className="mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            {/* Rating */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">Rating</label>
              <div className="flex mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    size={24}
                    className={`cursor-pointer ${
                      (hoverRating || rating) >= star ? "text-yellow-400" : "text-gray-300"
                    }`}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
            </div>

            {/* Comments */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">Comments</label>
              <textarea
                name="comments"
                value={feedback.comments}
                onChange={handleChange}
                placeholder="Your feedback"
                rows={4}
                className="mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Submit Feedback
            </button>
          </form>
        </div>

        {/* Previous Feedback (Optional) */}
        <div className="bg-white shadow rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Previous Feedback</h2>
          <div className="space-y-3">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-900 font-medium">Alice Smith</p>
              <div className="flex text-yellow-400">
                {[1, 2, 3, 4, 5].map((i) => (
                  <FaStar key={i} className={i <= 5 ? "text-yellow-400" : "text-gray-300"} />
                ))}
              </div>
              <p className="text-gray-600 text-sm mt-1">Great platform, very user-friendly!</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-900 font-medium">Bob Johnson</p>
              <div className="flex text-yellow-400">
                {[1, 2, 3, 4, 5].map((i) => (
                  <FaStar key={i} className={i <= 4 ? "text-yellow-400" : "text-gray-300"} />
                ))}
              </div>
              <p className="text-gray-600 text-sm mt-1">Good experience overall, could improve shipping.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
