import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { useContext } from "react";
import { GrUpdate } from "react-icons/gr";
import { AuthContext } from "../../Provider/AuthProvider";

const MyAddedItems = () => {
  const secureAxios = useAxios();
  const { user } = useContext(AuthContext);
  const { isPending, error, data } = useQuery({
    queryKey: ["foodDataOfCurrentUser"],
    queryFn: async () =>
      secureAxios
        .get(`/my-added-items?email=${user.email}`)
        .then((res) => res.data),
  });
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {data.map((food, index) => (
            <tr key={index}>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-24 h-24">
                      <img
                        src={food.foodImage}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </div>
              </td>
              <td className="font-semibold">{food.foodName}</td>
              <td className="font-semibold">{food.price}</td>
              <th>
                <button className="btn btn-ghost" title="Update">
                  <GrUpdate />
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyAddedItems;
