import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";
import LoadingScreen from "./LoadingScreen";

// const teamMembers = [
//   {
//     id: 1,
//     name: "Omar Farooq",
//     role: "Frontend Developer",
//     image: "https://randomuser.me/api/portraits/men/32.jpg",
//   },
// ];

const MemberCard = ({ member }) => {
  const { id, image, name, role } = member;
  return (
    <div key={id} className="card bg-base-100 shadow-sm">
      <figure className="px-10 pt-10">
        <img src={image} alt={name} className="rounded-full w-24 h-24" />
      </figure>
      <div className="card-body items-center text-center">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-500">{role}</p>
      </div>
    </div>
  );
};

const TeamSection = () => {
  const fetchTeam = async () => {
    const { data } = await axiosInstance.get("/team");
    return data;
  };

  const {
    data: team,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["team"],
    queryFn: fetchTeam,
  });

  return (
    <section id="team" className="px-5 mb-16">
      <div className="container pt-10 pb-12 px-5 bg-base-200 rounded-3xl">
        <h2 className="text-4xl font-bold text-center mb-10">Meet Our Team</h2>
        {isLoading ? (
          <LoadingScreen />
        ) : error ? (
          <p className="text-center text-red-500">
            Error loading team: {error.message}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamSection;
