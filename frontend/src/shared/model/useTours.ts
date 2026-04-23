import { useEffect, useState } from "react";
import { toursService, TourFilters } from "../../api/services/toursService";
import { useToursStore } from "../../store/toursStore";

export function useTours(filters: TourFilters) {
  const [loading, setLoading] = useState(true);
  const tours = useToursStore((s) => s.tours);
  const setTours = useToursStore((s) => s.setTours);

  useEffect(() => {
    setLoading(true);
    toursService.getTours(filters).then(setTours).finally(() => setLoading(false));
  }, [filters.city, filters.category, filters.minPrice, filters.maxPrice, filters.sort, filters.page, filters.size, setTours]);

  return { loading, tours };
}
