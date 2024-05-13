import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxios from "../../hooks/useAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const secureAxios = useAxios();
  const { isPending, error, data } = useQuery({
    queryKey: ["ordersOfCurrentUser"],
    queryFn: async () =>
      secureAxios.get(`/my-orders?email=${user.email}`).then((res) => res.data),
  });
  console.log(data);
  const handleDelete = (orderID) => {
    Swal.fire({
      title: "Will you cancel the order?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#cfa670",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        secureAxios.delete(`/deleteOrder?id=${orderID}`).then((res) => {
          if (res.status === 200) {
            Swal.fire({
              title: res.data.message,
              text: "Your order has been canceled.",
              icon: "success",
            }).then(() => queryClient.invalidateQueries("ordersOfCurrentUser"));
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
        <h2 className="text-3xl">You haven&apos;t ordered any food</h2>
      </div>
    );
  }
  console.log(data);
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
            <th>Quantity</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {data.map((order, index) => (
            <tr key={index}>
              <th>
                <button
                  onClick={() => handleDelete(order._id)}
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
                      <img src={order.foodImage} alt={order.foodName} />
                    </div>
                  </div>
                </div>
              </td>
              <td className="font-semibold">{order.foodName}</td>
              <td className="font-semibold">{order.price}$</td>
              <td className="font-semibold">{order.quantity}</td>
              <td className="font-semibold">{order.date}</td>
              <td className="font-semibold">{order.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;
