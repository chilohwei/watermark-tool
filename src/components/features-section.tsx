import { Shield, Sparkles, Zap } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "本地处理",
    description: "图片全部在浏览器本地处理，不上传服务器，隐私绝对安全。",
  },
  {
    icon: Sparkles,
    title: "开源免费",
    description: "完全开源，所有功能免费使用，无任何隐藏收费。",
  },
  {
    icon: Zap,
    title: "简单高效",
    description: "实时预览，拖拽上传，一键导出。无需注册即可使用。",
  },
];

export function FeaturesSection() {
  return (
    <section className="border-t py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-3 sm:gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col items-center text-center"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-4 font-semibold">{feature.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
