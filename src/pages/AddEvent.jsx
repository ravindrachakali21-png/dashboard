import { useState, useRef } from "react";
import { Camera } from "lucide-react";

export default function AddEvent({ onBack, onAdd }) {
  const [photo,     setPhoto]     = useState(null);
  const [eventName, setEventName] = useState("");
  const [time,      setTime]      = useState("");
  const [date,      setDate]      = useState("");
  const [address,   setAddress]   = useState("");
  const [contact,   setContact]   = useState("");
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
    if (!eventName.trim()) return;
    onAdd && onAdd({ eventName, time, date, address, contact, photo });
    setSuccess(true);
    setTimeout(() => { setSuccess(false); onBack && onBack(); }, 1500);
  };

  return (
    <section className="p-4 lg:p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Add New Event</h1>

      <div className="bg-white rounded-2xl shadow-sm p-8 lg:p-12">

        {/* Cover Photo Upload */}
        <div className="flex flex-col items-center mb-10">
          <div
            onClick={() => fileRef.current.click()}
            className="relative cursor-pointer group"
          >
            {photo ? (
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-100 shadow-md">
                <img src={photo} alt="Cover" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center border-4 border-gray-200 group-hover:bg-gray-200 transition-colors">
                <Camera size={32} className="text-gray-400" />
              </div>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handlePhoto}
            className="hidden"
          />
          <button
            onClick={() => fileRef.current.click()}
            className="mt-3 text-sm font-semibold text-blue-500 hover:text-blue-600 transition-colors"
          >
            {photo ? "Change Cover Photo" : "Upload Cover Photo"}
          </button>
        </div>

        {/* Form Fields */}
        <div className="max-w-2xl mx-auto space-y-6">

          {/* Row 1: Event Name + Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-500 mb-2">Event Name</label>
              <input
                type="text"
                value={eventName}
                onChange={e => setEventName(e.target.value)}
                placeholder="Enter event name"
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-200 transition"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-2">Time</label>
              <input
                type="text"
                value={time}
                onChange={e => setTime(e.target.value)}
                placeholder="12:34 BDT"
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-200 transition"
              />
            </div>
          </div>

          {/* Row 2: Date + Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-500 mb-2">Date</label>
              <input
                type="text"
                value={date}
                onChange={e => setDate(e.target.value)}
                placeholder="11-09-2019"
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-200 transition"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-2">Address</label>
              <input
                type="text"
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder="Address"
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-200 transition"
              />
            </div>
          </div>

          {/* Row 3: Contact Number */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-500 mb-2">Contact Number</label>
              <input
                type="tel"
                value={contact}
                onChange={e => setContact(e.target.value)}
                placeholder="Enter your Contact Number"
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-200 transition"
              />
            </div>
          </div>

          {/* Add Now Button */}
          <div className="pt-4">
            <button
              onClick={handleSubmit}
              className={`w-full py-4 rounded-xl text-white font-semibold text-sm transition-colors shadow-md
                ${success
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-blue-500 hover:bg-blue-600"}`}
            >
              {success ? "✓ Event Added!" : "Add Now"}
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}