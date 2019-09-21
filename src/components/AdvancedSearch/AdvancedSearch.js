import React, { Component } from "react";

export class AdvancedSearch extends Component {
  state = {
    radius: 5,
    limit: 8
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { radius, limit } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="radius">
            Pick a radius
            <input
              type="text"
              id="radius"
              name="radius"
              onChange={handleChange}
              value={radius}
            />
          </label>
          <label htmlFor="limit">
            How many restaurants?
            <input
              type="text"
              id="limit"
              name="limit"
              onChange={handleChange}
              value={limit}
            />
          </label>
          <button>Confirm</button>
        </form>
      </div>
    );
  }
}

export default AdvancedSearch;
