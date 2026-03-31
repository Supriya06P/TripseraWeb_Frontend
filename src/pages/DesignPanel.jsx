import React, { useState, useEffect } from "react";
import { Loader2, Search, X } from "lucide-react";
import TemplatePreview from "./TemplatePreview";

const DesignPanel = ({ onSelectTemplate }) => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://tripsera-2026.onrender.com/api/flyers");
        const data = await response.json();
        if (Array.isArray(data)) setTemplates(data);
      } catch (err) {
        console.error("Failed to load templates:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTemplates();
  }, []);

  const filteredTemplates = templates.filter((tpl) =>
    tpl.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-white relative overflow-hidden">
      {/* --- DECORATIVE BLOBS --- */}
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-purple-500/50 rounded-full blur-[80px] " />
      <div className="absolute bottom-[-5%] left-[-5%] w-48 h-48 bg-blue-500/40 rounded-full blur-[60px]" />

      {/* Main Content (Z-index ensures it stays above blobs) */}
      <div className="relative z-10 flex flex-col h-full">
        <div className="p-6 pb-4 space-y-4">
          <h2 className="text-xl font-bold text-purple-800">Templates</h2>

          {/* Search Bar */}
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-purple-500 transition-colors" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 bg-slate-100/80 backdrop-blur-sm border border-transparent rounded-xl text-sm focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 hover:bg-slate-200 rounded-full"
              >
                <X className="w-3 h-3 text-slate-500" />
              </button>
            )}
          </div>
        </div>

        {/* Templates Grid with Scrollbar Support */}
        <div className="flex-1 overflow-y-auto px-8 py-2 custom-scrollbar">
          <div className="grid grid-cols-2 gap-4 pb-10">
            {loading ? (
              <div className="col-span-2 flex flex-col items-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
                <span className="text-xs text-slate-400 mt-2 font-medium">Fetching designs...</span>
              </div>
            ) : filteredTemplates.length > 0 ? (
              filteredTemplates.map((tpl) => (
                <div
                  key={tpl._id}
                  onClick={() => onSelectTemplate(tpl)}
                  className="group cursor-pointer relative border border-slate-200/60 bg-white/70 backdrop-blur-md overflow-hidden hover:border-purple-500 transition-all hover:shadow-xl rounded-xl"
                >
                  <TemplatePreview tpl={tpl} containerWidth={140} />

                  {/* Subtle Purple Glow on Hover */}
                  <div className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/5 transition-colors pointer-events-none" />

                  {/* Hover Title */}
                  <div className="absolute bottom-0 inset-x-0 bg-white/90 backdrop-blur-md p-2 border-t border-slate-100 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                    <p className="text-[10px] font-bold truncate text-center text-purple-700">
                      {tpl.title || "Untitled"}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-20">
                <div className="bg-slate-50 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Search className="w-5 h-5 text-slate-300" />
                </div>
                <p className="text-sm font-medium text-slate-500">No matches found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignPanel;
