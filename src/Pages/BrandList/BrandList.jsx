
const brands = [
  {
    name: "Nike",
    logo: "https://download.logo.wine/logo/Sony_Mobile/Sony_Mobile-Logo.wine.png",
    tagline: "Just Do It",
  },
  {
    name: "Adidas",
    logo: "https://download.logo.wine/logo/Sony_Mobile/Sony_Mobile-Logo.wine.png",
    tagline: "Impossible is Nothing",
  },
  {
    name: "Apple",
    logo: "https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo.png",
    tagline: "Think Different",
  },
  {
    name: "Samsung",
    logo: "https://1000logos.net/wp-content/uploads/2017/06/Samsung-Logo.png",
    tagline: "Imagine the Possibilities",
  },
  {
    name: "Sony",
    logo: "https://1000logos.net/wp-content/uploads/2017/06/Sony-Logo.png",
    tagline: "Be Moved",
  },
  {
    name: "Louis Vuitton",
    logo: "https://1000logos.net/wp-content/uploads/2017/06/Sony-Logo.png",
    tagline: "Luxury Redefined",
  },
  {
    name: "Gucci",
    logo: "https://1000logos.net/wp-content/uploads/2017/06/Sony-Logo.png",
    tagline: "Quality & Elegance",
  },
  {
    name: "Puma",
    logo: "https://1000logos.net/wp-content/uploads/2017/06/Sony-Logo.png",
    tagline: "Forever Faster",
  },
];

export default function BrandList() {
  return (
    <div className="min-h-screen mb-20 md:mb-0 bg-gradient-to-b from-white via-gray-50 to-white text-gray-900">
      {/* Header */}
      <div className="text-center py-12 px-4 md:px-0">
        <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-emerald-600 text-transparent bg-clip-text mt-20 md:mt-0">
          Our Trusted Brands
        </h1>
        <p className="text-gray-600 mt-2 text-sm md:text-base max-w-xl mx-auto">
          LuckyShop partners with premium global brands to bring you high-quality products.
        </p>
      </div>

      {/* Brand Grid */}
      <div className="max-w-7xl mx-auto -mt-16 px-4 md:px-6 py-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
        {brands.map((brand, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-[0_2px_18px_rgba(0,0,0,0.15)] p-3 flex flex-col items-center text-center hover:shadow-xl transition transform hover:-translate-y-1"
          >
            <img
              src={brand.logo}
              alt={brand.name}
              className="w-16 h-16 md:w-20 md:h-20 object-contain mb-2"
            />
            <h3 className="text-sm md:text-base font-semibold text-gray-900">{brand.name}</h3>
            <p className="text-gray-400 text-xs mt-1">{brand.tagline}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
