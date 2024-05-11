import PageTitle from "../../components/PageTitle";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";

const AllFoods = () => {
  const secureAxios = useAxios();
  const { isPending, error, data } = useQuery({
    queryKey: ["foodData"],
    queryFn: async () => secureAxios.get("/foods").then((res) => res.data),
  });
  if (isPending)
    return (
      <div className="text-center flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  if (error)
    return (
      <div className="text-center text-4xl">
        An error has occurred: + {error.message}
      </div>
    );
  return (
    <>
      <PageTitle text="All Foods" />
      <div className="form-control md:w-1/2 w-full mx-auto relative">
        <input
          type="text"
          placeholder="Search Your Favorite Foods"
          className="input input-bordered md:w-auto"
        />
        <button className="btn btn-ghost btn-circle absolute right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 my-20">
        {console.log(data)}
      </div>
    </>
  );
};
export default AllFoods;
