import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";

const updateTeamMember = async ({ id, updatedData }) => {
  const { data } = await axiosInstance.put(`/team/${id}`, updatedData);
  return data;
};

const useUpdateTeamMember = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

   const mutation = useMutation({
    mutationFn: (updatedData) => toast.promise(updateTeamMember(updatedData), {
      pending: "Updating Team Member ... ⏳",
      success: "Team member updated successfully!",
      error:  {
        render({ data }) {
          return data?.response?.data?.error || "Failed to update team member ❌";
        },
      },
    }),

    onSuccess: () => {
      queryClient.invalidateQueries(["team"]);
      navigate("/dashboard/team");
    },
  });
  return mutation
};

export default useUpdateTeamMember;