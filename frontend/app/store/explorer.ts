import { create } from 'zustand';

interface HexDetails {
  h3_index: string;
  carbon_stock: number;
  bio_score: number;
  status: string;
  price: number;
}

interface Filters {
  minPrice: number;
  maxPrice: number;
  minBioScore: number;
  minCarbon: number;
}

interface ExplorerState {
  selectedHex: string | null;
  details: HexDetails | null;
  filters: Filters;
  setSelection: (h3Index: string | null) => void;
  setDetails: (details: HexDetails | null) => void;
  setFilters: (filters: Partial<Filters>) => void;
}

export const useExplorerStore = create<ExplorerState>((set) => ({
  selectedHex: null,
  details: null,
  filters: {
    minPrice: 0,
    maxPrice: 1000000, // High default to avoid accidental hiding
    minBioScore: 0,
    minCarbon: 0,
  },
  setSelection: (h3Index) => set({ selectedHex: h3Index, details: h3Index ? null : null }),
  setDetails: (details) => set({ details }),
  setFilters: (newFilters) => set((state) => ({ filters: { ...state.filters, ...newFilters } })),
}));
