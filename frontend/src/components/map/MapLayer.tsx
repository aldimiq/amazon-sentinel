// @ts-ignore
import Map, { NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export function MapLayer() {
  if (!MAPBOX_TOKEN) {
    return (
      <div className="w-full h-full bg-sentinel-900 flex items-center justify-center">
         <div className="text-center space-y-4 max-w-md p-8 bg-slate-800/50 rounded-xl border border-red-500/20 backdrop-blur-sm">
            <h3 className="text-red-400 font-mono font-bold text-lg">⚠️ MAPBOX TOKEN MISSING</h3>
            <p className="text-slate-400 text-sm">
              Please add <code className="text-sentinel-400">VITE_MAPBOX_TOKEN</code> to your <code className="text-white">.env.local</code> file.
            </p>
            <div className="h-1 w-full bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-red-500/50 w-2/3 animate-pulse"></div>
            </div>
         </div>
      </div>
    );
  }

  return (
    <Map
      initialViewState={{
        longitude: -60.0, // Amazon Basin
        latitude: -3.0,
        zoom: 4,
        pitch: 45,
        bearing: 0
      }}
      style={{width: '100%', height: '100%'}}
      mapStyle="mapbox://styles/mapbox/dark-v11" // Or a custom satellite style
      mapboxAccessToken={MAPBOX_TOKEN}
      attributionControl={false}
    >
      <NavigationControl position="bottom-right" />
      {/* Hexagon Layers will go here */}
    </Map>
  );
}
