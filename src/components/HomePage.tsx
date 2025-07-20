import React, { useEffect } from "react";
import {
  Star,
  ShoppingBag,
  Truck,
  Shield,
  Headphones,
  ArrowRight,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { useAppDispatch } from "../store";
import { addToCart } from "../store/slices/cartSlice";
import { setCurrentPage } from "../store/slices/uiSlice";
import { Product } from "../types";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store";
import ProductSearchResults from "./ProductSearchResults";

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: products } = useProducts();
  const navigate = useNavigate();
  const { searchQuery } = useAppSelector((state) => state.ui);

  useEffect(() => {
    if (products && Array.isArray(products)) {
      console.log("Available product categories:");
      console.log(products.map((p) => p.category));
    } else {
      console.log("Products not loaded yet or not an array.");
    }
  }, [products]);

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  const handleShopNow = () => {
    dispatch(setCurrentPage("products"));
    navigate("/products");
  };

  const handleShopElectronics = () => {
    dispatch(setCurrentPage("/category/electronics"));
    navigate("/category/electronics");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };
  const handleSignUpClick = () => {
    navigate("/signup");
  };

  const featuredProducts =
    products
      ?.slice()
      .sort((a, b) => b.rating.rate - a.rating.rate)
      .slice(0, 4) || [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-700 dark:to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to Shopify
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Your one-stop destination for quality products at unbeatable
              prices
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={handleShopNow}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
              >
                <span>Shop Now</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button
                onClick={handleLoginClick}
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center space-x-2"
              >
                <User className="h-5 w-5" />
                <span>Sign In</span>
              </button>
            </div>
            <div className="flex justify-center mt-6">
              <Link
                to="/signup"
                className="px-8 py-3 rounded-lg bg-transparent font-medium transition-colors
      hover:bg-white text-white bg-blue-600 border-2 border-white hover:text-blue-600"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {searchQuery && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Search Results
          </h2>
          <ProductSearchResults />
        </div>
      )}

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12">
            Why Choose Shopify?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Free Shipping
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Free shipping on all orders over $50. Fast and reliable
                delivery.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Secure Payment
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your payment information is always secure with our encrypted
                checkout.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                24/7 Support
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our customer support team is here to help you anytime, anywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Discover our top-rated products loved by customers
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="aspect-w-1 aspect-h-1 bg-gray-200 dark:bg-gray-700">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-contain p-4"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
                    {product.title}
                  </h3>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating.rate)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                      ({product.rating.count})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                      ${product.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-blue-600 dark:bg-blue-700 text-white px-3 py-2 rounded-md hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
                    >
                      <ShoppingBag className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button
              onClick={handleShopNow}
              className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors inline-flex items-center space-x-2"
            >
              <span>View All Products</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12">
            Special Offers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-r from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 text-white p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Flash Sale!</h3>
              <p className="text-red-100 mb-4">
                Up to 50% off on selected electronics. Limited time offer!
              </p>
              <button
                onClick={handleShopElectronics}
                className="bg-white text-red-600 px-6 py-2 rounded-md font-semibold hover:bg-gray-100 transition-colors"
              >
                Shop Electronics
              </button>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 text-white p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">New Customer Special</h3>
              <p className="text-green-100 mb-4">
                Get 20% off your first order with code WELCOME20
              </p>
              <button
                onClick={handleShopNow}
                className="bg-white text-green-600 px-6 py-2 rounded-md font-semibold hover:bg-gray-100 transition-colors"
              >
                Start Shopping
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Action Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-700 dark:to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of satisfied customers and discover amazing deals
            today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleSignUpClick}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
            >
              <User className="h-5 w-5" />
              <span>Create Account</span>
            </button>
            <button
              onClick={handleShopNow}
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center space-x-2"
            >
              <ShoppingBag className="h-5 w-5" />
              <span>Browse Products</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
