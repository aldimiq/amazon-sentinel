import { Bell, Search, User } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";

export function TopBar() {
  return (
    <GlassCard className="h-16 w-full flex items-center justify-between px-6">
      {/* Search / Breadcrumbs */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-lg border border-white/5 w-64 focus-within:border-sentinel-500/50 transition-colors">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search coordinates or hex ID..."
            className="bg-transparent border-none outline-none text-sm text-white placeholder-slate-500 w-full"
          />
        </div>
      </div>

      {/* Stats Ticker */}
      <div className="hidden md:flex gap-8">
        <div className="flex flex-col items-end">
          <span className="text-[10px] text-slate-400 uppercase tracking-widest">Active Fires</span>
          <span className="text-sm font-mono text-red-400 font-bold flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            12 Detected
          </span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] text-slate-400 uppercase tracking-widest">Protected Area</span>
          <span className="text-sm font-mono text-sentinel-400 font-bold">1,240,500 km²</span>
        </div>
      </div>

      {/* User Actions */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 hover:bg-white/5 rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-slate-300" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-sentinel-500 rounded-full border border-slate-900"></span>
        </button>
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sentinel-500 to-accent p-[1px]">
          <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
