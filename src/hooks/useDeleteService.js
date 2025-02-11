import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";

const deleteService = async (id) => {
  await axiosInstance.delete(`/services/${id}`);
};

const useDeleteService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteService,
    onSuccess: () => {
      queryClient.invalidateQueries(["services"]); 
    },
  });
};

export default useDeleteService;