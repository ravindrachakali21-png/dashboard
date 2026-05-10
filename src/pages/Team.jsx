import { useState } from "react";
import { Plus, X } from "lucide-react";

const initialMembers = [
  { id: 1,  name: "Jason Price",    role: "Admin",           email: "janick_parisian@yahoo.com",    image: "/assets/team1.png"  },
  { id: 2,  name: "Jukkoe Sisao",   role: "CEO",             email: "sibyl_kozey@gmail.com",         image: "/assets/team2.png"  },
  { id: 3,  name: "Harriet King",   role: "CTO",             email: "nadia_block@hotmail.com",       image: "/assets/team3.png"  },
  { id: 4,  name: "Lenora Benson",  role: "Lead",            email: "feil.wallace@kunde.us",         image: "/assets/team4.png"  },
  { id: 5,  name: "Olivia Reese",   role: "Strategist",      email: "kemmer.hattie@cremin.us",       image: "/assets/team5.png"  },
  { id: 6,  name: "Bertha Valdez",  role: "CEO",             email: "loraine.koelpin@tromp.io",      image: "/assets/team6.png"  },
  { id: 7,  name: "Harriett Payne", role: "Digital Marketer",email: "nannie_west@estrella.tv",       image: "/assets/team7.png"  },
  { id: 8,  name: "George Bryant",  role: "Social Media",    email: "delmer.kling@gmail.com",        image: "/assets/team8.png"  },
  { id: 9,  name: "Lily French",    role: "Strategist",      email: "lucienne.herman@hotmail.com",   image: "/assets/team9.png"  },
  { id: 10, name: "Howard Adkins",  role: "CEO",             email: "wiegand.leonor@herman.us",      image: "/assets/team10.png" },
  { id: 11, name: "Earl Bowman",    role: "Digital Marketer",email: "waino_altenwerth@nicolette.tv", image: "/assets/team11.png" },
  { id: 12, name: "Patrick Padilla",role: "Social Media",    email: "octavia.nienow@gleichner.net",  image: "/assets/team12.png" },
];

// Avatar with color fallback
function TeamAvatar({ src, name, size = "w-24 h-24" }) {
  const [failed, setFailed] = useState(false);
  const initials = name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
  const colors = [
    "bg-blue-400", "bg-purple-400", "bg-green-500",
    "bg-orange-400", "bg-pink-400", "bg-teal-400",
    "bg-indigo-400", "bg-red-400", "bg-yellow-500",
    "bg-cyan-500", "bg-emerald-500", "bg-rose-400",
  ];
  const color = colors[name.charCodeAt(0) % colors.length];

  if (failed || !src) {
    return (
      <div className={`${size} rounded-full ${color} flex items-center justify-center border-4 border-white shadow-md`}>
        <span className="text-white text-2xl font-bold">{initials}</span>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={name}
      onError={() => setFailed(true)}
      className={`${size} rounded-full object-cover border-4 border-white shadow-md`}
    />
  );
}

// Add Member Modal
function AddMemberModal({ onClose, onAdd }) {
  const [name,  setName]  = useState("");
  const [role,  setRole]  = useState("");
  const [email, setEmail] = useState("");

  const handleAdd = () => {
    if (!name.trim() || !role.trim() || !email.trim()) return;
    onAdd({ name: name.trim(), role: role.trim(), email: email.trim() });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-gray-800">Add New Member</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={18} />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">Full Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)}
              placeholder="Enter full name"
              className="w-full bg-gray-100 rounded-xl px-4 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-300 transition" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">Role</label>
            <input type="text" value={role} onChange={e => setRole(e.target.value)}
              placeholder="e.g. Developer, Designer"
              className="w-full bg-gray-100 rounded-xl px-4 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-300 transition" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="Enter email address"
              className="w-full bg-gray-100 rounded-xl px-4 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-300 transition" />
          </div>
          <button onClick={handleAdd}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors mt-2">
            Add Member
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Team({ extraMembers = [], onAddNew }) {
  const [members, setMembers] = useState([...initialMembers, ...extraMembers.map((m, i) => ({ ...m, id: 200 + i }))]);
  const [showModal, setShowModal] = useState(false);

  const handleAdd = ({ name, role, email }) => {
    setMembers(prev => [...prev, { id: Date.now(), name, role, email, image: null }]);
  };

  return (
    <section className="p-4 lg:p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-bold text-gray-800">Team</h1>
        <button
          onClick={() => onAddNew ? onAddNew() : setShowModal(true)}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors shadow-sm"
        >
          <Plus size={16} />
          Add New Member
        </button>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {members.map(member => (
          <div key={member.id}
            className="bg-white rounded-2xl shadow-sm p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow border border-gray-50">
            {/* Circular photo */}
            <div className="mb-4">
              <TeamAvatar src={member.image} name={member.name} size="w-24 h-24" />
            </div>
            {/* Name */}
            <h3 className="font-bold text-gray-800 text-base">{member.name}</h3>
            {/* Role */}
            <p className="text-sm text-gray-400 mt-0.5 mb-1">{member.role}</p>
            {/* Email */}
            <p className="text-xs text-gray-400 truncate w-full text-center">{member.email}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <AddMemberModal
          onClose={() => setShowModal(false)}
          onAdd={handleAdd}
        />
      )}
    </section>
  );
}