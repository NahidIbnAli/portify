import { ArrowLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useUpdateTeamMember from "../hooks/useUpdateTeamMember";
import axiosInstance from "../utils/axiosInstance";

const UpdateTeamMember = () => {
  const { id } = useParams();
  const fileInputRef = useRef(null);
  const { mutate: updateTeamMemberMutation, isSuccess } = useUpdateTeamMember();

  const [teamMemberData, setTeamMemberData] = useState({
    name: "",
    role: "",
    country: "",
    image: "",
  });
  const [newImage, setNewImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchTeamMember = async () => {
      try {
        const response = await axiosInstance.get(`/team/${id}`);
        setTeamMemberData(response.data);
        setPreview(response.data.image);
      } catch (error) {
        console.error("Error fetching team member:", error);
      }
    };
    fetchTeamMember();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", teamMemberData.name);
    formData.append("role", teamMemberData.role);
    formData.append("country", teamMemberData.country);
    if (newImage) {
      formData.append("image", newImage);
    }

    updateTeamMemberMutation({ id, updatedData: formData });

    if (isSuccess) {
      setTeamMemberData({
        name: "",
        role: "",
        country: "",
        image: "",
      });
      setNewImage(null);
      setPreview(null);
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
        Update Team Member
      </h3>
      <div className="card  bg-base-100 w-full shadow-md">
        <form onSubmit={handleSubmit} className="card-body">
          <div className="form-control max-w-screen-md">
            <img
              src={preview}
              alt={teamMemberData.name}
              className="max-w-32 rounded-2xl"
            />
          </div>
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
              onChange={handleImageChange}
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

export default UpdateTeamMember;
