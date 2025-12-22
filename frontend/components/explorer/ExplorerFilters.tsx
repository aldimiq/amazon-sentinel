'use client';

import { useExplorerStore } from '@/app/store/explorer';
import { Sliders, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function ExplorerFilters() {
    const { filters, setFilters, mapMode } = useExplorerStore();
    const [isOpen, setIsOpen] = useState(true);
    const isSatellite = mapMode === 'satellite';

    const getBackgroundStyle = (value: number, min: number, max: number, activeColor: string) => {
        const percentage = ((value - min) / (max - min)) * 100;
        const trackColor = isSatellite ? 'rgba(255, 255, 255, 0.2)' : '#e2e8f0';
        return {
            background: `linear-gradient(to right, ${activeColor} 0%, ${activeColor} ${percentage}%, ${trackColor} ${percentage}%, ${trackColor} 100%)`
        };
    };

    return (
        <div className={`absolute top-6 left-6 z-[400] transition-all duration-300 ${isOpen ? 'w-80' : 'w-20 overflow-hidden'}`}>
            <div className={`glass-panel rounded-3xl border border-white/40 shadow-xl backdrop-blur-xl bg-white/40 transition-all duration-300 ${isOpen ? 'p-5' : 'p-3'} ${isSatellite ? 'text-white' : 'text-slate-900'}`}>

                {/* Header */}
                <div className={`flex items-center cursor-pointer transition-all duration-300 ${isOpen ? 'justify-between mb-6' : 'justify-center mb-0'}`} onClick={() => setIsOpen(!isOpen)}>
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl shadow-lg min-w-[36px] flex justify-center transition-colors ${
                            isSatellite ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'
                        }`}>
                            <Sliders size={16} />
                        </div>
                        <span className={`text-sm font-bold uppercase tracking-wider ${!isOpen && 'hidden'} ${
                            isSatellite ? 'text-white' : 'text-slate-900'
                        }`}>
                            Filters
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className={`space-y-6 ${!isOpen && 'hidden'}`}>

                    {/* Status Filter */}
                    <div className="space-y-3">
                        <div className={`text-xs font-bold uppercase tracking-wider ${
                            isSatellite ? 'text-white' : 'text-slate-900'
                        }`}>
                            Asset Status
                        </div>
                        <div className={`flex p-1 rounded-xl transition-colors ${
                            isSatellite ? 'bg-white/10' : 'bg-slate-100'
                        }`}>
                            {['all', 'available', 'owned', 'mine'].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setFilters({ status: status as any })}
                                    className={`flex-1 py-1.5 text-[10px] font-bold uppercase rounded-lg transition-all ${
                                        filters.status === status
                                            ? (isSatellite ? 'bg-white text-slate-900 shadow-md' : 'bg-slate-900 text-white shadow-md')
                                            : (isSatellite ? 'text-white/60 hover:text-white' : 'text-slate-500 hover:text-slate-900')
                                    }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Bio Score Slider */}
                    <div className="space-y-3">
                        <div className={`flex justify-between text-xs font-bold uppercase tracking-wider ${
                            isSatellite ? 'text-white' : 'text-slate-900'
                        }`}>
                            <span>Min Bio-Score</span>
                            <span className="text-cyan-400">{filters.minBioScore}</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={filters.minBioScore}
                            onChange={(e) => setFilters({ minBioScore: Number(e.target.value) })}
                            style={getBackgroundStyle(filters.minBioScore, 0, 100, '#06b6d4')}
                            className={`w-full h-1.5 rounded-full appearance-none cursor-pointer accent-cyan-400`}
                        />
                    </div>

                    {/* Carbon Slider */}
                    <div className="space-y-3">
                        <div className={`flex justify-between text-xs font-bold uppercase tracking-wider ${
                            isSatellite ? 'text-white' : 'text-slate-900'
                        }`}>
                            <span>Min Carbon (t)</span>
                            <span className="text-emerald-400">{filters.minCarbon}</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="300"
                            step="10"
                            value={filters.minCarbon}
                            onChange={(e) => setFilters({ minCarbon: Number(e.target.value) })}
                            style={getBackgroundStyle(filters.minCarbon, 0, 300, '#10b981')}
                            className={`w-full h-1.5 rounded-full appearance-none cursor-pointer accent-emerald-400`}
                        />
                    </div>

                    {/* Price Range */}
                    <div className="space-y-3">
                        <div className={`flex justify-between text-xs font-bold uppercase tracking-wider ${
                            isSatellite ? 'text-white' : 'text-slate-900'
                        }`}>
                            <span>Max Price ($)</span>
                            <span className={isSatellite ? 'text-white' : 'text-slate-900'}>${filters.maxPrice}</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="30000"
                            step="500"
                            value={filters.maxPrice}
                            onChange={(e) => setFilters({ maxPrice: Number(e.target.value) })}
                            style={getBackgroundStyle(filters.maxPrice, 0, 30000, isSatellite ? '#ffffff' : '#0f172a')}
                            className={`w-full h-1.5 rounded-full appearance-none cursor-pointer ${
                                isSatellite ? 'accent-white' : 'accent-slate-900'
                            }`}
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