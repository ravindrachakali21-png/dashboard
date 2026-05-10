import { useState } from "react";
import { Heart, ChevronLeft, ChevronRight, Star } from "lucide-react";

// ─────────────────────────────────────────
// DATA
// ─────────────────────────────────────────
const bannerSlides = [
  { date: "September 12-22", title: "Enjoy free home delivery in this summer", subtitle: "Designer Dresses - Pick from trendy Designer Dress.", bg: "from-blue-500 to-blue-600" },
  { date: "October 1-15",    title: "Get 20% off on all electronics",          subtitle: "Top Brands - Explore the latest tech deals.",         bg: "from-indigo-500 to-indigo-600" },
  { date: "November 5-20",   title: "Winter sale — up to 50% off",             subtitle: "Stay warm with our premium collection.",               bg: "from-purple-500 to-purple-600" },
];

const productsList = [
  { id: 1, name: "Apple Watch Series 4", price: "$120.00", rating: 4, reviews: 131 },
  { id: 2, name: "Apple Watch Series 4", price: "$120.00", rating: 4, reviews: 131 },
  { id: 3, name: "Apple Watch Series 4", price: "$120.00", rating: 4, reviews: 131 },
  { id: 4, name: "Apple Watch Series 4", price: "$120.00", rating: 4, reviews: 131 },
  { id: 5, name: "Apple Watch Series 4", price: "$120.00", rating: 4, reviews: 131 },
  { id: 6, name: "Apple Watch Series 4", price: "$120.00", rating: 4, reviews: 131 },
];

// ─────────────────────────────────────────
// STAR RATING COMPONENT
// ─────────────────────────────────────────
function StarRating({ rating, max = 5 }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star key={i} size={13}
          className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-gray-200"} />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────
// PRODUCT CARD
// ─────────────────────────────────────────
function ProductCard({ product }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col">
      <div className="relative bg-gray-50 flex items-center justify-center h-52 overflow-hidden group">
        <img
          src="/assets/apple-watch2.png"
          alt={product.name}
          className="h-44 object-contain transition-transform duration-300 group-hover:scale-105"
          onError={e => {
            e.target.src = "/assets/apple-watch.png";
            e.target.onerror = () => { e.target.style.display = "none"; };
          }}
        />
        <button className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-100 transition opacity-0 group-hover:opacity-100">
          <ChevronLeft size={14} className="text-gray-500" />
        </button>
        <button className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-100 transition opacity-0 group-hover:opacity-100">
          <ChevronRight size={14} className="text-gray-500" />
        </button>
      </div>
      <div className="p-4 flex flex-col gap-1 flex-1">
        <div className="flex items-start justify-between">
          <p className="font-bold text-gray-800 text-sm">{product.name}</p>
          <button onClick={() => setLiked(l => !l)} className="transition-transform hover:scale-110">
            <Heart size={18} className={liked ? "fill-red-500 text-red-500" : "text-gray-400"} />
          </button>
        </div>
        <p className="text-blue-500 font-semibold text-sm">{product.price}</p>
        <div className="flex items-center gap-1.5">
          <StarRating rating={product.rating} />
          <span className="text-xs text-gray-400">({product.reviews})</span>
        </div>
        <button className="mt-3 w-full border border-gray-200 rounded-lg py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-blue-300 transition-colors">
          Edit Product
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// PRODUCTS SCREEN
// ─────────────────────────────────────────
export default function ProductsScreen() {
  const [bannerIndex, setBannerIndex] = useState(0);
  const banner = bannerSlides[bannerIndex];

  return (
    <section className="p-4 lg:p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Products</h1>

      {/* Promo Banner */}
      <div className={`relative bg-gradient-to-r ${banner.bg} rounded-2xl p-10 lg:p-14 overflow-hidden min-h-[200px] flex items-center`}>
        {/* Decorative circles */}
        <div className="absolute right-24 top-1/2 -translate-y-1/2 w-56 h-56 bg-white opacity-10 rounded-full pointer-events-none" />
        <div className="absolute right-6  top-1/2 -translate-y-1/2 w-36 h-36 bg-white opacity-10 rounded-full pointer-events-none" />
        <div className="absolute right-40 bottom-0 w-24 h-24 bg-white opacity-5 rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-lg">
          <p className="text-blue-100 text-sm mb-2 font-medium">{banner.date}</p>
          <h2 className="text-white text-3xl lg:text-4xl font-bold leading-tight mb-3">
            {banner.title}
          </h2>
          <p className="text-blue-100 text-sm mb-7">{banner.subtitle}</p>
          <button className="bg-orange-400 hover:bg-orange-500 text-white font-semibold px-7 py-2.5 rounded-full transition-colors text-sm shadow-md">
            Get Started
          </button>
        </div>

        {/* Arrows */}
        <button
          onClick={() => setBannerIndex(i => (i - 1 + bannerSlides.length) % bannerSlides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white bg-opacity-25 hover:bg-opacity-40 rounded-full flex items-center justify-center transition">
          <ChevronLeft size={18} className="text-white" />
        </button>
        <button
          onClick={() => setBannerIndex(i => (i + 1) % bannerSlides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white bg-opacity-25 hover:bg-opacity-40 rounded-full flex items-center justify-center transition">
          <ChevronRight size={18} className="text-white" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {bannerSlides.map((_, i) => (
            <span key={i} onClick={() => setBannerIndex(i)}
              className={`w-2 h-2 rounded-full cursor-pointer transition-all ${i === bannerIndex ? "bg-white w-4" : "bg-white bg-opacity-50"}`} />
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {productsList.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}