import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ArrowLeft, Lock } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useAdmin } from "@/lib/AdminContext";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — qubitedge" }] }),
  component: AdminPage,
});

function AdminPage() {
  const { isAdmin, login } = useAdmin();
  const navigate = useNavigate();

  // If already logged in, redirect to home page (admin mode is active everywhere)
  useEffect(() => {
    if (isAdmin) {
      navigate({ to: "/" });
    }
  }, [isAdmin, navigate]);

  if (isAdmin) return null;

  return <LoginScreen onAuth={(email, password) => login(email, password)} />;
}

/* ---------- Login screen ---------- */

function LoginScreen({ onAuth }: { onAuth: (email: string, password: string) => boolean }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onAuth(email, password);
    if (success) {
      navigate({ to: "/" });
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0d12] text-white flex items-center justify-center px-4">
      <form onSubmit={submit} className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-2 mb-5">
          <div className="h-9 w-9 rounded-lg bg-[#64CEFB]/15 border border-[#64CEFB]/30 flex items-center justify-center">
            <Lock className="h-4 w-4 text-[#64CEFB]" />
          </div>
          <div>
            <div className="text-sm font-semibold">qubitedge CMS</div>
            <div className="text-xs text-white/50">Admin sign-in</div>
          </div>
        </div>
        <label className="block mb-3">
          <span className="block text-xs uppercase tracking-widest text-white/40 mb-1.5">Email</span>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoFocus className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:border-[#64CEFB]/60" />
        </label>
        <label className="block mb-4">
          <span className="block text-xs uppercase tracking-widest text-white/40 mb-1.5">Password</span>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:border-[#64CEFB]/60" />
        </label>
        {error && <div className="mb-3 text-xs text-red-400">{error}</div>}
        <button type="submit" className="w-full rounded-md bg-[#64CEFB] text-black font-medium py-2 text-sm hover:bg-[#64CEFB]/90">Sign in</button>
        <Link to="/" className="mt-3 inline-flex items-center gap-1 text-xs text-white/50 hover:text-white">
          <ArrowLeft className="h-3 w-3" /> Back to site
        </Link>
      </form>
    </div>
  );
}
