import PropTypes from "prop-types";
import "./foodcard.css";
import { Link } from "react-router-dom";
const TopFoodCard = ({ food }) => {
  return (
    <div className="relative overflow-hidden singleFood">
      <img
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
  );
};

TopFoodCard.propTypes = {
  food: PropTypes.object,
};

export default TopFoodCard;
