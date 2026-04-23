import { http } from "../http";
import { mapTourDto, TourDto } from "../dto";
import { mockTours } from "../../shared/mocks/data";
import { Tour } from "../../shared/types";

export type TourFilters = {
  city?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  page?: number;
  size?: number;
};

export const toursService = {
  async getTours(filters: TourFilters) {
    try {
      const { data } = await http.get("/tours", { params: filters, headers: { "x-silent-error": "1" } });
      return ((data.content ?? data) as TourDto[]).map(mapTourDto);
    } catch {
      let result = mockTours.filter((t) => (!filters.city ? true : t.city.toLowerCase().includes(filters.city.toLowerCase())));
      if (filters.category) result = result.filter((t) => t.category === filters.category);
      if (filters.minPrice != null) result = result.filter((t) => t.price >= filters.minPrice!);
      if (filters.maxPrice != null) result = result.filter((t) => t.price <= filters.maxPrice!);
      if (filters.sort === "price,asc") result = [...result].sort((a, b) => a.price - b.price);
      if (filters.sort === "price,desc") result = [...result].sort((a, b) => b.price - a.price);
      if (filters.sort === "rating,desc") result = [...result].sort((a, b) => b.rating - a.rating);
      return result;
    }
  },
  async getTour(id: number) {
    try {
      const { data } = await http.get(`/tours/${id}`, { headers: { "x-silent-error": "1" } });
      return mapTourDto(data as TourDto);
    } catch {
      return mockTours.find((t) => t.id === id) ?? mockTours[0];
    }
  }
};
