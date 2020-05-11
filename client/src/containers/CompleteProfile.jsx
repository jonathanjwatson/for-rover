import React, { Component } from "react";
import Input from "../components/Shared/Input/Input";
import Button from "../components/Shared/Button/Button";
import axios from "axios";

const breeds = require("../constants/breeds.json");

class CompleteProfile extends Component {
  state = {
    name: "",
    breed: "none",
    age: "",
    location: "",
    imageURL: "",
    availableBreeds: [],
  };

  componentDidMount() {
    this.setState({
      availableBreeds: breeds,
    });
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleDropdownChange = (event) => {
    console.log(event.target.value);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`/api/user/${this.props.match.params.id}`, {
        name: this.state.name,
        breed: this.state.breed,
        age: this.state.age,
        location: this.state.location,
        imageURL: this.state.imageURL,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h1>Complete Your Profile</h1>
          </div>
        </div>
        <div className="row">
          <form
            className="col s12"
            onSubmit={(e) => {
              this.handleSubmit(e);
            }}
          >
            <Input
              id="name"
              label="Name"
              type="text"
              name="name"
              value={this.state.name}
              handleChange={this.handleChange}
            />
            <label htmlFor="breed">Breed</label>
            <select
              id="breed"
              name="breed"
              value={this.state.breed}
              onChange={this.handleChange}
              className="browser-default"
            >
              <option value="none" disabled>
                Select a Breed
              </option>
              {this.state.availableBreeds.map((breed, index) => (
                <option key={index} value={breed.value}>
                  {breed.display}
                </option>
              ))}
            </select>
            <Input
              id="age"
              label="Age"
              type="text"
              name="age"
              value={this.state.age}
              handleChange={this.handleChange}
            />
            <Input
              id="location"
              label="Location"
              type="text"
              name="location"
              value={this.state.location}
              handleChange={this.handleChange}
            />
            <Input
              id="imageURL"
              label="Image URL"
              type="text"
              name="imageURL"
              value={this.state.imageURL}
              handleChange={this.handleChange}
            />
            <Button text="Complete"></Button>
          </form>
        </div>
      </div>
    );
  }
}

export default CompleteProfile;
