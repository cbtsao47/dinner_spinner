import React, { Component } from "react";

export class AdvancedSearch extends Component {
  state = {
    radius: 5,
    limit: 8
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.updateSearchSetting(this.state);
  };

  render() {
    const { radius, limit } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="radius">
            Pick a radius
            <input
              type="text"
              id="radius"
              name="radius"
              onChange={this.handleChange}
              value={radius}
            />
          </label>
          <label htmlFor="limit">
            How many restaurants?
            <input
              type="text"
              id="limit"
              name="limit"
              onChange={this.handleChange}
              value={limit}
            />
          </label>
          <button type="submit">Confirm</button>
        </form>
      </div>
    );
  }
}

export default AdvancedSearch;
