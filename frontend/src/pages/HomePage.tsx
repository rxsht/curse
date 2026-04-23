import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { TourCard } from "../entities/tour/ui/TourCard";
import { mockBannerImage } from "../shared/mocks/media";
import { useTours } from "../shared/model/useTours";
import { AppImage } from "../shared/ui/AppImage";
import { Button } from "../shared/ui/Button";
import { Skeleton } from "../shared/ui/Skeleton";
import { useToursStore } from "../store/toursStore";

export function HomePage() {
  const { tours, loading } = useTours({ size: 3, page: 0 });
  const recentlyViewed = useToursStore((s) => s.recentlyViewed);
  const topRated = tours.filter((item) => item.badges.includes("TOP_RATED"));
  const newTours = tours.filter((item) => item.badges.includes("NEW"));
  return (
    <div className="space-y-10">
      <Helmet>
        <title>GuideMate - Marketplace локальных гидов</title>
        <meta name="description" content="Найдите локального гида и забронируйте экскурсию в пару кликов." />
      </Helmet>

      <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative overflow-hidden rounded-3xl bg-slate-900 p-8 text-white md:p-12">
        <AppImage asset={mockBannerImage} alt="Travel" className="absolute inset-0 h-full w-full opacity-35" sizes="100vw" />
        <div className="relative max-w-2xl space-y-5">
          <h1 className="text-3xl font-bold md:text-5xl">Найдите идеального локального гида</h1>
          <p className="text-slate-100">Проверенные экскурсии, реальные отзывы и быстрый онлайн-букинг в любом городе.</p>
          <Link to="/tours"><Button className="bg-white text-slate-900 hover:bg-slate-100">Исследовать экскурсии</Button></Link>
        </div>
      </motion.section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Популярные направления</h2>
          <Link to="/tours" className="text-sm text-sky-700">Смотреть все</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {loading ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-80" />) : tours.map((tour) => <TourCard key={tour.id} tour={tour} />)}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Рекомендации для вас</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {(topRated.length ? topRated : tours).slice(0, 2).map((tour) => <TourCard key={tour.id} tour={tour} />)}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Новые экскурсии</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {(newTours.length ? newTours : tours).slice(0, 3).map((tour) => <TourCard key={tour.id} tour={tour} />)}
        </div>
      </section>

      {recentlyViewed.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Вы недавно смотрели</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {recentlyViewed.map((tour) => <TourCard key={`recent-${tour.id}`} tour={tour} />)}
          </div>
        </section>
      )}
    </div>
  );
}
