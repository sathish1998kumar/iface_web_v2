import PropTypes from "prop-types";

const Card = ({ title, value, icon, iconColor, backgroundColor }) => {
  return (
    <div
      className={`bg-${backgroundColor} p-6 rounded-lg shadow-lg flex justify-between items-center flex-col sm:flex-row`}
    >
      <div className="text-center sm:text-left">
        <h3 className="text-xl font-semibold text-gray-700">{title}</h3>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
      <div className={`text-${iconColor} text-4xl mt-4 sm:mt-0`}>
        <i className={icon}></i>
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.string.isRequired,
  iconColor: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
};

export default Card;
