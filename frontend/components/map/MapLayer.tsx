'use client';

import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useEffect } from 'react';

export default function MapLayer() {
  const center: [number, number] = [-3.4653, -62.2159];

  return (
    <div className="h-full w-full relative group">
      {/* Sci-Fi Environmental Overlays */}
      <div className="digital-twin-bg" />
      <div className="scan-line" />

      <MapContainer 
        center={center} 
        zoom={6} 
        scrollWheelZoom={true}
        className="z-0"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; CARTO'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <MapController />
      </MapContainer>

      {/* Merged Glass-SciFi HUD Overlay */}
      <div className="absolute bottom-10 left-10 z-[400] glass-card-scifi p-7 rounded-[2rem] w-80 overflow-hidden">
        {/* HUD Corner Accents */}
        <div className="hud-corner hud-tl" />
        <div className="hud-corner hud-tr" />
        <div className="hud-corner hud-bl" />
        <div className="hud-corner hud-br" />

        <div className="flex items-center gap-3 mb-6">
          <div className="h-2 w-2 rounded-full bg-emerald-500 glow-pulse" />
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Neural Interface</h3>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Carbon Stock</span>
            <div className="flex items-baseline gap-1">
               <span className="text-3xl font-black text-slate-900 tracking-tighter">42.5</span>
               <span className="text-xs font-bold text-emerald-600">k/t</span>
            </div>
          </div>
          
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Biodiversity Index</span>
            <div className="flex items-baseline gap-1">
               <span className="text-3xl font-black text-cyan-600 tracking-tighter">0.842</span>
               <span className="text-[10px] font-bold text-slate-400">/ 1.0</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
             <div>
                <div className="text-[9px] font-black text-slate-400 uppercase">Latency</div>
                <div className="text-xs font-bold text-slate-900 font-mono">24ms</div>
             </div>
             <div>
                <div className="text-[9px] font-black text-slate-400 uppercase">Uplink</div>
                <div className="text-xs font-bold text-emerald-600 font-mono">ACTIVE</div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MapController() {
  const map = useMap();
  useEffect(() => {
    L.control.zoom({ position: 'bottomright' }).addTo(map);
  }, [map]);
  return null;
}
