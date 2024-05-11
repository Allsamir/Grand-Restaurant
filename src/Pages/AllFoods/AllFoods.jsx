const AllFoods = () => {
  return (
    <>
      <div className="bg-gold py-12 mb-16">
        <h1
          className="text-center text-5xl uppercase font-bold text-white
        "
        >
          All Foods
        </h1>
      </div>
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
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 my-20"></div>
    </>
  );
};

export default AllFoods;
