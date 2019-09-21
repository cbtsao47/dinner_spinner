import React, { Component } from "react";
import "../styles/RestaurantInfo.css";

export class RestaurantInfo extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    // console.log("==========================" + this.props.selected);
    // const selectedItem = this.props.selected;
    // // console.log("__________________" + JSON.stringify(selectedItem));
    // const imageUrl = JSON.parse(selectedItem.image_url);
    // console.log("IMAGE URL " + imageUrl);
    return (
      <>
        <div className="restaurant-info-container">
          <img
            src={this.props.image_url}
            alt="restaurant"
            className="restaurant-image"
          />
        </div>
      </>
    );
  }
}

export default RestaurantInfo;
