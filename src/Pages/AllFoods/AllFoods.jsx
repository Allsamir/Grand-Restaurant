import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import PageTitle from "../../components/PageTitle";
import FoodCard from "../../components/FoodCard";

const AllFoods = () => {
  const secureAxios = useAxios();
  const searchInput = useRef(null);
  const [totalProduct, setTotalProducts] = useState(0);
  const [search, setSearch] = useState(false);
  const [singleFood, setSingleFood] = useState({});
  const [searchResult, setSearchResult] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState(null);
  const itemsPerPage = 9;

  const numberOfPages = Math.ceil(totalProduct / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  const handleSearch = () => {
    if (searchInput.current && searchInput.current.value !== "") {
      secureAxios
        .get(`/foodName?name=${searchInput.current.value}`)
        .then((res) => {
          if (res.data === "") {
            setSearchResult("No Result Found. Please Search Again.");
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

  const { isLoading, error, data } = useQuery({
    queryKey: ["foodData", currentPage, category],
    queryFn: async () => {
      const response = await secureAxios.get(
        `/foods?page=${currentPage}&itemsPerPage=${itemsPerPage}&category=${category}`,
      );
      setTotalProducts(parseInt(response.data?.totalProducts));
      return response.data.foods;
    },
  });

  const handleNext = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  if (isLoading)
    return (
      <div className="text-center flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  if (error)
    return (
      <div className="text-center flex justify-center items-center min-h-screen">
        An error has occurred: {error.message}
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
          onClick={handleSearch}
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
      <div className="my-12">
        <div className="flex items-center justify-center gap-4 flex-wrap">
          {[
            "Bangladeshi",
            "Italian",
            "Thai",
            "Japanese",
            "American",
            "Indian",
            "Middle Eastern",
            "British",
            "Brazilian",
            "Vietnamese",
            "Argentinean",
            "Spanish",
            "All",
          ].map((cat) => (
            <button
              key={cat}
              className={`btn ${
                category === cat ? "btn-warning" : "btn-outline"
              }`}
              onClick={() => handleCategoryChange(cat === "All" ? null : cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      {search ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 my-20">
            <FoodCard food={singleFood} />
          </div>
          {searchResult && (
            <div className="text-center mb-20">
              <h1 className="text-4xl">{searchResult}</h1>
            </div>
          )}
        </>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 my-20">
          {data.map((food, index) => (
            <FoodCard key={index} food={food} />
          ))}
        </div>
      )}
      <div className="pagination text-center my-12 flex justify-center items-center">
        <button className="join-item text-4xl" onClick={handlePrev}>
          «
        </button>
        {pages.map((_, index) => (
          <button
            className={`btn btn-outline text-black mx-4 lg:btn-lg hover:bg-gold hover:border-gold ${
              currentPage === index + 1 && "bg-gold text-white"
            }`}
            key={index}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button className="join-item text-4xl" onClick={handleNext}>
          »
        </button>
      </div>
    </>
  );
};

export default AllFoods;
