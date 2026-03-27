import React, { useState, useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import Navbar from "./Navbar";
import ZoomControls from "./ZoomControls";
import Sidebar from "./Sidebar";
import TextToolbar from "./TextToolbar";
import ImageToolbar from "./ImageToolbar";
import ShapeToolbar from "./ShapeToolbar"; 
import VideoToolbar from "./VideoToolbar";

const EditorLayout = () => {
  const { id } = useParams();
  const location = useLocation();
  const stageRef = useRef(null);

  const user = { name: "John Doe", email: "john@tripsera.com", role: "admin", agencyName: "Tripsera Agency" };

  const [activeTab, setActiveTab] = useState("templates");
  const [canvasSize, setCanvasSize] = useState({ width: 500, height: 650 });
  const [elements, setElements] = useState([]);
  const [scale, setScale] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [activePanel, setActivePanel] = useState(null);
  
  // ADDED: State for resizing
  const [resizingHandle, setResizingHandle] = useState(null);
const handleLogout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  // If you have a setUser state here, call it: 
  // setUser(null); 
  toast.success("Logged out successfully");
  navigate("/");
};
  const updateCanvas = (data) => {
    const newSize = {
      width: Number(data.canvasSize?.width) || 500,
      height: Number(data.canvasSize?.height) || 650
    };
    setCanvasSize(newSize);

    const sanitizedElements = (data.elements || []).map(el => {
      return {
        ...el,
        x: Number(el.x) || 0,
        y: Number(el.y) || 0,
        width: !isNaN(el.width) ? Number(el.width) : el.width,
        height: !isNaN(el.height) ? Number(el.height) : el.height,
        style: {
          ...el.style,
          zIndex: el.style?.zIndex || 1,
          fontSize: typeof el.style?.fontSize === 'number' ? `${el.style.fontSize}px` : el.style?.fontSize
        }
      };
    });

    setElements(sanitizedElements);
    setSelectedId(null);
    setTimeout(() => calculateFitScale(newSize), 100);
  };

  useEffect(() => {
    const loadTemplate = async () => {
      try {
        setLoading(true);
        if (id) {
          const response = await fetch(`http://localhost:5000/api/flyers/${id}`);
          const data = await response.json();
          if (data) {
            updateCanvas(data);
            return;
          }
        }
        if (location.state?.template) {
          updateCanvas(location.state.template);
        }
      } catch (err) {
        toast.error("Could not load template");
      } finally {
        setLoading(false);
      }
    };
    loadTemplate();
  }, [id]);

  const handleAddElement = (type, content = "", color = "#6366f1") => {
    let elementStyle = {
      backgroundColor: color,
      zIndex: elements.length + 1,
      borderRadius: "4px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#ffffff",
      fontWeight: "800",
      fontSize: "14px",
      padding: content ? "10px 20px" : "0px",
      textAlign: "center"
    };

    switch (type) {
      case "circle": elementStyle.borderRadius = "50%"; break;
      case "triangle": elementStyle.clipPath = "polygon(50% 0%, 0% 100%, 100% 100%)"; break;
      case "hexagon": elementStyle.clipPath = "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)"; break;
      case "star": elementStyle.clipPath = "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)"; break;
      case "line":
        elementStyle.height = "4px";
        elementStyle.backgroundColor = "#6366f1";
        elementStyle.padding = "0px";
        break;
      default: break;
    }

    const newElement = {
      id: `el-${Date.now()}`,
      type: "element",
      elementType: type,
      content: content,
      x: canvasSize.width / 2 - (content ? 75 : 50),
      y: canvasSize.height / 2 - (content ? 25 : 50),
      width: content ? 150 : (type === "line" ? 200 : 100),
      height: content ? 50 : (type === "line" ? 4 : 100),
      style: elementStyle
    };

    setElements((prev) => [...prev, newElement]);
    setSelectedId(newElement.id);
    toast.success(`${content || type} added`);
  };

  useEffect(() => {
    if (!selectedId && activePanel !== null) {
      setActivePanel(null);
    }
  }, [selectedId, activePanel]);

  const handleAddVideo = (url) => {
    const isGif = url.toLowerCase().endsWith('.gif') || url.includes('gifer.com') || url.startsWith('data:image/gif');
    const newElement = {
      id: `${isGif ? 'gif' : 'video'}-${Date.now()}`,
      type: isGif ? "image" : "video",
      src: url,
      x: canvasSize.width / 2 - 150,
      y: canvasSize.height / 2 - 100,
      width: 300,
      height: 200,
      style: {
        zIndex: elements.length + 1,
        borderRadius: "12px",
        objectFit: "cover",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
      }
    };
    setElements((prev) => [...prev, newElement]);
    setSelectedId(newElement.id);
  };
const handleReplaceImage = (newImageUrl) => {
  setElements(prev => prev.map(el => 
    // Match the selected ID and ensure we update 'src' not 'content'
    el.id === selectedId ? { ...el, src: newImageUrl } : el
  ));
  setActivePanel(null); 
  toast.success("Image replaced");
};
const handleAddImage = (url) => {
  // 1. Check if we are REPLACING an existing image
  if (selectedId && selectedElement?.type === "image") {
    setElements((prev) =>
      prev.map((el) => (el.id === selectedId ? { ...el, src: url } : el))
    );
    setActivePanel(null);
    toast.success("Image replaced");
    return;
  }

  // 2. Add NEW image logic
  const newElement = {
    id: `img-${Date.now()}`,
    type: "image",
    src: url, // Use the URL directly from the ImagePanel
    x: canvasSize.width / 2 - 100,
    y: canvasSize.height / 2 - 100,
    width: 200,
    height: 200,
    style: {
      zIndex: elements.length + 1,
      borderRadius: "8px",
      objectFit: "cover",
    },
  };

  setElements((prev) => [...prev, newElement]);
  setSelectedId(newElement.id);
  toast.success("Image added to canvas");
};

  const handleAddText = (type, content) => {
    const fontSizes = { heading: { size: 40, weight: "800" }, subheading: { size: 24, weight: "600" }, body: { size: 16, weight: "400" } };
    const config = fontSizes[type] || fontSizes.body;
    const newElement = {
      id: `text-${Date.now()}`,
      type: "text",
      content: content,
      x: canvasSize.width / 2 - 100,
      y: canvasSize.height / 2 - 25,
      width: 200,
      height: 60,
      style: { fontSize: `${config.size}px`, fontWeight: config.weight, color: "#000000", textAlign: "center", zIndex: elements.length + 1, fontFamily: "sans-serif" }
    };
    setElements((prev) => [...prev, newElement]);
    setSelectedId(newElement.id);
  };

  const handleSave = async () => {
    const canvasElement = document.getElementById("canvas-root");
    if (!canvasElement) return;
    try {
      toast.info("Saving...");
      const canvas = await html2canvas(canvasElement, { useCORS: true, scale: 0.2 });
      const thumbnail = canvas.toDataURL("image/jpeg", 0.6);
      await fetch("http://localhost:5000/api/save-flyer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "My New Flyer", thumbnail, elements, canvasSize }),
      });
      toast.success("Saved!");
    } catch (err) {
      toast.error("Save failed");
    }
  };

  const calculateFitScale = (size) => {
    if (stageRef.current) {
      const padding = 120;
      const stageW = stageRef.current.offsetWidth - padding;
      const stageH = stageRef.current.offsetHeight - padding;
      setScale(Math.min(stageW / size.width, stageH / size.height));
    }
  };

  const handleMouseDown = (e, id) => {
    setSelectedId(id);
    setIsDragging(true);
  };

  // ADDED: Handle triggering for resize
  const handleResizeStart = (e, direction) => {
    e.stopPropagation();
    setResizingHandle(direction);
  };

  const handleMouseMove = (e) => {
    if ((!isDragging && !resizingHandle) || !selectedId) return;
    
    const rect = document.getElementById("canvas-root").getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / scale;
    const mouseY = (e.clientY - rect.top) / scale;

    setElements((prev) =>
      prev.map((el) => {
        if (el.id !== selectedId) return el;

        if (isDragging) {
          return { ...el, x: mouseX - el.width / 2, y: mouseY - (typeof el.height === 'number' ? el.height / 2 : 20) };
        }

        if (resizingHandle) {
          let { x, y, width, height, style, type } = el;
          const minSize = 20;
          const oldHeight = height;

          if (resizingHandle.includes("e")) width = Math.max(minSize, mouseX - x);
          if (resizingHandle.includes("s")) height = Math.max(minSize, mouseY - y);
          if (resizingHandle.includes("w")) {
            const newWidth = Math.max(minSize, x + width - mouseX);
            x = x + width - newWidth;
            width = newWidth;
          }
          if (resizingHandle.includes("n")) {
            const newHeight = Math.max(minSize, y + height - mouseY);
            y = y + height - newHeight;
            height = newHeight;
          }

          // Text Scaling logic inside the move handler
          let newStyle = { ...style };
          if (type === "text" && typeof oldHeight === 'number' && oldHeight > 0) {
            const currentFontSize = parseFloat(style.fontSize) || 16;
            const scaleFactor = height / oldHeight;
            const newFontSize = Math.max(8, currentFontSize * scaleFactor);
            newStyle.fontSize = `${newFontSize}px`;
          }

          return { ...el, x, y, width, height, style: newStyle };
        }
        return el;
      })
    );
  };

  const handleDeleteElement = (elementId) => {
    setElements((prev) => prev.filter((el) => el.id !== elementId));
    setSelectedId(null);
    toast.success("Element deleted");
  };
// Inside EditorLayout.jsx


 const handleExport = async () => {
    const canvasElement = document.getElementById("canvas-root");
    if (!canvasElement) return;

    // Deselect before export to remove borders/handles from the image
    const currentSelection = selectedId;
    setSelectedId(null);

    // Small delay to allow React to clear the selection UI
    setTimeout(async () => {
      try {
        toast.info("Generating high-quality export...");
        const canvas = await html2canvas(canvasElement, {
          useCORS: true,
          scale: 3, // Higher scale for better print quality
          backgroundColor: "#ffffff",
          logging: false,
          // Ignore the selection UI if it somehow persists
          ignoreElements: (element) => element.classList.contains('selection-handle')
        });

        const image = canvas.toDataURL("image/jpeg", 1.0);
        const link = document.createElement("a");
        link.download = `Flyer-${Date.now()}.jpg`;
        link.href = image;
        link.click();
        toast.success("Download started!");
      } catch (err) {
        console.error(err);
        toast.error("Export failed");
      } finally {
        setSelectedId(currentSelection); // Restore selection
      }
    }, 100);
  };

const renderHandle = (direction, cursor) => (
  <div
    onMouseDown={(e) => handleResizeStart(e, direction)}
    className="selection-handle" // Added class for export filtering
    style={{
      position: "absolute",
      width: "12px", // Increased slightly for better "hit"
      height: "12px",
      backgroundColor: "white",
      border: "2px solid #6366f1",
      borderRadius: "50%",
      cursor: cursor, // This will now take priority
      zIndex: 99999, // Ensure it's above everything
      pointerEvents: "all", // Explicitly allow all interactions
      // Centering logic
      top: direction.includes("n") ? "-6px" : direction.includes("s") ? "calc(100% - 6px)" : "calc(50% - 6px)",
      left: direction.includes("w") ? "-6px" : direction.includes("e") ? "calc(100% - 6px)" : "calc(50% - 6px)",
    }}
  />
);

  const selectedElement = elements.find((el) => el.id === selectedId);

  return (
    <div className="flex flex-col h-screen w-full bg-white overflow-hidden select-none">
      <Navbar user={user} onSave={handleSave} onExport={handleExport} handleLogout={handleLogout}/>

      {selectedId && selectedElement && (
        <div className="fixed top-[80px] left-80 right-0 z-[100] flex justify-center pointer-events-none">
          <div className="pointer-events-auto">
           {/* Safer check using optional chaining */}
      {selectedElement?.type === "text" && (
        <TextToolbar
          element={selectedElement}
          setElements={setElements}
          onDelete={handleDeleteElement}
          openFontPanel={() => setActivePanel("font")}
          openEffectsPanel={() => setActivePanel("effects")}
          openPositionPanel={() => setActivePanel("position")}
        />
      )}

      {/* Safer check using optional chaining */}
      {selectedElement?.type === "image" && (
        <ImageToolbar
          element={selectedElement}
          setElements={setElements}
          onDelete={handleDeleteElement}
          openImagePanel={() => {
      setActiveTab("images");   // 1. Switch to the Image/Upload Tab
      setActivePanel("images"); // 2. Open the specific panel if needed
    }}
          openFiltersPanel={() => setActivePanel("filters")}
          openPositionPanel={() => setActivePanel("position")}
        />
      )}
      {/* SHAPE TOOLBAR (Add this now) */}
    {(selectedElement.type === "element" || selectedElement.type === "rect")  && (
      <ShapeToolbar
        element={selectedElement}
        setElements={setElements}
        onDelete={handleDeleteElement}
        openPositionPanel={() => setActivePanel("position")}
      />
    )}
   {selectedElement?.type === "video" && (
  <VideoToolbar
    element={selectedElement}
    setElements={setElements}
    onDelete={handleDeleteElement}
    openVideoPanel={() => {
      setActiveTab("videos"); // or whichever tab contains your video uploads
      setActivePanel("videos");
    }}
    openPositionPanel={() => setActivePanel("position")}
  />
)}
      </div>
      </div>
      )}


      <div 
        className="flex flex-1 pt-[65px] overflow-hidden bg-white" 
        onMouseMove={handleMouseMove} 
        onMouseUp={() => { setIsDragging(false); setResizingHandle(null); }}
      >
        <Sidebar
          activeTab={activeTab} setActiveTab={setActiveTab}
          activePanel={activePanel} setActivePanel={setActivePanel}
          onSelectTemplate={updateCanvas} onAddText={handleAddText}
          onAddImage={handleAddImage} onAddElement={handleAddElement}
          onAddVideo={handleAddVideo} selectedElement={selectedElement}
          setElements={setElements} selectedId={selectedId}
        />

        <div
          ref={stageRef}
          className="flex-1 overflow-auto flex items-center justify-center p-10 bg-slate-100/50 border-l border-slate-200 relative"
          onClick={(e) => { if (activePanel === null) setSelectedId(null); }}
        >
          <ZoomControls scale={scale} setScale={setScale} onReset={() => calculateFitScale(canvasSize)} />

          <div style={{ width: canvasSize.width * scale, height: canvasSize.height * scale, position: "relative" }}>
            <div
              id="canvas-root"
              style={{
                width: canvasSize.width, height: canvasSize.height,
                transform: `scale(${scale})`, transformOrigin: "top left",
                backgroundColor: "#ffffff", position: "absolute", top: 0, left: 0,
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.35)", overflow: "hidden"
              }}
              onClick={(e) => e.stopPropagation()}
            >
             {elements.map((el) => {
  // 1. Define the variable inside the map block
  const isSelected = selectedId === el.id;

  return (
    <div
      key={el.id}
      onMouseDown={(e) => {
        e.stopPropagation();
        handleMouseDown(e, el.id);
      }}
      style={{
        position: "absolute",
        left: `${el.x}px`,
        top: `${el.y}px`,
        width: typeof el.width === "number" ? `${el.width}px` : el.width,
        height: typeof el.height === "number" ? `${el.height}px` : el.height,
        ...el.style,
        // 2. Use the variable for dynamic styling
        zIndex: isSelected ? 9999 : (el.style?.zIndex || 1),
        cursor: isDragging && isSelected ? "grabbing" : "grab",
        boxShadow: isSelected ? "0 0 0 3px #8b5cf6" : "none",
        display: "flex",
        flexDirection: "column",
        userSelect: "none",
        overflow: "visible",
        
         // Allows handles to show outside the box
      }}
    >
      {/* SELECTION HANDLES */}
{isSelected && (
  <div style={{ 
    position: "absolute", 
    inset: "-4px", // Give a little breathing room outside the element
    pointerEvents: "none", // Container stays transparent to clicks
    zIndex: 10000 
  }}>
    {renderHandle("nw", "nwse-resize")}
    {renderHandle("ne", "nesw-resize")}
    {renderHandle("sw", "nesw-resize")}
    {renderHandle("se", "nwse-resize")}
    {renderHandle("n", "ns-resize")}
    {renderHandle("s", "ns-resize")}
    {renderHandle("e", "ew-resize")}
    {renderHandle("w", "ew-resize")}
  </div>
)}

      {/* ELEMENT CONTENT */}
   {el.type === "image" && (
  <img 
    src={el.src.startsWith('http') 
      ? `http://localhost:5000/api/proxy?url=${encodeURIComponent(el.src)}` 
      : el.src} 
    crossOrigin="anonymous" 
    className="w-full h-full pointer-events-none object-cover rounded-[inherit]" 
    style={{ filter: el.style?.filter || 'none' }} // ADD THIS LINE
    alt="" 
  />
)}

      {el.type === "text" && (
        <div
          style={{ 
            width: "100%", 
            height: "100%", 
            whiteSpace: "pre-line", 
            outline: "none", 
            textAlign: el.style?.textAlign || "left", 
            fontSize: el.style?.fontSize, 
            fontWeight: el.style?.fontWeight, 
            fontFamily: el.style?.fontFamily, 
            color: el.style?.color || "#000", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center" 
          }}
          contentEditable={isSelected}
          suppressContentEditableWarning={true}
          onClick={(e) => e.stopPropagation()}
          onBlur={(e) => {
            const newContent = e.target.innerText;
            setElements(prev => prev.map(item => item.id === el.id ? { ...item, content: newContent } : item));
          }}
        >
          {el.content}
        </div>
      )}

      {(el.type === "element" || el.type === "rect") && (
        <div style={{ 
          width: "100%", 
          height: "100%", 
          backgroundColor: el.style?.backgroundColor || el.style?.background || "transparent", 
          borderRadius: el.style?.borderRadius || "0px", 
          clipPath: el.style?.clipPath, 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center", 
          color: el.style?.color || "#ffffff" 
        }}>
          {el.content && <span style={{ fontSize: el.style?.fontSize, fontWeight: el.style?.fontWeight }}>{el.content}</span>}
        </div>
      )}

      {el.type === "video" && (
        <video 
          src={el.src} 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full pointer-events-none object-cover rounded-[inherit]" 
        />
      )}
    </div>
  );
})}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorLayout;