# 水印宝

专业的在线图片水印工具。全部在浏览器本地处理，不上传服务器，保护隐私。

## 功能

- 拖放或点击上传图片（JPG / PNG，≤ 5 MB）
- 文字水印：斜向平铺、居中两种样式
- 实时调节颜色、透明度、字号、角度、间距
- 一键导出 PNG
- 深色模式
- 全部在浏览器本地完成，零服务器依赖

## 技术栈

- **Next.js 16** + TypeScript
- **shadcn/ui** + Tailwind CSS v4
- **Zustand** 状态管理
- **Canvas API** 水印渲染

## 开发

```bash
npm install
npm run dev
```

访问 http://localhost:3000

## 构建与部署

支持 **Vercel** 和 **Cloudflare Pages** 双平台部署。

- **Cloudflare Pages（静态）**: [https://watermark-tool-dn3.pages.dev](https://watermark-tool-dn3.pages.dev)

### Cloudflare Pages：连接 Git 自动构建（推荐）

在 Cloudflare Dashboard 里把仓库接上后，**push 到 GitHub 即自动构建发布**，无需本机 `wrangler pages deploy`。

1. 打开 [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → 选中项目（或 **Create** → **Pages** → **Connect to Git**）。
2. 授权并选择仓库 **`chilohwei/watermark-tool`**，生产分支选 **`main`**。
3. **构建设置**（Build configuration）：
   | 项 | 值 |
   | --- | --- |
   | Framework preset | **None**（自定义；勿选会改输出的预设） |
   | Build command | `npm run build:static` |
   | Build output directory | `out` |
   | Root directory | `/`（仓库根目录即可） |
4. **环境变量**（Variables）建议新增：`NODE_VERSION` = `22`（与仓库 `.nvmrc` 一致；Next.js 16 需较新 Node）。
5. 保存后触发首次部署；之后在 `main` 上的 push 都会自动构建。

说明：`build:static` 已内含 `NEXT_OUTPUT=export`，产物写入 **`out/`**，与 `wrangler.jsonc` 里的 `pages_build_output_dir` 一致。若你仍想偶尔本机直传，可继续用下面的 `npm run deploy:cf`。

```bash
# Vercel（默认）
npm run build

# Cloudflare Pages（静态导出，本地验证）
npm run build:static

# 本机直传到 Cloudflare（不经 Git CI 时使用）
npm run deploy:cf

# 本地预览静态产物
npm run preview:cf
```

## 项目结构

```
src/
├── app/                      # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx
│   ├── icon.svg              # Favicon
│   └── globals.css           # Tailwind + 主题变量
├── components/
│   ├── ui/                   # shadcn/ui 基础组件
│   ├── canvas-preview.tsx    # Canvas 预览 + 导出
│   ├── image-upload.tsx      # 拖放上传
│   ├── watermark-controls.tsx # 水印参数控制面板
│   ├── watermark-editor.tsx  # 编辑器主容器
│   ├── toolbar.tsx           # 操作按钮
│   ├── header.tsx            # 顶部导航
│   ├── features-section.tsx  # 特性展示
│   ├── providers.tsx         # 主题 + Toast 提供者
│   └── theme-toggle.tsx      # 深色模式切换
├── lib/
│   ├── watermark/            # 水印渲染引擎
│   │   ├── renderer.ts      # 纯函数渲染逻辑
│   │   └── types.ts         # 类型定义 + 默认配置
│   ├── image/utils.ts        # 图片校验 / 缩放 / 加载
│   └── utils.ts              # cn() 工具函数
└── stores/
    └── watermark-store.ts    # Zustand 全局状态
```

## 捐赠

如果这个项目对你有帮助，欢迎请我喝杯咖啡 ☕

👉 [捐赠页面](https://donate.chiloh.com)

### 扫码支付

<table>
  <tr>
    <td align="center"><b>微信支付</b></td>
    <td align="center"><b>支付宝</b></td>
    <td align="center"><b>PayPal</b></td>
  </tr>
  <tr>
    <td align="center"><img src="https://donate.chiloh.com/img/wechat.webp" width="200" alt="WeChat Pay" /></td>
    <td align="center"><img src="https://donate.chiloh.com/img/alipay.webp" width="200" alt="Alipay" /></td>
    <td align="center"><img src="https://donate.chiloh.com/img/paypal.webp" width="200" alt="PayPal" /></td>
  </tr>
</table>

### 加密货币

| 币种 | 网络 | 地址 |
|------|------|------|
| **BTC** | Bitcoin SegWit | `bc1qpqchzes0wrhtg5h2rwvh3f6tf5weljetx2adun` |
| **EVM** | ETH / BSC / Polygon / Arb / OP / Base | `0x797A13aB0398eef748cF6D8C518b0803a14918b1` |
| **USDT** | TRC-20 (Tron) | `TQeEKzMRvAUXEU5tsiPR1GX8WUHdhKUhwg` |
| **SOL** | Solana (SOL & USDT SPL) | `GXTtMhJvbpmdrqSz5x65Hzd6wia5YYwaHdnxCB3PC1HY` |

## License

[MIT](LICENSE)
