import { ArrowLeft } from "lucide-react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import useAddService from "../hooks/useAddService";

const AddService = () => {
  const [serviceData, setServiceData] = useState({
    name: "",
    description: "",
  });
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const { mutate: addServiceMutation, isSuccess } = useAddService();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", serviceData.name);
    formData.append("description", serviceData.description);
    if (image) formData.append("image", image);

    addServiceMutation(formData);

    if (isSuccess) {
      setServiceData({ name: "", description: "" });
      setImage(null);
      fileInputRef.current.value = "";
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
        Add Service
      </h3>
      <div className="card p-8 bg-base-100 w-full shadow-md">
        <form onSubmit={handleSubmit}>
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
            <label htmlFor="image" className="label">
              Image:
            </label>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="file-input file-input-bordered "
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </div>

          <div className="form-control max-w-28 mt-7">
            <button type="submit" className="btn btn-neutral">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddService;
