import PageTitle from "../../components/PageTitle";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import FoodCard from "../../components/FoodCard";
import { useRef, useState } from "react";
import { queryClient } from "../../router";
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
  const [category, setCategory] = useState(null);
  console.log(category);
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
        `/foods?page=${currentPage}&itemsPerPage=${itemsPerPage}&category=${category}`,
      );
      // const response = await axios.get(
      //   `http://localhost:3000/foods?page=${currentPage}&itemsPerPage=${itemsPerPage}&category=${category}`,
      // );
      setTotalProducts(parseInt(response.data?.totalProducts));
      return response.data.foods;
    },
    // keepPreviousData: true,
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
      <div className="my-12">
        <form className="flex items-center justify-center gap-4 flex-wrap">
          <input
            type="radio"
            name="category"
            value={`Bangladeshi`}
            id="category1"
            onChange={() => {
              setCategory("Bangladeshi");
              queryClient.invalidateQueries({
                queryKey: ["foodData"],
              });
            }}
            className="radio radio-warning"
          />
          <label htmlFor="category1">Bangladeshi</label>
          <input
            type="radio"
            name="category"
            value={`Italian`}
            id="category2"
            onChange={() => {
              setCategory("Italian");
              queryClient.invalidateQueries({
                queryKey: ["foodData"],
              });
            }}
            className="radio radio-warning"
          />
          <label htmlFor="category2">Italian</label>
          <input
            type="radio"
            name="category"
            value={`Thai`}
            id="category2"
            onChange={() => {
              setCategory("Thai");
              queryClient.invalidateQueries({
                queryKey: ["foodData"],
              });
            }}
            className="radio radio-warning"
          />
          <label htmlFor="category2">Thai</label>
          <input
            type="radio"
            name="category"
            value={`Japanese`}
            id="category2"
            onChange={() => {
              setCategory("Japanese");
              queryClient.invalidateQueries({
                queryKey: ["foodData"],
              });
            }}
            className="radio radio-warning"
          />
          <label htmlFor="category2">Japanese</label>
          <input
            type="radio"
            name="category"
            value={`American`}
            id="category2"
            onChange={() => {
              setCategory("American");
              queryClient.invalidateQueries({
                queryKey: ["foodData"],
              });
            }}
            className="radio radio-warning"
          />
          <label htmlFor="category2">American</label>
          <input
            type="radio"
            name="category"
            value={`Indian`}
            id="category2"
            onChange={() => {
              setCategory("Indian");
              queryClient.invalidateQueries({
                queryKey: ["foodData"],
              });
            }}
            className="radio radio-warning"
          />
          <label htmlFor="category2">Indian</label>
          <input
            type="radio"
            name="category"
            value={`Middle Eastern`}
            id="category2"
            onChange={() => {
              setCategory("Middle Eastern");
              queryClient.invalidateQueries({
                queryKey: ["foodData"],
              });
            }}
            className="radio radio-warning"
          />
          <label htmlFor="category2">Middle Eastern</label>
          <input
            type="radio"
            name="category"
            value={`British`}
            id="category2"
            onChange={() => {
              setCategory("British");
              queryClient.invalidateQueries({
                queryKey: ["foodData"],
              });
            }}
            className="radio radio-warning"
          />
          <label htmlFor="category2">British</label>
          <input
            type="radio"
            name="category"
            value={`Brazilian`}
            id="category2"
            onChange={() => {
              setCategory("Brazilian");
              queryClient.invalidateQueries({
                queryKey: ["foodData"],
              });
            }}
            className="radio radio-warning"
          />
          <label htmlFor="category2">Brazilian</label>
          <input
            type="radio"
            name="category"
            value={`Vietnamese`}
            id="category2"
            onChange={() => {
              setCategory("Vietnamese");
              queryClient.invalidateQueries({
                queryKey: ["foodData"],
              });
            }}
            className="radio radio-warning"
          />
          <label htmlFor="category2">Vietnamese</label>
          <input
            type="radio"
            name="category"
            value={`Argentinean`}
            id="category2"
            onChange={() => {
              setCategory("Argentinean");
              queryClient.invalidateQueries({
                queryKey: ["foodData"],
              });
            }}
            className="radio radio-warning"
          />
          <label htmlFor="category2">Argentinean</label>
          <input
            type="radio"
            name="category"
            value={`Spanish`}
            id="category2"
            onChange={() => {
              setCategory("Spanish");
              queryClient.invalidateQueries({
                queryKey: ["foodData"],
              });
            }}
            className="radio radio-warning"
          />
          <label htmlFor="category2">Spanish</label>
          <input
            type="radio"
            name="category"
            value={`All`}
            id="category2"
            onChange={() => {
              setCategory(null);
              queryClient.invalidateQueries({
                queryKey: ["foodData"],
              });
            }}
            className="radio radio-warning"
          />
          <label htmlFor="category2">All</label>
        </form>
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
