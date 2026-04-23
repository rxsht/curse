import { http } from "../http";
import { mockReviews } from "../../shared/mocks/data";
import { Review } from "../../shared/types";

function normalizeReview(input: Partial<Review>, fallbackTourId: number): Review {
  return {
    id: input.id ?? Date.now(),
    tourId: input.tourId ?? fallbackTourId,
    userId: input.userId ?? 0,
    author: input.author ?? "User",
    rating: input.rating ?? 5,
    comment: input.comment ?? "",
    createdAt: input.createdAt ?? new Date().toISOString()
  };
}

export const reviewsService = {
  async getByTour(tourId: number) {
    try {
      const { data } = await http.get<Array<Partial<Review>>>(`/reviews/tour/${tourId}`, { headers: { "x-silent-error": "1" } });
      return data.map((item) => normalizeReview(item, tourId));
    } catch {
      return mockReviews.filter((r) => r.tourId === tourId);
    }
  },
  async createReview(payload: { tourId: number; bookingId?: number; rating: number; comment: string }) {
    try {
      const { data } = await http.post<Review>("/reviews", payload, { headers: { "x-silent-error": "1" } });
      return data;
    } catch {
      return null;
    }
  }
};
