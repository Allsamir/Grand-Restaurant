import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading, setLoading, signInWithGoogle } =
    useContext(AuthContext);
  const [isPasswordVisiable, setPasswordVisiable] = useState(false);
  const onSubmit = (data, event) => {
    const { email, password } = data;
    const isValidPassword = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(password);
    if (isValidPassword) {
      login(email, password)
        .then(() => {
          Swal.fire({
            title: "Successfully Login",
            icon: "success",
            confirmButtonText: "Close",
          }).then(() => {
            setLoading(false);
            event.target.reset();
            navigate(location?.state || "/");
          });
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
  const googleSignIn = () => {
    signInWithGoogle()
      .then(() => {
        Swal.fire({
          title: "Successfully Login",
          icon: "success",
          confirmButtonText: "Close",
        }).then(() => {
          setLoading(false);
          navigate(location?.state || "/");
        });
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
  };
  return (
    <div className="hero min-h-screen mb-16">
      {loading && (
        <div className="min-h-screen text-center flex flex-col justify-center items-center">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      )}
      <div className="hero-content flex-col lg:flex-row-reverse w-full h-full gap-12">
        <div className="text-center lg:text-left text-black">
          <img
            src="https://themes.themegoods.com/grandrestaurantv6/demo3/wp-content/uploads/sites/3/2020/12/Mark_Lobo_Photography-Melbourne-Jam_Jar1.jpg"
            alt=""
          />
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl text-black font-pop">
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered"
                required
                {...register("email")}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black">Password</span>
              </label>
              <div className="relative">
                <input
                  type={isPasswordVisiable ? "text" : "password"}
                  placeholder="Password"
                  className="input input-bordered w-full"
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
                value={`Login`}
              />
            </div>
            <button
              className="btn btn-outline text-sky-500 hover:bg-gold hover:border-gold"
              onClick={googleSignIn}
            >
              <FcGoogle />
            </button>
            <p className="text-center py-2">
              Don&apos;t have any account?{" "}
              <Link className="text-gold" to={`/register`}>
                Register
              </Link>{" "}
              here
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
