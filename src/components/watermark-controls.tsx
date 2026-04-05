"use client";

import { useWatermarkStore } from "@/stores/watermark-store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function WatermarkControls() {
  const config = useWatermarkStore((s) => s.config);
  const updateConfig = useWatermarkStore((s) => s.updateConfig);

  const sliderCount = config.style === "tiled" ? 4 : 3;
  const sliderCols =
    sliderCount === 4
      ? "sm:grid-cols-2 lg:grid-cols-4"
      : "sm:grid-cols-3";

  return (
    <Card className="shadow-sm">
      <CardContent className="space-y-4 p-4">
        {/* Row 1: discrete controls — text / style / color */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-3">
          <div className="space-y-1.5">
            <Label htmlFor="wm-text" className="text-xs">水印文字</Label>
            <Input
              id="wm-text"
              value={config.text}
              onChange={(e) => updateConfig({ text: e.target.value })}
              placeholder="请输入水印文字"
              className="h-8 text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs">样式</Label>
            <div className="flex gap-1.5">
              {(["tiled", "centered"] as const).map((style) => (
                <StyleButton
                  key={style}
                  active={config.style === style}
                  label={style === "tiled" ? "斜向平铺" : "居中"}
                  onClick={() => updateConfig({ style })}
                />
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="wm-color" className="text-xs">颜色</Label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                id="wm-color"
                value={config.color}
                onChange={(e) => updateConfig({ color: e.target.value })}
                className="h-8 w-10 cursor-pointer rounded-md border border-border bg-transparent p-0.5"
              />
              <Input
                value={config.color}
                onChange={(e) => updateConfig({ color: e.target.value })}
                className="h-8 flex-1 font-mono text-xs"
                maxLength={7}
              />
            </div>
          </div>
        </div>

        <hr className="border-border" />

        {/* Row 2: sliders — always evenly distributed */}
        <div className={cn("grid grid-cols-1 gap-x-6 gap-y-4", sliderCols)}>
          <SliderControl
            label="透明度"
            value={config.opacity}
            min={0}
            max={1}
            step={0.05}
            displayValue={`${Math.round(config.opacity * 100)}%`}
            onChange={(v) => updateConfig({ opacity: v })}
          />

          <SliderControl
            label="字号"
            value={config.fontSize}
            min={8}
            max={120}
            step={1}
            displayValue={`${config.fontSize}px`}
            onChange={(v) => updateConfig({ fontSize: v })}
          />

          <SliderControl
            label="角度"
            value={config.angle}
            min={0}
            max={360}
            step={1}
            displayValue={`${config.angle}°`}
            onChange={(v) => updateConfig({ angle: v })}
          />

          {config.style === "tiled" && (
            <SliderControl
              label="间距"
              value={config.spacing}
              min={0}
              max={200}
              step={1}
              displayValue={`${config.spacing}px`}
              onChange={(v) => updateConfig({ spacing: v })}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function StyleButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex-1 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground shadow-sm"
          : "border-border bg-background hover:bg-accent",
      )}
    >
      {label}
    </button>
  );
}

function SliderControl({
  label,
  value,
  min,
  max,
  step,
  displayValue,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  displayValue: string;
  onChange: (value: number) => void;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <Label className="text-xs">{label}</Label>
        <span className="text-xs tabular-nums text-muted-foreground">
          {displayValue}
        </span>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(val) => {
          const v = Array.isArray(val) ? val[0] : val;
          onChange(v);
        }}
      />
    </div>
  );
}
