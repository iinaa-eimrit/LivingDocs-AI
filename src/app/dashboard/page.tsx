import Link from "next/link";
import { GitBranch, BookOpen, Activity, Plus, ArrowUpRight, CheckCircle2 } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto">
      <header className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">Dashboard</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-2">Overview of your documentation health and activity.</p>
        </div>
        <Link href="/repo-link" className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 px-5 py-2.5 rounded-full font-medium transition-all shadow-lg shadow-zinc-200 dark:shadow-zinc-900/50 hover:shadow-xl">
          <Plus className="h-4 w-4" />
          <span>New Project</span>
        </Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-600 dark:text-blue-400">
              <BookOpen className="h-6 w-6" />
            </div>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">+2.4%</span>
          </div>
          <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">84%</div>
          <div className="text-sm text-zinc-500 dark:text-zinc-400">Documentation Coverage</div>
        </div>
        
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl text-purple-600 dark:text-purple-400">
              <GitBranch className="h-6 w-6" />
            </div>
          </div>
          <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">3</div>
          <div className="text-sm text-zinc-500 dark:text-zinc-400">Active PRs Monitored</div>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-xl text-orange-600 dark:text-orange-400">
              <Activity className="h-6 w-6" />
            </div>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">Action Needed</span>
          </div>
          <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">2 Files</div>
          <div className="text-sm text-zinc-500 dark:text-zinc-400">Drift Detected</div>
        </div>
      </div>

      <h2 className="text-lg font-semibold mb-4 text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
        <Activity className="h-5 w-5 text-zinc-500" />
        Active Repositories
      </h2>
      
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <div className="p-5 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors group cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500">
              <GitBranch className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-zinc-900 dark:text-zinc-100">livingdocs-ai/backend</p>
                <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-[10px] font-bold uppercase tracking-wide">Synced</span>
              </div>
              <p className="text-sm text-zinc-500 mt-0.5 flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" /> Updated 2 mins ago
              </p>
            </div>
          </div>
          <Link href="/doc-diff" className="flex items-center gap-1 text-sm font-medium text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            View Details <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}