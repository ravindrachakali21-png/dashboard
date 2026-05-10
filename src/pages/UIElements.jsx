import { useState } from "react";
import { Filter, ChevronDown } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

// ── Bar Chart Data (4 groups, each with 2 bars) ───────────────
const barData = [
  // Group 1 — Blue shades
  { name: "G1",  a: 85, b: 40, c: 0,  d: 0,  e: 0,  f: 0,  g: 0,  h: 0  },
  { name: "G2",  a: 35, b: 55, c: 0,  d: 0,  e: 0,  f: 0,  g: 0,  h: 0  },
  { name: "G3",  a: 70, b: 30, c: 0,  d: 0,  e: 0,  f: 0,  g: 0,  h: 0  },
  { name: "G4",  a: 45, b: 60, c: 0,  d: 0,  e: 0,  f: 0,  g: 0,  h: 0  },
  { name: "G5",  a: 55, b: 25, c: 0,  d: 0,  e: 0,  f: 0,  g: 0,  h: 0  },
  // Group 2 — Teal/Cyan
  { name: "G6",  a: 0,  b: 0,  c: 60, d: 20, e: 0,  f: 0,  g: 0,  h: 0  },
  { name: "G7",  a: 0,  b: 0,  c: 75, d: 25, e: 0,  f: 0,  g: 0,  h: 0  },
  { name: "G8",  a: 0,  b: 0,  c: 50, d: 30, e: 0,  f: 0,  g: 0,  h: 0  },
  { name: "G9",  a: 0,  b: 0,  c: 65, d: 15, e: 0,  f: 0,  g: 0,  h: 0  },
  { name: "G10", a: 0,  b: 0,  c: 80, d: 35, e: 0,  f: 0,  g: 0,  h: 0  },
  // Group 3 — Orange/Blue
  { name: "G11", a: 0,  b: 0,  c: 0,  d: 0,  e: 70, f: 55, g: 0,  h: 0  },
  { name: "G12", a: 0,  b: 0,  c: 0,  d: 0,  e: 55, f: 40, g: 0,  h: 0  },
  { name: "G13", a: 0,  b: 0,  c: 0,  d: 0,  e: 95, f: 65, g: 0,  h: 0  },
  { name: "G14", a: 0,  b: 0,  c: 0,  d: 0,  e: 60, f: 80, g: 0,  h: 0  },
  { name: "G15", a: 0,  b: 0,  c: 0,  d: 0,  e: 75, f: 50, g: 0,  h: 0  },
  { name: "G16", a: 0,  b: 0,  c: 0,  d: 0,  e: 50, f: 70, g: 0,  h: 0  },
  // Group 4 — Pink shades
  { name: "G17", a: 0,  b: 0,  c: 0,  d: 0,  e: 0,  f: 0,  g: 55, h: 35 },
  { name: "G18", a: 0,  b: 0,  c: 0,  d: 0,  e: 0,  f: 0,  g: 75, h: 50 },
  { name: "G19", a: 0,  b: 0,  c: 0,  d: 0,  e: 0,  f: 0,  g: 60, h: 40 },
  { name: "G20", a: 0,  b: 0,  c: 0,  d: 0,  e: 0,  f: 0,  g: 80, h: 55 },
  { name: "G21", a: 0,  b: 0,  c: 0,  d: 0,  e: 0,  f: 0,  g: 65, h: 45 },
  { name: "G22", a: 0,  b: 0,  c: 0,  d: 0,  e: 0,  f: 0,  g: 50, h: 30 },
];

// ── Pie Chart Data ────────────────────────────────────────────
const pieCharts = [
  {
    data: [
      { value: 30, color: "#6366f1" },
      { value: 70, color: "#e0e7ff" },
    ],
  },
  {
    data: [
      { value: 40, color: "#a855f7" },
      { value: 60, color: "#ede9fe" },
    ],
  },
  {
    data: [
      { value: 55, color: "#f97316" },
      { value: 45, color: "#ffedd5" },
    ],
  },
  {
    data: [
      { value: 35, color: "#3b82f6" },
      { value: 65, color: "#dbeafe" },
    ],
  },
];

// ── Donut Chart Data ──────────────────────────────────────────
const donutCharts = [
  {
    data: [
      { value: 70, color: "#14b8a6" },
      { value: 30, color: "#f97316" },
    ],
  },
  {
    data: [
      { value: 60, color: "#3b82f6" },
      { value: 40, color: "#e0e7ff" },
    ],
  },
  {
    data: [
      { value: 50, color: "#fbbf24" },
      { value: 30, color: "#14b8a6" },
      { value: 20, color: "#e5e7eb" },
    ],
  },
  {
    data: [
      { value: 45, color: "#f97316" },
      { value: 35, color: "#14b8a6" },
      { value: 20, color: "#fbbf24" },
    ],
  },
];

const filterOptions = ["Charts", "Buttons", "Forms", "Tables", "Cards"];

export default function UIElements() {
  const [filter,      setFilter]      = useState("Charts");
  const [showFilter,  setShowFilter]  = useState(false);

  return (
    <section className="p-4 lg:p-6 space-y-6">

      {/* ── Header ── */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-bold text-gray-800">UI Elements</h1>

        {/* Filter dropdown */}
        <div className="relative">
          <div className="flex items-center border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden">
            <div className="px-3 py-2.5 border-r border-gray-200">
              <Filter size={16} className="text-gray-500" />
            </div>
            <span className="px-3 text-sm text-gray-500 font-medium">Filter By</span>
            <button
              onClick={() => setShowFilter(v => !v)}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 border-l border-gray-200 hover:bg-gray-50 transition-colors"
            >
              {filter}
              <ChevronDown size={14} className="text-gray-400" />
            </button>
          </div>

          {/* Dropdown */}
          {showFilter && (
            <div className="absolute right-0 top-12 z-20 bg-white rounded-xl shadow-xl border border-gray-100 py-1 w-40">
              {filterOptions.map(opt => (
                <button
                  key={opt}
                  onClick={() => { setFilter(opt); setShowFilter(false); }}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors
                    ${filter === opt
                      ? "bg-blue-50 text-blue-600 font-semibold"
                      : "text-gray-600 hover:bg-gray-50"}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Bar Chart ── */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-5">Bar Chart</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={barData} barSize={8} barGap={2} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
            <XAxis dataKey="name" hide />
            <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
            <Tooltip />
            {/* Group 1 — Blue */}
            <Bar dataKey="a" fill="#3b82f6" radius={[3,3,0,0]} />
            <Bar dataKey="b" fill="#93c5fd" radius={[3,3,0,0]} />
            {/* Group 2 — Teal */}
            <Bar dataKey="c" fill="#2dd4bf" radius={[3,3,0,0]} />
            <Bar dataKey="d" fill="#99f6e4" radius={[3,3,0,0]} />
            {/* Group 3 — Orange + Blue */}
            <Bar dataKey="e" fill="#f97316" radius={[3,3,0,0]} />
            <Bar dataKey="f" fill="#3b82f6" radius={[3,3,0,0]} />
            {/* Group 4 — Pink */}
            <Bar dataKey="g" fill="#f472b6" radius={[3,3,0,0]} />
            <Bar dataKey="h" fill="#fbcfe8" radius={[3,3,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ── Pie Chart ── */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-5">Pie Chart</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {pieCharts.map((chart, idx) => (
            <div key={idx} className="flex items-center justify-center">
              <PieChart width={160} height={160}>
                <Pie
                  data={chart.data}
                  cx={80}
                  cy={80}
                  innerRadius={0}
                  outerRadius={70}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {chart.data.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => `${v}%`} />
              </PieChart>
            </div>
          ))}
        </div>
      </div>

      {/* ── Donut Chart ── */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-5">Donut Chart</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {donutCharts.map((chart, idx) => (
            <div key={idx} className="flex items-center justify-center">
              <PieChart width={160} height={160}>
                <Pie
                  data={chart.data}
                  cx={80}
                  cy={80}
                  innerRadius={48}
                  outerRadius={70}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {chart.data.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => `${v}%`} />
              </PieChart>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}