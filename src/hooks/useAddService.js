import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";

const addService = async (serviceData) => {
  const { data } = await axiosInstance.post("/services", serviceData);
  return data;
     
};

const useAddService = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (serviceData) =>
      toast.promise(addService(serviceData), {
        pending: "Adding service... ⏳",
        success: "Service added successfully! 🎉",
        error:  {
          render({ data }) {
            return data?.response?.data?.error || "Failed to add service ❌";
          },
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["services"]);
      navigate("/dashboard/services");
    },
  });
  return mutation;
};
export default useAddService;