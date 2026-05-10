export default function NotFound({ onNavigate }) {
  return (
    <div className="min-h-screen bg-blue-500 flex items-center justify-center relative overflow-hidden px-4">

      {/* Decorative blobs */}
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400 opacity-40 rounded-full translate-y-1/2 -translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-16 left-24 w-36 h-36 bg-blue-300 opacity-20 rounded-full pointer-events-none" />
      <div className="absolute top-10 right-10 w-52 h-52 bg-blue-400 opacity-25 rounded-full pointer-events-none" />

      {/* White Card */}
      <div className="relative z-10 bg-white rounded-3xl shadow-2xl px-10 py-12 w-full max-w-sm flex flex-col items-center">

        {/* Browser window illustration */}
        <div className="w-72 rounded-xl overflow-hidden shadow-lg mb-8">
          {/* Browser top bar */}
          <div className="bg-gray-100 px-4 py-2.5 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-400"   />
            <span className="w-3 h-3 rounded-full bg-yellow-400"/>
            <span className="w-3 h-3 rounded-full bg-green-400" />
            <div className="flex-1 bg-gray-200 rounded-full h-2 ml-2" />
          </div>
          {/* Browser body */}
          <div className="bg-blue-500 px-6 pt-6 pb-8 flex flex-col items-start gap-6">
            {/* 404 text */}
            <div className="w-full text-center">
              <span className="text-7xl font-black text-orange-400 leading-none tracking-tight"
                style={{ fontFamily: "system-ui, sans-serif" }}>
                404
              </span>
            </div>
            {/* Bottom bar items */}
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-1.5">
                <div className="w-10 h-2 bg-white opacity-70 rounded-full" />
                <div className="w-14 h-2 bg-white opacity-70 rounded-full" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-white opacity-70" />
                <span className="w-2.5 h-2.5 rounded-full bg-white opacity-70" />
                <span className="w-2.5 h-2.5 rounded-full bg-white opacity-70" />
              </div>
            </div>
          </div>
        </div>

        {/* Message */}
        <p className="text-lg font-bold text-gray-900 text-center mb-6">
          Looks like you've got lost....
        </p>

        {/* Back to Dashboard */}
        <button
          onClick={() => onNavigate && onNavigate("dashboard")}
          className="w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-semibold py-3.5 rounded-xl text-sm transition-colors shadow-lg shadow-blue-200"
        >
          Back to Dashboard
        </button>

      </div>
    </div>
  );
}