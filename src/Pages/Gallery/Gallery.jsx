import { useContext, useState } from "react";
import PageTitle from "../../components/PageTitle";
import { AuthContext } from "../../Provider/AuthProvider";
import { Modal } from "antd";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Reviews from "../../components/Reviews";
import { useQueryClient } from "@tanstack/react-query";

const Gallery = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const secureAxios = useAxios();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const showModal = () => {
    user ? setOpen(true) : navigate("/login");
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const onSubmit = (data, event) => {
    setConfirmLoading(true);
    secureAxios
      .post(`/reviews`, data)
      .then((res) => {
        if (res.status === 200) {
          setOpen(false);
          setConfirmLoading(false);
          Swal.fire({
            title: res.data.message,
            icon: "success",
            confirmButtonText: "Close",
          }).then(() => {
            event.target.reset();
            queryClient.invalidateQueries("reviews");
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
      <PageTitle text="Gallery" />
      <Reviews />
      <div className="text-center mb-20">
        <button
          className="btn btn-outline lg:btn-lg hover:bg-gold hover:border-gold hover:text-white"
          onClick={showModal}
        >
          Add Feedback
        </button>
        <Modal
          title="Add Your Precious Feedback"
          className="font-sans"
          open={open}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          footer={null}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                className="input input-bordered"
                required
                defaultValue={user?.displayName}
                readOnly={user?.displayName ? true : false}
                {...register("name")}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Feedback</span>
              </label>
              <textarea
                className="textarea textarea-bordered"
                placeholder="Your Precious Feedback"
                required
                {...register("feedback")}
              ></textarea>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Image URL</span>
              </label>
              <input
                type="text"
                placeholder="Live Image URL"
                className="input input-bordered"
                required
                {...register("imageURL")}
              />
            </div>
            <div className="form-control mt-6">
              <button
                style={{ letterSpacing: "1px" }}
                className=" btn btn-outline text-black hover:text-white hover:bg-gold hover:border-gold"
              >
                Add Feedback
                {confirmLoading && (
                  <span className="loading loading-spinner text-neutral"></span>
                )}
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
};

export default Gallery;
