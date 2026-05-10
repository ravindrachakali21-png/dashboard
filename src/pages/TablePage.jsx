import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

// ── Order Table Data ──────────────────────────────────────────
const orderData = [
  { id: "00001", name: "Christine Brooks",  address: "089 Kutch Green Apt. 448",    date: "14 Feb 2019", type: "Electric", status: "Completed"  },
  { id: "00002", name: "Rosie Pearson",     address: "979 Immanuel Ferry Suite 526", date: "14 Feb 2019", type: "Book",     status: "Processing" },
  { id: "00003", name: "Darrell Caldwell",  address: "8587 Frida Ports",             date: "14 Feb 2019", type: "Medicine", status: "Rejected"   },
  { id: "00004", name: "Gilbert Johnston",  address: "768 Destiny Lake Suite 600",   date: "14 Feb 2019", type: "Mobile",   status: "Completed"  },
  { id: "00005", name: "Alan Cain",         address: "042 Mylene Throughway",        date: "14 Feb 2019", type: "Watch",    status: "Processing" },
  { id: "00006", name: "Alfred Murray",     address: "543 Weimann Mountain",         date: "14 Feb 2019", type: "Medicine", status: "Completed"  },
];

const statusStyles = {
  Completed:   "bg-teal-50   text-teal-500   border border-teal-200",
  Processing:  "bg-purple-50 text-purple-500 border border-purple-200",
  Rejected:    "bg-red-50    text-red-400    border border-red-200",
  "On Hold":   "bg-orange-50 text-orange-400 border border-orange-200",
  "In Transit":"bg-blue-50   text-blue-400   border border-blue-200",
};

// ── Product Stock Data ────────────────────────────────────────
const initialProducts = [
  { id: 1, image: "/assets/apple-watch1.png", bgColor: "bg-orange-400", name: "Apple Watch Series 4", category: "Digital Product", price: "$690.00", piece: 63,  colors: ["#111111","#9ca3af","#fca5a5"] },
  { id: 2, image: "/assets/headphone.png",    bgColor: "bg-gray-700",   name: "Microsoft Headsquare", category: "Digital Product", price: "$190.00", piece: 13,  colors: ["#111111","#fca5a5","#60a5fa","#eab308"] },
  { id: 3, image: "/assets/dress.png",        bgColor: "bg-purple-300", name: "Women's Dress",        category: "Fashion",         price: "$640.00", piece: 635, colors: ["#9f1239","#7dd3fc","#1e3a5f","#3b82f6"] },
  { id: 4, image: "/assets/samsung.png",      bgColor: "bg-pink-400",   name: "Samsung A50",          category: "Mobile",          price: "$400.00", piece: 67,  colors: ["#1e3a5f","#111111","#9f1239"] },
  { id: 5, image: "/assets/camera.png",       bgColor: "bg-orange-400", name: "Camera",               category: "Electronic",      price: "$420.00", piece: 52,  colors: ["#1e3a5f","#111111","#9f1239"] },
];

export default function TablePage() {
  const [products, setProducts] = useState(initialProducts);

  const deleteProduct = (id) => setProducts(prev => prev.filter(p => p.id !== id));

  return (
    <section className="p-4 lg:p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Table</h1>

      {/* ── Order Table ── */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left font-bold text-gray-700 px-6 py-4 tracking-wide">ID</th>
                <th className="text-left font-bold text-gray-700 px-6 py-4 tracking-wide">NAME</th>
                <th className="text-left font-bold text-gray-700 px-6 py-4 tracking-wide">ADDRESS</th>
                <th className="text-left font-bold text-gray-700 px-6 py-4 tracking-wide">DATE</th>
                <th className="text-left font-bold text-gray-700 px-6 py-4 tracking-wide">TYPE</th>
                <th className="text-left font-bold text-gray-700 px-6 py-4 tracking-wide">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {orderData.map((row, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors last:border-b-0">
                  <td className="px-6 py-4 text-gray-700 font-medium">{row.id}</td>
                  <td className="px-6 py-4 text-gray-700">{row.name}</td>
                  <td className="px-6 py-4 text-gray-500">{row.address}</td>
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{row.date}</td>
                  <td className="px-6 py-4 text-gray-700">{row.type}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${statusStyles[row.status]}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Product Stock Table ── */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left font-semibold text-gray-700 px-6 py-4">Image</th>
                <th className="text-left font-semibold text-gray-700 px-6 py-4">Product Name</th>
                <th className="text-left font-semibold text-gray-700 px-6 py-4">Category</th>
                <th className="text-left font-semibold text-gray-700 px-6 py-4">Price</th>
                <th className="text-left font-semibold text-gray-700 px-6 py-4">Piece</th>
                <th className="text-left font-semibold text-gray-700 px-6 py-4">Available Color</th>
                <th className="text-left font-semibold text-gray-700 px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors last:border-b-0">
                  {/* Image */}
                  <td className="px-6 py-3">
                    <div className={`w-14 h-14 rounded-xl ${product.bgColor} overflow-hidden flex items-center justify-center`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={e => { e.target.style.display = "none"; }}
                      />
                    </div>
                  </td>
                  {/* Name */}
                  <td className="px-6 py-3 text-gray-700 font-medium">{product.name}</td>
                  {/* Category */}
                  <td className="px-6 py-3 text-gray-500">{product.category}</td>
                  {/* Price */}
                  <td className="px-6 py-3 text-gray-700 font-medium">{product.price}</td>
                  {/* Piece */}
                  <td className="px-6 py-3 text-gray-700">{product.piece}</td>
                  {/* Colors */}
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-1.5">
                      {product.colors.map((color, i) => (
                        <span key={i}
                          className="w-5 h-5 rounded-full border border-white shadow-sm"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </td>
                  {/* Actions */}
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2">
                      <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                        <Pencil size={14} className="text-gray-500" />
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
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
      </div>

    </section>
  );
}