'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/app/lib/api';

export default function SignupPage() {
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await api.post('/auth/signup', { email, password });
      setSuccess('Verification email sent!');
      setTimeout(() => router.push('/login'), 2000);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-50 via-slate-50 to-white px-4">
      <div className="w-full max-w-md space-y-8 glass-surface-heavy p-10 rounded-[2.5rem] border border-white/60">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-2xl bg-cyan-600 flex items-center justify-center text-white shadow-xl shadow-cyan-600/20 mb-6">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-6 h-6">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Join Sentinel
          </h2>
          <p className="mt-2 text-sm font-medium text-slate-500">
            Start your biodiversity investment journey
          </p>
        </div>

        <form className="mt-10 space-y-6" onSubmit={handleSignup}>
          {error && (
            <div className="bg-red-50/50 backdrop-blur-md text-red-600 p-4 rounded-2xl text-sm font-medium text-center border border-red-100">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-emerald-50/50 backdrop-blur-md text-emerald-600 p-4 rounded-2xl text-sm font-medium text-center border border-emerald-100">
              {success}
            </div>
          )}
          
          <div className="space-y-4">
            <input
              type="email"
              required
              className="block w-full rounded-2xl bg-white/50 border-white/40 py-3 text-slate-900 shadow-sm ring-1 ring-inset ring-white/60 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm px-4 backdrop-blur-sm transition-all"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              required
              className="block w-full rounded-2xl bg-white/50 border-white/40 py-3 text-slate-900 shadow-sm ring-1 ring-inset ring-white/60 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm px-4 backdrop-blur-sm transition-all"
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
            {loading ? 'Creating Account...' : 'Get Started'}
          </button>
        </form>
        
        <div className="text-center">
          <Link href="/login" className="text-sm font-bold text-cyan-600 hover:text-cyan-500">
            Sign in to existing account
          </Link>
        </div>
      </div>
    </div>
  );
}