import { AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 p-4">
      <div className="bg-error/10 rounded-full p-8 mb-6">
        <AlertCircle className="size-16 text-error" />
      </div>
      <h1 className="text-4xl font-bold mb-2">404 - Page Not Found</h1>
      <p className="text-base-content/70 mb-4 text-center max-w-md">
        Oops! The page you are looking for does not exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
