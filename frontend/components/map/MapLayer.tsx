'use client';

import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useEffect } from 'react';

// Fix for default markers
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function MapLayer() {
  const center: [number, number] = [-3.4653, -62.2159]; // Amazon Rainforest

  return (
    <div className="h-full w-full relative">
      <MapContainer 
        center={center} 
        zoom={6} 
        scrollWheelZoom={true}
        className="z-0"
        zoomControl={false} // We will add it custom or reposition
      >
        {/* OpenStreetMap Tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        
        <MapController />
      </MapContainer>

      {/* Map Overlay Stats (Glass) */}
      <div className="absolute bottom-8 left-8 z-[400] glass-card p-4 rounded-xl w-64">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Live Sentinel Stats</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">Active Sensors</span>
            <span className="text-sm font-mono font-bold text-emerald-600">1,240</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">Species Tracked</span>
            <span className="text-sm font-mono font-bold text-cyan-600">842</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">Carbon Sequestered</span>
            <span className="text-sm font-mono font-bold text-slate-900">42.5k t</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MapController() {
  const map = useMap();
  
  useEffect(() => {
    // Reposition zoom control
    L.control.zoom({ position: 'bottomright' }).addTo(map);
  }, [map]);

  return null;
}
