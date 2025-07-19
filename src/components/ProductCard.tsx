import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { useAppDispatch } from '../store';
import { addToCart } from '../store/slices/cartSlice';

interface ProductCardProps {
  product: Product;
  viewMode: 'grid' | 'list';
}

const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode }) => {
  const dispatch = useAppDispatch();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(addToCart(product));
  };
  
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };
  
  if (viewMode === 'list') {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-4">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-shrink-0">
            <img
              src={product.image}
              alt={product.title}
              className="h-32 w-32 sm:h-24 sm:w-24 object-contain rounded-md mx-auto sm:mx-0"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 sm:truncate">
              {product.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-3 sm:line-clamp-2">
              {product.description}
            </p>
            <div className="flex items-center mt-2">
              <div className="flex items-center space-x-1">
                {renderStars(product.rating.rate)}
              </div>
              <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 ml-2">
                ({product.rating.count} reviews)
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 space-y-2 sm:space-y-0">
              <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
                ${product.price.toFixed(2)}
              </span>
              <button
                onClick={handleAddToCart}
                className="bg-blue-600 dark:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-md hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors duration-200 flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
      <div className="aspect-w-1 aspect-h-1 bg-gray-200 dark:bg-gray-700 group-hover:opacity-75 transition-opacity">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-40 sm:h-48 object-contain p-3 sm:p-4"
        />
      </div>
      <div className="p-3 sm:p-4">
        <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
          {product.title}
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2 sm:line-clamp-3">
          {product.description}
        </p>
        <div className="flex items-center mb-3">
          <div className="flex items-center space-x-1">
            {renderStars(product.rating.rate)}
          </div>
          <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 ml-2">
            ({product.rating.count})
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 dark:bg-blue-700 text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-md hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors duration-200 flex items-center space-x-1 text-xs sm:text-sm"
          >
            <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;