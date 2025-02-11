import { ArrowLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useUpdateBlog from "../hooks/useUpdateBlog";
import axiosInstance from "../utils/axiosInstance";

const UpdateBlog = () => {
  const { id } = useParams();
  const fileInputRef = useRef(null);
  const { mutate: updateBlogMutation, isSuccess } = useUpdateBlog();

  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
  });
  const [newImage, setNewImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Fetch blog details to pre-populate fields
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axiosInstance.get(`/blogs/${id}`);
        setBlogData(response.data);
        setPreview(response.data.image);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };
    fetchBlog();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      setPreview(URL.createObjectURL(file)); // Show preview of new image
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", blogData.title);
    formData.append("content", blogData.content);
    if (newImage) {
      formData.append("image", newImage);
    }
    updateBlogMutation({ id, updatedData: formData });
    if (isSuccess) {
      setBlogData({
        title: "",
        content: "",
      });
      setNewImage(null);
      setPreview(null);
    }
  };

  return (
    <div className="p-8">
      <Link to="/dashboard/blogs">
        <button className="btn btn-neutral">
          <ArrowLeft /> Back
        </button>
      </Link>
      <h3 className="text-xl text-gray-500 font-bold pointer-events-none sm:text-2xl mt-5 mb-3">
        Update Blog
      </h3>
      <div className="card bg-base-100 w-full shadow-md">
        <form className="card-body" onSubmit={handleSubmit}>
          <div className="form-control max-w-screen-md">
            <img
              src={preview}
              alt={blogData.title}
              className="max-w-56 rounded-2xl"
            />
          </div>
          <div className="form-control max-w-screen-md">
            <label htmlFor="title" className="label">
              Title:
            </label>
            <input
              type="text"
              id="title"
              className="input input-bordered"
              value={blogData.title}
              onChange={(e) =>
                setBlogData({ ...blogData, title: e.target.value })
              }
              placeholder="Enter the blog title"
              required
            />
          </div>

          <div className="form-control max-w-screen-md">
            <label htmlFor="content" className="label">
              Content:
            </label>
            <textarea
              type="text"
              id="content"
              className="textarea textarea-bordered h-44"
              value={blogData.content}
              onChange={(e) =>
                setBlogData({ ...blogData, content: e.target.value })
              }
              placeholder="Content"
              required
            ></textarea>
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
              save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBlog;
