import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Plane, Palette, Zap, Download, Users, Shield,
  ArrowRight, Sparkles, CheckCircle2, User, LogOut,
  Layout, PlusCircle, ChevronDown, Bell, ShieldCheck
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import editorMockup from "@/assets/editor-mockup.jpg";
import Chatbot from "../components/Chatbot";

const Index = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem("user");
      }
    }
  }, []);

const handleLogout = () => {
  // 1. Clear the physical storage
  localStorage.removeItem("user");
  localStorage.removeItem("token");

  // 2. Update the React state (THIS TRIGGERS THE RE-RENDER)
  setUser(null); 

  // 3. Notify and redirect
  toast.success("Logged out successfully");
  navigate("/");
};
  

  const handleStartDesigning = () => {
    if (user) {
      navigate("/gallery");
    } else {
      toast.info("Please sign in to start designing");
      navigate("/auth");
    }
  };

  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#fafafa] selection:bg-purple-200 selection:text-purple-900">

      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-purple-100/50 bg-white/70 backdrop-blur-md hover:bg-white/95 hover:shadow-lg group/nav">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">

          {/* Logo Section */}
          <div className="flex items-center gap-10">
            <div
              className="flex items-center gap-2.5 group cursor-pointer"
              onClick={() => navigate("/")}
            >
              <div className="bg-gradient-to-br from-purple-600 to-indigo-600 p-2 rounded-xl shadow-lg shadow-purple-200 group-hover:rotate-[15deg] group-hover:scale-110 transition-all duration-300">
                <Plane className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-black tracking-tighter bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent group-hover:from-indigo-600 group-hover:to-purple-600 transition-all duration-500">
                Tripsera
              </h1>
            </div>

            {/* "My Designs" remains here next to logo */}
            {user && (
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
            )}
          </div>

          {/* Action Buttons Section */}
          <div className="flex gap-4 items-center">
            {user ? (
              <div className="flex items-center gap-3">

                {/* MOVED: Admin Panel Button - Now placed before "Create New" */}
                {user?.role === 'admin' && (
                  <Link to="/admin" className="hidden md:block relative group/link">
                    <Button
                      variant="ghost"
                      className={`relative text-sm font-bold transition-all duration-500 px-5 py-2 rounded-xl overflow-hidden
                  hover:scale-105 hover:-translate-y-0.5 active:scale-95
                  ${location.pathname === "/admin"
                          ? "text-purple-700 bg-purple-50"
                          : "text-slate-600 hover:text-purple-700 hover:bg-purple-50/80"
                        }`}
                    >
                      <ShieldCheck className={`w-4 h-4 mr-2 transition-transform duration-300 group-hover/link:rotate-12 ${location.pathname === "/admin" ? "text-purple-600" : ""
                        }`} />
                      <span className="relative z-10">Admin Panel</span>
                      <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-purple-600 transition-all duration-300 group-hover/link:w-2/3 ${location.pathname === "/admin" ? "w-2/3" : "w-0"
                        }`} />
                    </Button>
                  </Link>
                )}

                {/* Create New Button */}
                <Button
                  onClick={handleStartDesigning}
                  className="hidden sm:flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full shadow-md hover:shadow-purple-200 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span className="text-sm font-bold">Create New</span>
                </Button>

                {/* Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 outline-none group/profile ml-2">
                      <div className="h-10 w-10 rounded-full border-2 border-purple-100 bg-white p-0.5 transition-all duration-300 group-hover/profile:border-purple-400 group-hover/profile:shadow-md">
                        <div className="w-full h-full rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white">
                          <User className="h-5 w-5" />
                        </div>
                      </div>
                      <ChevronDown className="w-4 h-4 text-slate-400 group-hover/profile:text-purple-600 group-hover/profile:translate-y-0.5 transition-all" />
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="w-72 mt-3 p-2 rounded-2xl shadow-2xl border-purple-50" align="end">
                    <DropdownMenuLabel className="px-3 py-4">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-bold text-slate-900">{user?.agencyName}</p>
                        <p className="text-xs text-slate-500 font-medium">{user?.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-purple-50" />
                    <div className="py-2">
                      <DropdownMenuItem onClick={() => navigate("/gallery")} className="rounded-xl py-3 cursor-pointer focus:bg-purple-50 group">
                        <Layout className="mr-3 h-4 w-4 text-slate-400 group-hover:text-purple-600 transition-colors" />
                        <span className="font-semibold text-slate-700">My Designs </span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleStartDesigning} className="rounded-xl py-3 cursor-pointer focus:bg-purple-50 group">
                        <PlusCircle className="mr-3 h-4 w-4 text-slate-400 group-hover:text-purple-600 transition-colors" />
                        <span className="font-semibold text-slate-700">Create New Design</span>
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
            ) : (
              <div className="flex items-center gap-3">
                <Button asChild variant="ghost" className="hidden sm:inline-flex text-slate-600 hover:text-purple-600 hover:bg-purple-50 font-bold rounded-xl transition-all">
                  <Link to="/auth">Log In</Link>
                </Button>
                <Button asChild className="bg-slate-900 hover:bg-purple-600 text-white px-6 rounded-xl shadow-lg hover:shadow-purple-200 hover:-translate-y-0.5 transition-all duration-300">
                  <Link to="/auth?signup=true">Join Now</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="pt-20"> {/* Spacer for fixed navbar */}
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 overflow-hidden">
          {/* Perspective Styles - Injected for the 3D effect */}
          <style dangerouslySetInnerHTML={{
            __html: `
    .perspective-container { perspective: 1000px; }
    .tilt-card { 
      transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), shadow 0.5s ease;
      transform-style: preserve-3d;
    }
    .tilt-card:hover {
      transform: rotateY(-10deg) rotateX(5deg) scale(1.02);
    }
  `}} />

          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-400/60 rounded-full mix-blend-multiply filter blur-[120px] animate-blob" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-300/50 rounded-full mix-blend-multiply filter blur-[120px] animate-blob animation-delay-2000" />

          <div className="relative container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white shadow-sm border border-purple-50 text-purple-600 text-sm font-semibold animate-bounce-slow">
                  <Sparkles className="w-6 h-6 text-purple-500" />
                  <span>Premium Design Tool</span>
                </div>

                <div className="space-y-6">
                  <h2 className="text-6xl lg:text-[5rem] font-extrabold leading-[1.1] text-slate-900 tracking-tighter">
                    Create Stunning <br />
                    <span className="bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">
                      Travel Designs
                    </span>
                  </h2>

                  <p className="text-xl text-slate-500 max-w-xl leading-relaxed">
                    Empower your travel agency with ready-to-edit templates and an intuitive design editor.
                    Stand out from the competition with professional-grade itineraries and marketing materials in minutes.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-5">
                  <Button
                    size="xl"
                    onClick={handleStartDesigning}
                    className="h-16 px-10 bg-purple-600 hover:bg-purple-700 text-white text-lg font-bold rounded-2xl shadow-2xl shadow-purple-200 transition-all hover:-translate-y-1"
                  >
                    Start Designing Now <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button
                    size="xl"
                    variant="outline"
                    onClick={scrollToFeatures}
                    className="h-16 px-10 border-slate-200 text-slate-600 hover:bg-slate-50 text-lg font-semibold rounded-2xl"
                  >
                    View Features
                  </Button>
                </div>

                <div className="flex items-center gap-6 pt-4 text-slate-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-purple-500" />
                    <span className="text-sm font-medium">No Design Skills Needed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-purple-500" />
                    <span className="text-sm font-medium">Ready-to-Print</span>
                  </div>
                </div>
              </div>

              {/* --- ANIMATED IMAGE SECTION --- */}
              <div className="relative perspective-container group">
                {/* Floating background glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 animate-pulse"></div>

                <div className="tilt-card relative rounded-[2rem] overflow-hidden border-8 border-white shadow-2xl bg-white">
                  {/* Subtle Glare Effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                  <img
                    src={editorMockup}
                    alt="Tripsera Interface"
                    className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Floating UI Element Badge */}
                  <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl z-20 border border-purple-100 animate-float hidden md:block">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 p-2 rounded-full">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800">Design Verified</p>
                        <p className="text-[10px] text-slate-500">Ready for high-res export</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Features Section */}
        {/* Features Section */}
        <section id="features" className="py-32 bg-white relative overflow-hidden">

          {/* TOP LEFT BLOBS */}
          <div className="absolute top-0 -left-20 w-[600px] h-[900px] bg-purple-500/60 rounded-full mix-blend-multiply filter blur-[130px] animate-blob pointer-events-none" />

          {/* BOTTOM RIGHT BLOBS */}
          <div className="absolute -bottom-20 -right-20 w-[600px] h-[900px] bg-purple-500/60 rounded-full mix-blend-multiply filter blur-[130px] animate-blob animation-delay-4000 pointer-events-none" />

          <div className="relative container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div className="max-w-2xl space-y-4">
                <h3 className="text-purple-600 font-black uppercase tracking-[0.2em] text-sm">Capabilities</h3>
                <h4 className="text-5xl font-bold text-slate-900 tracking-tight">Everything your agency needs to grow.</h4>
              </div>
              <p className="text-slate-500 text-lg max-w-xs">
                Meticulously designed tools to help you create, share, and manage your travel brand.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                { icon: Palette, title: "Premium Templates", desc: "Curated library for tour packages, cruises, and luxury stays.", color: "bg-purple-600" },
                { icon: Zap, title: "Lightning Editor", desc: "Fast-loading, smooth, and intuitive drag-and-drop experience.", color: "bg-indigo-600" },
                { icon: Download, title: "Multi-Format Export", desc: "High-resolution PDF for print or JPEG for Instagram/WhatsApp.", color: "bg-violet-600" },
                { icon: Users, title: "Brand Assets", desc: "Save your agency fonts, logos, and colors for instant access.", color: "bg-fuchsia-600" },
                { icon: Shield, title: "Design Privacy", desc: "Secure local and cloud storage for all your client proposals.", color: "bg-purple-900" },
                { icon: Plane, title: "Itinerary Studio", desc: "Transform text into visual step-by-step travel experiences.", color: "bg-slate-900" },
              ].map(({ icon: Icon, title, desc, color }) => (
                <div key={title} className="group p-10 rounded-[2rem] bg-white/60 backdrop-blur-md hover:bg-white border border-purple-50/50 hover:border-purple-100 hover:shadow-2xl hover:shadow-purple-100 transition-all duration-500">
                  <div className={`w-16 h-16 rounded-2xl ${color} flex items-center justify-center mb-8 shadow-xl transition-transform duration-500 group-hover:rotate-[10deg]`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold mb-4 text-slate-900">{title}</h4>
                  <p className="text-slate-500 leading-relaxed text-lg">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 container mx-auto px-6">
          <div className="relative rounded-[4rem] overflow-hidden bg-slate-900 py-24 px-10 text-center shadow-3xl">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#4c1d95,transparent)] opacity-40" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-10">
              <h3 className="text-5xl lg:text-7xl font-extrabold text-white tracking-tighter">
                Start your next <br />
                <span className="text-purple-400 italic">adventure</span> with us.
              </h3>

              <p className="text-purple-100/70 text-xl font-medium">
                Join the growing community of travel professionals redefining the industry.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  size="xl"
                  onClick={() => navigate(user ? "/gallery" : "/auth")}
                  className="h-20 px-12 bg-white text-slate-900 hover:bg-purple-50 text-2xl font-black rounded-[1.5rem] shadow-white/10"
                >
                  {user ? "Enter Your Gallery" : "Join Tripsera Free"}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        {/* Updated Footer for Razorpay Compliance */}
        <footer className="py-20 bg-white border-t border-purple-50">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 text-left">
              {/* Brand Column */}
              <div className="col-span-1 md:col-span-1 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="bg-purple-600 p-1.5 rounded-lg">
                    <Plane className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-black text-slate-900">Tripsera</span>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed">
                  The ultimate design suite for modern travel agencies. Create, edit, and export in minutes.
                </p>
              </div>

              {/* Product Links */}
              <div>
                <h5 className="font-bold text-slate-900 mb-6">Platform</h5>
                <ul className="space-y-4 text-sm text-slate-500 font-medium">
                  <li><Link to="/gallery" className="hover:text-purple-600 transition-colors">Template Gallery</Link></li>
                  <li><Link to="/editor" className="hover:text-purple-600 transition-colors">Design Editor</Link></li>
                  <li><button onClick={scrollToFeatures} className="hover:text-purple-600 transition-colors">Key Features</button></li>
                </ul>
              </div>

              {/* Legal Links - MANDATORY FOR RAZORPAY */}
              <div>
                <h5 className="font-bold text-slate-900 mb-6">Legal & Policy</h5>
                <ul className="space-y-4 text-sm text-slate-500 font-medium">
                  <li><Link to="/privacy-policy" className="hover:text-purple-600 transition-colors">Privacy Policy</Link></li>
                  <li><Link to="/terms-and-conditions" className="hover:text-purple-600 transition-colors">Terms & Conditions</Link></li>
                  <li><Link to="/refund-policy" className="hover:text-purple-600 transition-colors">Refund & Cancellation</Link></li>
                </ul>
              </div>

              {/* Support Links - MANDATORY FOR RAZORPAY */}
              <div>
                <h5 className="font-bold text-slate-900 mb-6">Contact Support</h5>
                <ul className="space-y-4 text-sm text-slate-500 font-medium">
                  <li><Link to="/contact" className="hover:text-purple-600 transition-colors">Help Center</Link></li>
                  <li className="text-slate-400">supriyapachore06@gmail.com</li>
                  <li className="text-slate-400 text-xs">
                    Sinnar<br />
                    Nashik, Maharashtra, 422103
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t border-purple-50 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-slate-400 font-bold tracking-widest text-[10px] uppercase">
                © 2026 Tripsera Design Systems. All Rights Reserved.
              </p>
              <div className="flex gap-6">
                <ShieldCheck className="w-5 h-5 text-slate-300 hover:text-purple-500 cursor-help" />
              </div>
            </div>
          </div>
        </footer>
      </div>

      <Chatbot />
    </div>
  );
};

export default Index;
