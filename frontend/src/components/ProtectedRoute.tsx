import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoute = ({ allowedRoles }: { allowedRoles?: string[] }) => {
  const { user, loading } = useAuth();
  console.log("User in ProtectedRoute:", user); // Log the user here

  const location = useLocation();

  // While authentication state is being checked, show a loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-indigo-600 border-b-indigo-600 border-l-gray-200 border-r-gray-200 rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">Loading authentication status...</p>
        </div>
      </div>
    );
  }

  // If the user is not authenticated, redirect to login and remember where they were trying to go
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If roles are specified and the user's role is not in the allowed list
  if (allowedRoles && (!user.role || !allowedRoles.includes(user.role))) {
    console.log("Unauthorized access attempt:", {
      userRole: user.role,
      allowedRoles,
      path: location.pathname
    });
    return <Navigate to="/unauthorized" replace />;
  }

  // If we reach this point, the user is authenticated and authorized
  return <Outlet />;
};

export default ProtectedRoute;