import { Star } from "lucide-react";
import { cn } from "../lib/cn";

type Props = {
  value: number;
  onChange: (value: number) => void;
};

export function RatingInput({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-1" role="radiogroup" aria-label="Оценка">
      {Array.from({ length: 5 }).map((_, i) => {
        const current = i + 1;
        return (
          <button key={current} type="button" onClick={() => onChange(current)} className="transition hover:scale-110" aria-label={`${current} stars`}>
            <Star className={cn("h-5 w-5", current <= value ? "fill-amber-400 text-amber-400" : "text-slate-300")} />
          </button>
        );
      })}
    </div>
  );
}
