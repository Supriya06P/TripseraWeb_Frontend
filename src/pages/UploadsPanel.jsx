import { useState, useRef } from "react";
import { UploadCloud, Type, Image as ImageIcon, Smile, Sparkles, Box } from "lucide-react";

export default function UploadsPanel({ onAddImage, onAddText }) {
  const [activeTab, setActiveTab] = useState("images");
  const fileInputRef = useRef(null);

  // Keeps your existing logic for asset globbing
  const tourImages = Object.values(
    import.meta.glob("../assets/images/*.{jpg,jpeg,png}", {
      eager: true,
    })
  ).map((mod) => mod.default);

  const travelIcons = [
    "https://cdn-icons-png.flaticon.com/512/747/747310.png",
    "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    "https://cdn-icons-png.flaticon.com/512/69/69524.png",
    "https://cdn-icons-png.flaticon.com/512/2838/2838912.png",
    "https://cdn-icons-png.flaticon.com/512/481/481874.png",
    "https://cdn-icons-png.flaticon.com/512/1077/1077035.png",
    "https://cdn-icons-png.flaticon.com/512/561/561127.png",
    "https://cdn-icons-png.flaticon.com/512/929/929426.png",
    "https://cdn-icons-png.flaticon.com/512/854/854878.png",
    "https://cdn-icons-png.flaticon.com/512/3069/3069172.png"
  ];

  const flyerTexts = [
    "Explore Royal Rajasthan", "Book Now & Save 30%", "7 Days 6 Nights",
    "Luxury Palace Stay", "Limited Time Offer", "Family Tour Package"
  ];

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onAddImage(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col h-full bg-[#fdfdfd] relative overflow-hidden font-sans">
      
      {/* --- ANIMATED BACKGROUND ELEMENTS --- */}
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-purple-600/60 rounded-full blur-[80px]" />
      <div className="absolute bottom-[-5%] left-[-5%] w-48 h-48 bg-blue-500/50 rounded-full blur-[60px]" />
      
      {/* Mesh Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2v-4h4v-2h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2v-4h4v-2H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}>
      </div>

      <div className="relative z-10 p-6 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2.5 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg shadow-purple-200">
             <UploadCloud className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-black bg-gradient-to-r from-purple-800 to-purple-600 bg-clip-text text-transparent tracking-tight">
              Uploads
            </h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Manage Media Assets</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
          
          {/* UPLOAD ZONE - Matching Elements Style */}
          <div className="group mb-8 p-6 border-2 border-dashed border-purple-500 rounded-2xl text-center bg-purple-50/20 hover:bg-purple-50/50 hover:border-purple-300 transition-all">
            <UploadCloud className="mx-auto text-purple-500 mb-2 group-hover:scale-110 transition-transform" size={28} />
            <p className="text-xs font-bold text-slate-700">Drop files to upload</p>
            <p className="text-[9px] text-slate-400 mb-4 uppercase tracking-widest mt-1">PNG, JPG, SVG</p>

            <label className="cursor-pointer inline-block">
              <span className="bg-purple-600 text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider shadow-md shadow-purple-100 hover:bg-purple-700 transition-all active:scale-95">
                Browse Files
              </span>
              <input type="file" className="hidden" accept="image/*" onChange={handleUpload} />
            </label>
          </div>

          {/* TAB NAVIGATION - Glass Style */}
          <div className="flex p-1 bg-slate-100/50 backdrop-blur-sm rounded-xl mb-6 border border-slate-100">
            {["images", "icons", "text"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-1.5 text-[10px] font-black uppercase tracking-tighter rounded-lg transition-all ${
                  activeTab === tab
                    ? "bg-white text-purple-600 shadow-sm"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* CONTENT GRID */}
          <div className="grid grid-cols-2 gap-3">
            {activeTab === "images" && tourImages.map((img, i) => (
              <button
                key={i}
                onClick={() => onAddImage(img)}
                className="aspect-square rounded-xl border border-slate-100 overflow-hidden hover:border-purple-300 transition-all shadow-sm bg-white"
              >
                <img src={img} alt="" className="w-full h-full object-cover hover:scale-110 transition duration-500" />
              </button>
            ))}

            {activeTab === "icons" && travelIcons.map((icon, i) => (
              <button
                key={i}
                onClick={() => onAddImage(icon)}
                className="p-4 bg-white/60 border border-slate-100 rounded-xl flex items-center justify-center hover:bg-purple-50 hover:border-purple-200 transition-all shadow-sm"
              >
                <img src={icon} alt="" className="w-10 h-10 object-contain hover:rotate-12 transition-transform" />
              </button>
            ))}
{/* --- UPDATED TEXT SECTION --- */}
{activeTab === "text" && flyerTexts.map((text, i) => (
  <button
    key={i}
    // We pass "body" as the type, and 'text' as the content
    onClick={() => onAddText("body", text)} 
    className="col-span-2 group relative text-left px-4 py-3 bg-white/60 border border-slate-100 rounded-xl hover:border-purple-300 transition-all overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
    <span className="relative z-10 text-[11px] font-bold text-slate-700 group-hover:text-purple-700 transition-colors">
      {text}
    </span>
  </button>
))}
          </div>

          {/* Matching Glass Footer */}
          <div className="mt-8 p-4 rounded-2xl bg-gradient-to-br from-purple-50/50 to-transparent border border-purple-100/50 text-center">
            <p className="text-[10px] text-slate-500 italic">
              "Your memories, beautifully curated."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}