export interface OrderDetail {
  isPaid: boolean;
  status: string;
  id: number;
  userId: number;
  totalPrice: number;
  address: string;
  contact: string;
  paymentMethod: string;
  updatedAt: string;
  createdAt: string;
  paidAt: string;
}

export interface Orders {
  total: number;
  result: OrderDetail[];
  totalPages: number;
  currentPage: number;
}

export interface ItemOrderDetail {
  id: number;
  quantity: number;
  price: number;
  total: number;
  itemInfo: {
    name: string;
    brand: string;
    category: string;
    images: string[];
  };
}

export interface Image {
  url: string;
}

export interface itemInOrder {
  productId: number;
  quantity: number;
  price: number;
  total: number;
  itemInfor?: {
    name: string;
    brand: string;
    category: string;
    images?: { url: string; type?: string }[];
    imgUrl?: string;
    countInStock?: number;
  };
}

export interface OrderCheckout {
  userId: number | string;
  totalPrice: number;
  address: string;
  contact: string;
  paymentMethod: string;
}

export interface OrderCreate {
  order: OrderCheckout;
  itemArr: itemInOrder[];
}

export interface OrderUpdate {
  address?: string;
  contact?: string;
  paymentMethod?: string;
  isPaid?: boolean;
  paidAt?: string;
  status?: string;
}

export interface MyOrders {
  total: number;
  result: OrderDetail[];
  totalPages: number;
  currentPage: number;
}
