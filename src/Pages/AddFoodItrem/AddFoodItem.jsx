import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";
const AddFoodItem = () => {
  const { register, handleSubmit } = useForm();
  const secureAxios = useAxios();
  const { user } = useContext(AuthContext);
  const onSubmit = (data, event) => {
    secureAxios
      .post(`/foods`, { foodData: data })
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            title: "Successfully Added",
            icon: "success",
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
  return (
    <>
      <div className="bg-gold py-12 mb-16">
        <h1
          className="text-center text-5xl uppercase font-bold text-white
        "
        >
          Add Food Items
        </h1>
      </div>
      <div className="card shrink-0 md:w-4/5 w-full mx-auto shadow-2xl bg-base-100 mb-12">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-8">
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Food Name</span>
              </label>
              <input
                type="text"
                placeholder="Food Name"
                className="input input-bordered"
                required
                {...register("foodName")}
              />
            </div>
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Food Category</span>
              </label>
              <input
                type="text"
                placeholder="Food Category"
                className="input input-bordered"
                required
                {...register("foodCategory")}
              />
            </div>
          </div>
          <div className="flex gap-8">
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Food Origin</span>
              </label>
              <input
                type="text"
                placeholder="Food Origin"
                className="input input-bordered"
                required
                {...register("foodOrigin")}
              />
            </div>
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Food Image</span>
              </label>
              <input
                type="text"
                placeholder="Food Image URL"
                className="input input-bordered"
                required
                {...register("foodImage")}
              />
            </div>
          </div>
          <div className="flex gap-8">
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered"
                required
                readOnly
                defaultValue={`${user.email}`}
                {...register("email")}
              />
            </div>
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                className="input input-bordered"
                required
                defaultValue={user.displayName}
                readOnly
                {...register("name")}
              />
            </div>
          </div>
          <div className="flex gap-8">
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                type="text"
                placeholder="Price"
                className="input input-bordered"
                required
                {...register("price")}
              />
            </div>
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Quantity</span>
              </label>
              <input
                type="text"
                placeholder="Quantity"
                className="input input-bordered"
                required
                {...register("quantity")}
              />
            </div>
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Short Description</span>
            </label>
            <textarea
              className="textarea textarea-bordered"
              placeholder="Write Something About The Food"
              required
              {...register("short_description")}
            ></textarea>
          </div>
          <div className="form-control mt-6">
            <button
              style={{ letterSpacing: "1px" }}
              className=" btn btn-outline text-black hover:text-white hover:bg-gold hover:border-gold"
            >
              Add Item
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddFoodItem;
