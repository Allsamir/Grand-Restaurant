import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";
import "./foodcard.css";

const SingleFoodCard = () => {
  const { foodID } = useParams();
  const secureAxios = useAxios();
  const { isPending, error, data } = useQuery({
    queryKey: ["singleFoodData"],
    queryFn: async () =>
      secureAxios.get(`/singleFood?id=${foodID}`).then((res) => res.data),
  });
  useEffect(() => {
    document.title = `Grand Resturant | ${data?.foodName}`;
  }, [data?.foodName]);

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
      <div className="text-center">
        <h1 className="text-7xl font-kristi text-gold">Our Recipe</h1>
      </div>
      <div className="relative overflow-hidden singleFood my-20 h-svh">
        <img
          src={data?.foodImage}
          alt={data.foodName}
          className="w-full block transition-all hover:scale-125"
        />
        <div className="singleFoodLayers text-white flex justify-center flex-col items-center md:space-y-4 space-y-2">
          <h1 className="lg:text-7xl md:text-5xl text-4xl font-bold">
            {data.foodName}
          </h1>
          <p className="text-2xl font-semibold">{data.foodCategory}</p>
          <p className="text-base font-medium">{data.price}$</p>
          <p className="md:text-6xl text-3xl font-kristi">{data.name}</p>
          <p className="text-base font-medium">{data.foodOrigin}</p>
          <div className="text-center md:w-1/2 w-full px-4">
            <p className="text-base font-light">{data.short_description}</p>
          </div>
          <Link
            to={``}
            style={{ letterSpacing: "1px", marginTop: "30px" }}
            className="btn btn-outline text-white hover:bg-gold hover:border-gold"
          >
            Order Now
          </Link>
        </div>
      </div>
    </>
  );
};

export default SingleFoodCard;
