import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  PlusCircle,
  Image as ImageIcon,
  Users,
  TrendingUp,
  Settings,
  LogOut,
  ChevronRight,
  Clock, Plane, User,
  ChevronDown,
  Layout
} from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  const [lastTemplate, setLastTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [templateCount, setTemplateCount] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [recentActivity, setRecentActivity] = useState(0);
  const [user, setUser] = useState({
    name: "Admin",
    email: "admin@tripsera.com",
    agencyName: "Tripsera Partner",
    role: "admin"
  });

  const PURPLE_PRIMARY = "#8458B3";

  useEffect(() => {
    // 1. SET USER FROM LOCAL STORAGE
    const savedUser = localStorage.getItem('tripsera_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(prev => ({
          ...prev,
          name: userData.agencyName || (userData.email ? userData.email.split('@')[0] : "Admin")
        }));
      } catch (e) {
        console.error("Error parsing user data:", e);
      }
    }

    // 2. FETCH ALL DASHBOARD DATA
    const loadDashboardData = async () => {
      setLoading(true);
      try {
        const [flyerRes, userRes, recentRes, activityRes] = await Promise.all([
          fetch('https://tripsera-web-backend-p3xr-a08bak8uj-supriya06ps-projects.vercel.app/api/flyers'),
          fetch('https://tripsera-web-backend-p3xr-a08bak8uj-supriya06ps-projects.vercel.app/api/users/count'),
          fetch('https://tripsera-web-backend-p3xr-a08bak8uj-supriya06ps-projects.vercel.app/api/flyers/latest'),
          fetch('https://tripsera-web-backend-p3xr-a08bak8uj-supriya06ps-projects.vercel.app/api/flyers/recent-count')
        ]);

        if (flyerRes.ok) {
          const flyerData = await flyerRes.json();
          setTemplateCount(flyerData.length || 0);
        }
        if (userRes.ok) {
          const userData = await userRes.json();
          const count = userData.total ?? userData.count ?? (typeof userData === 'number' ? userData : 0);
          setTotalUsers(count);
        }
        if (activityRes.ok) {
          const activityData = await activityRes.json();
          setRecentActivity(activityData.count || 0);
        }

        if (recentRes.ok) {
          const recentData = await recentRes.json();
          setLastTemplate(recentData);
        }
      } catch (err) {
        console.error("Dashboard Loading Error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const handleSignOut = () => {
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

  const stats = [
    {
      title: "Total Templates",
      value: loading ? "..." : templateCount.toString(),
      icon: <ImageIcon className="text-purple-600" />,
      detail: "Saved in Database"
    },
    {
      title: "Active Users",
      value: loading ? "..." : totalUsers.toString(),
      icon: <Users className="text-purple-600" />,
      detail: "Total Registered Users"
    },
    {
      title: "New Templates", // Changed title for clarity
      value: loading ? "..." : recentActivity.toString(),
      icon: <TrendingUp className="text-purple-600" />,
      detail: "Last 10 days"
    },
  ];

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Sidebar Navigation */}
     <aside className="relative w-64 border-r border-slate-200 flex flex-col p-6 bg-white overflow-hidden">
  {/* --- SIDEBAR BACKGROUND BLOBS --- */}
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-400/40 rounded-full filter blur-[60px] animate-blob" />
    <div className="absolute top-1/2 -right-10 w-32 h-32 bg-indigo-300/40 rounded-full filter blur-[50px] animate-blob animation-delay-2000" />
    <div className="absolute -bottom-10 left-10 w-36 h-36 bg-purple-200/30 rounded-full filter blur-[60px] animate-blob animation-delay-4000" />
  </div>

  {/* Sidebar Content (Added z-10 to stay above blobs) */}
  <div className="relative z-10 flex flex-col h-full">
    <div className="flex items-center gap-2 mb-10 px-2 group">
      <div className="bg-gradient-to-br from-purple-600 to-indigo-600 p-2 rounded-xl shadow-lg shadow-purple-200 group-hover:rotate-[15deg] group-hover:scale-110 transition-all duration-300">
        <Plane className="w-6 h-6 text-white" />
      </div>
      <h1 className="text-xl font-black tracking-tighter bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
        Tripsera
        <span className="text-[10px] text-black font-black uppercase tracking-widest block bg-none">
          Admin Panel
        </span>
      </h1>
    </div>

    <nav className="flex-1 space-y-1">
      <Link to="/admin" className="flex items-center gap-3 p-3 bg-purple-50/80 backdrop-blur-sm text-purple-700 rounded-xl font-bold transition-all border border-purple-100/50">
        <LayoutDashboard size={20} /> Dashboard
      </Link>
      <Link to="/admin/editor" className="flex items-center gap-3 p-3 text-slate-600 hover:text-purple-600 hover:bg-purple-50/80 rounded-xl transition-all font-medium">
        <PlusCircle size={20} /> Create Template
      </Link>
      <Link to="/gallery" className="flex items-center gap-3 p-3 text-slate-600 hover:text-purple-600 hover:bg-purple-50/80 rounded-xl transition-all font-medium">
        <ImageIcon size={20} /> View Gallery
      </Link>
      <div className="pt-4 mt-4 border-t border-slate-100">
        <Link
          to="/admin/manage-templates"
          className="flex items-center gap-3 p-3 text-slate-600 hover:text-purple-600 hover:bg-purple-50/80 rounded-xl transition-all font-medium"
        >
          <Settings size={20} /> Manage Templates
        </Link>
      </div>
    </nav>
  </div>
</aside>

      <main className="flex-1 overflow-y-auto p-8">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome, <span className="text-purple-600">{user.name}</span>
            </h1>
            <p className="text-slate-500 mt-1 font-medium">Monitoring your travel agency platform activity.</p>
          </div>
          {/* Grouping Button and Profile */}
          <div className="flex items-center gap-3">
            <Button
              onClick={() => navigate('/admin/editor')}
              style={{ backgroundColor: PURPLE_PRIMARY }}
              className="hover:brightness-110 text-white shadow-lg shadow-purple-200 flex gap-2 px-6 h-11 rounded-full font-bold transition-all active:scale-95"
            >
              <PlusCircle size={18} /> New Template
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
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Top Left Purple */}
    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/50 rounded-full mix-blend-multiply filter blur-[120px] animate-blob opacity-70" />
    
    {/* Bottom Right Indigo */}
    <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-500/50 rounded-full mix-blend-multiply filter blur-[120px] animate-blob animation-delay-2000 opacity-70" />
    
    {/* Middle Pinkish (Optional for extra depth) */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-pink-500/50 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-4000 opacity-50" />
  </div>
          {stats.map((stat, i) => (
            <Card key={i} className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow rounded-2xl border-none ring-1 ring-slate-200">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  {stat.title}
                </CardTitle>
                <div className="p-2.5 bg-purple-50 rounded-xl">
                  {stat.icon}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black text-slate-800">{stat.value}</div>
                <p className="text-xs text-emerald-600 mt-1 font-bold">{stat.detail}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Template Section */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
            <h3 className="font-bold text-lg text-slate-800">Recently Modified Template</h3>
            <Link to="/gallery" className="text-sm font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1">
              View All <ChevronRight size={14} />
            </Link>
          </div>

          <div className="p-8">
            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center space-y-4">
                <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                <p className="text-slate-400 text-sm font-medium">Fetching your latest flyer...</p>
              </div>
            ) : lastTemplate ? (
              <div
                className="group relative flex flex-col md:flex-row items-center gap-10 p-8 rounded-3xl border border-slate-100 hover:border-purple-200 hover:bg-purple-50/20 transition-all cursor-pointer shadow-sm hover:shadow-xl"
                onClick={() => navigate('/admin/editor', { state: { template: lastTemplate } })}
              >
                {/* PREVIEW CONTAINER */}
                <div
                  className="bg-white rounded-2xl overflow-hidden flex-shrink-0 border border-slate-200 relative shadow-2xl ring-8 ring-slate-50"
                  style={{
                    width: '300px',
                    height: lastTemplate.canvasSize ? `${(lastTemplate.canvasSize.height / lastTemplate.canvasSize.width) * 300}px` : '400px',
                    minHeight: '400px'
                  }}
                >
                  <div
                    style={{
                      width: lastTemplate.canvasSize?.width || 800,
                      height: lastTemplate.canvasSize?.height || 1200,
                      transform: `scale(${300 / (lastTemplate.canvasSize?.width || 800)})`,
                      transformOrigin: 'top left',
                      position: 'absolute',
                      backgroundColor: lastTemplate.backgroundColor || '#ffffff',
                      pointerEvents: 'none',
                    }}
                  >
                    {[...(lastTemplate.elements || [])]
                      .sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0))
                      .map((el, index) => (
                        <div
                          key={el.id || index}
                          style={{
                            position: 'absolute',
                            left: el.x,
                            top: el.y,
                            width: el.width,
                            height: el.height,
                            zIndex: el.zIndex || 1,
                            opacity: el.opacity ?? 1,
                            backgroundImage: el.type === 'image' ? `url(${el.src})` : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            color: el.color || '#000',
                            fontSize: el.fontSize ? `${el.fontSize}px` : '16px',
                            fontWeight: el.fontWeight || 'bold',
                            fontFamily: el.fontFamily || 'Plus Jakarta Sans, sans-serif',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: el.textAlign || 'center',
                            textAlign: el.textAlign || 'center',
                            backgroundColor: el.type === 'shape' ? (el.color || '#e2e8f0') : 'transparent',
                            whiteSpace: 'pre-wrap',
                            overflow: 'hidden'
                          }}
                        >
                          {el.type === 'text' && el.content}
                        </div>
                      ))}
                  </div>
                </div>

                {/* DETAILS */}
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-black uppercase rounded-full tracking-wider">
                      Ready to Use
                    </span>
                    <div className="flex items-center text-sm text-slate-400 font-bold">
                      <Clock size={16} className="mr-2" />
                      Updated {new Date(lastTemplate.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <h4 className="text-3xl font-black text-slate-800 group-hover:text-purple-700 transition-colors leading-tight mb-4">
                    {lastTemplate.title || "Untitled Flyer"}
                  </h4>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <p className="text-[10px] uppercase font-black text-slate-400 mb-1">Dimensions</p>
                      <p className="text-lg font-bold text-slate-700">{lastTemplate.canvasSize?.width} × {lastTemplate.canvasSize?.height}px</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <p className="text-[10px] uppercase font-black text-slate-400 mb-1">Elements</p>
                      <p className="text-lg font-bold text-slate-700">{lastTemplate.elements?.length || 0} layers</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Button
                      style={{ backgroundColor: PURPLE_PRIMARY }}
                      className="h-14 px-8 text-base font-black rounded-2xl text-white shadow-xl shadow-purple-200 hover:brightness-110 active:scale-95 transition-all flex gap-3"
                    >
                      <PlusCircle size={20} /> Continue Editing
                    </Button>
                    <Link to="/gallery" className="text-slate-400 hover:text-slate-600 font-bold flex items-center gap-1 transition-colors">
                      Preview Full <ChevronRight size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-20 text-center border-2 border-dashed border-slate-100 rounded-3xl">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-50 rounded-full mb-4 text-slate-200">
                  <ImageIcon size={32} />
                </div>
                <p className="text-slate-500 font-bold text-xl">No templates found in your database.</p>
                <Button
                  variant="link"
                  onClick={() => navigate('/admin/editor')}
                  className="text-purple-600 font-black mt-2 text-sm uppercase tracking-widest"
                >
                  Create your first design now →
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
