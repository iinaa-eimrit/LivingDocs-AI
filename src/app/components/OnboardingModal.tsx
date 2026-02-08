"use client";
import { useState, useEffect } from "react";

const steps = [
  {
    title: "Welcome to LivingDocs AI!",
    content: (
      <>
        <p className="mb-2">This platform automates your documentation workflow using AI.</p>
        <ul className="list-disc pl-5 text-sm text-zinc-700 dark:text-zinc-200">
          <li>Auto-generates and updates docs with every code change</li>
          <li>Creates PRs for documentation updates</li>
          <li>Lets you chat with your codebase and test APIs</li>
        </ul>
      </>
    ),
  },
  {
    title: "How to Get Started",
    content: (
      <ol className="list-decimal pl-5 text-sm text-zinc-700 dark:text-zinc-200 space-y-1">
        <li>Link your GitHub repository from the sidebar.</li>
        <li>Push code changes to trigger doc updates.</li>
        <li>Review and merge PRs for docs.</li>
        <li>Use Chat and API Playground for more features.</li>
      </ol>
    ),
  },
  {
    title: "Need Help?",
    content: (
      <>
        <p className="mb-2">Each page has a <b>help</b> button (<svg className="inline" width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M12 16v-1m0-7a3 3 0 0 1 3 3c0 1.5-1.5 2-2.25 2.25-.75.25-.75.75-.75 1.25v.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>) for quick tips.</p>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">You can revisit this onboarding anytime from the dashboard.</p>
      </>
    ),
  },
];

export default function OnboardingModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined" && !window.localStorage.getItem("ldocs-onboarded")) {
      setOpen(true);
    }
  }, []);

  const close = () => {
    setOpen(false);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("ldocs-onboarded", "1");
    }
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 animate-fade-in">
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-8 max-w-md w-full animate-fade-in">
        <h2 className="text-xl font-bold mb-2 text-blue-700 dark:text-blue-300">{steps[step].title}</h2>
        <div className="mb-4">{steps[step].content}</div>
        <div className="flex justify-between items-center">
          <button
            className="text-sm text-zinc-500 hover:underline"
            onClick={close}
          >Skip</button>
          <div className="flex gap-2">
            {step > 0 && (
              <button className="rounded bg-zinc-200 dark:bg-zinc-700 px-3 py-1 text-sm" onClick={() => setStep(s => s - 1)}>Back</button>
            )}
            {step < steps.length - 1 ? (
              <button className="rounded bg-blue-600 text-white px-4 py-1 text-sm font-semibold hover:bg-blue-700" onClick={() => setStep(s => s + 1)}>Next</button>
            ) : (
              <button className="rounded bg-green-600 text-white px-4 py-1 text-sm font-semibold hover:bg-green-700" onClick={close}>Finish</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}