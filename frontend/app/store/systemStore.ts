import { create } from 'zustand';

type SystemStatus = 'nominal' | 'degraded' | 'offline';

interface SystemState {
  status: SystemStatus;
  latency: number;
  setStatus: (status: SystemStatus) => void;
  setLatency: (latency: number) => void;
}

export const useSystemStore = create<SystemState>((set) => ({
  status: 'nominal',
  latency: 0,
  setStatus: (status) => set({ status }),
  setLatency: (latency) => set({ latency }),
}));
