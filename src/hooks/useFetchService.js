import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";

const fetchServices = async () => {
  const { data } = await axiosInstance.get("/services");
  return data;
};

const useFetchServices = () => {
  return useQuery({
    queryKey: ["services"],
    queryFn: fetchServices,
  });
};

export default useFetchServices;