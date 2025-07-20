import { useQuery } from '@tanstack/react-query';
import { productApi } from '../services/api';

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: productApi.getAllProducts,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000, 
  });
};

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductById(id),
    enabled: !!id,
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: productApi.getCategories,
    staleTime: 30 * 60 * 1000,
  });
};