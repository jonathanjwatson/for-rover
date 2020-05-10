import React, { Component } from "react";
import axios from "axios";

class FindNewMatch extends Component {
  state = {
    potentialMatch: {
      name: "",
    },
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
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s3" />
          <div className="col s6">
            <div className="row">
              <div className="col s12 m7">
                <div className="card">
                  <div className="card-image">
                    <img
                      src="images/sample-1.jpg"
                      alt={this.state.potentialMatch.name}
                    />
                    <span className="card-title">Card Title</span>
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
                        Thumbs Down
                      </div>
                      <div className="col s6" style={{ float: "right" }}>
                        Thumbs Up
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col s3" />
        </div>
      </div>
    );
  }
}

export default FindNewMatch;
