'use client';

import { Search, User, Bell } from 'lucide-react';
import { useAuthStore } from '@/app/store/auth';

export default function TopBar() {
  const user = useAuthStore((state) => state.user);

  return (
    <header className="fixed top-0 right-0 z-30 h-16 left-64 glass-panel border-b flex items-center justify-between px-8">
      {/* Search */}
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          type="text" 
          placeholder="Search hexagons, coordinates, species..."
          className="w-full rounded-full bg-slate-50 border border-slate-200/50 py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
        />
      </div>

      {/* User Actions */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 text-slate-600 border-r border-slate-200/50 pr-6">
          <button className="hover:text-emerald-600 transition-colors">
            <Bell size={20} />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-sm font-semibold text-slate-900 leading-none">
              {user?.email?.split('@')[0] || 'User'}
            </div>
            <div className="text-[10px] font-medium text-slate-500 uppercase tracking-wider mt-1">
              Sentinel Tier 1
            </div>
          </div>
          <div className="h-10 w-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600">
            <User size={24} />
          </div>
        </div>
      </div>
    </header>
  );
}
