import { ArrowLeft } from "lucide-react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import useAddBlog from "../hooks/useAddBlog";

const AddBlog = () => {
  const [blogData, setBlogData] = useState({ title: "", content: "" });
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const { mutate: addBlogMutation, isSuccess } = useAddBlog();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", blogData.title);
    formData.append("content", blogData.content);
    if (image) formData.append("image", image);

    addBlogMutation(formData);

    if (isSuccess) {
      setBlogData({ title: "", content: "" });
      setImage(null);
      fileInputRef.current.value = "";
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
        Add Blog
      </h3>
      <div className="card bg-base-100 w-full shadow-md">
        <form className="card-body" onSubmit={handleSubmit}>
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

export default AddBlog;
