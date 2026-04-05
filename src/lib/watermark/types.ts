export type WatermarkStyle = "tiled" | "centered";

export interface WatermarkConfig {
  text: string;
  style: WatermarkStyle;
  color: string;
  opacity: number;
  fontSize: number;
  angle: number;
  spacing: number;
  fontFamily: string;
}

export const DEFAULT_WATERMARK_CONFIG: WatermarkConfig = {
  text: "仅供XXX使用",
  style: "tiled",
  color: "#FFFFFF",
  opacity: 0.5,
  fontSize: 16,
  angle: 335,
  spacing: 24,
  fontFamily: "Arial",
};
