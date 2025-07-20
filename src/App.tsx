import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./store";
import Header from "./components/Header";
import { ThemeProvider } from "./context/themeContext";
import ContactUs from "./components/ContactUs";
import HomePage from "./components/HomePage";
import ProductList from "./components/ProductList";
import ProductFilter from "./components/ProductFilter";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTheme } from "./hooks/useTheme";
import AboutUs from "./components/AboutUs";
import FAQs from "./components/FAQs";
import { fetchProducts } from "./store/slices/productsSlice";
import { useAppDispatch } from "./store";
import Orders from "./components/ReturnsOrders";
import SignUp from "./components/SignUp";
import Login from "./components/LoginPage";

const queryClient = new QueryClient();

function AppContent() {
  useTheme(); 

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen justify-between bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Header />
      <Cart />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/products"
            element={
              <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                  <aside className="w-full lg:w-64 flex-shrink-0">
                    <ProductFilter />
                  </aside>
                  <div className="flex-1">
                    <ProductList />
                  </div>
                </div>
              </main>
            }
          />

          <Route
            path="/category/:categoryName"
            element={
              <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                  <aside className="w-full lg:w-64 flex-shrink-0">
                    <ProductFilter />
                  </aside>
                  <div className="flex-1">
                    <ProductList />
                  </div>
                </div>
              </main>
            }
          />

          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/faq" element={<FAQs />} />
          <Route
            path="/orders"
            element={
              <main className="max-w-3xl mx-auto px-4 py-8 w-full">
                <Orders />
              </main>
            }
          />

          <Route
            path="/login"
            element={
              <main className="w-full">
                <Login />
              </main>
            }
          />

          <Route
            path="/signup"
            element={
              <main className="w-full">
                <SignUp />
              </main>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Router>
            <AppContent />
          </Router>
        </Provider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
