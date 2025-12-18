import { create } from 'zustand';

interface HexProperties {
  h3_index: string;
  status: 'available' | 'owned' | 'alert';
  carbon_stock: number;
  bio_score: number;
}

interface HexFeature {
  id: string;
  type: 'Feature';
  geometry: any;
  properties: HexProperties;
}

interface SentinelState {
  selectedHex: HexFeature | null;
  setSelectedHex: (hex: HexFeature | null) => void;
}

export const useStore = create<SentinelState>((set) => ({
  selectedHex: null,
  setSelectedHex: (hex) => set({ selectedHex: hex }),
}));
