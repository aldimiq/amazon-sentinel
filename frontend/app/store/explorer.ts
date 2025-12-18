import { create } from 'zustand';

interface HexDetails {
  h3_index: string;
  carbon_stock: number;
  bio_score: number;
  status: string;
  price: number;
}

interface ExplorerState {
  selectedHex: string | null;
  details: HexDetails | null;
  setSelection: (h3Index: string | null) => void;
  setDetails: (details: HexDetails | null) => void;
}

export const useExplorerStore = create<ExplorerState>((set) => ({
  selectedHex: null,
  details: null,
  setSelection: (h3Index) => set({ selectedHex: h3Index, details: h3Index ? null : null }),
  setDetails: (details) => set({ details }),
}));
