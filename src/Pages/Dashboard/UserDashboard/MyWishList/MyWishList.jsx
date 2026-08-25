import { FiTrash2, FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

const wishlistData = [
  {
    store: "Onix Corporation - Choice.Selection",
    items: [
      {
        title:
          "Metal Laptop Folding Stand - Laptop Stand Bracket Portable Heat Dissipation Bracket Game Book Support for...",
        price: 172,
        img: "https://img.lazcdn.com/3rd/q/aHR0cHM6Ly9zdGF0aWMtMDEuZGFyYXouY29tLmJkL3AvZTM3MjgxM2JiYmYxNTUxMzhiYTgzYzA3MGIzNGZlZjEuanBn_80x80q80.png_.webp",
      },
    ],
  },
  {
    store: "Doob Cart",
    items: [
      {
        title:
          "Mountain Wall Art Wood, Geometric Mountains, Mountain Wall Decor, Wood Wall Art Mountains, Wood Pane...",
        price: 190,
        oldPrice: 500,
        discount: "-62%",
        status: "Price dropped",
        color: "Black",
        img: "https://img.lazcdn.com/3rd/q/aHR0cHM6Ly9zdGF0aWMtMDEuZGFyYXouY29tLmJkL3AvZTM3MjgxM2JiYmYxNTUxMzhiYTgzYzA3MGIzNGZlZjEuanBn_80x80q80.png_.webp",
      },
    ],
  },
  {
    store: "B-Baria Mart",
    items: [
      {
        title: "Mini Refillable Perfume Bottle Spray 5 ml",
        price: 65,
        oldPrice: 140,
        discount: "-54%",
        status: "Price dropped",
        color: "Black",
        img: "https://img.lazcdn.com/3rd/q/aHR0cHM6Ly9zdGF0aWMtMDEuZGFyYXouY29tLmJkL3AvZTM3MjgxM2JiYmYxNTUxMzhiYTgzYzA3MGIzNGZlZjEuanBn_80x80q80.png_.webp",
      },
    ],
  },
];

const MyWishlist = () => {
  return (
    <div className="bg-[#f5f5f5] min-h-screen md:-mt-10 -mt-6">
      <div className="max-w-6xl mx-auto px-3 lg:px-0">
        {/* Header */}
        <h2 className="text-xl font-semibold mb-4">
          My Wishlist & Followed Stores (13)
        </h2>

        {/* Tabs */}
        <div className="flex gap-8 border-b mb-4 text-sm">
          <span className="pb-2 border-b-2 border-teal-700 text-teal-700 font-medium">
            My Wishlist (13)
          </span>
          <span className="text-gray-500">Past Purchases</span>
          <Link to="/dashboard/followstore">
            <span className="text-gray-500">Followed Stores</span>
          </Link>
        </div>

        {/* Add all */}
        <div className="bg-white p-4 mb-4">
          <button className="text-sm text-sky-600 font-medium">
            ADD ALL TO CART
          </button>
        </div>

        {/* Wishlist List */}
        {wishlistData.map((group, idx) => (
          <div key={idx} className="bg-white mb-4">
            {/* Store name */}
            <div className="px-4 py-3 text-sm font-medium border-b">
              {group.store}
            </div>

            {group.items.map((item, i) => (
              <div
                key={i}
                className="flex flex-col lg:flex-row lg:items-center justify-between px-4 py-4 border-b last:border-b-0 gap-4 lg:gap-0"
              >
                {/* LEFT */}
                <div className="flex gap-4">
                  <img
                    src={item.img}
                    alt=""
                    className="w-16 h-16 border object-cover flex-shrink-0"
                  />

                  <div>
                    <div className="flex items-start gap-2">
                      <span className="bg-purple-600 text-white text-xs px-1.5 rounded mt-0.5">
                        2.2
                      </span>
                      <p className="text-sm lg:max-w-md">
                        {item.title}
                      </p>
                    </div>

                    {item.color && (
                      <p className="text-xs text-gray-500 mt-1">
                        Color family: {item.color}
                      </p>
                    )}

                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-orange-500 font-semibold">
                        ৳ {item.price}
                      </span>

                      {item.oldPrice && (
                        <>
                          <span className="line-through text-xs text-gray-400">
                            ৳ {item.oldPrice}
                          </span>
                          <span className="text-xs text-orange-500">
                            {item.discount}
                          </span>
                        </>
                      )}
                    </div>

                    {item.status && (
                      <p className="text-xs text-green-600 mt-1">
                        {item.status}
                      </p>
                    )}
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-4 lg:justify-end">
                  <button className="text-gray-400 hover:text-red-500">
                    <FiTrash2 size={18} />
                  </button>

                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded flex items-center gap-2">
                    <FiShoppingCart />
                    <span className="text-sm lg:hidden">
                      Add to Cart
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyWishlist;
