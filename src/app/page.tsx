import Link from 'next/link'
import { ArrowRight, Bot, FileText, GitPullRequest, RefreshCw, Terminal } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/75 dark:bg-slate-950/75 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Bot className="h-6 w-6 text-blue-600" />
            <span>LivingDocs AI</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-sm font-medium hover:text-blue-600 transition-colors">Features</Link>
            <Link href="#" className="text-sm font-medium hover:text-blue-600 transition-colors">Docs</Link>
            <Link href="https://github.com" className="text-sm font-medium hover:text-blue-600 transition-colors">GitHub</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 md:py-32 flex flex-col items-center text-center">
        <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-800 mb-6 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300">
          <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2 animate-pulse"></span>
          Now in Public Beta
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 max-w-4xl">
          The Documentation That <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">Writes Itself</span>.
        </h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl">
          Autonomous documentation that evolves with your code. Detect logic changes in PRs and auto-update docs, API references, and diagrams.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="inline-flex h-11 items-center justify-center rounded-md bg-blue-600 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-700">
            Get Started
          </button>
          <button className="inline-flex h-11 items-center justify-center rounded-md border border-slate-200 bg-transparent px-8 text-sm font-medium shadow-sm transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 dark:border-slate-800 dark:hover:bg-slate-800">
            View Demo
          </button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-24 bg-white dark:bg-slate-900 rounded-3xl my-12 shadow-sm border border-slate-100 dark:border-slate-800">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Everything you need to keep docs fresh</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Stop letting your documentation drift. LivingDocs AI hooks directly into your CI/CD pipeline.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<GitPullRequest className="h-10 w-10 text-blue-500" />}
            title="Self-Healing PRs"
            description="Automatically detects logic changes in merged PRs and suggests documentation updates instantly."
          />
          <FeatureCard 
            icon={<RefreshCw className="h-10 w-10 text-green-500" />}
            title="Auto-Drift Detection"
            description="Scans your codebase against existing docs to identify and flag outdated sections."
          />
          <FeatureCard 
            icon={<FileText className="h-10 w-10 text-purple-500" />}
            title="Visual Architecture"
            description="Generates and updates Mermaid.js diagrams based on your actual code structure."
          />
          <FeatureCard 
            icon={<Bot className="h-10 w-10 text-orange-500" />}
            title="Chat with Codebase"
            description="RAG-powered chat interface to query your codebase and documentation simultaneously."
          />
          <FeatureCard 
            icon={<Terminal className="h-10 w-10 text-slate-500" />}
            title="API Sandbox"
            description="Live API testing environment generated directly from your backend routes."
          />
          <FeatureCard 
            icon={<ArrowRight className="h-10 w-10 text-pink-500" />}
            title="Zero Config"
            description="Connect your repository and let our AST parsers do the heavy lifting."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-lg mb-4 md:mb-0">
            <Bot className="h-5 w-5 text-blue-600" />
            <span>LivingDocs AI</span>
          </div>
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} LivingDocs AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
        {description}
      </p>
    </div>
  )
}