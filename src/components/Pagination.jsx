import { Link, useLocation } from "react-router-dom";

const Pagination = ({ data, itemsPerPage, page, setPage }) => {
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleNextPage = () => {
    if (page === totalPages) return;
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page === 1) return;
    setPage(page - 1);
  };

  // get search params from URL
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("search") || "";

  return (
    <div className="flex items-center justify-center mt-4 mb-2">
      <button
        className="btn btn-ghost disabeld:border-none disabled:shadow-none disabled:bg-transparent flex items-center gap-1 px-2 capitalize"
        onClick={handlePrevPage}
        disabled={page === 1}
      >
        Prev
      </button>
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <Link to={`?page=${num}&search=${searchTerm}`} key={num}>
            <button
              className={`btn ${num === page ? "btn-neutral" : "btn-ghost"}`}
              onClick={() => setPage(num)}
            >
              {num}
            </button>
          </Link>
        ))}
      </div>
      <button
        className="btn btn-ghost disabeld:border-none disabled:shadow-none disabled:bg-transparent flex items-center gap-1 px-2 capitalize"
        onClick={handleNextPage}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
