import { getAllUsers, getUserById } from "@/services/user-service";
import { useQuery } from "@tanstack/react-query";

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(),
  });
};

export const useUserById = (id: string) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id),
  });
};
