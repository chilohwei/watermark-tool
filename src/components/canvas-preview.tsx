"use client";

import { createContext, useCallback, useContext, useEffect, useRef } from "react";
import { ImageMinus } from "lucide-react";

import { useWatermarkStore } from "@/stores/watermark-store";
import { renderWatermark } from "@/lib/watermark/renderer";
import { Button } from "@/components/ui/button";

const CanvasRefContext = createContext<React.RefObject<HTMLCanvasElement | null> | null>(null);

export function useCanvasRef() {
  const ctx = useContext(CanvasRefContext);
  if (!ctx) throw new Error("useCanvasRef must be used within CanvasPreview");
  return ctx;
}

export function useCanvasExport() {
  const canvasRef = useCanvasRef();
  return useCallback(() => {
    if (!canvasRef.current) return null;
    return canvasRef.current.toDataURL("image/png");
  }, [canvasRef]);
}

export function CanvasPreviewProvider({ children }: { children: React.ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  return (
    <CanvasRefContext.Provider value={canvasRef}>
      {children}
    </CanvasRefContext.Provider>
  );
}

export function CanvasPreview() {
  const canvasRef = useCanvasRef();
  const rafRef = useRef<number>(0);

  const image = useWatermarkStore((s) => s.image);
  const fileName = useWatermarkStore((s) => s.fileName);
  const canvasWidth = useWatermarkStore((s) => s.canvasWidth);
  const canvasHeight = useWatermarkStore((s) => s.canvasHeight);
  const config = useWatermarkStore((s) => s.config);
  const clearImage = useWatermarkStore((s) => s.clearImage);
  const setWatermarkApplied = useWatermarkStore((s) => s.setWatermarkApplied);

  useEffect(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const canvas = canvasRef.current;
      if (!canvas || !image) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      renderWatermark(ctx, image, canvasWidth, canvasHeight, config);
      setWatermarkApplied(true);
    });

    return () => cancelAnimationFrame(rafRef.current);
  }, [image, canvasWidth, canvasHeight, config, canvasRef, setWatermarkApplied]);

  if (!image) return null;

  return (
    <div className="space-y-2">
      <div className="relative overflow-hidden rounded-xl border bg-muted/20 p-2 shadow-sm">
        <canvas
          ref={canvasRef}
          className="mx-auto block max-h-[65vh] w-auto max-w-full rounded-lg object-contain"
        />
      </div>
      <div className="flex items-center justify-between px-1">
        <p className="truncate text-xs text-muted-foreground">
          {fileName}
        </p>
        <Button variant="ghost" size="sm" onClick={clearImage} className="h-7 text-xs text-muted-foreground hover:text-destructive">
          <ImageMinus className="mr-1 h-3.5 w-3.5" />
          换图
        </Button>
      </div>
    </div>
  );
}
