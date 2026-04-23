import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { authService } from "../api/services/authService";
import { useAuth } from "../shared/model/useAuth";
import { Role, User } from "../shared/types";

function mapUser(raw?: { id: number; email: string; fullName: string; role: Role; imageUrl?: string }): User | null {
  if (!raw) return null;
  return {
    id: raw.id,
    email: raw.email,
    fullName: raw.fullName,
    role: raw.role,
    avatar: { imageUrl: raw.imageUrl || "", alt: raw.fullName }
  };
}

export function AuthCallbackPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { setTokens } = useAuth();

  useEffect(() => {
    const oauthError = params.get("error");
    const oauthErrorDescription = params.get("error_description");
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");
    const code = params.get("code");

    const process = async () => {
      try {
        if (oauthError) {
          throw new Error(oauthErrorDescription || oauthError);
        }
        if (accessToken && refreshToken) {
          setTokens(accessToken, refreshToken);
          toast.success("Google login successful");
          navigate("/");
          return;
        }
        if (code) {
          const response = await authService.exchangeGoogleCode(code);
          setTokens(response.accessToken, response.refreshToken, mapUser(response.user));
          toast.success("Google login successful");
          navigate("/");
          return;
        }
        throw new Error("OAuth callback missing tokens");
      } catch (error) {
        const message = error instanceof Error ? error.message : "Google OAuth error";
        toast.error(message);
        navigate("/auth");
      }
    };

    void process();
  }, [navigate, params, setTokens]);

  return <div className="grid min-h-[40vh] place-items-center text-slate-600">Обрабатываем вход через Google...</div>;
}
