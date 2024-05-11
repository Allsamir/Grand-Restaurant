import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { auth } from "../../config/firebase.config";
import { updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [isPasswordVisiable, setPasswordVisiable] = useState(false);
  const { createUser, loading, setLoading } = useContext(AuthContext);
  const onSubmit = (data, event) => {
    const { name, email, photoURL, password } = data;
    const isValidPassword = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(password);
    if (isValidPassword) {
      createUser(email, password)
        .then(() => {
          updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoURL,
          })
            .then(() => {
              Swal.fire({
                title: "Successfully Registered",
                icon: "success",
                confirmButtonText: "Close",
              }).then(() => {
                setLoading(false);
                event.target.reset();
                navigate("/");
              });
            })
            .catch((err) => console.error(err));
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          Swal.fire({
            title: "Error!",
            text: `${errorCode} ${errorMessage}`,
            icon: "error",
            confirmButtonText: "Close",
          }).then(() => setLoading(false));
        });
    } else {
      Swal.fire({
        title: "Password Validation",
        text: `Must have an Uppercase letter in the password, 
              Must have a Lowercase letter in the password,
              Length must be at least 6 character
              `,
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  };

  const handleTogglePasswordVisibility = () =>
    setPasswordVisiable(!isPasswordVisiable);

  return (
    <div className="hero min-h-screen">
      {loading && (
        <div className="min-h-screen text-center flex flex-col justify-center items-center">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      )}
      <div className="hero-content flex-col lg:flex-row-reverse w-ful gap-12">
        <div className="text-center lg:text-left">
          <img
            src="https://themes.themegoods.com/grandrestaurantv6/demo3/wp-content/uploads/sites/3/2020/12/grilled-t-bone-steak-PKRXHAJ.jpg"
            alt=""
          />
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl text-black font-pop">
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className=" label-text text-black">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                className="input input-bordered bg-[#eee]"
                required
                {...register("name")}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className=" label-text text-black">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered bg-[#eee]"
                required
                {...register("email")}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className=" label-text text-black">Photo URL</span>
              </label>
              <input
                type="text"
                placeholder="Your Live Photo URL"
                className="input input-bordered bg-[#eee]"
                {...register("photoURL")}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className=" label-text text-black">Password</span>
              </label>
              <div className="relative">
                <input
                  type={isPasswordVisiable ? "text" : "password"}
                  placeholder="Password"
                  className="input input-bordered bg-[#eee] w-full"
                  required
                  {...register("password")}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-3 py-1 bg-transparent"
                  onClick={handleTogglePasswordVisibility}
                >
                  {isPasswordVisiable ? "🙈" : "👁️"}
                </button>
              </div>
            </div>
            <div className="form-control mt-6">
              <input
                className="btn btn-outline text-black hover:text-white hover:bg-gold hover:border-none"
                type="submit"
                value={`Register`}
              />
            </div>
            <p className="text-center py-2">
              Already have an account?{" "}
              <Link className="text-gold" to={`/login`}>
                Login
              </Link>{" "}
              here
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
