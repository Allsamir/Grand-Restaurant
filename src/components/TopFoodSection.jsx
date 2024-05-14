import { useQuery } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";
import TopFoodCard from "./TopFoodCard";
import { Link } from "react-router-dom";

const TopFoodSection = () => {
  const secureAxios = useAxios();
  const { isPending, error, data } = useQuery({
    queryKey: ["topFoodData"],
    queryFn: async () => secureAxios.get(`/top-foods`).then((res) => res.data),
  });
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
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
        {data.map((food, index) => (
          <TopFoodCard key={index} food={food} />
        ))}
      </div>
      <div className="text-center mt-16">
        <Link
          to={`/all-foods`}
          className="btn lg:btn-lg btn-outline uppercase text-black hover:bg-gold hover:border-gold hover:text-white hover:scale-110"
          style={{ letterSpacing: "1px" }}
        >
          All Foods
        </Link>
      </div>
    </>
  );
};

export default TopFoodSection;
