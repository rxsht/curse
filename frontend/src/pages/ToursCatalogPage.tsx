import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { TourCard } from "../entities/tour/ui/TourCard";
import { ToursFilters } from "../features/tours/ui/ToursFilters";
import { useDebounce } from "../shared/lib/hooks/useDebounce";
import { useTours } from "../shared/model/useTours";
import { Button } from "../shared/ui/Button";
import { Skeleton } from "../shared/ui/Skeleton";
import { useToursStore } from "../store/toursStore";

export function ToursCatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filters = useToursStore((s) => s.filters);
  const setFilters = useToursStore((s) => s.setFilters);
  const city = useDebounce(filters.city, 350);
  const { tours, loading } = useTours({
    city,
    category: filters.category || undefined,
    minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
    maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
    sort: filters.sort,
    page: filters.page,
    size: 6
  });

  useEffect(() => {
    setFilters({
      city: searchParams.get("city") || "",
      category: searchParams.get("category") || "",
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
      sort: searchParams.get("sort") || "rating,desc",
      page: Number(searchParams.get("page") || 0)
    });
  }, [searchParams, setFilters]);

  const updateParam = (payload: Partial<typeof filters>) => {
    const next = { ...filters, ...payload };
    setFilters(payload);
    setSearchParams({
      city: next.city,
      category: next.category,
      minPrice: next.minPrice,
      maxPrice: next.maxPrice,
      sort: next.sort,
      page: String(next.page)
    });
  };

  return (
    <div className="space-y-6">
      <Helmet><title>Каталог экскурсий - GuideMate</title></Helmet>
      <h1 className="text-3xl font-semibold">Каталог экскурсий</h1>
      <ToursFilters
        city={filters.city}
        category={filters.category}
        sort={filters.sort}
        minPrice={filters.minPrice}
        maxPrice={filters.maxPrice}
        onCity={(v) => updateParam({ city: v, page: 0 })}
        onCategory={(v) => updateParam({ category: v, page: 0 })}
        onSort={(v) => updateParam({ sort: v, page: 0 })}
        onMinPrice={(v) => updateParam({ minPrice: v, page: 0 })}
        onMaxPrice={(v) => updateParam({ maxPrice: v, page: 0 })}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-80" />) : tours.map((tour) => <TourCard key={tour.id} tour={tour} />)}
      </div>
      {!loading && tours.length === 0 && (
        <div className="rounded-2xl border bg-white p-8 text-center text-slate-500">
          Ничего не найдено по текущим фильтрам. Попробуйте расширить диапазон цены или изменить локацию.
        </div>
      )}
      <div className="flex justify-center gap-3">
        <Button variant="secondary" onClick={() => updateParam({ page: Math.max(filters.page - 1, 0) })}>Назад</Button>
        <Button onClick={() => updateParam({ page: filters.page + 1 })}>Еще</Button>
      </div>
    </div>
  );
}
