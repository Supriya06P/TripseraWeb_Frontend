// Template data structure for pre-designed templates

// Sample template data with Fabric.js canvas configurations
export const templateDatabase = {
  "1": {
    id: "1",
    name: "Beach Paradise",
    category: "Beach & Tropical",
    description: "Sun-kissed beach poster with tropical vibes",
    elementCount: 8,
    canvasData: {
      version: "6.0.0",
      objects: [
        { type: "rect", left: 0, top: 0, width: 1080, height: 1080, fill: "#E0F7FA", selectable: false, evented: false },
        { type: "rect", left: 0, top: 700, width: 1080, height: 380, fill: "#B2EBF2", selectable: false, evented: false },
        { type: "circle", left: 820, top: 60, radius: 70, fill: "#FFD54F", opacity: 0.9 },
        { type: "i-text", left: 540, top: 120, fontSize: 76, fontFamily: "Georgia", fontWeight: "bold", fill: "#006064", text: "Beach Paradise", textAlign: "center", originX: "center", originY: "center" },
        { type: "i-text", left: 540, top: 220, fontSize: 28, fontFamily: "Georgia", fontStyle: "italic", fill: "#00838F", text: "Escape to tropical bliss", textAlign: "center", originX: "center", originY: "center" },
        { type: "rect", left: 90, top: 320, width: 900, height: 340, fill: "#FFFFFF", rx: 24, ry: 24, opacity: 0.95 },
        { type: "i-text", left: 540, top: 420, fontSize: 22, fontFamily: "Inter", fill: "#424242", text: "7 Nights All-Inclusive\nStarting from $1,299 per person", textAlign: "center", originX: "center", originY: "center", lineHeight: 1.6 },
        { type: "rect", left: 340, top: 540, width: 400, height: 60, fill: "#00ACC1", rx: 30, ry: 30 },
        { type: "i-text", left: 540, top: 570, fontSize: 22, fontFamily: "Inter", fontWeight: "bold", fill: "#FFFFFF", text: "BOOK NOW", textAlign: "center", originX: "center", originY: "center" },
        { type: "i-text", left: 540, top: 820, fontSize: 18, fontFamily: "Inter", fill: "#006064", text: "Your Agency Name  •  www.youragency.com", textAlign: "center", originX: "center", originY: "center" },
      ],
    },
  },
  "2": {
    id: "2",
    name: "Mountain Adventure",
    category: "Mountain & Nature",
    description: "Bold mountain expedition poster with dramatic layout",
    elementCount: 9,
    canvasData: {
      version: "6.0.0",
      objects: [
        { type: "rect", left: 0, top: 0, width: 1080, height: 1080, fill: "#1A202C", selectable: false, evented: false },
        { type: "triangle", left: 100, top: 580, width: 300, height: 400, fill: "#4A5568", opacity: 0.7 },
        { type: "triangle", left: 350, top: 500, width: 400, height: 500, fill: "#2D3748", opacity: 0.8 },
        { type: "triangle", left: 600, top: 550, width: 350, height: 450, fill: "#4A5568", opacity: 0.6 },
        { type: "circle", left: 800, top: 80, radius: 45, fill: "#F6E05E", opacity: 0.9 },
        { type: "i-text", left: 540, top: 150, fontSize: 72, fontFamily: "Georgia", fontWeight: "bold", fill: "#FFFFFF", text: "Mountain\nAdventure", textAlign: "center", originX: "center", originY: "center", lineHeight: 1.2 },
        { type: "i-text", left: 540, top: 300, fontSize: 26, fontFamily: "Inter", fill: "#E2E8F0", text: "Conquer the peaks  •  Find your summit", textAlign: "center", originX: "center", originY: "center" },
        { type: "rect", left: 290, top: 380, width: 500, height: 120, fill: "#805AD5", rx: 16, ry: 16 },
        { type: "i-text", left: 540, top: 420, fontSize: 20, fontFamily: "Inter", fill: "#FFFFFF", text: "5-Day Guided Trek\nFrom $899", textAlign: "center", originX: "center", originY: "center", lineHeight: 1.5 },
      ],
    },
  },
  "3": {
    id: "3",
    name: "City Explorer",
    category: "City Tours",
    description: "Modern city tour promotional poster",
    elementCount: 10,
    canvasData: {
      version: "6.0.0",
      objects: [
        { type: "rect", left: 0, top: 0, width: 1080, height: 1080, fill: "#FFF3E0", selectable: false, evented: false },
        { type: "rect", left: 80, top: 620, width: 100, height: 280, fill: "#E65100", rx: 6, ry: 6 },
        { type: "rect", left: 200, top: 680, width: 80, height: 220, fill: "#FF9800", rx: 6, ry: 6 },
        { type: "rect", left: 300, top: 600, width: 120, height: 300, fill: "#F57C00", rx: 6, ry: 6 },
        { type: "rect", left: 450, top: 650, width: 90, height: 250, fill: "#FFB74D", rx: 6, ry: 6 },
        { type: "rect", left: 560, top: 580, width: 110, height: 320, fill: "#E65100", rx: 6, ry: 6 },
        { type: "i-text", left: 540, top: 120, fontSize: 80, fontFamily: "Georgia", fontWeight: "bold", fill: "#BF360C", text: "City Explorer", textAlign: "center", originX: "center", originY: "center" },
        { type: "i-text", left: 540, top: 230, fontSize: 30, fontFamily: "Inter", fill: "#E65100", text: "Urban adventures await around every corner", textAlign: "center", originX: "center", originY: "center" },
        { type: "rect", left: 140, top: 320, width: 800, height: 200, fill: "#FFFFFF", rx: 20, ry: 20, opacity: 0.95 },
        { type: "i-text", left: 540, top: 400, fontSize: 22, fontFamily: "Inter", fill: "#424242", text: "3-Day Walking Tour  •  Local Food Experience\nHotel + Transfers Included  •  From $599", textAlign: "center", originX: "center", originY: "center", lineHeight: 1.6 },
      ],
    },
  },
  "4": {
    id: "4",
    name: "Summer Getaway",
    category: "Beach & Tropical",
    description: "Bright and cheerful summer vacation flyer",
    elementCount: 7,
    canvasData: {
      version: "6.0.0",
      objects: [
        { type: "rect", left: 0, top: 0, width: 1080, height: 1080, fill: "#FFF9C4", selectable: false, evented: false },
        { type: "circle", left: 540, top: 300, radius: 200, fill: "#FFE082", originX: "center", originY: "center" },
        { type: "circle", left: 540, top: 300, radius: 140, fill: "#FFCA28", originX: "center", originY: "center" },
        { type: "i-text", left: 540, top: 100, fontSize: 80, fontFamily: "Georgia", fontWeight: "bold", fill: "#F57F17", text: "Summer\nGetaway", textAlign: "center", originX: "center", originY: "center", lineHeight: 1.1 },
        { type: "i-text", left: 540, top: 560, fontSize: 26, fontFamily: "Inter", fill: "#F57F17", text: "☀ All-inclusive packages from $799 ☀", textAlign: "center", originX: "center", originY: "center" },
        { type: "rect", left: 290, top: 640, width: 500, height: 60, fill: "#FF8F00", rx: 30, ry: 30 },
        { type: "i-text", left: 540, top: 670, fontSize: 22, fontFamily: "Inter", fontWeight: "bold", fill: "#FFFFFF", text: "RESERVE YOUR SPOT", textAlign: "center", originX: "center", originY: "center" },
        { type: "i-text", left: 540, top: 850, fontSize: 18, fontFamily: "Inter", fill: "#F57F17", text: "Limited availability  •  Book before June 30", textAlign: "center", originX: "center", originY: "center" },
      ],
    },
  },
  "5": {
    id: "5",
    name: "Alpine Escape",
    category: "Mountain & Nature",
    description: "Serene alpine retreat with minimalist design",
    elementCount: 6,
    canvasData: {
      version: "6.0.0",
      objects: [
        { type: "rect", left: 0, top: 0, width: 1080, height: 1080, fill: "#ECEFF1", selectable: false, evented: false },
        { type: "rect", left: 0, top: 0, width: 1080, height: 400, fill: "#263238", selectable: false, evented: false },
        { type: "i-text", left: 540, top: 120, fontSize: 76, fontFamily: "Georgia", fontWeight: "bold", fill: "#FFFFFF", text: "Alpine\nEscape", textAlign: "center", originX: "center", originY: "center", lineHeight: 1.1 },
        { type: "i-text", left: 540, top: 280, fontSize: 22, fontFamily: "Inter", fill: "#B0BEC5", text: "Where silence speaks louder than words", textAlign: "center", originX: "center", originY: "center" },
        { type: "rect", left: 140, top: 480, width: 800, height: 300, fill: "#FFFFFF", rx: 20, ry: 20 },
        { type: "i-text", left: 540, top: 580, fontSize: 22, fontFamily: "Inter", fill: "#37474F", text: "Cozy cabin stays  •  Guided hikes\nFarm-to-table dining\n\nFrom $1,099 per couple", textAlign: "center", originX: "center", originY: "center", lineHeight: 1.6 },
        { type: "i-text", left: 540, top: 900, fontSize: 32, fontFamily: "Georgia", fill: "#263238", text: "Experience mountain magic", textAlign: "center", originX: "center", originY: "center" },
      ],
    },
  },
  "6": {
    id: "6",
    name: "Urban Discovery",
    category: "City Tours",
    description: "Elegant city exploration poster with bold typography",
    elementCount: 7,
    canvasData: {
      version: "6.0.0",
      objects: [
        { type: "rect", left: 0, top: 0, width: 1080, height: 1080, fill: "#E8EAF6", selectable: false, evented: false },
        { type: "rect", left: 60, top: 60, width: 960, height: 960, fill: "transparent", stroke: "#3F51B5", strokeWidth: 3, rx: 20, ry: 20, selectable: false, evented: false },
        { type: "i-text", left: 540, top: 180, fontSize: 72, fontFamily: "Georgia", fontWeight: "bold", fill: "#1A237E", text: "Urban\nDiscovery", textAlign: "center", originX: "center", originY: "center", lineHeight: 1.1 },
        { type: "rect", left: 200, top: 340, width: 680, height: 300, fill: "#FFFFFF", rx: 16, ry: 16 },
        { type: "i-text", left: 540, top: 450, fontSize: 22, fontFamily: "Inter", fill: "#283593", text: "Hidden gems  •  Street art tours\nRooftop dining  •  Night markets\n\nCurated by local experts", textAlign: "center", originX: "center", originY: "center", lineHeight: 1.6 },
        { type: "rect", left: 340, top: 720, width: 400, height: 60, fill: "#3F51B5", rx: 30, ry: 30 },
        { type: "i-text", left: 540, top: 750, fontSize: 20, fontFamily: "Inter", fontWeight: "bold", fill: "#FFFFFF", text: "EXPLORE NOW", textAlign: "center", originX: "center", originY: "center" },
      ],
    },
  },
};

// Function to get template by ID
export const getTemplateById = (id) => {
  return templateDatabase[id] || null;
};

// Function to get all templates
export const getAllTemplates = () => {
  return Object.values(templateDatabase);
};
