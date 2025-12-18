'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Map as MapIcon, 
  Leaf, 
  ShieldAlert, 
  Settings,
  LogOut
} from 'lucide-react';
import { useAuthStore } from '@/app/store/auth';
import { useRouter } from 'next/navigation';

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

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 sidebar-glass">
      <div className="flex h-full flex-col px-4 py-8">
        {/* Brand */}
        <div className="mb-12 flex items-center gap-3 px-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600/90 shadow-lg shadow-emerald-600/20 text-white">
            <Leaf size={22} strokeWidth={2.5} />
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
                className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isActive 
                    ? 'bg-white/60 text-emerald-700 shadow-sm border border-white/50' 
                    : 'text-slate-600 hover:bg-white/40 hover:text-slate-900'
                }`}
              >
                <item.icon size={18} className={isActive ? 'text-emerald-600' : ''} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="mt-auto pt-6 space-y-1 border-t border-white/20">
          <Link
            href="/settings"
            className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-white/40 hover:text-slate-900"
          >
            <Settings size={18} />
            Settings
          </Link>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50/50 hover:text-red-600 transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}