import React from "react";
import PropTypes from "prop-types";

const Button = ({ text }) => {
  return (
    <button
      className="btn waves-effect waves-light"
      type="submit"
      name="action"
      style={{ backgroundColor: "#227C9D" }}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Button;
