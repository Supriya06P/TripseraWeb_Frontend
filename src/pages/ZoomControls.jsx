import React from "react";
import { Plus, Minus, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";

const ZoomControls = ({ scale, setScale, onReset }) => {
  const zoomIn = () => setScale((prev) => Math.min(prev + 0.1, 3));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.1, 0.1));

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-2 bg-white/80 backdrop-blur-md p-2 rounded-2xl shadow-2xl border border-purple-100">
      {/* Zoom In */}
      <Button
        variant="ghost"
        size="icon"
        onClick={zoomIn}
        className="h-10 w-10 rounded-xl hover:bg-purple-50 hover:text-purple-600 transition-all active:scale-90"
      >
        <Plus className="w-5 h-5" />
      </Button>

      {/* Percentage Display */}
      <div className="py-2 text-[10px] font-black text-center text-slate-400 border-y border-slate-100 uppercase tracking-tighter">
        {Math.round(scale * 100)}%
      </div>

      {/* Zoom Out */}
      <Button
        variant="ghost"
        size="icon"
        onClick={zoomOut}
        className="h-10 w-10 rounded-xl hover:bg-purple-50 hover:text-purple-600 transition-all active:scale-90"
      >
        <Minus className="w-5 h-5" />
      </Button>

      {/* Reset to Fit */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onReset}
        className="h-10 w-10 rounded-xl bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-200 mt-2 transition-all active:rotate-90"
      >
        <Maximize className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default ZoomControls;