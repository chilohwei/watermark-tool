const ACCEPTED_TYPES = ["image/jpeg", "image/png"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_DIMENSION = 800;

export interface ImageValidationError {
  message: string;
}

export function validateImageFile(
  file: File,
): ImageValidationError | null {
  if (!ACCEPTED_TYPES.includes(file.type)) {
    return { message: "仅支持 JPG/PNG 格式的图片" };
  }
  if (file.size > MAX_FILE_SIZE) {
    return { message: "图片大小不能超过 5MB" };
  }
  return null;
}

export function calcScaledDimensions(
  width: number,
  height: number,
  maxDim = MAX_DIMENSION,
): { width: number; height: number } {
  const scale = Math.min(maxDim / width, maxDim / height, 1);
  return {
    width: Math.round(width * scale),
    height: Math.round(height * scale),
  };
}

export function loadImageFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("图片加载失败"));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error("文件读取失败"));
    reader.readAsDataURL(file);
  });
}
