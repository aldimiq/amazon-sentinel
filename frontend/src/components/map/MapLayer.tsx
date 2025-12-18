import Map, { NavigationControl } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

export function MapLayer() {
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
      mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
      attributionControl={false}
    >
      <NavigationControl position="bottom-right" />
      {/* Hexagon Layers will go here */}
    </Map>
  );
}
