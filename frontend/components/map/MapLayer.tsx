'use client';

import { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import { useExplorerStore } from '@/app/store/explorer';
import { api } from '@/app/lib/api';
import AssetDetails from '../ui/AssetDetails';
import 'leaflet/dist/leaflet.css';

export default function MapLayer() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const { setSelection } = useExplorerStore();
  const [geoData, setGeoData] = useState<any>(null);

  // 1. Fetch Data
  useEffect(() => {
    api.get('/explorer/hexes')
      .then(res => {
        const features = res.data.map((h: any) => ({
          type: 'Feature',
          properties: { h3_index: h.h3_index, status: h.status },
          geometry: h.geom
        }));
        setGeoData({ type: 'FeatureCollection', features });
      })
      .catch(err => console.error('Map Load Error:', err));
  }, []);

  // 2. Initialize Map Manually (Robust Fix)
  useEffect(() => {
    if (!mapRef.current) return;
    if (mapInstance.current) return; // Prevent double init

    // Init Map
    const map = L.map(mapRef.current, {
      center: [-3.4653, -62.2159],
      zoom: 13,
      zoomControl: false,
      scrollWheelZoom: true,
    });
    mapInstance.current = map;

    // Add Tile Layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; CARTO'
    }).addTo(map);

    // Cleanup on unmount
    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, []);

  // 3. Update GeoJSON Layer when data changes
  useEffect(() => {
    if (!mapInstance.current || !geoData) return;

    const hexStyle = (feature: any) => ({
      fillColor: feature.properties.status === 'available' ? '#10b981' : '#f59e0b',
      weight: 1,
      opacity: 0.3,
      color: 'white',
      fillOpacity: 0.1,
    });

    const onHexClick = (e: any) => {
      const h3Index = e.target.feature.properties.h3_index;
      setSelection(h3Index);
    };

    const geoJsonLayer = L.geoJSON(geoData, {
      style: hexStyle,
      onEachFeature: (feature, layer) => {
        layer.on({
          click: onHexClick
        });
      }
    }).addTo(mapInstance.current);

    // Zoom control
    L.control.zoom({ position: 'bottomright' }).addTo(mapInstance.current);

    return () => {
      if (mapInstance.current) {
        mapInstance.current.removeLayer(geoJsonLayer);
      }
    };
  }, [geoData, setSelection]);

  return (
    <div className="h-full w-full relative group">
      <div className="digital-twin-bg" />
      <div className="scan-line" />

      {/* Map Container Ref */}
      <div ref={mapRef} className="h-full w-full z-0" />

      {/* Selected Asset Floating Panel */}
      <AssetDetails />

      {/* Global Stats HUD */}
      <div className="absolute bottom-10 left-10 z-[400] glass-card-scifi p-7 rounded-[2rem] w-80 overflow-hidden">
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
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Region</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-slate-900 tracking-tighter uppercase">Amazon Basin</span>
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
