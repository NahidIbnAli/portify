import { Edit, PackagePlus, Trash } from "lucide-react";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import swal from "sweetalert";
import LoadingScreen from "../components/LoadingScreen";
import Pagination from "../components/Pagination";
import SearchElement from "../components/SearchElement";
import useDeleteService from "../hooks/useDeleteService";
import useFetchServices from "../hooks/useFetchService";

// service card
const ServiceCard = ({ service, handleRemoveService }) => {
  const { _id, name, description, image } = service;
  return (
    <div className="card bg-base-100 shadow-xl transition-transform duration-300 hover:translate-y-3 pt-5">
      <figure>
        <img src={image} alt={name} className="w-32" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <div className="flex items-center gap-8">
            <Link to={`update/${_id}`} className="-mb-[7px]">
              <button className="text-success">
                <Edit />
              </button>
            </Link>
            <button
              onClick={() => handleRemoveService(_id)}
              className="text-error"
            >
              <Trash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ServiceManagement = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  const { data: services, isLoading, error } = useFetchServices();
  const deleteServiceMutation = useDeleteService();

  // remove service handler
  const handleRemoveService = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this service!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteServiceMutation.mutate(id);
        swal("Poof! The service has been deleted!", {
          icon: "success",
        });
      } else {
        swal("The service is safe!");
      }
    });
  };

  return (
    <div className="px-8 py-4">
      <h3 className="text-xl text-gray-500 font-bold pointer-events-none sm:text-2xl">
        Edit Service
      </h3>
      <div className="card px-4 py-2 bg-base-100 w-full shadow-md">
        <div className="flex flex-col md:flex-row md:items-center">
          <Link to="add">
            <button className="btn btn-neutral flex items-center justify-center my-3 text-xs capitalize md:text-sm">
              <PackagePlus />
              Add Service
            </button>
          </Link>
          <SearchElement />
        </div>
        {isLoading ? (
          <LoadingScreen />
        ) : error ? (
          <p className="text-center text-red-500">
            Error loading services: {error.message}
          </p>
        ) : services.length <= 0 ? (
          <p className="text-center py-10">
            No Services available at the moment. Stay tuned for updates!
          </p>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 mt-5">
            {services.map((service) => (
              <ServiceCard
                key={service._id}
                service={service}
                handleRemoveService={handleRemoveService}
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

export default ServiceManagement;
