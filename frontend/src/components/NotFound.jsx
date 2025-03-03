import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h2 className="text-3xl font-bold text-red-500">404 - Page Not Found</h2>
      <p className="text-gray-600 mt-2">Oops! The page you’re looking for doesn’t exist.</p>
      <Link to="/" className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
