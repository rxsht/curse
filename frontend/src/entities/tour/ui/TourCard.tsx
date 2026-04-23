import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Tour } from "../../../shared/types";
import { Rating } from "../../../shared/ui/Rating";
import { Badge } from "../../../shared/ui/Badge";
import { AppImage } from "../../../shared/ui/AppImage";

export function TourCard({ tour }: { tour: Tour }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      <AppImage asset={{ imageUrl: tour.imageUrl, alt: tour.title }} alt={tour.title} className="h-48 w-full" sizes="(max-width: 768px) 100vw, 33vw" />
      <div className="space-y-3 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge>{tour.category}</Badge>
            {tour.badges.includes("TOP_RATED") && <Badge>Top rated</Badge>}
            {tour.badges.includes("NEW") && <Badge>New</Badge>}
          </div>
          <Rating value={tour.rating} />
        </div>
        <h3 className="line-clamp-2 font-semibold">{tour.title}</h3>
        <p className="line-clamp-2 text-sm text-slate-600">{tour.description}</p>
        <p className="text-sm text-slate-600">{tour.city}, {tour.country}</p>
        <div className="flex items-center justify-between">
          <p className="font-semibold">${tour.price} <span className="text-xs font-normal text-slate-500">/ чел.</span></p>
          <p className="text-xs text-slate-500">{tour.reviewsCount} отзывов</p>
          <Link to={`/tours/${tour.id}`} className="text-sm font-medium text-sky-700 hover:text-sky-800">Подробнее</Link>
        </div>
      </div>
    </motion.article>
  );
}
