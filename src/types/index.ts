export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  total: number;
}

export interface AppState {
  cart: CartState;
  products: {
    items: Product[];
    loading: boolean;
    error: string | null;
  };
  ui: {
    viewMode: 'grid' | 'list';
    searchQuery: string;
    selectedCategory: string;
  };
}

export interface SearchFilters {
  query: string;
  category: string;
  minPrice: number;
  maxPrice: number;
}