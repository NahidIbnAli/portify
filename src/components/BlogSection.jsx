import { format } from "date-fns";
import { useLocation } from "react-router-dom";
import useFetchBlogs from "../hooks/useFetchBlogs";
import LoadingScreen from "./LoadingScreen";

// blog card
const BlogCard = ({ blog }) => {
  const { title, content, image, createdAt } = blog;
  const formattedDate = format(new Date(createdAt), "dd MMM yyyy");
  return (
    <div className="card bg-base-100 shadow-xl transition-transform duration-300 hover:translate-y-3">
      <figure>
        <img src={image} alt={title} className="h-52 w-full object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="line-clamp-2 overflow-hidden text-ellipsis">{content}</p>
        <div className="card-actions justify-between items-end">
          <p className="text-muted">{formattedDate}</p>
          <button className="btn btn-primary">Read More</button>
        </div>
      </div>
    </div>
  );
};

const BlogSection = () => {
  const location = useLocation();
  const { data: blogs, isLoading, error } = useFetchBlogs();

  return (
    <section
      className={`mb-16 ${
        location.pathname === "/blog" ? "mt-6 lg:mt-10" : ""
      }`}
    >
      <div className="container px-5">
        <div>
          <h2 className="text-4xl font-bold text-center mb-8">
            {location.pathname === "/blog" ? "Blog" : "Letest Blogs"}
          </h2>
          {isLoading ? (
            <LoadingScreen />
          ) : error ? (
            <p className="text-center text-red-500">
              Error loading blogs: {error.message}
            </p>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {location.pathname === "/blog"
                ? blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
                : blogs
                    .slice(0, 6)
                    .map((blog) => <BlogCard key={blog._id} blog={blog} />)}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
