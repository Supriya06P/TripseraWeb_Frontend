import React from "react";

const TemplatePreview = ({ tpl, containerWidth }) => {
  if (!tpl || !tpl.canvasSize) return null;

  // Calculate the scale based on the desired width in the sidebar
  const scale = containerWidth / tpl.canvasSize.width;

  // Calculate height to maintain the correct aspect ratio
  const scaledHeight = tpl.canvasSize.height * scale;

  return (
    <div
      className="w-full flex items-center justify-center bg-slate-50 overflow-hidden"
      style={{ height: scaledHeight }}
    >
      <div
        style={{
          width: tpl.canvasSize.width,
          height: tpl.canvasSize.height,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          position: "relative",
          backgroundColor: tpl.backgroundColor || "white",
          flexShrink: 0,
        }}
      >
        {tpl.elements.map((el, i) => (
          <div
            key={el.id || i}
            style={{
              position: "absolute",
              left: el.x,
              top: el.y,
              width: el.width,
              height: el.height,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
              ...el.style,
            }}
          >
            {el.type === "image" ? (
              <img
                src={el.src}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <div style={{ width: "100%", whiteSpace: "pre-wrap" }}>
                {el.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplatePreview;