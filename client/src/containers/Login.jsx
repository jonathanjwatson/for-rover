import React, { Component } from "react";
import axios from "axios";
import Input from "../components/Shared/Input/Input";
import Form from "../components/Shared/Form/Form";

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

  // TODO: Write two separate submit functions
  // 1. Calls your new user route.
  // 2. Calls your existing user login route.

  handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("/api/users", {
        email: this.state.email,
        password: this.state.password,
      })
      .then((response) => {
        console.log(response);
        this.props.history.push(`/dashboard/${response.data.data._id}`);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data.message);
        this.setState({ error: err.response.data.message });
      });
  };
  render() {
    return <Form handleSubmit={this.handleSubmit} error={this.state.error} />;
  }
}

export default Login;
