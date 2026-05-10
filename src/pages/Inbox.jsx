import { useState } from "react";
import {
  Search, Star, Inbox as InboxIcon, Send, FileText,
  AlertTriangle, Bell, Trash2, Tag, Plus, Download,
  Info, Trash, CheckSquare, Printer, Bookmark, MoreVertical
} from "lucide-react";

const labelColors = {
  Primary: "bg-teal-100 text-teal-600",
  Social:  "bg-blue-100 text-blue-500",
  Work:    "bg-orange-100 text-orange-500",
  Friends: "bg-pink-100 text-pink-500",
};

const emails = [
  { id: 1,  name: "Jullu Jalal",    label: "Primary", subject: "Our Bachelor of Commerce program is ACBSP-accredited.", time: "8:38 AM",  checked: true,  starred: false },
  { id: 2,  name: "Minerva Barnett",label: "Work",    subject: "Get Best Advertiser In Your Side Pocket",               time: "8:13 AM",  checked: true,  starred: false },
  { id: 3,  name: "Peter Lewis",    label: "Friends", subject: "Vacation Home Rental Success",                          time: "7:52 PM",  checked: false, starred: false },
  { id: 4,  name: "Anthony Briggs", label: null,      subject: "Free Classifieds Using Them To Promote Your Stuff Online", time: "7:52 PM", checked: true, starred: true  },
  { id: 5,  name: "Clifford Morgan",label: "Social",  subject: "Enhance Your Brand Potential With Giant Advertising Blimps", time: "4:13 PM", checked: false, starred: false },
  { id: 6,  name: "Cecilia Webster",label: "Friends", subject: "Always Look On The Bright Side Of Life",                time: "3:52 PM",  checked: false, starred: false },
  { id: 7,  name: "Harvey Manning", label: null,      subject: "Curling Irons Are As Individual As The Women Who Use Them", time: "2:30 PM", checked: false, starred: true  },
  { id: 8,  name: "Willie Blake",   label: "Primary", subject: "Our Bachelor of Commerce program is ACBSP-accredited.", time: "8:38 AM",  checked: false, starred: false },
  { id: 9,  name: "Minerva Barnett",label: "Work",    subject: "Get Best Advertiser In Your Side Pocket",               time: "8:13 AM",  checked: true,  starred: false },
  { id: 10, name: "Fanny Weaver",   label: null,      subject: "Free Classifieds Using Them To Promote Your Stuff Online", time: "7:52 PM", checked: false, starred: true  },
  { id: 11, name: "Olga Hogan",     label: "Social",  subject: "Enhance Your Brand Potential With Giant Advertising Blimps", time: "4:13 PM", checked: false, starred: false },
  { id: 12, name: "Lora Houston",   label: "Friends", subject: "Vacation Home Rental Success",                          time: "7:52 PM",  checked: false, starred: false },
];

const folders = [
  { icon: InboxIcon,      label: "Inbox",     count: 1253, active: true  },
  { icon: Star,           label: "Starred",   count: 245,  active: false },
  { icon: Send,           label: "Sent",      count: 24532,active: false },
  { icon: FileText,       label: "Draft",     count: "09", active: false },
  { icon: AlertTriangle,  label: "Spam",      count: 14,   active: false },
  { icon: Bell,           label: "Important", count: 18,   active: false },
  { icon: Trash2,         label: "Bin",       count: 9,    active: false },
];

const labelList = [
  { label: "Primary", color: "border-teal-400"  },
  { label: "Social",  color: "border-blue-400"  },
  { label: "Work",    color: "border-orange-400"},
  { label: "Friends", color: "border-pink-400"  },
];

export default function Inbox({ onOpenMessage }) {
  const [emailList, setEmailList]       = useState(emails);
  const [activeFolder, setActiveFolder] = useState("Inbox");
  const [searchTerm, setSearchTerm]     = useState("");

  const toggleCheck  = (id) => setEmailList(list => list.map(e => e.id === id ? { ...e, checked: !e.checked } : e));
  const toggleStar   = (id) => setEmailList(list => list.map(e => e.id === id ? { ...e, starred: !e.starred } : e));

  const filtered = emailList.filter(e => {
    if (activeFolder === "Starred" && !e.starred) return false;
    if (searchTerm && !e.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !e.subject.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <section className="p-4 lg:p-6 space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">Inbox</h1>

      <div className="flex gap-4 h-[calc(100vh-160px)]">

        {/* ── Left Panel ── */}
        <div className="w-64 shrink-0 bg-white rounded-xl shadow-sm p-4 flex flex-col gap-4 overflow-y-auto">
          {/* Compose */}
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors">
            + Compose
          </button>

          {/* My Email */}
          <div>
            <p className="text-sm font-bold text-gray-800 mb-2">My Email</p>
            <div className="space-y-0.5">
              {folders.map(({ icon: Icon, label, count }) => (
                <button key={label}
                  onClick={() => setActiveFolder(label)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors
                    ${activeFolder === label ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-600 hover:bg-gray-50"}`}>
                  <span className="flex items-center gap-2.5">
                    <Icon size={15} className={activeFolder === label ? "text-blue-500" : "text-gray-400"} />
                    {label}
                  </span>
                  <span className={`text-xs ${activeFolder === label ? "text-blue-500 font-semibold" : "text-gray-400"}`}>
                    {count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Labels */}
          <div>
            <p className="text-sm font-bold text-gray-800 mb-2">Label</p>
            <div className="space-y-1">
              {labelList.map(({ label, color }) => (
                <div key={label} className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <span className={`w-4 h-4 rounded-sm border-2 ${color}`} />
                  <span className="text-sm text-gray-600">{label}</span>
                </div>
              ))}
              <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-400 hover:text-gray-600">
                <Plus size={13} /> Create New Label
              </button>
            </div>
          </div>
        </div>

        {/* ── Right Panel ── */}
        <div className="flex-1 bg-white rounded-xl shadow-sm flex flex-col overflow-hidden">
          {/* Toolbar */}
          <div className="flex items-center gap-3 p-3 border-b border-gray-100">
            <div className="flex items-center bg-gray-100 rounded-full px-3 py-2 gap-2 flex-1 max-w-sm">
              <Search size={14} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search mail"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="bg-transparent text-sm text-gray-600 outline-none w-full placeholder-gray-400"
              />
            </div>
            <div className="ml-auto flex items-center gap-2">
              <button className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition">
                <Download size={15} className="text-gray-500" />
              </button>
              <button className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition">
                <Info size={15} className="text-gray-500" />
              </button>
              <button className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition">
                <Trash size={15} className="text-gray-500" />
              </button>
            </div>
          </div>

          {/* Email list */}
          <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
            {filtered.map(email => (
              <div
                key={email.id}
                onClick={() => onOpenMessage && onOpenMessage(email)}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors group"
              >
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={email.checked}
                  onChange={() => toggleCheck(email.id)}
                  onClick={e => e.stopPropagation()}
                  className="w-4 h-4 rounded accent-blue-500 cursor-pointer shrink-0"
                />
                {/* Star */}
                <button onClick={e => { e.stopPropagation(); toggleStar(email.id); }} className="shrink-0">
                  <Star
                    size={15}
                    className={email.starred ? "fill-yellow-400 text-yellow-400" : "text-gray-300 hover:text-yellow-300"}
                  />
                </button>
                {/* Name */}
                <span className="w-36 shrink-0 text-sm font-semibold text-gray-800 truncate">{email.name}</span>
                {/* Label badge */}
                {email.label ? (
                  <span className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${labelColors[email.label]}`}>
                    {email.label}
                  </span>
                ) : <span className="w-14 shrink-0" />}
                {/* Subject */}
                <span className="flex-1 text-sm text-gray-500 truncate">{email.subject}</span>
                {/* Time */}
                <span className="text-xs text-gray-400 shrink-0">{email.time}</span>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 px-4 py-3 flex items-center justify-between">
            <span className="text-sm text-gray-500">Showing 1-12 of 1,253</span>
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
      </div>
    </section>
  );
}