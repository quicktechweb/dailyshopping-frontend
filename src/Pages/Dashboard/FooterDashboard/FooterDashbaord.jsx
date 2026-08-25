import { useEffect, useState } from "react";
import axios from "axios";

const FooterDashboard = () => {
  const [footer, setFooter] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch footer data
  useEffect(() => {
    axios
      .get("https://serverluckyshop.luckyshop.com.bd/api/footer")
      .then((res) => {
        const data = res.data.footer;

        const safeFooter = {
          _id: data?._id || "",
          quickLinks: data?.quickLinks || [],
          luckyShop: data?.luckyShop || [],
          payment: data?.payment || [],
          shipping: data?.shipping || [],
          citiesCovered: data?.citiesCovered || [],
          support: data?.support || { title: "" },
          boxed: data?.boxed || {
            title: "",
            note: "",
            servicesLabel: "",
            phone: "",
            downloadAppLabel: "",
            appImages: { apple: "", google: "" },
          },
          certifications: data?.certifications || [],
          copyright: data?.copyright || "",
          bottomLinks: data?.bottomLinks || [],
          followUsLabel: data?.followUsLabel || "",
          social: data?.social || [],
          headings: data?.headings || {},
          smallText: data?.smallText || {},
        };

        setFooter(safeFooter);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e, field, index = null, subField = null) => {
    const value = e.target.value;
    setFooter((prev) => {
      const copy = { ...prev };
      if (index !== null && subField !== null) {
        if (!copy[field][index]) copy[field][index] = {};
        copy[field][index][subField] = value;
      } else if (index !== null) {
        copy[field][index] = value;
      } else if (subField) {
        if (!copy[field]) copy[field] = {};
        copy[field][subField] = value;
      } else {
        copy[field] = value;
      }
      return copy;
    });
  };

  const handleSave = () => {
    axios
      .put(`https://serverluckyshop.luckyshop.com.bd/api/footer/${footer._id}`, footer)
      .then(() => alert("Footer updated successfully!"))
      .catch((err) => console.log(err));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Footer Dashboard</h1>

      {/* Generic Section Renderer */}
      {[
        { title: "Quick Links", field: "quickLinks" },
        { title: "LuckyShop", field: "luckyShop" },
        { title: "Cities Covered", field: "citiesCovered" },
        { title: "Bottom Links", field: "bottomLinks" },
      ].map(({ title, field }) => (
        <section className="mb-8" key={field}>
          <h2 className="text-2xl font-semibold mb-4">{title}</h2>
          <div className="grid grid-cols-3 gap-4">
            {footer[field].map((item, i) => (
              <input
                key={i}
                value={item || ""}
                onChange={(e) => handleChange(e, field, i)}
                className="p-2 border rounded"
                placeholder={`${title} ${i + 1}`}
              />
            ))}
          </div>
        </section>
      ))}

      {/* Payment */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Payment</h2>
        <div className="grid grid-cols-3 gap-4">
          {footer.payment.map((p, i) => (
            <>
              <input
                key={`name-${i}`}
                value={p?.name || ""}
                placeholder="Name"
                onChange={(e) => handleChange(e, "payment", i, "name")}
                className="p-2 border rounded"
              />
              <input
                key={`icon-${i}`}
                value={p?.icon || ""}
                placeholder="Icon URL"
                onChange={(e) => handleChange(e, "payment", i, "icon")}
                className="p-2 border rounded"
              />
              <div key={`empty-${i}`}></div>
            </>
          ))}
        </div>
      </section>

      {/* Shipping */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Shipping</h2>
        <div className="grid grid-cols-3 gap-4">
          {footer.shipping.map((s, i) => (
            <>
              <input
                key={`label-${i}`}
                value={s?.label || ""}
                placeholder="Label"
                onChange={(e) => handleChange(e, "shipping", i, "label")}
                className="p-2 border rounded"
              />
              <input
                key={`emoji-${i}`}
                value={s?.emoji || ""}
                placeholder="Emoji"
                onChange={(e) => handleChange(e, "shipping", i, "emoji")}
                className="p-2 border rounded"
              />
              <input
                key={`subtitle-${i}`}
                value={s?.subtitle || ""}
                placeholder="Subtitle"
                onChange={(e) => handleChange(e, "shipping", i, "subtitle")}
                className="p-2 border rounded"
              />
            </>
          ))}
        </div>
      </section>

      {/* Support */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Support</h2>
        <input
          value={footer.support?.title || ""}
          placeholder="Support Title"
          onChange={(e) => handleChange(e, "support", null, "title")}
          className="p-2 border rounded w-full"
        />
      </section>

      {/* Boxed Info */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Boxed Info</h2>
        <div className="grid grid-cols-3 gap-4">
          <input
            value={footer.boxed?.title || ""}
            placeholder="Title"
            onChange={(e) => handleChange(e, "boxed", null, "title")}
            className="p-2 border rounded"
          />
          <input
            value={footer.boxed?.note || ""}
            placeholder="Note"
            onChange={(e) => handleChange(e, "boxed", null, "note")}
            className="p-2 border rounded"
          />
          <input
            value={footer.boxed?.servicesLabel || ""}
            placeholder="Services Label"
            onChange={(e) => handleChange(e, "boxed", null, "servicesLabel")}
            className="p-2 border rounded"
          />
          <input
            value={footer.boxed?.phone || ""}
            placeholder="Phone"
            onChange={(e) => handleChange(e, "boxed", null, "phone")}
            className="p-2 border rounded"
          />
          <input
            value={footer.boxed?.downloadAppLabel || ""}
            placeholder="Download App Label"
            onChange={(e) => handleChange(e, "boxed", null, "downloadAppLabel")}
            className="p-2 border rounded"
          />
          <input
            value={footer.boxed?.appImages?.apple || ""}
            placeholder="Apple App URL"
            onChange={(e) => handleChange(e, "boxed", null, "appImages.apple")}
            className="p-2 border rounded"
          />
          <input
            value={footer.boxed?.appImages?.google || ""}
            placeholder="Google App URL"
            onChange={(e) => handleChange(e, "boxed", null, "appImages.google")}
            className="p-2 border rounded"
          />
        </div>
      </section>

      {/* Certifications */}
      {/* Certifications */}
<section className="mb-8">
  <div className="flex items-center justify-between">
    <h2 className="text-2xl font-semibold mb-4">Certifications</h2>

    {/* ➕ Add New Certification */}
    <button
      onClick={() =>
        setFooter((prev) => ({
          ...prev,
          certifications: [...prev.certifications, { alt: "", img: "" }],
        }))
      }
      className="px-3 py-1 bg-green-600 text-white rounded"
    >
      + Add
    </button>
  </div>

  <div className="grid grid-cols-3 gap-4">
    {footer.certifications.map((c, i) => (
      <div key={i} className="grid grid-cols-3 gap-2 items-center">
        <input
          value={c?.alt || ""}
          placeholder="Alt Text"
          onChange={(e) => handleChange(e, "certifications", i, "alt")}
          className="p-2 border rounded"
        />
        <input
          value={c?.img || ""}
          placeholder="Image URL"
          onChange={(e) => handleChange(e, "certifications", i, "img")}
          className="p-2 border rounded"
        />

        {/* ❌ Remove Certification */}
        <button
          onClick={() =>
            setFooter((prev) => ({
              ...prev,
              certifications: prev.certifications.filter((_, index) => index !== i),
            }))
          }
          className="px-2 py-1 bg-red-500 text-white rounded"
        >
          ✕
        </button>
      </div>
    ))}
  </div>
</section>


      {/* Social */}
    {/* Social */}
<section className="mb-8">
  <div className="flex items-center justify-between">
    <h2 className="text-2xl font-semibold mb-4">Social Links</h2>

    {/* ➕ Add New Social */}
    <button
      onClick={() =>
        setFooter((prev) => ({
          ...prev,
          social: [...prev.social, { name: "", icon: "" }],
        }))
      }
      className="px-3 py-1 bg-green-600 text-white rounded"
    >
      + Add
    </button>
  </div>

  <div className="grid grid-cols-3 gap-4">
    {footer.social.map((s, i) => (
      <div key={i} className="grid grid-cols-3 gap-2 items-center">
        <input
          value={s?.name || ""}
          placeholder="Name (Facebook, YouTube)"
          onChange={(e) => handleChange(e, "social", i, "name")}
          className="p-2 border rounded"
        />
        <input
          value={s?.icon || ""}
          placeholder="Icon or URL"
          onChange={(e) => handleChange(e, "social", i, "icon")}
          className="p-2 border rounded"
        />

        {/* ❌ Remove Social Link */}
        <button
          onClick={() =>
            setFooter((prev) => ({
              ...prev,
              social: prev.social.filter((_, index) => index !== i),
            }))
          }
          className="px-2 py-1 bg-red-500 text-white rounded"
        >
          ✕
        </button>
      </div>
    ))}
  </div>
</section>


      {/* Copyright */}
      {/* <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Copyright</h2>
        <input
          value={footer?.copyright || ""}
          placeholder="Copyright"
          onChange={(e) => handleChange(e, "copyright")}
          className="p-2 border rounded w-full"
        />
      </section> */}

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-colors"
      >
        Save Changes
      </button>
    </div>
  );
};

export default FooterDashboard;
