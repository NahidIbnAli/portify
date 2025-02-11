import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";

const deleteTeamMember = async (id) => {
  await axiosInstance.delete(`/team/${id}`);
};

const useDeleteSTeamMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTeamMember,
    onSuccess: () => {
      queryClient.invalidateQueries(["team"]); 
    },
  });
};

export default useDeleteSTeamMember;