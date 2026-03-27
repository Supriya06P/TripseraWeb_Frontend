import React, { useState, useEffect } from "react";
import {
  X, AlignLeft, AlignCenter, AlignRight,
  AlignVerticalSpaceAround, AlignHorizontalSpaceAround,
  Layers, Move, ChevronLeft
} from "lucide-react";

export default function PositionPanel({
  selectedText,
  setTexts, // Ensure this is the setter for your UNIFIED elements array
  selectedTextId,
  canvasSize = { width: 400, height: 560 },
  onClose
}) {
  if (!selectedText || !selectedTextId) {
    return (
      <div className="w-full h-full flex items-center justify-center p-8 text-center text-slate-400 italic">
        Select an element to adjust position
      </div>
    );
  }

  const [localValues, setLocalValues] = useState({
    x: Math.round(selectedText?.x || 0),
    y: Math.round(selectedText?.y || 0),
    width: Math.round(selectedText?.width || 0),
    height: Math.round(selectedText?.height || 0),
    rotation: Math.round(selectedText?.rotation || 0)
  });

  useEffect(() => {
    if (selectedText) {
      setLocalValues({
        x: Math.round(selectedText.x || 0),
        y: Math.round(selectedText.y || 0),
        width: Math.round(selectedText.width || 0),
        height: Math.round(selectedText.height || 0),
        rotation: Math.round(selectedText.rotation || 0)
      });
    }
  }, [selectedText]);

  const commitUpdate = (updates) => {
    if (!selectedTextId) return;
    setTexts(prev =>
      prev.map(t => (t.id === selectedTextId ? { ...t, ...updates } : t))
    );
  };

  const handleBlur = (key, value) => {
    let val = parseFloat(value);
    if (isNaN(val)) val = 0;
    if (key === "width" || key === "height") val = Math.max(10, val);
    commitUpdate({ [key]: val });
  };

  // Alignment Logic
  const alignLeft = () => commitUpdate({ x: 0 });
  const alignRight = () => commitUpdate({ x: canvasSize.width - (selectedText?.width || 0) });
  const alignTop = () => commitUpdate({ y: 0 });
  const alignBottom = () => commitUpdate({ y: canvasSize.height - (selectedText?.height || 0) });
  const alignCenterH = () => commitUpdate({ x: (canvasSize.width / 2) - ((selectedText?.width || 0) / 2) });
  const alignCenterV = () => commitUpdate({ y: (canvasSize.height / 2) - ((selectedText?.height || 0) / 2) });

  // --- REFINED LAYER ORDERING LOGIC ---

  const bringToFront = () => {
    setTexts(prev => {
      const current = prev.find(t => t.id === selectedTextId);
      if (!current) return prev;
      const others = prev.filter(t => t.id !== selectedTextId);
      return [...others, current]; // Moves to last index (visually top)
    });
  };

  const sendToBack = () => {
    setTexts(prev => {
      const current = prev.find(t => t.id === selectedTextId);
      if (!current) return prev;
      const others = prev.filter(t => t.id !== selectedTextId);
      return [current, ...others]; // Moves to 0th index (visually bottom)
    });
  };

  const moveForward = () => {
    setTexts(prev => {
      const idx = prev.findIndex(t => t.id === selectedTextId);
      // If not found or already at the top (last index), do nothing
      if (idx === -1 || idx === prev.length - 1) return prev;

      const newArr = [...prev];
      // Swap with the element immediately after it in the array
      [newArr[idx], newArr[idx + 1]] = [newArr[idx + 1], newArr[idx]];
      return newArr;
    });
  };

  const moveBackward = () => {
    setTexts(prev => {
      const idx = prev.findIndex(t => t.id === selectedTextId);
      // If not found or already at the bottom (0th index), do nothing
      if (idx <= 0) return prev;

      const newArr = [...prev];
      // Swap with the element immediately before it in the array
      [newArr[idx], newArr[idx - 1]] = [newArr[idx - 1], newArr[idx]];
      return newArr;
    });
  };

  return (
    <div className="w-full h-full bg-white flex flex-col relative overflow-hidden animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-purple-500/10 rounded-full blur-[80px]" />

      <div className="px-6 py-5 flex items-center gap-3 border-b border-gray-100 z-20 bg-white/80 backdrop-blur-md">
        <button onClick={onClose} className="p-1.5 hover:bg-purple-50 rounded-lg text-slate-400 hover:text-purple-600 transition-colors">
          <ChevronLeft size={20} />
        </button>
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg shadow-md shadow-purple-100">
            <Move className="w-3.5 h-3.5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-base leading-none">Position</h3>
            <p className="text-[10px] text-purple-500 font-medium uppercase tracking-wider mt-1">Layout & Layers</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 z-10 space-y-8 custom-scrollbar">
        {/* ADVANCED PLACEMENT */}
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">Advanced Placement</p>
          <div className="grid grid-cols-2 gap-3 px-1">
            {[
              { label: "X Position", key: "x" },
              { label: "Y Position", key: "y" },
              { label: "Width", key: "width" },
              { label: "Height", key: "height" },
            ].map((item) => (
              <div key={item.key} className="bg-slate-50 border border-slate-100 p-3 rounded-2xl">
                <label className="text-[9px] font-black text-slate-400 uppercase block mb-1">{item.label}</label>
                <input
                  type="number"
                  value={localValues[item.key]}
                  onChange={(e) => setLocalValues({ ...localValues, [item.key]: e.target.value })}
                  onBlur={(e) => handleBlur(item.key, e.target.value)}
                  className="w-full bg-transparent font-bold text-slate-700 outline-none text-sm"
                />
              </div>
            ))}
          </div>
        </div>

        {/* QUICK ALIGN */}
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">Quick Align</p>
          <div className="grid grid-cols-3 gap-2 px-1">
            {[
              { icon: <AlignLeft size={16} />, action: alignLeft, label: "Left" },
              { icon: <AlignCenter size={16} />, action: alignCenterH, label: "Center" },
              { icon: <AlignRight size={16} />, action: alignRight, label: "Right" },
              { icon: <AlignVerticalSpaceAround className="rotate-90" size={16} />, action: alignTop, label: "Top" },
              { icon: <AlignHorizontalSpaceAround className="rotate-90" size={16} />, action: alignCenterV, label: "Middle" },
              { icon: <AlignVerticalSpaceAround className="-rotate-90" size={16} />, action: alignBottom, label: "Bottom" },
            ].map((btn, i) => (
              <button key={i} onClick={btn.action} className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-100 hover:border-purple-200 hover:bg-purple-50 text-slate-500 hover:text-purple-600 transition-all">
                {btn.icon}
                <span className="text-[8px] font-bold uppercase mt-1 tracking-tighter">{btn.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ORDERING */}
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">Layer Stack</p>
          <div className="space-y-2 px-1 pb-6">
            <div className="flex gap-2">
              <button onClick={bringToFront} className="flex-1 flex flex-col items-center justify-center p-3 rounded-xl bg-slate-900 text-white hover:bg-purple-600 transition-colors group">
                <Layers size={16} className="mb-1" />
                <span className="text-[9px] font-bold uppercase">To Front</span>
              </button>
              <button onClick={sendToBack} className="flex-1 flex flex-col items-center justify-center p-3 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
                <Layers size={16} className="mb-1 opacity-50" />
                <span className="text-[9px] font-bold uppercase">To Back</span>
              </button>
            </div>

            <div className="flex gap-2">
              <button onClick={moveForward} className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-600 text-[10px] font-bold uppercase hover:bg-purple-50 hover:border-purple-200 hover:text-purple-600 transition-all">
                Forward One
              </button>
              <button onClick={moveBackward} className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-600 text-[10px] font-bold uppercase hover:bg-purple-50 hover:border-purple-200 hover:text-purple-600 transition-all">
                Backward One
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}