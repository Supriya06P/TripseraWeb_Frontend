import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plane, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const API_URL ="https://tripsera-web-backend-p3xr-a08bak8uj-supriya06ps-projects.vercel.app/api/auth";

const authSchema = z.object({
  email: z.string().trim().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  agencyName: z.string().trim().min(2, { message: "Agency name must be at least 2 characters" }).optional(),
});

const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [signInData, setSignInData] = useState({ email: "", password: "" });
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    agencyName: "",
    adminKey: ""
  });

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        if (user && user.role === "admin") {
          navigate("/admin");
        } else if (user) {
          navigate("/");
        }
      } catch (e) {
        console.error("Failed to parse user from storage", e);
      }
    }
  }, [navigate]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signInData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed");

      // 1. Save to LocalStorage first
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // 2. Notify the user
      toast.success("Welcome back!");

      // 3. Navigate based on the role stored in the 'data' object
      if (data.user && data.user.role === "admin") {
        console.log("Redirecting to Admin...");
        navigate("/admin", { replace: true });
      } else {
        console.log("Redirecting to User Home...");
        navigate("/", { replace: true });
      }

    } catch (error) {
      console.error("Sign in error:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const validated = authSchema.parse(signUpData);

      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...validated,
          adminKey: signUpData.adminKey
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Registration failed");

      toast.success("Account created! You can now sign in.");
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error(error.message);
      }
    } finally { setLoading(false); }
  };

  const defaultTab = searchParams.get("signup") === "true" ? "signup" : "signin";

  return (
    <div className="relative min-h-screen bg-slate-50 flex items-center justify-center p-4 overflow-hidden">

      {/* --- PURPLE BLUR BACKGROUND ELEMENTS --- */}
      <div className="absolute top-[-30%] left-[-10%] w-[40%] h-[100%] rounded-full bg-purple-500/50 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[80%] rounded-full bg-purple-600/60 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-purple-300/20 blur-[100px] pointer-events-none" />

      {/* Content wrapper with relative z-index to stay above the blurs */}
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
            <Plane className="w-10 h-10 text-purple-600 transition-transform group-hover:rotate-12" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Tripsera
            </h1>
          </Link>
          <p className="text-muted-foreground font-medium">MongoDB Local Edition</p>
        </div>

        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-purple-100/50 backdrop-blur-sm p-1 border border-purple-100/50">
            <TabsTrigger value="signin" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white transition-all">Sign In</TabsTrigger>
            <TabsTrigger value="signup" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white transition-all">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="signin">
            {/* Added bg-white/80 and backdrop-blur to the cards for a glassy look */}
            <Card className="border-purple-100 shadow-2xl shadow-purple-900/10 bg-white/80 backdrop-blur-md">
              <form onSubmit={handleSignIn}>
                <CardHeader>
                  <CardTitle className="text-purple-950">Welcome Back</CardTitle>
                  <CardDescription>Sign in to your local MongoDB account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      className="focus-visible:ring-purple-500 bg-white/50"
                      value={signInData.email}
                      onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <Input
                      id="signin-password"
                      type="password"
                      className="focus-visible:ring-purple-500 bg-white/50"
                      value={signInData.password}
                      onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-all shadow-lg shadow-purple-200" disabled={loading}>
                    {loading ? "Connecting..." : "Sign In"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card className="border-purple-100 shadow-2xl shadow-purple-900/10 bg-white/80 backdrop-blur-md">
              <form onSubmit={handleSignUp}>
                <CardHeader>
                  <CardTitle className="text-purple-950">Create Account</CardTitle>
                  <CardDescription>Data will be stored on your PC</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-agency">Agency Name</Label>
                    <Input id="signup-agency" type="text" className="focus-visible:ring-purple-500 bg-white/50" value={signUpData.agencyName} onChange={(e) => setSignUpData({ ...signUpData, agencyName: e.target.value })} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input id="signup-email" type="email" className="focus-visible:ring-purple-500 bg-white/50" value={signUpData.email} onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input id="signup-password" type="password" className="focus-visible:ring-purple-500 bg-white/50" value={signUpData.password} onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })} required />
                  </div>
                  <div className="pt-4 mt-2 border-t border-dashed border-purple-200">
                    <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-purple-600 uppercase">
                      <ShieldCheck className="w-3 h-3" /> Admin Key
                    </div>
                    <Input
                      type="password"
                      className="focus-visible:ring-purple-500 bg-white/50"
                      placeholder="Optional Admin Secret"
                      value={signUpData.adminKey}
                      onChange={(e) => setSignUpData({ ...signUpData, adminKey: e.target.value })}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-all shadow-lg shadow-purple-200" disabled={loading}>
                    {loading ? "Saving to MongoDB..." : "Create Account"}
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
