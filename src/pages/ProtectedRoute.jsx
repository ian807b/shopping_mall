import { useAuthContext } from "../context/AuthContext.jsx";
import { Navigate } from "react-router";

function ProtectedRoute({ children, requireAdmin }) {
  const { user } = useAuthContext();

  if (!user || (requireAdmin && !user.isAdmin)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
