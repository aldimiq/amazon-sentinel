'use client';

import { Search, User, Bell } from 'lucide-react';
import { useAuthStore } from '@/app/store/auth';

export default function TopBar() {
  const user = useAuthStore((state) => state.user);

  return (
    <header className="fixed top-0 right-0 z-30 h-16 left-64 topbar-glass flex items-center justify-between px-10">
      {/* Search Bar */}
      <div className="relative w-80">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        <input 
          type="text" 
          placeholder="Quick search..."
          className="w-full rounded-2xl bg-white/40 border border-white/40 py-2 pl-10 pr-4 text-xs font-medium focus:outline-none focus:bg-white/60 focus:ring-4 focus:ring-emerald-500/5 transition-all"
        />
      </div>

      {/* User Actions */}
      <div className="flex items-center gap-6">
        <button className="relative p-2 text-slate-500 hover:text-emerald-600 transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-emerald-500 border-2 border-white"></span>
        </button>

        <div className="flex items-center gap-4 pl-6 border-l border-white/20">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-bold text-slate-900 leading-none">
              {user?.email?.split('@')[0] || 'User'}
            </div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
              PRO ACCOUNT
            </div>
          </div>
          <div className="h-10 w-10 rounded-2xl bg-white/60 shadow-sm border border-white/60 flex items-center justify-center text-slate-600">
            <User size={20} strokeWidth={2.5} />
          </div>
        </div>
      </div>
    </header>
  );
}