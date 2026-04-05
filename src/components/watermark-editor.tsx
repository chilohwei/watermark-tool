"use client";

import { ImageUpload } from "@/components/image-upload";
import { CanvasPreview, CanvasPreviewProvider } from "@/components/canvas-preview";
import { WatermarkControls } from "@/components/watermark-controls";
import { Toolbar } from "@/components/toolbar";
import { useWatermarkStore } from "@/stores/watermark-store";

export function WatermarkEditor() {
  const image = useWatermarkStore((s) => s.image);

  if (!image) {
    return (
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_-20%,var(--color-primary)/8%,transparent)]" />
        <div className="mx-auto max-w-3xl px-4 pb-16 pt-20 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            为你的图片添加
            <span className="text-primary">专业水印</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            全部在浏览器本地处理，不上传服务器。支持文字水印、多种样式、实时预览。
          </p>
          <div className="mx-auto mt-10 max-w-2xl">
            <ImageUpload />
          </div>
        </div>
      </section>
    );
  }

  return (
    <CanvasPreviewProvider>
      <section className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <CanvasPreview />
        <WatermarkControls />
        <Toolbar />
      </section>
    </CanvasPreviewProvider>
  );
}
