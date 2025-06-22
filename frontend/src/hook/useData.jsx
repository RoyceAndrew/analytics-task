import { create } from "zustand";

export const useData = create((set) => ({
    scatterChart: null,
    show: false,
    setShow: (show) => set({ show }),
    setScatter: (data) => set({ scatterChart:data }),
}));