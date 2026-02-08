"use client";

import { Github } from "lucide-react";

export default function RepoLinkPage() {
  return (
    <div className="min-h-screen p-8 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-zinc-200/50 dark:bg-grid-zinc-800/50 mask-[radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none"></div>
      
      <div className="max-w-md w-full bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-2xl border border-zinc-100 dark:border-zinc-800 text-center relative z-10">
        <div className="mx-auto bg-zinc-900 dark:bg-zinc-100 w-20 h-20 rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-zinc-200 dark:shadow-zinc-900/50 rotate-3 hover:rotate-0 transition-transform duration-300">
          <Github className="h-10 w-10 text-white dark:text-zinc-900" />
        </div>
        <h1 className="text-2xl font-bold mb-3 text-zinc-900 dark:text-zinc-100 tracking-tight">Connect Repository</h1>
        <p className="text-zinc-500 dark:text-zinc-400 mb-8 leading-relaxed">
          Grant LivingDocs AI access to your GitHub repositories to start automating documentation.
        </p>
        
        <button className="w-full bg-[#24292F] hover:bg-black text-white font-medium py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-zinc-300 dark:shadow-zinc-900/50">
          <Github className="h-5 w-5" />
          Connect with GitHub
        </button>
        
        <div className="mt-6 text-xs text-zinc-400">
          By connecting, you agree to our Terms of Service and Privacy Policy.
        </div>
      </div>
    </div>
  );
}