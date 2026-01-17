import { trpc } from "@/lib/trpc";
import { useState } from "react";

// Synchronously read from localStorage on initialization (no useEffect delay)
const getStoredSession = () => {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem('employee_session');
    return stored ? JSON.parse(stored) : null;
  } catch {
    localStorage.removeItem('employee_session');
    return null;
  }
};

export function useEmployeeAuth() {
  // Initialize with localStorage data immediately (synchronous, no race condition)
  const [localEmployee, setLocalEmployee] = useState(getStoredSession);
  
  const { data: employee, isLoading, refetch } = trpc.employee.me.useQuery();
  
  // Use cookie-based auth if available, otherwise fall back to localStorage
  const currentEmployee = employee || localEmployee;
  
  const loginMutation = trpc.employee.login.useMutation();
  const logoutMutation = trpc.employee.logout.useMutation();

  const login = async (username: string, password: string) => {
    try {
      const result = await loginMutation.mutateAsync({ username, password });
      
      // Store employee data in localStorage immediately for iframe/cross-site contexts
      if (result.success && result.employee) {
        const sessionData = {
          id: result.employee.id,
          username: result.employee.username,
          name: result.employee.name,
          role: result.employee.role,
        };
        localStorage.setItem('employee_session', JSON.stringify(sessionData));
        setLocalEmployee(sessionData);
      }
      
      await refetch();
      return result;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    localStorage.removeItem('employee_session');
    setLocalEmployee(null);
    await logoutMutation.mutateAsync();
    await refetch();
  };

  return {
    employee: currentEmployee,
    isLoading: isLoading && !localEmployee,
    isAuthenticated: !!currentEmployee,
    isAdmin: currentEmployee?.role === 'admin',
    isHR: currentEmployee?.role === 'hr' || currentEmployee?.role === 'admin',
    login,
    logout,
  };
}
