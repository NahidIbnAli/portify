import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";

const addBlog = async (blogData) => {
  const { data } = await axiosInstance.post("/blogs", blogData);
  return data;
     
};

const useAddBlog = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (blogData) =>
      toast.promise(addBlog(blogData), {
        pending: "Adding blog... ⏳",
        success: "Blog added successfully! 🎉",
        error:  {
          render({ data }) {
            return data?.response?.data?.error || "Failed to add blog ❌";
          },
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
      navigate("/dashboard/blogs");
    },
  });
  return mutation;
};
export default useAddBlog;