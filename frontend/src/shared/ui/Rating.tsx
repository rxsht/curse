import { Star } from "lucide-react";
import { cn } from "../lib/cn";

export function Rating({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Рейтинг ${value} из 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={cn("h-4 w-4", i < Math.round(value) ? "fill-amber-400 text-amber-400" : "text-slate-300")} />
      ))}
      <span className="ml-1 text-xs text-slate-600">{value.toFixed(1)}</span>
    </div>
  );
}
