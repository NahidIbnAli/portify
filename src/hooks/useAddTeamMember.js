import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";

const addTeamMember = async (teamMemberData) => {
  const { data } = await axiosInstance.post("/team", teamMemberData);
  return data;
     
};

const useAddTeamMember = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (teamMemberData) =>
      toast.promise(addTeamMember(teamMemberData), {
        pending: "Adding team member ... ⏳",
        success: "Team member added successfully! 🎉",
        error:  {
          render({ data }) {
            return data?.response?.data?.error || "Failed to add team member ❌";
          },
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["team"]);
      navigate("/dashboard/team");
    },
  });
  return mutation;
};
export default useAddTeamMember;