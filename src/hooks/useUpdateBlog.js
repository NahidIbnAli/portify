import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";

const updateBlog = async ({ id, updatedData }) => {
  const { data } = await axiosInstance.put(`/blogs/${id}`, updatedData);
  return data;
};

const useUpdateBlog = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

   const mutation = useMutation({
    mutationFn: (updatedData) => toast.promise(updateBlog(updatedData), {
      pending: "Updating blog ... ⏳",
      success: "Blog updated successfully!",
      error:  {
        render({ data }) {
          return data?.response?.data?.error || "Failed to update blog ❌";
        },
      },
    }),

    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
      navigate("/dashboard/blogs");
    },
  });
  return mutation
};

export default useUpdateBlog;