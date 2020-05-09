import React, { Component } from "react";
import "./Home.css";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <>
        <div id="homepage-cover">
          <div className="container">
            <div className="row">
              <div className="col">
                <h1 style={{ color: "#ffffff" }}>Welcome to For Pupper!</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col">
              <h3>The Dog-Lovers Dating Site!</h3>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col">
              <Link to="/sign-up">
                <button
                  className="btn waves-effect waves-light"
                  type="submit"
                  name="action"
                  style={{ backgroundColor: "#227C9D" }}
                >
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
