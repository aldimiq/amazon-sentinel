'use client';

import { useExplorerStore } from '@/app/store/explorer';
import { Sliders, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function ExplorerFilters() {
    const { filters, setFilters } = useExplorerStore();
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className={`absolute top-6 left-6 z-[400] transition-all duration-300 ${isOpen ? 'w-80' : 'w-12 overflow-hidden'}`}>
            <div className="glass-panel p-5 rounded-3xl border border-white/40 shadow-xl backdrop-blur-xl bg-white/40">

                {/* Header */}
                <div className="flex items-center justify-between mb-6 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-900 rounded-xl text-white shadow-lg">
                            <Sliders size={16} />
                        </div>
                        <span className={`text-sm font-bold text-slate-800 uppercase tracking-wider ${!isOpen && 'hidden'}`}>
                            Filters
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className={`space-y-6 ${!isOpen && 'hidden'}`}>

                    {/* Bio Score Slider */}
                    <div className="space-y-3">
                        <div className="flex justify-between text-xs font-bold uppercase text-slate-500 tracking-wider">
                            <span>Min Bio-Score</span>
                            <span className="text-cyan-600">{filters.minBioScore}</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={filters.minBioScore}
                            onChange={(e) => setFilters({ minBioScore: Number(e.target.value) })}
                            className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-cyan-500"
                        />
                    </div>

                    {/* Carbon Slider */}
                    <div className="space-y-3">
                        <div className="flex justify-between text-xs font-bold uppercase text-slate-500 tracking-wider">
                            <span>Min Carbon (t)</span>
                            <span className="text-emerald-600">{filters.minCarbon}</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="300"
                            step="10"
                            value={filters.minCarbon}
                            onChange={(e) => setFilters({ minCarbon: Number(e.target.value) })}
                            className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-emerald-500"
                        />
                    </div>

                    {/* Price Range */}
                    <div className="space-y-3">
                        <div className="flex justify-between text-xs font-bold uppercase text-slate-500 tracking-wider">
                            <span>Max Price ($)</span>
                            <span className="text-slate-900">${filters.maxPrice}</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="30000"
                            step="500"
                            value={filters.maxPrice}
                            onChange={(e) => setFilters({ maxPrice: Number(e.target.value) })}
                            className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-slate-900"
                        />
                    </div>

                    {/* Active Count Badge */}
                    <div className="pt-4 border-t border-slate-200/50 flex justify-center">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-100/50 rounded-full text-emerald-700 text-[10px] font-bold uppercase tracking-widest border border-emerald-200/50">
                            <CheckCircle2 size={12} />
                            Filters Active
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
