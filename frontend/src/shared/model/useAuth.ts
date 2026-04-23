import { useAuthStore } from "../../store/authStore";

export function useAuth() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const refreshToken = useAuthStore((s) => s.refreshToken);
  const setTokens = useAuthStore((s) => s.setTokens);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  return {
    accessToken,
    refreshToken,
    setTokens,
    user,
    logout,
    isAuthenticated: Boolean(accessToken),
    role: user?.role
  };
}
