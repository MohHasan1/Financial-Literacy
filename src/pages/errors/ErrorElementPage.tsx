import { Link, useRouteError } from "react-router-dom";

const ErrorElementPage = () => {
  const error = useRouteError() as Error; // Type-cast to Error type

  return (
    <div className="flex justify-center items-center min-h-screen bg-background text-center">
      <div className="max-w-lg p-8 bg-gray-800 text-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-red-600">
          Something Went Wrong!
        </h1>
        <p className="mt-4 text-lg text-gray-300">
          {error?.message || "Oops! Something went wrong while trying to load this page."}
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

export default ErrorElementPage;
