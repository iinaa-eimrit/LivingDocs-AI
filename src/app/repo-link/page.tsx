import { useEffect } from "react";
import { useRouter } from "next/router";

export default function RepoLinkPage() {
  useEffect(() => {
    // Redirect to GitHub OAuth, callback to backend
    const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || "YOUR_CLIENT_ID";
    const redirectUri = `${window.location.origin}/api/oauth/github/callback`;
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo&redirect_uri=${redirectUri}`;
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-2xl font-bold">Redirecting to GitHub for authentication...</h1>
    </div>
  );
}
