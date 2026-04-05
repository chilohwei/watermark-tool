import { create } from "zustand";

import type { WatermarkConfig } from "@/lib/watermark/types";
import { DEFAULT_WATERMARK_CONFIG } from "@/lib/watermark/types";

interface WatermarkState {
  image: HTMLImageElement | null;
  fileName: string;
  canvasWidth: number;
  canvasHeight: number;
  config: WatermarkConfig;
  watermarkApplied: boolean;

  setImage: (image: HTMLImageElement, fileName: string, width: number, height: number) => void;
  clearImage: () => void;
  updateConfig: (partial: Partial<WatermarkConfig>) => void;
  resetConfig: () => void;
  setWatermarkApplied: (applied: boolean) => void;
}

export const useWatermarkStore = create<WatermarkState>((set) => ({
  image: null,
  fileName: "",
  canvasWidth: 0,
  canvasHeight: 0,
  config: DEFAULT_WATERMARK_CONFIG,
  watermarkApplied: false,

  setImage: (image, fileName, width, height) =>
    set({ image, fileName, canvasWidth: width, canvasHeight: height, watermarkApplied: false }),

  clearImage: () =>
    set({ image: null, fileName: "", canvasWidth: 0, canvasHeight: 0, watermarkApplied: false }),

  updateConfig: (partial) =>
    set((state) => ({ config: { ...state.config, ...partial } })),

  resetConfig: () =>
    set({ config: DEFAULT_WATERMARK_CONFIG }),

  setWatermarkApplied: (applied) =>
    set({ watermarkApplied: applied }),
}));
