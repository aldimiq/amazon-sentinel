'use client';

import { Search, User, Bell, Cpu } from 'lucide-react';
import { useAuthStore } from '@/app/store/auth';

export default function TopBar() {
  const user = useAuthStore((state) => state.user);

  return (
    <header className="fixed top-0 right-0 z-30 h-16 left-64 glass-panel border-b border-white/20 flex items-center justify-between px-10">
      {/* HUD-style Search */}
      <div className="relative w-80">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
        <input 
          type="text" 
          placeholder="SECURE SEARCH..."
          className="w-full rounded-2xl bg-white/30 border border-white/30 py-2.5 pl-10 pr-4 text-[10px] font-black uppercase tracking-widest text-slate-700 focus:outline-none focus:bg-white/50 focus:border-emerald-500/30 transition-all"
        />
      </div>

      {/* Identity & System Status */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10">
           <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
           <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-tighter">System Nominal</span>
        </div>

        <button className="relative p-2 text-slate-400 hover:text-emerald-600 transition-colors">
          <Bell size={18} />
          <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
        </button>

        <div className="flex items-center gap-4 pl-6 border-l border-white/10">
          <div className="text-right">
            <div className="text-xs font-black text-slate-900 leading-none">
              {user?.email?.split('@')[0].toUpperCase() || 'OPERATOR'}
            </div>
            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">
              Auth-Verified
            </div>
          </div>
          <div className="h-10 w-10 rounded-2xl bg-white/60 border border-white/60 shadow-inner flex items-center justify-center text-slate-600">
            <Cpu size={20} strokeWidth={2} />
          </div>
        </div>
      </div>
    </header>
  );
}
