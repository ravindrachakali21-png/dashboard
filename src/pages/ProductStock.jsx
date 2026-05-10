import { useState } from "react";
import { Search, Pencil, Trash2 } from "lucide-react";

const initialProducts = [
  {
    id: 1,
    image: "/assets/apple-watch1.png",
    bgColor: "bg-orange-400",
    name: "Apple Watch Series 4",
    category: "Digital Product",
    price: "$690.00",
    piece: 63,
    colors: ["#111111", "#9ca3af", "#fca5a5"],
  },
  {
    id: 2,
    image: "/assets/headphone.png",
    bgColor: "bg-gray-700",
    name: "Microsoft Headsquare",
    category: "Digital Product",
    price: "$190.00",
    piece: 13,
    colors: ["#111111", "#fca5a5", "#60a5fa", "#eab308"],
  },
  {
    id: 3,
    image: "/assets/dress.png",
    bgColor: "bg-purple-300",
    name: "Women's Dress",
    category: "Fashion",
    price: "$640.00",
    piece: 635,
    colors: ["#9f1239", "#7dd3fc", "#1e3a5f", "#3b82f6"],
  },
  {
    id: 4,
    image: "/assets/samsung.png",
    bgColor: "bg-pink-400",
    name: "Samsung A50",
    category: "Mobile",
    price: "$400.00",
    piece: 67,
    colors: ["#1e3a5f", "#111111", "#9f1239"],
  },
  {
    id: 5,
    image: "/assets/camera.png",
    bgColor: "bg-orange-400",
    name: "Camera",
    category: "Electronic",
    price: "$420.00",
    piece: 52,
    colors: ["#1e3a5f", "#111111", "#9f1239"],
  },
  {
    id: 6,
    image: "/assets/headphone.png",
    bgColor: "bg-gray-700",
    name: "Microsoft Headsquare",
    category: "Digital Product",
    price: "$190.00",
    piece: 13,
    colors: ["#111111", "#fca5a5", "#60a5fa", "#eab308"],
  },
  {
    id: 7,
    image: "/assets/dress.png",
    bgColor: "bg-purple-300",
    name: "Women's Dress",
    category: "Fashion",
    price: "$640.00",
    piece: 635,
    colors: ["#9f1239", "#7dd3fc", "#1e3a5f", "#3b82f6"],
  },
];

export default function ProductStock() {
  const [products, setProducts]   = useState(initialProducts);
  const [search,   setSearch]     = useState("");

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => setProducts(prev => prev.filter(p => p.id !== id));

  return (
    <section className="p-4 lg:p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-bold text-gray-800">Product Stock</h1>
        <div className="flex items-center bg-white border border-gray-200 rounded-xl px-3 py-2 gap-2 w-64 shadow-sm">
          <Search size={15} className="text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Search product name"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="text-sm text-gray-600 outline-none w-full placeholder-gray-400 bg-transparent"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left font-semibold text-gray-700 px-5 py-4">Image</th>
                <th className="text-left font-semibold text-gray-700 px-5 py-4">Product Name</th>
                <th className="text-left font-semibold text-gray-700 px-5 py-4">Category</th>
                <th className="text-left font-semibold text-gray-700 px-5 py-4">Price</th>
                <th className="text-left font-semibold text-gray-700 px-5 py-4">Piece</th>
                <th className="text-left font-semibold text-gray-700 px-5 py-4">Available Color</th>
                <th className="text-left font-semibold text-gray-700 px-5 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  {/* Image */}
                  <td className="px-5 py-3">
                    <div className={`w-14 h-14 rounded-xl ${product.bgColor} flex items-center justify-center overflow-hidden`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={e => { e.target.style.display = "none"; }}
                      />
                    </div>
                  </td>
                  {/* Name */}
                  <td className="px-5 py-3 text-gray-700 font-medium">{product.name}</td>
                  {/* Category */}
                  <td className="px-5 py-3 text-gray-500">{product.category}</td>
                  {/* Price */}
                  <td className="px-5 py-3 text-gray-700 font-medium">{product.price}</td>
                  {/* Piece */}
                  <td className="px-5 py-3 text-gray-700">{product.piece}</td>
                  {/* Colors */}
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1.5">
                      {product.colors.map((color, i) => (
                        <span
                          key={i}
                          className="w-5 h-5 rounded-full border border-white shadow-sm"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </td>
                  {/* Action */}
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                        <Pencil size={14} className="text-gray-500" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="w-8 h-8 rounded-lg border border-red-100 flex items-center justify-center hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={14} className="text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-5 py-3 flex items-center justify-between border-t border-gray-100">
          <span className="text-sm text-gray-500">Showing 1-0{filtered.length} of 78</span>
          <div className="flex items-center gap-1">
            <button className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-500">
              ‹
            </button>
            <button className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-500">
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}