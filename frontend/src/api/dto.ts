import { ImageAssetDto, Role, Tour } from "../shared/types";

export type TourDto = {
  id: number;
  title: string;
  description: string;
  city: string;
  country: string;
  category: string;
  price: number;
  rating?: number;
  reviewsCount?: number;
  durationHours: number;
  imageUrl?: string;
  gallery?: ImageAssetDto[];
  guideImageUrl?: string;
  lat?: number;
  lng?: number;
  guideName: string;
  includedServices?: string[];
  badges?: Array<"TOP_RATED" | "NEW">;
};

export type AuthUserDto = {
  id: number;
  email: string;
  fullName: string;
  role: Role;
  imageUrl?: string;
};

export type AuthResponseDto = {
  accessToken: string;
  refreshToken: string;
  user?: AuthUserDto;
};

export function mapTourDto(dto: TourDto): Tour {
  return {
    id: dto.id,
    title: dto.title,
    description: dto.description,
    city: dto.city,
    country: dto.country,
    category: dto.category,
    price: dto.price,
    rating: dto.rating ?? 0,
    reviewsCount: dto.reviewsCount ?? 0,
    durationHours: dto.durationHours,
    imageUrl: dto.imageUrl || "",
    gallery: dto.gallery ?? [],
    guideAvatar: { imageUrl: dto.guideImageUrl || "", alt: dto.guideName },
    lat: dto.lat ?? 0,
    lng: dto.lng ?? 0,
    guideName: dto.guideName,
    includedServices: dto.includedServices ?? [],
    badges: dto.badges ?? []
  };
}
