'use client';

import { useExplorerStore } from '@/app/store/explorer';
import { api } from '@/app/lib/api';
import { useEffect, useState } from 'react';
import { X, TrendingUp, Zap, ShieldCheck } from 'lucide-react';

export default function AssetDetails() {
  const { selectedHex, details, setSelection, setDetails } = useExplorerStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedHex) {
      setLoading(true);
      api.get(`/explorer/hexes/${selectedHex}`)
        .then(res => setDetails(res.data))
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [selectedHex, setDetails]);

  if (!selectedHex) return null;

  return (
    <div className="absolute right-8 top-24 z-[400] w-80 glass-card-scifi p-0 rounded-[2.5rem] overflow-hidden">
      {/* HUD Accents */}
      <div className="hud-corner hud-tl" />
      <div className="hud-corner hud-tr" />
      <div className="hud-corner hud-bl" />
      <div className="hud-corner hud-br" />

      {/* Header */}
      <div className="bg-white/40 p-6 border-b border-white/40 flex justify-between items-center">
        <div>
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Asset Identified</h2>
          <div className="text-xs font-mono font-bold text-slate-900 mt-1 uppercase">ID: {selectedHex.substring(0, 12)}...</div>
        </div>
        <button onClick={() => setSelection(null)} className="p-2 hover:bg-white/60 rounded-full transition-colors">
          <X size={16} />
        </button>
      </div>

      {/* Content */}
      <div className="p-8 space-y-8">
        {loading ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-4 bg-slate-100 rounded w-3/4"></div>
            <div className="h-10 bg-slate-100 rounded"></div>
            <div className="h-20 bg-slate-100 rounded"></div>
          </div>
        ) : details ? (
          <>
            {/* Price Segment */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Acquisition Value</span>
              <div className="text-4xl font-black text-slate-900 tracking-tighter flex items-start gap-1">
                <span className="text-xl mt-1">$</span>
                {details.price?.toLocaleString()}
              </div>
            </div>

            {/* Definitions (Static) */}
            <div className="bg-slate-50/50 p-3 rounded-xl border border-dashed border-slate-300 space-y-2">
              <div className="flex gap-2 items-start">
                <div className="min-w-[4px] h-[4px] mt-1.5 rounded-full bg-emerald-500" />
                <p className="text-[9px] text-slate-500 font-medium leading-relaxed">
                  <span className="text-slate-700 font-bold">Carbon:</span> Est. metric tons of CO2 sequestered annually.
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="min-w-[4px] h-[4px] mt-1.5 rounded-full bg-cyan-500" />
                <p className="text-[9px] text-slate-500 font-medium leading-relaxed">
                  <span className="text-slate-700 font-bold">Bio-Score:</span> Biodiversity density index (0-100).
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-emerald-500/5 p-4 rounded-2xl border border-emerald-500/10">
                <TrendingUp size={16} className="text-emerald-600 mb-2" />
                <div className="text-[9px] font-bold text-slate-400 uppercase border-b border-dotted border-slate-400/30 inline-block mb-1">Carbon</div>
                <div className="text-lg font-black text-slate-900">{details.carbon_stock}t</div>
              </div>

              <div className="bg-cyan-500/5 p-4 rounded-2xl border border-cyan-500/10">
                <Zap size={16} className="text-cyan-600 mb-2" />
                <div className="text-[9px] font-bold text-slate-400 uppercase border-b border-dotted border-slate-400/30 inline-block mb-1">Bio-Score</div>
                <div className="text-lg font-black text-slate-900">{details.bio_score}/100</div>
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center gap-3 px-4 py-3 bg-white/40 rounded-2xl border border-white/60">
              <ShieldCheck size={20} className="text-emerald-600" />
              <div className="flex-1">
                <div className="text-[10px] font-bold text-slate-400 uppercase leading-none">Status</div>
                <div className="text-xs font-bold text-slate-900 uppercase mt-0.5">{details.status}</div>
              </div>
            </div>

            {/* Action */}
            <button className="w-full bg-slate-900 py-4 rounded-2xl text-white font-black text-xs uppercase tracking-widest shadow-xl hover:bg-emerald-700 transition-all active:scale-[0.98]">
              Initiate Purchase
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}
