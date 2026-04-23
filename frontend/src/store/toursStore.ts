import { create } from "zustand";
import { Tour } from "../shared/types";

type ToursStore = {
  tours: Tour[];
  recentlyViewed: Tour[];
  filters: {
    city: string;
    category: string;
    minPrice: string;
    maxPrice: string;
    sort: string;
    page: number;
  };
  setTours: (tours: Tour[]) => void;
  setFilters: (payload: Partial<ToursStore["filters"]>) => void;
  upsertTourMeta: (tourId: number, rating: number, reviewsCount: number) => void;
  addRecentlyViewed: (tour: Tour) => void;
};

export const useToursStore = create<ToursStore>((set) => ({
  tours: [],
  recentlyViewed: [],
  filters: { city: "", category: "", minPrice: "", maxPrice: "", sort: "rating,desc", page: 0 },
  setTours: (tours) => set(() => ({ tours })),
  setFilters: (payload) => set((state) => ({ filters: { ...state.filters, ...payload } })),
  upsertTourMeta: (tourId, rating, reviewsCount) =>
    set((state) => ({
      tours: state.tours.map((tour) => (tour.id === tourId ? { ...tour, rating, reviewsCount } : tour)),
      recentlyViewed: state.recentlyViewed.map((tour) => (tour.id === tourId ? { ...tour, rating, reviewsCount } : tour))
    })),
  addRecentlyViewed: (tour) =>
    set((state) => ({
      recentlyViewed: [tour, ...state.recentlyViewed.filter((item) => item.id !== tour.id)].slice(0, 6)
    }))
}));
