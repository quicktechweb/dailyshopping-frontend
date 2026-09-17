import { useState, useEffect } from "react";
import axios from "axios";

export default function Bannersec() {
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);
const [winners, setWinners] = useState([]);

  useEffect(() => {
  fetchBanner();
  fetchWinners();
}, []);


  const fetchBanner = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/bannersadvertis");
      if (data.length > 0) setBanner(data[0]);
    } catch (err) {
      console.error("Failed to fetch banner:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchWinners = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/winners");
    if (res.data?.winners) {
      setWinners(res.data.winners.slice(0, 10)); // latest 10
    }
  } catch (err) {
    console.error("Failed to fetch winners:", err);
  }
};


  // ---------- Skeleton Loader ----------
  if (loading) {
    return (
      <div className="flex justify-center mt-32 md:mt-0 py-4 animate-pulse">
        <section className="w-[95%] md:w-[90%] lg:w-[1200px] relative h-10 flex justify-between items-center gap-4">
          {/* Left Skeleton */}
          <div className="w-1/6 h-10 bg-gray-200 rounded-md" />
          {/* Middle Skeleton */}
          <div className="w-4/6 h-6 bg-gray-200 rounded-md" />
          {/* Right Skeleton */}
          <div className="w-1/6 h-10 bg-gray-200 rounded-md" />
        </section>
      </div>
    );
  }

  if (!banner) return null;

  return (
    <div className={`bg-gradient-to-b from-white to-green-300 flex justify-center mt-32 md:mt-0`}>
      <section className="w-[95%] md:w-[90%] lg:w-[1200px] relative h-10 flex justify-between items-center">
        {/* Left Image */}
        <div className="w-1/6 flex justify-start">
         
            <img
              src={banner.leftBanner.image}
              alt={banner.leftBanner.alt || "Left Banner"}
              className="h-10 object-contain cursor-pointer"
            />
        
        </div>

        {/* Middle Text Banner */}
       <div className="w-4/6 flex justify-center">
  <div className="w-full text-center py-1 px-8">
    <div className="text-gray-800 overflow-hidden relative">
      <div
        className={`flex whitespace-nowrap ${
          banner.style.animation === "marquee" ? "animate-marquee" : ""
        }`}
      >
        {/* Existing banner texts */}
        {banner.middleBanner.texts.map((t, i) => (
          <h3 key={`banner-${i}`} className="text-sm font-semibold tracking-wide px-8">
            {t.icon} {t.text}{" "}
            {t.highlight && (
              <span className={t.highlightColor}>{t.highlight}</span>
            )}{" "}
            {t.emoji}
          </h3>
        ))}

        {/* Winner texts */}
        {winners.map((w, i) => (
          <h3
            key={`winner-${i}`}
            className="text-sm font-semibold tracking-wide px-8 text-green-700"
          >
            🏆 Winner: <span className="font-bold">{w.username}</span> won{" "}
            <span className="text-black">{w.productName}</span> (Round {w.round})
          </h3>
        ))}
      </div>
    </div>
  </div>
</div>


        {/* Right Image */}
        <div className="w-1/6 md:h-20 h-10 flex justify-end relative md:-top-5 top-1 md:-right-16 overflow-hidden">
  <img
    src={banner.rightBanner.image}
    alt={banner.rightBanner.alt || "Right Banner"}
    className="h-full w-full object-contain cursor-pointer"
  />
</div>

      </section>
    </div>
  );
}
