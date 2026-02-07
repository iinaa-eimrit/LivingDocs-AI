import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-8">
      <h1 className="text-4xl font-bold mb-8 text-black dark:text-zinc-50">LivingDocs AI Dashboard</h1>
      <nav className="flex flex-col gap-4">
        <Link href="/repo-link" className="rounded-lg bg-white dark:bg-zinc-900 p-4 shadow hover:bg-zinc-100 dark:hover:bg-zinc-800 text-lg font-medium">Link GitHub Repo</Link>
        <Link href="/doc-diff" className="rounded-lg bg-white dark:bg-zinc-900 p-4 shadow hover:bg-zinc-100 dark:hover:bg-zinc-800 text-lg font-medium">Documentation Diff View</Link>
        <Link href="/architecture" className="rounded-lg bg-white dark:bg-zinc-900 p-4 shadow hover:bg-zinc-100 dark:hover:bg-zinc-800 text-lg font-medium">Architecture Diagrams</Link>
        <Link href="/chat" className="rounded-lg bg-white dark:bg-zinc-900 p-4 shadow hover:bg-zinc-100 dark:hover:bg-zinc-800 text-lg font-medium">Chat with Codebase</Link>
      </nav>
    </div>
  );
}
