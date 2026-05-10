import { useState } from "react";
import {
  ChevronLeft, Printer, Star, Trash2, Mic, Paperclip,
  FileText, Send, MoreVertical,
  Star as StarIcon, Bell, AlertTriangle, Trash, Plus,
  Search, Download, Info, Inbox as InboxIcon
} from "lucide-react";

const folders = [
  { icon: InboxIcon,     label: "Inbox",     count: 1253  },
  { icon: StarIcon,      label: "Starred",   count: 245   },
  { icon: Send,          label: "Sent",      count: 24532 },
  { icon: FileText,      label: "Draft",     count: "09"  },
  { icon: AlertTriangle, label: "Spam",      count: 14    },
  { icon: Bell,          label: "Important", count: 18    },
  { icon: Trash2,        label: "Bin",       count: 9     },
];

const labelList = [
  { label: "Primary", color: "border-teal-400"   },
  { label: "Social",  color: "border-blue-400"   },
  { label: "Work",    color: "border-orange-400" },
  { label: "Friends", color: "border-pink-400"   },
];

const messages = [
  {
    id: 1,
    from: "them",
    text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
    time: "6.30 pm",
  },
  {
    id: 2,
    from: "me",
    text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour,",
    time: "6.34 pm",
  },
  {
    id: 3,
    from: "them",
    text: "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default.Contrary to popular belief, Lorem Ipsum is not simply random text is the model text for your company.",
    time: "6.38 pm",
  },
];

export default function InboxMessage({ onBack }) {
  const [newMsg, setNewMsg]         = useState("");
  const [msgList, setMsgList]       = useState(messages);
  const [activeFolder, setActiveFolder] = useState("Inbox");

  const sendMessage = () => {
    if (!newMsg.trim()) return;
    setMsgList(list => [...list, {
      id: list.length + 1,
      from: "me",
      text: newMsg.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }]);
    setNewMsg("");
  };

  return (
    <section className="p-4 lg:p-6 space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">Inbox</h1>

      <div className="flex gap-4 h-[calc(100vh-160px)]">

        {/* ── Left Panel ── */}
        <div className="w-64 shrink-0 bg-white rounded-xl shadow-sm p-4 flex flex-col gap-4 overflow-y-auto">
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors">
            + Compose
          </button>
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

        {/* ── Right Panel: Message View ── */}
        <div className="flex-1 bg-white rounded-xl shadow-sm flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <button onClick={onBack} className="text-gray-500 hover:text-gray-700">
                <ChevronLeft size={20} />
              </button>
              <span className="font-bold text-gray-800 text-base">Minerva Barnett</span>
              <span className="bg-pink-100 text-pink-500 text-xs font-medium px-2.5 py-0.5 rounded-full">Friends</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition">
                <Printer size={15} className="text-gray-500" />
              </button>
              <button className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition">
                <Star size={15} className="text-gray-500" />
              </button>
              <button className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition">
                <Trash2 size={15} className="text-gray-500" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
            {msgList.map(msg => (
              <div key={msg.id} className={`flex items-end gap-3 ${msg.from === "me" ? "flex-row-reverse" : ""}`}>
                {msg.from === "them" && (
                  <div className="w-9 h-9 rounded-full bg-gray-200 shrink-0" />
                )}
                <div className={`max-w-[70%] ${msg.from === "me" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                  <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed relative
                    ${msg.from === "me"
                      ? "bg-blue-500 text-white rounded-tr-none"
                      : "bg-gray-100 text-gray-700 rounded-tl-none"}`}>
                    {msg.text}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-gray-400">{msg.time}</span>
                    <button className="text-gray-300 hover:text-gray-500">
                      <MoreVertical size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Compose bar */}
          <div className="border-t border-gray-100 px-4 py-3 flex items-center gap-3">
            <button className="text-gray-400 hover:text-gray-600 shrink-0">
              <Mic size={18} />
            </button>
            <input
              type="text"
              value={newMsg}
              onChange={e => setNewMsg(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder="Write massage"
              className="flex-1 text-sm text-gray-600 outline-none placeholder-gray-400"
            />
            <button className="text-gray-400 hover:text-gray-600 shrink-0">
              <Paperclip size={18} />
            </button>
            <button className="text-gray-400 hover:text-gray-600 shrink-0">
              <FileText size={18} />
            </button>
            <button
              onClick={sendMessage}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-colors"
            >
              Send <Send size={13} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}