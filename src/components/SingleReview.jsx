import PropTypes from "prop-types";
import "./foodcard.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
const SingleReview = ({ review }) => {
  useEffect(() => {
    AOS.init({
      disable: "mobile",
      offset: 200,
      duration: 1000,
      easing: "ease-in-out",
      delay: 50,
      debounceDelay: 50,
      once: false,
    });
  }, []);
  return (
    <div data-aos="zoom-in">
      <div className="relative overflow-hidden food">
        <img
          src={review.imageURL}
          loading="lazy"
          alt={review.name}
          className="w-full block transition-all hover:scale-125"
        />
        <div className="layers text-white flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold pb-6">{review.name}</h1>
          <p className="text-base px-8 text-center">{review.feedback}</p>
        </div>
      </div>
    </div>
  );
};
SingleReview.propTypes = {
  review: PropTypes.object,
};

export default SingleReview;
