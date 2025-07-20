import React from "react";
import { Link } from "react-router-dom";

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg transition-all duration-300">
        <h2 className="text-center text-3xl font-bold text-gray-800 dark:text-white">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
          Please login to your account
        </p>
        <form className="space-y-5">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Click Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
