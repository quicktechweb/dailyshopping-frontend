import { useEffect, useState } from "react";

const SubCategory = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    categoryName: "",
    status: "Active",
    subcategoryImg: "", // renamed
  });
  const [imageFile, setImageFile] = useState(null);
  const [editId, setEditId] = useState(null);

  // Fetch subcategories
  const fetchSubcategories = () => {
    fetch("https://serverluckyshop.luckyshop.com.bd/api/subcategories")
      .then((res) => res.json())
      .then((data) => setSubcategories(data));
  };

  // Fetch categories
  const fetchCategories = () => {
    fetch("https://serverluckyshop.luckyshop.com.bd/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  };

  useEffect(() => {
    fetchSubcategories();
    fetchCategories();
  }, []);

  // Upload image to imgbb
  const uploadImageToImgbb = async (file) => {
  if (!file) return "";

  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await fetch("https://serverluckyshop.luckyshop.com.bd/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    // ❌ Check if backend returned success
    if (!data?.success) {
      // backend message show
      throw new Error(data.message || "Image upload failed");
    }

    // ✅ Upload successful, return URL
    return data.url;

  } catch (err) {
    console.error("Image upload error:", err);

    // ❌ Frontend alert for backend message
    alert(err.message || "Image upload failed");
    throw err; // outer catch handle করতে পারবে
  }
};


  // Handle Add/Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    let subcategoryImg = form.subcategoryImg;
    if (imageFile) {
      subcategoryImg = await uploadImageToImgbb(imageFile);
    }

    const newSub = { ...form, subcategoryImg };
    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `https://serverluckyshop.luckyshop.com.bd/api/subcategories/${editId}`
      : "https://serverluckyshop.luckyshop.com.bd/api/subcategories";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSub),
    });

    fetchSubcategories();
    setForm({ name: "", categoryName: "", status: "Active", subcategoryImg: "" });
    setImageFile(null);
    setEditId(null);
  };

  // Delete
  const handleDelete = (id) => {
    fetch(`https://serverluckyshop.luckyshop.com.bd/api/subcategories/${id}`, { method: "DELETE" }).then(() =>
      fetchSubcategories()
    );
  };

  // Edit
  const handleEdit = (sub) => {
    setForm({
      name: sub.name,
      categoryName: sub.categoryName,
      status: sub.status,
      subcategoryImg: sub.subcategoryImg, // updated
    });
    setEditId(sub._id);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Manage Subcategory Information</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-4 flex gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Subcategory Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 rounded"
          required
        />

        <select
          value={form.categoryName}
          onChange={(e) => setForm({ ...form, categoryName: e.target.value })}
          className="border p-2 rounded bg-gray-800 text-white"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.categoryName}>
              {cat.categoryName}
            </option>
          ))}
        </select>

        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="border p-2 rounded"
        >
          <option>Active</option>
          <option>Inactive</option>
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="border p-2 rounded"
        />

        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          {editId ? "Update" : "Add"}
        </button>
      </form>

      {/* Table */}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Sl</th>
            <th className="p-2 border">Category Name</th>
            <th className="p-2 border">Subcategory Name</th>
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {subcategories.map((sub, index) => (
            <tr key={sub._id} className="border-b">
              <td className="p-2 border">{index + 1}</td>
              <td className="p-2 border">{sub.categoryName}</td>
              <td className="p-2 border">{sub.name}</td>
              <td className="p-2 border">
                <img src={sub.subcategoryImg} alt="subcategory" className="w-12 h-12 object-cover rounded" />
              </td>
              <td className="p-2 border">{sub.status}</td>
              <td className="p-2 border flex gap-2">
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded"
                  onClick={() => handleEdit(sub)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(sub._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {subcategories.length === 0 && (
            <tr>
              <td className="p-2 text-center" colSpan={6}>
                No subcategories found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SubCategory;
