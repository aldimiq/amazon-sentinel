import Map, { NavigationControl, Source, Layer, LayerProps, MapLayerMouseEvent } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useState, useCallback } from 'react';
import { useStore } from '../../store/useStore';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const hexLayer: LayerProps = {
  id: 'hex-fills',
  type: 'fill',
  paint: {
    'fill-color': [
      'match',
      ['get', 'status'],
      'available', '#06b6d4',
      'owned', '#10b981',
      'alert', '#ef4444',
      '#cccccc'
    ],
    'fill-opacity': 0.4
  }
};

const hexOutlineLayer: LayerProps = {
  id: 'hex-outline',
  type: 'line',
  paint: {
    'line-color': '#ffffff',
    'line-width': 0.5,
    'line-opacity': 0.2
  }
};

const hexHighlightLayer: LayerProps = {
  id: 'hex-highlight',
  type: 'line',
  paint: {
    'line-color': '#ffffff',
    'line-width': 2,
    'line-opacity': 0.8
  },
  filter: ['==', ['id'], '']
};

export function MapLayer() {
  const setSelectedHex = useStore((state) => state.setSelectedHex);
  const [hoverFilter, setHoverFilter] = useState(['==', ['id'], '']);

  const onHover = useCallback((event: MapLayerMouseEvent) => {
    const feature = event.features?.[0];
    if (feature) {
      setHoverFilter(['==', ['id'], feature.id || '']);
    } else {
      setHoverFilter(['==', ['id'], '']);
    }
  }, []);

  const onClick = useCallback((event: MapLayerMouseEvent) => {
    const feature = event.features?.[0];
    if (feature) {
      setSelectedHex(feature as any);
    } else {
      setSelectedHex(null);
    }
  }, [setSelectedHex]);

  return (
    <Map
      initialViewState={{
        longitude: -60.0217, 
        latitude: -3.119,
        zoom: 11,
        pitch: 45,
        bearing: 0
      }}
      style={{width: '100%', height: '100%'}}
      mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
      attributionControl={false}
      onMouseMove={onHover}
      onClick={onClick}
      interactiveLayerIds={['hex-fills']}
    >
      <NavigationControl position="bottom-right" />
      
      <Source 
        id="hex-data" 
        type="geojson" 
        data={`${API_URL}/api/v1/hexes`}
      >
        <Layer {...hexLayer} />
        <Layer {...hexOutlineLayer} />
        <Layer {...hexHighlightLayer} filter={hoverFilter} />
      </Source>
    </Map>
  );
}
