import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

// ── Avatar component with fallback initials ───────────────────
function Avatar({ src, name, size = "w-7 h-7" }) {
  const [failed, setFailed] = useState(false);
  const initials = name ? name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() : "?";
  const colors = ["bg-blue-400", "bg-purple-400", "bg-green-400", "bg-orange-400", "bg-pink-400"];
  const colorIdx = name ? name.charCodeAt(0) % colors.length : 0;

  if (failed || !src) {
    return (
      <div className={`${size} rounded-full ${colors[colorIdx]} border-2 border-white flex items-center justify-center shrink-0`}>
        <span className="text-white text-[9px] font-bold">{initials}</span>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={name}
      onError={() => setFailed(true)}
      className={`${size} rounded-full object-cover border-2 border-white shrink-0`}
    />
  );
}

// ── AvatarGroup ───────────────────────────────────────────────
function AvatarGroup({ attendees, extra }) {
  return (
    <div className="flex items-center">
      {attendees.map((a, i) => (
        <div key={i} className={i > 0 ? "-ml-2" : ""}>
          <Avatar src={a.src} name={a.name} size="w-7 h-7" />
        </div>
      ))}
      <div className="w-7 h-7 rounded-full bg-blue-100 border-2 border-white -ml-2 flex items-center justify-center shrink-0">
        <span className="text-[9px] font-bold text-blue-600">{extra}+</span>
      </div>
    </div>
  );
}

// ── Event data ────────────────────────────────────────────────
const ATTENDEES_1 = [
  { src: "/assets/av3.png", name: "Alex Smith"   },
  { src: "/assets/av4.png", name: "Bob Jones"    },
  { src: "/assets/av5.png", name: "Carol White"  },
];
const ATTENDEES_2 = [
  { src: "/assets/av5.png", name: "Dan Brown"    },
  { src: "/assets/av6.png", name: "Eve Davis"    },
  { src: "/assets/av7.png", name: "Frank Miller" },
];
const ATTENDEES_3 = [
  { src: "/assets/av3.png", name: "Grace Lee"    },
  { src: "/assets/av4.png", name: "Hank Wilson"  },
  { src: "/assets/av8.png", name: "Iris Taylor"  },
];
const ATTENDEES_4 = [
  { src: "/assets/av5.png", name: "Jack Moore"   },
  { src: "/assets/av6.png", name: "Kate Jackson" },
  { src: "/assets/av3.png", name: "Liam Harris"  },
];

const events = [
  {
    id: 1,
    title: "Design Conference",
    agency: "Zillul Design Agency",
    date: "Today 07:19 AM",
    fullDate: "Today 07:19 AM",
    location: "56 Davion Mission Suite 157 Meaghanberg",
    shortLocation: "56 Davion Mission Suite 157 Me...",
    gridRow: 1,   // 0-indexed week row
    gridCol: 1,   // 0-indexed day col (TUE = 1)
    span: 1,
    color: "bg-purple-200 text-purple-700",
    barColor: "bg-purple-200 text-purple-700 border-l-2 border-purple-400",
    attendees: ATTENDEES_1,
    extra: 15,
    image: "/assets/design-conf.png",   // the 3-people beige photo
    eventImage: "/assets/design-conf.png",
    sideImage: null,
  },
  {
    id: 2,
    title: "Weekend Festival",
    agency: "Music & Arts Events",
    date: "16 October 2019 at 5:00 PM",
    fullDate: "16 October 2019 at 5:00 PM",
    location: "853 Moore Flats Suite 158 Sweden",
    shortLocation: "853 Moore Flats Suite 158 Swed...",
    gridRow: 3,
    gridCol: 0,
    span: 5,
    color: "bg-pink-200 text-pink-700",
    barColor: "bg-pink-200 text-pink-700 border-l-2 border-pink-400",
    attendees: ATTENDEES_2,
    extra: 20,
    image: "/assets/festival.png",
    sideImage: "/assets/festival.png",
  },
  {
    id: 3,
    title: "Glastonbury Festival",
    agency: "Glastonbury Org",
    date: "20-22 October 2019 at 8:00 PM",
    fullDate: "20-22 October 2019 at 8:00 PM",
    location: "646 Walter Road Apt. 571 Turks and Caicos Islands",
    shortLocation: "646 Walter Road Apt. 571 Turks ...",
    gridRow: 3,
    gridCol: 5,
    span: 2,
    color: "bg-orange-100 text-orange-600",
    barColor: "bg-orange-100 text-orange-500 border-l-2 border-orange-300",
    attendees: ATTENDEES_3,
    extra: 14,
    image: "/assets/glastonbury.png",
    sideImage: "/assets/glastonbury.png",
    // second bar
  },
  {
    id: 31,
    title: "Glastonbury Festival",
    agency: "Glastonbury Org",
    date: "20-22 October 2019 at 8:00 PM",
    fullDate: "20-22 October 2019 at 8:00 PM",
    location: "646 Walter Road Apt. 571 Turks and Caicos Islands",
    shortLocation: "646 Walter Road Apt. 571 Turks ...",
    gridRow: 4,
    gridCol: 2,
    span: 3,
    color: "bg-purple-100 text-purple-600",
    barColor: "bg-purple-100 text-purple-600 border-l-2 border-purple-300",
    attendees: ATTENDEES_3,
    extra: 14,
    image: "/assets/glastonbury.png",
    sideImage: null,
  },
  {
    id: 4,
    title: "Ultra Europe 2019",
    agency: "Ultra Music Festival",
    date: "25 October 2019 at 10:00 PM",
    fullDate: "25 October 2019 at 10:00 PM",
    location: "506 Satterfield Tunnel Apt. 963 San Marino",
    shortLocation: "506 Satterfield Tunnel Apt. 963 ...",
    gridRow: 4,
    gridCol: 5,
    span: 1,
    color: "bg-blue-100 text-blue-600",
    barColor: "bg-blue-100 text-blue-600 border-l-2 border-blue-300",
    attendees: ATTENDEES_4,
    extra: 42,
    image: "/assets/ultra.png",
    sideImage: "/assets/ultra.png",
  },
];

// Sidebar events (4 unique ones)
const sideEvents = events.filter(e => [1, 2, 3, 4].includes(e.id));

// ── Calendar grid (Oct 2019, Mon-first) ──────────────────────
const COLS  = ["MON","TUE","WED","THU","FRI","SAT","SUN"];
const grid  = [
  [25,26,27,28,29,30, 1],
  [ 2, 3, 4, 5, 6, 7, 8],
  [ 9,10,11,12,13,14,15],
  [16,17,18,19,20,21,22],
  [23,24,25,26,27,28,29],
  [30,31, 1, 2, 3, 4, 5],
];

// ── Event Popup ───────────────────────────────────────────────
function EventPopup({ event, onClose }) {
  const ref = useRef();
  useEffect(() => {
    const handler = e => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute z-50 bg-white rounded-2xl shadow-2xl border border-gray-100 w-64 overflow-hidden"
      style={{ top: "110%", left: "0" }}
    >
      {/* Event image */}
      <div className="w-full h-36 bg-gray-100 overflow-hidden relative">
        <img
          src={event.eventImage || event.image}
          alt={event.title}
          className="w-full h-full object-cover"
          onError={e => { e.target.style.display = "none"; }}
        />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 w-6 h-6 bg-white bg-opacity-80 rounded-full flex items-center justify-center hover:bg-opacity-100 transition"
        >
          <X size={12} className="text-gray-600" />
        </button>
      </div>

      {/* Event details */}
      <div className="p-4">
        <h3 className="font-bold text-gray-900 text-sm mb-0.5">{event.title}</h3>
        <p className="text-xs text-gray-400 mb-1">{event.agency}</p>
        <p className="text-xs text-gray-500 mb-0.5">{event.fullDate}</p>
        <p className="text-xs text-gray-500 mb-3">{event.location}</p>
        <AvatarGroup attendees={event.attendees} extra={event.extra} />
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────
export default function CalendarPage({ onAddEvent }) {
  const [view,         setView]         = useState("Month");
  const [activePopup,  setActivePopup]  = useState(null); // event id

  const togglePopup = (eventId) => {
    setActivePopup(prev => prev === eventId ? null : eventId);
  };

  const getEventsForCell = (rowIdx, colIdx) =>
    events.filter(e => e.gridRow === rowIdx && e.gridCol === colIdx);

  return (
    <section className="p-4 lg:p-6 space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">Calender</h1>

      <div className="flex gap-4" style={{ height: "calc(100vh - 160px)" }}>

        {/* ── Left Panel ── */}
        <div className="w-72 shrink-0 bg-white rounded-xl shadow-sm p-5 flex flex-col gap-4 overflow-y-auto">
          <button
            onClick={() => onAddEvent && onAddEvent()}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors">
            + Add New Event
          </button>

          <div>
            <p className="text-sm font-bold text-gray-800 mb-3">You are going to</p>
            <div className="space-y-5">
              {sideEvents.map(ev => (
                <div key={ev.id} className="flex gap-3 cursor-pointer hover:bg-gray-50 rounded-lg p-1 transition-colors"
                  onClick={() => togglePopup(ev.id)}>
                  {/* Side thumbnail */}
                  <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0 overflow-hidden">
                    {ev.sideImage ? (
                      <img src={ev.sideImage} alt={ev.title}
                        className="w-full h-full object-cover"
                        onError={e => { e.target.style.display = "none"; }} />
                    ) : (
                      <div className="w-full h-full bg-gray-300 rounded-full" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 leading-tight">{ev.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{ev.date}</p>
                    <p className="text-xs text-gray-400 truncate">{ev.shortLocation}</p>
                    <div className="mt-1.5">
                      <AvatarGroup attendees={ev.attendees} extra={ev.extra} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="w-full border border-gray-200 rounded-xl py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors mt-auto">
            See More
          </button>
        </div>

        {/* ── Right Panel: Calendar ── */}
        <div className="flex-1 bg-white rounded-xl shadow-sm flex flex-col overflow-hidden">

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
            <div className="flex items-center gap-3">
              <button className="text-sm text-gray-500 hover:text-gray-700 font-medium px-2 py-1 rounded hover:bg-gray-100 transition">
                Today
              </button>
              <div className="flex items-center gap-1">
                <button className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center transition">
                  <ChevronLeft size={15} className="text-gray-500" />
                </button>
                <span className="text-lg font-bold text-gray-800 px-2">October 2019</span>
                <button className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center transition">
                  <ChevronRight size={15} className="text-gray-500" />
                </button>
              </div>
            </div>
            {/* View toggle */}
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
              {["Day","Week","Month"].map(v => (
                <button key={v} onClick={() => setView(v)}
                  className={`px-4 py-1.5 text-sm font-medium transition-colors
                    ${view === v ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-gray-50"}`}>
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Day column headers */}
          <div className="grid grid-cols-7 border-b border-gray-100 shrink-0">
            {COLS.map(col => (
              <div key={col} className="text-center text-xs font-bold text-gray-500 py-2.5 border-r border-gray-50 last:border-r-0 tracking-wide">
                {col}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="flex-1 overflow-y-auto">
            {grid.map((week, rowIdx) => (
              <div key={rowIdx}
                className="grid grid-cols-7 border-b border-gray-100 last:border-b-0"
                style={{ minHeight: "80px" }}>
                {week.map((day, colIdx) => {
                  const isOtherMonth = (rowIdx === 0 && day > 7) || (rowIdx === 5 && day < 10);
                  const cellEvents   = getEventsForCell(rowIdx, colIdx);

                  return (
                    <div key={colIdx}
                      className={`border-r border-gray-50 last:border-r-0 p-1.5 relative
                        ${isOtherMonth ? "bg-gray-50" : ""}`}
                      style={{ minHeight: "80px" }}>

                      {/* Day number */}
                      <span className={`text-xs font-medium block mb-1
                        ${isOtherMonth ? "text-gray-300" : "text-gray-600"}`}>
                        {day}
                      </span>

                      {/* Event bars */}
                      {cellEvents.map(ev => (
                        <div key={ev.id} className="relative">
                          <button
                            onClick={() => togglePopup(ev.id)}
                            className={`w-full text-left text-[10px] font-semibold px-1.5 py-0.5 rounded-sm truncate mb-0.5 transition-opacity hover:opacity-80
                              ${ev.barColor}`}
                            style={ev.span > 1 ? {
                              width: `${ev.span * 100}%`,
                              position: "relative",
                              zIndex: 5,
                            } : {}}
                          >
                            {ev.title}
                          </button>

                          {/* Popup */}
                          {activePopup === ev.id && (
                            <EventPopup
                              event={ev}
                              onClose={() => setActivePopup(null)}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}