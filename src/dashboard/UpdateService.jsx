import { ArrowLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useUpdateService from "../hooks/useUpdateService";
import axiosInstance from "../utils/axiosInstance";

const UpdateService = () => {
  const { id } = useParams();
  const fileInputRef = useRef(null);
  const { mutate: updateServiceMutation, isSuccess } = useUpdateService();

  const [serviceData, setServiceData] = useState({
    name: "",
    description: "",
  });
  const [newImage, setNewImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axiosInstance.get(`/services/${id}`);
        setServiceData(response.data);
        setPreview(response.data.image);
      } catch (error) {
        console.error("Error fetching service:", error);
      }
    };
    fetchService();
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
    formData.append("name", serviceData.name);
    formData.append("description", serviceData.description);
    if (newImage) {
      formData.append("image", newImage);
    }
    updateServiceMutation({ id, updatedData: formData });
    if (isSuccess) {
      setServiceData({
        name: "",
        description: "",
      });
      setNewImage(null);
      setPreview(null);
    }
  };

  return (
    <div className="p-8">
      <Link to="/dashboard/services">
        <button className="btn btn-neutral">
          <ArrowLeft /> Back
        </button>
      </Link>
      <h3 className="text-xl text-gray-500 font-bold pointer-events-none sm:text-2xl mt-5 mb-3">
        Update Service
      </h3>
      <div className="card p-8 bg-base-100 w-full shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="form-control max-w-screen-md">
            <img
              src={preview}
              alt={serviceData.name}
              className="max-w-40 rounded-2xl"
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
              value={serviceData.name}
              onChange={(e) =>
                setServiceData({ ...serviceData, name: e.target.value })
              }
              placeholder="Enter the service name"
              required
            />
          </div>

          <div className="form-control max-w-screen-md mt-4">
            <label htmlFor="description" className="label">
              Description:
            </label>
            <input
              type="text"
              id="description"
              className="input input-bordered"
              value={serviceData.description}
              onChange={(e) =>
                setServiceData({ ...serviceData, description: e.target.value })
              }
              placeholder="Enter the service description"
              required
            />
          </div>

          <div className="form-control max-w-screen-md mt-4">
            <label className="label">Image:</label>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="file-input file-input-bordered "
              onChange={handleImageChange}
            />
          </div>

          <div className="form-control max-w-28 mt-7">
            <button type="submit" className="btn btn-neutral">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateService;
