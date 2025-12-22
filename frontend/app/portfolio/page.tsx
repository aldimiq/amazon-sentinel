'use client';

import { useEffect } from 'react';
import { useAuthStore } from '../store/auth';
import { usePortfolioStore } from '../store/portfolioStore';
import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';
import PortfolioStats from '@/components/portfolio/PortfolioStats';
import { useRouter } from 'next/navigation';
import { MapPin, ArrowUpRight, Hexagon, Leaf } from 'lucide-react';

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
        <div className="flex h-screen w-full overflow-hidden bg-slate-50 relative">
            {/* Background Texture */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
                style={{ backgroundImage: 'radial-gradient(#64748b 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
            </div>

            <Sidebar />
            
            <main className="relative flex-1 pl-64 pt-16 h-full p-8 overflow-y-auto z-10">
                <TopBar />

                <div className="max-w-7xl mx-auto space-y-8 pb-20">
                    {/* Header */}
                    <div className="flex justify-between items-end">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600">Secure Vault</span>
                            </div>
                            <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Asset Portfolio</h1>
                            <p className="text-slate-500 mt-2 font-medium">Manage your active conservation investments.</p>
                        </div>
                    </div>

                    {/* Stats Dashboard */}
                    {!loading && <PortfolioStats assets={assets} />}

                    {/* Content */}
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                           {[1,2,3].map(i => (
                               <div key={i} className="h-64 bg-slate-200/50 rounded-[2rem] animate-pulse" />
                           ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {assets.length === 0 ? (
                                <div className="col-span-full p-16 text-center bg-white/60 backdrop-blur-xl rounded-[2.5rem] border border-dashed border-slate-300">
                                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                                        <Hexagon size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">No Assets Acquired</h3>
                                    <p className="text-slate-500 mb-6">Initialize your first conservation project via the Explorer.</p>
                                    <button 
                                        onClick={() => router.push('/explorer')}
                                        className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm uppercase tracking-wide hover:bg-emerald-600 transition-colors"
                                    >
                                        Launch Explorer
                                    </button>
                                </div>
                            ) : (
                                assets.map((asset) => (
                                    <div key={asset.id} className="group relative bg-white rounded-[2rem] border border-slate-200 p-1 shadow-sm hover:shadow-2xl hover:border-emerald-500/30 transition-all duration-500">
                                        
                                        {/* Card Body */}
                                        <div className="relative h-full bg-slate-50/50 rounded-[1.8rem] p-6 overflow-hidden">
                                            
                                            {/* Decorative Grid */}
                                            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
                                                style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, #000 25%, #000 26%, transparent 27%, transparent 74%, #000 75%, #000 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, #000 25%, #000 26%, transparent 27%, transparent 74%, #000 75%, #000 76%, transparent 77%, transparent)', backgroundSize: '30px 30px' }} 
                                            />

                                            {/* Header */}
                                            <div className="relative flex justify-between items-start mb-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-emerald-600">
                                                        <Hexagon size={20} strokeWidth={2.5} />
                                                    </div>
                                                    <div>
                                                        <div className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Asset ID</div>
                                                        <div className="font-mono text-xs font-bold text-slate-900">{asset.h3_index}</div>
                                                    </div>
                                                </div>
                                                <button 
                                                    onClick={() => router.push(`/explorer?h3=${asset.h3_index}`)}
                                                    className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-emerald-600 hover:border-emerald-200 transition-all active:scale-95 group/btn"
                                                    title="Locate on Map"
                                                >
                                                    <MapPin size={18} />
                                                </button>
                                            </div>

                                            {/* Value Display */}
                                            <div className="mb-6 relative">
                                                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Current Valuation</div>
                                                <div className="text-3xl font-black text-slate-900 tracking-tight">
                                                    ${Number(asset.price).toLocaleString()}
                                                </div>
                                            </div>

                                            {/* Metrics Grid */}
                                            <div className="grid grid-cols-2 gap-3 relative z-10">
                                                <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm group-hover:border-emerald-100 transition-colors">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <Leaf size={14} className="text-emerald-500" />
                                                        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Carbon</span>
                                                    </div>
                                                    <div className="text-xl font-black text-slate-900">
                                                        {Math.round(asset.carbon_stock)}
                                                        <span className="text-xs font-bold text-slate-400 ml-0.5">t</span>
                                                    </div>
                                                </div>

                                                <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm group-hover:border-cyan-100 transition-colors">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <div className="w-3.5 h-3.5 rounded-full border-2 border-cyan-500 flex items-center justify-center">
                                                            <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                                                        </div>
                                                        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Bio-Score</span>
                                                    </div>
                                                    <div className="flex items-end justify-between">
                                                        <div className="text-xl font-black text-slate-900">{asset.bio_score}</div>
                                                        <div className="h-1 w-full max-w-[40px] bg-slate-100 rounded-full mb-1.5 ml-2 overflow-hidden">
                                                            <div 
                                                                className="h-full bg-cyan-500 rounded-full" 
                                                                style={{ width: `${Math.min(asset.bio_score, 100)}%` }} 
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Footer */}
                                            <div className="mt-6 pt-4 border-t border-slate-200/60 flex justify-between items-center relative">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700">Secured</span>
                                                </div>
                                                <div className="text-[9px] font-mono text-slate-400">
                                                    SYNCED
                                                </div>
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
