import { useState } from "react";
import { X } from "lucide-react";
export default function StylesPanel({ onClose, onSelectPalette }) {
  const [search, setSearch] = useState("");

  const palettes = [
    {
      name: "Sunset Glow",
      gradient: "from-orange-500 via-yellow-400 to-amber-800",
      textColor: "#f97316",
    },
    {
      name: "Berry Punch",
      gradient: "from-red-600 via-pink-400 to-purple-900",
      textColor: "#db2777",
    },
    {
      name: "Royal Indigo",
      gradient: "from-indigo-500 via-purple-600 to-purple-900",
      textColor: "#7c3aed",
    },
    {
      name: "Ocean Sand",
      gradient: "from-yellow-300 via-blue-500 to-indigo-900",
      textColor: "#2563eb",
    },
    {
      name: "Lavender Dream",
      gradient: "from-purple-400 via-pink-300 to-purple-800",
      textColor: "#a855f7",
    },
    {
      name: "Emerald Forest",
      gradient: "from-green-400 via-emerald-500 to-green-900",
      textColor: "#16a34a",
    },
    {
      name: "Midnight Sky",
      gradient: "from-gray-800 via-gray-900 to-black",
      textColor: "#111827",
    },
    {
      name: "Cotton Candy",
      gradient: "from-pink-300 via-rose-300 to-purple-400",
      textColor: "#ec4899",
    },
    {
      name: "Fire Blaze",
      gradient: "from-red-500 via-orange-500 to-yellow-400",
      textColor: "#ef4444",
    },
    {
      name: "Cool Mint",
      gradient: "from-teal-300 via-cyan-400 to-blue-500",
      textColor: "#06b6d4",
    },
    {
      name: "Golden Hour",
      gradient: "from-yellow-400 via-amber-500 to-orange-600",
      textColor: "#f59e0b",
    },
    {
      name: "Rose Gold",
      gradient: "from-rose-300 via-pink-400 to-amber-500",
      textColor: "#f43f5e",
    },
    {
      name: "Deep Space",
      gradient: "from-blue-900 via-indigo-900 to-purple-900",
      textColor: "#1e3a8a",
    },
    {
      name: "Neon Vibes",
      gradient: "from-fuchsia-500 via-purple-500 to-indigo-600",
      textColor: "#d946ef",
    },
    {
      name: "Fresh Lime",
      gradient: "from-lime-400 via-green-400 to-emerald-600",
      textColor: "#65a30d",
    },
  ];
  const filteredPalettes = palettes.filter((palette) =>
    palette.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-[320px] bg-white h-full border-r flex flex-col">

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b">
        <div className="flex p-1 rounded-lg">
          <h3 className="font-bold text-purple-700 text-xl flex items-center gap-2">
            Styles
          </h3>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-black transition">
          <X size={18} />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Styles, e.g. New Year..."
            className="w-full border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

        </div>



        {/* Palette List */}
        <div className="space-y-4">
          {filteredPalettes.map((palette, i) => (
            <div
              key={i}
              className="relative group cursor-pointer"
              onClick={() => onSelectPalette(palette.textColor)}
            >
              {/* Gradient Block */}
              <div
                className={`h-14 rounded-2xl border border-black/70 shadow-sm  bg-gradient-to-r ${palette.gradient}
  transition duration-200 group-hover:border-purple-600 group-hover:scale-[1.02]`}
              />

              {/* Hover Name Overlay */}
              <div className="absolute inset-0 rounded-2xl bg-black/40 opacity-0 
        group-hover:opacity-100 transition flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {palette.name}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}