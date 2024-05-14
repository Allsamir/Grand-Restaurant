import { useQuery } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";
import SingleReview from "./SingleReview";

const Reviews = () => {
  const secureAxios = useAxios();
  const { isPending, error, data } = useQuery({
    queryKey: ["foodDataOfCurrentUser"],
    queryFn: async () => secureAxios.get(`/reviews`).then((res) => res.data),
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
  if (data.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-3xl">You haven&apos;t add any feedback yet</h2>
      </div>
    );
  }
  console.log(data);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 my-20">
      {data.map((review, index) => (
        <SingleReview review={review} key={index} />
      ))}
    </div>
  );
};

export default Reviews;
