import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { authService } from "../api/services/authService";
import { useAuth } from "../shared/model/useAuth";
import { User } from "../shared/types";
import { Button } from "../shared/ui/Button";
import { Input } from "../shared/ui/Input";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  fullName: z.string().min(2)
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

export function AuthPage() {
  const loginForm = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });
  const registerForm = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) });
  const { setTokens } = useAuth();

  const applyAuth = (data: Awaited<ReturnType<typeof authService.login>>) => {
    const user: User | null = data.user
      ? {
          id: data.user.id,
          email: data.user.email,
          fullName: data.user.fullName,
          role: data.user.role,
          avatar: { imageUrl: data.user.imageUrl || "", alt: data.user.fullName }
        }
      : null;
    setTokens(data.accessToken, data.refreshToken, user);
  };

  const login = loginForm.handleSubmit(async (values) => {
    try {
      const data = await authService.login(values.email, values.password);
      applyAuth(data);
      toast.success("Вы вошли в систему");
    } catch {
      toast.error("Не удалось войти");
    }
  });

  const registerUser = registerForm.handleSubmit(async (values) => {
    try {
      await authService.register(values.email, values.password, values.fullName);
      toast.success("Регистрация успешна");
    } catch {
      toast.error("Ошибка регистрации");
    }
  });

  const googleOauthEnabled = import.meta.env.VITE_GOOGLE_OAUTH_ENABLED === "true";

  const oauthLogin = async () => {
    try {
      if (googleOauthEnabled) {
        window.location.href = `${import.meta.env.VITE_API_URL?.replace("/api/v1", "") ?? "http://localhost:8080"}/oauth2/authorization/google`;
        return;
      }
      const data = await authService.oauthMock();
      applyAuth(data);
      toast.success("Вход через OAuth (mock) выполнен");
    } catch {
      toast.error("OAuth вход не выполнен");
    }
  };

  return (
    <div className="grid max-w-md gap-3">
      <h1 className="text-2xl font-semibold">Вход / регистрация</h1>

      <form className="grid gap-2 rounded-xl border p-3" onSubmit={login}>
        <p className="text-sm font-medium">Вход</p>
        <Input {...loginForm.register("email")} placeholder="Email" />
        <Input {...loginForm.register("password")} placeholder="Password" type="password" />
        <Button type="submit">Войти</Button>
      </form>

      <form className="grid gap-2 rounded-xl border p-3" onSubmit={registerUser}>
        <p className="text-sm font-medium">Регистрация</p>
        <Input {...registerForm.register("email")} placeholder="Email" />
        <Input {...registerForm.register("password")} placeholder="Password" type="password" />
        <Input {...registerForm.register("fullName")} placeholder="Full name" />
        <Button type="submit" variant="secondary">Зарегистрироваться</Button>
      </form>

      <Button variant="ghost" onClick={oauthLogin}>
        Continue with Google {googleOauthEnabled ? "" : "(mock local)"}
      </Button>
    </div>
  );
}
