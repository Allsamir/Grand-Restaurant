import PropTypes from "prop-types";
const PageTitle = ({ text }) => {
  return (
    <div className="bg-gold py-12 mb-16">
      <h1
        className="text-center text-5xl uppercase font-bold text-white
        "
      >
        {text}
      </h1>
    </div>
  );
};
PageTitle.propTypes = {
  text: PropTypes.string.isRequired,
};

export default PageTitle;
