import { useState, useRef } from "react";
import { Camera } from "lucide-react";

export default function GeneralSettings() {
  const [logo,        setLogo]        = useState(null);
  const [siteName,    setSiteName]    = useState("Bright Web");
  const [copyRight,   setCopyRight]   = useState("All rights Reserved@brightweb");
  const [seoTitle,    setSeoTitle]    = useState("Bright web is a hybrid dashboard");
  const [seoDesc,     setSeoDesc]     = useState("Bright web is a hybrid dashboard");
  const [seoKeywords, setSeoKeywords] = useState("CEO");
  const [saved,       setSaved]       = useState(false);
  const fileRef = useRef();

  const handleLogo = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setLogo(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <section className="p-4 lg:p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">General Settings</h1>

      <div className="bg-white rounded-2xl shadow-sm p-8 lg:p-12">

        {/* Logo Upload */}
        <div className="flex flex-col items-center mb-10">
          <div onClick={() => fileRef.current.click()}
            className="relative cursor-pointer group">
            {logo ? (
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-100 shadow-md">
                <img src={logo} alt="Logo" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center border-4 border-gray-200 group-hover:bg-gray-200 transition-colors">
                <Camera size={32} className="text-gray-400" />
              </div>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleLogo} className="hidden" />
          <button onClick={() => fileRef.current.click()}
            className="mt-3 text-sm font-semibold text-blue-500 hover:text-blue-600 transition-colors">
            {logo ? "Change Logo" : "Upload Logo"}
          </button>
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto space-y-6">

          {/* Row 1: Site Name + Copy Right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-500 mb-2">Site Name</label>
              <input type="text" value={siteName} onChange={e => setSiteName(e.target.value)}
                placeholder="Enter site name"
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-200 transition" />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-2">Copy Right</label>
              <input type="text" value={copyRight} onChange={e => setCopyRight(e.target.value)}
                placeholder="All rights Reserved"
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-200 transition" />
            </div>
          </div>

          {/* Row 2: SEO Title + SEO Description */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-500 mb-2">SEO Title</label>
              <input type="text" value={seoTitle} onChange={e => setSeoTitle(e.target.value)}
                placeholder="Enter SEO title"
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-200 transition" />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-2">SEO Description</label>
              <textarea value={seoDesc} onChange={e => setSeoDesc(e.target.value)}
                placeholder="Enter SEO description" rows={4}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-200 transition resize-none" />
            </div>
          </div>

          {/* Row 3: SEO Keywords */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-500 mb-2">SEO Keywords</label>
              <input type="text" value={seoKeywords} onChange={e => setSeoKeywords(e.target.value)}
                placeholder="Enter keywords"
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-200 transition" />
            </div>
          </div>

          {/* Save */}
          <div className="pt-4">
            <button onClick={handleSave}
              className={`w-full py-4 rounded-xl text-white font-semibold text-sm transition-colors shadow-md
                ${saved ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"}`}>
              {saved ? "✓ Saved!" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}