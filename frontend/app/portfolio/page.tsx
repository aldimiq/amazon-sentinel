'use client';

import { useEffect } from 'react';
import { useAuthStore } from '../store/auth';
import { usePortfolioStore } from '../store/portfolioStore';
import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';
import { useRouter } from 'next/navigation';

export default function PortfolioPage() {
    const { user } = useAuthStore();
    const { assets, fetchAssets, loading } = usePortfolioStore();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/login');
            return;
        }
        if (user.id) {
            fetchAssets(user.id);
        }
    }, [user, router, fetchAssets]);

    if (!user) return null;

    return (
        <div className="flex h-screen w-full overflow-hidden bg-slate-50">
            <Sidebar />
            <main className="relative flex-1 pl-64 pt-16 h-full p-8 overflow-y-auto">
                <TopBar />

                <div className="max-w-6xl mx-auto space-y-8">
                    {/* Header */}
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Portfolio</h1>
                        <p className="text-slate-500">Track your conservation impact.</p>
                    </div>

                    {/* Content Placeholder */}
                    {loading ? (
                        <div className="animate-pulse flex space-x-4">
                            <div className="flex-1 space-y-6 py-1">
                                <div className="h-32 bg-slate-200 rounded"></div>
                                <div className="space-y-3">
                                    <div className="h-10 bg-slate-200 rounded"></div>
                                    <div className="h-10 bg-slate-200 rounded"></div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {assets.length === 0 ? (
                                <div className="col-span-full p-12 text-center bg-white rounded-3xl border border-slate-100 shadow-sm">
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">No Assets Yet</h3>
                                    <p className="text-slate-500">Start exploring the map to make your first investment.</p>
                                </div>
                            ) : (
                                assets.map((asset) => (
                                    <div key={asset.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                                        <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500" />
                                        <h3 className="font-mono text-xs font-bold text-slate-400 mb-4">{asset.h3_index}</h3>
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <div className="text-[10px] uppercase font-bold text-slate-400">Carbon Stock</div>
                                                <div className="text-2xl font-black text-slate-900">{asset.carbon_stock}t</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-[10px] uppercase font-bold text-slate-400">Bio-Score</div>
                                                <div className="text-xl font-bold text-cyan-600">{asset.bio_score}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
