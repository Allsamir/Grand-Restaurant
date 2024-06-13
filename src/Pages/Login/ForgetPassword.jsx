import Swal from "sweetalert2";
import { auth } from "../../config/firebase.config";
import { sendPasswordResetEmail } from "firebase/auth";

const handleSubmit = (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  sendPasswordResetEmail(auth, email)
    .then(() => {
      Swal.fire({
        title: "Password Reset Link Sent",
        icon: "success",
        confirmButtonText: "Close",
        timer: 1500,
      });
    })
    .catch((err) => console.error(err));
};

const ForgetPassword = () => {
  return (
    <>
      <div className="container mx-auto px-4">
        <div className="h-screen">
          <form
            className="card-body mt-20 lg:w-1/2 md:w-4/5 w-full mx-auto"
            onSubmit={handleSubmit}
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text">Reset Your Password</span>
              </label>
              <input
                type="email"
                placeholder="Your Email"
                className="input input-bordered"
                required
                name="email"
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-outline uppercase text-black hover:bg-gold hover:border-gold hover:text-white hover:scale-110">
                Send Password Reset Link
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
