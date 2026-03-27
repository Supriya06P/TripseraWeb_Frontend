import React from "react";
import { Sliders, RotateCcw, Zap } from "lucide-react";

// 1. Define Filter Configurations
const FILTER_CONFIG = [
  { label: "Brightness", k: "brightness", min: 0, max: 200, unit: "%", default: 100 },
  { label: "Contrast", k: "contrast", min: 0, max: 200, unit: "%", default: 100 },
  { label: "Saturation", k: "saturate", min: 0, max: 200, unit: "%", default: 100 },
  { label: "Hue Rotate", k: "hueRotate", min: 0, max: 360, unit: "deg", default: 0 },
  { label: "Blur", k: "blur", min: 0, max: 10, unit: "px", default: 0 },
  { label: "Grayscale", k: "grayscale", min: 0, max: 100, unit: "%", default: 0 },
  { label: "Sepia", k: "sepia", min: 0, max: 100, unit: "%", default: 0 },
];

// 2. Define Presets (One-click professional looks)
const PRESETS = {
  Default: { brightness: 100, contrast: 100, saturate: 100, hueRotate: 0, blur: 0, grayscale: 0, sepia: 0 },
  Vintage: { brightness: 90, contrast: 120, saturate: 80, sepia: 50 },
  Dramatic: { brightness: 110, contrast: 150, saturate: 130 },
  "B & W": { grayscale: 100, contrast: 120 },
  Soft: { blur: 1, brightness: 105, saturate: 90 }
};

const ImageFilterPanel = ({ selectedElement, setElements, onClose }) => {
  if (!selectedElement) return null;

  const currentFilters = selectedElement.style?.filterData || 
    FILTER_CONFIG.reduce((acc, f) => ({ ...acc, [f.k]: f.default }), {});

  const applyFilters = (newFilterData) => {
    // Merge new data with defaults to ensure a complete object
    const mergedData = { ...currentFilters, ...newFilterData };
    
    const filterString = `
      brightness(${mergedData.brightness}%) 
      contrast(${mergedData.contrast}%) 
      saturate(${mergedData.saturate}%) 
      hue-rotate(${mergedData.hueRotate}deg)
      blur(${mergedData.blur}px)
      grayscale(${mergedData.grayscale}%)
      sepia(${mergedData.sepia}%)
    `.replace(/\s+/g, ' ').trim();

    setElements((prev) =>
      prev.map((el) =>
        el.id === selectedElement.id
          ? { ...el, style: { ...el.style, filter: filterString, filterData: mergedData } }
          : el
      )
    );
  };

  return (
    <div className="p-5 flex flex-col h-full bg-white select-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-purple-100 rounded-lg">
            <Sliders className="w-4 h-4 text-purple-600" />
          </div>
          <h3 className="font-bold text-slate-800 tracking-tight">Image Filters</h3>
        </div>
        <button 
          onClick={() => applyFilters(PRESETS.Default)}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          title="Reset all"
        >
          <RotateCcw className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      {/* Presets Section */}
      <div className="mb-8">
        <div className="flex items-center gap-1.5 mb-3">
          <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Quick Presets</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
          {Object.keys(PRESETS).map((name) => (
            <button
              key={name}
              onClick={() => applyFilters(PRESETS[name])}
              className="px-3 py-1.5 rounded-full border border-slate-200 text-[10px] font-bold whitespace-nowrap hover:border-purple-400 hover:text-purple-600 transition-all"
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Sliders */}
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-6">
        {FILTER_CONFIG.map((config) => (
          <div key={config.k} className="group">
            <div className="flex justify-between items-center mb-2">
              <label className="text-[10px] font-bold uppercase text-slate-500 group-hover:text-slate-800 transition-colors">
                {config.label}
              </label>
              <span className="text-[10px] font-mono font-bold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">
                {currentFilters[config.k]}{config.unit}
              </span>
            </div>
            <input
              type="range"
              min={config.min}
              max={config.max}
              step={config.k === 'blur' ? 0.1 : 1}
              value={currentFilters[config.k]}
              onChange={(e) => applyFilters({ [config.k]: parseFloat(e.target.value) })}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-purple-600 hover:accent-purple-700 transition-all"
            />
          </div>
        ))}
      </div>

      <button
        onClick={onClose}
        className="mt-6 w-full py-3.5 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-[0.2em] hover:bg-purple-600 transition-all shadow-xl shadow-purple-100"
      >
        Save Adjustments
      </button>
    </div>
  );
};

export default ImageFilterPanel;