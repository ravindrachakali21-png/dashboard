import { useState } from "react";

export default function SignUp({ onNavigate }) {
  const [email,    setEmail]    = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [terms,    setTerms]    = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    onNavigate && onNavigate("dashboard");
  };

  return (
    <div className="min-h-screen bg-blue-500 flex items-center justify-center relative overflow-hidden px-4">

      {/* Decorative blobs */}
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400 opacity-40 rounded-full translate-y-1/2 -translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-10 left-20 w-40 h-40 bg-blue-300 opacity-20 rounded-full pointer-events-none" />
      <div className="absolute top-10 right-10 w-48 h-48 bg-blue-400 opacity-25 rounded-full pointer-events-none" />

      {/* White Card */}
      <div className="relative z-10 bg-white rounded-3xl shadow-2xl px-10 py-10 w-full max-w-md">

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Create an Account</h1>
          <p className="text-sm text-gray-400">Create a account to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email address:
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="esteban_schiller@gmail.com"
              className="w-full bg-gray-100 rounded-xl px-4 py-3.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-300 transition"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full bg-gray-100 rounded-xl px-4 py-3.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-300 transition"
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <button type="button"
                className="text-sm text-gray-400 hover:text-blue-500 transition-colors">
                Forget Password?
              </button>
            </div>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••"
              className="w-full bg-gray-100 rounded-xl px-4 py-3.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-300 transition"
            />
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setTerms(t => !t)}
              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors shrink-0
                ${terms ? "bg-blue-500 border-blue-500" : "border-gray-300 bg-white"}`}
            >
              {terms && (
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
            <span className="text-sm text-gray-600 select-none">I accept terms and conditions</span>
          </div>

          {/* Sign Up */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-semibold py-3.5 rounded-xl text-sm transition-colors shadow-lg shadow-blue-200 mt-2"
          >
            Sign Up
          </button>

          {/* Login link */}
          <p className="text-center text-sm text-gray-500 pt-1">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => onNavigate && onNavigate("login")}
              className="text-blue-500 font-semibold hover:underline"
            >
              Login
            </button>
          </p>

        </form>
      </div>
    </div>
  );
}