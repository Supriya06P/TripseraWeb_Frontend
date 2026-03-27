import React from "react";
import {
  LayoutTemplate, Type, Image as ImageIcon,
  Shapes, CloudUpload, PlaySquare, ChevronLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import DesignPanel from "./DesignPanel";
import TextPanel from "./TextPanel";
import ImagePanel from "./ImagePanel";
import ElementsPanel from "./ElementsPanel";
import UploadsPanel from "./UploadsPanel";
import VideoPanel from "./VideoPanel";
import FontPanel from "./FontPanel";
import TextEffectPanel from "./TextEffectPanel";
import PositionPanel from "./PositionPanel";

import ImageFilterPanel from "./ImageFilterPanel";
const SidebarItem = ({ icon: Icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={cn(
      "w-full flex flex-col items-center justify-center py-4 px-2 gap-1 transition-all duration-300 relative group",
      isActive ? "text-purple-600 bg-purple-50" : "text-slate-500 hover:bg-slate-50"
    )}
  >
    <Icon className={cn(
      "w-6 h-6 transition-transform group-hover:scale-110",
      isActive ? "text-purple-600" : "text-slate-400 group-hover:text-purple-600"
    )} />
    <span className="text-[10px] font-bold uppercase tracking-tight">{label}</span>
    {isActive && (
      <div className="absolute left-0 w-1 h-8 bg-purple-600 rounded-r-full" />
    )}
  </button>
);

const Sidebar = ({
  activeTab,
  setActiveTab,
  onSelectTemplate,
  onAddText,
  onAddImage,
  onAddElement,
  onAddVideo,
  activePanel,
  setActivePanel,
  selectedElement,
  setElements,
  selectedId
}) => {

const renderContent = () => {
  if (activePanel) {
    // This check is good—it ensures an element is actually selected
    if (!selectedId || !selectedElement) {
      return (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center text-slate-400">
          <div className="p-4 bg-slate-50 rounded-full mb-4">
            <ChevronLeft className="w-6 h-6 opacity-20" />
          </div>
          <p className="text-sm font-medium">No element selected</p>
          <p className="text-xs mt-1">Select an item on the canvas to edit its properties.</p>
        </div>
      );
    }

    return (
      <div className="flex flex-col h-full animate-in slide-in-from-left-4 duration-300">
        <div className="flex-1 overflow-y-auto">
          {/* --- ADD THIS BLOCK HERE --- */}
          {activePanel === "images" && (
            <ImagePanel 
              onAddImage={onAddImage} 
              onClose={() => setActivePanel(null)} 
            />
          )}


          {activePanel === "font" && (
            <FontPanel
              selectedText={selectedElement}
              setTexts={setElements}
              selectedTextId={selectedId}
              onClose={() => setActivePanel(null)}
            />
          )}
          
          {activePanel === "effects" && (
            <TextEffectPanel
              selectedText={selectedElement}
              setTexts={setElements}
              selectedTextId={selectedId}
              updateText={(updates) => {
                setElements((prev) =>
                  prev.map((el) =>
                    el.id === selectedId ? { ...el, style: { ...el.style, ...updates }, ...updates } : el
                  )
                );
              }}
              onClose={() => setActivePanel(null)}
            />
          )}

          {activePanel === "filters" && (
  <ImageFilterPanel
    selectedElement={selectedElement}
    setElements={setElements}
    onClose={() => setActivePanel(null)}
  />
)}
{activePanel === "videos" && (
            <VideoPanel 
              onAddVideo={onAddVideo} 
              onClose={() => setActivePanel(null)} 
            />
          )}
         

          {activePanel === 'position' && (
            <PositionPanel
              selectedText={selectedElement}
              setTexts={setElements}
              selectedTextId={selectedId}
              onClose={() => setActivePanel(null)}
            />
          )}
        </div>
      </div>
    );
  }

  // This part only runs if activePanel is null (Standard Tab Navigation)
  return (
    <div className="h-full overflow-y-auto">
      {activeTab === "templates" && <DesignPanel onSelectTemplate={onSelectTemplate} />}
      {activeTab === "text" && <TextPanel onAddText={onAddText} />}
      {activeTab === "images" && <ImagePanel onAddImage={onAddImage} />}
      {activeTab === "elements" && <ElementsPanel onAddElement={onAddElement} />}
      {activeTab === "uploads" && (
        <UploadsPanel onAddImage={onAddImage} onAddElement={onAddElement} onAddText={onAddText} />
      )}
      {activeTab === "videos" && <VideoPanel onAddVideo={onAddVideo} />}
    </div>
  );
};

  return (
    <aside className="flex h-full select-none">
      {/* LEFT RAIL */}
      <div className="w-[72px] bg-white border-r border-slate-100 flex flex-col items-center py-2 z-30 shadow-sm">
        <SidebarItem
          icon={LayoutTemplate}
          label="Design"
          isActive={activeTab === "templates"}
          onClick={() => { setActiveTab("templates"); setActivePanel(null) }}
        />
        <SidebarItem
          icon={Type}
          label="Text"
          isActive={activeTab === "text"}
          onClick={() => { setActiveTab("text"); setActivePanel(null) }}
        />
        <SidebarItem
          icon={ImageIcon}
          label="Gallery"
          isActive={activeTab === "images"}
          onClick={() => { setActiveTab("images"); setActivePanel(null) }}
        />
        <SidebarItem
          icon={Shapes}
          label="Elements"
          isActive={activeTab === "elements"}
          onClick={() => { setActiveTab("elements"); setActivePanel(null) }}
        />
        <SidebarItem
          icon={CloudUpload}
          label="Uploads"
          isActive={activeTab === "uploads"}
          onClick={() => { setActiveTab("uploads"); setActivePanel(null) }}
        />
        <SidebarItem
          icon={PlaySquare}
          label="Videos"
          isActive={activeTab === "videos"}
          onClick={() => { setActiveTab("videos"); setActivePanel(null) }}
        />
      </div>

      {/* RIGHT PANEL */}
      <div className="w-80 bg-white border-r border-slate-200 shadow-[10px_0_15px_-3px_rgba(0,0,0,0.02)] z-20 flex flex-col overflow-hidden">
        {renderContent()}
      </div>
    </aside>
  );
};

export default Sidebar;