import React, { Component } from "react";
import axios from "axios";
import Form from "../components/Shared/Form/Form";
import jwt from "jsonwebtoken";
import { Link } from "react-router-dom";

class Login extends Component {
  state = {
    email: "",
    password: "",
    error: "",
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      error: "",
    });
  };

  handleSubmit = (event, email, password) => {
    event.preventDefault();

    axios
      .post("/api/auth", {
        email,
        password,
      })
      .then(async (response) => {
        console.log(response.data.data);
        if (response.data.success) {
          const decoded = await jwt.verify(
            response.data.data,
            process.env.REACT_APP_SECRET_KEY
          );
          console.log(decoded);
          await sessionStorage.setItem("jwt", response.data.data);
          await this.props.checkForToken();
          await this.props.history.push(`/dashboard/${decoded.id}`);
        }
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data.message);
        this.setState({ error: err.response.data.message });
      });
  };
  render() {
    return (
      <>
        <Form handleSubmit={this.handleSubmit} error={this.state.error} />
        <div className="container">
          <div className="row">
            <div className="col">
              <Link to="sign-up">Need to create an account?</Link>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Login;
