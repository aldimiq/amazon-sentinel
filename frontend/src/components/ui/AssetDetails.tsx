import { useStore } from "../../store/useStore";
import { GlassCard } from "./GlassCard";
import { X, Trees, Droplets, Zap } from "lucide-react";

export function AssetDetails() {
  const { selectedHex, setSelectedHex } = useStore();

  if (!selectedHex) return null;

  const { h3_index, status, carbon_stock, bio_score } = selectedHex.properties;

  return (
    <GlassCard className="w-80 flex flex-col pointer-events-auto overflow-hidden animate-in slide-in-from-right-4 duration-300">
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
        <div>
          <h3 className="text-sm font-mono text-emerald-400">HEX_ASSET</h3>
          <p className="text-[10px] text-slate-400 font-mono">{h3_index}</p>
        </div>
        <button 
          onClick={() => setSelectedHex(null)}
          className="p-1 hover:bg-white/10 rounded-md transition-colors"
        >
          <X size={18} className="text-slate-400" />
        </button>
      </div>

      {/* Status Badge */}
      <div className="px-4 py-3">
        <div className={`text-xs inline-flex px-2 py-0.5 rounded-full border ${
          status === 'available' ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' :
          status === 'owned' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
          'bg-red-500/10 border-red-500/20 text-red-400'
        }`}>
          {status.toUpperCase()}
        </div>
      </div>

      {/* Metrics */}
      <div className="p-4 grid grid-cols-2 gap-4">
        <div className="bg-white/5 p-3 rounded-lg border border-white/5">
          <div className="flex items-center gap-2 mb-1">
            <Trees size={14} className="text-emerald-500" />
            <span className="text-[10px] text-slate-400">CARBON STOCK</span>
          </div>
          <div className="text-lg font-mono font-bold">{carbon_stock}</div>
          <div className="text-[10px] text-slate-500">tCO2e / km²</div>
        </div>

        <div className="bg-white/5 p-3 rounded-lg border border-white/5">
          <div className="flex items-center gap-2 mb-1">
            <Zap size={14} className="text-cyan-500" />
            <span className="text-[10px] text-slate-400">BIO SCORE</span>
          </div>
          <div className="text-lg font-mono font-bold">{bio_score}</div>
          <div className="text-[10px] text-slate-500">Scale 0-100</div>
        </div>
      </div>

      {/* Action */}
      <div className="mt-auto p-4 border-t border-white/10">
        <button className={`w-full py-3 rounded-lg font-bold transition-all ${
          status === 'available' 
            ? 'bg-emerald-500 text-emerald-950 hover:bg-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]' 
            : 'bg-white/5 text-slate-400 cursor-not-allowed'
        }`}>
          {status === 'available' ? 'INVEST IN ASSET' : 'ASSET PROTECTED'}
        </button>
      </div>
    </GlassCard>
  );
}
