'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useAuthStore } from './store/auth';
import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';

// Dynamically import map to prevent SSR issues with Leaflet
const MapLayer = dynamic(() => import('@/components/map/MapLayer'), { 
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-50 flex items-center justify-center">
      <div className="animate-pulse text-slate-400 font-medium">Initializing Satellite Uplink...</div>
    </div>
  )
});

export default function RootPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!isMounted || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="animate-pulse text-slate-400">Loading Sentinel...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="relative flex-1 pl-64 pt-16 h-full">
        {/* TopBar */}
        <TopBar />

        {/* Map - Fills the remaining space */}
        <div className="h-full w-full">
          <MapLayer />
        </div>
      </main>
    </div>
  );
}
