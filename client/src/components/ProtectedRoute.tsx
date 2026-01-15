import { useEffect } from "react";
import { useLocation } from "wouter";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "employee" | "hr";
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const authToken = localStorage.getItem("auth_token");
    const userRole = localStorage.getItem("user_role");

    if (!authToken) {
      setLocation("/login");
      return;
    }

    if (requiredRole && userRole !== requiredRole) {
      setLocation("/login");
      return;
    }
  }, [requiredRole, setLocation]);

  const authToken = localStorage.getItem("auth_token");
  if (!authToken) {
    return null;
  }

  return <>{children}</>;
}
