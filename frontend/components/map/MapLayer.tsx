'use client';

import { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import { useExplorerStore } from '@/app/store/explorer';
import { useAuthStore } from '@/app/store/auth';
import { useSystemStore } from '@/app/store/systemStore';
import { api } from '@/app/lib/api';
import { useSearchParams } from 'next/navigation';
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
  const { user } = useAuthStore();
  const { latency, status } = useSystemStore();
  const searchParams = useSearchParams();
  
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
            owner_id: h.owner_id, // Ensure owner_id is passed
            carbon_stock: h.carbon_stock || 0,
            bio_score: h.bio_score || 0,
            price: h.price || 0
          },
          geometry: h.geom
        }));
        setGeoData({ type: 'FeatureCollection', features });
      })
      .catch(err => console.error('Map Load Error:', err));
  }, []);

  // 2. Initialize Map
  useEffect(() => {
    if (!mapRef.current) return;
    if (mapInstance.current) return;

    const map = L.map(mapRef.current, {
      center: [-3.4653, -62.2159],
      zoom: 11,
      zoomControl: false,
      scrollWheelZoom: true,
    });
    mapInstance.current = map;

    const cartoLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; CARTO'
    });

    const esriLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri'
    });

    esriLayer.addTo(map);

    L.control.layers({
      "Map View": cartoLayer,
      "Satellite": esriLayer
    }, undefined, { position: 'bottomright' }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    map.on('baselayerchange', (e: any) => {
      if (e.name === 'Map View') setMapMode('map');
      if (e.name === 'Satellite') setMapMode('satellite');
    });

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, []);

  // 3. Handle Deep Linking (URL Query)
  useEffect(() => {
    if (!geoData || !mapInstance.current) return;

    const targetH3 = searchParams.get('h3');
    if (targetH3) {
      // Find feature
      const feature = geoData.features.find((f: any) => f.properties.h3_index === targetH3);
      if (feature) {
        // Create a temporary layer to get bounds
        const layer = L.geoJSON(feature);
        const bounds = layer.getBounds();
        
        // Fly to bounds
        mapInstance.current.flyToBounds(bounds, {
          padding: [50, 50],
          maxZoom: 13,
          animate: true,
          duration: 1.5
        });

        // Select it (Note: This doesn't highlight it visually via the click handler logic, 
        // we rely on setSelection to open the panel, but visual highlight needs reference to the layer.
        // For now, we just open the panel.)
        setSelection(targetH3);
      }
    }
  }, [geoData, searchParams]);


  // 4. Update GeoJSON Layer
  useEffect(() => {
    if (!mapInstance.current || !geoData) return;

    // Remove old layers if any (simple approach for now, usually we keep track of layer group)
    // For this prototype, we're assuming this effect runs when geoData changes (once).
    // Note: React 18 strict mode might cause double init, but mapInstance check handles it.
    // However, L.geoJSON needs to be managed if geoData updates.
    // Let's use a clear function if we were updating data frequently.
    
    // Custom Style Logic
    const hexStyle = (feature: any) => {
      const isMyAsset = user?.id && feature.properties.owner_id === user.id;
      
      let fillColor = '#10b981'; // Available (Green)
      let color = '#34d399';
      
      if (feature.properties.status !== 'available') {
        if (isMyAsset) {
          fillColor = '#06b6d4'; // Mine (Cyan)
          color = '#22d3ee';
        } else {
          fillColor = '#f59e0b'; // Others (Orange)
          color = '#fbbf24';
        }
      }

      return {
        fillColor,
        weight: 1.5,
        opacity: 0.8,
        color,
        fillOpacity: isMyAsset ? 0.3 : 0.15, // Make mine slightly more visible
        className: 'hex-path transition-all duration-300'
      };
    };

    const highlightStyle = {
      color: '#fff',
      weight: 3,
      opacity: 1,
      fillColor: '#fbbf24',
      fillOpacity: 0.4
    };

    const onHexClick = (e: any) => {
      L.DomEvent.stopPropagation(e);
      const layer = e.target;
      const h3Index = layer.feature.properties.h3_index;

      if (highlightedLayerRef.current) {
        // @ts-ignore
        const prevLayer = highlightedLayerRef.current;
        prevLayer.setStyle(hexStyle((prevLayer as any).feature));
      }

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
      if (filters.status !== 'all') {
        if (filters.status === 'mine') {
           // 'mine' is a derived check, not a direct status in DB usually
           if (!user || p.owner_id !== user.id) return false;
        } else if (p.status !== filters.status) {
           return false;
        }
      }

      return (
        price <= filters.maxPrice &&
        bioScore >= filters.minBioScore &&
        carbon >= filters.minCarbon
      );
    };

    // Clear previous layers to avoid duplicates on re-render
    mapInstance.current.eachLayer((layer) => {
       if (layer instanceof L.GeoJSON) {
         mapInstance.current?.removeLayer(layer);
       }
    });

    const geoJsonLayer = L.geoJSON(geoData, {
      style: hexStyle,
      filter: filterFn,
      onEachFeature: (feature, layer) => {
        layer.on({ click: onHexClick });
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
  }, [geoData, setSelection, filters, user]); // Added user to dependency to re-render styles on login

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
                {status === 'offline' ? '--' : `${latency}ms`}
              </div>
            </div>
            <div>
              <div className={`text-[9px] font-black uppercase ${
                isSatellite ? 'text-white' : 'text-slate-950'
              }`}>
                Uplink
              </div>
              <div className={`text-xs font-bold font-mono ${
                status === 'nominal' ? 'text-emerald-600' :
                status === 'degraded' ? 'text-amber-500' : 'text-rose-500'
              }`}>
                {status === 'offline' ? 'DOWN' : 'ACTIVE'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
