import { useState } from "react";
import Layout from "./components/Layout";

// ── Auth / Standalone pages ───────────────────────────────────
import Login    from "./pages/Login";
import SignUp   from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import Logout   from "./pages/Logout";

// ── Main pages ────────────────────────────────────────────────
import Dashboard       from "./pages/Dashboard";
import Products        from "./pages/Products";
import Favorites       from "./pages/Favorites";
import Inbox           from "./pages/Inbox";
import InboxMessage    from "./pages/InboxMessage";
import OrderLists      from "./pages/OrderLists";
import ProductStock    from "./pages/ProductStock";
import Pricing         from "./pages/Pricing";
import CalendarPage    from "./pages/CalendarPage";
import Contact         from "./pages/Contact";
import AddContact      from "./pages/AddContact";
import Invoice         from "./pages/Invoice";
import UIElements      from "./pages/UIElements";
import Team            from "./pages/Team";
import AddTeamMember   from "./pages/AddTeamMember";
import TablePage       from "./pages/TablePage";
import GeneralSettings from "./pages/GeneralSettings";
import ToDoList        from "./pages/ToDo";

// ── Fallback ──────────────────────────────────────────────────
function ComingSoon({ title }) {
  return (
    <section className="p-4 lg:p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 capitalize">{title}</h1>
      <div className="bg-white rounded-xl p-16 shadow-sm flex flex-col items-center text-center">
        <p className="text-xl font-semibold text-gray-400">Coming Soon</p>
        <p className="text-sm text-gray-300 mt-1">This page is under construction</p>
      </div>
    </section>
  );
}

export default function App() {
  const [activePage,  setActivePage]  = useState("login");
  const [inboxView,   setInboxView]   = useState("list");
  const [contactView, setContactView] = useState("list");
  const [calView,     setCalView]     = useState("calendar");
  const [todoView,    setTodoView]    = useState("list");
  const [teamView,    setTeamView]    = useState("list");
  const [newContacts, setNewContacts] = useState([]);
  const [newMembers,  setNewMembers]  = useState([]);

  const handleNavigate = (page) => {
    setActivePage(page);
    if (page === "inbox")    setInboxView("list");
    if (page === "contact")  setContactView("list");
    if (page === "calender") setCalView("calendar");
    if (page === "todo")     setTodoView("list");
    if (page === "team")     setTeamView("list");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ── Standalone full-screen pages (no sidebar/navbar) ─────────
  if (activePage === "login")  return <Login    onNavigate={handleNavigate} />;
  if (activePage === "signup") return <SignUp   onNavigate={handleNavigate} />;
  if (activePage === "404")    return <NotFound onNavigate={handleNavigate} />;
  if (activePage === "logout") return <Logout   onNavigate={handleNavigate} />;

  // ── Pages inside Layout ───────────────────────────────────────
  const renderPage = () => {
    switch (activePage) {

      case "dashboard":
        return <Dashboard />;

      case "products":
        return <Products />;

      case "favorites":
        return <Favorites />;

      case "inbox":
        return inboxView === "message"
          ? <InboxMessage onBack={() => setInboxView("list")} />
          : <Inbox onOpenMessage={() => setInboxView("message")} />;

      case "orders":
        return <OrderLists />;

      case "stock":
        return <ProductStock />;

      case "pricing":
        return <Pricing />;

      case "calender":
        return <CalendarPage onAddEvent={() => setCalView("addEvent")} />;

      case "todo":
        return <ToDoList onAddNew={() => setTodoView("add")} />;

      case "contact":
        return contactView === "add"
          ? <AddContact
              onBack={() => setContactView("list")}
              onAdd={(c) => {
                setNewContacts(prev => [...prev, c]);
                setContactView("list");
              }}
            />
          : <Contact
              extraContacts={newContacts}
              onAddNew={() => setContactView("add")}
            />;

      case "invoice":
        return <Invoice />;

      case "ui":
        return <UIElements />;

      case "team":
        return teamView === "add"
          ? <AddTeamMember
              onBack={() => setTeamView("list")}
              onAdd={(m) => {
                setNewMembers(prev => [...prev, m]);
                setTeamView("list");
              }}
            />
          : <Team
              extraMembers={newMembers}
              onAddNew={() => setTeamView("add")}
            />;

      case "table":
        return <TablePage />;

      case "settings":
        return <GeneralSettings />;

      default:
        return <ComingSoon title={activePage} />;
    }
  };

  return (
    <Layout activePage={activePage} onNavigate={handleNavigate}>
      {renderPage()}
    </Layout>
  );
}