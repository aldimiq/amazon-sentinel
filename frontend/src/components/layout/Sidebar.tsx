import { LayoutDashboard, Map, Settings, ShieldAlert, Wallet } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";
import { useState } from "react";

const NAV_ITEMS = [
  { id: "map", icon: Map, label: "Live Map" },
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "portfolio", icon: Wallet, label: "My Assets" },
  { id: "alerts", icon: ShieldAlert, label: "Alerts" },
  { id: "settings", icon: Settings, label: "Settings" },
];

export function Sidebar() {
  const [active, setActive] = useState("map");

  return (
    <GlassCard className="h-full w-20 flex flex-col items-center py-6 gap-8">
      {/* Logo Icon */}
      <div className="w-10 h-10 bg-sentinel-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.5)]">
        <Map className="text-sentinel-900 w-6 h-6" />
      </div>

      {/* Nav Items */}
      <nav className="flex flex-col gap-6 w-full px-2">
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`group flex flex-col items-center gap-1 transition-all duration-300 ${
                isActive ? "text-sentinel-400" : "text-slate-400 hover:text-white"
              }`}
            >
              <div
                className={`p-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-sentinel-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                    : "group-hover:bg-white/5"
                }`}
              >
                <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className="text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity absolute left-16 bg-slate-900/90 px-2 py-1 rounded border border-white/10 backdrop-blur-md">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </GlassCard>
  );
}
