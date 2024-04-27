import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";

const CustomButton = ({ title, func }) => {
  return (
    <Button size="sm" variant="success" onClick={func}>
      {title}
    </Button>
  );
};

CustomButton.propTypes = {
  title: PropTypes.string.isRequired,
  func: PropTypes.func.isRequired,
};

export default CustomButton;
