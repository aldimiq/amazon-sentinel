'use client';

import { Search, User, Bell, Cpu, Activity, AlertTriangle, WifiOff } from 'lucide-react';
import { useAuthStore } from '@/app/store/auth';
import { useSystemStore } from '@/app/store/systemStore';
import { useEffect, useState } from 'react';
import { api } from '@/app/lib/api';

export default function TopBar() {
  const user = useAuthStore((state) => state.user);
  const { status, latency, setStatus, setLatency } = useSystemStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const checkHealth = async () => {
      const start = Date.now();
      try {
        await api.get('/');
        const end = Date.now();
        const lat = end - start;
        setLatency(lat);
        
        if (lat > 800) {
          setStatus('degraded');
        } else {
          setStatus('nominal');
        }
      } catch (err) {
        console.error('System Health Check Failed:', err);
        setStatus('offline');
        setLatency(0);
      }
    };

    // Initial check
    checkHealth();

    // Poll every 30s
    const interval = setInterval(checkHealth, 30000);
    return () => clearInterval(interval);
  }, [setStatus, setLatency]);

  const getStatusColor = () => {
    switch (status) {
      case 'nominal': return 'text-emerald-600 bg-emerald-500/5 border-emerald-500/10';
      case 'degraded': return 'text-amber-500 bg-amber-500/5 border-amber-500/10';
      case 'offline': return 'text-rose-600 bg-rose-500/5 border-rose-500/10';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'nominal': return <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />;
      case 'degraded': return <AlertTriangle size={10} className="text-amber-500" />;
      case 'offline': return <WifiOff size={10} className="text-rose-500" />;
    }
  };

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
        
        {/* Live System Monitor */}
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-colors ${getStatusColor()}`}>
           {getStatusIcon()}
           <div className="flex flex-col leading-none">
             <span className="text-[9px] font-bold uppercase tracking-tighter">
               {status === 'nominal' ? 'System Nominal' : status === 'degraded' ? 'Latency Warning' : 'System Offline'}
             </span>
             {status !== 'offline' && (
                <span className="text-[8px] font-mono opacity-60 mt-0.5">{latency}ms</span>
             )}
           </div>
        </div>

        <button className="relative p-2 text-slate-400 hover:text-emerald-600 transition-colors">
          <Bell size={18} />
          <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
        </button>

        <div className="flex items-center gap-4 pl-6 border-l border-white/10">
          <div className="text-right">
            <div className="text-xs font-black text-slate-900 leading-none">
              {(mounted && user?.email) ? user.email.split('@')[0].toUpperCase() : 'OPERATOR'}
            </div>
            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">
              {mounted && user ? 'Auth-Verified' : 'Establishing...'}
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
