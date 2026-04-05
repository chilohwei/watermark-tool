"use client";

import { Download, RotateCcw } from "lucide-react";
import { toast } from "sonner";

import { useWatermarkStore } from "@/stores/watermark-store";
import { useCanvasExport } from "@/components/canvas-preview";
import { Button } from "@/components/ui/button";

export function Toolbar() {
  const watermarkApplied = useWatermarkStore((s) => s.watermarkApplied);
  const resetConfig = useWatermarkStore((s) => s.resetConfig);
  const getDataUrl = useCanvasExport();

  const handleSave = () => {
    if (!watermarkApplied) {
      toast.error("请先应用水印");
      return;
    }
    const dataUrl = getDataUrl();
    if (!dataUrl) {
      toast.error("导出失败");
      return;
    }
    const link = document.createElement("a");
    link.download = "watermarked-image.png";
    link.href = dataUrl;
    link.click();
    toast.success("图片已保存");
  };

  return (
    <div className="flex justify-center gap-3">
      <Button variant="outline" size="sm" onClick={resetConfig}>
        <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
        重置
      </Button>
      <Button size="sm" onClick={handleSave} className="shadow-sm">
        <Download className="mr-1.5 h-3.5 w-3.5" />
        保存图片
      </Button>
    </div>
  );
}
