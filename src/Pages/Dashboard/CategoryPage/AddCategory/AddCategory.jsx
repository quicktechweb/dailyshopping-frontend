import { useEffect, useState } from "react";

// const IMGBB_API_KEY = "ab454291ebee91b49b021ecac51be17c"; 

export default function AddCategory() {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [status, setStatus] = useState("Inactive");
  const [categoryImgFile, setCategoryImgFile] = useState(null);
  const [editId, setEditId] = useState(null);

  // Fetch categories
  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  // Upload image to imgbb
  const uploadImage = async (file) => {
  if (!file) return "";

  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    // ❌ Check backend success
    if (!data?.success) {
      throw new Error(data.message || "Image upload failed");
    }

    // ✅ Upload successful
    return data.url;

  } catch (err) {
    console.error("Upload error:", err);

    // ❌ Show backend message if available
    alert(err.message || "Image upload failed");
    throw err; // চাইলে outer catch handle করতে পারবে
  }
};

  // Add or Update Category
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let categoryImgUrl = "";

      if (categoryImgFile) {
        categoryImgUrl = await uploadImage(categoryImgFile);
      }

      const newCategory = {
        categoryName,
        status,
        ...(categoryImgUrl && { categoryImg: categoryImgUrl }), // image থাকলে send হবে
      };

      let res, data;
      if (editId) {
        res = await fetch(`http://localhost:5000/api/categories/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newCategory),
        });
        data = await res.json();
        setCategories(categories.map((c) => (c._id === data._id ? data : c)));
        setEditId(null);
      } else {
        res = await fetch("http://localhost:5000/api/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newCategory),
        });
        data = await res.json();
        setCategories([...categories, data]);
      }

      setCategoryName("");
      setStatus("Inactive");
      setCategoryImgFile(null);
      document.getElementById("addForm").classList.add("hidden");
    } catch (err) {
      console.error("❌ Failed to upload image or save category", err);
      alert("Failed to upload image or save category.");
    }
  };

  // Delete Category
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    await fetch(`http://localhost:5000/api/categories/${id}`, { method: "DELETE" });
    setCategories(categories.filter((c) => c._id !== id));
  };

  // Edit Category
  const handleEdit = (cat) => {
    setEditId(cat._id);
    setCategoryName(cat.categoryName);
    setStatus(cat.status);
    setCategoryImgFile(null); // নতুন image না দিলে আগেরটা থাকবে
    document.getElementById("addForm").classList.remove("hidden");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Manage Category Information</h2>
        <button
          onClick={() => document.getElementById("addForm").classList.toggle("hidden")}
          className="bg-purple-700 text-white px-4 py-2 rounded"
        >
          + Add
        </button>
      </div>

      {/* Form */}
      <form
        id="addForm"
        onSubmit={handleSubmit}
        className="hidden mb-6 p-4 border rounded bg-gray-50"
      >
        <div className="mb-2">
          <label className="block mb-1">Category Name</label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border p-2 w-full rounded"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div className="mb-2">
          <label className="block mb-1">Category Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCategoryImgFile(e.target.files[0])}
            className="border p-2 w-full rounded"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {editId ? "Update" : "Save"}
        </button>
      </form>

      {/* Table */}
      <table className="w-full border text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Sl</th>
            <th className="p-2 border">Category Name</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white text-black">
          {categories.map((cat, i) => (
            <tr key={cat._id} className="border">
              <td className="p-2 border">{i + 1}</td>
              <td className="p-2 border">{cat.categoryName}</td>
              <td className="p-2 border">{cat.status}</td>
              <td className="p-2 border">
                {cat.categoryImg && (
                  <img src={cat.categoryImg} alt={cat.categoryName} className="w-16 h-16 object-cover rounded" />
                )}
              </td>
              <td className="p-2 border space-x-2">
                <button
                  onClick={() => handleEdit(cat)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(cat._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
