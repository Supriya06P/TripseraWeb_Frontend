import React from "react";
import {
  Square, Circle, Triangle, Hexagon,
  Star, Minus, Search, Cloud, Sparkles, Box
} from "lucide-react";

const ElementsPanel = ({ onAddElement }) => {
  const shapes = [
    { id: "rect", type: "rectangle", icon: Square, label: "Square" },
    { id: "circle", type: "circle", icon: Circle, label: "Circle" },
    { id: "triangle", type: "triangle", icon: Triangle, label: "Triangle" },
    { id: "hex", type: "hexagon", icon: Hexagon, label: "Hexagon" },
    { id: "star", type: "star", icon: Star, label: "Star" },
    { id: "line", type: "line", icon: Minus, label: "Line" },
  ];

  const textHighlights = [
    { id: "h1", label: "Offer", type: "highlight", content: "50% OFF", color: "#ef4444" },
    { id: "h2", label: "New", type: "highlight", content: "NEW ARRIVAL", color: "#9333ea" },
    { id: "h3", label: "Booking", type: "highlight", content: "BOOK NOW", color: "#0f172a" },
    { id: "h4", label: "Price", type: "highlight", content: "ONLY $99", color: "#16a34a" },
    { id: "h5", label: "Urgency", type: "highlight", content: "LIMITED TIME", color: "#f59e0b" },
    { id: "h6", label: "Flash", type: "highlight", content: "HOT DEAL", color: "#dc2626" },
    { id: "h7", label: "Travel", type: "highlight", content: "FLY TODAY", color: "#0284c7" },
    { id: "h8", label: "Promo", type: "highlight", content: "GET PROMO", color: "#4f46e5" },
  ];

  return (
    <div className="flex flex-col h-full bg-[#fdfdfd] relative overflow-hidden">

      {/* --- ANIMATED BACKGROUND ELEMENTS (Matching TextPanel) --- */}
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-purple-500/40 rounded-full blur-[80px] " />
      <div className="absolute bottom-[-5%] left-[-5%] w-48 h-48 bg-blue-500/40 rounded-full blur-[60px]" />

      {/* Moving Purple Mesh Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2v-4h4v-2h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2v-4h4v-2H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}>
      </div>

      <div className="relative z-10 p-6 flex flex-col h-full">
        {/* Header with Gradient Text */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2.5 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg shadow-purple-200">
            <Box className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-black bg-gradient-to-r from-purple-800 to-purple-600 bg-clip-text text-transparent tracking-tight">
              Elements
            </h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Shapes & Graphics</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">

          {/* Search bar matching your theme */}
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search elements..."
              className="w-full bg-white/60 border border-slate-100 rounded-xl py-3 pl-10 pr-4 text-xs outline-none focus:border-purple-300 transition-all shadow-sm"
            />
          </div>

          {/* --- SHAPES SECTION (3 Columns) --- */}
          <section className="mb-10">
            <div className="flex items-center justify-between mb-4 px-1">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Geometric</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {shapes.map((shape) => (
                <button
                  key={shape.id}
                  onClick={() => onAddElement(shape.type)}
                  className="group relative aspect-square flex flex-col items-center justify-center transition-all duration-300 border
                             bg-white/60 hover:bg-purple-50/80 border-slate-100 hover:border-purple-300 
                             rounded-2xl hover:shadow-[0_10px_20px_-10px_rgba(147,51,234,0.2)] active:scale-95 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-purple-500/5 to-purple-500/0 translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-700" />
                  <shape.icon className="w-6 h-6 text-slate-600 group-hover:text-purple-600 transition-colors relative z-10" />
                  <span className="text-[9px] text-slate-400 group-hover:text-purple-500 font-bold mt-2 relative z-10 uppercase tracking-tighter">
                    {shape.label}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* --- BADGES SECTION (2 Columns) --- */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4 px-1">
              <div className="h-[1px] w-3 bg-purple-300" />
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Marketing Badges</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {textHighlights.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onAddElement(item.type, item.content, item.color)}
                  className="group relative p-4 flex flex-col items-center justify-center transition-all duration-300 border
                             bg-white/60 hover:bg-purple-50/80 border-slate-100 hover:border-purple-300 
                             rounded-2xl hover:shadow-[0_10px_20px_-10px_rgba(147,51,234,0.2)] active:scale-95 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                  <div
                    style={{ backgroundColor: item.color }}
                    className="relative z-10 px-2 py-0.5 rounded text-[8px] font-black text-white mb-2 shadow-sm uppercase tracking-tighter"
                  >
                    {item.content}
                  </div>
                  <span className="relative z-10 text-[9px] text-slate-400 group-hover:text-purple-700 font-bold uppercase tracking-tight transition-colors">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* Animated Glass Footer (Matching TextPanel) */}
          <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-purple-50/50 to-transparent border border-purple-100/50 relative group">
            <p className="text-[10px] text-slate-500 leading-relaxed text-center group-hover:text-purple-600 transition-colors italic">
              "Visual elements guide the traveler's eye."
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ElementsPanel;
