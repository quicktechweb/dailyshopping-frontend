import { motion } from "framer-motion";
import ScrollToTop from "../HomePage/ScrollToTop/ScrollToTop";

export default function LuckyShopBlog() {
  const categories = [
    "All",
    "E‑commerce Tips",
    "Design",
    "Marketing",
    "Product Stories",
    "Industry News",
  ];

  const posts = [
    {
      id: 1,
      title: "10 Conversion-Boosting Product Page Tweaks",
      excerpt:
        "Small UX changes that move the needle: layout, microcopy, and checkout flows that increase conversion.",
      category: "E‑commerce Tips",
      author: "Nadia Rahman",
      date: "Oct 10, 2025",
      readTime: "6 min",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&q=80&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Design Systems for Fast-growing Stores",
      excerpt:
        "How to build a scalable design system that keeps your brand consistent as you add new categories and features.",
      category: "Design",
      author: "Arif Khan",
      date: "Sep 28, 2025",
      readTime: "8 min",
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=80&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Smart Promo Strategies for Holiday Peaks",
      excerpt:
        "Plan promos, bundles and urgency messaging that protect margin while driving volume during peaks.",
      category: "Marketing",
      author: "Mina Das",
      date: "Nov 2, 2025",
      readTime: "7 min",
      image:
        "https://images.unsplash.com/photo-1503602642458-232111445657?w=1200&q=80&auto=format&fit=crop",
    },
    {
      id: 4,
      title: "Behind the Scenes: Sourcing Sustainable Fabrics",
      excerpt:
        "A founder’s tale — meeting suppliers, quality checks, and the cost of doing the right thing.",
      category: "Product Stories",
      author: "Rafi Ahmed",
      date: "Aug 19, 2025",
      readTime: "5 min",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&q=80&auto=format&fit=crop",
    },
  ];

  const popular = posts.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <ScrollToTop />

      {/* Hero */}
      <section className="bg-gradient-to-r from-white via-indigo-50 to-white">
        <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2">
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl md:text-5xl mt-20 md:-mt-10 font-extrabold leading-tight text-gray-900"
            >
              Insights, tactics and stories for ambitious e‑commerce teams
            </motion.h1>
            <p className="mt-4 text-gray-600 max-w-full sm:max-w-2xl text-sm sm:text-base">
              The LuckyShop blog brings practical playbooks, design patterns, and founder stories that help
              you grow revenue, design beautiful experiences, and ship confidently.
            </p>

            <div className="mt-6 flex flex-wrap gap-2 sm:gap-3">
              <button className="px-3 py-1 sm:px-4 sm:py-2 rounded-full border text-xs sm:text-sm font-medium hover:bg-indigo-50">Start here</button>
              <button className="px-3 py-1 sm:px-4 sm:py-2 rounded-full border text-xs sm:text-sm font-medium hover:bg-indigo-50">Popular posts</button>
              <button className="px-3 py-1 sm:px-4 sm:py-2 rounded-full border text-xs sm:text-sm font-medium hover:bg-indigo-50">Subscribe</button>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {popular.map((p) => (
                <article key={p.id} className="flex items-center gap-3 sm:gap-4 bg-white rounded-2xl p-3 sm:p-4 border">
                  <img src={p.image} alt="" className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover" />
                  <div>
                    <div className="text-xs text-indigo-600 font-semibold">{p.category}</div>
                    <h3 className="text-xs sm:text-sm font-semibold">{p.title}</h3>
                    <div className="text-xs text-gray-500">{p.author} • {p.readTime}</div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="lg:block hidden">
            <div className="bg-white rounded-2xl p-6 border shadow-sm">
              <h4 className="font-semibold text-sm sm:text-base">Newsletter</h4>
              <p className="mt-2 text-xs sm:text-sm text-gray-600">Weekly insights for store builders. No spam. Unsubscribe anytime.</p>
              <div className="mt-4 flex gap-2">
                <input aria-label="Email" placeholder="you@company.com" className="flex-1 px-3 py-2 border rounded-lg text-xs sm:text-sm focus:outline-none" />
                <button className="px-3 sm:px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs sm:text-sm">Join</button>
              </div>
            </div>

            <div className="mt-6 bg-white rounded-2xl p-6 border shadow-sm">
              <h4 className="font-semibold text-sm sm:text-base">Categories</h4>
              <div className="mt-3 flex flex-col gap-2">
                {categories.map((c) => (
                  <button key={c} className="text-left text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 rounded-lg hover:bg-gray-50">{c}</button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-6 -mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
            <div className="flex items-center gap-2 sm:gap-4 text-sm sm:text-base">
              <div>Showing</div>
              <select className="px-2 sm:px-3 py-1 sm:py-2 border rounded-lg text-xs sm:text-sm bg-white">
                <option>Newest</option>
                <option>Most read</option>
                <option>Recommended</option>
              </select>
            </div>

            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
              <div>View</div>
              <button className="px-2 py-1 border rounded hover:bg-gray-100">Grid</button>
              <button className="px-2 py-1 border rounded hover:bg-gray-100">List</button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {posts.map((post) => (
              <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border">
                <div className="relative">
                  <img src={post.image} alt="" className="w-full h-48 object-cover" />
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-indigo-600 text-white text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full">{post.category}</div>
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="text-sm sm:text-lg font-semibold tracking-tight">{post.title}</h3>
                  <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600">{post.excerpt}</p>

                  <div className="mt-3 sm:mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-200 flex items-center justify-center text-xs sm:text-sm">{post.author.split(" ")[0][0]}</div>
                      <div className="text-xs sm:text-sm text-gray-600">{post.author} • {post.date}</div>
                    </div>
                    <motion.button whileHover={{ scale: 1.03 }} className="px-2 sm:px-3 py-1 sm:py-2 bg-emerald-500 text-white rounded-lg text-xs sm:text-sm">Read</motion.button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-6 sm:mt-8 flex items-center justify-center">
            <nav className="inline-flex -space-x-px rounded-md shadow-sm text-xs sm:text-sm">
              <a className="px-3 sm:px-4 py-1 sm:py-2 border bg-white rounded-l-md">Prev</a>
              <a className="px-3 sm:px-4 py-1 sm:py-2 border bg-white">1</a>
              <a className="px-3 sm:px-4 py-1 sm:py-2 border bg-white">2</a>
              <a className="px-3 sm:px-4 py-1 sm:py-2 border bg-white rounded-r-md">Next</a>
            </nav>
          </div>
        </section>

        <aside className="space-y-6 lg:block">
          {/* Hide sidebar on mobile */}
          <div className="hidden lg:block bg-white rounded-2xl p-6 border shadow-sm">
            <h4 className="font-semibold text-sm sm:text-base">Popular this week</h4>
            <ol className="mt-3 space-y-2 sm:space-y-3 text-xs sm:text-sm">
              {posts.map((p) => (
                <li key={p.id} className="flex items-start gap-2 sm:gap-3">
                  <img src={p.image} alt="" className="w-10 h-10 sm:w-12 sm:h-12 rounded-md object-cover" />
                  <div className="text-xs sm:text-sm">
                    <div className="font-medium">{p.title}</div>
                    <div className="text-gray-500">{p.readTime} • {p.author}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="hidden lg:block bg-white rounded-2xl p-6 border shadow-sm">
            <h4 className="font-semibold text-sm sm:text-base">Tags</h4>
            <div className="mt-3 flex flex-wrap gap-2 text-xs sm:text-sm">
              {['ux','checkout','design','growth','sustainability','promo'].map((t)=> (
                <button key={t} className="px-2 py-1 border rounded-full">#{t}</button>
              ))}
            </div>
          </div>

          <div className="hidden lg:block bg-white rounded-2xl p-6 border shadow-sm">
            <h4 className="font-semibold text-sm sm:text-base">About the author</h4>
            <p className="mt-2 text-xs sm:text-sm text-gray-600">LuckyShop editorial is written by e‑commerce designers and operators. We publish practical, action‑oriented content every week.</p>
            <div className="mt-3 flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-200"></div>
              <div>
                <div className="font-medium text-xs sm:text-sm">LuckyShop Editorial</div>
                <div className="text-gray-500 text-xs sm:text-sm">Editor</div>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
