import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
const FoodPurchase = () => {
  const { orderdFoodID } = useParams();
  const { register, handleSubmit } = useForm();
  const secureAxios = useAxios();
  const { isPending, error, data } = useQuery({
    queryKey: ["orderdFoodData"],
    queryFn: async () =>
      secureAxios.get(`/singleFood?id=${orderdFoodID}`).then((res) => res.data),
  });
  const onSubmit = (order, event) => {
    order.price = order.price.slice(1);
    secureAxios
      .post(`/orders`, {
        order: order,
        id: orderdFoodID,
        foodImage: data.foodImage,
      })
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            title: res.data.message,
            icon: res.data.status ? "success" : "warning",
            confirmButtonText: "Close",
          }).then(() => {
            event.target.reset();
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
  useEffect(() => {
    document.title = `Grand Resturant | ${data?.foodName}`;
  }, [data?.foodName]);

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

  return (
    <>
      <div className="text-center mb-12">
        <h1 className="text-7xl font-kristi text-gold">
          Order Our Best Recipe
        </h1>
      </div>
      <div style={{ backgroundImage: `url(${data?.foodImage})` }}>
        <div style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}>
          <form
            className="card-body md:w-4/5 w-full mx-auto"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex gap-8">
              <div className="form-control w-1/2">
                <label className="label">
                  <span className="label-text text-white">Food Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Food Name"
                  className="input input-bordered"
                  required
                  readOnly
                  name="foodName"
                  defaultValue={data?.foodName}
                  {...register("foodName")}
                />
              </div>
              <div className="form-control w-1/2">
                <label className="label">
                  <span className="label-text text-white">Food Category</span>
                </label>
                <input
                  type="text"
                  placeholder="Food Category"
                  className="input input-bordered"
                  required
                  readOnly
                  defaultValue={data?.foodCategory}
                  name="foodCategory"
                  {...register("foodCategory")}
                />
              </div>
            </div>
            <div className="flex gap-8">
              <div className="form-control w-1/2">
                <div className="flex justify-between flex-wrap">
                  <div>
                    <label className="label">
                      <span className="label-text text-white">Date</span>
                    </label>
                    <input
                      type="text"
                      placeholder=""
                      className="input input-bordered"
                      required
                      name="date"
                      defaultValue={new Date().toLocaleDateString()}
                      {...register("date")}
                    />
                  </div>
                  <div>
                    <label className="label">
                      <span className="label-text text-white">Time</span>
                    </label>
                    <input
                      type="text"
                      placeholder=""
                      className="input input-bordered"
                      required
                      defaultValue={new Date().toLocaleTimeString()}
                      name="time"
                      {...register("time")}
                    />
                  </div>
                </div>
              </div>
              <div className="form-control w-1/2">
                <label className="label">
                  <span className="label-text text-white">Food Origin</span>
                </label>
                <input
                  type="text"
                  placeholder="Food Origin"
                  className="input input-bordered"
                  required
                  readOnly
                  defaultValue={data?.foodOrigin}
                  name="foodOrigin"
                  {...register("foodOrigin")}
                />
              </div>
            </div>
            <div className="flex gap-8">
              <div className="form-control w-1/2">
                <label className="label">
                  <span className="label-text text-white">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered"
                  required
                  readOnly
                  defaultValue={`${data?.email}`}
                  name="email"
                  {...register("email")}
                />
              </div>
              <div className="form-control w-1/2">
                <label className="label">
                  <span className="label-text text-white">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  className="input input-bordered"
                  required
                  defaultValue={data?.name}
                  readOnly
                  name="name"
                  {...register("name")}
                />
              </div>
            </div>
            <div className="flex gap-8">
              <div className="form-control w-1/2">
                <label className="label">
                  <span className="label-text text-white">Price</span>
                </label>
                <input
                  type="text"
                  placeholder="Price"
                  className="input input-bordered"
                  required
                  readOnly
                  name="price"
                  defaultValue={`$${data?.price}`}
                  {...register("price")}
                />
              </div>
              <div className="form-control w-1/2">
                <label className="label">
                  <span className="label-text text-white">Quantity</span>
                </label>
                <input
                  type="number"
                  placeholder="Quantity"
                  className="input input-bordered"
                  required
                  name="quantity"
                  {...register("quantity")}
                />
              </div>
            </div>
            <div className="form-control mt-6">
              <button
                style={{ letterSpacing: "1px" }}
                className=" btn btn-outline text-white hover:bg-gold hover:border-gold"
              >
                Order Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FoodPurchase;
