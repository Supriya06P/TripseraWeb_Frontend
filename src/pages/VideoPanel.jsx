import React, { useState, useRef } from "react";
import { PlaySquare, Video, Film, UploadCloud, Sparkles } from "lucide-react";

export default function VideoPanel({ onAddVideo }) {
  const [activeTab, setActiveTab] = useState("videos");
  const fileInputRef = useRef(null);

  const localVideos = Object.values(
    import.meta.glob("../assets/videos/*.{mp4,webm,ogg}", {
      eager: true,
    })
  ).map((mod) => mod.default);

  const sampleGifs = [
    "https://i.gifer.com/Bepw.gif", "https://i.gifer.com/9245.gif",
    "https://i.gifer.com/XOsX.gif", "https://i.gifer.com/K6df.gif",
    "https://i.gifer.com/mo9.gif", "https://i.gifer.com/JFi.gif",
    "https://i.gifer.com/1Q8j.gif", "https://i.gifer.com/FtcZ.gif",
    "https://i.gifer.com/XeVs.gif", "https://i.gifer.com/HTMa.gif"
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    onAddVideo(url);
  };

  return (
    <div className="flex flex-col h-full bg-[#fdfdfd] relative overflow-hidden font-sans">
      
      {/* Background Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-purple-600/50 rounded-full blur-[80px]" />
      <div className="absolute bottom-[-5%] left-[-5%] w-48 h-48 bg-indigo-500/50 rounded-full blur-[60px]" />
      
      <div className="relative z-10 p-6 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2.5 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg shadow-purple-200">
             <PlaySquare className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-black bg-gradient-to-r from-purple-800 to-purple-600 bg-clip-text text-transparent tracking-tight">
              Media
            </h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Motion Assets</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
          
          {/* Upload Zone */}
          <div className="group mb-8 p-6 border-2 border-dashed border-purple-200 rounded-2xl text-center bg-white/50 hover:bg-purple-50/50 hover:border-purple-400 transition-all">
            <UploadCloud className="mx-auto text-purple-500 mb-2 group-hover:scale-110 transition-transform" size={28} />
            <p className="text-xs font-bold text-slate-700">Upload Video</p>
            <p className="text-[9px] text-slate-400 mb-4 uppercase tracking-widest mt-1">MP4, WEBM, GIF</p>

            <label className="cursor-pointer inline-block">
              <span className="bg-purple-600 text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider shadow-lg shadow-purple-200 hover:bg-purple-700 transition-all active:scale-95">
                Browse PC
              </span>
              <input type="file" className="hidden" accept="video/*,image/gif" onChange={handleFileUpload} />
            </label>
          </div>

          {/* --- ENHANCED TAB NAVIGATION --- */}
          <div className="flex p-1.5 bg-slate-200/50 backdrop-blur-md rounded-2xl mb-6 border border-white/50 shadow-inner">
            {[
              { id: "videos", label: "Videos", icon: Film },
              { id: "gifs", label: "GIFs", icon: Sparkles }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2.5 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-white text-purple-600 shadow-md scale-[1.02] border border-purple-100"
                    : "text-slate-500 hover:text-slate-700 hover:bg-white/40"
                }`}
              >
                <tab.icon size={14} className={activeTab === tab.id ? "text-purple-600" : "text-slate-400"} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Grid Content */}
          <div className="grid grid-cols-2 gap-3">
            {activeTab === "videos" && localVideos.map((vid, i) => (
              <button
                key={i}
                onClick={() => onAddVideo(vid)}
                className="aspect-video rounded-xl border border-slate-200 overflow-hidden hover:border-purple-400 transition-all shadow-sm bg-black group relative"
              >
                <video 
                  src={vid} 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  muted 
                  onMouseOver={(e) => e.target.play()} 
                  onMouseOut={(e) => { e.target.pause(); e.target.currentTime = 0; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <div className="p-2 bg-white/30 backdrop-blur-md rounded-full text-white border border-white/40 scale-75 group-hover:scale-100 transition-transform">
                      <Video size={16} />
                   </div>
                </div>
              </button>
            ))}

            {activeTab === "gifs" && sampleGifs.map((gif, i) => (
              <button
                key={i}
                onClick={() => onAddVideo(gif)}
                className="aspect-square rounded-xl border border-slate-200 overflow-hidden hover:border-purple-400 transition-all shadow-sm bg-white group"
              >
                <img src={gif} alt="gif" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </button>
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-8 p-4 rounded-2xl bg-white border border-slate-100 text-center shadow-sm">
            <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em]">
              Motion Graphics
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}