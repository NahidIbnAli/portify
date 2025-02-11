import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";

const deleteBlog = async (id) => {
  await axiosInstance.delete(`/blogs/${id}`);
};

const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
    },
  });
};

export default useDeleteBlog;