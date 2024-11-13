import { LoginRequest } from "@/models/auth-models";
import { login } from "@/services/auth-service";
import { useAuthStore } from "@/stores/auth-store";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  const setTokens = useAuthStore((state) => state.setTokens);

  return useMutation({
    mutationFn: (data: LoginRequest) => login(data),
    onSuccess: (response) => {
      setTokens(response.token, response.refreshToken);
    },
  });
};