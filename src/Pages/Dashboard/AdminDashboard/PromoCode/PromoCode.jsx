import { useEffect, useState } from "react";
import axios from "axios";

export default function PromoManager() {
  const [products, setProducts] = useState([]);
  const [promoData, setPromoData] = useState({});
  const [allPromo, setAllPromo] = useState({
    promoCode: "",
    promoType: "",
    promoValue: "",
    startDate: "",
    endDate: "",
  });

  // Load products
  useEffect(() => {
    axios
      .get("https://dailyshopping-backend.onrender.com/api/products")
      .then((res) => setProducts(res.data))
      .catch(() => alert("Failed to load products"));
  }, []);

  // Group products by category
  const categories = products.reduce((acc, p) => {
    if (!p.categoryName) return acc;
    if (!acc[p.categoryName]) acc[p.categoryName] = [];
    acc[p.categoryName].push(p);
    return acc;
  }, {});

  // ---------------- Category-wise Promo ----------------
  const updateCategoryPromo = async (cat) => {
    const data = promoData[cat];
    if (
      !data?.promoCode ||
      !data?.promoType ||
      !data?.promoValue ||
      !data?.startDate ||
      !data?.endDate
    )
      return alert("All fields required!");

    try {
      const res = await axios.put(
        "https://dailyshopping-backend.onrender.com/api/products/updatepromo/category",
        {
          categoryName: cat,
          promoCode: data.promoCode,
          promoType: data.promoType,
          promoValue: Number(data.promoValue),
          promoStartDate: data.startDate,
          promoEndDate: data.endDate,
        }
      );
      alert(res.data.message);
    } catch (err) {
      console.error(err);
      alert("Error updating category promo!");
    }
  };

  // ---------------- All Products Promo ----------------
  const updateAllPromo = async () => {
    const { promoCode, promoType, promoValue, startDate, endDate } = allPromo;
    if (!promoCode || !promoType || !promoValue || !startDate || !endDate)
      return alert("All fields required!");

    try {
      const res = await axios.put(
        "https://dailyshopping-backend.onrender.com/api/products/updatepromo/all",
        {
          allProductPromoCode: promoCode,
          allProductPromoType: promoType,
          allProductPromoValue: Number(promoValue),
          allProductPromoStartDate: startDate,
          allProductPromoEndDate: endDate,
        }
      );
      alert(res.data.message);
    } catch (err) {
      console.error(err);
      alert("Error updating all products promo!");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Promo Management</h1>

      {/* ================= CATEGORY PROMO ================= */}
      <h2 className="text-xl font-semibold mb-4">Category-wise Promo</h2>
      {Object.keys(categories).map((cat) => (
        <div key={cat} className="bg-white p-5 mb-4 rounded shadow border">
          <h3 className="font-semibold mb-3">{cat}</h3>
          <div className="flex gap-3 flex-wrap mb-3">
            <input
              type="text"
              placeholder="Promo Code"
              className="border px-2 py-1 rounded"
              value={promoData[cat]?.promoCode || ""}
              onChange={(e) =>
                setPromoData({
                  ...promoData,
                  [cat]: { ...promoData[cat], promoCode: e.target.value },
                })
              }
            />
            <select
              className="border px-2 py-1 rounded"
              value={promoData[cat]?.promoType || ""}
              onChange={(e) =>
                setPromoData({
                  ...promoData,
                  [cat]: { ...promoData[cat], promoType: e.target.value },
                })
              }
            >
              <option value="">Type</option>
              <option value="percent">Percent (%)</option>
              <option value="flat">Flat (Taka)</option>
            </select>
            <input
              type="number"
              placeholder="Value"
              className="border px-2 py-1 rounded"
              value={promoData[cat]?.promoValue || ""}
              onChange={(e) =>
                setPromoData({
                  ...promoData,
                  [cat]: { ...promoData[cat], promoValue: e.target.value },
                })
              }
            />
            <input
              type="date"
              className="border px-2 py-1 rounded"
              value={promoData[cat]?.startDate || ""}
              onChange={(e) =>
                setPromoData({
                  ...promoData,
                  [cat]: { ...promoData[cat], startDate: e.target.value },
                })
              }
            />
            <input
              type="date"
              className="border px-2 py-1 rounded"
              value={promoData[cat]?.endDate || ""}
              onChange={(e) =>
                setPromoData({
                  ...promoData,
                  [cat]: { ...promoData[cat], endDate: e.target.value },
                })
              }
            />
            <button
              className="bg-green-600 text-white px-3 rounded"
              onClick={() => updateCategoryPromo(cat)}
            >
              Update
            </button>
          </div>
        </div>
      ))}

      {/* ================= ALL PRODUCTS PROMO ================= */}
      <h2 className="text-xl font-semibold mb-4 mt-8">All Products Promo</h2>
      <div className="bg-white p-5 rounded shadow border flex gap-3 flex-wrap items-center">
        <input
          type="text"
          placeholder="Promo Code"
          className="border px-2 py-1 rounded"
          value={allPromo.promoCode}
          onChange={(e) => setAllPromo({ ...allPromo, promoCode: e.target.value })}
        />
        <select
          className="border px-2 py-1 rounded"
          value={allPromo.promoType}
          onChange={(e) => setAllPromo({ ...allPromo, promoType: e.target.value })}
        >
          <option value="">Type</option>
          <option value="percent">Percent (%)</option>
          <option value="flat">Flat (Taka)</option>
        </select>
        <input
          type="number"
          placeholder="Value"
          className="border px-2 py-1 rounded"
          value={allPromo.promoValue}
          onChange={(e) => setAllPromo({ ...allPromo, promoValue: e.target.value })}
        />
        <input
          type="date"
          className="border px-2 py-1 rounded"
          value={allPromo.startDate}
          onChange={(e) => setAllPromo({ ...allPromo, startDate: e.target.value })}
        />
        <input
          type="date"
          className="border px-2 py-1 rounded"
          value={allPromo.endDate}
          onChange={(e) => setAllPromo({ ...allPromo, endDate: e.target.value })}
        />
        <button className="bg-blue-600 text-white px-3 rounded" onClick={updateAllPromo}>
          Update All
        </button>
      </div>
    </div>
  );
}
