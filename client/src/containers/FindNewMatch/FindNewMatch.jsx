import React, { Component } from "react";
import Toast from "../../components/Shared/Toast/Toast";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import "./FindNewMatch.css";

class FindNewMatch extends Component {
  state = {
    potentialMatch: {
      name: "",
    },
    error: "",
  };
  componentDidMount() {
    this.getNewMatch();
  }

  getNewMatch = () => {
    axios
      .get(`/api/matches/${this.props.match.params.id}/new`)
      .then((response) => {
        console.log(response);
        if (response.data && response.data.success && response.data.data) {
          this.setState({
            potentialMatch: response.data.data,
          });
        } else {
          this.setState({
            error: response.data.message,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleVote = (like) => {
    console.log("Get new like");
    //TODO: API Call via axios
    let userOneStatus = like ? "matched" : "rejected";
    axios
      .post("/api/matches", {
        UserOneId: this.props.match.params.id,
        UserTwoId: this.state.potentialMatch.id,
        userOneStatus: userOneStatus,
      })
      .then((result) => {
        console.log(result);
        this.getNewMatch();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <>
        <Toast error={this.state.error} />
        <div className="container">
          <div className="row">
            <div className="col s0 m3" />
            <div className="col s12 m6">
              <div className="row">
                <div className="col s12 m7">
                  {!this.state.error && (
                    <div className="card">
                      <div className="card-image">
                        <img
                          src={this.state.potentialMatch.imageURL}
                          alt={this.state.potentialMatch.name}
                        />
                      </div>
                      <div className="card-content">
                        <h3>
                          {this.state.potentialMatch.name} -
                          {this.state.potentialMatch.age}
                        </h3>
                        <p>
                          {this.state.potentialMatch.breed} -
                          {this.state.potentialMatch.location}
                        </p>
                      </div>
                      <div className="card-action">
                        <div className="row">
                          <div className="col s6" style={{ float: "left" }}>
                            <FontAwesomeIcon
                              icon={faThumbsDown}
                              size="3x"
                              className="icon-danger"
                              color="#FE6D73"
                              onClick={() => {
                                this.handleVote(false);
                              }}
                            />
                          </div>
                          <div className="col s6" style={{ float: "right" }}>
                            <FontAwesomeIcon
                              icon={faThumbsUp}
                              size="3x"
                              className="icon-primary"
                              color="#17C3B2"
                              onClick={() => {
                                this.handleVote(true);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col s0 m3" />
          </div>
        </div>
      </>
    );
  }
}

export default FindNewMatch;
