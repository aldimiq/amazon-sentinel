'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/app/lib/api';
import { useAuthStore } from '@/app/store/auth';
import { useEffect } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  
  useEffect(() => {
    console.log("🛠️ Testing Backend Connectivity...");
    api.get('/')
      .then(res => console.log("🟢 Backend is REACHABLE:", res.data))
      .catch(err => console.error("🔴 Backend is UNREACHABLE:", err.message));
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🚀 [Login] Attempting sign-in for:", email);
    setLoading(true);
    setError('');

    try {
      const res = await api.post('/auth/login', { email, password });
      const { access_token, user } = res.data;
      setAuth(user, access_token);
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-50 via-slate-50 to-white px-4">
      <div className="w-full max-w-md space-y-8 glass-surface-heavy p-10 rounded-[2.5rem] border border-white/60">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-xl shadow-emerald-600/20 mb-6">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-6 h-6">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm font-medium text-slate-500">
            Securely access your Sentinel portfolio
          </p>
        </div>

        <form className="mt-10 space-y-6" onSubmit={handleLogin}>
          {error && (
            <div className="bg-red-50/50 backdrop-blur-md text-red-600 p-4 rounded-2xl text-sm font-medium text-center border border-red-100">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <input
              type="email"
              required
              className="block w-full rounded-2xl bg-white/50 border-white/40 py-3 text-slate-900 shadow-sm ring-1 ring-inset ring-white/60 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm px-4 backdrop-blur-sm transition-all"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              required
              className="block w-full rounded-2xl bg-white/50 border-white/40 py-3 text-slate-900 shadow-sm ring-1 ring-inset ring-white/60 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm px-4 backdrop-blur-sm transition-all"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-slate-900 py-3.5 text-sm font-bold text-white shadow-xl hover:bg-slate-800 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Sign In'}
          </button>
        </form>
        
        <div className="flex flex-col items-center gap-4">
          <Link href="/forgot-password" size="sm" className="text-xs font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest">
            Forgot Password?
          </Link>
          <Link href="/signup" className="text-sm font-bold text-emerald-600 hover:text-emerald-500">
            Create new account
          </Link>
        </div>
      </div>
    </div>
  );
}