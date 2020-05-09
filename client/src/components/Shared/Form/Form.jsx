import React, { useState } from "react";
import PropTypes from "prop-types";
import Input from "../Input/Input";

const Form = ({ error, handleSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="container" style={{marginTop: 60}}>
      {error && (
        <div
          className="row"
          id="login-alert"
          style={{ backgroundColor: "#FE6D73", paddingTop: 3 }}
        >
          <div className="col">
            <p style={{ color: "#ffffff" }}>{error}</p>
          </div>
        </div>
      )}
      <div className="row">
        <form
          className="col s12"
          onSubmit={(e) => {
            handleSubmit(e, email, password);
          }}
        >
          <div className="row">
            <Input
              id="email"
              type="email"
              name="email"
              value={email}
              label="Email"
              handleChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="row">
            <Input
              id="password"
              type="password"
              name="password"
              value={password}
              label="Password"
              handleChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="row">
            <div className="col">
              <button
                className="btn waves-effect waves-light"
                type="submit"
                name="action"
                style={{ backgroundColor: "#227C9D" }}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

Form.propTypes = {};

export default Form;
