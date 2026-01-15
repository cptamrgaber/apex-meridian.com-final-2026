import { useEffect } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "employee" | "hr";
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const [, setLocation] = useLocation();
  const { data: employee, isLoading } = trpc.employee.me.useQuery();

  useEffect(() => {
    if (!isLoading && !employee) {
      setLocation("/login");
      return;
    }

    if (!isLoading && requiredRole && employee?.role !== requiredRole) {
      setLocation("/login");
      return;
    }
  }, [employee, isLoading, requiredRole, setLocation]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!employee) {
    return null;
  }

  return <>{children}</>;
}
