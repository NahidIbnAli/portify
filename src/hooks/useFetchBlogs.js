import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";

const fetchBlogs = async () => {
  const { data } = await axiosInstance.get("/blogs");
  return data;
};

const useFetchBlogs = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });
};

export default useFetchBlogs;