import React, { useState, useEffect, useRef } from 'react';

const LivePreview = ({ template }) => {
  const containerRef = useRef(null);
  // Initializing scale as an object to handle X and Y independently
  const [scale, setScale] = useState({ x: 1, y: 1 });

  const elements = template?.elements || [];
  const canvasSize = template?.canvasSize || { width: 400, height: 560 };

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const containerW = container.offsetWidth;
        const containerH = container.offsetHeight;

        if (containerW && containerH) {
          // Calculate separate scales for width and height
          const scaleX = containerW / canvasSize.width;
          const scaleY = containerH / canvasSize.height;

          // Apply both to force a perfect fit to the container edges
          setScale({ x: scaleX, y: scaleY });
        }
      }
    };

    const timer = setTimeout(updateScale, 50);
    window.addEventListener('resize', updateScale);
    const observer = new ResizeObserver(updateScale);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      window.removeEventListener('resize', updateScale);
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [canvasSize.width, canvasSize.height]);

  if (!template || elements.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-50 text-slate-300 text-[10px] font-bold uppercase">
        Empty Design
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center bg-transparent overflow-hidden absolute inset-0"
    >
      <div
        style={{
          width: `${canvasSize.width}px`,
          height: `${canvasSize.height}px`,
          // Using non-uniform scaling to fill the card exactly
          transform: `scale(${scale.x}, ${scale.y})`,
          transformOrigin: 'center center',
          position: 'absolute',
          backgroundColor: 'white',
          backfaceVisibility: 'hidden',
          WebkitFontSmoothing: 'antialiased'
        }}
      >
        {elements.map((el, index) => (
          <div
            key={el.id || index}
            style={{
              position: 'absolute',
              left: `${el.x}px`,
              top: `${el.y}px`,
              width: `${el.width}px`,
              height: `${el.height}px`,
              zIndex: el.style?.zIndex || 1,
              ...el.style,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              overflow: 'hidden'
            }}
          >
            {el.type === 'image' ? (
              <img
                src={el.src}
                alt=""
                className="w-full h-full object-cover"
                style={{ display: 'block' }}
              />
            ) : (
              <span className="w-full text-center leading-tight">
                {el.content}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LivePreview;