import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plane, Globe, Loader2, Mail, Phone, Lock, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const API_URL = "https://tripsera-web-backend.vercel.app/api/auth";

const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [showPhoneLogin, setShowPhoneLogin] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [serverOtp, setServerOtp] = useState("");
// Replace the old hardcoded object with this:
const ADMIN_CREDENTIALS = {
  email: import.meta.env.VITE_ADMIN_EMAIL,
  password: import.meta.env.VITE_ADMIN_PASSWORD
};
  // --- GOOGLE LOGIN ---
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      try {
        const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        const googleUser = await res.json();

        const backendRes = await fetch(`${API_URL}/google-sync`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: googleUser.email,
            name: googleUser.name,
            googleId: googleUser.sub,
          }),
        });

        const data = await backendRes.json();

        if (backendRes.ok) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          toast.success("Welcome back to Tripsera!");
          navigate("/");
        }
      } catch (error) {
        toast.error("Authentication failed. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    onError: () => toast.error("Google Login Failed"),
  });

const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    // 1. Check for Hardcoded Admin Credentials
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      const adminUser = { 
        email: email, 
        role: "admin", 
        agencyName: "System Administrator" 
      };
      
      localStorage.setItem("user", JSON.stringify(adminUser));
      localStorage.setItem("token", "admin-bypass-token"); // Mock token for admin
      
      toast.success("Admin access granted. Welcome, Commander.");
      setLoading(false);
      navigate("/admin");
      return; // Exit function early
    }

    // 2. Standard User Login Flow
    try {
      const response = await fetch(`${API_URL}/signin`, { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        toast.success("Welcome back!");
        
        // Final check: if backend also identifies user as admin
        if (data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        toast.error(data.message || "Invalid email or password.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Server connection failed.");
    } finally {
      setLoading(false);
    }
  };

// --- SIGN UP LOGIC ---
const handleSignUp = async (e) => {
  e.preventDefault();
  setLoading(true);

  const formData = new FormData(e.currentTarget);
  const agencyName = formData.get("agencyName");
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    // UPDATED: Changed /register to /signup to match backend
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ agencyName, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      toast.success("Account created! Please sign in.");
      navigate("/auth?signup=false");
    } else {
      toast.error(data.message || "Registration failed.");
    }
  } catch (error) {
    console.error("Signup Error:", error);
    toast.error("Server connection failed.");
  } finally {
    setLoading(false);
  }
};

  // --- PHONE OTP LOGIC ---
  const validatePhone = (num) => /^\d{10,15}$/.test(num);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!validatePhone(phone)) {
      toast.error("Enter a valid phone number.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = await response.json();
      if (response.ok) {
        setOtpSent(true);
        setServerOtp(data.otp.toString());
        toast.success("Verification code sent.");
      } else {
        toast.error(data.message || "Could not send code.");
      }
    } catch (error) {
      toast.error("Connection error.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (otp === serverOtp) {
      toast.success("Phone verified!");
      const mockUser = { email: `${phone}@phone.com`, role: "user", agencyName: "Phone User" };
      localStorage.setItem("user", JSON.stringify(mockUser));
      setTimeout(() => { navigate("/"); setLoading(false); }, 1000);
    } else {
      toast.error("Incorrect code.");
      setLoading(false);
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        if (user?.role === "admin") navigate("/admin");
        else if (user) navigate("/");
      } catch (e) { console.error(e); }
    }
  }, [navigate]);

  const defaultTab = searchParams.get("signup") === "true" ? "signup" : "signin";

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#FDFCFE] relative overflow-hidden font-sans">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] bg-purple-200/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-violet-100/60 rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-[420px] relative z-20">
        <div className="flex flex-col items-center mb-10">
          <Link to="/" className="flex items-center gap-3 group transition-transform hover:scale-105">
            <div className="bg-gradient-to-br from-purple-600 to-violet-700 p-2.5 rounded-2xl shadow-xl shadow-purple-200 group-hover:shadow-purple-300 transition-all">
              <Plane className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-purple-700 to-violet-900 bg-clip-text text-transparent">
              Tripsera
            </h1>
          </Link>
        </div>

        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 p-1 bg-purple-50/80 rounded-xl border border-purple-100">
            <TabsTrigger value="signin" className="rounded-lg py-2.5 text-purple-900/60 data-[state=active]:bg-white data-[state=active]:text-purple-700 transition-all">Sign In</TabsTrigger>
            <TabsTrigger value="signup" className="rounded-lg py-2.5 text-purple-900/60 data-[state=active]:bg-white data-[state=active]:text-purple-700 transition-all">Sign Up</TabsTrigger>
          </TabsList>

          {/* SIGN IN TAB */}
          <TabsContent value="signin" className="animate-in fade-in slide-in-from-bottom-2 duration-400">
            <Card className="border-purple-100/60 shadow-2xl shadow-purple-200/40 bg-white/90 backdrop-blur-md">
              <CardHeader className="space-y-1 pt-8">
                <CardTitle className="text-2xl font-bold tracking-tight text-purple-950">
                  {otpSent ? "Verify Identity" : "Welcome Back"}
                </CardTitle>
                <CardDescription className="text-purple-600/60">
                  {otpSent ? `Verification code sent to ${phone}` : "Manage your agency bookings with ease"}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6 pb-8">
                {!showPhoneLogin ? (
                  <form className="space-y-4" onSubmit={handleEmailLogin}>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold text-purple-800 uppercase tracking-widest ml-1">Email</Label>
                      <div className="relative group">
                        <Mail className="absolute left-3 top-3 w-4 h-4 text-purple-300 group-focus-within:text-purple-600 transition-colors" />
                        <Input name="email" type="email" placeholder="name@agency.com" className="pl-10 h-11 border-purple-100 focus:border-purple-500 bg-white/50" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold text-purple-800 uppercase tracking-widest ml-1">Password</Label>
                      <div className="relative group">
                        <Lock className="absolute left-3 top-3 w-4 h-4 text-purple-300 group-focus-within:text-purple-600 transition-colors" />
                        <Input name="password" type="password" placeholder="••••••••" className="pl-10 h-11 border-purple-100 focus:border-purple-500 bg-white/50" required />
                      </div>
                    </div>
                    <Button type="submit" className="w-full h-11 bg-purple-700 hover:bg-purple-800 text-white transition-all shadow-lg shadow-purple-200 active:scale-[0.98]" disabled={loading}>
                      {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Sign In"}
                    </Button>
                    <div className="flex justify-center">
                      <button type="button" onClick={() => setShowPhoneLogin(true)} className="text-sm text-purple-600 hover:text-purple-800 font-bold transition-colors">
                         Sign in with Phone
                      </button>
                    </div>
                  </form>
                ) : (
                  <form className="space-y-5" onSubmit={otpSent ? handleVerifyOTP : handleSendOTP}>
                    {!otpSent ? (
                      <div className="space-y-2">
                        <Label className="text-xs font-bold text-purple-800 uppercase tracking-widest ml-1 text-center block">Mobile Number</Label>
                        <div className="relative group">
                          <Phone className="absolute left-3 top-3 w-4 h-4 text-purple-300 group-focus-within:text-purple-600 transition-colors" />
                          <Input type="tel" placeholder="+1 (555) 000-0000" value={phone} onChange={(e) => setPhone(e.target.value)} className="pl-10 h-11 border-purple-100 focus:border-purple-500" required />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4 text-center">
                        <Input className="text-center text-3xl h-14 tracking-[0.4em] font-mono border-2 border-purple-100 focus:border-purple-600 transition-all bg-purple-50/30" maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value)} required autoFocus />
                        <button type="button" onClick={() => setOtpSent(false)} className="text-xs text-purple-400 hover:text-purple-700 underline font-medium">Re-enter number</button>
                      </div>
                    )}
                    <div className="space-y-3">
                      <Button type="submit" className="w-full h-11 bg-purple-700 hover:bg-purple-800 shadow-lg shadow-purple-200" disabled={loading}>
                        {loading ? <Loader2 className="animate-spin w-5 h-5" /> : (otpSent ? "Verify" : "Get OTP")}
                      </Button>
                      <div className="flex justify-center">
                        <button type="button" onClick={() => { setShowPhoneLogin(false); setOtpSent(false); }} className="flex items-center gap-1.5 text-sm text-purple-600 hover:text-purple-800 font-bold transition-colors">
                          <ArrowLeft className="w-3.5 h-3.5" /> Back to Email Login
                        </button>
                      </div>
                    </div>
                  </form>
                )}

                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-purple-100"></div>
                  <span className="flex-shrink mx-4 text-[10px] font-black text-purple-300 uppercase tracking-[0.3em]">Quick Access</span>
                  <div className="flex-grow border-t border-purple-100"></div>
                </div>

                <Button variant="outline" className="w-full h-11 border-purple-100 hover:bg-purple-50 text-purple-700 font-semibold group" onClick={() => handleGoogleLogin()} disabled={loading}>
                  <Globe className="w-4 h-4 mr-3 text-purple-400 group-hover:text-purple-600 transition-colors" />
                  Continue with Google
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SIGN UP TAB */}
          <TabsContent value="signup" className="animate-in fade-in slide-in-from-bottom-2 duration-400">
            <Card className="border-purple-100/60 shadow-2xl shadow-purple-200/40 bg-white/90">
              <CardHeader className="pt-8">
                <CardTitle className="text-2xl font-bold text-purple-950">Partner Registration</CardTitle>
                <CardDescription className="text-purple-600/60">Register your travel agency today.</CardDescription>
              </CardHeader>
              
              <form onSubmit={handleSignUp}>
                <CardContent className="space-y-4 pb-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-purple-800 uppercase tracking-widest ml-1">Agency Name</Label>
                    <Input name="agencyName" placeholder="Global Travels Inc." className="h-11 border-purple-100 focus:border-purple-500" required />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-purple-800 uppercase tracking-widest ml-1">Email</Label>
                    <Input name="email" type="email" placeholder="admin@agency.com" className="h-11 border-purple-100 focus:border-purple-500" required />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-purple-800 uppercase tracking-widest ml-1">Password</Label>
                    <Input name="password" type="password" placeholder="••••••••" className="h-11 border-purple-100 focus:border-purple-500" required />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full h-11 bg-purple-600 hover:bg-purple-700 text-white transition-all shadow-lg shadow-purple-200" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Account...
                      </>
                    ) : "Create Account"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;
