import PropTypes from "prop-types";
import "./foodcard.css";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
const TopFoodCard = ({ food }) => {
  useEffect(() => {
    AOS.init({
      disable: "mobile",
      startEvent: "load",
      offset: 200,
      duration: 800,
      easing: "ease-in-sine",
      delay: 50,
      debounceDelay: 50,
    });
  }, []);
  return (
    <div
      data-aos="fade-up"
      data-aos-mirror="true"
      data-aos-once="false"
      data-aos-anchor-placement="top-center"
    >
      <div className="relative overflow-hidden singleFood">
        <img
          loading="lazy"
          src={food?.foodImage}
          alt={food.foodName}
          className="w-full block transition-all hover:scale-125"
        />
        <div className="singleFoodLayers text-white flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold pb-3">{food.foodName}</h1>
          <p className="text-base font-light pb-4">{food.foodCategory}</p>
          <p className="text-xl font-bold pb-6">
            Ordered More Than {food.count} Times
          </p>
          <Link
            to={`/food/${food._id}`}
            style={{ letterSpacing: "1px" }}
            className=" btn btn-outline text-white hover:bg-gold hover:border-gold"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

TopFoodCard.propTypes = {
  food: PropTypes.object,
};

export default TopFoodCard;
