import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";

const updateService = async ({ id, updatedData }) => {
  const { data } = await axiosInstance.put(`/services/${id}`, updatedData);
  return data;
};

const useUpdateService = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

   const mutation = useMutation({
    mutationFn: (updatedData) => toast.promise(updateService(updatedData), {
      pending: "Updating service ... ⏳",
      success: "Service updated successfully!",
      error:  {
        render({ data }) {
          return data?.response?.data?.error || "Failed to update service ❌";
        },
      },
    }),

    onSuccess: () => {
      queryClient.invalidateQueries(["services"]);
      navigate("/dashboard/services");
    },
  });
  return mutation
};

export default useUpdateService;