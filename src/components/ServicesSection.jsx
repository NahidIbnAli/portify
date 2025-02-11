import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";
import LoadingScreen from "./LoadingScreen";

const ServiceCard = ({ service }) => {
  const { image, name, description } = service;
  return (
    <div className="card bg-white p-6 text-center transition-transform duration-300 hover:scale-105">
      <img src={image} alt={name} className="max-w-32 object-cover mx-auto" />
      <h3 className="text-xl font-semibold mt-4">{name}</h3>
      <p className="text-gray-500 mt-2">{description}</p>
    </div>
  );
};

const ServicesSection = () => {
  const fetchServices = async () => {
    const { data } = await axiosInstance.get("/services");
    return data;
  };

  const {
    data: services,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["services"],
    queryFn: fetchServices,
  });

  return (
    <section className="mt-6 lg:mt-10 mb-16">
      <div className="container px-5">
        <h2 className="text-4xl font-bold text-center mb-10">Our Services</h2>
        {isLoading ? (
          <LoadingScreen />
        ) : error ? (
          <p className="text-center text-red-500">
            Error loading services: {error.message}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
