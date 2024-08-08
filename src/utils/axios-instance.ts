import { useToast } from "@/components/ui/use-toast";
import { useStore } from "@/stores/root-store";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: baseUrl,
});

api.interceptors.request.use(
  (req) => {
    const { authStore } = useStore();

    if (authStore.isAuth) {
      req.headers.Authorization = `Bearer ${authStore.token}`;
    }

    return req;
  },
  (error) => {
    Promise.reject(error);
  },
);

api.interceptors.response.use(
  (res) => res,
  () => {
    const { toast } = useToast();

    toast({
      title: "Uh oh! Something went wrong.",
      description: "There was a problem with your request.",
      variant: "destructive",
    });
  },
);

export default api;
