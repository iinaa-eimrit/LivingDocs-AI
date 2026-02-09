"use client";

import { useEffect, useState } from "react";
import { Play, Terminal, Code2 } from "lucide-react";

type OpenAPISchema = {
  paths: Record<string, Record<string, unknown>>;
};

export default function ApiPlaygroundPage() {
  const [schema, setSchema] = useState<OpenAPISchema | null>(null);
  const [endpoint, setEndpoint] = useState("");
  const [method, setMethod] = useState("GET");
  const [body] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/openapi.json")
      .then(res => res.json())
      .then(data => setSchema(data))
      .catch(() => setError("Failed to load OpenAPI schema. Ensure Backend is running on port 8000."));
  }, []);

  const handleTry = async () => {
    setResponse("");
    const url = `http://localhost:8000${endpoint}`;
    const options: RequestInit = { method };
    if (body && method !== "GET") {
      options.headers = { "Content-Type": "application/json" };
      options.body = body;
    }
    try {
      const res = await fetch(url, options);
      const text = await res.text();
      setResponse(text);
    } catch {
      setResponse("Error: Could not connect to endpoint.");
    }
  };

  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-zinc-900 dark:bg-zinc-100 rounded-xl text-white dark:text-zinc-900">
          <Terminal className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">API Playground</h1>
          <p className="text-zinc-500 dark:text-zinc-400">Test your backend endpoints directly from the browser.</p>
        </div>
      </div>

      {error && <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg mb-6 border border-red-100 dark:border-red-900">{error}</div>}
      
      {schema && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800">
              <label htmlFor="endpoint-select" className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Endpoint</label>
              <select
                id="endpoint-select"
                aria-label="Endpoint"
                value={endpoint}
                onChange={e => setEndpoint(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 px-3 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              >
                <option value="">Select an endpoint...</option>
                {Object.entries(schema.paths).map(([path, methods]) => (
                  Object.keys(methods as object).map(m => (
                    <option key={path + m} value={path}>{`${m.toUpperCase()} ${path}`}</option>
                  ))
                ))}
              </select>

              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2 mt-4">Method</label>
              <div className="grid grid-cols-4 gap-2">
                {['GET', 'POST', 'PUT', 'DELETE'].map(m => (
                  <button
                    key={m}
                    onClick={() => setMethod(m)}
                    className={`px-3 py-2 rounded-lg text-sm font-bold border transition-all ${method === m ? 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-400' : 'bg-transparent border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800'}`}
                  >
                    {m}
                  </button>
                ))}
              </div>

              <button
                onClick={handleTry}
                className="w-full mt-6 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-medium py-3 hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!endpoint}
              >
                <Play className="h-4 w-4 fill-current" /> Send Request
              </button>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="bg-[#1e1e1e] rounded-2xl shadow-lg overflow-hidden border border-zinc-800 h-150 flex flex-col">
              <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-[#252526]">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                  </div>
                  <span className="text-xs text-zinc-400 ml-2 font-mono">Response</span>
                </div>
                <div className="text-xs text-zinc-500 font-mono">JSON</div>
              </div>
              <div className="flex-1 overflow-auto p-4 font-mono text-sm">
                {response ? (
                  <pre className="text-green-400">{response}</pre>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-zinc-600">
                    <Code2 className="h-12 w-12 mb-4 opacity-20" />
                    <p>Select an endpoint and send a request to see the response.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}