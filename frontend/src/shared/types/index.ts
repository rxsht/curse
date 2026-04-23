export type Role = "USER" | "GUIDE" | "ADMIN";

export type ImageAssetDto = {
  imageUrl: string;
  alt?: string;
  blurDataUrl?: string;
};

export type User = {
  id: number;
  fullName: string;
  email: string;
  role: Role;
  avatar: ImageAssetDto;
};

export type Tour = {
  id: number;
  title: string;
  description: string;
  city: string;
  country: string;
  category: string;
  price: number;
  rating: number;
  reviewsCount: number;
  durationHours: number;
  imageUrl: string;
  gallery: ImageAssetDto[];
  guideAvatar: ImageAssetDto;
  lat: number;
  lng: number;
  guideName: string;
  includedServices: string[];
  badges: Array<"TOP_RATED" | "NEW">;
};

export type Booking = {
  id: number;
  tourId: number;
  tourTitle: string;
  participants: number;
  status: "CREATED" | "CONFIRMED" | "CANCELLED";
  tourDate: string;
};

export type Review = {
  id: number;
  tourId: number;
  userId: number;
  author: string;
  rating: number;
  comment: string;
  createdAt: string;
};
