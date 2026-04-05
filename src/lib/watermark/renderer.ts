import type { WatermarkConfig } from "./types";

export function renderWatermark(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  canvasWidth: number,
  canvasHeight: number,
  config: WatermarkConfig,
): void {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);

  if (!config.text.trim()) return;

  ctx.save();
  ctx.globalAlpha = config.opacity;
  ctx.fillStyle = config.color;
  ctx.font = `${config.fontSize}px ${config.fontFamily}`;
  ctx.translate(canvasWidth / 2, canvasHeight / 2);
  ctx.rotate((config.angle * Math.PI) / 180);

  switch (config.style) {
    case "tiled": {
      const textWidth = ctx.measureText(config.text).width;
      const patternWidth = textWidth + config.spacing;
      const patternHeight = config.fontSize + config.spacing;
      const diagonal = Math.sqrt(canvasWidth ** 2 + canvasHeight ** 2);

      for (let y = -diagonal; y < diagonal; y += patternHeight) {
        for (let x = -diagonal; x < diagonal; x += patternWidth) {
          ctx.fillText(config.text, x, y);
        }
      }
      break;
    }
    case "centered": {
      const textWidth = ctx.measureText(config.text).width;
      ctx.fillText(config.text, -textWidth / 2, config.fontSize / 2);
      break;
    }
  }

  ctx.restore();
}
