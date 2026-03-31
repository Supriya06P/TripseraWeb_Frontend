import React, { useState, useRef, useEffect } from 'react';
import { 
  Trash2, 
  Filter, 
  FlipHorizontal, 
  FlipVertical, 
  Maximize,
  Square,
  ChevronDown,
  RefreshCw 
} from 'lucide-react';

const ImageToolbar = ({ 
  element, 
  setElements, 
  onDelete, 
  openFiltersPanel, 
  openPositionPanel,
  openImagePanel 
}) => {
  const [showBorderMenu, setShowBorderMenu] = useState(false);
  const borderMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (borderMenuRef.current && !borderMenuRef.current.contains(e.target)) {
        setShowBorderMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!element || element.type !== "image") return null;

  const updateStyle = (updates) => {
    setElements((prev) =>
      prev.map((el) =>
        el.id === element.id
          ? { ...el, style: { ...el.style, ...updates } }
          : el
      )
    );
  };

  const handleFlip = (axis) => {
    const currentScaleX = element.style?.transform?.includes('scaleX(-1)') ? -1 : 1;
    const currentScaleY = element.style?.transform?.includes('scaleY(-1)') ? -1 : 1;
    if (axis === 'x') {
      const newScaleX = currentScaleX === 1 ? -1 : 1;
      updateStyle({ transform: `scaleX(${newScaleX}) scaleY(${currentScaleY})` });
    } else {
      const newScaleY = currentScaleY === 1 ? -1 : 1;
      updateStyle({ transform: `scaleX(${currentScaleX}) scaleY(${newScaleY})` });
    }
  };

  const textBtn = "h-8 px-3 rounded-lg text-xs font-bold hover:bg-slate-200 transition text-slate-700 uppercase tracking-wider flex items-center gap-2";

  return (
    <div 
      className="flex items-center gap-3 bg-white border border-slate-200 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.2)] px-4 py-1.5 rounded-2xl animate-in fade-in slide-in-from-top-2 duration-300"
      onClick={(e) => e.stopPropagation()}
    >
      {/* BORDER MENU */}
      <div className="relative" ref={borderMenuRef}>
        <button 
          onClick={() => setShowBorderMenu(!showBorderMenu)}
          className={`${textBtn} ${showBorderMenu ? 'bg-slate-100' : ''}`}
        >
          <Square size={14} className="text-slate-500" />
          Border
          <ChevronDown size={12} className={`transition-transform ${showBorderMenu ? 'rotate-180' : ''}`} />
        </button>

        {showBorderMenu && (
          <div className="absolute top-12 left-0 bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl rounded-2xl p-4 z-[1100] w-64 animate-in zoom-in-95 duration-200 ring-1 ring-black/5">
            <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-3">Border Settings</p>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Color</span>
                <input 
                  type="color" 
                  value={element.style?.borderColor || "#000000"}
                  onChange={(e) => updateStyle({ borderColor: e.target.value, borderStyle: element.style?.borderStyle || 'solid' })}
                  className="w-8 h-8 rounded-lg cursor-pointer border border-slate-200 p-0 overflow-hidden"
                />
              </div>
              <div>
                <div className="flex justify-between text-[10px] text-slate-500 mb-1 font-bold">
                  <span>WEIGHT</span>
                  <span>{parseInt(element.style?.borderWidth) || 0}px</span>
                </div>
                <input 
                  type="range" min="0" max="20"
                  value={parseInt(element.style?.borderWidth) || 0}
                  onChange={(e) => updateStyle({ borderWidth: `${e.target.value}px`, borderStyle: element.style?.borderStyle || 'solid' })}
                  className="w-full accent-purple-600 h-1.5 bg-slate-200/50 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div className="flex gap-1 bg-slate-200/30 p-1 rounded-lg">
                {['solid', 'dashed', 'dotted'].map((style) => (
                  <button
                    key={style}
                    onClick={() => updateStyle({ borderStyle: style })}
                    className={`flex-1 py-1 text-[10px] font-bold rounded capitalize transition ${element.style?.borderStyle === style ? 'bg-white shadow-sm text-purple-600' : 'text-slate-600 hover:text-slate-800'}`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="w-[1px] h-4 bg-slate-200" />

      {/* OPACITY */}
      <div className="flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-tight">Opacity</span>
        <input 
          type="range" min="0.1" max="1" step="0.01"
          value={element.style?.opacity ?? 1}
          onChange={(e) => updateStyle({ opacity: parseFloat(e.target.value) })}
          className="w-12 h-1 accent-purple-600 cursor-pointer"
        />
      </div>

      <div className="w-[1px] h-4 bg-slate-200" />

      {/* FLIPS */}
      <div className="flex items-center gap-0.5">
        <button onClick={() => handleFlip('x')} className="p-1.5 hover:bg-slate-100 rounded-md text-slate-600" title="Flip Horizontal"><FlipHorizontal size={14} /></button>
        <button onClick={() => handleFlip('y')} className="p-1.5 hover:bg-slate-100 rounded-md text-slate-600" title="Flip Vertical"><FlipVertical size={14} /></button>
      </div>

      <div className="w-[1px] h-4 bg-slate-200" />

      {/* RADIUS */}
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

      {/* POSITION PANEL */}
      <button onClick={openPositionPanel} className={textBtn}>Pos</button>

      <div className="w-[1px] h-4 bg-slate-200" />

      {/* FILTERS (Moved here after Pos) */}
      <button 
        onClick={openFiltersPanel} 
        className={`${textBtn} group hover:text-purple-600`}
      >
        <Filter size={14} className="text-slate-400 group-hover:text-purple-600 transition-colors" />
        Filters
      </button>

      <div className="w-[1px] h-4 bg-slate-200 mx-1" />

      {/* REPLACE BUTTON */}
      <button 
        onClick={openImagePanel}
        className="p-2 text-slate-400 hover:text-purple-600 transition-all hover:scale-110"
        title="Replace Image"
      >
        <RefreshCw size={14} />
      </button>

      {/* DELETE BUTTON */}
      <button 
        onClick={() => onDelete(element.id)} 
        className="p-2 text-slate-400 hover:text-red-500 transition-all hover:scale-110"
        title="Delete"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
};

export default ImageToolbar;
