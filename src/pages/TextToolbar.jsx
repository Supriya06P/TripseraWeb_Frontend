import React, { useState, useRef, useEffect } from "react";
import {
  Bold,
  Italic,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Trash2,
  PaintBucket,
  Maximize,
  Layers,
  MoveDiagonal,
} from "lucide-react";

const TextToolbar = ({
  element,
  setElements,
  onDelete,
  openFontPanel,
  openEffectsPanel,
  openPositionPanel, activePanel
}) => {
  const [showBgMenu, setShowBgMenu] = useState(false);
  const bgMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (bgMenuRef.current && !bgMenuRef.current.contains(e.target)) setShowBgMenu(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!element || element.type !== "text") return null;

  const handleToolbarAction = (e) => {
    e.stopPropagation();
  };

  const updateStyle = (updates) => {
    setElements((prev) =>
      prev.map((el) =>
        el.id === element.id
          ? { ...el, style: { ...el.style, ...updates } }
          : el
      )
    );
  };

  // --- Helper Functions for RGBA Handling ---
  const hexToRgba = (hex, alpha = 1) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const getAlphaFromRgba = (rgbaString) => {
    if (!rgbaString || !rgbaString.startsWith("rgba")) return 1;
    const alpha = rgbaString.split(",")[3].replace(")", "").trim();
    return parseFloat(alpha);
  };

  const rgbaToHex = (rgbaString) => {
    if (!rgbaString || !rgbaString.startsWith("rgba")) return rgbaString || "#ffffff";
    const parts = rgbaString.match(/\d+/g);
    const r = parseInt(parts[0]).toString(16).padStart(2, "0");
    const g = parseInt(parts[1]).toString(16).padStart(2, "0");
    const b = parseInt(parts[2]).toString(16).padStart(2, "0");
    return `#${r}${g}${b}`;
  };

  const handleAlphaChange = (newAlpha) => {
    const currentBg = element.style?.backgroundColor || "#ffffff";
    const hex = currentBg.startsWith("rgba") ? rgbaToHex(currentBg) : currentBg;
    updateStyle({ backgroundColor: hexToRgba(hex, newAlpha) });
  };

  const handleBgColorChange = (newHex) => {
    const currentAlpha = getAlphaFromRgba(element.style?.backgroundColor);
    updateStyle({ backgroundColor: hexToRgba(newHex, currentAlpha) });
  };

  // Helper for button styling
  const iconBtn = (active) =>
    `h-8 w-8 flex items-center justify-center rounded-md transition-all 
     ${active ? "bg-purple-600 text-white shadow-md scale-105" : "text-slate-600 hover:bg-slate-200"}`;

  const textBtn = "h-8 px-3 rounded-lg text-xs font-bold hover:bg-slate-200 transition text-slate-700 uppercase tracking-wider";

  return (
    <div
      className="flex items-center gap-3 bg-white border border-slate-200 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.2)] px-4 py-1.5 rounded-2xl animate-in fade-in slide-in-from-top-2 duration-300"
      onMouseDown={handleToolbarAction}
      onClick={(e) => e.stopPropagation()}
    >
      {/* FONT FAMILY */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          openFontPanel();
        }}
        className="h-8 px-3 bg-slate-50 border border-slate-100 rounded-lg text-[11px] font-bold flex items-center gap-2 hover:border-purple-400 transition shadow-sm"
      >
        <span className="truncate max-w-[90px] text-slate-700">{element.style?.fontFamily || "Sans-serif"}</span>
        <span className="text-[10px] text-purple-600">▼</span>
      </button>

      {/* FONT SIZE */}
      <div className="flex items-center bg-slate-50 border border-slate-100 rounded-lg overflow-hidden h-8">
        <button
          className="px-2 hover:bg-purple-100 text-slate-500 transition"
          onClick={() => updateStyle({ fontSize: `${Math.max(8, (parseInt(element.style?.fontSize) || 16) - 2)}px` })}
        > − </button>
        <input
          type="number"
          value={parseInt(element.style?.fontSize) || 16}
          onChange={(e) => updateStyle({ fontSize: `${e.target.value}px` })}
          className="w-8 text-center text-xs font-black outline-none border-none bg-transparent text-slate-700"
        />
        <button
          className="px-2 hover:bg-purple-100 text-slate-500 transition"
          onClick={() => updateStyle({ fontSize: `${(parseInt(element.style?.fontSize) || 16) + 2}px` })}
        > + </button>
      </div>

      <div className="w-[1px] h-4 bg-slate-200 mx-1" />

      {/* STYLE & ALIGNMENT */}
      <div className="flex items-center gap-1">
        <button
          className={iconBtn(element.style?.fontWeight === "bold" || element.style?.fontWeight === "800")}
          onClick={() => updateStyle({ fontWeight: element.style?.fontWeight === "bold" ? "400" : "bold" })}
        >
          <Bold size={14} />
        </button>
        <button
          className={iconBtn(element.style?.fontStyle === "italic")}
          onClick={() => updateStyle({ fontStyle: element.style?.fontStyle === "italic" ? "normal" : "italic" })}
        >
          <Italic size={14} />
        </button>
        <button className={iconBtn(false)} onClick={() => {
          const aligns = ["left", "center", "right"];
          const next = aligns[(aligns.indexOf(element.style?.textAlign || "left") + 1) % aligns.length];
          updateStyle({ textAlign: next });
        }}>
          {element.style?.textAlign === "center" ? <AlignCenter size={14} /> :
            element.style?.textAlign === "right" ? <AlignRight size={14} /> : <AlignLeft size={14} />}
        </button>
      </div>

      <div className="w-[1px] h-4 bg-slate-200 mx-1" />

      {/* TEXT COLOR CIRCLE */}
      <input
        type="color"
        value={element.style?.color || "#000000"}
        onChange={(e) => updateStyle({ color: e.target.value })}
        className="w-6 h-6 rounded-full cursor-pointer border-2 border-white shadow-md p-0 overflow-hidden shrink-0"
        title="Text Color"
      />

      {/* ADVANCED BACKGROUND & BORDER MENU */}
      <div className="relative" ref={bgMenuRef}>
        <button
          onClick={() => setShowBgMenu(!showBgMenu)}
          className={iconBtn(showBgMenu)}
          title="Background & Border"
        >
          <PaintBucket size={14} style={{ color: element.style?.backgroundColor !== 'transparent' ? element.style?.backgroundColor : '#64748b' }} />
        </button>

        {showBgMenu && (
          <div className="absolute top-12 left-0 bg-white border border-slate-200 shadow-2xl rounded-2xl p-4 z-[1100] w-64 animate-in zoom-in-95 duration-200 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Backdrop Style</p>
              <button
                onClick={() => updateStyle({ backgroundColor: "transparent", border: "none", borderRadius: "0px", padding: "0px" })}
                className="text-[9px] text-red-500 font-bold hover:underline"
              >RESET</button>
            </div>

            <div className="space-y-4">
              {/* Background Color & Background Opacity */}
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={rgbaToHex(element.style?.backgroundColor)}
                  onChange={(e) => handleBgColorChange(e.target.value)}
                  className="w-10 h-10 rounded-xl cursor-pointer shadow-sm border border-slate-100"
                />
                <div className="flex-1">
                  <div className="flex justify-between text-[10px] text-slate-500 mb-1 font-bold uppercase">
                    <span>BG Opacity</span>
                    <span>{Math.round(getAlphaFromRgba(element.style?.backgroundColor) * 100)}%</span>
                  </div>
                  <input
                    type="range" min="0" max="1" step="0.01"
                    value={getAlphaFromRgba(element.style?.backgroundColor)}
                    onChange={(e) => handleAlphaChange(e.target.value)}
                    className="w-full accent-purple-600 h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Corner Curve */}
              <div>
                <div className="flex justify-between text-[10px] text-slate-500 mb-1 font-bold uppercase">
                  <span className="flex items-center gap-1"><Maximize size={10} /> Corner Curve</span>
                  <span>{parseInt(element.style?.borderRadius) || 0}px</span>
                </div>
                <input
                  type="range" min="0" max="100"
                  value={parseInt(element.style?.borderRadius) || 0}
                  onChange={(e) => updateStyle({ borderRadius: `${e.target.value}px` })}
                  className="w-full accent-purple-600 h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Border Thickness */}
              <div>
                <div className="flex justify-between text-[10px] text-slate-500 mb-1 font-bold uppercase">
                  <span className="flex items-center gap-1"><Layers size={10} /> Border Thickness</span>
                  <span>{parseInt(element.style?.borderWidth) || 0}px</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={element.style?.borderColor || "#000000"}
                    onChange={(e) => updateStyle({ borderColor: e.target.value, borderStyle: 'solid' })}
                    className="w-6 h-6 rounded-full cursor-pointer shadow-sm border border-white shrink-0"
                  />
                  <input
                    type="range" min="0" max="20"
                    value={parseInt(element.style?.borderWidth) || 0}
                    onChange={(e) => updateStyle({ borderWidth: `${e.target.value}px`, borderStyle: 'solid' })}
                    className="w-full accent-purple-600 h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Internal Spacing */}
              <div>
                <div className="flex justify-between text-[10px] text-slate-500 mb-1 font-bold uppercase">
                  <span className="flex items-center gap-1"><MoveDiagonal size={10} /> Internal Spacing</span>
                  <span>{parseInt(element.style?.padding) || 0}px</span>
                </div>
                <input
                  type="range" min="0" max="50"
                  value={parseInt(element.style?.padding) || 0}
                  onChange={(e) => updateStyle({ padding: `${e.target.value}px` })}
                  className="w-full accent-purple-600 h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="w-[1px] h-4 bg-slate-200 mx-1" />

      {/* EXTERNAL PANELS */}
      <button
        onClick={openEffectsPanel}
        className={`${textBtn} ${activePanel === 'effects' ? 'bg-purple-100 text-purple-700' : ''}`}
      >
        Effects
      </button>
      <button onClick={openPositionPanel} className={textBtn}>Pos</button>

      <button
        onClick={() => onDelete(element.id)}
        className="ml-2 p-2 text-slate-400 hover:text-red-500 transition-all hover:scale-110"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
};

export default TextToolbar;