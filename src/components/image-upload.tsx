"use client";

import { useCallback, useRef, useState } from "react";
import { Upload, ImagePlus } from "lucide-react";
import { toast } from "sonner";

import { useWatermarkStore } from "@/stores/watermark-store";
import { validateImageFile, loadImageFromFile, calcScaledDimensions } from "@/lib/image/utils";
import { cn } from "@/lib/utils";

export function ImageUpload() {
  const { image, setImage } = useWatermarkStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback(
    async (file: File) => {
      const error = validateImageFile(file);
      if (error) {
        toast.error(error.message);
        return;
      }

      try {
        const img = await loadImageFromFile(file);
        const { width, height } = calcScaledDimensions(img.width, img.height);
        setImage(img, file.name, width, height);
        toast.success("图片上传成功");
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "图片加载失败");
      }
    },
    [setImage],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
      if (inputRef.current) inputRef.current.value = "";
    },
    [handleFile],
  );

  if (image) return null;

  return (
    <div
      className={cn(
        "group flex h-48 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all duration-200 sm:h-56",
        isDragging
          ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
          : "border-primary/30 bg-card/60 shadow-sm hover:border-primary/60 hover:bg-card hover:shadow-md",
      )}
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center gap-3">
        <div
          className={cn(
            "flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-200",
            isDragging
              ? "bg-primary/15 text-primary"
              : "bg-primary/8 text-primary/70 group-hover:bg-primary/12 group-hover:text-primary",
          )}
        >
          {isDragging ? (
            <ImagePlus className="h-7 w-7" />
          ) : (
            <Upload className="h-7 w-7" />
          )}
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-foreground/80">
            {isDragging ? "释放以上传图片" : "点击或拖放图片到这里"}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            支持 JPG / PNG，最大 5MB
          </p>
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}
