import { useEffect, useState } from "react";
import axios from "axios";
import ScrollToTop from "../HomePage/ScrollToTop/ScrollToTop";

const TermsAndConditions = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/termscondition");
      if (res.data.success) {
        setData(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (!data) return <div className="p-6 text-center">No data found.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 py-16 px-6 md:px-16">
      <ScrollToTop />
      <div className="max-w-6xl mt-12 md:-mt-10 mx-auto bg-white  rounded-2xl border border-gray-100 p-8 md:p-12">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            {data.pageTitle || "Terms & Conditions"}
          </h1>
          <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto">
            {data.subtitle ||
              "By using our platform, you agree to comply with these Terms and Conditions."}
          </p>
        </div>

        {/* Content Section */}
        <div className="divide-y divide-gray-200 text-gray-700 leading-relaxed">
          {data.sections && data.sections.length > 0 ? (
            data.sections.map((section, i) => (
              <div key={i} className="py-6 first:pt-0 last:pb-0">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                  {section.title}
                </h2>
                <p className="text-sm md:text-base text-gray-600">
                  {section.text}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-6">
              No sections available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
