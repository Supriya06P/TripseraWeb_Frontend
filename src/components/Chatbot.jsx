import { useState, useRef, useEffect, useCallback } from "react";
import {
  Plane,
  Globe,
  Map,
  Luggage,
  Palmtree,
  Compass,
  X,
  Send,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

// Tooltip prompts
const PROMPTS = [
  "Ask me anything!",
  "Need a design template?",
  "How do I export my work?",
  "Want to see my designs?",
  "I'm here to help! 👋",
];

// Travel icons rotation
const ICONS = [Plane, Globe, Map, Luggage, Palmtree, Compass];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [promptIndex, setPromptIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const [iconIndex, setIconIndex] = useState(0);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hey! 👋 I'm your Tripsera assistant. Ask me anything about templates, editing, or exporting!",
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  // Tooltip delay
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!open) setShowTooltip(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [open]);

  // Tooltip text animation
  useEffect(() => {
    if (!showTooltip || open) return;

    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setPromptIndex((prev) => (prev + 1) % PROMPTS.length);
        setFade(true);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, [showTooltip, open]);

  // Icon rotation
  useEffect(() => {
    if (open) return; // stop when open

    const interval = setInterval(() => {
      setIconIndex((prev) => (prev + 1) % ICONS.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  const handleToggle = () => {
    setOpen((o) => !o);
    setShowTooltip(false);
  };

  // ✅ UPDATED SEND FUNCTION (date/time fixed)
  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg = { role: "user", content: text };
    setInput("");

    const now = new Date();
    const lower = text.toLowerCase();

    // ✅ Instant date response
    if (lower.includes("date")) {
      setMessages((prev) => [
        ...prev,
        userMsg,
        { role: "assistant", content: now.toDateString() },
      ]);
      return;
    }

    // ✅ Instant time response
    if (lower.includes("time")) {
      setMessages((prev) => [
        ...prev,
        userMsg,
        { role: "assistant", content: now.toLocaleTimeString() },
      ]);
      return;
    }

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    let assistantSoFar = "";

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
  "Content-Type": "application/json",
  Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
},
        body: JSON.stringify({
          messages: [...messages, userMsg].map(({ role, content }) => ({
            role,
            content,
          })),
        }),
      });

      if (!resp.ok || !resp.body) throw new Error("Connection failed");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let streamDone = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const jsonStr = line.slice(6).trim();

            if (jsonStr === "[DONE]") {
              streamDone = true;
              break;
            }

            try {
              const parsed = JSON.parse(jsonStr);
              const content = parsed.choices?.[0]?.delta?.content;

              if (content) {
                assistantSoFar += content;

                setMessages((prev) => {
                  const last = prev[prev.length - 1];

                  if (last?.role === "assistant") {
                    return prev.map((m, i) =>
                      i === prev.length - 1
                        ? { ...m, content: assistantSoFar }
                        : m
                    );
                  }

                  return [...prev, { role: "assistant", content: assistantSoFar }];
                });
              }
            } catch {}
          }
        }
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "I'm having trouble connecting right now." },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages]);

  const ActiveIcon = ICONS[iconIndex];

  return (
    <>
      {/* Tooltip */}
      {showTooltip && !open && (
        <div className="fixed bottom-24 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="relative bg-white text-slate-800 px-5 py-3 rounded-2xl shadow-2xl border border-purple-100 text-sm font-bold flex items-center gap-3 min-w-[180px]">
            <Sparkles className="w-4 h-4 text-purple-500 animate-pulse shrink-0" />

            <span
              className={cn(
                "transition-all duration-500 transform",
                fade
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-2"
              )}
            >
              {PROMPTS[promptIndex]}
            </span>

            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-r border-b border-purple-100 rotate-45" />

            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              className="ml-1 p-1 rounded-full hover:bg-slate-100 text-slate-400"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={handleToggle}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full",
          "bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 text-white",
          "shadow-lg shadow-purple-300/40",
          "transition-all duration-500 hover:scale-110",
          open && "rotate-90 scale-95 shadow-none"
        )}
      >
        {open ? (
          <X className="h-6 w-6" />
        ) : (
          <ActiveIcon className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
        )}

        {!open && !showTooltip && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-purple-500 border-2 border-white"></span>
          </span>
        )}
      </button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-24 right-6 z-50 flex w-[380px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-[2rem] border border-purple-100 bg-white shadow-[0_20px_50px_rgba(147,51,234,0.15)] transition-all duration-500 origin-bottom-right",
          open
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-75 opacity-0 translate-y-12 pointer-events-none"
        )}
        style={{ height: "min(600px, calc(100vh - 10rem))" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-5 text-white">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-xl">
              <Compass className="h-5 w-5 text-purple-100" />
            </div>
            <div>
              <p className="font-bold text-base">Tripsera AI</p>
              <p className="text-[10px] text-purple-200 mt-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                Online
              </p>
            </div>
          </div>

          <button onClick={() => setOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 py-6 space-y-4 bg-slate-50/50"
        >
          {messages.map((m, i) => (
            <div
              key={i}
              className={cn(
                "flex",
                m.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm",
                  m.role === "user"
                    ? "bg-purple-600 text-white rounded-br-none"
                    : "bg-white text-slate-700 border border-purple-50 rounded-bl-none"
                )}
              >
                {m.content}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border px-4 py-3 rounded-2xl flex gap-1">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" />
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
          className="p-4 bg-white border-t flex gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
            className="flex-1 bg-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-400 outline-none"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="bg-purple-600 text-white p-3 rounded-xl hover:bg-purple-700"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </>
  );
}
