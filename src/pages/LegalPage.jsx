import { Plane, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const LegalPage = ({ title, content }) => {
    return (
        <div className="min-h-screen bg-[#fafafa] selection:bg-purple-200">
            <nav className="border-b border-purple-100 bg-white/70 backdrop-blur-md sticky top-0 z-50">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="bg-gradient-to-br from-purple-600 to-indigo-600 p-2 rounded-xl group-hover:rotate-12 transition-all">
                            <Plane className="w-5 h-5 text-white" />
                        </div>
                        <h1 className="text-xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                            Tripsera
                        </h1>
                    </Link>
                    <Button variant="ghost" asChild className="rounded-xl font-bold text-slate-600">
                        <Link to="/"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Home</Link>
                    </Button>
                </div>
            </nav>

            <main className="container mx-auto px-6 py-16 max-w-4xl">
                <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-xl shadow-purple-100/20 border border-purple-50">
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-10 tracking-tight">
                        {title}
                    </h2>
                    <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed">
                        {content}
                    </div>
                </div>

                <div className="mt-12 text-center text-slate-400 font-bold text-xs uppercase tracking-widest">
                    © 2026 Tripsera Design Systems. All Rights Reserved.
                </div>
            </main>
        </div>
    );
};

export default LegalPage;