import { motion } from "framer-motion";
import { useBooking } from "../shared/model/useBooking";
import { Badge } from "../shared/ui/Badge";
import { Skeleton } from "../shared/ui/Skeleton";

type Booking = { id: number; tourTitle: string; status: string; tourDate: string; participants: number };

export function BookingsPage() {
  const { items, loading } = useBooking();

  return (
    <div className="grid gap-3">
      <h1 className="text-2xl font-semibold">Мои бронирования</h1>
      {loading && <Skeleton className="h-24" />}
      {items.map((b: Booking) => (
        <motion.div key={b.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border bg-white p-4">
          <p className="font-semibold">{b.tourTitle}</p>
          <p className="text-sm text-slate-600">{b.tourDate}</p>
          <Badge>{b.status}</Badge>
          <p>Участников: {b.participants}</p>
        </motion.div>
      ))}
    </div>
  );
}
