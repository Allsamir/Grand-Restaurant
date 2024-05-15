import PropTypes from "prop-types";
import "./foodcard.css";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
const FoodCard = ({ food }) => {
  useEffect(() => {
    AOS.init({
      disable: "mobile",
      offset: 200,
      duration: 1000,
      easing: "ease-in-out",
      delay: 50,
      debounceDelay: 50,
    });
  }, []);
  return (
    <div data-aos="flip-left" data-aos-mirror="true" data-aos-once="false">
      <div className="relative overflow-hidden food">
        <img
          src={food?.foodImage}
          alt={food.foodName}
          className="w-full block transition-all hover:scale-125"
          loading="lazy"
        />
        <div className="layers text-white py-16 px-8">
          <h1 className="text-3xl font-bold pb-6">{food.foodName}</h1>
          <p className="text-base pb-2">{food.foodCategory}</p>
          <p className="text-base pb-2">{food.price}$</p>
          <p className="text-base pb-6">Quantity: {food.quantity}</p>
          <Link
            to={`/food/${food._id}`}
            style={{ letterSpacing: "1px" }}
            className=" btn btn-outline text-white hover:bg-gold hover:border-gold"
          >
            See More
          </Link>
        </div>
      </div>
    </div>
  );
};
FoodCard.propTypes = {
  food: PropTypes.object,
};
export default FoodCard;
