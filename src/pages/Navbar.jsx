import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Plane, Home, User, ChevronDown,
  Sparkles, LogOut, Download,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
const Navbar = ({ user, onExport }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/");
    // Note: This won't trigger a re-render in the Parent unless 
    // the parent is also listening to localStorage.
  };
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-[100] transition-all duration-300",
      "bg-white", // Forced solid white background
      scrollY > 10
        ? "shadow-lg py-1 border-b border-slate-100" // Added a subtle border on scroll
        : "py-4"
    )}>
      {/* Optional: Global hover shadow for the whole bar */}
      <div className="absolute inset-0 hover:shadow-2xl hover:shadow-purple-500/5 transition-shadow duration-500 pointer-events-none" />

      <div className="container mx-auto px-6 flex items-center justify-between relative z-10">

        {/* --- LEFT SECTION --- */}
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-2.5 group cursor-pointer">
            <div className="bg-gradient-to-br from-purple-600 to-indigo-600 p-2 rounded-xl shadow-lg shadow-purple-200 group-hover:rotate-[15deg] group-hover:scale-110 transition-all duration-300">
              <Plane className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-black tracking-tighter bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent group-hover:from-indigo-600 group-hover:to-purple-600 transition-all duration-500">
              Tripsera
            </h1>
          </Link>
        </div>

        {/* --- RIGHT SECTION --- */}
        <div className="flex items-center gap-5">

          {/* DASHBOARD LINK */}
          <Link to="/" className="relative group/dash">
            <Button
              variant="ghost"
              className={cn(
                "relative text-sm font-bold transition-all duration-300 px-5 py-2 rounded-xl overflow-hidden hover:scale-105 active:scale-95",
                location.pathname === "/"
                  ? "text-purple-700 bg-purple-50"
                  : "text-slate-600 bg-transparent hover:bg-purple-50 hover:text-purple-700"
              )}
            >
              <Home className={cn(
                "w-4 h-4 mr-2 transition-transform duration-300 group-hover/dash:rotate-12",
                location.pathname === "/" ? "text-purple-600" : ""
              )} />
              <span className="relative z-10">Dashboard</span>
              {location.pathname === "/" && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-2/3 bg-purple-600 rounded-full" />
              )}
            </Button>
          </Link>

          {/* EXPORT BUTTON */}
          <Button
            onClick={onExport}
            className={cn(
              "relative text-sm font-bold transition-all duration-300 px-6 py-2 rounded-xl overflow-hidden",
              "bg-gradient-to-r from-purple-600 to-indigo-600 text-white",
              "hover:scale-105 hover:-translate-y-0.5 active:scale-95 shadow-md hover:shadow-purple-400/40",
              "border-none group/export"
            )}
          >
            <Download className="w-4 h-4 mr-2 transition-transform duration-300 group-hover/export:translate-y-0.5" />
            <span className="relative z-10">Export</span>
          </Button>

          {/* PROFILE DROPDOWN */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 outline-none group/profile">
                <div className="h-10 w-10 rounded-full border-2 border-purple-100 bg-white p-0.5 transition-all duration-300 group-hover/profile:border-purple-400">
                  <div className="w-full h-full rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white">
                    <User className="h-5 w-5" />
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover/profile:text-purple-600 group-hover/profile:translate-y-0.5 transition-all" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-72 mt-3 p-2 rounded-2xl shadow-2xl border-slate-100 bg-white animate-in fade-in zoom-in duration-200"
              align="end"
            >
              <DropdownMenuLabel className="px-3 py-4">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-bold text-slate-900">{user?.agencyName || user?.name || "Guest"}</p>
                  <p className="text-xs text-slate-500 font-medium">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-slate-100" />
              <div className="py-1">
                <DropdownMenuItem onClick={() => navigate("/gallery")} className="rounded-xl py-3 cursor-pointer focus:bg-purple-50 group">
                  <Sparkles className="mr-3 h-4 w-4 text-slate-400 group-hover:text-purple-600 transition-colors" />
                  <span className="font-semibold text-slate-700">My Design Library</span>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator className="bg-slate-100" />
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
  );
};

export default Navbar;