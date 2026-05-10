import {
  LayoutDashboard, Package, Heart, Inbox, List, Archive,
  Tag, Calendar, CheckSquare, Users, FileText, LayoutGrid,
  UserCircle, Table, Settings, LogOut, X
} from "lucide-react";

const mainNav = [
  { icon: LayoutDashboard, label: "Dashboard",     page: "dashboard"  },
  { icon: Package,         label: "Products",      page: "products"   },
  { icon: Heart,           label: "Favorites",     page: "favorites"  },
  { icon: Inbox,           label: "Inbox",         page: "inbox"      },
  { icon: List,            label: "Order Lists",   page: "orders"     },
  { icon: Archive,         label: "Product Stock", page: "stock"      },
];

const pagesNav = [
  { icon: Tag,          label: "Pricing",      page: "pricing"  },
  { icon: Calendar,    label: "Calender",     page: "calender" },
  { icon: CheckSquare, label: "To-Do",        page: "todo"     },
  { icon: Users,       label: "Contact",      page: "contact"  },
  { icon: FileText,    label: "Invoice",      page: "invoice"  },
  { icon: LayoutGrid,  label: "UI Elements",  page: "ui"       },
  { icon: UserCircle,  label: "Team",         page: "team"     },
  { icon: Table,       label: "Table",        page: "table"    },
];

export { mainNav, pagesNav };

export default function Sidebar({ activePage, onNavigate, isOpen, onClose }) {
  return (
    <aside className={`
      fixed top-0 left-0 h-full w-52 bg-white z-30 flex flex-col shadow-sm
      transition-transform duration-300
      ${isOpen ? "translate-x-0" : "-translate-x-full"}
      lg:translate-x-0 lg:static lg:z-auto
    `}>
      {/* Logo */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-gray-100">
        <span className="text-xl font-bold">
          <span className="text-blue-600">Dash</span>Stack
        </span>
        <button className="lg:hidden" onClick={onClose}>
          <X size={18} className="text-gray-500" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5">
        {mainNav.map(({ icon: Icon, label, page }) => (
          <button key={page} onClick={() => onNavigate(page)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
              ${activePage === page ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}>
            <Icon size={17} /> {label}
          </button>
        ))}

        <div className="pt-4 pb-1 px-3">
          <span className="text-[10px] font-semibold text-gray-400 tracking-widest uppercase">Pages</span>
        </div>

        {pagesNav.map(({ icon: Icon, label, page }) => (
          <button key={page} onClick={() => onNavigate(page)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
              ${activePage === page ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}>
            <Icon size={17} /> {label}
          </button>
        ))}
      </nav>

      {/* Bottom */}
      <div className="border-t border-gray-100 px-3 py-3 space-y-0.5">
        <button onClick={() => onNavigate("settings")}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
            ${activePage === "settings" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}>
          <Settings size={17} /> Settings
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100">
          <LogOut size={17} /> Logout
        </button>
      </div>
    </aside>
  );
}