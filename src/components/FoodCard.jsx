import PropTypes from "prop-types";
import "./foodcard.css";
import { Link } from "react-router-dom";
const FoodCard = ({ food }) => {
  return (
    <div className="relative overflow-hidden food">
      <img
        src={food?.foodImage}
        alt={food.foodName}
        className="w-full block transition-all hover:scale-125"
      />
      <div className="layers text-white py-16 px-8">
        <h1 className="text-3xl font-bold pb-6">{food.foodName}</h1>
        <p className="text-base pb-2">{food.foodCategory}</p>
        <p className="text-base pb-2">{food.price}$</p>
        <p className="text-base pb-6">Quantity: {food.quantity}</p>
        <Link
          to={`/`}
          style={{ letterSpacing: "1px" }}
          className=" btn btn-outline text-white hover:bg-gold hover:border-gold"
        >
          See More
        </Link>
      </div>
    </div>
  );
};
FoodCard.propTypes = {
  food: PropTypes.object,
};
export default FoodCard;
