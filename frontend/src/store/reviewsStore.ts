import { create } from "zustand";
import { Review } from "../shared/types";

type ReviewsStore = {
  byTour: Record<number, Review[]>;
  submitted: Record<number, boolean>;
  setTourReviews: (tourId: number, reviews: Review[]) => void;
  addReviewOptimistic: (tourId: number, review: Review) => void;
  markSubmitted: (tourId: number) => void;
};

export const useReviewsStore = create<ReviewsStore>((set) => ({
  byTour: {},
  submitted: (() => {
    const raw = localStorage.getItem("submitted-reviews");
    return raw ? (JSON.parse(raw) as Record<number, boolean>) : {};
  })(),
  setTourReviews: (tourId, reviews) => set((state) => ({ byTour: { ...state.byTour, [tourId]: reviews } })),
  addReviewOptimistic: (tourId, review) =>
    set((state) => ({
      byTour: { ...state.byTour, [tourId]: [review, ...(state.byTour[tourId] ?? [])] }
    })),
  markSubmitted: (tourId) =>
    set((state) => {
      const next = { ...state.submitted, [tourId]: true };
      localStorage.setItem("submitted-reviews", JSON.stringify(next));
      return { submitted: next };
    })
}));
