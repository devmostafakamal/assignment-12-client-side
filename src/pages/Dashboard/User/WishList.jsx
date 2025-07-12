import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
function WishList() {
  const { user } = useAuth();
  console.log(user);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: wishlist = [] } = useQuery({
    queryKey: ["wishlist", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishlist?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const openModal = (property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProperty(null);
    setIsModalOpen(false);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmitOffer = async (data) => {
    const offerAmount = parseFloat(data.offerAmount);
    const [minPrice, maxPrice] = selectedProperty.priceRange
      .split("-")
      .map((price) => parseFloat(price.trim().replace(/[^\d.]/g, "")));

    if (offerAmount < minPrice || offerAmount > maxPrice) {
      return Swal.fire(
        "Error",
        "Offer amount must be within the price range",
        "error"
      );
    }

    const offerData = {
      propertyId: selectedProperty.propertyId,
      propertyTitle: selectedProperty.title,
      location: selectedProperty.location,
      agentName: selectedProperty.agentName,
      offerAmount,
      buyerEmail: user.email,
      buyerName: user.displayName,
      buyingDate: data.buyingDate,
      image: selectedProperty.image,
      status: "pending",
    };

    try {
      await axiosSecure.post("/offers", offerData);
      Swal.fire("Success", "Offer submitted successfully", "success");
      closeModal();
      reset();
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  const handleRemove = async (id) => {
    try {
      await axiosSecure.delete(`/wishlist/${id}`);
      Swal.fire("Removed", "Property removed from wishlist", "success");
      refetch();
    } catch (error) {
      console.error(error);
    }
  };
  console.log(wishlist);
  return (
    <>
      <h2>hello</h2>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((property) => (
          <div
            key={property._id}
            className="border rounded-xl shadow p-4 space-y-2"
          >
            <img
              src={property.image}
              alt={property.title}
              className="rounded-lg h-48 w-full object-cover"
            />
            <h2 className="text-xl font-bold">{property.title}</h2>
            <p className="text-gray-600">Location: {property.location}</p>
            <p className="text-gray-600">Agent: {property.agentName}</p>
            <p className="text-gray-600">
              Verification: {property.verificationStatus || "pending"}
            </p>
            <p className="text-gray-600">Price Range: {property.priceRange}</p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => openModal(property)}
                className="btn btn-success btn-sm"
              >
                Make an Offer
              </button>
              <button
                onClick={() => handleRemove(property._id)}
                className="btn btn-error btn-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        {/* Offer Modal */}
        {/* {isModalOpen && selectedProperty && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-red-500 text-xl font-bold"
            >
              ✕
            </button>
            <h2 className="text-2xl font-semibold mb-4">Make an Offer</h2>
            <form onSubmit={handleSubmit(onSubmitOffer)} className="space-y-4">
              <input
                readOnly
                value={selectedProperty.title}
                className="input input-bordered w-full"
              />
              <input
                readOnly
                value={selectedProperty.location}
                className="input input-bordered w-full"
              />
              <input
                readOnly
                value={selectedProperty.agentName}
                className="input input-bordered w-full"
              />
              <input
                {...register("offerAmount", { required: true })}
                type="number"
                placeholder="Your Offer Amount"
                className="input input-bordered w-full"
              />
              {errors.offerAmount && (
                <p className="text-red-500 text-sm">Offer amount is required</p>
              )}

              <input
                readOnly
                value={user.email}
                className="input input-bordered w-full"
              />
              <input
                readOnly
                value={user.displayName}
                className="input input-bordered w-full"
              />

              <input
                {...register("buyingDate", { required: true })}
                type="date"
                className="input input-bordered w-full"
              />
              {errors.buyingDate && (
                <p className="text-red-500 text-sm">Buying date is required</p>
              )}

              <button className="btn btn-primary w-full">Submit Offer</button>
            </form>
          </div>
        </div>
      )} */}
      </div>
    </>
  );
}

export default WishList;
