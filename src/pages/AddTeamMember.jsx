import { useState, useRef } from "react";
import { Camera } from "lucide-react";

export default function AddTeamMember({ onBack, onAdd }) {
  const [photo,     setPhoto]     = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName,  setLastName]  = useState("");
  const [email,     setEmail]     = useState("");
  const [phone,     setPhone]     = useState("");
  const [position,  setPosition]  = useState("");
  const [gender,    setGender]    = useState("Male");
  const [success,   setSuccess]   = useState(false);
  const fileRef = useRef();

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setPhoto(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!firstName.trim()) return;
    onAdd && onAdd({
      name: `${firstName.trim()} ${lastName.trim()}`,
      role: position.trim() || "Member",
      email: email.trim(),
      image: photo,
    });
    setSuccess(true);
    setTimeout(() => { setSuccess(false); onBack && onBack(); }, 1500);
  };

  return (
    <section className="p-4 lg:p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Add Team Member</h1>

      <div className="bg-white rounded-2xl shadow-sm p-8 lg:p-12">

        {/* Photo Upload */}
        <div className="flex flex-col items-center mb-10">
          <div onClick={() => fileRef.current.click()}
            className="relative cursor-pointer group">
            {photo ? (
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-100 shadow-md">
                <img src={photo} alt="Member" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center border-4 border-gray-200 group-hover:bg-gray-200 transition-colors">
                <Camera size={32} className="text-gray-400" />
              </div>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/*" onChange={handlePhoto} className="hidden" />
          <button onClick={() => fileRef.current.click()}
            className="mt-3 text-sm font-semibold text-blue-500 hover:text-blue-600 transition-colors">
            {photo ? "Edit Photo" : "Upload Photo"}
          </button>
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto space-y-6">

          {/* Row 1: First + Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-500 mb-2">First Name</label>
              <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)}
                placeholder="Enter your first name"
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-200 transition" />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-2">Last Name</label>
              <input type="text" value={lastName} onChange={e => setLastName(e.target.value)}
                placeholder="Enter your last name"
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-200 transition" />
            </div>
          </div>

          {/* Row 2: Email + Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-500 mb-2">Your email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-200 transition" />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-2">Phone Number</label>
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-200 transition" />
            </div>
          </div>

          {/* Row 3: Position + Gender */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-500 mb-2">Position</label>
              <input type="text" value={position} onChange={e => setPosition(e.target.value)}
                placeholder="CEO"
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-200 transition" />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-2">Gender</label>
              <div className="relative">
                <select value={gender} onChange={e => setGender(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-200 transition appearance-none cursor-pointer">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Add Now */}
          <div className="pt-4">
            <button onClick={handleSubmit}
              className={`w-full py-4 rounded-xl text-white font-semibold text-sm transition-colors shadow-md
                ${success ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"}`}>
              {success ? "✓ Member Added!" : "Add Now"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}