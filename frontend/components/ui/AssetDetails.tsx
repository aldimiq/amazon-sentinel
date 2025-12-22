'use client';

import { useExplorerStore } from '@/app/store/explorer';
import { api } from '@/app/lib/api';
import { useEffect, useState } from 'react';
import { X, TrendingUp, Zap, ShieldCheck } from 'lucide-react';

export default function AssetDetails() {
  const { selectedHex, details, setSelection, setDetails, mapMode } = useExplorerStore();
  const [loading, setLoading] = useState(false);
  const isSatellite = mapMode === 'satellite';

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
    <div className="absolute right-8 top-24 z-[400] w-80 bg-white/40 backdrop-blur-xl border border-white/40 p-0 rounded-[2.5rem] overflow-hidden shadow-xl text-slate-900">
      {/* HUD Accents */}
      <div className="hud-corner hud-tl" />
      <div className="hud-corner hud-tr" />
      <div className="hud-corner hud-bl" />
      <div className="hud-corner hud-br" />

      {/* Header */}
      <div className={`p-6 border-b flex justify-between items-center transition-colors ${
        isSatellite ? 'border-white/20' : 'border-slate-100'
      }`}>
        <div>
          <h2 className={`text-[10px] font-black uppercase tracking-[0.3em] ${
            isSatellite ? 'text-white' : 'text-slate-900'
          }`}>Asset Identified</h2>
          <div className={`text-xs font-mono font-bold mt-1 uppercase ${
            isSatellite ? 'text-white' : 'text-slate-900'
          }`}>ID: {selectedHex.substring(0, 12)}...</div>
        </div>
        <button onClick={() => setSelection(null)} className={`p-2 rounded-full transition-colors ${
          isSatellite ? 'hover:bg-white/20 text-white' : 'hover:bg-slate-100 text-slate-900'
        }`}>
          <X size={16} />
        </button>
      </div>

      {/* Content */}
      <div className="p-8 space-y-8">
        {loading ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-4 rounded w-3/4 bg-slate-100"></div>
            <div className="h-10 rounded bg-slate-100"></div>
            <div className="h-20 rounded bg-slate-100"></div>
          </div>
        ) : details ? (
          <>
            {/* Price Segment */}
            <div className="space-y-1">
              <span className={`text-[10px] font-bold uppercase tracking-widest ${
                isSatellite ? 'text-white' : 'text-slate-900'
              }`}>Acquisition Value</span>
              <div className={`text-4xl font-black tracking-tighter flex items-start gap-1 ${
                isSatellite ? 'text-white' : 'text-slate-900'
              }`}>
                <span className="text-xl mt-1">$</span>
                {details.price?.toLocaleString()}
              </div>
            </div>

            {/* Definitions (Static) */}
            <div className="p-3 rounded-xl border border-dashed border-slate-300 space-y-2 bg-slate-50/50">
              <div className="flex gap-2 items-start">
                <div className="min-w-[4px] h-[4px] mt-1.5 rounded-full bg-emerald-500" />
                <p className="text-[9px] font-medium leading-relaxed text-slate-600">
                  <span className="font-bold text-slate-700">Carbon:</span> Est. metric tons of CO2 sequestered annually.
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="min-w-[4px] h-[4px] mt-1.5 rounded-full bg-cyan-500" />
                <p className="text-[9px] font-medium leading-relaxed text-slate-600">
                  <span className="font-bold text-slate-700">Bio-Score:</span> Biodiversity density index (0-100).
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl border bg-emerald-50/60 border-emerald-100">
                <TrendingUp size={16} className="text-emerald-600 mb-2" />
                <div className="text-[9px] font-bold text-slate-900 uppercase border-b border-dotted inline-block mb-1 border-slate-400/30">Carbon</div>
                <div className="text-lg font-black text-slate-900">{details.carbon_stock}t</div>
              </div>

              <div className="p-4 rounded-2xl border bg-cyan-50/60 border-cyan-100">
                <Zap size={16} className="text-cyan-600 mb-2" />
                <div className="text-[9px] font-bold text-slate-900 uppercase border-b border-dotted inline-block mb-1 border-slate-400/30">Bio-Score</div>
                <div className="text-lg font-black text-slate-900">{details.bio_score}/100</div>
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl border bg-slate-50/80 border-slate-200">
              <ShieldCheck size={20} className="text-emerald-600" />
              <div className="flex-1">
                <div className="text-[10px] font-bold text-slate-900 uppercase leading-none">Status</div>
                <div className="text-xs font-bold text-slate-900 uppercase mt-0.5">{details.status}</div>
              </div>
            </div>

            {/* Action */}
            {details.status === 'owned' ? (
              <button 
                disabled 
                className="w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-none cursor-not-allowed bg-slate-200 text-slate-400"
              >
                Asset Acquired
              </button>
            ) : (
              <button className="w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl transition-all active:scale-[0.98] bg-slate-900 text-white hover:bg-emerald-700">
                Initiate Purchase
              </button>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
}
