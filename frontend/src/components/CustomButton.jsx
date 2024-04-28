import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";

const CustomButton = ({ title = "", func = () => {}, variant = "" }) => {
  return (
    <Button
      size="sm"
      variant={variant ? variant : "success"}
      onClick={func ? func : () => {}}
    >
      {title ? title : "Default Title"}
    </Button>
  );
};

CustomButton.propTypes = {
  title: PropTypes.string,
  variant: PropTypes.string,
  func: PropTypes.func,
};

export default CustomButton;
