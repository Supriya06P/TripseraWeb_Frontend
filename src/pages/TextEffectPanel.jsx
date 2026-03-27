import React, { useState, useEffect } from "react";
import { Check, ChevronLeft, Sparkles, Wand2, Layers } from "lucide-react";

export default function TextEffectPanel({
  selectedText,
  setTexts,
  selectedTextId,
  onClose,
}) {
  if (!selectedText) return null;

  const [thickness, setThickness] = useState(
    parseInt(selectedText?.style?.strokeWidth) || 0
  );

  useEffect(() => {
    setThickness(parseInt(selectedText?.style?.strokeWidth) || 0);
  }, [selectedTextId, selectedText?.style?.strokeWidth]);

  const resetStyles = {
    textShadow: "none",
    WebkitTextStroke: "0px transparent",
    filter: "none",
    opacity: 1,
    letterSpacing: "normal",
    transform: "none",
    color: selectedText?.style?.color || "#000000",
  };

  const effects = [
    { name: "None", style: {} },
    { name: "Shadow", style: { textShadow: "4px 4px 8px rgba(0,0,0,0.4)" } },
    { name: "Lift", style: { textShadow: "0 12px 20px rgba(0,0,0,0.35)" } },
    { name: "Glow", style: { textShadow: "0 0 8px #3b82f6, 0 0 16px #3b82f6" } },
    { name: "Neon", style: { color: "#fff", textShadow: "0 0 5px #0ff, 0 0 15px #0ff" } },
    { name: "Outline", style: { WebkitTextStroke: "2px black" } },
    { name: "Hollow", style: { WebkitTextStroke: "2px black", color: "transparent" } },
    { name: "3D", style: { textShadow: "1px 1px 0 #ccc, 2px 2px 0 #bbb" } },
    { name: "Blur", style: { filter: "blur(2px)" } },
  ];

  const updateStyles = (updates) => {
    setTexts((prev) =>
      prev.map((t) =>
        t.id === selectedTextId
          ? { ...t, style: { ...t.style, ...updates }, ...updates }
          : t
      )
    );
  };

  return (
    <div className="w-full h-full bg-white flex flex-col relative overflow-hidden animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-purple-500/30 rounded-full blur-[80px]" />
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{ backgroundImage: `radial-gradient(#6366f1 0.5px, transparent 0.5px)`, backgroundSize: '20px 20px' }} />

      {/* FIXED HEADER */}
      <div className="px-6 py-5 flex items-center gap-3 border-b border-gray-100 z-20 bg-white/80 backdrop-blur-md">
        <button onClick={onClose} className="p-1.5 hover:bg-purple-50 rounded-lg text-slate-400 hover:text-purple-600 transition-colors">
          <ChevronLeft size={20} />
        </button>
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg shadow-md shadow-purple-100">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-base leading-none">Effects</h3>
            <p className="text-[10px] text-purple-500 font-medium uppercase tracking-wider mt-1">Appearance</p>
          </div>
        </div>
      </div>

      {/* SCROLLABLE AREA */}
      <div className="flex-1 overflow-y-auto px-4 py-6 z-10 custom-scrollbar space-y-8">
        {/* Style Presets */}
        <div>
          <div className="flex items-center justify-between mb-4 px-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">Presets</p>
            <Wand2 className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {effects.map((effect) => (
              <button
                key={effect.name}
                onClick={() => updateStyles({ ...resetStyles, ...effect.style, activeEffect: effect.name })}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl transition-all border group relative ${selectedText?.activeEffect === effect.name
                    ? "bg-purple-50/80 border-purple-200 shadow-sm"
                    : "bg-white/40 border-slate-100 hover:border-purple-200 hover:bg-purple-50/40"
                  }`}
              >
                <div className="text-2xl font-bold mb-2 group-hover:scale-110 transition-transform" style={effect.style}>Ag</div>
                <span className={`text-[10px] font-bold uppercase ${selectedText?.activeEffect === effect.name ? "text-purple-700" : "text-slate-400"}`}>
                  {effect.name}
                </span>
                {selectedText?.activeEffect === effect.name && (
                  <div className="absolute top-2 right-2 bg-purple-600 rounded-full p-1"><Check size={8} className="text-white stroke-[4px]" /></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Stroke Control */}
        <div className="bg-white/40 border border-slate-100 p-5 rounded-3xl shadow-sm backdrop-blur-sm mx-1">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-purple-500" />
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Stroke</p>
            </div>
            <span className="px-2 py-0.5 rounded-lg text-[10px] font-black bg-purple-600 text-white shadow-md shadow-purple-100">{thickness}px</span>
          </div>
          <input
            type="range" min="0" max="15" value={thickness}
            onChange={(e) => {
              const val = Number(e.target.value);
              setThickness(val);
              updateStyles({ WebkitTextStroke: `${val}px black`, strokeWidth: val });
            }}
            className="w-full h-1.5 bg-purple-100 rounded-lg appearance-none cursor-pointer accent-purple-600"
          />
        </div>
      </div>
    </div>
  );
}