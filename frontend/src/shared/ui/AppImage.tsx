import { useState } from "react";
import { ImageAssetDto } from "../types";
import { cn } from "../lib/cn";

const fallbackImage = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80";

type Props = {
  asset?: ImageAssetDto;
  alt: string;
  className?: string;
  sizes?: string;
};

export function AppImage({ asset, alt, className, sizes }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [src, setSrc] = useState(asset?.imageUrl || fallbackImage);

  return (
    <div className={cn("relative overflow-hidden bg-slate-100", className)}>
      <img
        src={asset?.blurDataUrl || fallbackImage}
        alt=""
        aria-hidden
        className={cn("absolute inset-0 h-full w-full object-cover transition-opacity duration-500", loaded ? "opacity-0" : "opacity-100 blur-sm")}
      />
      <img
        src={src}
        alt={asset?.alt || alt}
        loading="lazy"
        sizes={sizes}
        className={cn("h-full w-full object-cover transition duration-500", loaded ? "scale-100 opacity-100" : "scale-[1.02] opacity-0")}
        onLoad={() => setLoaded(true)}
        onError={() => setSrc(fallbackImage)}
      />
    </div>
  );
}
