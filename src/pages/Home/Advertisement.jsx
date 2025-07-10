import { Link } from "react-router";

const advertisements = [
  {
    id: "1",
    image: "/assets/real-estate-2.jpg",
    location: "Gulshan, Dhaka",
    priceRange: "$100,000 - $120,000",
    verified: true,
  },
  {
    id: "2",
    image: "/assets/real-estate.jpg",
    location: "Banani, Dhaka",
    priceRange: "$80,000 - $95,000",
    verified: false,
  },
  {
    id: "3",
    image: "/assets/estate-3.jpg",
    location: "Dhanmondi, Dhaka",
    priceRange: "$110,000 - $130,000",
    verified: true,
  },
  {
    id: "4",
    image: "/assets/estate-4.avif",
    location: "Bashundhara, Dhaka",
    priceRange: "$90,000 - $105,000",
    verified: true,
  },
];

const Advertisement = () => {
  return (
    <section className="py-10 bg-gray-50">
      <div className="w-full mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Featured Properties
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {advertisements.map((property) => (
            <div
              key={property.id}
              className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-shadow"
            >
              <img
                src={property.image}
                alt={property.location}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">
                  {property.location}
                </h3>
                <p className="text-gray-600 mb-1">{property.priceRange}</p>
                <p
                  className={`text-sm font-medium ${
                    property.verified ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {property.verified ? "Verified" : "Not Verified"}
                </p>
                <Link
                  to={`/property-details/${property.id}`}
                  className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  See Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advertisement;
