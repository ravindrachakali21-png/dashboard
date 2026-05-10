import { useState } from "react";
import {
  LayoutDashboard, Package, Heart, Inbox, List, Archive,
  Tag, Calendar, CheckSquare, Users, FileText, LayoutGrid,
  UserCircle, Table, Settings, LogOut, Bell, ChevronDown,
  Menu, Search, TrendingUp, TrendingDown, X,
  ChevronLeft, ChevronRight, Star
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell
} from "recharts";

// ─────────────────────────────────────────
// DATA
// ─────────────────────────────────────────
const salesData = [
  { x: "5k",  v: 20 }, { x: "10k", v: 35 }, { x: "15k", v: 30 },
  { x: "20k", v: 65 }, { x: "20k", v: 98 }, { x: "25k", v: 55 },
  { x: "25k", v: 52 }, { x: "30k", v: 60 }, { x: "30k", v: 45 },
  { x: "35k", v: 62 }, { x: "35k", v: 25 }, { x: "40k", v: 30 },
  { x: "40k", v: 70 }, { x: "45k", v: 43 }, { x: "45k", v: 42 },
  { x: "50k", v: 60 }, { x: "50k", v: 65 }, { x: "55k", v: 58 },
  { x: "55k", v: 55 }, { x: "60k", v: 57 },
];

const deals = [
  { img: "apple-watch", name: "Apple Watch",    location: "6096 Marjolaine Landing", date: "12.09.2019 - 12.53 PM", piece: 423, amount: "$34,295", status: "Delivered",  statusColor: "bg-teal-500"   },
  { img: null,          name: "HK Growth Fund", location: "Quincy, Port Evalyn",     date: "12.09.2019 - 12.53 PM", piece: 321, amount: "$34,295", status: "Delivered",  statusColor: "bg-teal-500"   },
  { img: null,          name: "MacBook Pro",    location: "Quincy, Port Evalyn",     date: "12.09.2019 - 12.53 PM", piece: 289, amount: "$34,295", status: "Cancelled",  statusColor: "bg-red-500"    },
  { img: null,          name: "Samsung S21",    location: "Quincy, Port Evalyn",     date: "12.09.2019 - 12.53 PM", piece: 150, amount: "$34,295", status: "Pending",    statusColor: "bg-orange-400" },
  { img: null,          name: "iPad Pro",       location: "Quincy, Port Evalyn",     date: "12.09.2019 - 12.53 PM", piece: 99,  amount: "$34,295", status: "Delivered",  statusColor: "bg-teal-500"   },
];

const revenueData = [
  { x: "5k",  sales: 20, profit: 20 }, { x: "10k", sales: 35, profit: 65 },
  { x: "15k", sales: 30, profit: 38 }, { x: "20k", sales: 45, profit: 42 },
  { x: "25k", sales: 55, profit: 48 }, { x: "30k", sales: 48, profit: 43 },
  { x: "35k", sales: 85, profit: 52 }, { x: "40k", sales: 50, profit: 50 },
  { x: "45k", sales: 60, profit: 48 }, { x: "50k", sales: 65, profit: 62 },
  { x: "55k", sales: 55, profit: 58 }, { x: "60k", sales: 60, profit: 80 },
];

const analyticsData = [
  { year: "2015", line1: 25, line2: 5  }, { year: "2016", line1: 65, line2: 55 },
  { year: "2017", line1: 55, line2: 60 }, { year: "2018", line1: 45, line2: 25 },
  { year: "2019", line1: 95, line2: 90 },
];

const customerData = [
  { name: "New",      value: 34249, color: "#3b82f6" },
  { name: "Repeated", value: 1420,  color: "#93c5fd" },
];

const featuredProducts = [
  { name: "Beats Headphone 2019", price: "$89.00"  },
  { name: "Apple Watch Series 7", price: "$399.00" },
  { name: "Samsung Galaxy S21",   price: "$799.00" },
];

const productsList = [
  { id: 1, name: "Apple Watch Series 4", price: "$120.00", rating: 4, reviews: 131 },
  { id: 2, name: "Apple Watch Series 4", price: "$120.00", rating: 4, reviews: 131 },
  { id: 3, name: "Apple Watch Series 4", price: "$120.00", rating: 4, reviews: 131 },
  { id: 4, name: "Apple Watch Series 4", price: "$120.00", rating: 4, reviews: 131 },
  { id: 5, name: "Apple Watch Series 4", price: "$120.00", rating: 4, reviews: 131 },
  { id: 6, name: "Apple Watch Series 4", price: "$120.00", rating: 4, reviews: 131 },
];

const bannerSlides = [
  { date: "September 12-22", title: "Enjoy free home delivery in this summer", subtitle: "Designer Dresses - Pick from trendy Designer Dress.", bg: "from-blue-500 to-blue-600" },
  { date: "October 1-15",    title: "Get 20% off on all electronics",          subtitle: "Top Brands - Explore the latest tech deals.",         bg: "from-indigo-500 to-indigo-600" },
  { date: "November 5-20",   title: "Winter sale — up to 50% off",             subtitle: "Stay warm with our premium collection.",               bg: "from-purple-500 to-purple-600" },
];

// ─────────────────────────────────────────
// SIDEBAR NAV CONFIG
// ─────────────────────────────────────────
const mainNav = [
  { icon: LayoutDashboard, label: "Dashboard",     page: "dashboard"  },
  { icon: Package,         label: "Products",      page: "products"   },
  { icon: Heart,           label: "Favorites",     page: "favorites"  },
  { icon: Inbox,           label: "Inbox",         page: "inbox"      },
  { icon: List,            label: "Order Lists",   page: "orders"     },
  { icon: Archive,         label: "Product Stock", page: "stock"      },
];
const pagesNav = [
  { icon: Tag,         label: "Pricing",      page: "pricing"  },
  { icon: Calendar,   label: "Calender",     page: "calender" },
  { icon: CheckSquare, label: "To-Do",       page: "todo"     },
  { icon: Users,       label: "Contact",     page: "contact"  },
  { icon: FileText,    label: "Invoice",     page: "invoice"  },
  { icon: LayoutGrid,  label: "UI Elements", page: "ui"       },
  { icon: UserCircle,  label: "Team",        page: "team"     },
  { icon: Table,       label: "Table",       page: "table"    },
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
function ProductsScreen() {
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

// ─────────────────────────────────────────
// DASHBOARD SCREEN (Screen 1 + 2)
// ─────────────────────────────────────────
function DashboardScreen() {
  const [productIndex, setProductIndex] = useState(0);

  return (
    <>
      {/* SCREEN 1 */}
      <section className="p-4 lg:p-6 space-y-5">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            { label: "Total User",    value: "40,689",  trend: "+8.5%", up: true,  sub: "Up from yesterday",  icon: <Users size={24} className="text-purple-500" />, bg: "bg-purple-100" },
            { label: "Total Order",   value: "10293",   trend: "+1.3%", up: true,  sub: "Up from past week",  icon: <Package size={24} className="text-yellow-500" />, bg: "bg-yellow-100" },
            { label: "Total Sales",   value: "$89,000", trend: "-4.3%", up: false, sub: "Down from yesterday",icon: <TrendingUp size={24} className="text-green-500" />, bg: "bg-green-100" },
            { label: "Total Pending", value: "2040",    trend: "+1.8%", up: true,  sub: "Up from yesterday",  icon: <FileText size={24} className="text-orange-400" />, bg: "bg-orange-100" },
          ].map((card, i) => (
            <div key={i} className="bg-white rounded-xl p-5 shadow-sm flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">{card.label}</p>
                <p className="text-3xl font-bold text-gray-800">{card.value}</p>
                <p className={`text-xs mt-2 flex items-center gap-1 font-medium ${card.up ? "text-green-500" : "text-red-500"}`}>
                  {card.up ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                  {card.trend}
                  <span className="text-gray-400 font-normal">{card.sub}</span>
                </p>
              </div>
              <div className={`${card.bg} rounded-xl p-3`}>{card.icon}</div>
            </div>
          ))}
        </div>

        {/* Sales Details */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">Sales Details</h2>
            <button className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50">
              October <ChevronDown size={13} />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={salesData} margin={{ top: 20, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="x" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={v => v + "%"} tick={{ fontSize: 11, fill: "#9ca3af" }}
                axisLine={false} tickLine={false} domain={[0, 100]} ticks={[20, 40, 60, 80, 100]} />
              <Tooltip />
              <Area type="monotone" dataKey="v" stroke="#3b82f6" strokeWidth={2}
                fill="url(#salesGrad)" dot={{ r: 3, fill: "#3b82f6", strokeWidth: 0 }} activeDot={{ r: 5 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Deals Table */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">Deals Details</h2>
            <button className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50">
              October <ChevronDown size={13} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {["Product Name","Location","Date - Time","Piece","Amount","Status"].map(h => (
                    <th key={h} className="text-left font-semibold text-gray-700 pb-3 pr-4 last:pr-0">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {deals.map((deal, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2.5">
                        {deal.img === "apple-watch" ? (
                          <img src="/assets/apple-watch.png" alt="product"
                            className="w-9 h-9 rounded-lg object-cover bg-gray-100"
                            onError={e => { e.target.style.display = "none"; }} />
                        ) : (
                          <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
                            <Package size={16} className="text-gray-400" />
                          </div>
                        )}
                        <span className="font-medium text-gray-800">{deal.name}</span>
                      </div>
                    </td>
                    <td className="py-3 pr-4 text-gray-500">{deal.location}</td>
                    <td className="py-3 pr-4 text-gray-500 whitespace-nowrap">{deal.date}</td>
                    <td className="py-3 pr-4 text-gray-700">{deal.piece}</td>
                    <td className="py-3 pr-4 text-gray-700 font-medium">{deal.amount}</td>
                    <td className="py-3">
                      <span className={`${deal.statusColor} text-white text-xs font-semibold px-3 py-1.5 rounded-full`}>
                        {deal.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SCREEN 2 */}
      <section className="p-4 lg:p-6 space-y-5 border-t-4 border-gray-200">
        {/* Revenue */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">Revenue</h2>
            <button className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50">
              October <ChevronDown size={13} />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="revSalesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#f97316" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0.3} />
                </linearGradient>
                <linearGradient id="revProfitGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#a78bfa" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#a78bfa" stopOpacity={0.3} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="x" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false}
                domain={[0, 100]} ticks={[20, 40, 60, 80, 100]} />
              <Tooltip />
              <Area type="monotone" dataKey="profit" stroke="#a78bfa" strokeWidth={2} fill="url(#revProfitGrad)" dot={false} />
              <Area type="monotone" dataKey="sales"  stroke="#f97316" strokeWidth={2} fill="url(#revSalesGrad)"  dot={false} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-6 mt-2">
            <span className="flex items-center gap-1.5 text-sm text-gray-600">
              <span className="w-3 h-3 rounded-full bg-orange-400 inline-block" /> Sales
            </span>
            <span className="flex items-center gap-1.5 text-sm text-gray-600">
              <span className="w-3 h-3 rounded-full bg-purple-400 inline-block" /> Profit
            </span>
          </div>
        </div>

        {/* Bottom 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Customers */}
          <div className="bg-white rounded-xl p-5 shadow-sm flex flex-col items-center">
            <h2 className="text-lg font-bold text-gray-800 self-start mb-4">Customers</h2>
            <div className="relative">
              <PieChart width={180} height={180}>
                <Pie data={customerData} cx={90} cy={90}
                  innerRadius={62} outerRadius={80}
                  startAngle={90} endAngle={-270} dataKey="value" strokeWidth={0}>
                  {customerData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
              </PieChart>
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-blue-500 rounded-full shadow" />
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-blue-300 rounded-full shadow" />
              <div className="absolute top-1/2 left-2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full shadow" />
              <div className="absolute top-1/2 right-2 -translate-y-1/2 w-3 h-3 bg-blue-400 rounded-full shadow" />
            </div>
            <div className="flex items-center gap-8 mt-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-800">34,249</p>
                <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" /> New Customers
                </p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-800">1420</p>
                <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-blue-300 inline-block" /> Repeated
                </p>
              </div>
            </div>
          </div>

          {/* Featured Product */}
          <div className="bg-white rounded-xl p-5 shadow-sm flex flex-col">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Featured Product</h2>
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="w-36 h-36 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                <Package size={48} className="text-gray-300" />
              </div>
              <p className="font-semibold text-gray-800 text-center">{featuredProducts[productIndex].name}</p>
              <p className="text-blue-500 font-semibold mt-1">{featuredProducts[productIndex].price}</p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <button onClick={() => setProductIndex(i => (i - 1 + featuredProducts.length) % featuredProducts.length)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                <ChevronLeft size={16} className="text-gray-500" />
              </button>
              <div className="flex gap-1.5">
                {featuredProducts.map((_, i) => (
                  <span key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === productIndex ? "bg-blue-500" : "bg-gray-300"}`} />
                ))}
              </div>
              <button onClick={() => setProductIndex(i => (i + 1) % featuredProducts.length)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                <ChevronRight size={16} className="text-gray-500" />
              </button>
            </div>
          </div>

          {/* Sales Analytics */}
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Sales Analytics</h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={analyticsData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="year" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false}
                  domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="line1" stroke="#3b82f6" strokeWidth={2.5}
                  dot={{ r: 4, fill: "#3b82f6", strokeWidth: 0 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="line2" stroke="#10b981" strokeWidth={2.5}
                  dot={{ r: 4, fill: "#10b981", strokeWidth: 0 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </>
  );
}

// ─────────────────────────────────────────
// COMING SOON
// ─────────────────────────────────────────
function ComingSoon({ title }) {
  return (
    <section className="p-4 lg:p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">{title}</h1>
      <div className="bg-white rounded-xl p-16 shadow-sm flex flex-col items-center justify-center text-center">
        <LayoutGrid size={48} className="text-gray-200 mb-4" />
        <p className="text-xl font-semibold text-gray-400">Coming Soon</p>
        <p className="text-sm text-gray-300 mt-1">This page is under construction</p>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
// ROOT
// ─────────────────────────────────────────
export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage]   = useState("dashboard");

  const handleNav = (page) => {
    setActivePage(page);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPageLabel = (page) =>
    [...mainNav, ...pagesNav].find(n => n.page === page)?.label || page;

  const renderPage = () => {
    switch (activePage) {
      case "dashboard": return <DashboardScreen />;
      case "products":  return <ProductsScreen />;
      default:          return <ComingSoon title={getPageLabel(activePage)} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)} />
      )}

      {/* ══════ SIDEBAR ══════ */}
      <aside className={`
        fixed top-0 left-0 h-full w-52 bg-white z-30 flex flex-col shadow-sm
        transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        <div className="flex items-center justify-between px-5 py-5 border-b border-gray-100">
          <span className="text-xl font-bold">
            <span className="text-blue-600">Dash</span>Stack
          </span>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5">
          {mainNav.map(({ icon: Icon, label, page }) => (
            <button key={page} onClick={() => handleNav(page)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${activePage === page ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}>
              <Icon size={17} /> {label}
            </button>
          ))}
          <div className="pt-4 pb-1 px-3">
            <span className="text-[10px] font-semibold text-gray-400 tracking-widest uppercase">Pages</span>
          </div>
          {pagesNav.map(({ icon: Icon, label, page }) => (
            <button key={page} onClick={() => handleNav(page)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${activePage === page ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}>
              <Icon size={17} /> {label}
            </button>
          ))}
        </nav>

        <div className="border-t border-gray-100 px-3 py-3 space-y-0.5">
          <button onClick={() => handleNav("settings")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
              ${activePage === "settings" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}>
            <Settings size={17} /> Settings
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100">
            <LogOut size={17} /> Logout
          </button>
        </div>
      </aside>

      {/* ══════ MAIN ══════ */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Sticky Navbar */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-3 flex items-center gap-3 shrink-0 sticky top-0 z-10">
          <button className="text-gray-500 hover:text-gray-700" onClick={() => setSidebarOpen(true)}>
            <Menu size={20} />
          </button>
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 gap-2 flex-1 max-w-sm">
            <Search size={15} className="text-gray-400" />
            <input type="text" placeholder="Search"
              className="bg-transparent text-sm text-gray-600 outline-none w-full placeholder-gray-400" />
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <div className="relative cursor-pointer">
              <Bell size={20} className="text-gray-500" />
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">6</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 cursor-pointer">
              <img src="/assets/flag-uk.png" alt="UK" className="w-6 h-4 object-cover rounded-sm"
                onError={e => { e.target.style.display = "none"; }} />
              <span className="text-sm text-gray-600">English</span>
              <ChevronDown size={13} className="text-gray-400" />
            </div>
            <div className="w-px h-6 bg-gray-200 hidden sm:block" />
            <div className="flex items-center gap-2 cursor-pointer">
              <img src="/assets/avatar.png" alt="Moni Roy"
                className="w-9 h-9 rounded-full object-cover border-2 border-purple-200"
                onError={e => { e.target.src = "https://ui-avatars.com/api/?name=Moni+Roy&background=c084fc&color=fff&size=40"; }} />
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-gray-800 leading-tight">Moni Roy</p>
                <p className="text-xs text-gray-400">Admin</p>
              </div>
              <ChevronDown size={13} className="text-gray-400 hidden sm:block" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}