import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const userData = localStorage.getItem("user");
  
  if (!userData) {
    // No user at all? Back to login
    return <Navigate to="/auth" replace />;
  }

  const user = JSON.parse(userData);

  // CRITICAL: Check if the role is exactly "admin"
  if (user.role !== "admin") {
    console.warn("Access denied: User is not an admin", user.role);
    return <Navigate to="/gallery" replace />; // This is why you end up at gallery!
  }

  return children;
};

export default ProtectedRoute;