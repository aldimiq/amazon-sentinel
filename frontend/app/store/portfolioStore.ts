'use client';

import { create } from 'zustand';
import { api } from '@/app/lib/api';

interface Asset {
    id: string;
    h3_index: string;
    status: string;
    carbon_stock: number;
    bio_score: number;
    price: number;
}

interface PortfolioState {
    assets: Asset[];
    loading: boolean;
    error: string | null;
    fetchAssets: (userId: string) => Promise<void>;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
    assets: [],
    loading: false,
    error: null,
    fetchAssets: async (userId: string) => {
        set({ loading: true, error: null });
        try {
            const res = await api.get(`/portfolio/assets/${userId}`);
            set({ assets: res.data, loading: false });
        } catch (err: any) {
            set({ error: err.message, loading: false });
        }
    }
}));
