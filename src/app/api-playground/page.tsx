"use client";
import { useEffect, useState } from "react";

type OpenAPISchema = {
  paths: Record<string, Record<string, unknown>>;
};

export default function ApiPlaygroundPage() {
  const [schema, setSchema] = useState<OpenAPISchema | null>(null);
  const [endpoint, setEndpoint] = useState("");
  const [method, setMethod] = useState("GET");
  const [body, setBody] = useState("");
  const [response, setResponse] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/openapi.json")
      .then(res => res.json())
      .then(data => setSchema(data));
  }, []);

  const handleTry = async () => {
    setResponse("");
    const url = `http://localhost:8000${endpoint}`;
    const options: RequestInit = { method };
    if (body && method !== "GET") {
      options.headers = { "Content-Type": "application/json" };
      options.body = body;
    }
    const res = await fetch(url, options);
    const text = await res.text();
    setResponse(text);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-8">
      <h1 className="text-3xl font-bold mb-6 text-black dark:text-zinc-50">API Playground</h1>
      {schema && (
        <div className="mb-4">
          <label htmlFor="endpoint-select" className="block mb-2 font-semibold">Endpoint</label>
          <select
            id="endpoint-select"
            title="API Endpoint"
            value={endpoint}
            onChange={e => setEndpoint(e.target.value)}
            className="w-full rounded border px-4 py-2 text-lg mb-2"
          >
            <option value="">Select endpoint</option>
            {Object.entries(schema.paths).map(([path, methods]) => (
              Object.keys(methods as object).map(m => (
                <option key={path + m} value={path}>{`${m.toUpperCase()} ${path}`}</option>
              ))
            ))}
          </select>
          <label htmlFor="method-select" className="block mb-2 font-semibold">Method</label>
          <select
            id="method-select"
            title="HTTP Method"
            value={method}
            onChange={e => setMethod(e.target.value)}
            className="w-full rounded border px-4 py-2 text-lg mb-2"
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
          {method !== "GET" && (
            <>
              <label htmlFor="body-input" className="block mb-2 font-semibold">Body (JSON)</label>
              <textarea
                id="body-input"
                title="Request Body"
                value={body}
                onChange={e => setBody(e.target.value)}
                className="w-full rounded border px-4 py-2 text-lg mb-2"
                rows={4}
                placeholder="Enter JSON body"
              />
            </>
          )}
          <button
            onClick={handleTry}
            className="rounded bg-green-600 px-6 py-2 text-white font-semibold hover:bg-green-700"
            disabled={!endpoint}
          >Try It</button>
        </div>
      )}
      {response && (
        <div className="bg-white dark:bg-zinc-900 rounded p-4 shadow text-lg">
          <pre>{response}</pre>
        </div>
      )}
    </div>
  );
}
