import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-background text-center">
      <div className="max-w-lg p-8 bg-gray-800 text-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-red-600">
          404 - Page Not Found
        </h1>
        <p className="mt-4 text-lg text-gray-300">
          Oops! The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Go to Home Page
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
