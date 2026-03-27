import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  Plane, Search, LogOut, User, Plus, Loader2,
  Sparkles, Layout, X, ChevronDown, Home,
  Map, Umbrella, Heart, ShieldCheck
} from "lucide-react";
import { toast } from "sonner";
import Chatbot from "../components/Chatbot";
import LivePreview from "./LivePreview";

// Icon mapping for categories
const categoryIcons = {
  all: <Layout className="w-4 h-4" />,
  Rajasthan: <Plane className="w-4 h-4" />,
  Goa: <Map className="w-4 h-4" />,
  Luxury: <Sparkles className="w-4 h-4" />,
  Beach: <Umbrella className="w-4 h-4" />,
  Honeymoon: <Heart className="w-4 h-4" />,
};

const TemplateCard = ({ template, onClick }) => (
  <div className="flex flex-col gap-3 group animate-in fade-in slide-in-from-bottom-4 duration-500">
    <Card
      className="relative aspect-[4/5] cursor-pointer overflow-hidden border-none bg-white/80 backdrop-blur-sm transition-all duration-500 hover:shadow-2xl hover:shadow-purple-400/20 hover:-translate-y-2 rounded-2xl group p-0"
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <LivePreview template={template} />
      </div>

      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
        <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
          <span className="text-purple-600 font-bold text-sm">Open Flyer</span>
        </div>
      </div>
    </Card>

    <div className="flex items-center justify-between px-1 h-[26px]">
      <h3 className="text-sm font-bold text-slate-800 truncate">{template.title || "Untitled Design"}</h3>
      <span className="text-[10px] font-black uppercase text-purple-600 bg-purple-100/50 px-2 py-0.5 rounded-md">
        {template.category || "Flyer"}
      </span>
    </div>
  </div>
);

const Gallery = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [scrollY, setScrollY] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const location = useLocation();
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/flyers");
        const data = await response.json();
        const formattedData = data.map(item => ({
          ...item,
          id: item._id,
          name: item.title,
          category: item.category || "General"
        }));
        setTemplates(formattedData);
      } catch (error) {
        toast.error("Backend Connection Failed");
      } finally {
        setLoading(false);
      }
    };
    fetchTemplates();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const filteredTemplates = templates.filter((t) => {
    const matchesSearch = (t.title || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || t.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", ...Array.from(new Set([...templates.map((t) => t.category), "Thailand", "Kashmir", "Kerala", "Goa", "Rajasthan"]))].filter(Boolean);

  if (!user) return null;

  return (
    <div className="relative min-h-screen bg-[#f8f7ff] overflow-x-hidden">
      {/* Background Blooms */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-purple-500/80 rounded-full blur-[140px] " />
        <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-indigo-500/80 rounded-full blur-[120px]" />
      </div>

      {/* --- UNIFIED HIGH-FIDELITY NAVBAR --- */}
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 border-b",
        scrollY > 10
          ? "bg-white/90 backdrop-blur-md shadow-lg border-purple-100 py-3"
          : "bg-white border-transparent py-5"
      )}>
        <div className="container mx-auto px-6 flex items-center justify-between">

          {/* Logo Section */}
          <div className="flex items-center gap-10">
            <Link to="/" className="flex items-center gap-2.5 group cursor-pointer">
              <div className="bg-gradient-to-br from-purple-600 to-indigo-600 p-2 rounded-xl shadow-lg shadow-purple-200 group-hover:rotate-[15deg] group-hover:scale-110 transition-all duration-300">
                <Plane className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-black tracking-tighter bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent group-hover:from-indigo-600 group-hover:to-purple-600 transition-all duration-500">
                Tripsera
              </h1>
            </Link>

            {/* --- LEFT SIDE: MY DESIGNS LINK --- */}
            <div className="hidden lg:flex items-center gap-2">
              <Link to="/my-design" className="relative group/link">
                <Button
                  variant="ghost"
                  className={`relative text-sm font-bold transition-all duration-500 px-5 py-2 rounded-xl overflow-hidden
                hover:scale-105 hover:-translate-y-0.5 active:scale-95
                ${location.pathname === "/my-design"
                      ? "text-purple-700 bg-purple-50"
                      : "text-slate-600 hover:text-purple-700 hover:bg-purple-50/80"
                    }`}
                >
                  <Layout className={`w-4 h-4 mr-2 transition-transform duration-300 group-hover/link:rotate-12 ${location.pathname === "/my-design" ? "text-purple-600" : ""
                    }`} />
                  <span className="relative z-10">My Designs</span>
                  <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-purple-600 transition-all duration-300 group-hover/link:w-2/3 ${location.pathname === "/my-design" ? "w-2/3" : "w-0"
                    }`} />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Action Section */}
          <div className="flex items-center gap-5">
            {/* ADMIN PANEL */}
            {/* ADMIN PANEL */}
            {user && user.role?.toLowerCase() === 'admin' && (
              <Link to="/admin" className="relative group/admin flex items-center">
                <Button
                  variant="ghost"
                  className={cn(
                    "relative text-sm font-bold transition-all duration-500 px-5 py-2 rounded-xl overflow-hidden hover:scale-105 hover:-translate-y-0.5 active:scale-95 hover:bg-purple-50 hover:text-purple-700",
                    location.pathname === "/admin" ? "text-purple-700 bg-purple-50" : "text-slate-600 bg-transparent"
                  )}
                >
                  <ShieldCheck className={cn(
                    "w-4 h-4 mr-2 transition-transform duration-300 group-hover/admin:rotate-12", // Added rotation here
                    location.pathname === "/admin" ? "text-purple-600" : ""
                  )} />
                  <span className="relative z-10">Admin Panel</span>

                  {/* ADDED THIS SPAN FOR THE UNDERLINE */}
                  <span className={cn(
                    "absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-purple-600 transition-all duration-300 group-hover/admin:w-2/3",
                    location.pathname === "/admin" ? "w-2/3" : "w-0"
                  )} />
                </Button>
              </Link>
            )}

            {/* DASHBOARD LINK */}
            <Link to="/" className="relative group/dash">
              <Button
                variant="ghost"
                className={cn(
                  "relative text-sm font-bold transition-all duration-500 px-5 py-2 rounded-xl overflow-hidden hover:scale-105 hover:-translate-y-0.5 active:scale-95 hover:bg-purple-50 hover:text-purple-700",
                  location.pathname === "/" ? "text-purple-700 bg-purple-50" : "text-slate-600 bg-transparent"
                )}
              >
                <Home className={cn(
                  "w-4 h-4 mr-2 transition-transform duration-300 group-hover/dash:rotate-12", // Changed scale-110 to rotate-12
                  location.pathname === "/" ? "text-purple-600" : ""
                )} />
                <span className="relative z-10">Dashboard</span>
                <span className={cn(
                  "absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-purple-600 transition-all duration-300 group-hover/dash:w-2/3",
                  location.pathname === "/" ? "w-2/3" : "w-0"
                )} />
              </Button>
            </Link>

            {/* Profile Dropdown */}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 outline-none group/profile">
                  <div className="h-10 w-10 rounded-full border-2 border-purple-100 bg-white p-0.5 transition-all duration-300 group-hover/profile:border-purple-400 group-hover/profile:shadow-md">
                    <div className="w-full h-full rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white">
                      <User className="h-5 w-5" />
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400 group-hover/profile:text-purple-600 group-hover/profile:translate-y-0.5 transition-all" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-72 mt-3 p-2 rounded-2xl shadow-2xl border-purple-50 bg-white/95 backdrop-blur-md animate-in fade-in zoom-in duration-200"
                align="end"
              >
                <DropdownMenuLabel className="px-3 py-4">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-bold text-slate-900">{user.agencyName || user.name}</p>
                    <p className="text-xs text-slate-500 font-medium">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-purple-50" />
                <div className="py-2">
                  <DropdownMenuItem onClick={() => navigate("/")} className="rounded-xl py-3 cursor-pointer focus:bg-purple-50 group">
                    <Layout className="mr-3 h-4 w-4 text-slate-400 group-hover:text-purple-600 transition-colors" />
                    <span className="font-semibold text-slate-700">Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/gallery")} className="rounded-xl py-3 cursor-pointer focus:bg-purple-50 group">
                    <Sparkles className="mr-3 h-4 w-4 text-slate-400 group-hover:text-purple-600 transition-colors" />
                    <span className="font-semibold text-slate-700">My Design Library</span>
                  </DropdownMenuItem>
                </div>
                <DropdownMenuSeparator className="bg-purple-50" />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="rounded-xl py-3 cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-700 font-bold"
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>

            </DropdownMenu>
          </div>
        </div>
      </nav>

      <div className="relative z-10 backdrop-blur-[20px] min-h-screen pt-28">
        <section className="relative pb-4">
          <div className="container mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/50 backdrop-blur-md text-purple-600 border border-purple-100/50 shadow-sm mb-6">
              <Sparkles className="w-6 h-6 " />
              <span className="text-[11px] font-black uppercase tracking-wider">Premium Design Tool</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8">
              What will you <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">design today?</span>
            </h2>

            <div className="relative w-full max-w-2xl mx-auto group mb-12">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl blur opacity-0 group-focus-within:opacity-15 transition duration-500" />
              <div className="relative flex items-center bg-white/80 backdrop-blur-xl rounded-xl border border-slate-200/60 shadow-sm group-focus-within:border-purple-400/50 transition-all duration-500 overflow-hidden">
                <div className="ml-1.5 my-1.5 p-2 bg-slate-50 rounded-lg group-focus-within:bg-purple-50 transition-colors">
                  <Search className="w-4 h-4 text-slate-400 group-focus-within:text-purple-600" />
                </div>
                <input
                  placeholder="Search your flyers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent pl-3 pr-12 py-3 text-sm font-semibold text-slate-700 focus:outline-none"
                />
                <div className="absolute right-4">
                  {searchQuery ? (
                    <button onClick={() => setSearchQuery("")} className="p-1 hover:bg-red-50 rounded-full text-slate-400 hover:text-red-500"><X className="w-4 h-4" /></button>
                  ) : (
                    <div className="hidden md:block px-1.5 py-0.5 bg-slate-100 rounded border border-slate-200 text-[9px] font-black text-slate-400">SEARCH</div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "group relative flex items-center gap-2.5 px-5 py-2.5 rounded-2xl text-sm font-bold transition-all duration-500 border-2",
                      isActive
                        ? "bg-gradient-to-br from-purple-600 to-indigo-600 text-white border-transparent shadow-lg shadow-purple-200 -translate-y-1"
                        : "bg-white/50 backdrop-blur-sm text-slate-600 border-white hover:border-purple-200 hover:bg-white hover:-translate-y-1"
                    )}
                  >
                    <span className={cn(
                      "transition-transform duration-300 group-hover:rotate-12",
                      isActive ? "text-white" : "text-purple-500"
                    )}>
                      {categoryIcons[cat] || <Sparkles className="w-4 h-4" />}
                    </span>
                    <span className="capitalize">{cat}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <main className="container mx-auto px-6 pb-24">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 text-purple-900/40 font-black text-xs uppercase tracking-widest">
              <Loader2 className="w-10 h-10 mb-4 animate-spin" /> Syncing Masterpieces
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {selectedCategory === "all" && !searchQuery && (
                <div className="flex flex-col gap-3 group cursor-pointer" onClick={() => navigate("/editor")}>
                  <Card className="relative aspect-[4/5] flex flex-col items-center justify-center border-2 border-dashed border-purple-200 bg-white/50 hover:border-purple-400 hover:bg-white transition-all duration-500 rounded-2xl shadow-xl shadow-purple-100/10 p-0">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-200 group-hover:scale-110 transition-transform">
                      <Plus className="w-8 h-8 text-white" />
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-sm font-black text-slate-800 uppercase tracking-tighter">Start Fresh</p>
                      <p className="text-[10px] text-purple-400 font-bold uppercase">New Canvas</p>
                    </div>
                  </Card>
                  <div className="h-[26px]" />
                </div>
              )}

              {filteredTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} onClick={() => setSelectedTemplate(template)} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Preview Modal */}
      {selectedTemplate && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xl z-[200] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-5xl rounded-[2.5rem] shadow-2xl relative flex flex-col md:flex-row overflow-hidden animate-in zoom-in-95 border border-purple-50">

            {/* Close Button */}
            <button
              onClick={() => setSelectedTemplate(null)}
              className="absolute top-6 right-6 z-50 bg-white/80 backdrop-blur-md shadow-lg w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all border border-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Side: Preview Area with NEW BLOB */}
            <div className="w-full md:w-3/5 bg-slate-50 flex items-center justify-center p-8 md:p-12 border-r border-slate-100 relative overflow-hidden">
              {/* TOP LEFT BLOB */}
              <div className="absolute top-[-30%] left-[-10%] w-[40%] h-[100%] rounded-full bg-purple-500/50 blur-[120px] pointer-events-none" />

              <div className="relative w-full max-w-[320px] aspect-[4/5] shadow-2xl rounded-2xl overflow-hidden bg-white ring-8 ring-white/50 z-10">
                <LivePreview template={selectedTemplate} />
              </div>
            </div>

            {/* Right Side: Details Area */}
            <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col justify-between bg-white relative z-10">
              <div className="space-y-8">
                {/* Header */}
                <div>
                  <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-[10px] font-black rounded-full uppercase tracking-wider mb-3">
                    {selectedTemplate.category || "Premium Template"}
                  </span>
                  <h2 className="text-4xl font-black text-slate-900 leading-tight mb-2">
                    {selectedTemplate.title}
                  </h2>
                  <p className="text-slate-500 text-sm font-medium">Professional travel flyer design</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Elements</p>
                    <p className="text-lg font-black text-slate-800">{selectedTemplate.elements?.length || 0} Layers</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Canvas Size</p>
                    <p className="text-lg font-black text-slate-800">
                      {selectedTemplate.canvasSize?.width} × {selectedTemplate.canvasSize?.height}
                    </p>
                  </div>
                </div>

                {/* Price Section */}
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-purple-600">
                    ₹{selectedTemplate.price || "499"}
                  </span>
                  <span className="text-slate-400 text-sm font-bold line-through">₹999</span>
                  <span className="ml-auto text-green-500 text-xs font-black uppercase bg-green-50 px-2 py-1 rounded-md">50% Off</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-8 space-y-3">
                <Button
                  className="w-full h-14 font-black bg-purple-600 hover:bg-purple-700 text-white rounded-2xl shadow-xl shadow-purple-200 transition-all active:scale-95 flex items-center justify-center gap-2"
                  onClick={() => navigate(`/editor`, { state: { template: selectedTemplate } })}
                >
                  <Layout className="w-5 h-5" />
                  Continue Editing
                </Button>
                <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                  Auto-saved to your workspace
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Chatbot />
    </div>
  );
};

export default Gallery;