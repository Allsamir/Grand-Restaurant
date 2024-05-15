import { useQuery } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";
import SingleReview from "./SingleReview";
import { useCallback, useEffect, useState } from "react";

const Reviews = () => {
  const secureAxios = useAxios();
  const itemsPerPage = 12;
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

  const {
    isLoading,
    error,
    data: reviews,
  } = useQuery({
    queryKey: ["userReviews", page],
    queryFn: async () =>
      secureAxios
        .get(`/reviews?page=${page}&itemsPerPage=${itemsPerPage}`)
        .then((res) => res.data),
    keepPreviousData: true,
  });

  useEffect(() => {
    if (reviews) {
      setData((prevData) => [...prevData, ...reviews]);
    }
  }, [reviews]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (isLoading && page === 1) {
    return (
      <div className="text-center flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center flex justify-center items-center min-h-screen">
        An error has occurred: {error.message}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-3xl">You haven`&apos;t added any feedback yet</h2>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 my-20">
        {data.map((review, index) => (
          <SingleReview review={review} key={index} />
        ))}
      </div>
    </>
  );
};

export default Reviews;
