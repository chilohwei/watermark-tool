import { Header } from "@/components/header";
import { WatermarkEditor } from "@/components/watermark-editor";
import { FeaturesSection } from "@/components/features-section";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <WatermarkEditor />
        <FeaturesSection />
      </main>
      <footer className="border-t bg-muted/30 py-8 text-center text-sm text-muted-foreground">
        <div className="mx-auto max-w-7xl px-4">
          <p>&copy; {new Date().getFullYear()} 水印宝 &middot; 本地处理，隐私安全</p>
        </div>
      </footer>
    </>
  );
}
