import { format } from "date-fns";
import { Edit, FilePlus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import swal from "sweetalert";
import LoadingScreen from "../components/LoadingScreen";
import Pagination from "../components/Pagination";
import SearchElement from "../components/SearchElement";
import useDeleteBlog from "../hooks/useDeleteBlog";
import useFetchBlogs from "../hooks/useFetchBlogs";

// blog card
const BlogCard = ({ blog, handleRemoveBlog }) => {
  const { _id, title, content, image, createdAt } = blog;
  const formattedDate = format(new Date(createdAt), "dd MMM yyyy");
  return (
    <div className="card bg-base-100 shadow-xl transition-transform duration-300 hover:translate-y-3">
      <figure>
        <img src={image} alt={title} className="h-52 w-full object-cover" />
      </figure>
      <div className="card-body justify-between">
        <div>
          <h2 className="card-title">{title}</h2>
          <p className="line-clamp-2 overflow-hidden text-ellipsis">
            {content}
          </p>
        </div>
        <div className="card-actions justify-between items-end">
          <p className="text-muted">{formattedDate}</p>
          <div className="flex items-center gap-8">
            <Link to={`update/${_id}`} className="-mb-[7px]">
              <button className="text-success">
                <Edit />
              </button>
            </Link>

            <button
              onClick={() => handleRemoveBlog(_id)}
              className="text-error"
            >
              <Trash2 />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const BlogManagement = () => {
  // for pagination
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  const { data: blogs, isLoading, error } = useFetchBlogs();
  const deleteBlogMutation = useDeleteBlog();

  // remove blog handler
  const handleRemoveBlog = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this blog!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteBlogMutation.mutate(id);
        swal("Poof! The blog has been deleted!", {
          icon: "success",
        });
      } else {
        swal("The blog is safe!");
      }
    });
  };

  return (
    <div className="px-8 py-4">
      <h3 className="text-xl text-gray-500 font-bold pointer-events-none sm:text-2xl">
        Edit Blog
      </h3>
      <div className="card px-4 py-2 bg-base-100 w-full shadow-md">
        <div className="flex flex-col md:flex-row md:items-center">
          <Link to="add">
            <button className="btn btn-neutral flex items-center justify-center my-3 text-xs capitalize md:text-sm">
              <FilePlus />
              Add Blog
            </button>
          </Link>
          <SearchElement />
        </div>

        {isLoading ? (
          <LoadingScreen />
        ) : error ? (
          <p className="text-center text-red-500">
            Error loading blogs: {error.message}
          </p>
        ) : blogs.length <= 0 ? (
          <p className="text-center py-10">
            No blogs available at the moment. Stay tuned for updates!
          </p>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 mt-5">
            {blogs.map((blog) => (
              <BlogCard
                key={blog._id}
                blog={blog}
                handleRemoveBlog={handleRemoveBlog}
              />
            ))}
          </div>
        )}

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

export default BlogManagement;
