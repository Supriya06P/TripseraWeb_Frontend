import React, { useState } from "react";
import { ImageIcon, Search, Plus, Sparkles } from "lucide-react";

// Automatically grabs images from the specified folder structure
const imageModules = import.meta.glob("/src/assets/images/*.{png,jpg,jpeg,svg}", { eager: true });

const localAssets = Object.entries(imageModules).map(([path, module], index) => ({
  id: index,
  url: module.default,
  alt: path.split('/').pop().split('.')[0], // Cleaner alt text from filename
}));

const ImagePanel = ({ onAddImage }) => {
  const [search, setSearch] = useState("");

  const filteredAssets = localAssets.filter((img) =>
    img.alt.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-[#FCFCFD] relative overflow-hidden">

      {/* --- ANIMATED PURPLE BLOBS --- */}
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-purple-500/40 rounded-full blur-[80px] " />
      <div className="absolute bottom-[-5%] left-[-5%] w-48 h-48 bg-blue-500/40 rounded-full blur-[60px]" />

      {/* Mesh Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h1v1H0V0zm10 10h1v1h-1v-1zm10 10h1v1h-1v-1zm10 10h1v1h-1v-1z' fill='%236366f1' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")` }}>
      </div>

      <div className="relative z-10 p-5 flex flex-col h-full">

        {/* Header Section */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg shadow-purple-200">
            <ImageIcon className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-black bg-gradient-to-r from-blue-800 to-purple-600 bg-clip-text text-transparent tracking-tight">
              Gallery
            </h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Local Assets</p>
          </div>
        </div>

        {/* Search Input with Purple Glow */}
        <div className="relative mb-6 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-purple-500 transition-colors" />
          <input
            type="text"
            placeholder="Search images..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-slate-100 rounded-xl py-2.5 pl-10 pr-4 text-xs shadow-sm focus:outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-500/5 transition-all"
          />
        </div>

        {/* Image Grid Area */}
        <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
              {filteredAssets.length} Results
            </p>
            <Sparkles className="w-5 h-5 text-purple-500 " />
          </div>

          <div className="grid grid-cols-2 gap-3 pb-6">
            {filteredAssets.map((img) => (
              <div
                key={img.id}
                onClick={() => onAddImage?.(img.url)}
                className="group relative aspect-square bg-white rounded-2xl overflow-hidden cursor-pointer border border-slate-100 hover:border-purple-300 transition-all shadow-sm hover:shadow-xl hover:shadow-purple-500/10 active:scale-95"
              >
                {/* Image Component */}
                <img
                  src={img.url}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Purple Overlay & Plus Icon */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <Plus className="text-purple-600 w-5 h-5" />
                  </div>
                </div>

                {/* Subtle Shimmer Sweep */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[100%] group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredAssets.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-xs text-slate-400 font-medium">No images match your search.</p>
            </div>
          )}
        </div>

        {/* Informational Footer */}
        <div className="mt-auto py-4 border-t border-slate-50">
          <div className="bg-purple-50/50 rounded-xl p-3 border border-purple-100">
            <p className="text-[10px] text-purple-700 font-semibold text-center italic">
              Tip: High-quality assets make for better flyers!
            </p>
          </div>
        </div>
      </div>

      <style >{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default ImagePanel;
