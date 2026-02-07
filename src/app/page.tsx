import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black">
        <h1 className="text-4xl font-bold mb-6 text-black dark:text-zinc-50">LivingDocs AI</h1>
        <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400 mb-8">
          The Documentation That Writes Itself.<br />
          <span className="text-base text-zinc-500">Automatically keeps your docs, API references, and diagrams in sync with your codebase.</span>
        </p>
        <ul className="mb-8 text-lg text-zinc-700 dark:text-zinc-300 list-disc pl-6">
          <li>Auto-Drifting Detection</li>
          <li>Self-Healing PRs for docs</li>
          <li>Visual Architecture Generation</li>
          <li>Chat with Codebase (RAG)</li>
          <li>API Playground (always in sync)</li>
        </ul>
        <nav className="flex flex-col gap-4 w-full max-w-xs">
          <Link href="/dashboard" className="rounded-lg bg-blue-600 text-white p-4 text-center font-semibold hover:bg-blue-700">Go to Dashboard</Link>
          <Link href="/chat" className="rounded-lg bg-green-600 text-white p-4 text-center font-semibold hover:bg-green-700">Chat with Codebase</Link>
          <Link href="/api-playground" className="rounded-lg bg-purple-600 text-white p-4 text-center font-semibold hover:bg-purple-700">API Playground</Link>
        </nav>
      </main>
    </div>
  );
}
