import { useEffect, useState } from "react";
import { bookingsService } from "../../api/services/bookingsService";
import { Booking } from "../types";

export function useBooking() {
  const [items, setItems] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    bookingsService.getMyBookings().then(setItems).finally(() => setLoading(false));
  }, []);
  return { items, loading, setItems };
}
