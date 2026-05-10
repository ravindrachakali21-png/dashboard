import { useState } from "react";
import { Mail, Plus } from "lucide-react";

const defaultContacts = [
  { id: 1, name: "Jason Price",    email: "kuhlman.jermey@yahoo.com",    image: "/assets/contact1.png" },
  { id: 2, name: "Duane Dean",     email: "rusty.botsford@wilfrid.io",   image: "/assets/contact2.png" },
  { id: 3, name: "Jonathan Barker",email: "cora_haley@quinn.biz",        image: "/assets/contact3.png" },
  { id: 4, name: "Rosie Glover",   email: "lockman.marques@hotmail.com", image: "/assets/contact4.png" },
  { id: 5, name: "Patrick Greer",  email: "pearlie.eichmann@trevion.net",image: "/assets/contact5.png" },
  { id: 6, name: "Darrell Ortega", email: "chaya.shields@ferry.info",    image: "/assets/contact6.png" },
];

function ContactAvatar({ src, name }) {
  const [failed, setFailed] = useState(false);
  const initials = name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
  const colors = ["bg-blue-400","bg-purple-400","bg-green-500","bg-orange-400","bg-pink-400","bg-teal-400"];
  const color  = colors[name.charCodeAt(0) % colors.length];

  if (failed || !src) {
    return (
      <div className={`w-full h-56 ${color} flex items-center justify-center`}>
        <span className="text-white text-5xl font-bold">{initials}</span>
      </div>
    );
  }
  return (
    <img src={src} alt={name} onError={() => setFailed(true)}
      className="w-full h-56 object-cover" />
  );
}

export default function Contact({ extraContacts = [], onAddNew }) {
  const allContacts = [...defaultContacts, ...extraContacts.map((c, i) => ({
    ...c, id: 100 + i, image: c.image || null
  }))];

  return (
    <section className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-bold text-gray-800">Contact</h1>
        <button
          onClick={onAddNew}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors shadow-sm"
        >
          <Plus size={16} />
          Add New Contact
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {allContacts.map(contact => (
          <div key={contact.id}
            className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-50 hover:shadow-md transition-shadow">
            <div className="overflow-hidden">
              <ContactAvatar src={contact.image} name={contact.name} />
            </div>
            <div className="px-5 py-4 text-center">
              <h3 className="font-bold text-gray-800 text-base">{contact.name}</h3>
              <p className="text-sm text-gray-400 mt-0.5 mb-4">{contact.email}</p>
              <button className="flex items-center gap-2 border border-gray-200 rounded-xl px-5 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:border-blue-300 transition-colors mx-auto">
                <Mail size={15} className="text-gray-400" />
                Message
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}