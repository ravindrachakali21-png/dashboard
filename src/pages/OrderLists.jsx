import { useState, useRef, useEffect } from "react";
import {
  Filter, ChevronDown, ChevronLeft, ChevronRight, RefreshCw
} from "lucide-react";

// ── Data ──────────────────────────────────────────────────────
const allOrders = [
  { id: "00001", name: "Christine Brooks",  address: "089 Kutch Green Apt. 448",    date: "04 Sep 2019", type: "Electric", status: "Completed"  },
  { id: "00002", name: "Rosie Pearson",     address: "979 Immanuel Ferry Suite 526", date: "28 May 2019", type: "Book",     status: "Processing" },
  { id: "00003", name: "Darrell Caldwell",  address: "8587 Frida Ports",             date: "23 Nov 2019", type: "Medicine", status: "Rejected"   },
  { id: "00004", name: "Gilbert Johnston",  address: "768 Destiny Lake Suite 600",   date: "05 Feb 2019", type: "Mobile",   status: "Completed"  },
  { id: "00005", name: "Alan Cain",         address: "042 Mylene Throughway",        date: "29 Jul 2019", type: "Watch",    status: "Processing" },
  { id: "00006", name: "Alfred Murray",     address: "543 Weimann Mountain",         date: "15 Aug 2019", type: "Medicine", status: "Completed"  },
  { id: "00007", name: "Maggie Sullivan",   address: "New Scottieberg",              date: "21 Dec 2019", type: "Watch",    status: "Processing" },
  { id: "00008", name: "Rosie Todd",        address: "New Jon",                      date: "30 Apr 2019", type: "Medicine", status: "On Hold"    },
  { id: "00009", name: "Dollie Hines",      address: "124 Lyla Forge Suite 975",     date: "09 Jan 2019", type: "Book",     status: "In Transit" },
];

// Orders for "14 Feb 2019" date filter
const feb14Orders = [
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

const ORDER_TYPES = [
  "Health & Medicine", "Book & Stationary", "Services & Industry",
  "Fashion & Beauty",  "Home & Living",     "Electronics",
  "Mobile & Phone",    "Accessories",
];

const ORDER_STATUSES = ["Completed", "Processing", "Rejected", "On Hold", "In Transit"];

// ── Calendar ──────────────────────────────────────────────────
const DAYS   = ["S","M","T","W","T","F","S"];
const MONTHS = ["January","February","March","April","May","June",
                "July","August","September","October","November","December"];

function getDaysInMonth(y, m) { return new Date(y, m + 1, 0).getDate(); }
function getFirstDay(y, m)    { return new Date(y, m, 1).getDay(); }

function CalendarPopup({ onApply, onClose }) {
  const [year,     setYear]     = useState(2019);
  const [month,    setMonth]    = useState(1);
  const [selected, setSelected] = useState(new Set([14]));

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay    = getFirstDay(year, month);
  const prevDays    = getDaysInMonth(year, month - 1);

  const prevMonth = () => month === 0  ? (setMonth(11), setYear(y => y-1)) : setMonth(m => m-1);
  const nextMonth = () => month === 11 ? (setMonth(0),  setYear(y => y+1)) : setMonth(m => m+1);

  const toggleDay = d => setSelected(prev => {
    const next = new Set(prev);
    next.has(d) ? next.delete(d) : next.add(d);
    return next;
  });

  const cells = [];
  for (let i = firstDay - 1; i >= 0; i--) cells.push({ day: prevDays - i, cur: false });
  for (let d = 1; d <= daysInMonth; d++)   cells.push({ day: d,            cur: true  });
  let nx = 1;
  while (cells.length % 7 !== 0) cells.push({ day: nx++, cur: false });

  return (
    <div className="absolute top-12 left-0 z-50 bg-white rounded-2xl shadow-2xl p-5 w-72 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <span className="font-semibold text-gray-800 text-sm">{MONTHS[month]} {year}</span>
        <div className="flex gap-1">
          <button onClick={prevMonth} className="w-6 h-6 rounded-full hover:bg-gray-100 flex items-center justify-center">
            <ChevronLeft size={13} className="text-gray-500" />
          </button>
          <button onClick={nextMonth} className="w-6 h-6 rounded-full hover:bg-gray-100 flex items-center justify-center">
            <ChevronRight size={13} className="text-gray-500" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map((d, i) => (
          <span key={i} className="text-center text-xs font-semibold text-gray-500 py-1">{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((cell, i) => (
          <button key={i}
            onClick={() => cell.cur && toggleDay(cell.day)}
            className={`w-8 h-8 mx-auto rounded-full text-xs font-medium transition-colors
              ${!cell.cur ? "text-gray-300 cursor-default" :
                selected.has(cell.day)
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"}`}>
            {cell.day}
          </button>
        ))}
      </div>
      <p className="text-xs text-gray-400 mt-3">*You can choose multiple date</p>
      <button
        onClick={() => { onApply(selected, month, year); onClose(); }}
        className="w-full mt-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg text-sm transition-colors">
        Apply Now
      </button>
    </div>
  );
}

// ── Order Type Popup ──────────────────────────────────────────
function OrderTypePopup({ selected, onApply, onClose }) {
  const [local, setLocal] = useState(new Set(selected));

  const toggle = t => setLocal(prev => {
    const next = new Set(prev);
    next.has(t) ? next.delete(t) : next.add(t);
    return next;
  });

  return (
    <div className="absolute top-12 left-0 z-50 bg-white rounded-2xl shadow-2xl p-6 w-80 border border-gray-100">
      <h3 className="font-semibold text-gray-800 mb-4">Select Order Type</h3>
      <div className="flex flex-wrap gap-2 mb-4">
        {ORDER_TYPES.map(t => (
          <button key={t}
            onClick={() => toggle(t)}
            className={`px-3 py-1.5 rounded-full border text-sm font-medium transition-colors
              ${local.has(t)
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"}`}>
            {t}
          </button>
        ))}
      </div>
      <p className="text-xs text-gray-400 mb-4">*You can choose multiple Order type</p>
      <button
        onClick={() => { onApply(local); onClose(); }}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg text-sm transition-colors">
        Apply Now
      </button>
    </div>
  );
}

// ── Order Status Popup ────────────────────────────────────────
function OrderStatusPopup({ selected, onApply, onClose }) {
  const [local, setLocal] = useState(new Set(selected));

  const toggle = s => setLocal(prev => {
    const next = new Set(prev);
    next.has(s) ? next.delete(s) : next.add(s);
    return next;
  });

  return (
    <div className="absolute top-12 right-0 z-50 bg-white rounded-2xl shadow-2xl p-6 w-80 border border-gray-100">
      <h3 className="font-semibold text-gray-800 mb-4">Select Order Status</h3>
      <div className="flex flex-wrap gap-2 mb-4">
        {ORDER_STATUSES.map(s => (
          <button key={s}
            onClick={() => toggle(s)}
            className={`px-4 py-1.5 rounded-full border text-sm font-medium transition-colors
              ${local.has(s)
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"}`}>
            {s}
          </button>
        ))}
      </div>
      <p className="text-xs text-gray-400 mb-4">*You can choose multiple Order status</p>
      <button
        onClick={() => { onApply(local); onClose(); }}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg text-sm transition-colors">
        Apply Now
      </button>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────
export default function OrderLists() {
  const [showCalendar,   setShowCalendar]   = useState(false);
  const [showTypePopup,  setShowTypePopup]  = useState(false);
  const [showStatusPopup,setShowStatusPopup]= useState(false);

  const [selectedDate,   setSelectedDate]   = useState(null);    // "14 Feb 2019" or null
  const [selectedTypes,  setSelectedTypes]  = useState(new Set());
  const [selectedStatuses, setSelectedStatuses] = useState(new Set());

  const [dateFiltered,   setDateFiltered]   = useState(false);
  const [page,           setPage]           = useState(1);
  const perPage = 9;

  // Close popups on outside click
  const filterRef = useRef();
  useEffect(() => {
    const handler = e => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setShowCalendar(false);
        setShowTypePopup(false);
        setShowStatusPopup(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleDateApply = (days, month, year) => {
    const day = [...days][0] || 14;
    const dateStr = `${String(day).padStart(2,"0")} ${MONTHS[month].slice(0,3)} ${year}`;
    setSelectedDate(dateStr);
    setDateFiltered(true);
    setPage(1);
  };

  const handleTypeApply  = (types)    => { setSelectedTypes(types);    setPage(1); };
  const handleStatusApply= (statuses) => { setSelectedStatuses(statuses); setPage(1); };

  const resetFilters = () => {
    setSelectedDate(null);
    setSelectedTypes(new Set());
    setSelectedStatuses(new Set());
    setDateFiltered(false);
    setPage(1);
    setShowCalendar(false);
    setShowTypePopup(false);
    setShowStatusPopup(false);
  };

  // Determine which data to use
  const baseData = dateFiltered ? feb14Orders : allOrders;

  const filtered = baseData.filter(o => {
    if (selectedStatuses.size > 0 && !selectedStatuses.has(o.status)) return false;
    return true;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated  = filtered.slice((page - 1) * perPage, page * perPage);

  const dateLabel   = selectedDate || "Date";
  const typeLabel   = selectedTypes.size   > 0 ? `Type (${selectedTypes.size})`   : "Order Type";
  const statusLabel = selectedStatuses.size > 0 ? `Status (${selectedStatuses.size})` : "Order Status";

  return (
    <section className="p-4 lg:p-6 space-y-5">
      <h1 className="text-2xl font-bold text-gray-800">Order Lists</h1>

      {/* ── Filter Bar ── */}
      <div ref={filterRef} className="relative bg-white rounded-xl shadow-sm px-4 py-3 flex items-center gap-3 flex-wrap">
        <Filter size={18} className="text-gray-400 shrink-0" />
        <span className="text-sm font-medium text-gray-600 shrink-0">Filter By</span>

        {/* Date button */}
        <div className="relative">
          <button
            onClick={() => { setShowCalendar(v => !v); setShowTypePopup(false); setShowStatusPopup(false); }}
            className={`flex items-center gap-1.5 border rounded-lg px-3 py-1.5 text-sm font-medium transition-colors
              ${selectedDate ? "border-blue-300 text-blue-600 bg-blue-50" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
            {dateLabel} <ChevronDown size={13} className="text-gray-400" />
          </button>
          {showCalendar && (
            <CalendarPopup
              onApply={handleDateApply}
              onClose={() => setShowCalendar(false)}
            />
          )}
        </div>

        {/* Order Type button */}
        <div className="relative">
          <button
            onClick={() => { setShowTypePopup(v => !v); setShowCalendar(false); setShowStatusPopup(false); }}
            className={`flex items-center gap-1.5 border rounded-lg px-3 py-1.5 text-sm font-medium transition-colors
              ${selectedTypes.size > 0 ? "border-blue-300 text-blue-600 bg-blue-50" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
            {typeLabel} <ChevronDown size={13} className="text-gray-400" />
          </button>
          {showTypePopup && (
            <OrderTypePopup
              selected={selectedTypes}
              onApply={handleTypeApply}
              onClose={() => setShowTypePopup(false)}
            />
          )}
        </div>

        {/* Order Status button */}
        <div className="relative">
          <button
            onClick={() => { setShowStatusPopup(v => !v); setShowCalendar(false); setShowTypePopup(false); }}
            className={`flex items-center gap-1.5 border rounded-lg px-3 py-1.5 text-sm font-medium transition-colors
              ${selectedStatuses.size > 0 ? "border-blue-300 text-blue-600 bg-blue-50" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
            {statusLabel} <ChevronDown size={13} className="text-gray-400" />
          </button>
          {showStatusPopup && (
            <OrderStatusPopup
              selected={selectedStatuses}
              onApply={handleStatusApply}
              onClose={() => setShowStatusPopup(false)}
            />
          )}
        </div>

        {/* Reset Filter */}
        <button
          onClick={resetFilters}
          className="flex items-center gap-1.5 text-sm text-orange-500 hover:text-orange-600 font-medium ml-auto transition-colors">
          <RefreshCw size={14} /> Reset Filter
        </button>
      </div>

      {/* ── Table ── */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left font-bold text-gray-700 px-5 py-3 tracking-wide">ID</th>
                <th className="text-left font-bold text-gray-700 px-5 py-3 tracking-wide">NAME</th>
                <th className="text-left font-bold text-gray-700 px-5 py-3 tracking-wide">ADDRESS</th>
                <th className="text-left font-bold text-gray-700 px-5 py-3 tracking-wide">DATE</th>
                <th className="text-left font-bold text-gray-700 px-5 py-3 tracking-wide">TYPE</th>
                <th className="text-left font-bold text-gray-700 px-5 py-3 tracking-wide">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-gray-400 py-12 text-sm">
                    No orders match the selected filters.
                  </td>
                </tr>
              ) : (
                paginated.map((order, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4 text-gray-700 font-medium">{order.id}</td>
                    <td className="px-5 py-4 text-gray-700">{order.name}</td>
                    <td className="px-5 py-4 text-gray-500">{order.address}</td>
                    <td className="px-5 py-4 text-gray-500 whitespace-nowrap">{order.date}</td>
                    <td className="px-5 py-4 text-gray-700">{order.type}</td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${statusStyles[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {dateFiltered ? (
          // Date-filtered view shows Prev Date / Next Date
          <div className="px-5 py-3 flex items-center justify-between border-t border-gray-100">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-40 transition-colors">
              <ChevronLeft size={14} /> Prev. Date
            </button>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-40 transition-colors">
              Next Date <ChevronRight size={14} />
            </button>
          </div>
        ) : (
          // Default shows showing count + arrow pagination
          <div className="px-5 py-3 flex items-center justify-between border-t border-gray-100">
            <span className="text-sm text-gray-500">
              Showing {filtered.length === 0 ? 0 : (page-1)*perPage+1}–{Math.min(page*perPage, filtered.length)} of {filtered.length}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage(p => Math.max(1, p-1))}
                disabled={page === 1}
                className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-500 disabled:opacity-40">
                <ChevronLeft size={14} />
              </button>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p+1))}
                disabled={page >= totalPages}
                className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-500 disabled:opacity-40">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}