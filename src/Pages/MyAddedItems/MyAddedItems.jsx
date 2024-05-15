import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { useContext, useRef, useState } from "react";
import { GrUpdate } from "react-icons/gr";
import { AuthContext } from "../../Provider/AuthProvider";
import { Modal } from "antd";
import Swal from "sweetalert2";

const MyAddedItems = () => {
  const secureAxios = useAxios();
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [foodID, setFoodID] = useState(null);
  const nameInput = useRef(null);
  const priceInput = useRef(null);
  const categoryInput = useRef(null);
  const imageInput = useRef(null);
  const { isPending, error, data } = useQuery({
    queryKey: ["foodDataOfCurrentUser"],
    queryFn: async () =>
      secureAxios
        .get(`/my-added-items?email=${user.email}`)
        .then((res) => res.data),
  });
  const showModal = (foodItemID) => {
    setIsModalOpen(true);
    setFoodID(foodItemID);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    await secureAxios
      .patch(`/updateFood?id=${foodID}`, {
        foodName: nameInput.current.value,
        price: priceInput.current.value,
        foodCategory: categoryInput.current.value,
        foodImage: imageInput.current.value,
      })
      .then((res) => {
        if (res?.status === 200) {
          Swal.fire({
            title: res.data.message,
            icon: "success",
            confirmButtonText: "Close",
          }).then(() => {
            queryClient.invalidateQueries("foodDataOfCurrentUser");
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          title: "Something Went Wrong",
          icon: "error",
          confirmButtonText: "Close",
        });
        console.error(err);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDelete = (foodID) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#cfa670",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        secureAxios.delete(`/deleteFood?id=${foodID}`).then((res) => {
          if (res.status === 200) {
            Swal.fire({
              title: res.data.message,
              text: "Your food item has been deleted.",
              icon: "success",
            }).then(() =>
              queryClient.invalidateQueries("foodDataOfCurrentUser"),
            );
          }
        });
      }
    });
  };

  if (isPending)
    return (
      <div className="text-center flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  if (error)
    return (
      <div className="text-center flex justify-center items-center min-h-screen">
        An error has occurred: + {error.message}
      </div>
    );
  if (data.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-3xl">You haven&apos;t add any food items</h2>
      </div>
    );
  }
  return (
    <div className="overflow-x-auto min-h-screen">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th>Name</th>
            <th>Price</th>
            <th>Origin</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {data.map((food, index) => (
            <tr key={index}>
              <th>
                <button
                  onClick={() => handleDelete(food._id)}
                  className="btn btn-circle btn-outline hover:bg-gold hover:border-gold hover:scale-125"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-24 h-24">
                      <img
                        src={food.foodImage}
                        alt={food.foodName}
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </td>
              <td className="font-semibold">{food.foodName}</td>
              <td className="font-semibold">{food.price}$</td>
              <td className="font-semibold">{food.foodCategory}</td>
              <th>
                <button
                  className="btn btn-ghost"
                  title="Update"
                  onClick={() => showModal(food._id)}
                >
                  <GrUpdate />
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        title="Update Your Food Information"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={`Update`}
      >
        <form className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Food Name</span>
            </label>
            <input
              type="text"
              placeholder="Food Name"
              className="input input-bordered"
              name="foodName"
              ref={nameInput}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              type="number"
              placeholder="Price"
              className="input input-bordered"
              name="price"
              ref={priceInput}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Food Origin</span>
            </label>
            <input
              type="text"
              placeholder="Food Origin"
              className="input input-bordered"
              name="foodOrigin"
              required
              ref={categoryInput}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Food Image</span>
            </label>
            <input
              type="text"
              placeholder="Food Live Image URL"
              className="input input-bordered"
              required
              name="foodImage"
              ref={imageInput}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default MyAddedItems;
