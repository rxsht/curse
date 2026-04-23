import { useState } from "react";
import { ImageAssetDto } from "../../../shared/types";
import { AppImage } from "../../../shared/ui/AppImage";

export function TourGallery({ images, title }: { images: ImageAssetDto[]; title: string }) {
  const [selected, setSelected] = useState(images[0]);
  return (
    <div className="space-y-3">
      <AppImage asset={selected} alt={title} className="h-72 w-full rounded-2xl md:h-[26rem]" sizes="(max-width: 768px) 100vw, 66vw" />
      <div className="grid grid-cols-3 gap-3">
        {images.map((img) => (
          <button key={img.imageUrl} onClick={() => setSelected(img)} className="overflow-hidden rounded-xl border">
            <AppImage asset={img} alt={title} className="h-24 w-full transition hover:scale-105" sizes="33vw" />
          </button>
        ))}
      </div>
    </div>
  );
}
