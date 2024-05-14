import PropTypes from "prop-types";
import "./foodcard.css";
const SingleReview = ({ review }) => {
  return (
    <div className="relative overflow-hidden food">
      <img
        src={review.imageURL}
        alt={review.name}
        className="w-full block transition-all hover:scale-125"
      />
      <div className="layers text-white flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold pb-6">{review.name}</h1>
        <p className="text-base px-8 text-center">{review.feedback}</p>
      </div>
    </div>
  );
};
SingleReview.propTypes = {
  review: PropTypes.object,
};

export default SingleReview;
