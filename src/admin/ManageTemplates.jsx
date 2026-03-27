import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import {
  Edit2, Trash2, Search, Loader2, Sparkles, X, Plane,
  Layout, ShieldCheck, PlusCircle, User, ChevronDown, LogOut
} from 'lucide-react';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ManageTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState({
    name: "Admin",
    email: "admin@tripsera.com",
    agencyName: "Tripsera Partner",
    role: "admin"
  });
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = () => {
    // 1. Clear specific local storage keys
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem('tripsera_token');
    localStorage.removeItem('tripsera_user');

    // 2. Reset the user state
    setUser(null);

    // 3. Show feedback
    toast.success("Logged out successfully");

    // 4. Redirect to landing page
    navigate("/");
  };

  const handleStartDesigning = () => {
    navigate("/admin/editor");
  };

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/flyers');
        const data = await response.json();
        setTemplates(data);
      } catch (err) {
        toast.error("Failed to load templates from database");
      } finally {
        setLoading(false);
      }
    };
    fetchTemplates();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this template permanently?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/flyers/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setTemplates(templates.filter(t => t._id !== id));
        toast.success("Template removed successfully");
      }
    } catch (err) {
      toast.error("Delete operation failed");
    }
  };

  const filteredTemplates = templates.filter(t =>
    (t.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (t.category || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative min-h-screen bg-[#f8f7ff] p-8 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-purple-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Navbar Section */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-purple-100/50 bg-white/70 backdrop-blur-md hover:bg-white/95 hover:shadow-lg group/nav">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-2.5 group cursor-pointer" onClick={() => navigate("/")}>
              <div className="bg-gradient-to-br from-purple-600 to-indigo-600 p-2 rounded-xl shadow-lg shadow-purple-200 group-hover:rotate-[15deg] group-hover:scale-110 transition-all duration-300">
                <Plane className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-black tracking-tighter bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent group-hover:from-indigo-600 group-hover:to-purple-600 transition-all duration-500">
                Tripsera
              </h1>
            </div>
          </div>

          <div className="flex gap-4 items-center">
            {user && (
              <div className="flex items-center gap-3">

                <Button onClick={handleStartDesigning} className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full transition-all">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Create New
                </Button>

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

                  <DropdownMenuContent className="w-72 mt-3 p-2 rounded-2xl shadow-2xl border-purple-50" align="end">
                    <DropdownMenuLabel className="px-3 py-4">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-bold text-slate-900">{user?.agencyName || "Admin"}</p>
                        <p className="text-xs text-slate-500 font-medium">{user?.email}</p>
                      </div>
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator className="bg-purple-50" />
                    <DropdownMenuItem
                      onClick={handleSignOut}

                      className="rounded-xl py-3 cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-700 font-bold"
                    >
                      <LogOut className="mr-3 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-6xl mx-auto mt-24">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-600 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-[10px] font-black uppercase tracking-wider">Inventory Management</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900">
              Database <span className="text-purple-600">Templates</span>
            </h2>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-purple-600" />
            <input
              type="text"
              placeholder="Search templates..."
              className="block w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white/80 backdrop-blur-md rounded-[2rem] border border-white shadow-xl overflow-hidden">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 text-purple-600/50">
              <Loader2 className="w-12 h-12 mb-4 animate-spin" />
              <p className="font-black text-xs uppercase tracking-widest">Loading Database...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-purple-50 bg-purple-50/30">
                    <th className="py-5 px-8 text-[11px] uppercase tracking-widest text-purple-400 font-black">Design Details</th>
                    <th className="py-5 px-4 text-[11px] uppercase tracking-widest text-purple-400 font-black">Category</th>
                    <th className="py-5 px-4 text-[11px] uppercase tracking-widest text-purple-400 font-black">Added On</th>
                    <th className="py-5 px-8 text-[11px] uppercase tracking-widest text-purple-400 font-black text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredTemplates.map((template) => (
                    <tr key={template._id} className="group hover:bg-purple-50/40 transition-all">
                      <td className="py-5 px-8">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-800">{template.title || "Untitled"}</span>
                          <span className="text-[10px] text-slate-400">ID: {template._id.slice(-8)}</span>
                        </div>
                      </td>
                      <td className="py-5 px-4">
                        <span className="px-2 py-1 rounded-lg bg-white border border-purple-100 text-purple-600 text-[10px] font-black uppercase">
                          {template.category || "General"}
                        </span>
                      </td>
                      <td className="py-5 px-4 text-sm font-semibold text-slate-500">
                        {new Date(template.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-5 px-8 text-right space-x-2">
                        <button onClick={() => navigate('/admin/editor', { state: { template } })} className="p-2 text-slate-400 hover:text-purple-600 transition-all">
                          <Edit2 size={18} />
                        </button>
                        <button onClick={() => handleDelete(template._id)} className="p-2 text-slate-400 hover:text-red-600 transition-all">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageTemplates;