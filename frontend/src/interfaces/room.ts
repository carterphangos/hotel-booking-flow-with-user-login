export interface Room {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
}

export interface RoomSearchParams {
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  sortBy?: "lowest-price" | "highest-price" | "rating";
}

export interface PaginatedRooms {
  current_page: number;
  data: Room[];
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
  total: number;
  per_page: number;
}
