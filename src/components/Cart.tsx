import React from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../store';
import { toggleCart, removeFromCart, updateQuantity, clearCart } from '../store/slices/cartSlice';

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, isOpen, total } = useAppSelector(state => state.cart);
  
  const handleClose = () => {
    dispatch(toggleCart());
  };
  
  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
  };
  
  const handleUpdateQuantity = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };
  
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50 dark:bg-opacity-70" onClick={handleClose}></div>
      
      <div className="absolute right-0 top-0 h-full w-full max-w-sm sm:max-w-md bg-white dark:bg-gray-900 shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100">Shopping Cart</h2>
            <button
              onClick={handleClose}
              className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-500 dark:text-gray-400"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
          
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4">
            {items.length === 0 ? (
              <div className="text-center py-6 sm:py-8">
                <ShoppingBag className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 sm:space-x-4 bg-gray-50 dark:bg-gray-800 p-3 sm:p-4 rounded-lg">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="h-12 w-12 sm:h-16 sm:w-16 object-contain rounded flex-shrink-0"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-xs sm:text-sm line-clamp-2 text-gray-900 dark:text-gray-100">
                        {item.product.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
                        ${item.product.price.toFixed(2)}
                      </p>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-0.5 sm:p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-300"
                        >
                          <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                        </button>
                        <span className="mx-2 min-w-[1.5rem] sm:min-w-[2rem] text-center text-xs sm:text-sm text-gray-900 dark:text-gray-100">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-0.5 sm:p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-300"
                        >
                          <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 p-0.5 sm:p-1 flex-shrink-0"
                    >
                      <X className="h-3 w-3 sm:h-4 sm:w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 dark:border-gray-700 p-3 sm:p-4 space-y-3 sm:space-y-4">
              <div className="flex justify-between items-center text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100">
                <span>Total: ${total.toFixed(2)}</span>
              </div>
              <button
                onClick={handleClearCart}
                className="w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm sm:text-base"
              >
                Clear Cart
              </button>
              <button className="w-full bg-blue-600 dark:bg-blue-700 text-white py-2.5 sm:py-3 rounded-md hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors text-sm sm:text-base">
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;