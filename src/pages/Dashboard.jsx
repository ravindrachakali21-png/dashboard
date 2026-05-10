import { useState } from "react";
import {
  Package, Heart, Users, FileText, TrendingUp, TrendingDown,
  ChevronDown, ChevronLeft, ChevronRight,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell,
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

// ─────────────────────────────────────────
// DASHBOARD SCREEN (Screen 1 + 2 — scrollable)
// ─────────────────────────────────────────
export default function DashboardScreen() {
  const [productIndex, setProductIndex] = useState(0);

  return (
    <>
      {/* ── SCREEN 1 ── */}
      <section className="p-4 lg:p-6 space-y-5">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            { label: "Total User",    value: "40,689",  trend: "+8.5%", up: true,  sub: "Up from yesterday",   icon: <Users size={24} className="text-purple-500" />,       bg: "bg-purple-100" },
            { label: "Total Order",   value: "10293",   trend: "+1.3%", up: true,  sub: "Up from past week",   icon: <Package size={24} className="text-yellow-500" />,      bg: "bg-yellow-100" },
            { label: "Total Sales",   value: "$89,000", trend: "-4.3%", up: false, sub: "Down from yesterday", icon: <TrendingUp size={24} className="text-green-500" />,    bg: "bg-green-100"  },
            { label: "Total Pending", value: "2040",    trend: "+1.8%", up: true,  sub: "Up from yesterday",   icon: <FileText size={24} className="text-orange-400" />,     bg: "bg-orange-100" },
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
                  {["Product Name", "Location", "Date - Time", "Piece", "Amount", "Status"].map(h => (
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

      {/* ── SCREEN 2 (continues scrolling) ── */}
      <section className="p-4 lg:p-6 space-y-5">
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