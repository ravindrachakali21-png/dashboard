import { useState } from "react";
import { ChevronLeft, ChevronRight, Heart, Star } from "lucide-react";

const favoriteItems = [
  { id: 1, name: "Apple Watch Series 4", price: "$120.00", rating: 4, reviews: 131, liked: true  },
  { id: 2, name: "Air-Max-270",          price: "$60.00",  rating: 4, reviews: 64,  liked: false },
  { id: 3, name: "Minimal Chair Tool",   price: "$24.59",  rating: 5, reviews: 63,  liked: false },
  { id: 4, name: "Amazfit Vip",          price: "$79.95",  rating: 4, reviews: 48,  liked: false },
  { id: 5, name: "Gumbo Mouse",          price: "$32.42",  rating: 3, reviews: 29,  liked: false },
  { id: 6, name: "Camera Tripod",        price: "$58.00",  rating: 4, reviews: 77,  liked: false },
];

function StarRating({ rating, max = 5 }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star key={i} size={13}
          className={i < rating
            ? "text-yellow-400 fill-yellow-400"
            : "text-gray-300 fill-gray-200"} />
      ))}
    </div>
  );
}

function FavoriteCard({ item }) {
  const [liked, setLiked] = useState(item.liked);

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col">
      {/* Image area */}
      <div className="relative bg-white flex items-center justify-center h-56 overflow-hidden group px-4 pt-4">
        <img
          src="/assets/apple-watch-starlight.png"
          alt={item.name}
          className="h-48 object-contain transition-transform duration-300 group-hover:scale-105"
          onError={e => {
            e.target.src = "/assets/apple-watch3.png";
            e.target.onerror = () => {
              e.target.src = "/assets/apple-watch.png";
              e.target.onerror = () => { e.target.style.display = "none"; };
            };
          }}
        />
        {/* Prev arrow */}
        <button className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition shadow-sm">
          <ChevronLeft size={14} className="text-gray-500" />
        </button>
        {/* Next arrow */}
        <button className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition shadow-sm">
          <ChevronRight size={14} className="text-gray-500" />
        </button>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-1.5 flex-1 border-t border-gray-50">
        <div className="flex items-start justify-between">
          <p className="font-bold text-gray-800 text-sm">{item.name}</p>
          <button
            onClick={() => setLiked(l => !l)}
            className="transition-transform hover:scale-110 ml-2 shrink-0"
          >
            <Heart
              size={18}
              className={liked
                ? "fill-red-500 text-red-500"
                : "text-gray-300 fill-gray-100"}
            />
          </button>
        </div>
        <p className="text-blue-500 font-semibold text-sm">{item.price}</p>
        <div className="flex items-center gap-1.5">
          <StarRating rating={item.rating} />
          <span className="text-xs text-gray-400">({item.reviews})</span>
        </div>
        <button className="mt-2 w-full border border-gray-200 rounded-lg py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-blue-300 transition-colors">
          Edit Product
        </button>
      </div>
    </div>
  );
}

export default function Favorites() {
  return (
    <section className="p-4 lg:p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Favorites</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {favoriteItems.map(item => (
          <FavoriteCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}