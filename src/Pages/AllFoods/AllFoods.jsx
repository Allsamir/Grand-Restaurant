import PageTitle from "../../components/PageTitle";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import FoodCard from "../../components/FoodCard";
import { useRef, useState } from "react";
const AllFoods = () => {
  const secureAxios = useAxios();
  const searchInput = useRef(null);
  const [totalProduct, setTotalProducts] = useState(0);
  const [search, setSearch] = useState(false);
  const [singleFood, setSingleFood] = useState({});
  const [searchResult, setSearchResult] = useState("");
  const itemsPerPage = 9;
  const numberOfPages = Math.ceil(totalProduct / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];
  const [currentPage, setCurrentPage] = useState(1);
  console.log(currentPage);
  const handleSearchFunc = () => {
    if (!searchInput.current.value == "") {
      secureAxios
        .get(`/foodName?name=${searchInput.current.value}`)
        .then((res) => {
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
    queryKey: ["foodData", currentPage], //when currentPage's state is changed fetch data again. Like useEffect's [] method
    queryFn: async () => {
      const response = await secureAxios.get(
        `/foods?page=${currentPage}&itemsPerPage=${itemsPerPage}`,
      );
      setTotalProducts(parseInt(response.data?.totalProducts));
      return response.data.foods;
    },
    keepPreviousData: true,
  });
  const handleNextBtn = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePrevBtn = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
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
      <div className="pagination text-center my-12 flex justify-center items-center">
        <button className="join-item text-4xl" onClick={handlePrevBtn}>
          «
        </button>
        {pages.map((button, index) => (
          <button
            className={`btn btn-outline text-black mx-4 lg:btn-lg hover:bg-gold hover:border-gold ${
              currentPage === button + 1 && "bg-gold text-white"
            }`}
            key={index}
            onClick={() => setCurrentPage(button + 1)}
          >
            {button + 1}
          </button>
        ))}
        <button className="join-item text-4xl" onClick={handleNextBtn}>
          »
        </button>
      </div>
    </>
  );
};
export default AllFoods;
