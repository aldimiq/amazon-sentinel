import { TrendingUp, Zap, DollarSign, Activity } from 'lucide-react';

interface PortfolioStatsProps {
  assets: any[];
}

export default function PortfolioStats({ assets }: PortfolioStatsProps) {
  // Calculations
  const totalValue = assets.reduce((sum, a) => sum + (Number(a.price) || 0), 0);
  const totalCarbon = assets.reduce((sum, a) => sum + (Number(a.carbon_stock) || 0), 0);
  const avgBioScore = assets.length > 0 
    ? Math.round(assets.reduce((sum, a) => sum + (Number(a.bio_score) || 0), 0) / assets.length) 
    : 0;
  
  // Formatters
  const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  const formatNumber = (val: number) => new Intl.NumberFormat('en-US').format(Math.round(val));

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      
      {/* Total Value Card */}
      <div className="relative group overflow-hidden rounded-[2rem] bg-white border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all duration-500">
        <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 transition-all duration-500 group-hover:w-full group-hover:opacity-5" />
        
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600 group-hover:scale-110 transition-transform duration-500">
            <DollarSign size={24} strokeWidth={2.5} />
          </div>
          <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">
            <Activity size={10} className="text-emerald-500" />
            Live Valuation
          </div>
        </div>

        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Portfolio Value</div>
          <div className="text-4xl font-black text-slate-900 tracking-tight group-hover:text-emerald-900 transition-colors">
            {formatCurrency(totalValue)}
          </div>
        </div>
      </div>

      {/* Carbon Impact Card */}
      <div className="relative group overflow-hidden rounded-[2rem] bg-white border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all duration-500">
        <div className="absolute top-0 left-0 w-1 h-full bg-slate-800 transition-all duration-500 group-hover:w-full group-hover:opacity-5" />
        
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 rounded-2xl bg-slate-100 text-slate-700 group-hover:scale-110 transition-transform duration-500">
            <TrendingUp size={24} strokeWidth={2.5} />
          </div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">
            Cumulative
          </div>
        </div>

        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Carbon Sequestered</div>
          <div className="text-4xl font-black text-slate-900 tracking-tight flex items-baseline gap-1">
            {formatNumber(totalCarbon)}
            <span className="text-lg text-slate-400 font-bold">t</span>
          </div>
        </div>
      </div>

      {/* Bio Score Card */}
      <div className="relative group overflow-hidden rounded-[2rem] bg-white border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all duration-500">
        <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500 transition-all duration-500 group-hover:w-full group-hover:opacity-5" />
        
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 rounded-2xl bg-cyan-50 text-cyan-600 group-hover:scale-110 transition-transform duration-500">
            <Zap size={24} strokeWidth={2.5} />
          </div>
          
          {/* Mini Chart Visualization */}
          <div className="flex gap-0.5 items-end h-6">
             {[30, 50, 40, 70, 60].map((h, i) => (
               <div key={i} className="w-1 bg-cyan-200 rounded-t-sm" style={{ height: `${h}%`}} />
             ))}
          </div>
        </div>

        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Avg. Bio-Score</div>
          <div className="text-4xl font-black text-slate-900 tracking-tight flex items-baseline gap-1">
            {avgBioScore}
            <span className="text-lg text-slate-400 font-bold">/100</span>
          </div>
        </div>
      </div>

    </div>
  );
}
