import { Link } from "react-router-dom";

const categories = [
  {
    id: 1,
    title: "Team",
    icon: "https://cdn-icons-png.flaticon.com/512/6078/6078799.png",
  },
  {
    id: 2,
    title: "Service",
    icon: "https://cdn-icons-png.flaticon.com/512/3852/3852822.png",
  },
  {
    id: 3,
    title: "Blog",
    icon: "https://cdn-icons-png.flaticon.com/512/5068/5068578.png ",
  },
];

const Dashboard = () => {
  const CategoryCard = ({ category }) => {
    const { id, title, description, icon } = category;
    return (
      <div className="card bg-base-100 shadow-xl transition-transform duration-300 hover:translate-y-3 pt-5">
        <figure>
          <img src={icon} alt={title} className="w-32" />
        </figure>
        <div className="card-body text-center items-center ">
          <h2 className="card-title">{title}</h2>
        </div>
      </div>
    );
  };

  return (
    <div className="px-8 py-4">
      <h3 className="text-xl text-gray-400 font-bold pointer-events-none sm:text-2xl mb-3">
        Dashboard
      </h3>
      <h4 className="text-lg sm:text-xl font-medium text-gray-500 pointer-events-none mb-3">
        Welcome, <span className="text-primary">Nahid</span>
      </h4>
      <Link to="/">
        <button className="btn btn-primary uppercase text-white">
          See my homepage
        </button>
      </Link>
      <div className="card px-4 py-3 min-h-screen bg-base-100 w-full shadow-md mt-3">
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mt-5">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
