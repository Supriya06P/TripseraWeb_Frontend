import { useState } from "react";
import { Search, X, Check, ChevronLeft, Type, Sparkles } from "lucide-react";

export default function FontPanel({
  selectedText,
  setTexts,
  selectedTextId,
  onClose,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const fonts = [
    "Anton", "Montserrat", "Poppins", "Playfair Display", "DM Sans",
    "Roboto", "Inter", "Oswald", "Lora", "Merriweather",
    "Dancing Script", "Pacifico", "Bebas Neue", "Cinzel", "Magnolia Script",
  ];

  const filteredFonts = fonts.filter((font) =>
    font.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const changeFont = (font) => {
    setTexts((prev) =>
      prev.map((t) =>
        t.id === selectedTextId
          ? { ...t, style: { ...t.style, fontFamily: font } }
          : t
      )
    );
  };

  return (
    <div className="w-full h-full bg-white flex flex-col relative overflow-hidden animate-in fade-in slide-in-from-left-4 duration-500">

      {/* --- MATCHING ANIMATED BACKGROUND ELEMENTS --- */}
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-purple-500/40 rounded-full blur-[80px] " />
      <div className="absolute bottom-[-5%] left-[-5%] w-48 h-48 bg-blue-500/40 rounded-full blur-[60px]" />

      {/* Matching Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{ backgroundImage: `radial-gradient(#6366f1 0.5px, transparent 0.5px)`, backgroundSize: '20px 20px' }}>
      </div>

      {/* HEADER - Mirroring TextPanel Header */}
      <div className="px-6 py-5 flex items-center gap-3 border-b border-gray-100 z-10 bg-white/80 backdrop-blur-md">
        <button
          onClick={onClose}
          className="p-1.5 hover:bg-purple-50 rounded-lg text-slate-400 hover:text-purple-600 transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg shadow-md shadow-purple-100">
            <Type className="w-3.5 h-3.5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-base leading-none">Font Family</h3>
            <p className="text-[10px] text-purple-500 font-medium uppercase tracking-wider mt-1">Typography</p>
          </div>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="p-4 z-10">
        <div className="relative group">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-500 transition-colors"
            size={16}
          />
          <input
            type="text"
            placeholder="Search all fonts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 pl-10 pr-10 text-sm focus:outline-none focus:ring-4 focus:ring-purple-50/50 focus:border-purple-300 transition-all placeholder:text-slate-400 shadow-inner"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* FONT LIST */}
      <div className="flex-1 overflow-y-auto px-4 pb-6 z-10 custom-scrollbar">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between mb-4 px-2">
            <div className="flex items-center gap-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">
                {searchTerm ? `Matches for "${searchTerm}"` : "Popular Fonts"}
              </p>
            </div>
            {!searchTerm && <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />}
          </div>

          {filteredFonts.length > 0 ? (
            filteredFonts.map((font) => (
              <button
                key={font}
                onClick={() => changeFont(font)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all border group relative overflow-hidden ${selectedText?.style?.fontFamily === font
                    ? "bg-purple-50/80 border-purple-200 shadow-sm"
                    : "bg-white/40 border-slate-100 hover:border-purple-200 hover:bg-purple-50/40"
                  }`}
              >
                <div className="flex flex-col text-left relative z-10">
                  <span
                    className={`text-lg leading-tight transition-colors ${selectedText?.style?.fontFamily === font
                        ? "text-purple-700 font-semibold"
                        : "text-slate-700 group-hover:text-purple-700"
                      }`}
                    style={{ fontFamily: `'${font}', sans-serif` }}
                  >
                    {font}
                  </span>
                  <span className="text-[9px] text-slate-400 group-hover:text-purple-400 uppercase tracking-tighter mt-1 font-bold">
                    Aa Bb Cc
                  </span>
                </div>

                {selectedText?.style?.fontFamily === font && (
                  <div className="bg-purple-600 rounded-full p-1.5 shadow-lg shadow-purple-200 animate-in zoom-in relative z-10">
                    <Check size={12} className="text-white stroke-[3px]" />
                  </div>
                )}
              </button>
            ))
          ) : (
            <div className="text-center py-20 bg-slate-50/50 rounded-3xl border border-dashed border-slate-200">
              <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                <Search size={20} className="text-slate-300" />
              </div>
              <p className="text-sm text-slate-400 font-medium">No fonts found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
