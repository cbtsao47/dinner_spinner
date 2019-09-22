import React, { Component } from "react";

export class AdvancedSearch extends Component {
  render() {
    const {
      searchSetting: { radius, limit },
      handleChange
    } = this.props;

    return (
      <form>
        <label htmlFor="radius">
          Pick a radius
          <input
          title="How many miles are you willing to travel?"
            type="number"
            id="radius"
            name="radius"
            onChange={handleChange}
            value={radius}
          />
        </label>
        <label htmlFor="limit">
          How many restaurants?
          <input
          title="How many restaurants would you like to pick from?"
            type="number"
            id="limit"
            name="limit"
            onChange={handleChange}
            value={limit}
          />
        </label>
      </form>
    );
  }
}

export default AdvancedSearch;
