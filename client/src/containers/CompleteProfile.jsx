import React, { Component } from "react";
import Input from "../components/Shared/Input/Input";
const breeds = require("../constants/breeds.json");

class CompleteProfile extends Component {
  state = {
    name: "",
    breed: "none",
    breedSearch: "",
    availableBreeds: [],
    displayBreeds: false,
  };

  componentDidMount() {
    this.setState({
      availableBreeds: breeds,
    });
  }

  handleBreedSearchInputChange = (event) => {
    const { name, value } = event.target;
    if (value === "") {
      this.setState({
        [name]: value,
        availableBreeds: breeds,
      });
    } else {
      const filteredBreeds = breeds.filter((breed) => {
        const regex = new RegExp(this.state.breedSearch, "gi");
        return breed.display.match(regex);
      });
      this.setState({
        [name]: value,
        availableBreeds: filteredBreeds,
      });
    }
  };

  handleBreedSearchInputBlur = (event) => {
    console.log("You left the input");
    this.setState({ displayBreeds: false });
  };
  handleBreedSearchInputFocus = (event) => {
    console.log("You focused on the input");
    this.setState({ displayBreeds: true });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleDropdownChange = (event) => {
    console.log(event.target.value);
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
          <form className="col s12">
            <Input
              id="name"
              label="Name"
              type="text"
              name="name"
              value={this.state.name}
              handleChange={this.handleChange}
            />
            {/* <label htmlFor="breed">Breed</label>
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
              {this.state.availableBreeds.map((breed) => (
                <option value={breed.value}>{breed.display}</option>
              ))}
            </select> */}
            <div className="input-field col s12">
              <input
                id="breed-search"
                type="text"
                name="breedSearch"
                value={this.state.breedSearch}
                onChange={this.handleBreedSearchInputChange}
                onFocus={this.handleBreedSearchInputFocus}
                onBlur={this.handleBreedSearchInputBlur}
              />
              <label htmlFor="breed-search">Breed</label>
            </div>
            {this.state.displayBreeds &&
              this.state.availableBreeds.map((breed, index) => (
                <p key={index}>{breed.display}</p>
              ))}
          </form>
        </div>
      </div>
    );
  }
}

export default CompleteProfile;
