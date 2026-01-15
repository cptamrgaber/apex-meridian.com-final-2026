import { trpc } from "@/lib/trpc";

export function useEmployeeAuth() {
  const { data: employee, isLoading, refetch } = trpc.employee.me.useQuery();
  const loginMutation = trpc.employee.login.useMutation();
  const logoutMutation = trpc.employee.logout.useMutation();

  const login = async (username: string, password: string) => {
    try {
      const result = await loginMutation.mutateAsync({ username, password });
      await refetch();
      return result;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    await logoutMutation.mutateAsync();
    await refetch();
  };

  return {
    employee,
    isLoading,
    isAuthenticated: !!employee,
    isAdmin: employee?.role === 'admin',
    isHR: employee?.role === 'hr' || employee?.role === 'admin',
    login,
    logout,
  };
}
