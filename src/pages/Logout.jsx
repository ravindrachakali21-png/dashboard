import { LogOut } from "lucide-react";

export default function Logout({ onNavigate }) {
  return (
    <div className="min-h-screen bg-blue-500 flex items-center justify-center relative overflow-hidden px-4">

      {/* Decorative blobs */}
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400 opacity-40 rounded-full translate-y-1/2 -translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-10 left-20 w-40 h-40 bg-blue-300 opacity-20 rounded-full pointer-events-none" />
      <div className="absolute top-10 right-10 w-48 h-48 bg-blue-400 opacity-25 rounded-full pointer-events-none" />

      {/* White Card */}
      <div className="relative z-10 bg-white rounded-3xl shadow-2xl px-10 py-12 w-full max-w-sm flex flex-col items-center text-center">

        {/* Icon */}
        <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-6">
          <LogOut size={36} className="text-red-500" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Logging Out</h1>
        <p className="text-sm text-gray-400 mb-8">
          Are you sure you want to logout from your account?
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3 w-full">
          <button
            onClick={() => onNavigate && onNavigate("login")}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3.5 rounded-xl text-sm transition-colors shadow-md"
          >
            Yes, Logout
          </button>
          <button
            onClick={() => onNavigate && onNavigate("dashboard")}
            className="w-full border-2 border-blue-500 text-blue-500 hover:bg-blue-50 font-semibold py-3.5 rounded-xl text-sm transition-colors"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}