import React, { Component } from "react";
import Button from "./Button";
import AdvancedSearch from "./AdvancedSearch/AdvancedSearch";
export class Spinner extends Component {
  render() {
    return (
      <div className="spinner__container">
        <h2 className="spinner__title">Dinner Spinner</h2>
        <AdvancedSearch updateSearchSetting={this.props.updateSearchSetting} />
        <Button />
      </div>
    );
  }
}

export default Spinner;
