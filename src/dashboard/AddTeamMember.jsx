import { ArrowLeft } from "lucide-react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import useAddTeamMember from "../hooks/useAddTeamMember";

const AddTeamMember = () => {
  const [teamMemberData, setTeamMemberData] = useState({
    name: "",
    role: "",
    country: "",
    image: "",
  });
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const { mutate: addTeamMemberMutation, isSuccess } = useAddTeamMember();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", teamMemberData.name);
    formData.append("role", teamMemberData.role);
    formData.append("country", teamMemberData.country);
    if (image) formData.append("image", image);

    addTeamMemberMutation(formData);

    if (isSuccess) {
      setTeamMemberData({
        name: "",
        role: "",
        country: "",
        image: "",
      });
      setImage(null);
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="p-8">
      <Link to="/dashboard/team">
        <button className="btn btn-neutral">
          <ArrowLeft /> Back
        </button>
      </Link>
      <h3 className="text-xl text-gray-500 font-bold pointer-events-none sm:text-2xl mt-5 mb-3">
        Add Team Member
      </h3>
      <div className="card  bg-base-100 w-full shadow-md">
        <form onSubmit={handleSubmit} className="card-body">
          <div className="form-control max-w-screen-md">
            <label htmlFor="name" className="label">
              Name:
            </label>
            <input
              type="text"
              id="name"
              className="input input-bordered"
              value={teamMemberData.name}
              onChange={(e) =>
                setTeamMemberData({ ...teamMemberData, name: e.target.value })
              }
              placeholder="Enter the team member name"
              required
            />
          </div>

          <div className="form-control max-w-screen-md">
            <label htmlFor="role" className="label">
              Role:
            </label>
            <input
              type="text"
              id="role"
              className="input input-bordered"
              value={teamMemberData.role}
              onChange={(e) =>
                setTeamMemberData({ ...teamMemberData, role: e.target.value })
              }
              placeholder="Enter the team member role"
              required
            />
          </div>

          <div className="form-control max-w-screen-md">
            <label htmlFor="country" className="label">
              Country:
            </label>
            <input
              type="text"
              id="country"
              className="input input-bordered"
              value={teamMemberData.country}
              onChange={(e) =>
                setTeamMemberData({
                  ...teamMemberData,
                  country: e.target.value,
                })
              }
              placeholder="Enter the country name"
              required
            />
          </div>

          <div className="form-control max-w-screen-md">
            <label className="label">Image:</label>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="file-input file-input-bordered "
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </div>

          <div className="form-control max-w-28 mt-6">
            <button type="submit" className="btn btn-neutral">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTeamMember;
