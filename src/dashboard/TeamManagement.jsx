import { Edit, Trash, UserPlus } from "lucide-react";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import swal from "sweetalert";
import LoadingScreen from "../components/LoadingScreen";
import Pagination from "../components/Pagination";
import SearchElement from "../components/SearchElement";
import useDeleteSTeamMember from "../hooks/useDeleteTeamMember";
import useFetchTeam from "../hooks/useFetchTeam";

const TeamManagement = () => {
  // for pagination
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  const { data: team, isLoading, error } = useFetchTeam();
  const deleteTeamMemberMutation = useDeleteSTeamMember();

  // remove team member handler
  const handleRemoveTeamMember = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this team member profile!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteTeamMemberMutation.mutate(id);
        swal("Poof! The team member profile has been deleted!", {
          icon: "success",
        });
      } else {
        swal("The team member profile is safe!");
      }
    });
  };

  return (
    <div className="px-8 py-4">
      <h3 className="text-xl text-gray-500 font-bold pointer-events-none sm:text-2xl">
        Edit Team Member
      </h3>
      <div className="card px-4 py-2 bg-base-100 w-full shadow-md">
        <div className="flex flex-col md:flex-row md:items-center">
          <Link to="add">
            <button className="btn btn-neutral flex items-center justify-center my-3 text-xs capitalize md:text-sm">
              <UserPlus />
              Add Team Member
            </button>
          </Link>
          <SearchElement />
        </div>
        <div className="card bg-base-100 shadow-md mt-5">
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Job</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="4">
                      <LoadingScreen />
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="4" className="text-center text-red-500">
                      Error loading services: {error.message}
                    </td>
                  </tr>
                ) : team.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-10">
                      No team members found at the moment.
                    </td>
                  </tr>
                ) : (
                  team.map((teamMember, index) => (
                    <tr key={teamMember._id}>
                      <th>{index + 1}</th>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle h-14 w-14">
                              <img
                                src={teamMember.image}
                                alt={teamMember.name}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{teamMember.name}</div>
                            <div className="text-sm opacity-50">
                              {teamMember.country}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{teamMember.role}</td>
                      <td>
                        <div className="flex items-center gap-8">
                          <Link
                            to={`update/${teamMember._id}`}
                            className="-mb-[7px]"
                          >
                            <button className="text-success">
                              <Edit />
                            </button>
                          </Link>
                          <button
                            onClick={() =>
                              handleRemoveTeamMember(teamMember._id)
                            }
                            className="text-error"
                          >
                            <Trash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        {/* pagination */}
        <Pagination
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
          itemsPerPage={7}
          page={page}
          setPage={setPage}
        />
      </div>
    </div>
  );
};

export default TeamManagement;
