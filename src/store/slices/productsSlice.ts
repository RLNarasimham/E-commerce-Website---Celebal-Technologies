import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { createSelector } from "@reduxjs/toolkit";

// Keywords that map to the "men's clothing" category
const MEN_KEYWORDS = ["men", "male", "tshirt", "shirt", "jeans", "jacket"];

// Define the product type
export interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  price: number;
  // Add other fields as needed
}

interface ProductsState {
  all: Product[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: ProductsState = {
  all: [],
  loading: false,
  error: null,
};

// Async thunk to fetch products from your API
export const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetchAll",
  async () => {
    const res = await fetch("https://fakestoreapi.com/products"); // Replace with your own API
    if (!res.ok) throw new Error("Failed to fetch products");
    return await res.json();
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.all = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

// Selector to get filtered products by search query
export const selectFilteredProducts = createSelector(
  [
    (state: RootState) => state.products.all,
    (state: RootState) => state.ui.searchQuery,
  ],
  (products, query) => {
    const q = query.trim().toLowerCase();

    if (!q) return products;

    return products.filter((product) => {
      const title = product.title?.toLowerCase() || "";
      const category = product.category?.toLowerCase() || "";

      const nameMatch = title.includes(q);
      const exactCategoryMatch = category.includes(q);

      // Strict manual category mapping
      const menAliasMatch =
        MEN_KEYWORDS.some((keyword) => q.includes(keyword)) &&
        category === "men's clothing";

      return nameMatch || exactCategoryMatch || menAliasMatch;
    });
  }
);

export default productsSlice.reducer;
