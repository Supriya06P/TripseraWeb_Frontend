import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Gallery from "./pages/Gallery";
import EditorLayout from "./pages/EditorLayout";
import NotFound from "./pages/NotFound";
import AdminTemplateEditor from "./admin/TemplateEditor";
import ManageTemplates from "./admin/ManageTemplates";
import AdminDashboard from "./admin/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import LegalPage from "./pages/LegalPage"; // We will create this next
import "./index.css";

const queryClient = new QueryClient();

const App = () => {
  // Content required for Razorpay Compliance
  const legalContent = {
    privacy: (
      <div className="space-y-4">
        <p>At Tripsera, we take your privacy seriously. This policy outlines how we handle your data.</p>
        <h3 className="font-bold text-slate-900">1. Data Collection</h3>
        <p>We collect your agency name, email, and design assets solely to provide our template editing services.</p>
        <h3 className="font-bold text-slate-900">2. Security</h3>
        <p>Your payment information is processed securely via Razorpay. We do not store credit card or UPI details on our servers.</p>
      </div>
    ),
    terms: (
      <div className="space-y-4">
        <p>By using Tripsera, you agree to the following terms of service.</p>
        <h3 className="font-bold text-slate-900">1. License to Use</h3>
        <p>You are granted a license to use our templates for your travel agency marketing. You may not resell the templates as your own products.</p>
        <h3 className="font-bold text-slate-900">2. Account Responsibility</h3>
        <p>You are responsible for maintaining the confidentiality of your account login credentials.</p>
      </div>
    ),
    refund: (
      <div className="space-y-4">
        <p>Our goal is to ensure you are satisfied with your designs.</p>
        <h3 className="font-bold text-slate-900">1. Digital Nature</h3>
        <p>Since Tripsera provides digital templates, we generally do not offer refunds once a template has been edited or exported.</p>
        <h3 className="font-bold text-slate-900">2. Technical Issues</h3>
        <p>If you experience a technical failure preventing you from accessing a paid service, please contact us within 48 hours for a resolution or refund.</p>
      </div>
    ),
    contact: (
      <div className="space-y-6">
        <p>Have questions about your account or a payment? Reach out to our support team.</p>
        <div className="p-6 bg-purple-50 rounded-2xl border border-purple-100">
          <p className="font-bold text-purple-900">Email: supriyapachore06@gamil.com</p>
          <p className="text-purple-700 mt-2">Address: Sinnar, Nashik, Maharashtra, India</p>
        </div>
      </div>
    )
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/editor" element={<EditorLayout />} />

            {/* MANDATORY COMPLIANCE ROUTES */}
            <Route path="/privacy-policy" element={<LegalPage title="Privacy Policy" content={legalContent.privacy} />} />
            <Route path="/terms-and-conditions" element={<LegalPage title="Terms & Conditions" content={legalContent.terms} />} />
            <Route path="/refund-policy" element={<LegalPage title="Refund & Cancellation" content={legalContent.refund} />} />
            <Route path="/contact" element={<LegalPage title="Contact Us" content={legalContent.contact} />} />

            {/* ADMIN ROUTES */}
            <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/editor" element={<ProtectedRoute><AdminTemplateEditor /></ProtectedRoute>} />
            <Route path="/admin/manage-templates" element={<ProtectedRoute><ManageTemplates /></ProtectedRoute>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;