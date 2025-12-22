'use client';

import { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import { useExplorerStore } from '@/app/store/explorer';
import { api } from '@/app/lib/api';
import AssetDetails from '../ui/AssetDetails';
import 'leaflet/dist/leaflet.css';
import { Locate } from 'lucide-react';

interface MapLayerProps {
  enableFilters?: boolean;
}

export default function MapLayer({ enableFilters = false }: MapLayerProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const highlightedLayerRef = useRef<L.Path | null>(null);
  const { setSelection, filters, setMapMode, mapMode } = useExplorerStore();
  const [geoData, setGeoData] = useState<any>(null);
  
  const isSatellite = mapMode === 'satellite';

  // 1. Fetch Data
  useEffect(() => {
    api.get('/explorer/hexes')
      .then(res => {
        const features = res.data.map((h: any) => ({
          type: 'Feature',
          properties: {
            h3_index: h.h3_index,
            status: h.status,
            carbon_stock: h.carbon_stock || 0, // Ensure properties exist for filtering
            bio_score: h.bio_score || 0,
            price: h.price || 0
          },
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
      zoom: 11,
      zoomControl: false,
      scrollWheelZoom: true,
    });
    mapInstance.current = map;

    // Base Layers
    const cartoLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; CARTO'
    });

    const esriLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri'
    });

    // Add default layer (User requested Satellite default)
    esriLayer.addTo(map);

    // Layer Control
    L.control.layers({
      "Map View": cartoLayer,
      "Satellite": esriLayer
    }, undefined, { position: 'bottomright' }).addTo(map);

    // Zoom control (Added here to prevent duplicates)
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Listen for layer changes to toggle UI Theme
    map.on('baselayerchange', (e: any) => {
      if (e.name === 'Map View') setMapMode('map');
      if (e.name === 'Satellite') setMapMode('satellite');
    });

    // Cleanup on unmount
    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, []);

  // 3. Update GeoJSON Layer when data changes
  useEffect(() => {
    if (!mapInstance.current || !geoData) return;

    // HUD Style: Thin, crisp lines, subtle glass fill
    const hexStyle = (feature: any) => ({
      fillColor: feature.properties.status === 'available' ? '#10b981' : '#f59e0b',
      weight: 1.5,
      opacity: 0.8,
      color: feature.properties.status === 'available' ? '#34d399' : '#fbbf24', // Brighter stroke
      fillOpacity: 0.15, // More subtle fill to see satellite
      className: 'hex-path transition-all duration-300' // Smooth transitions
    });

    const highlightStyle = {
      color: '#fff', // Pure white highlight
      weight: 3,
      opacity: 1,
      fillColor: '#fbbf24',
      fillOpacity: 0.4
    };

    const onHexClick = (e: any) => {
      L.DomEvent.stopPropagation(e);
      const layer = e.target;
      const h3Index = layer.feature.properties.h3_index;

      // Reset previous highlight
      if (highlightedLayerRef.current) {
        // @ts-ignore
        const prevLayer = highlightedLayerRef.current;
        prevLayer.setStyle(hexStyle((prevLayer as any).feature));
      }

      // Apply highlight
      layer.setStyle(highlightStyle);
      layer.bringToFront();
      highlightedLayerRef.current = layer;

      setSelection(h3Index);
    };

    // Filter Logic
    const filterFn = (feature: any) => {
      // Only apply filters if enabled (Page Specific)
      if (!enableFilters) return true;

      const p = feature.properties;
      if (!filters) return true;

      const price = Number(p.price) || 0;
      const bioScore = Number(p.bio_score) || 0;
      const carbon = Number(p.carbon_stock) || 0;

      // Status Check
      if (filters.status !== 'all' && p.status !== filters.status) {
        return false;
      }

      return (
        price <= filters.maxPrice &&
        bioScore >= filters.minBioScore &&
        carbon >= filters.minCarbon
      );
    };

    const geoJsonLayer = L.geoJSON(geoData, {
      style: hexStyle,
      filter: filterFn,
      onEachFeature: (feature, layer) => {
        layer.on({
          click: onHexClick
        });
      }
    }).addTo(mapInstance.current);

    const onMapClick = () => {
      if (highlightedLayerRef.current) {
        const prevLayer = highlightedLayerRef.current;
        prevLayer.setStyle(hexStyle((prevLayer as any).feature));
        highlightedLayerRef.current = null;
      }
      setSelection(null);
    };

    mapInstance.current.on('click', onMapClick);

    return () => {
      if (mapInstance.current) {
        mapInstance.current.removeLayer(geoJsonLayer);
        mapInstance.current.off('click', onMapClick);
      }
    };
  }, [geoData, setSelection, filters]);

  const handleRecenter = () => {
    if (mapInstance.current) {
      mapInstance.current.flyTo([-3.4653, -62.2159], 11, {
        animate: true,
        duration: 1.5
      });
    }
  };

  return (
    <div className="h-full w-full relative group">
      <div className="digital-twin-bg" />
      <div className="scan-line" />

      {/* Map Container Ref */}
      <div ref={mapRef} className="h-full w-full z-0" />

      {/* Selected Asset Floating Panel */}
      <AssetDetails />

      {/* Recenter Button */}
      <button 
        onClick={handleRecenter}
        className="absolute bottom-40 right-3 z-[400] bg-white text-slate-900 p-3 rounded-full shadow-xl hover:bg-slate-100 transition-all active:scale-95 border border-slate-200"
        aria-label="Recenter Map"
      >
        <Locate size={20} />
      </button>

      {/* Global Stats HUD */}
      <div className={`absolute bottom-10 left-10 z-[400] bg-white/40 backdrop-blur-xl border border-white/40 p-7 rounded-[2rem] w-80 overflow-hidden shadow-xl ${
        isSatellite ? 'text-white' : 'text-slate-900'
      }`}>
        <div className="hud-corner hud-tl" />
        <div className="hud-corner hud-tr" />
        <div className="hud-corner hud-bl" />
        <div className="hud-corner hud-br" />

        <div className="flex items-center gap-3 mb-6">
          <div className="h-2 w-2 rounded-full bg-emerald-500 glow-pulse" />
          <h3 className={`text-[10px] font-black uppercase tracking-[0.3em] ${
            isSatellite ? 'text-white' : 'text-slate-950'
          }`}>
            Neural Interface
          </h3>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col">
            <span className={`text-[10px] font-bold uppercase tracking-widest ${
              isSatellite ? 'text-white' : 'text-slate-950'
            }`}>
              Active Region
            </span>
            <div className="flex items-baseline gap-1">
              <span className={`text-2xl font-black tracking-tighter uppercase ${
                isSatellite ? 'text-white' : 'text-black'
              }`}>
                Amazon Basin
              </span>
            </div>
          </div>

          <div className={`grid grid-cols-2 gap-4 pt-4 border-t ${
            isSatellite ? 'border-white/20' : 'border-slate-200'
          }`}>
            <div>
              <div className={`text-[9px] font-black uppercase ${
                isSatellite ? 'text-white' : 'text-slate-950'
              }`}>
                Latency
              </div>
              <div className={`text-xs font-bold font-mono ${
                isSatellite ? 'text-white' : 'text-black'
              }`}>
                24ms
              </div>
            </div>
            <div>
              <div className={`text-[9px] font-black uppercase ${
                isSatellite ? 'text-white' : 'text-slate-950'
              }`}>
                Uplink
              </div>
              <div className="text-xs font-bold text-emerald-600 font-mono">ACTIVE</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
