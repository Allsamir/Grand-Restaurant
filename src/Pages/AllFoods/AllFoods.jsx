import PageTitle from "../../components/PageTitle";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import FoodCard from "../../components/FoodCard";
import { useRef, useState } from "react";
const AllFoods = () => {
  const secureAxios = useAxios();
  const searchInput = useRef(null);
  const [search, setSearch] = useState(false);
  const [singleFood, setSingleFood] = useState({});
  const [searchResult, setSearchResult] = useState("");
  const handleSearchFunc = () => {
    if (!searchInput.current.value == "") {
      secureAxios
        .get(`/foodName?name=${searchInput.current.value}`)
        .then((res) => {
          console.log(res);
          if (res.data == "") {
            setSearchResult("No Result Found Please Search Again");
            setSingleFood({});
          } else {
            setSingleFood(res.data);
            setSearchResult("");
          }
        })
        .catch((err) => console.error(err));
      setSearch(true);
    } else {
      setSearch(false);
    }
  };
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
      <div className="form-control md:w-1/2 w-full mx-auto relative px-4">
        <input
          type="text"
          placeholder="Search Your Favorite Foods"
          className="input input-bordered md:w-auto"
          ref={searchInput}
        />
        <button
          className="btn btn-ghost btn-circle absolute right-4"
          onClick={handleSearchFunc}
        >
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
      {search ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 my-20">
            <FoodCard food={singleFood} />
          </div>
          <div className="text-center mb-20">
            <h1 className="text-4xl">{searchResult}</h1>
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 my-20">
          {data.map((food, index) => (
            <FoodCard key={index} food={food} />
          ))}
        </div>
      )}
    </>
  );
};
export default AllFoods;
