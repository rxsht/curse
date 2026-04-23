import { http } from "../http";
import { mockBookings } from "../../shared/mocks/data";
import { Booking } from "../../shared/types";

export const bookingsService = {
  async getMyBookings() {
    try {
      const { data } = await http.get<Booking[]>("/bookings/history", { headers: { "x-silent-error": "1" } });
      return data;
    } catch {
      return mockBookings;
    }
  }
};
