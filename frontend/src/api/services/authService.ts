import { http } from "../http";
import { AuthResponseDto } from "../dto";

export type AuthResponse = AuthResponseDto;

export const authService = {
  async login(email: string, password: string) {
    const { data } = await http.post<AuthResponse>("/auth/login", { email, password });
    return data;
  },
  async register(email: string, password: string, fullName: string) {
    await http.post("/auth/register", { email, password, fullName });
  },
  async exchangeGoogleCode(code: string) {
    const { data } = await http.post<AuthResponse>("/auth/oauth2/google", { code });
    return data;
  },
  async oauthMock() {
    const { data } = await http.post<AuthResponse>("/auth/oauth/mock", {
      email: `google.mock.${Date.now()}@guidemate.dev`,
      fullName: "Google Mock User"
    });
    return data;
  }
};
