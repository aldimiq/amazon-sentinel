'use client';

import { useState } from 'react';
import Link from 'next/link';
import { api } from '@/app/lib/api';
import { ChevronLeft, Mail } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await api.post('/auth/forgot-password', { email });
      setSuccess('Recovery instructions sent to your email.');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-50 via-slate-50 to-white px-4">
      <div className="w-full max-w-md space-y-8 glass-surface-heavy p-10 rounded-[2.5rem] border border-white/60">
        
        <Link href="/login" className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest">
          <ChevronLeft size={14} />
          Back to login
        </Link>

        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-2xl bg-amber-500 flex items-center justify-center text-white shadow-xl shadow-amber-500/20 mb-6">
            <Mail size={22} strokeWidth={3} />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Reset Uplink
          </h2>
          <p className="mt-2 text-sm font-medium text-slate-500">
            Enter your email to receive recovery protocols
          </p>
        </div>

        <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
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
              className="block w-full rounded-2xl bg-white/50 border-white/40 py-3 text-slate-900 shadow-sm ring-1 ring-inset ring-white/60 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm px-4 backdrop-blur-sm transition-all"
              placeholder="operator@sentinel.sys"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading || success !== ''}
            className="w-full rounded-2xl bg-slate-900 py-3.5 text-sm font-bold text-white shadow-xl hover:bg-slate-800 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? 'Transmitting...' : 'Send Recovery Link'}
          </button>
        </form>
      </div>
    </div>
  );
}
