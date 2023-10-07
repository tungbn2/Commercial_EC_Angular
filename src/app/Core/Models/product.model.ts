export interface ItemDetail {
  id: number;
  name: string;
  brand: string;
  category: string;
  description: string;
  price: number;
  rating: number;
  numOfReviews: number;
  countInStock: number;
  createdAt: string;
  updatedAt: string;
  images?: ItemImage[];
  imageUrls?: string[];
}

export interface Products {
  total: number;
  result: ItemDetail[];
  totalPages: number;
  currentPage: number;
}

export interface ItemImage {
  id: number;
  url: string;
  type: string;
}

export interface Reviews {
  total: number;
  result: ReviewDetail[];
  totalPages: number;
  currentPage: number;
}

export interface ReviewDetail {
  content: string;
  createdAt: string;
  rating: number;
  userReview: { username: string; avatar: string | null };
}

export interface ReviewUpload {
  content: string;
  rating: number;
  userId: number | string;
  productId: number;
}

export interface ProductCreate {
  name: string;
  brand: string;
  category: string;
  description: string;
  price: number;
  rating: number;
  countInStock: number;
  imageUrls: string[];
}

export interface ProductUpdate {
  name?: string;
  brand?: string;
  category?: string;
  description?: string;
  price?: number;
  rating?: number;
  countInStock?: number;
}

export interface CommentCreate {
  content: string;
  rating: number;
  userId: number;
  productId: number;
}
export interface ColumnField {
  name: string;
  value: string;
  custom?: boolean;
}
