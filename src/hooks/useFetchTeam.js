import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";

const fetchTeam = async () => {
  const { data } = await axiosInstance.get("/team");
  return data;
};

const useFetchTeam = () => {
  return useQuery({
    queryKey: ["team"],
    queryFn: fetchTeam,
  });
};

export default useFetchTeam;