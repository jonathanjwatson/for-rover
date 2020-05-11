import React from "react";
import PropTypes from "prop-types";

const Toast = ({ error }) => {
  return (
    <div>
      {error && (
        <div className="container">
          <div
            className="row"
            id="login-alert"
            style={{ backgroundColor: "#FE6D73", paddingTop: 3 }}
          >
            <div className="col">
              <p style={{ color: "#ffffff" }}>{error}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Toast.propTypes = {
  error: PropTypes.string.isRequired,
};

export default Toast;
