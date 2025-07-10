import { useQuery } from "@tanstack/react-query";

import { Link } from "react-router";
import useAxios from "../../hooks/useAxios";

const AllProperties = () => {
  const axiosSecure = useAxios();

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["verifiedProperties"],
    queryFn: async () => {
      const res = await axiosSecure.get("/properties/verified"); // Your backend route
      return res.data;
    },
  });

  if (isLoading)
    return <span className="loading loading-spinner loading-lg"></span>;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-5">
      {properties.map((p) => (
        <div key={p._id} className="card bg-base-100 shadow-xl p-4 space-y-3">
          <img
            src={p.image}
            className="rounded-lg h-48 w-full object-cover"
            alt="Property"
          />
          <h2 className="text-xl font-bold">{p.title}</h2>
          <p>
            <strong>Location:</strong> {p.location}
          </p>
          <p>
            <strong>Agent:</strong> {p.agentName}
          </p>
          <img
            src={p.agentImage}
            className="h-10 w-10 rounded-full object-cover"
            alt="Agent"
          />
          <p>
            <strong>Status:</strong>
            <span
              className={`ml-2 badge ${
                p.verificationStatus === "verified"
                  ? "badge-success"
                  : "badge-warning"
              }`}
            >
              {p.verificationStatus}
            </span>
          </p>
          <p>
            <strong>Price Range:</strong> {p.priceRange}
          </p>
          <Link
            to={`/property-details/${p._id}`}
            className="btn btn-outline btn-sm btn-primary"
          >
            Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default AllProperties;
