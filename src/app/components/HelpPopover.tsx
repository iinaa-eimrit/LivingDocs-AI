"use client";
import { useState } from "react";

export default function HelpPopover({ title, content }: { title: string; content: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-block">
      <button
        className="rounded-full bg-blue-100 dark:bg-blue-900 p-2 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label="Show help"
        onClick={() => setOpen((v) => !v)}
        type="button"
      >
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M12 16v-1m0-7a3 3 0 0 1 3 3c0 1.5-1.5 2-2.25 2.25-.75.25-.75.75-.75 1.25v.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
      </button>
      {open && (
        <div className="absolute z-50 left-1/2 -translate-x-1/2 mt-2 w-80 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-lg p-4 animate-fade-in">
          <div className="flex items-center gap-2 mb-2">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M12 16v-1m0-7a3 3 0 0 1 3 3c0 1.5-1.5 2-2.25 2.25-.75.25-.75.75-.75 1.25v.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            <span className="font-semibold text-blue-700 dark:text-blue-300">{title}</span>
          </div>
          <div className="text-zinc-700 dark:text-zinc-200 text-sm">{content}</div>
          <button
            className="mt-4 w-full rounded bg-blue-600 text-white py-2 font-semibold hover:bg-blue-700"
            onClick={() => setOpen(false)}
          >Got it</button>
        </div>
      )}
    </div>
  );
}