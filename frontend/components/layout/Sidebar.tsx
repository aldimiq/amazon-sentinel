'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Map as MapIcon, 
  Leaf, 
  ShieldAlert, 
  Settings,
  LogOut,
  Zap
} from 'lucide-react';
import { useAuthStore } from '@/app/store/auth';
import { useRouter } from 'next/navigation';
import BioCore from '@/components/ui/BioCore';

const navItems = [
  { name: 'Overview', href: '/', icon: LayoutDashboard },
  { name: 'Explorer', href: '/explorer', icon: MapIcon },
  { name: 'Portfolio', href: '/portfolio', icon: Leaf },
  { name: 'Alerts', href: '/alerts', icon: ShieldAlert },
];

export default function Sidebar() {
  const pathname = usePathname();
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 glass-panel border-r border-white/20">
      <div className="flex h-full flex-col px-4 py-8">
        {/* Brand */}
        <div className="mb-10 flex items-center gap-3 px-3">
          <div className="relative group cursor-pointer">
            <div className="absolute -inset-1 rounded-2xl bg-emerald-400/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600/90 text-white shadow-xl glow-pulse">
              <Zap size={20} fill="white" />
            </div>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Sentinel
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 rounded-2xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  isActive 
                    ? 'bg-white/60 text-emerald-700 shadow-md border border-white/60' 
                    : 'text-slate-500 hover:bg-white/30 hover:text-slate-900'
                }`}
              >
                <item.icon size={18} className={isActive ? 'text-emerald-600' : ''} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* 3D Core - The Bridge between Glass & Sci-Fi */}
        <div className="my-8 flex justify-center py-4 bg-white/10 rounded-3xl border border-white/10">
           <BioCore />
        </div>

        {/* Footer */}
        <div className="mt-auto pt-6 border-t border-white/10 space-y-1">
          <Link
            href="/settings"
            className="flex items-center gap-3 rounded-2xl px-4 py-2.5 text-sm font-semibold text-slate-500 hover:bg-white/30 hover:text-slate-900 transition-all"
          >
            <Settings size={18} />
            System Config
          </Link>
          <button
            onClick={() => { logout(); router.push('/login'); }}
            className="flex w-full items-center gap-3 rounded-2xl px-4 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50/50"
          >
            <LogOut size={18} />
            End Uplink
          </button>
        </div>
      </div>
    </aside>
  );
}