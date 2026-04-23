import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import L from "leaflet";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewsService } from "../api/services/reviewsService";
import { toursService } from "../api/services/toursService";
import { TourGallery } from "../entities/tour/ui/TourGallery";
import { Review, Tour } from "../shared/types";
import { useAuth } from "../shared/model/useAuth";
import { Button } from "../shared/ui/Button";
import { Rating } from "../shared/ui/Rating";
import { Skeleton } from "../shared/ui/Skeleton";
import { AppImage } from "../shared/ui/AppImage";
import { Input } from "../shared/ui/Input";
import { RatingInput } from "../shared/ui/RatingInput";
import { useReviewsStore } from "../store/reviewsStore";
import { useToursStore } from "../store/toursStore";

const reviewSchema = z.object({
  rating: z.number().min(1),
  comment: z.string().min(5)
});

type ReviewForm = z.infer<typeof reviewSchema>;

export function TourDetailsPage() {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const setTourReviews = useReviewsStore((s) => s.setTourReviews);
  const addReviewOptimistic = useReviewsStore((s) => s.addReviewOptimistic);
  const submitted = useReviewsStore((s) => s.submitted);
  const markSubmitted = useReviewsStore((s) => s.markSubmitted);
  const reviewsFromStore = useReviewsStore((s) => (id ? s.byTour[Number(id)] : []));
  const upsertTourMeta = useToursStore((s) => s.upsertTourMeta);
  const addRecentlyViewed = useToursStore((s) => s.addRecentlyViewed);
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { handleSubmit, register, setValue, watch } = useForm<ReviewForm>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { rating: 5, comment: "" }
  });
  const currentRating = watch("rating");

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    Promise.all([toursService.getTour(Number(id)), reviewsService.getByTour(Number(id))])
      .then(([tourData, reviews]) => {
        setTour(tourData);
        addRecentlyViewed(tourData);
        setTourReviews(Number(id), reviews);
      })
      .finally(() => setLoading(false));
  }, [id, addRecentlyViewed, setTourReviews]);

  useEffect(() => {
    if (!tour || loading) return;
    const container = document.getElementById("tour-map");
    if (!container || container.dataset.initialized === "true") return;
    const map = L.map("tour-map").setView([tour.lat, tour.lng], 12);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap"
    }).addTo(map);
    L.marker([tour.lat, tour.lng]).addTo(map);
    container.dataset.initialized = "true";
    return () => {
      map.remove();
    };
  }, [tour, loading]);

  const reviews = reviewsFromStore ?? [];
  const average = useMemo(() => {
    if (!reviews.length) return tour?.rating ?? 0;
    return reviews.reduce((acc, item) => acc + item.rating, 0) / reviews.length;
  }, [reviews, tour?.rating]);

  const userAlreadyReviewed = id ? submitted[Number(id)] : false;

  const onAddReview = handleSubmit(async (values) => {
    if (!tour || !id) return;
    if (!isAuthenticated) {
      toast.error("Сначала войдите, чтобы оставить отзыв");
      return;
    }
    if (userAlreadyReviewed) {
      toast.error("Вы уже оставляли отзыв для этого тура");
      return;
    }

    setSubmitting(true);
    const optimistic: Review = {
      id: Date.now(),
      tourId: tour.id,
      userId: user?.id ?? 0,
      author: user?.fullName ?? "Вы",
      rating: values.rating,
      comment: values.comment,
      createdAt: new Date().toISOString()
    };

    addReviewOptimistic(tour.id, optimistic);
    markSubmitted(tour.id);
    const nextAverage = ((average * reviews.length) + values.rating) / (reviews.length + 1);
    upsertTourMeta(tour.id, Number(nextAverage.toFixed(1)), reviews.length + 1);
    setTour((prev) => (prev ? { ...prev, rating: Number(nextAverage.toFixed(1)), reviewsCount: reviews.length + 1 } : prev));

    const created = await reviewsService.createReview({ tourId: tour.id, rating: values.rating, comment: values.comment });
    if (!created) {
      toast.success("Отзыв сохранен локально (mock mode)");
    } else {
      toast.success("Отзыв опубликован");
    }
    setSubmitting(false);
  });

  if (loading || !tour) return <Skeleton className="h-[500px]" />;

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
      <Helmet><title>{tour.title} - GuideMate</title></Helmet>
      <section className="space-y-5">
        <TourGallery images={[{ imageUrl: tour.imageUrl, alt: tour.title }, ...tour.gallery]} title={tour.title} />
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 rounded-2xl border bg-white p-5 shadow-sm">
          <h1 className="text-3xl font-semibold">{tour.title}</h1>
          <div className="flex items-center gap-3">
            <Rating value={average} />
            <span className="text-sm text-slate-500">({reviews.length || tour.reviewsCount} отзывов)</span>
          </div>
          <div className="flex items-center gap-3">
            <AppImage asset={tour.guideAvatar} alt={tour.guideName} className="h-10 w-10 rounded-full" sizes="40px" />
            <span className="text-sm text-slate-600">Гид: {tour.guideName}</span><span className="text-xs text-slate-500">· {tour.city}, {tour.country}</span>
          </div>
          <p className="text-slate-700">{tour.description}</p>
          <div>
            <h3 className="mb-2 text-sm font-semibold uppercase text-slate-500">Что включено</h3>
            <ul className="grid gap-1 text-sm text-slate-700 md:grid-cols-2">
              {tour.includedServices.map((item) => <li key={item}>• {item}</li>)}
            </ul>
          </div>
          <Button onClick={() => toast.success("Тур добавлен в бронирование (demo)")}>Забронировать за ${tour.price}</Button>
        </motion.div>

        <section className="space-y-3 rounded-2xl border bg-white p-5">
          <h3 className="text-lg font-semibold">Отзывы пользователей</h3>
          {reviews.length === 0 && <p className="text-sm text-slate-500">Пока нет отзывов. Будьте первым!</p>}
          <div className="space-y-2">
            {reviews.map((review) => (
              <motion.div key={review.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl bg-slate-50 p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{review.author}</p>
                  <span className="text-xs text-slate-500">{new Date(review.createdAt).toLocaleDateString()}</span>
                </div>
                <Rating value={review.rating} />
                <p className="text-sm text-slate-600">{review.comment}</p>
              </motion.div>
            ))}
          </div>
          <form className="space-y-3 rounded-xl border bg-white p-4" onSubmit={onAddReview}>
            <p className="text-sm font-medium">Оставить отзыв</p>
            <RatingInput value={currentRating} onChange={(value) => setValue("rating", value)} />
            <Input placeholder="Ваш комментарий" {...register("comment")} />
            <Button type="submit" disabled={submitting || userAlreadyReviewed}>{userAlreadyReviewed ? "Отзыв уже оставлен" : (submitting ? "Отправка..." : "Отправить отзыв")}</Button>
          </form>
        </section>
      </section>
      <aside className="space-y-5">
        <div className="overflow-hidden rounded-2xl border">
          <div id="tour-map" className="h-64 w-full" aria-label="Карта тура" />
        </div>
        <div className="space-y-3 rounded-2xl border bg-white p-4">
          <h3 className="font-semibold">О туре</h3>
          <p className="text-sm text-slate-600">Длительность: {tour.durationHours} ч</p>
          <p className="text-sm text-slate-600">Категория: {tour.category}</p>
          <p className="text-sm text-slate-600">Локация: {tour.city}, {tour.country}</p>
          <p className="text-sm text-slate-600">Средний рейтинг: {average.toFixed(1)}</p>
        </div>
      </aside>
    </div>
  );
}
