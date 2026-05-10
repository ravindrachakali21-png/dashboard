import { useState, useRef, useEffect } from "react";
import {
  Bell, ChevronDown, Menu, Search,
  Settings, Calendar, User, AlertCircle,
  UserCog, KeyRound, ClipboardList, LogOut, Check
} from "lucide-react";

function useClickOutside(ref, handler) {
  useEffect(() => {
    const fn = (e) => { if (!ref.current || ref.current.contains(e.target)) return; handler(); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, [ref, handler]);
}

const notifications = [
  { id: 1, icon: "bg-blue-500",   Icon: Settings,     title: "Settings",           desc: "Update Dashboard"              },
  { id: 2, icon: "bg-purple-500", Icon: Calendar,     title: "Event Update",       desc: "An event date update again"    },
  { id: 3, icon: "bg-orange-400", Icon: User,         title: "Profile",            desc: "Update your profile"           },
  { id: 4, icon: "bg-red-400",    Icon: AlertCircle,  title: "Application Error",  desc: "Check Your running application"},
];

const languages = [
  { code: "en", label: "English", flag: "/assets/flag-uk.png",     emoji: "🇬🇧" },
  { code: "fr", label: "French",  flag: "/assets/flag-france.png", emoji: "🇫🇷" },
  { code: "es", label: "Spanish", flag: "/assets/flag-spain.png",  emoji: "🇪🇸" },
];

function FlagImg({ src, emoji, alt }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <span className="text-base leading-none">{emoji}</span>;
  return <img src={src} alt={alt} onError={() => setFailed(true)} className="w-6 h-4 object-cover rounded-sm shrink-0" />;
}

export default function Navbar({ onMenuClick, onNavigate }) {
  const [showNotif,   setShowNotif]   = useState(false);
  const [showLang,    setShowLang]    = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [activeLang,  setActiveLang]  = useState("en");

  const notifRef   = useRef();
  const langRef    = useRef();
  const profileRef = useRef();

  useClickOutside(notifRef,   () => setShowNotif(false));
  useClickOutside(langRef,    () => setShowLang(false));
  useClickOutside(profileRef, () => setShowProfile(false));

  const closeAll = () => { setShowNotif(false); setShowLang(false); setShowProfile(false); };
  const currentLang = languages.find(l => l.code === activeLang);

  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-3 flex items-center gap-3 shrink-0 sticky top-0 z-10">

      {/* Hamburger */}
      <button className="text-gray-500 hover:text-gray-700 transition-colors" onClick={onMenuClick}>
        <Menu size={20} />
      </button>

      {/* Search */}
      <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 gap-2 flex-1 max-w-sm">
        <Search size={15} className="text-gray-400" />
        <input type="text" placeholder="Search"
          className="bg-transparent text-sm text-gray-600 outline-none w-full placeholder-gray-400" />
      </div>

      <div className="flex items-center gap-3 ml-auto">

        {/* ── Bell / Notification ── */}
        <div ref={notifRef} className="relative">
          <button onClick={() => { closeAll(); setShowNotif(v => !v); }} className="relative p-1 cursor-pointer">
            <Bell size={20} className="text-gray-500" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">6</span>
          </button>

          {showNotif && (
            <div className="absolute right-0 top-11 z-50 bg-white rounded-2xl shadow-2xl border border-gray-100 w-72">
              <div className="px-4 py-3 border-b border-gray-100">
                <h3 className="font-semibold text-gray-800 text-sm">Notification</h3>
              </div>
              <div className="py-1">
                {notifications.map(n => (
                  <div key={n.id}
                    className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className={`w-9 h-9 rounded-full ${n.icon} flex items-center justify-center shrink-0`}>
                      <n.Icon size={15} className="text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-800 leading-tight">{n.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{n.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 px-4 py-3 text-center">
                <button className="text-sm text-gray-500 hover:text-blue-500 font-medium transition-colors">
                  See all notification
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── Language ── */}
        <div ref={langRef} className="relative hidden sm:block">
          <button onClick={() => { closeAll(); setShowLang(v => !v); }}
            className="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity">
            <FlagImg src={currentLang.flag} emoji={currentLang.emoji} alt={currentLang.label} />
            <span className="text-sm text-gray-600">{currentLang.label}</span>
            <ChevronDown size={13} className="text-gray-400" />
          </button>

          {showLang && (
            <div className="absolute right-0 top-10 z-50 bg-white rounded-2xl shadow-2xl border border-gray-100 w-52">
              <div className="px-4 py-3 border-b border-gray-100">
                <h3 className="font-semibold text-gray-800 text-sm">Select Language</h3>
              </div>
              <div className="py-1">
                {languages.map(lang => (
                  <button key={lang.code}
                    onClick={() => { setActiveLang(lang.code); setShowLang(false); }}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <FlagImg src={lang.flag} emoji={lang.emoji} alt={lang.label} />
                      <span className="text-sm text-gray-700 font-medium">{lang.label}</span>
                    </div>
                    {activeLang === lang.code && <Check size={15} className="text-blue-500" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-200 hidden sm:block" />

        {/* ── Profile ── */}
        <div ref={profileRef} className="relative">
          <button onClick={() => { closeAll(); setShowProfile(v => !v); }}
            className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity">
            <img src="/assets/avatar.png" alt="Moni Roy"
              className="w-9 h-9 rounded-full object-cover border-2 border-purple-200"
              onError={e => { e.target.src = "https://ui-avatars.com/api/?name=Moni+Roy&background=c084fc&color=fff&size=40"; }} />
            <div className="hidden sm:block text-left">
              <p className="text-sm font-semibold text-gray-800 leading-tight">Moni Roy</p>
              <p className="text-xs text-gray-400">Admin</p>
            </div>
            <ChevronDown size={13} className="text-gray-400 hidden sm:block" />
          </button>

          {showProfile && (
            <div className="absolute right-0 top-12 z-50 bg-white rounded-2xl shadow-2xl border border-gray-100 w-52 py-2">
              {[
                { Icon: UserCog,       label: "Manage Account",   color: "text-blue-400"  },
                { Icon: KeyRound,      label: "Change Password",  color: "text-pink-400"  },
                { Icon: ClipboardList, label: "Activity Log",     color: "text-blue-400"  },
                { Icon: LogOut,        label: "Log out",          color: "text-red-400", danger: true },
              ].map((item, i) => (
                <button key={i}
                  onClick={() => {
                    setShowProfile(false);
                    if (item.danger && onNavigate) onNavigate("login");
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors
                    ${item.danger ? "text-red-500" : "text-gray-700"}`}>
                  <item.Icon size={15} className={item.color} />
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>

      </div>
    </header>
  );
}