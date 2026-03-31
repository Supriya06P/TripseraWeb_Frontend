import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Rnd } from 'react-rnd';
import {
  ArrowLeft, Save, Type, Square, Image as ImageIcon,
  Trash2, Settings2, Code, Move, Maximize2, X, Video, Layers, ChevronUp, ChevronDown, Plus
} from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const TemplateEditor = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [elements, setElements] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [showFullCode, setShowFullCode] = useState(false);
  const [showAssets, setShowAssets] = useState(false);
  const [assetType, setAssetType] = useState('image');
  const [jsonString, setJsonString] = useState("[]");
  const [metaData, setMetaData] = useState({ title: "New Flyer", price: "0" });
  const [canvasSize, setCanvasSize] = useState({ width: 400, height: 560 });
  const isInternalUpdate = useRef(false);
  const adjustZIndex = (id, direction) => {
    setElements(prev => {
      const indices = prev.map(el => Number(el.style.zIndex) || 0);
      const maxZ = Math.max(...indices, 0);
      const minZ = Math.min(...indices, 0);

      return prev.map(el => {
        if (el.id === id) {
          const currentZ = Number(el.style.zIndex) || 0;
          return {
            ...el,
            style: {
              ...el.style,
              zIndex: direction === 'up' ? maxZ + 1 : Math.max(0, minZ - 1)
            }
          };
        }
        return el;
      });
    });

  };

  const handleSave = async () => {
    const flyerData = {
      title: metaData.title, // Dynamic title
      price: metaData.price, // Dynamic price
      canvasSize: canvasSize,
      elements: elements,
    };

    try {
      const response = await fetch('https://tripsera-web-backend.vercel.app/api/save-flyer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(flyerData),
      });

      if (response.ok) {
        toast.success(`${metaData.title} saved successfully!`);
      } else {
        const errorData = await response.json();
        toast.error(`Save failed: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error saving flyer:", error);
      toast.error("Could not connect to the server.");
    }
  };
  const images = import.meta.glob('../assets/images/*.{png,jpg,jpeg,svg,webp}', {
    eager: true,
    import: 'default'
  });
  const assetImages = Object.values(images);

  const videoFiles = import.meta.glob('../assets/videos/*.{mp4,MP4,webm,ogg}', {
    eager: true,
    import: 'default'
  });
  const assetVideos = Object.values(videoFiles);

  const FONT_FAMILIES = [
    'Plus Jakarta Sans', 'Inter', 'Roboto', 'Playfair Display',
    'Montserrat', 'Open Sans', 'Lato', 'Poppins',
    'Bebas Neue', 'Merriweather', 'Oswald', 'Raleway',
    'Dancing Script', 'Pacifico', 'Caveat', 'Lobster',
    'Fira Code', 'Space Mono', 'Kanit', 'Anton'
  ];
  // Your Custom Color
  const PURPLE_PAIN = "#8458B3";

  useEffect(() => {
    if (location.state?.template) {
      const { template } = location.state;
      setElements(template.elements || []);
      if (template.canvasSize) setCanvasSize(template.canvasSize);

      // Set the metaData from the loaded template
      setMetaData({
        title: template.title || "Untitled Flyer",
        price: template.price || "0"
      });

      toast.success("Design Loaded");
    }
  }, [location.state]);

  useEffect(() => {
    if (!isInternalUpdate.current) {
      setJsonString(JSON.stringify({ canvasSize, elements }, null, 2));
    }
    isInternalUpdate.current = false;
  }, [elements, canvasSize]);

  // NEW: Handle manual typing in the JSON editor
  const handleJsonChange = (e) => {
    const newValue = e.target.value;
    setJsonString(newValue);

    try {
      const parsed = JSON.parse(newValue);
      if (parsed.elements && parsed.canvasSize) {
        isInternalUpdate.current = true;
        setElements(parsed.elements);
        setCanvasSize(parsed.canvasSize);
      }
    } catch (err) {
      console.debug("Invalid JSON while typing...");
    }
  };

  const updateElement = (id, updates) => {
    setElements(prev => prev.map(el => el.id === id ? { ...el, ...updates } : el));
  };

  const updateElementStyle = (id, styleUpdates) => {
    setElements(prev => prev.map(el =>
      el.id === id ? { ...el, style: { ...el.style, ...styleUpdates } } : el
    ));
  };

  const addElement = (type, customSrc = null) => {
    const maxZ = elements.length > 0
      ? Math.max(...elements.map(el => Number(el.style.zIndex) || 0))
      : 0;

    const newEl = {
      id: `el-${Date.now()}`,
      type,
      content: type === 'text' ? 'New Text' : type === 'rect' ? 'Shape Text' : '',
      src: customSrc || (
        type === 'image'
          ? 'https://via.placeholder.com/150'
          : type === 'video'
            ? 'video-placeholder...'
            : ''
      ),
      x: 50,
      y: 50,
      width: type === 'text' ? 150 : 200,
      height: type === 'text' ? 40 : 150,
      style: {
        fontSize: '18px',
        fontFamily: 'Plus Jakarta Sans',
        color: '#000000',
        backgroundColor: type === 'rect' ? PURPLE_PAIN : 'transparent',
        borderRadius: '0px',
        zIndex: maxZ + 1,
        textAlign: 'center'
      }
    };

    setElements(prev => [...prev, newEl]);
    setSelectedId(newEl.id);
    if (customSrc) {
      setShowAssets(false);
    }
  };


  const selectedElement = elements.find(el => el.id === selectedId);

  return (
    <div className="flex flex-col h-screen bg-slate-50 text-slate-900 overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Header */}
      <header className="sticky top-0 h-16 bg-white/90 backdrop-blur-md border-b border-slate-200/50 flex items-center justify-between px-8 z-50">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-3 py-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all duration-200 group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-semibold tracking-tight">Back</span>
          </button>

          <div className="h-6 w-[1px] bg-slate-200 mx-2" />

          <button
            onClick={() => setShowFullCode(!showFullCode)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 border ${showFullCode
              ? "bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-200"
              : "bg-white border-slate-200 text-slate-600 hover:border-purple-300 hover:bg-purple-50"
              }`}
          >
            <Code size={16} />
            {showFullCode ? "HIDE JSON" : "OPEN EDITOR"}
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleSave}
            style={{ backgroundColor: PURPLE_PAIN }}
            className="flex items-center gap-2 text-white h-11 px-8 rounded-full font-bold shadow-lg shadow-purple-100 transition-all hover:brightness-110 active:scale-95"
          >
            <Save size={18} />
            Save Flyer
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Toolbar */}
        <aside className="w-24 border-r bg-white flex flex-col items-center py-8 gap-8 z-20">
          <IconButton icon={<Type />} label="Text" onClick={() => addElement('text')} activeColor={PURPLE_PAIN} />
          <IconButton icon={<Square />} label="Shape" onClick={() => addElement('rect')} activeColor={PURPLE_PAIN} />
          <IconButton icon={<ImageIcon />} label="Image" onClick={() => { setShowAssets(!showAssets); setShowAssets(true); }} activeColor={PURPLE_PAIN} />
          <IconButton icon={<Video />} label="Video" onClick={() => { setAssetType('video'); setShowAssets(true); }} activeColor={PURPLE_PAIN} />
        </aside>


        {showFullCode && (
          <aside className="w-[380px] border-r bg-[#121212] flex flex-col z-10 animate-in slide-in-from-left duration-300">
            <div className="p-4 bg-[#1e1e1e] text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex justify-between items-center">
              JSON Structure
              <div className="flex items-center gap-2">
                <span className="text-[9px] text-green-500 font-bold animate-pulse">EDITABLE</span>
                <X size={14} className="cursor-pointer hover:text-white" onClick={() => setShowFullCode(false)} />
              </div>
            </div>
            <textarea
              value={jsonString}
              onChange={handleJsonChange}
              className="flex-1 bg-[#121212] text-purple-300 font-mono text-[11px] p-6 focus:outline-none resize-none leading-relaxed focus:bg-[#161616] transition-colors"
              spellCheck="false"
            />
          </aside>
        )}

        {/* Asset Drawer */}
        {showAssets && (
          <aside className="w-72 border-r bg-white flex flex-col z-10 animate-in slide-in-from-left duration-200 shadow-2xl">
            {/* Header */}
            <div className="p-5 border-b flex justify-between items-center bg-slate-50/50">
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Project Assets</span>
                <span className="text-[9px] text-slate-400 font-medium">Viewing {assetType}s</span>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8" onClick={() => setShowAssets(false)}>
                <X size={14} />
              </Button>
            </div>

            {/* Folder/Type Switcher */}
            <div className="p-4 flex gap-2 border-b">
              <button
                onClick={() => setAssetType('image')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-[10px] font-bold uppercase transition-all ${assetType === 'image' ? 'bg-slate-900 text-white shadow-md' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
              >
                <ImageIcon size={12} /> Images
              </button>
              <button
                onClick={() => setAssetType('video')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-[10px] font-bold uppercase transition-all ${assetType === 'video' ? 'bg-slate-900 text-white shadow-md' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
              >
                <Video size={12} /> Videos
              </button>
            </div>

            {/* Grid Rendering */}
            <div className="p-4 overflow-y-auto flex-1">
              <div className="grid grid-cols-2 gap-3">
                {(assetType === 'image' ? assetImages : assetVideos).map((path, idx) => (
                  <button
                    key={idx}
                    onClick={() => addElement(assetType, path)}
                    className="group relative aspect-square rounded-xl border-2 border-slate-100 overflow-hidden hover:border-purple-500 transition-all bg-slate-50 shadow-sm"
                  >
                    {assetType === 'image' ? (
                      <img src={path} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full relative">
                        <video src={path} className="w-full h-full object-cover" muted />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors flex items-center justify-center">
                          <Video size={16} className="text-white opacity-60" />
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-purple-600/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <Plus size={20} className="text-white" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </aside>
        )}


        {/* Main Canvas Area */}
        <main className="flex-1 bg-[#f8fafc] flex items-center justify-center p-12 overflow-auto relative" onClick={() => setSelectedId(null)}>
          {/* --- BACKGROUND BLOBS START --- */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Top Left Purple */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/40 rounded-full mix-blend-multiply filter blur-[120px] animate-blob opacity-70" />

            {/* Bottom Right Indigo */}
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-400/30 rounded-full mix-blend-multiply filter blur-[120px] animate-blob animation-delay-2000 opacity-70" />

            {/* Middle Pinkish for extra depth */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-pink-400/20 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-4000 opacity-50" />
          </div>
          <div
            id="canvas-container"
            className="bg-white shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] relative transition-all rounded-sm"
            style={{ width: `${canvasSize.width}px`, height: `${canvasSize.height}px` }}
            onClick={(e) => e.stopPropagation()}
          >
            {elements.map((el) => (
              <Rnd
                key={el.id}
                size={{ width: el.width, height: el.height }}
                position={{ x: el.x, y: el.y }}
                onDragStop={(e, d) => updateElement(el.id, { x: d.x, y: d.y })}
                onResizeStop={(e, dir, ref, delta, pos) => {
                  updateElement(el.id, {
                    width: ref.offsetWidth,
                    height: ref.offsetHeight,
                    ...pos
                  });
                }}
                bounds="parent"
                onMouseDown={() => setSelectedId(el.id)}
                style={{
                  zIndex: el.style.zIndex || 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}

                className={`group ${selectedId === el.id ? 'ring ring-purple-400' : ''
                  }`}
              >
                <div
                  style={{
                    ...el.style,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    zIndex: 'auto'
                  }}
                >
                  {el.type === 'video' ? (
                    <video
                      src={el.src}
                      className="w-full h-full object-cover"
                      muted
                      loop
                      autoPlay
                      playsInline
                    />
                  ) : el.type === 'image' ? (
                    <img
                      src={el.src}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span style={{ width: '100%', textAlign: el.style.textAlign }}>
                      {el.content}
                    </span>
                  )}
                </div>
              </Rnd>
            ))}
          </div>
        </main>

        {/* Properties Sidebar */}
        <aside className="w-80 border-l bg-white p-6 shadow-xl overflow-y-auto z-20">
          {!selectedElement ? (
            <div className="space-y-8 animate-in fade-in duration-300">
              {/* Template Meta Information */}
              <div className="space-y-4">
                <div className="text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-2">
                  <Settings2 size={14} /> Template Details
                </div>

                <div className="space-y-3">
                  {/* Title Input */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Template Title</label>
                    <Input
                      placeholder="e.g. Summer Beach Party"
                      className="rounded-xl border-slate-200 focus:ring-purple-500 h-10 text-sm"
                      value={metaData.title}
                      onChange={(e) => setMetaData(p => ({ ...p, title: e.target.value }))}
                    />
                  </div>

                  {/* Price Input */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Price (INR)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">₹</span>
                      <Input
                        type="number"
                        placeholder="0.00"
                        className="rounded-xl border-slate-200 focus:ring-purple-500 h-10 text-sm pl-7"
                        value={metaData.price}
                        onChange={(e) => setMetaData(p => ({ ...p, price: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-[1px] bg-slate-100" />

              {/* Canvas Settings */}
              <div className="space-y-4">
                <div className="text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-2">
                  <Maximize2 size={14} /> Canvas Dimensions
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Width</label>
                    <Input
                      className="rounded-xl border-slate-200 focus:ring-purple-500 h-10 text-sm"
                      type="number"
                      value={canvasSize.width}
                      onChange={(e) => setCanvasSize(p => ({ ...p, width: parseInt(e.target.value) || 0 }))}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Height</label>
                    <Input
                      className="rounded-xl border-slate-200 focus:ring-purple-500 h-10 text-sm"
                      type="number"
                      value={canvasSize.height}
                      onChange={(e) => setCanvasSize(p => ({ ...p, height: parseInt(e.target.value) || 0 }))}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (

            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div style={{ color: PURPLE_PAIN }} className="font-black text-[11px] uppercase tracking-[0.2em] flex items-center gap-2">
                  <Settings2 size={16} /> {selectedElement.type} Settings
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-400 h-9 w-9 hover:bg-red-50 hover:text-red-600 rounded-full"
                  onClick={() => { setElements(elements.filter(el => el.id !== selectedId)); setSelectedId(null); }}
                >
                  <Trash2 size={18} />
                </Button>
              </div>

              {/* Text-Specific Controls */}
              {(selectedElement.type === 'text' || selectedElement.type === 'rect') && (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Content</label>
                    <Input
                      value={selectedElement.content}
                      onChange={(e) => updateElement(selectedId, { content: e.target.value })}
                      className="rounded-xl h-10 text-sm focus:ring-purple-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Font Family</label>
                    <select
                      value={selectedElement.style.fontFamily}
                      onChange={(e) => updateElementStyle(selectedId, { fontFamily: e.target.value })}
                      className="w-full h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm focus:ring-2 focus:ring-purple-500 outline-none appearance-none cursor-pointer"
                      style={{ fontFamily: selectedElement.style.fontFamily }}
                    >
                      {FONT_FAMILIES.map(font => (
                        <option key={font} value={font} style={{ fontFamily: font }}>{font}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Size & Weight</label>
                      <div className="flex gap-2">
                        <Input
                          value={selectedElement.style.fontSize}
                          onChange={(e) => updateElementStyle(selectedId, { fontSize: e.target.value })}
                          className="rounded-xl h-10 text-sm focus:ring-purple-500"
                        />
                        <Button
                          variant="outline"
                          className={`h-10 w-12 rounded-xl font-bold ${selectedElement.style.fontWeight === 'bold' ? 'bg-slate-100 border-purple-500' : ''}`}
                          onClick={() => updateElementStyle(selectedId, { fontWeight: selectedElement.style.fontWeight === 'bold' ? 'normal' : 'bold' })}
                        >
                          B
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Text Color</label>
                      <input
                        type="color"
                        value={selectedElement.style.color || '#000000'}
                        onChange={(e) => updateElementStyle(selectedId, { color: e.target.value })}
                        className="w-full h-10 rounded-xl cursor-pointer border-slate-200 shadow-sm overflow-hidden p-0"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Move size={14} /> Rotation
                    </label>
                    <span className="text-[11px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-lg">
                      {parseInt(selectedElement.style.transform?.replace('rotate(', '')?.replace('deg)', '')) || 0}°
                    </span>
                  </div>
                  <input
                    type="range" min="0" max="360"
                    value={parseInt(selectedElement.style.transform?.replace('rotate(', '')?.replace('deg)', '')) || 0}
                    onChange={(e) => updateElementStyle(selectedId, { transform: `rotate(${e.target.value}deg)` })}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#8458B3]"
                  />
                </div>

                {/* Border Settings */}
                <div className="space-y-3 pt-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Square size={12} /> Border settings
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      value={parseInt(selectedElement.style.borderWidth) || 0}
                      onChange={(e) => updateElementStyle(selectedId, { borderWidth: `${e.target.value}px`, borderStyle: selectedElement.style.borderStyle || 'solid' })}
                      className="rounded-xl h-10 w-20 text-sm focus:ring-purple-500"
                      placeholder="px"
                    />
                    <select
                      value={selectedElement.style.borderStyle || 'solid'}
                      onChange={(e) => updateElementStyle(selectedId, { borderStyle: e.target.value })}
                      className="flex-1 h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm focus:ring-2 focus:ring-purple-500 outline-none cursor-pointer"
                    >
                      {['solid', 'dashed', 'dotted', 'double'].map(style => (
                        <option key={style} value={style} className="capitalize">{style}</option>
                      ))}
                    </select>
                    <input
                      type="color"
                      value={selectedElement.style.borderColor || '#000000'}
                      onChange={(e) => updateElementStyle(selectedId, { borderColor: e.target.value })}
                      className="w-12 h-10 rounded-xl cursor-pointer border-slate-200 shadow-sm overflow-hidden p-0"
                    />
                  </div>
                </div>

                {/* Background Fill & Opacity */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Background Color</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={selectedElement.style.backgroundColor?.startsWith('#') ? selectedElement.style.backgroundColor : '#8458B3'}
                        onChange={(e) => updateElementStyle(selectedId, { backgroundColor: e.target.value })}
                        className="flex-1 h-10 rounded-xl cursor-pointer border-slate-200 shadow-sm"
                      />
                      <Button
                        variant="outline"
                        className="h-10 text-[10px] font-bold rounded-xl"
                        onClick={() => updateElementStyle(selectedId, { backgroundColor: 'transparent' })}
                      >
                        NONE
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">BG Opacity</label>
                      <span className="text-[11px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-lg">
                        {selectedElement.style.backgroundColor?.startsWith('rgba')
                          ? Math.round(parseFloat(selectedElement.style.backgroundColor.split(',').pop()) * 100)
                          : selectedElement.style.backgroundColor === 'transparent' ? 0 : 100}%
                      </span>
                    </div>
                    <input
                      type="range" min="0" max="100"
                      value={selectedElement.style.backgroundColor?.startsWith('rgba')
                        ? parseFloat(selectedElement.style.backgroundColor.split(',').pop()) * 100
                        : selectedElement.style.backgroundColor === 'transparent' ? 0 : 100}
                      onChange={(e) => {
                        const alpha = parseFloat(e.target.value) / 100;
                        let color = selectedElement.style.backgroundColor || '#ffffff';
                        let r, g, b;
                        if (color.startsWith('#')) {
                          r = parseInt(color.slice(1, 3), 16);
                          g = parseInt(color.slice(3, 5), 16);
                          b = parseInt(color.slice(5, 7), 16);
                        } else if (color.startsWith('rgba')) {
                          const parts = color.match(/\d+/g);
                          [r, g, b] = parts;
                        } else {
                          [r, g, b] = [255, 255, 255];
                        }
                        updateElementStyle(selectedId, { backgroundColor: `rgba(${r}, ${g}, ${b}, ${alpha})` });
                      }}
                      className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#8458B3]"
                    />
                  </div>
                </div>

                {/* Rounding */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Rounding</label>
                    <span className="text-[11px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-lg">
                      {selectedElement.style.borderRadius}
                    </span>
                  </div>
                  <input
                    type="range" min="0" max="100"
                    value={parseInt(selectedElement.style.borderRadius) || 0}
                    onChange={(e) => updateElementStyle(selectedId, { borderRadius: `${e.target.value}px` })}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#8458B3]"
                  />
                </div>

                {/* Arrangement */}
                <div className="space-y-3 pt-2 border-t border-slate-50">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Layers size={14} /> Arrangement
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="h-9 text-xs font-bold rounded-xl" onClick={() => adjustZIndex(selectedId, 'up')}>
                      <ChevronUp size={14} className="mr-1" /> Bring Front
                    </Button>
                    <Button variant="outline" className="h-9 text-xs font-bold rounded-xl" onClick={() => adjustZIndex(selectedId, 'down')}>
                      <ChevronDown size={14} className="mr-1" /> Send Back
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

const IconButton = ({ icon, label, onClick, activeColor }) => (
  <button
    onClick={onClick}
    className="sidebar-btn flex flex-col items-center gap-2 w-full transition-all"
  >
    <div
      className="icon-box p-4 rounded-2xl bg-slate-50 text-slate-400 transition-all shadow-sm active:scale-90"
    >
      {icon}
      <style>{`
        .sidebar-btn:hover .icon-box { 
          background-color: ${activeColor}; 
          color: white;
        }
      `}</style>
    </div>
    <span className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 sidebar-btn:hover:text-slate-900 transition-colors">
      {label}
    </span>
  </button>
);

export default TemplateEditor;
