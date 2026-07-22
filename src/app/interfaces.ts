export interface Product {
  name: string;
  price?: number;
  size?: string;
  img: string;
  quantity?: number;
  subtotal?: number;
  isFavorite?: boolean;
  category?: string;
  isChip?: boolean;
}
