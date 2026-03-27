import React from 'react';
// Removed "type Icon as LucideIcon"
import { Trash2, Maximize } from 'lucide-react'; 

const ShapeToolbar = ({ element, setElements, onDelete, openPositionPanel }) => {
  // Broaden the check to include "rect" just in case
  if (!element || (element.type !== "element" && element.type !== "rect")) return null;

  const updateStyle = (updates) => {
    setElements((prev) =>
      prev.map((el) =>
        el.id === element.id
          ? { ...el, style: { ...el.style, ...updates } }
          : el
      )
    );
  };

  const textBtn = "h-8 px-3 rounded-lg text-xs font-bold hover:bg-slate-200 transition text-slate-700 uppercase tracking-wider flex items-center gap-2";

  return (
    <div 
      className="flex items-center gap-3 bg-white border border-slate-200 shadow-xl px-4 py-1.5 rounded-2xl animate-in fade-in slide-in-from-top-2 duration-300"
      onClick={(e) => e.stopPropagation()}
    >
      {/* COLOR PICKER */}
      <div className="flex items-center gap-2 relative">
        <div 
          className="w-6 h-6 rounded-md border border-slate-200" 
          style={{ backgroundColor: element.style?.backgroundColor || '#6366f1' }}
        />
        <input 
          type="color" 
          value={element.style?.backgroundColor || "#6366f1"}
          onChange={(e) => updateStyle({ backgroundColor: e.target.value })}
          className="w-6 h-6 opacity-0 absolute inset-0 cursor-pointer"
        />
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-tight">Color</span>
      </div>

      <div className="w-[1px] h-4 bg-slate-200" />

      {/* OPACITY */}
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-tight">Opacity</span>
        <input 
          type="range" min="0.1" max="1" step="0.01"
          value={element.style?.opacity ?? 1}
          onChange={(e) => updateStyle({ opacity: parseFloat(e.target.value) })}
          className="w-12 h-1 accent-purple-600 cursor-pointer"
        />
      </div>

      <div className="w-[1px] h-4 bg-slate-200" />

      {/* CORNER RADIUS */}
      {!element.elementType?.includes('circle') && (
        <>
          <div className="flex items-center gap-2">
            <Maximize size={14} className="text-slate-400" />
            <input 
              type="range" min="0" max="100"
              value={parseInt(element.style?.borderRadius) || 0}
              onChange={(e) => updateStyle({ borderRadius: `${e.target.value}px` })}
              className="w-10 h-1 accent-slate-400 cursor-pointer"
            />
          </div>
          <div className="w-[1px] h-4 bg-slate-200" />
        </>
      )}

      {/* POSITION */}
      <button onClick={openPositionPanel} className={textBtn}>Pos</button>

      <div className="w-[1px] h-4 bg-slate-200" />

      {/* DELETE */}
      <button 
        onClick={() => onDelete(element.id)} 
        className="p-2 text-slate-400 hover:text-red-500 transition-all hover:scale-110"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
};

export default ShapeToolbar;