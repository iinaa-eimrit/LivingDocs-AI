"use client";

import { useState } from "react";
import { Send, Bot, User } from "lucide-react";

export default function ChatPage() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAnswer("");
    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      setAnswer(data.answer || data.error);
    } catch {
      setAnswer("Error connecting to backend. Is FastAPI running?");
    }
    setLoading(false);
  };

  return (
    <div className="h-screen flex flex-col bg-zinc-50 dark:bg-black max-w-5xl mx-auto">
      <div className="flex-1 overflow-y-auto p-8 space-y-6">
        <div className="text-center mb-12 mt-8">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-blue-600 text-white mb-4 shadow-lg shadow-blue-600/20">
            <Bot className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Chat with Codebase</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-2">Ask questions about your architecture, logic, or dependencies.</p>
        </div>

        {answer && (
          <div className="flex gap-4 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
              <Bot className="h-6 w-6" />
            </div>
            <div className="flex-1 bg-white dark:bg-zinc-900 rounded-2xl rounded-tl-none p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap leading-relaxed">
              {answer}
            </div>
          </div>
        )}
      </div>

      <div className="p-6 bg-white/80 dark:bg-black/80 backdrop-blur-md border-t border-zinc-200 dark:border-zinc-800 sticky bottom-0 z-10">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto relative">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 pl-6 pr-14 py-4 text-base text-zinc-900 dark:text-zinc-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
            placeholder="Ask a question (e.g., 'Where is the auth logic?')"
            required
          />
          <button
            type="submit"
            className="absolute right-2 top-2 bottom-2 aspect-square rounded-xl bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors"
            disabled={loading}
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
        <div className="text-center mt-3">
          <p className="text-xs text-zinc-400 dark:text-zinc-600">AI can make mistakes. Verify important information.</p>
        </div>
      </div>
    </div>
  );
}