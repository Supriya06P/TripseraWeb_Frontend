import React from "react";
import { Plus, Type, AlignLeft, Sparkles } from "lucide-react";

const TextOption = ({ label, desc, fontSize, fontWeight, onClick }) => (
  <button
    onClick={onClick}
    className="w-full p-4 mb-3 text-left transition-all duration-300 border group relative overflow-hidden
               bg-white/60 hover:bg-purple-50/80 border-slate-100 hover:border-purple-300 
               rounded-2xl hover:shadow-[0_10px_20px_-10px_rgba(147,51,234,0.2)] active:scale-[0.97]"
  >
    {/* Animated background highlight */}
    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

    <div className="relative z-10">
      <span
        className="block text-slate-700 group-hover:text-purple-700 transition-colors leading-tight"
        style={{ fontSize, fontWeight }}
      >
        {label}
      </span>
      <span className="text-[9px] text-slate-400 group-hover:text-purple-400 uppercase tracking-[0.2em] font-bold mt-2 flex items-center gap-2">
        <span className="h-[1px] w-3 bg-slate-200 group-hover:bg-purple-300 transition-all" />
        {desc}
      </span>
    </div>
  </button>
);

const TextPanel = ({ onAddText }) => {
  return (
    <div className="flex flex-col h-full bg-[#fdfdfd] relative overflow-hidden">

      {/* --- ANIMATED BACKGROUND ELEMENTS --- */}
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
            <Type className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-black bg-gradient-to-r from-purple-800 to-purple-600 bg-clip-text text-transparent tracking-tight">
              Text
            </h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Styles & Presets</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">

          {/* Neon Animated Add Button */}
          <button
            onClick={() => onAddText?.("body", "Click to edit text")}
            className="w-full py-3.5 mb-8 relative group overflow-hidden rounded-xl transition-all active:scale-95 shadow-lg shadow-purple-100"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-500 group-hover:scale-105 transition-transform" />
            <div className="relative z-10 flex items-center justify-center gap-2 text-white font-bold text-sm">
              <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
              Add text box
            </div>
          </button>

          <div className="space-y-1">
            <div className="flex items-center justify-between mb-4 px-1">
              <div className="flex items-center gap-2">
                <AlignLeft className="w-3 h-3 text-purple-400" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Quick Add</p>
              </div>
              <Sparkles className="w-5 h-5 text-purple-500 " />
            </div>

            <TextOption
              label="Add a Heading"
              desc="Headline • 40px"
              fontSize="19px"
              fontWeight="800"
              onClick={() => onAddText?.("heading", "Add a heading")}
            />

            <TextOption
              label="Add Subheading"
              desc="Subtitle • 24px"
              fontSize="15px"
              fontWeight="600"
              onClick={() => onAddText?.("subheading", "Add a subheading")}
            />

            <TextOption
              label="Add Body Text"
              desc="Paragraph • 16px"
              fontSize="13px"
              fontWeight="500"
              onClick={() => onAddText?.("body", "Add body text")}
            />
          </div>

          {/* Animated Glass Footer */}
          <div className="mt-8 p-4 rounded-2xl bg-gradient-to-br from-purple-50/50 to-transparent border border-purple-100/50 relative group">
            <p className="text-[10px] text-slate-500 leading-relaxed text-center group-hover:text-purple-600 transition-colors italic">
              "Typography is the visual component of the written word."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextPanel;