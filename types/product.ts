export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  brand: string;
  image_url?: string;
  stock_quantity: number;
  is_active: boolean;
  created_at: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface Cart {
  id: string;
  items: CartItem[];
  total: string;
  updated_at: string;
}

