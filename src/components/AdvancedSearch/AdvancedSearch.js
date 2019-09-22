import React, { Component } from "react";

export class AdvancedSearch extends Component {
  render() {
    const {
      searchSetting: { radius, limit },
      handleChange
    } = this.props;

    console.log(this.props);
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="radius">
            Pick a radius
            <input
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
              type="number"
              id="limit"
              name="limit"
              onChange={handleChange}
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
