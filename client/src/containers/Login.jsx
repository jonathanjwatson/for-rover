import React, { Component } from "react";

class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.history.push("/dashboard");
  };
  render() {
    return (
      <div className="container">
        <div className="row">
          <form className="col s12" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="email"
                  type="email"
                  className="validate"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                />
                <label htmlFor="email">Email</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="password"
                  type="password"
                  className="validate"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                />
                <label htmlFor="password">Password</label>
              </div>
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
  }
}

export default Login;
